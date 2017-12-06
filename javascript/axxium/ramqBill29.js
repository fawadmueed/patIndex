var globRamqBillArrListBill;
var globRamqBillInfo;
var globRamqJetonComm;
var globRamqNoFactRamq;
//var arrGrilleDeFacturation_update;
//var arrGrilleDeFacturation_forms_update;
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
    var totalAmount = 0;
    var parser = new DOMParser();
    var xml = pXmlResp.replace(/\\"/g, '"');
    if (xml)
    {
        var xmlDoc = parser.parseFromString(xml, "text/xml");
        if (xmlDoc)
        {
            if (xmlDoc.getElementsByTagName("sta_recev")[0] != null && xmlDoc.getElementsByTagName("sta_recev")[0].innerHTML == '1') {
                var tag_liste_ligne_fact_recev = xmlDoc.getElementsByTagName('liste_ligne_fact_recev')[0];
                if (tag_liste_ligne_fact_recev) {
                    var arrListFactRecev = tag_liste_ligne_fact_recev.childNodes;
                    if (arrListFactRecev && arrListFactRecev.length > 0) {
                        for (var i = 0; i < arrListFactRecev.length; i++) {
                            var amount = Number(arrListFactRecev[i].childNodes[2].innerHTML);
                            if (!isNaN(amount)) {
                                totalAmount += amount;
                            }
                        }
                    }
                }
            }
        }
    }
    return totalAmount;
}

function RamqBillGetStatus(pXmlResp)
{
    var status = 0;
    var parser = new DOMParser();
    var xml = pXmlResp.replace(/\\"/g, '"');
    if (xml) {
        var xmlDoc = parser.parseFromString(xml, "text/xml");
        if (xmlDoc) {

            if (xmlDoc.getElementsByTagName("sta_recev")[0] != null)
            {
                if (xmlDoc.getElementsByTagName("sta_recev")[0].innerHTML == '1')
                    status = 1;
            }
        }
    }
    return status;
}

function RamqBillPopulatDetailsArrays(pBillNumber)
{
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
    globRamqBillInfo = pArrBilldata;
    arrGrilleDeFacturation_update = pArrBilldata.info[1];
    arrGrilleDeFacturation_forms_update = pArrBilldata.info[2];
    //dent_Type = pArrBilldata.info[0][1].TypProf;

    globRamqJetonComm = RamqBillGetJetonComm(pArrBilldata.xml);
    globRamqNoFactRamq = RamqBillGetNoFactRamq(pArrBilldata.xml);

    var objCommonBillData = pArrBilldata.info[0];
    var objVisionRData = pArrBilldata.info[0][1];
    var objAdditionalData = pArrBilldata.info[0][2];

    //Identification du patient
    $('#no_dosir_regie_fact').val((pArrBilldata.nodossier) ? pArrBilldata.nodossier : '');
    $('#prenom_regie_fact').val((objVisionRData.PrePers) ? objVisionRData.PrePers : '');
    $('#nom_regie_fact').val((objVisionRData.NomPers) ? objVisionRData.NomPers: '');
    $('#amq_regie_fact').val((objVisionRData.IdPers) ? objVisionRData.IdPers : '');
    $('#sexe_regie_fact').val((objVisionRData.CodSexPers) ? objVisionRData.CodSexPers : '');
    $('#exp_regie_fact').val((objVisionRData.NamExpDate) ? objVisionRData.NamExpDate : '');

    //ancienne facture
    $('#no_facture_regie_fact').val((pArrBilldata.facture) ? pArrBilldata.facture : '');
    $('#no_recu_regie_fact').val(globRamqNoFactRamq);
    
    $('#no_code_regie_fact').val(globRamqJetonComm);
    $('#ancienne_montant_regie_fact').val(RamqBillGetMontant(pArrBilldata.xml));

    //Nouvelle facture
    $('#nouvel_no_facture').val(''); //TODO:
    $('#novl_montant_regie_fact').val(''); //TODO:

    //renseignements complementaires regie
    if(objVisionRData.IdPers)
    {
        $('#carte_as_malad_oui_regie_fact').prop('checked', true);
    }
    else
    {
        $('#carte_as_malad_non_regie_fact').prop('checked', true);
    }

    if(objAdditionalData.RembDemParPatient)
        $('#remb_dem_oui_regie_fact').prop('checked', true);
    else
        $('#remb_dem_non_regie_fact').prop('checked', false);

    //professionel
    $('#pamnt_no_prof_regie_fact').val((objVisionRData.IdProf) ? objVisionRData.IdProf :'' );
    $('#pamnt_no_grp_regie_fact').val('');//TODO:

    //evenement //TODO: Josee should change layout
    $('#pamnt_even_date_regie_fact').val((objAdditionalData.DatEvenePers) ? objAdditionalData.DatEvenePers : '');
    //period d'hospital.
    $('#pamnt_date_entre_regie_fact').val((objAdditionalData.DatEntrePersLieu) ? objAdditionalData.DatEntrePersLieu : '');
    $('#pamnt_date_sorti_regie_fact').val((objAdditionalData.DatSortiPersLieu) ? objAdditionalData.DatSortiPersLieu : '');

    //Lieu de dispensation
    
    $('#lieu_codifie_regie_fact').prop('checked', objAdditionalData.LieuCodifieRegie);
    $('#lieu_codifie_non_regie_fact').prop('checked', objAdditionalData.LieuNonCodifieRegie);
  
    $('#num_lieu_regie_fact').val((objAdditionalData.IdLieuPhys) ? objAdditionalData.IdLieuPhys : '');
    $('#secteur_active_regie_fact').val((objAdditionalData.NoSectActiv) ? objAdditionalData.NoSectActiv : '');//ddl
    $('#cod_post_lieu_regie_fact').val((objAdditionalData.CodePostal) ? objAdditionalData.CodePostal : '');
    $('#cod_loc_regie_fact').val((objAdditionalData.CodeLocalite) ? objAdditionalData.CodeLocalite : '');
    $('#no_bur_regie_fact').val((objAdditionalData.NoBur) ? objAdditionalData.NoBur : '');

    if(objAdditionalData.TypeDeLieu = "C")
    {
        $('#type_lieu_cab_regie_fact').prop('checked', true);
    }
    else if(objAdditionalData.TypeDeLieu = "D")
    {
        $('#type_lieu_dom_regie_fact').prop('checked', true);
    }
    else if(objAdditionalData.TypeDeLieu = "A")
    {
        $('#type_lieu_aut_regie_fact').prop('checked', true);
    }

    
    populate_factTbl_update(arrGrilleDeFacturation_update);
    Regie_fact_modal();
}

function RamqBillUpdateBillInfo() {
    /*
        update global variable globRamqBillInfo before send update request to Ramq
    */

    //globArrGrilleDeFacturation_update = pArrBilldata.info[1];
    //globArrGrilleDeFacturation_forms_update = pArrBilldata.info[2];
    var objVisionRData = globRamqBillInfo.info[0][1];
    var objAdditionalData = globRamqBillInfo.info[0][2];

    //globRamqJetonComm = RamqBillGetJetonComm(pArrBilldata.xml);
    //globRamqNoFactRamq = RamqBillGetMontant(pArrBilldata.xml);
    //Identification du patient
    globRamqBillInfo.nodossier = $('#no_dosir_regie_fact').val();

    objVisionRData.PrePers = $('#prenom_regie_fact').val();
    objVisionRData.NomPers = $('#nom_regie_fact').val();
    objVisionRData.IdPers = $('#amq_regie_fact').val();
    objVisionRData.CodSexPers = $('#sexe_regie_fact').val();
    objVisionRData.NamExpDate = $('#exp_regie_fact').val();

    //ancienne facture
    globRamqBillInfo.facture = $('#no_facture_regie_fact').val();
    //$('#no_recu_regie_fact').val(globRamqNoFactRamq);
    //$('#no_code_regie_fact').val(globRamqJetonComm);
    //$('#ancienne_montant_regie_fact').val(RamqBillGetMontant(pArrBilldata.xml));

    ////Nouvelle facture
    //$('#nouvel_no_facture').val(''); //TODO:
    //$('#novl_montant_regie_fact').val(''); //TODO:

    //renseignements complementaires regie

    //if (objVisionRData.IdPers) {
    //    $('#carte_as_malad_oui_regie_fact').prop('checked', true);
    //}
    //else {
    //    $('#carte_as_malad_non_regie_fact').prop('checked', true);
    //}
    objAdditionalData.RembDemParPatient = $('#remb_dem_oui_regie_fact').is(':checked');
    

    //professionel
    objVisionRData.IdProf = $('#pamnt_no_prof_regie_fact').val();
    //$('#pamnt_no_grp_regie_fact').val('');//TODO:

    //evenement //TODO: Josee should change layout
    objAdditionalData.DatEvenePers = $('#pamnt_even_date_regie_fact').val();
    //period d'hospital.
    objAdditionalData.DatEntrePersLieu = $('#pamnt_date_entre_regie_fact').val();
    objAdditionalData.DatSortiPersLieu = $('#pamnt_date_sorti_regie_fact').val();

    //Lieu de dispensation
    objAdditionalData.LieuCodifieRegie = $('#lieu_codifie_regie_fact').is(':checked');
    objAdditionalData.LieuNonCodifieRegie = $('#lieu_codifie_non_regie_fact').is(':checked');

    objAdditionalData.IdLieuPhys = $('#num_lieu_regie_fact').val();
    objAdditionalData.NoSectActiv = $('#secteur_active_regie_fact').val();
    objAdditionalData.CodePostal = $('#cod_post_lieu_regie_fact').val();
    objAdditionalData.CodeLocalite = $('#cod_loc_regie_fact').val();
    objAdditionalData.NoBur = $('#no_bur_regie_fact').val();

    if ($('#type_lieu_cab_regie_fact').is(':checked'))
        objAdditionalData.TypeDeLieu = "C";
    else if ($('#type_lieu_dom_regie_fact').is(':checked'))
        objAdditionalData.TypeDeLieu = "D";
    else if ($('#type_lieu_aut_regie_fact').is(':checked'))
        objAdditionalData.TypeDeLieu = "A";

    globRamqBillInfo.info[0][1] = objVisionRData;
    globRamqBillInfo.info[0][2] = objAdditionalData;

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

function RamqBillGetNoFactRamq(pXml)
{
    var noFact = '';
    var parser = new DOMParser();
    var xml = pXml.replace(/\\"/g, '"');
    if (xml)
    {
        var xmlDoc = parser.parseFromString(xml, "text/xml");
        if (xmlDoc) 
        {
            var tag_no_fact_ramq = xmlDoc.getElementsByTagName("no_fact_ramq")[0];
            if(tag_no_fact_ramq)
            {
                if(tag_no_fact_ramq.childNodes[0])
                {
                    noFact = tag_no_fact_ramq.childNodes[0].nodeValue;
                }
            }
        }
    }
    return noFact;
}

function RamqBillGetJetonComm(pXml)
{
    var jeton = '';
    if (pXml)
    {
        var noFact = '';
        var parser = new DOMParser();
        var xml = pXml.replace(/\\"/g, '"');
        if (xml)
        {
            var xmlDoc = parser.parseFromString(xml, "text/xml");
            if (xmlDoc)
            {
                var tag_jeton_comm = xmlDoc.getElementsByTagName("jeton_comm")[0];
                if (tag_jeton_comm) {
                    if (tag_jeton_comm.childNodes[0]) {
                        jeton = tag_jeton_comm.childNodes[0].nodeValue;
                    }
                }
            }
        }
    }

    return jeton;
}

function RamqBillReSendToRamq()
{
    globRamqOperationType = "Update";
    if (globRamqJetonComm && globRamqNoFactRamq) {
        RamqSoumissionDemandesModification();
    }
    else {
        RamqRESoumissionDemandesPaiement();
    }
}

    