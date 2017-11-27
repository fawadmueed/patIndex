var globRamqBillArrListBill;
var globRamqBillInfo;
var arrGrilleDeFacturation_update;
var arrGrilleDeFacturation_forms_update;
function RamqBillGetList()
{
    RamqBillClearTable();
    RamqBillGetDataFromServer();
}

function RamqBillGetDataFromServer()
{
    var dateFrom = $("#rgie_fact_ane_start").val();
    var dateTo = $("#rgie_fact_ane_end").val();
    $.post("allScriptsv1.py", { tx: "getPatientFactures", patientId: globPatientId, dFrom: dateFrom, dTo: dateTo },
            function (result) {
                if (result.message !== undefined)
                    alert(result.message);
                else {
                    if (result.factures.length > 0) {
                        var arrDataForTable = RamqBillGetDataForTable(result.factures);
                        RamqBillPopulateTable(arrDataForTable);
                    }
                }
            });
}

function RamqBillGetDataForTable(pArrDataFromServer)
{
    globRamqBillArrListBill = pArrDataFromServer;
    var arrData = [];
    for (var i = 0; i < pArrDataFromServer.length; i++)
    {
        var objInputData = pArrDataFromServer[i];
        var objOutputData = {};
        objOutputData.Dossier = objInputData.nodossier;//Dossier
        objOutputData.RamqNo = RamqBillGetNoRamq(objInputData.info); //#RAMQ
        objOutputData.Date = objInputData.datecreation;
        objOutputData.FactureNo = objInputData.facture;
        objOutputData.Nom = "";
        objOutputData.Prenom = "";
        objOutputData.Montant = (objInputData.xml)?RamqBillGetMontant(objInputData.xml):0;
        objOutputData.Status = (objInputData.xml)?RamqBillGetStatus(objInputData.xml):0;
        objOutputData.IfUpdatePossible = RamqBillIfUpdatePossible(objOutputData.Status, objInputData.dateregie);

        arrData.push(objOutputData);
    }
    return arrData;
}

function RamqBillPopulateTable(pArrDataForTable)
{
    
    var tableContent = "";
    var numberOfBills = pArrDataForTable.length;
    var totalAmount = 0;
    for(var i = 0; i<pArrDataForTable.length; i++)
    {
        var style = (pArrDataForTable[i].IfUpdatePossible) ? 'style="background-color:lightgreen"' : '';
        tableContent += '<tr onclick = "RamqBillPopulatDetailsArrays(\'' + pArrDataForTable[i].FactureNo + '\')" '+style+'>';
        tableContent += '<td>' + pArrDataForTable[i].Dossier + "</td>"; //Dossier
        //tableContent += '<td>' + pArrDataForTable[i].Dossier + "</td>"; //Dossier
        tableContent += "<td>" + pArrDataForTable[i].RamqNo + "</td>"; //#RAMQ
        tableContent += "<td>" + pArrDataForTable[i].Date + "</td>"; //Date
        tableContent += "<td>" + pArrDataForTable[i].FactureNo + "</td>"; //No de Facture
        tableContent += "<td>" + pArrDataForTable[i].Nom + "</td>"; //Nom
        tableContent += "<td>" + pArrDataForTable[i].Prenom + "</td>"; //Prenom
        tableContent += "<td>" + pArrDataForTable[i].Montant + "</td>"; //Montant
        tableContent += "<td>" + ((pArrDataForTable[i].Status == 0) ? "Non transmis" : 'Accepté') + "</td>"; //Status
        tableContent += "</tr>";
        totalAmount += pArrDataForTable[i].Montant;
    }

    $('#rgie_fact_table tbody').append(tableContent);
    $('#nombre_factures_regie').val(numberOfBills);
    $('#total_factures_regie').val(totalAmount);
}

function RamqBillGetNoRamq(pObjDataFromServer)
{
    var ramqNo = pObjDataFromServer[0][1].IdPers;
    return ramqNo;
}


function RamqBillGetMontant(pXmlResp)
{

    if (pXmlResp)
    {

    }
    var obj = parseRAMQResponsePaiment(pXmlResp);
    if (obj) {
        var arrLigneList = obj.arrListeFactRecev[0].ListeLigneFactRecev;
        if (arrLigneList) {
            var totalAmount = 0;
            for (var i = 0; i < arrLigneList.length; i++) {
                var amount = Number(arrLigneList[i].MntPrel);
                if (!isNaN(amount)) {
                    totalAmount += amount;
                }
            }
        }
    }
    return totalAmount;
}

function RamqBillGetStatus(pXmlResp)
{
    var status = 0;//"Non transmis"
    var obj = parseRAMQResponsePaiment(pXmlResp);
    if (obj && obj.GlobalStaRecev == "1") //bill accepted
    {
        status = 1;//"Accepté";
    }
    return status;
}

function RamqBillPopulatDetailsArrays(pBillNumber)
{
    alert(pBillNumber);
    var billInfo;
    for (var i = 0; i < globRamqBillArrListBill.length; i++)
    {
        if (globRamqBillArrListBill[i].facture == pBillNumber)
        {
            
            RamqBillPopulateBillDetails(globRamqBillArrListBill[i]);
            
            break;
        }
    }
}

function RamqBillPopulateBillDetails(pArrBilldata)
{
    globArrGrilleDeFacturation_update = pArrBilldata.info[1];
    globArrGrilleDeFacturation_forms_update = pArrBilldata.info[2];
}



//Check if the bill can be updated.
// if bill accepted and bill was created less than 24 hours ago, returns true, otherwise false.
function RamqBillIfUpdatePossible(pStatus, pDate)
{
    var res = false;
    if(pStatus ==1)//Accepte
    {
        try
        {
            var difHours = 0;
            var billDate = new Date(pDate);
            var billTimeMSec = billDate.getTime();
            var currentTimeMSec = new Date().getTime();
            difHours = (currentTimeMSec-billTimeMSec)/(1000*60*60);
            if (difHours<23)
            {
                res = true;
            }
        }
        catch(e)
        {
            res = false;
        }
        
    }
    return res;
}

function RamqBillClearTable()
{
    $('#rgie_fact_table tbody').empty();
    $('#nombre_factures_regie').val('');
    $('#total_factures_regie').val('');
    
    
}



    