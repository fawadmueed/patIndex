var globRamqBillArrListBill;
var globRamqBillInfo;
var globRamqJetonComm;
var globRamqNoFactRamq;
//var arrGrilleDeFacturation_update;
//var arrGrilleDeFacturation_forms_update;
var globRamqBillMessageTable;
var globRamqBillPaymentTable;
var globRamqBillPaymentObjRowData;


var globRamqBillArrDataForMessageTable = [];
var globRamqBillArrDataForPaymentTable = [];
//Global variable for printing report.
var qFACT;

$(document).ready(function () {
    //Payment table
    globRamqBillPaymentTable = $('#tblRamqPaiments').DataTable({
        "columns": [
            null,
            null,
            null,
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
        dom: 'Bfrtip',
        buttons: ['excelHtml5'],
        searching:false
    });

    $('#tblRamqPaiments tbody').on('click', 'tr', function () {
        globRamqBillPaymentObjRowData = globRamqBillPaymentTable.row(this).data();
        RamqBillPaymentOpenDetails();
        //Clean form Payment details
        $('#regi_pamnt_no_recu').val('');
        $('#regi_pamnt_code').val('');
        $('#regi_pamnt_rason').val('');
        $('#regi_pamnt').val('');
        $('#regi_pamnt_effectu').val('');
    });

    //Message Table
     globRamqBillMessageTable = $('#reg_msg_tbl').DataTable({
        "columns": [
            { "width": "20%" },
            { "width": "10%" },
            { "width": "20%" },
            { "width": "20%" },
            { "width": "30%" },
            { "visible": false }
        ],
        dom: 'Bfrtip',
        buttons: ['excelHtml5'],
        searching: false
    });

    $('#reg_msg_tbl tbody').on('click', 'tr', function () {
        var rowData = globRamqBillMessageTable.row(this).data();
        RamqBillMessageShowError(rowData[5]);
    });

});

function RamqBillGetList()
{
    RamqBillClearTable();
    RamqBillGetDataFromServer();
}

function RamqBillGetDataFromServer()
{
    var dateFrom = $("#rgie_fact_ane_start").val();
    var dateTo = $("#rgie_fact_ane_end").val();
    $.post("allScriptsv1.py", { tx: "getPatientFactures", clinicId: globClinicId, patientId: globPatientId, dFrom: dateFrom, dTo: dateTo },
            function (result) {
                if (result.message !== undefined)
                    alert(result.message);
                else {
                    if (result.factures.length > 0) {
                        // put result to global variable for further using in report.
                        //qFACT = result.factures;
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
        objOutputData.Nom = (objInputData.info[0][1] && objInputData.info[0][1].NomPers)?objInputData.info[0][1].NomPers:'';
        objOutputData.Prenom = (objInputData.info[0][1] && objInputData.info[0][1].PrePers) ? objInputData.info[0][1].PrePers : '';
        objOutputData.Montant = (objInputData.xml)?RamqBillGetMontant(objInputData.xml):'0.00';
        objOutputData.Status = pArrDataFromServer[i].status;
        objOutputData.IfUpdatePossible = RamqBillIfUpdatePossible(pArrDataFromServer[i].status, objInputData.dateregie);

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
        tableContent += "<td>" + ((pArrDataForTable[i].Status == 1) ? 'Accepté':((pArrDataForTable[i].Status == 3) ? "Annulé":'Non transmis')) + "</td>"; //Status
        tableContent += "</tr>";
        totalAmount += parseFloat(pArrDataForTable[i].Montant);
    }

    $('#rgie_fact_table tbody').append(tableContent);
    $('#nombre_factures_regie').val(numberOfBills);
    $('#total_factures_regie').val(totalAmount);

}

function RamqBillGetNoRamq(pObjDataFromServer)
{
    var ramqNo = '';
    try {
        ramqNo = pObjDataFromServer[0][1].IdPers;
    }
    catch (ex)
    {
    }
    return ramqNo;
}


function RamqBillGetMontant(pXmlResp)
{
    var totalAmount = 0;
    try {
        var parser = new DOMParser();
        var xml = pXmlResp.replace(/\\"/g, '"');
        if (xml) {
            var xmlDoc = parser.parseFromString(xml, "text/xml");
            if (xmlDoc) {
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
    }
    catch (e)
    { }
    return totalAmount.toFixed(2);
}

function RamqBillGetStatus(pstatus)
{
    var status = 0;
    
    return status;
}

function RamqBillPopulatDetailsArrays(pBillNumber)
{
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
    RamqBillClearFormFactureDetails();

    globRamqBillInfo = pArrBilldata;
    arrGrilleDeFacturation_update = pArrBilldata.info[1];
    arrGrilleDeFacturation_forms_update = pArrBilldata.info[2];
    globBillNumber = pArrBilldata.facture;
    //dent_Type = pArrBilldata.info[0][1].TypProf;

    globRamqJetonComm = RamqBillGetJetonComm(pArrBilldata.xml);
    globRamqNoFactRamq = RamqBillGetNoFactRamq(pArrBilldata.xml);

    var objCommonBillData = pArrBilldata.info[0];
    var objVisionRData = pArrBilldata.info[0][1];
    var objAdditionalData = pArrBilldata.info[0][2];

    //Identification du patient
    $('#no_dosir_regie_fact').val((pArrBilldata && pArrBilldata.nodossier) ? pArrBilldata.nodossier : '');
    $('#prenom_regie_fact').val((objVisionRData && objVisionRData.PrePers) ? objVisionRData.PrePers : '');
    $('#nom_regie_fact').val((objVisionRData && objVisionRData.NomPers) ? objVisionRData.NomPers : '');
    $('#amq_regie_fact').val((objVisionRData && objVisionRData.IdPers) ? objVisionRData.IdPers : '');
    $('#sexe_regie_fact').val((objVisionRData && objVisionRData.CodSexPers) ? objVisionRData.CodSexPers : '');
    $('#exp_regie_fact').val((objVisionRData && objVisionRData.NamExpDate) ? objVisionRData.NamExpDate : '');

    //ancienne facture
    $('#no_facture_regie_fact').val((pArrBilldata && pArrBilldata.facture) ? pArrBilldata.facture : '');
    $('#no_recu_regie_fact').val(globRamqNoFactRamq);
    
    $('#no_code_regie_fact').val(globRamqJetonComm);
    $('#ancienne_montant_regie_fact').val(RamqBillGetMontant(pArrBilldata.xml));

    //Nouvelle facture
    //$('#nouvel_no_facture').val(''); //TODO:
    //$('#novl_montant_regie_fact').val(''); //TODO:

    //renseignements complementaires regie
    if (objVisionRData && objVisionRData.IdPers)
    {
        $('#carte_as_malad_oui_regie_fact').prop('checked', true);
    }
    else
    {
        $('#carte_as_malad_non_regie_fact').prop('checked', true);
    }

    if (objAdditionalData && objAdditionalData.RembDemParPatient)
        $('#remb_dem_oui_regie_fact').prop('checked', true);
    else
        $('#remb_dem_non_regie_fact').prop('checked', true);

    if (objAdditionalData && objAdditionalData.IndFactAssosDr)
        $('#optRegiIndFactAssosDrYes_Upd').prop('checked', true);
    else
        $('#optRegiIndFactAssosDrNo_Upd').prop('checked', true);
    

    //professionel
    $('#pamnt_no_prof_regie_fact').val((objVisionRData && objVisionRData.IdProf) ? objVisionRData.IdProf : '');
    $('#pamnt_no_grp_regie_fact').val('');//TODO:
    if (objAdditionalData && objAdditionalData.IsComptePersonnel) {
        $('#optRegiePaimentComptePers_upd').prop('checked', true);
        $('.txtRegiPa_upd').hide();
    }
    else if (objAdditionalData && !objAdditionalData.IsComptePersonnel) {
        $('#optRegiePaimentCompteAdmin_upd').prop('checked', true);
        $('#txtRegiPaimentNoCompteAdmin_upd').val(objAdditionalData.NoCpteAdmin);
        $('.txtRegiPa_upd').show();
    }
        
    
    //code diagnostic
    if (objAdditionalData && objAdditionalData.CodDiagnMdcal)
    {
        if (objAdditionalData.CodDiagnMdcal === '5210')
            $('#code_diag_carie_dent_Upd').prop('checked', true);
        else if (objAdditionalData.CodDiagnMdcal === 'V909')
            $('#code_diag_etat_norm_Upd').prop('checked', true);
        else
        {
            $('#code_diag_autre_radio_Upd').prop('checked', true);
            $('#code_diag_autre_field_Upd').val(objAdditionalData.CodDiagnMdcal);
        }
    }

    //evenement 
    $('#pamnt_even_date_regie_fact').val((objAdditionalData && objAdditionalData.DatEvenePers) ? objAdditionalData.DatEvenePers : '');
    //period d'hospital.
    $('#pamnt_date_entre_regie_fact').val((objAdditionalData && objAdditionalData.DatEntrePersLieu) ? objAdditionalData.DatEntrePersLieu : '');
    $('#pamnt_date_sorti_regie_fact').val((objAdditionalData && objAdditionalData.DatSortiPersLieu) ? objAdditionalData.DatSortiPersLieu : '');

    //Lieu de dispensation
    
    if (objAdditionalData && objAdditionalData.LieuCodifieRegie) {
        $('#lieu_codifie_regie_fact').prop('checked', true);
        $('#lieu_codifie_non_regie_fact').prop('checked', false);
        $('.codif_selection_lieu').show();
        $('.codif_selection_non').hide();

    }
    else if (objAdditionalData && objAdditionalData.LieuNonCodifieRegie) {
        $('#lieu_codifie_regie_fact').prop('checked', false);
        $('#lieu_codifie_non_regie_fact').prop('checked', true);
        $('.codif_selection_lieu').hide();
        $('.codif_selection_non').show();
    }

    
  
    $('#num_lieu_regie_fact').val((objAdditionalData && objAdditionalData.IdLieuPhys) ? objAdditionalData.IdLieuPhys : '');
    $('#secteur_active_regie_fact').val((objAdditionalData && objAdditionalData.NoSectActiv) ? objAdditionalData.NoSectActiv : '');//ddl
    $('#cod_post_lieu_regie_fact').val((objAdditionalData && objAdditionalData.CodePostal) ? objAdditionalData.CodePostal : '');
    $('#cod_loc_regie_fact').val((objAdditionalData && objAdditionalData.CodeLocalite) ? objAdditionalData.CodeLocalite : '');
    $('#no_bur_regie_fact').val((objAdditionalData && objAdditionalData.NoBur) ? objAdditionalData.NoBur : '');

    if (objAdditionalData && objAdditionalData.TypeDeLieu && objAdditionalData.TypeDeLieu == "C")
    {
        $('#type_lieu_cab_regie_fact').prop('checked', true);
    }
    else if (objAdditionalData && objAdditionalData.TypeDeLieu && objAdditionalData.TypeDeLieu == "D")
    {
        $('#type_lieu_dom_regie_fact').prop('checked', true);
    }
    else if (objAdditionalData && objAdditionalData.TypeDeLieu && objAdditionalData.TypeDeLieu == "A")
    {
        $('#type_lieu_aut_regie_fact').prop('checked', true);
    }

    $('#txtRamqSpecialNams').val(objAdditionalData && objAdditionalData.NoRamqSpecial);

    //Show/ hide buttons "Annuler fact" & Transferer a la Regie

    var isBillEditable = RamqBillIfUpdatePossible(pArrBilldata.status, pArrBilldata.dateregie);
    if (isBillEditable) {
        //Show two buttons
        $('#btn_anuler_fact').removeClass("disabled");
        $('#btn_detail_trnsfr_regi').removeClass("disabled");
    }
    else if (pArrBilldata.status == 0 || pArrBilldata.status == 2) // non transmis or Refuse
    {
        $('#btn_anuler_fact').addClass("disabled");
        $('#btn_detail_trnsfr_regi').removeClass("disabled");
    }
    else
    {
        $('#btn_anuler_fact').addClass("disabled");
        $('#btn_detail_trnsfr_regi').addClass("disabled");
    }
    
    Regie_fact_modal();
}

function RamqBillUpdateBillInfo() {
    /*
        update global variable globRamqBillInfo before send update request to Ramq
    */

    var objVisionRData = globRamqBillInfo.info[0][1];
    var objAdditionalData = globRamqBillInfo.info[0][2];

    //Identification du patient
    globRamqBillInfo.nodossier = $('#no_dosir_regie_fact').val();

    objVisionRData.PrePers = $('#prenom_regie_fact').val();
    objVisionRData.NomPers = $('#nom_regie_fact').val();
    objVisionRData.IdPers = $('#amq_regie_fact').val();
    objVisionRData.CodSexPers = $('#sexe_regie_fact').val();
    objVisionRData.NamExpDate = $('#exp_regie_fact').val();

    //ancienne facture
    //User cannot update this section.

    //Nouvelle facture
    //User cannot update this section.

    //renseignements complementaires regie

    objAdditionalData.RembDemParPatient = $('#remb_dem_oui_regie_fact').is(':checked');
    objAdditionalData.IndFactAssosDr = ($('#optRegiIndFactAssosDrYes_Upd').is(':checked')) ? 'true' : 'false';

    //professionel
    objVisionRData.IdProf = $('#pamnt_no_prof_regie_fact').val();
    objAdditionalData.TypModaPaimt = ($('#optRegiePaimentComptePers_upd').is(':checked')) ? '1' : '2';
    objAdditionalData.IsComptePersonnel = ($('#optRegiePaimentComptePers_upd').is(':checked'));
    objAdditionalData.NoCpteAdmin = $('#txtRegiPaimentNoCompteAdmin_upd').val();

    //code diagnostic
    if ($('#code_diag_carie_dent_Upd').is(':checked'))
        objAdditionalData.CodDiagnMdcal = '5210';
    else if ($('#code_diag_etat_norm_Upd').is(':checked'))
        objAdditionalData.CodDiagnMdcal = 'V909';
    else if ($('#code_diag_autre_radio_Upd').is(':checked'))
        objAdditionalData.CodDiagnMdcal = $('#code_diag_autre_field_Upd').val(); //separated by comma

    //evenement 
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

    objAdditionalData.NoRamqSpecial = $('#txtRamqSpecialNams_Upd').val();

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

function RamqBillClearPaymentTable()
{
    $('#tblRamqPaiments tbody').empty();
    $('#txtRamqPaymentNonPayedBill').val('');
    $('#txtRamqPaymentTotalBill').val('');
    $('#txtRamqPaymentNoPayments').val('');
    $('#txtRamqPaymentTotalPayments').val('');
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

function RamqBillClearFormFactures() {
    $("#rgie_fact_table tbody").empty();
    $('#rgie_fact_ane_start').val('');
    $('#rgie_fact_ane_end').val('');
    $('#nombre_factures_regie').val('');
    $('#total_factures_regie').val('');
}

function RamqBillClearFormFactureDetails()
{
    
    // Identification du patient
    $('#no_dosir_regie_fact').val('');
    $('#prenom_regie_fact').val('');
    $('#nom_regie_fact').val('');
    $('#amq_regie_fact').val('');
    $('#sexe_regie_fact').val('');
    $('#exp_regie_fact').val('');

    //Ancienne facture
    $('#no_facture_regie_fact').val('');
    $('#no_recu_regie_fact').val('');
    $('#no_code_regie_fact').val('');
    $('#ancienne_montant_regie_fact').val('');

    //Nouvelle facture
    //$('#nouvel_no_facture').val('');
    //$('#novl_montant_regie_fact').val('');

    //Renseignement complementaires regie
    $('#carte_as_malad_oui_regie_fact').prop('checked', false);
    $('#carte_as_malad_non_regie_fact').prop('checked', false);
    $('#remb_dem_oui_regie_fact').prop('checked', false);
    $('#remb_dem_non_regie_fact').prop('checked', false);
    $('#optRegiIndFactAssosDrYes_Upd').prop('checked', false);
    $('#optRegiIndFactAssosDrNo_Upd').prop('checked', false);

    //Professionel
    $('#pamnt_no_prof_regie_fact').val('');
    $('#pamnt_no_grp_regie_fact').val('');
    $('#optRegiePaimentComptePers_upd').prop('checked', false);
    $('#optRegiePaimentCompteAdmin_upd').prop('checked', false);
    $('#txtRegiPaimentNoCompteAdmin_upd').val('');

    //Code diagnostic
    $('#code_diag_carie_dent_Upd').prop('checked', false);
    $('#code_diag_etat_norm_Upd').prop('checked', false);
    $('#code_diag_autre_radio_Upd').prop('checked', false);
    $('#code_diag_autre_field_Upd').val('');

    $('#pamnt_even_date_regie_fact').val('');

    //Period d'hospi.
    $('#pamnt_date_entre_regie_fact').val('');
    $('#pamnt_date_sorti_regie_fact').val('');

    //Lieu de dispensation
    $('#lieu_codifie_regie_fact').prop('checked', false);
    $('#lieu_codifie_non_regie_fact').prop('checked', false);
    $('#cod_post_lieu_regie_fact').val('');
    $('#cod_loc_regie_fact').val('');
    $('#no_bur_regie_fact').val('');
    $('#').val('');
    $("#secteur_active_regie_fact").val($("#secteur_active_regie_fact option:first").val());
    $('#type_lieu_cab_regie_fact').prop('checked', false);
    $('#type_lieu_dom_regie_fact').prop('checked', false);
    $('#type_lieu_aut_regie_fact').prop('checked', false);

    $('#txtRamqSpecialNams_Upd').val('');

    //Hide fields
    $('.txtRegiPa_upd').hide();
    $('.codif_selection_non').hide();
    $('.codif_selection_lieu').hide();
}

//=========================================Message========================================

function RamqBillGetMessageLog()
{
    var dateFrom = $('#reg_msg_date_frm').val();
    var dateTo = $('#reg_msg_date_to').val();
    var blFrom = $('#reg_msg_no_fact_frm').val();
    var blTo = $('#reg_msg_no_fact_to').val();

    $.post("allScriptsv1.py", { tx: "getPatientLogs",clinicId: globClinicId, patientId: globPatientId, dFrom: dateFrom, dTo: dateTo, billTo: blTo, billFrom: blFrom },
        function (result) {
            if (result.message !== undefined)
                alert(result.message);
            else {
                
                globRamqBillArrDataForMessageTable = RamqBillCreateDataArrForMessageTable(result.logs);
                RamqBillUpdateMessageTable(globRamqBillArrDataForMessageTable);
            }
        });
}
    
function RamqBillCreateDataArrForMessageTable(pArrLogs)
{
    var arrRes = [];

    for (var i = 0; i < pArrLogs.length; i++)
    {
        var arr = [];
        

        var objDataFromXml = RamqBillMessageGetDataFromXml(pArrLogs[i].xml);
        if (objDataFromXml)
        {
            arr.push(objDataFromXml.noRamq);
            arr.push(pArrLogs[i].facture);
            arr.push(pArrLogs[i].datecreation);

            arr.push(objDataFromXml.status);
            arr.push((objDataFromXml.message) ? objDataFromXml.message : '');
            arr.push((objDataFromXml.detailsMessage) ? objDataFromXml.detailsMessage : '');
        }
        arrRes.push(arr);
    }
    return arrRes;
}

function RamqBillMessageGetDataFromXml(pXml)
{
    var response = {};
    var parser = new DOMParser();
    var xml = pXml.replace(/\\"/g, '"');
    var xmlDoc = parser.parseFromString(xml, "text/xml");

    //Global info
    var ramqNo = (xmlDoc.getElementsByTagName("no_fact_ramq")[0] != null) ? xmlDoc.getElementsByTagName("no_fact_ramq")[0].childNodes[0].nodeValue : null;
    response.noRamq = (ramqNo) ? ramqNo : '';
    var status = (xmlDoc.getElementsByTagName("sta_recev")[0] != null) ? xmlDoc.getElementsByTagName("sta_recev")[0].childNodes[0].nodeValue : null;
    if (status)
    {
        response.status = (status == "2") ? 'Non recevable' : (status == "1") ? 'Recevable' : '';

        var arrMsgExplRecev = xmlDoc.getElementsByTagName('msg_expl_recev');
        if (arrMsgExplRecev.length > 0)
        {
            var msg = '';
            for (var i = 0; i < arrMsgExplRecev.length; i++)
            {
                if (i == arrMsgExplRecev.length-1)
                {
                    msg += arrMsgExplRecev[i].childNodes[0].innerHTML + ': ' + arrMsgExplRecev[i].childNodes[1].innerHTML;
                    //response.message = globalMsg.substr(0,20)+'...';
                }
                else {
                    msg += arrMsgExplRecev[i].childNodes[0].innerHTML + ': ' + arrMsgExplRecev[i].childNodes[1].innerHTML + '|';
                }
            }
            response.message = msg.substr(0, 25) + '...';
            response.detailsMessage = msg;
        }
    }
    return response;
}

function RamqBillPopulateMessageTable(pArrData)
{
    globRamqBillMessageTable.clear().draw();
    globRamqBillMessageTable.rows.add(pArrData); // Add new data
    globRamqBillMessageTable.columns.adjust().draw();

}

function RamqBillMessageShowError(pMessage)
{
    if (pMessage != '')
    {
        var msg = pMessage.replace(/\|/g, '\n');
        alert(msg);
    }
}

function RamqBillUpdateMessageTable()
{
    if ($('#reg_fact_chck_msg_der').is(':checked')) {
        var arrData = [];
        for (var i = 0; i < globRamqBillArrDataForMessageTable.length; i++) {
            if (globRamqBillArrDataForMessageTable[i][3] === 'Non recevable') {
                arrData.push(globRamqBillArrDataForMessageTable[i]);
            }
        }
        RamqBillPopulateMessageTable(arrData);
    }
    else {
        RamqBillPopulateMessageTable(globRamqBillArrDataForMessageTable);
    }
}

//========================================= Payments ========================================
function RamqBillGetPaymentList() {
    RamqBillClearPaymentTable();

    var dateFrom = $('#txtRamqPaymentDateFrom').val();
    var dateTo = $('#txtRamqPaymentDateTo').val();
    var patId = globPatientId;
    if ($('#chkRamqPaymentDisplayAllPatient').is(':checked'))
    {
        patId = ''
    }
    
    $.post("allScriptsv1.py", { tx: "getAcceptedBills", clinicId: globClinicId, patientId: patId, dFrom: dateFrom, dTo: dateTo },
        function (result) {
            if (result.message !== undefined)
                alert(result.message);
            else {
                globRamqBillArrDataForPaymentTable = RamqBillCreateDataArrForPaymentTable(result.factures);
                RamqBillPaymentUpdateTable();
            }
        });
}

function RamqBillCreateDataArrForPaymentTable(pArrPayment)
{
    var arrRes = [];

    for (var i = 0; i < pArrPayment.length; i++)
    {
        var arr = [];
        

        var objDataFromXml = RamqBillPaymentGetDataFromXml(pArrPayment[i].xml);
        if (objDataFromXml)
        {
            var billAmount = objDataFromXml.honoraires;
            var ramqPayment = 0;
            if (pArrPayment[i].Payment && pArrPayment[i].Payment.Payment && Number(pArrPayment[i].Payment.Payment))
            {
                ramqPayment = Number(pArrPayment[i].Payment.Payment);
            }
            
            
            var payeeStatus = "Non";
            if (ramqPayment !=null && parseFloat(billAmount).toFixed(2) == parseFloat(ramqPayment).toFixed(2))
            {
                payeeStatus = "Oui";
            }

            arr.push(pArrPayment[i].nodossier);//dossier
            arr.push(objDataFromXml.noRamq);//#AMQ
            arr.push(pArrPayment[i].dateregie);//RamqDate
            arr.push(pArrPayment[i].facture);//billNumber.
            arr.push(billAmount);//amount of bill
            arr.push((pArrPayment[i].Payment && pArrPayment[i].Payment.NoRecu)?pArrPayment[i].Payment.NoRecu:'');//No recu
            arr.push((pArrPayment[i].Payment && pArrPayment[i].Payment.Code) ? pArrPayment[i].Payment.Code : '');//Code
            arr.push((pArrPayment[i].Payment && pArrPayment[i].Payment.Raison) ? pArrPayment[i].Payment.Raison : '');//Raison
            arr.push(ramqPayment.toFixed(2));//Paiment
            arr.push((pArrPayment[i].Payment && pArrPayment[i].Payment.Effectue) ? pArrPayment[i].Payment.Effectue : '');//effectue 
            arr.push(payeeStatus);
            arr.push(pArrPayment[i].patientId);//billNumber.
        }
        arrRes.push(arr);
    }
    return arrRes;
}

function RamqBillPaymentGetDataFromXml(pXml)
{
    var response = {};
    var parser = new DOMParser();
    var xml = pXml.replace(/\\"/g, '"');
    var xmlDoc = parser.parseFromString(xml, "text/xml");

    //Global info
    var ramqNo = (xmlDoc.getElementsByTagName("no_fact_ramq")[0] != null) ? xmlDoc.getElementsByTagName("no_fact_ramq")[0].childNodes[0].nodeValue : null;
    response.noRamq = (ramqNo) ? ramqNo : '';
    response.honoraires = RamqBillGetMontant(pXml);

    return response;
}

function RamqBillPaymentOpenDetails()
{
    modPaimnt();
}

function RamqBillPaymentSendPaymentDetails()
{
    var noDossier = globRamqBillPaymentObjRowData[0]
    var billNo = globRamqBillPaymentObjRowData[3];
    var noRecu = $('#regi_pamnt_no_recu').val();
    var code = $('#regi_pamnt_code').val();
    var raison = $('#regi_pamnt_rason').val();
    var payment = $('#regi_pamnt').val();
    var effectue = $('#regi_pamnt_effectu').val();
    //TODO: change globPatientId to patId from table payment.
    $.post("allScriptsv1.py", { tx: "addpayment", clinicId: globClinicId, patientId: globRamqBillPaymentObjRowData[11], nodossier: noDossier, nofact: billNo, NoRecu: noRecu, Code: code, Raison: raison, Payment: payment, Effectue: effectue },
        function (result) {
            if (result.outcome == 'error')
                alert(result.message);
            else {
                alert("Payment info saved successfully");
            }
        });
}

function RamqBillPopulatePaymentTable(pArrData)
{
    globRamqBillPaymentTable.clear().draw();
    globRamqBillPaymentTable.rows.add(pArrData); // Add new data
    globRamqBillPaymentTable.columns.adjust().draw();

    $('#txtRamqPaymentNonPayedBill').val(RamqBillPaymentGetNonPayedBillNo(pArrData));
    $('#txtRamqPaymentTotalBill').val(RamqBillPaymentGetBillTotalAmount(pArrData));
    $('#txtRamqPaymentNoPayments').val(RamqBillPaymentGetPaymentNo(pArrData));
    $('#txtRamqPaymentTotalPayments').val(RamqBillPaymentGetPaymentTotalAmount(pArrData));
}

function RamqBillPaymentUpdateTable()
{
    if($('#optRamqPaymentAllBills').is(':checked'))
    {
        RamqBillPopulatePaymentTable(globRamqBillArrDataForPaymentTable);
    }
    else if($('#optRamqPaymentPayedBills').is(':checked'))
    {
        var arrData = [];
        for(var i=0; i< globRamqBillArrDataForPaymentTable.length; i++)
        {
            if(globRamqBillArrDataForPaymentTable[i][8]!=='0.00')
            {
                arrData.push(globRamqBillArrDataForPaymentTable[i]);
                RamqBillPopulatePaymentTable(arrData);
            }
        }
    }
    else if($('#optRamqNonPayedBills').is(':checked'))
    {
        var arrData = [];
        for(var i=0; i< globRamqBillArrDataForPaymentTable.length; i++)
        {
            if(globRamqBillArrDataForPaymentTable[i][8] =='0.00')
            {
                arrData.push(globRamqBillArrDataForPaymentTable[i]);
                RamqBillPopulatePaymentTable(arrData);
            }
        }
    }
}

function RamqBillPaymentGetNonPayedBillNo(pArrData)
{
    var res = 0;
    for(var i= 0; i< pArrData.length; i++)
    {
        if(pArrData[i][8]===0)
        {
            res++;
        }
    }
    return res;
}

function RamqBillPaymentGetBillTotalAmount(pArrData)
{
    var res = 0;
    for(var i= 0; i< pArrData.length; i++)
    {
        if(pArrData[i][4]!=='')
        {
            var amount = Number(pArrData[i][4]);
            if (!isNaN(amount)) 
            {
                res += amount;
            }
        }
    }
    return res;
}

function RamqBillPaymentGetPaymentNo(pArrData)
{
    var res = 0;
    for(var i= 0; i< pArrData.length; i++)
    {
        if(pArrData[i][8]!=='')
        {
            res++;
        }
    }
    return res;
}

function RamqBillPaymentGetPaymentTotalAmount(pArrData)
{
    var res = 0;
    for(var i= 0; i< pArrData.length; i++)
    {
        if(pArrData[i][8]!=='')
        {
            var amount = Number(pArrData[i][8]);
            if (!isNaN(amount)) 
            {
                res += amount;
            }
        }
    }
    return res.toFixed(2);
}