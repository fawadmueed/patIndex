var globPlnTrHistListData = [];
var globPlnTrHistTable;
var globPlnTrHistSelectedData;

$(document).ready(function () {
    //Plan Traitements history table
    globPlnTrHistTable = $('#cdan_table_soum_modal').DataTable({
        "oLanguage": CdaCommTranslateDataTable(),
        "columns": [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            { "visible": false }
        ],
        //dom: 'Bfrtip',
        searching: false
    });

    $('#cdan_table_soum_modal tbody').on('click', 'tr', function () {
        globPlnTrHistTable.$('tr.active').removeClass('active');
        $(this).addClass('active');

        globPlnTrHistSelectedData = globPlnTrHistTable.row(this).data();
        //globNoDossier = globCdaTransHistSelectedData[2];
        //globBillNumber = globCdaTransHistSelectedData[11];

        //TODO:
        //CdaCommDisplayTransDetails();
    });
});
//arrGrilleDeFacturation_planTrait
function PlnTrStart()
{
    PlnTrGetPlansList();
}

function PlnTrGetHistoryTransDataFromServer()
{
    var dateFrom = '';
    var dateTo = '';

    $.post("allScriptsv1.py", { tx: "getPlanTraitements", clinicId: globClinicId, patientId: globPatientId, nodossier: globNoDossier, dFrom: dateFrom, dTo: dateTo },
                function (result) {
                    var arrTraitements = result.Traitements;
                    if (arrTraitements && arrTraitements.length > 0)
                    {
                        globPlnTrHistListData = PlnTrGetDataForTransHistTable(arrTraitements);
                        PlnTrUpdateTransHistTable();
                        //display list popup
                        modPlanTraitTable();
                    }
                });
}


function PlnTrPopulateDetails()
{

}

function PlnTrSavePlan(pIsFacturer)
{
    getAllTrData_planTrait(); //Save data from grid into global array.
    var seqNum = (globPlnTrHistSelectedData) ? globPlnTrHistSelectedData[0] : null;
    var cdaNetRequest = '';
    var plnTrInfo = { grid: arrGrilleDeFacturation_planTrait, facturer: pIsFacturer };
    var randomNum = CdaCommCreateRandomNumber(1, 999);
    var inputXMl = {
        "request": cdaNetRequest, //request to send
        "inputs": plnTrInfo // JSON data
    };

    $.post("allScriptsv1.py", { tx: "SendPlanTraitement", clinicId: globClinicId, patientId: globPatientId, nodossier: globNoDossier, lun: randomNum, json: JSON.stringify(inputXMl), sendReq: false, noseq: seqNum },
        function (result) {
            if (result.outcome == 'error')
            {
                alert(result.message);
            }
            else
            {
                displayRamqAnswer("Plan de traitement.", 'Les données ont été envoyées avec succès');
            }
        });
}

function PlnTrSendPlan()
{
    getAllTrData_planTrait();
    globCdanetTranscode = '3'; //Predetermination Transaction

    // open modal CDA NET 1 or 2 depending on Version of insurance
    if (globCdaVersion === '2') {
        modCdan1();
    }
    else if (globCdaVersion === '4') {
        modCdan2();
    }
    
}

function PlnTrCreateNew() {
    emptyTable_planTrait();
    globPlnTrHistSelectedData = null;
    $('.PlanTrait').modal('hide');
}

//===================================== Historique des Planes des traitement =====================================
function PlnTrGetPlansList() {
    PlnTrClearHistoryTable();
    PlnTrGetHistoryTransDataFromServer();
}


function PlnTrClearHistoryTable() {
    $('#cdan_table_soum_body_modal').empty();
}

function PlnTrGetDataForTransHistTable(pTraitements) {
    var arrData = [];
    for (var i = 0; i < pTraitements.length; i++) {
        var objOutputData = {};
        var objResponse = {};
        var description = '';
        var strResponse = '';
        var versionNumber = '';
        var transCode = '';
        var noSeq = '';
        var objInputData = pTraitements[i];
        if (objInputData.resp)
        {
            strResponse = objInputData.resp.split(',').slice(3).toString(); // extract string after 3th comma;
        }
        

        var transactionString = (objInputData.transaction) ? objInputData.transaction : '';
        versionNumber = transactionString.substring(18, 20);
        transCode = transactionString.substring(20, 22);
        noSeq = transactionString.substring(12, 18);

        if (versionNumber == '02') {
            objResponse = CdaV2ReadResponse(strResponse);
            description = CdaV2GetTransactionName(transCode);
        }
        else if (versionNumber == '04') {
            objResponse = CdaV4ReadResponse(strResponse);
            description = CdaV4GetTransactionName(transCode);
        }
        // Calculate reclamation from grid
        var reclamationFromGrid = PlnTrCalcReclamation(objInputData.info.grid).toFixed(2); 



        objOutputData.Numero = objInputData.numero;
        objOutputData.Facturer = (objInputData.info.facturer)?'OUI':'NON';
        objOutputData.Reference = (objResponse && objResponse.g01) ? (objResponse.g01).toString().trim() : '';
        objOutputData.Confirmation = (objResponse && objResponse.g30) ? (objResponse.g30).toString().trim() : '';
        objOutputData.Date = objInputData.date;
        objOutputData.Reclamation = (objResponse && objResponse.g04) ? (objResponse.g04).toString().trim() : reclamationFromGrid;
        objOutputData.Deductible = (objResponse && objResponse.g29) ? (objResponse.g29).toString().trim() : '0.00';
        objOutputData.Remboursement = (objResponse && objResponse.g28) ? (objResponse.g28).toString().trim() : '0.00';
        objOutputData.GridInfo = JSON.stringify(objInputData.info.grid); //arrGrilleDeFacturation_planTrait

        arrData.push(objOutputData);
    }
    return arrData;
}

function PlnTrCalcReclamation(pGridInfo) {
    var recl = 0.00;
    if(pGridInfo && pGridInfo.length>0)
    {
        for (var i = 0; i < pGridInfo.length; i++) {
            var r = parseFloat(pGridInfo[i].Honoraires);
            if (!isNaN(parseFloat(r)))
            {
                recl += r;
            }
        }
    }
    return recl;
}

function PlnTrUpdateTransHistTable() {
    var arrData = [];
    for (var i = 0; i < globPlnTrHistListData.length; i++) {
        var arr = [];

        arr.push(globPlnTrHistListData[i].Numero);
        arr.push(globPlnTrHistListData[i].Facturer);
        arr.push(globPlnTrHistListData[i].Reference);
        arr.push(globPlnTrHistListData[i].Confirmation);
        arr.push(globPlnTrHistListData[i].Date);
        arr.push(globPlnTrHistListData[i].Reclamation);
        arr.push(globPlnTrHistListData[i].Deductible);
        arr.push(globPlnTrHistListData[i].Remboursement);
        arr.push(globPlnTrHistListData[i].GridInfo);

        arrData.push(arr);
    }

    globPlnTrHistTable.clear().draw();
    globPlnTrHistTable.rows.add(arrData); // Add new data
    globPlnTrHistTable.columns.adjust().draw();
}

function PlnTrDelete() {
    var number = globPlnTrHistSelectedData[0];

    $.post("allScriptsv1.py", { tx: "DeletePlanTraitement", clinicId: globClinicId, patientId: globPatientId, nodossier: globNoDossier, noseq: number },
        function (result) {
            if (result.outcome == 'error') {
                alert(result.message);
            }
            else {
                displayRamqAnswer("Plan de traitement.", 'Les données ont été envoyées avec succès');
                emptyTable_planTrait();
            }
        });
}

function PlnTrSendToCdaNet() {
    var cdaNetRequest = '';
    if (globCdaVersion === '4')
    {
        cdaNetRequest = CdaV4CreateRequestString();
    }
    else if (globCdaVersion === '2')
    {
        cdaNetRequest = CdaV2CreateRequestString();
    }
    
    var plnTrInfo = { grid: arrGrilleDeFacturation_planTrait, facturer: false };
    var randomNum = CdaCommCreateRandomNumber(1, 999);
    var seqNum = (globPlnTrHistSelectedData) ? globPlnTrHistSelectedData[0] : null;
    var inputXMl = {
        "request": cdaNetRequest, //request to send
        "inputs": plnTrInfo // JSON data
    };
    //Show loader
    document.getElementById("loaderModalCdan1").setAttribute("class", "ui active inverted dimmer");
    document.getElementById("loaderModalCdan2").setAttribute("class", "ui active inverted dimmer");

    $.post("allScriptsv1.py", { tx: "SendPlanTraitement", clinicId: globClinicId, patientId: globPatientId, nodossier: globNoDossier, lun: randomNum, json: JSON.stringify(inputXMl), sendReq: true, noseq: '000001' },
        function (result) {
            //Hide loader
            document.getElementById("loaderModalCdan1").setAttribute("class", "ui inverted dimmer");
            document.getElementById("loaderModalCdan2").setAttribute("class", "ui inverted dimmer");

            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            //TODO:For test Only!!! Remove for production
            result.outcome = 'success';
            //result.message = "14781,0,002,11321111    014781041300007900161N0521807004150              R01                                                                           0045200F00000006110061";
            result.message = "100561,0,067,HD*         100561041112345600195Y5301234011234              R10*WARNING* NO MATCHING RESPONSE FOUND FOR YOUR TRANSAC. simtr v2.0 15-APR-0100000002000000020044010300120013001400150016001701300025";
            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

            if (result.outcome == 'error') {
                alert(result.message);
            }
            else {
                var responseLine = result.message;
                var communicationResult = CdaCommGetCommStatus(responseLine);
                if (communicationResult == 0)// No errors
                {
                    var transactionLine = responseLine.split(',').slice(3); // extract string after 3th comma
                    var version = transactionLine[0].substring(18,20);
                    if (version === '04')
                    {
                        globCdaRespObj = CdaV4ReadResponse(transactionLine);
                        var respMessage = '';
                        if (globCdaRespObj) {
                            respMessage = CdaV4CreateRespMessage(globCdaRespObj, transactionLine);
                        }
                        else {
                            respMessage = 'Parsing CdaNet response failed.'
                        }
                    }
                    else if (version === '02')
                    {
                        globCdaRespObj = CdaV2ReadResponse(transactionLine);
                        var respMessage = '';
                        if (globCdaRespObj) {
                            respMessage = CdaV2CreateRespMessage(globCdaRespObj, transactionLine);
                        }
                        else {
                            respMessage = 'Parsing CdaNet response failed.'
                        }
                    }

                    PlnTrShowResp(respMessage);
                    
                }
            }
        });
}

function PlnTrTransferToBill() {
    //Update is Facturer to true
    PlnTrSavePlan(true);

    //Swich tabs
    $("#tabFacture").addClass("active");
    $("#tabPlnTr").removeClass("active");
    $("#divFacturationSub").addClass("active");
    $("#divPlnTrSub").removeClass("active");

    getAllTrData_planTrait();
    var type = globVisionRData.InsTypeList[0];
    for (var i = 0; i < arrGrilleDeFacturation_planTrait.length; i++)
    {
        arrGrilleDeFacturation_planTrait[i].Type = type;
    }
    populate_tbl_from([], arrGrilleDeFacturation_planTrait);

}

function PlnTrModify() {
    if (globPlnTrHistSelectedData)
    {
        populate_table_fact_planTrait(JSON.parse(globPlnTrHistSelectedData[8]));
        $('.PlanTrait').modal('hide');
    }
    
}

function PlnTrShowResp(pRespMessage) {
    var message = pRespMessage.replace(/\n/g, '<br/>');
    var div = document.getElementById('cdanet_predeterm_response_div');

    div.innerHTML = '<p>' + message + '</p>';
    //Show modal
    $('.modalResponseCDANETPredeterm').modal('show');
}

