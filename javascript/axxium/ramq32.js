var globVisionRData;
var globRamqOperationType; //value: New, Update. Uses to define which form "More" should be used.
var globBillNumber; //The number of "global" bill.
// dent_Type is a global variable : Dentist, Chirurgiens, Denturologiste
//TODO:rename SoumissionDemandesPaiement to RamqSoumissionDemandesPaiement;

$(document).ready(function () {
    globVisionRData = RamqGetVisionRData();
    
});
function SoumissionDemandesPaiement()
{
    RamqBillClearFormFactures();
    globRamqOperationType = "New";
    var objSoumissionDemandesPaiementData = RamqSoumissionDemandesPaiementGetData();
    if (objSoumissionDemandesPaiementData != null && objSoumissionDemandesPaiementData[1].length != 0)
    {
        var operationName = "Paiement";
        var inputXMl = RamqGetXmlToSend(operationName, objSoumissionDemandesPaiementData); //This data is used to send to RAMQ.

        var jsonXML = {
            "request": inputXMl,
            "info": objSoumissionDemandesPaiementData //this data is used to store bill info on the server
        }

        var strJsonXML = JSON.stringify(jsonXML)
        
        $.post("allScriptsv1.py", { tx: "getRamqData", clinicId: globClinicId, patientId: globPatientId, nodossier: globNoDossier, nofact: globBillNumber, json: strJsonXML },
                    function (result) {
                        if (result.outcome === 'error')//Display python Error
                        {
                            alert(result.message);
                        }
                        else if (result.message != null && result.message.substring(0, 5) == 'Error')
                        {
                            displayRamqAnswer("RAMQ", result.message);
                        }
                        else if (result.message != null && result.message.substring(0, 5) != 'Error') {
                            var objResponse = parseRAMQResponsePaiment(result.message);
                            displayResponsePaiment(objResponse);
                        }
                        else {
                            displayRamqAnswer("RAMQ", "SoumissionDemandesPaiement Error");
                        }
                    })
            .fail(function () {
                alert("Ramq SoumissionDemandesPaiement Error.");
            });
    }
    else {
        alert("There is nothing to send.")
    }
}

function RamqSoumissionDemandesModification()
{
    RamqBillClearFormFactures();
    var objSoumissionDemandesModificationData = RamqSoumissionDemandesModificationGetData();
    if (objSoumissionDemandesModificationData != null)
    {
        var operationName = "Modification";
        var inputXMl = RamqGetXmlToSend(operationName, objSoumissionDemandesModificationData); //This data is used to send to RAMQ.

        var jsonXML = {
            "request": inputXMl,
            "info": objSoumissionDemandesModificationData //this data is used to store bill info on the server
        }
        
        $.post("allScriptsv1.py", { tx: "modifyRamqData", clinicId: globClinicId, patientId: globPatientId, nodossier: globNoDossier, nofact: globBillNumber, json: JSON.stringify(jsonXML) },
                    function (result) {
                        if (result.outcome === 'error')//Display python Error
                        {
                            alert(result.message);
                        }
                        else if (result.message != null && result.message.substring(0, 5) == 'Error') {
                            displayRamqAnswer("RAMQ", result.message);
                        }
                        else if (result.message != null && result.message.substring(0, 5) != 'Error') {
                            var objResponse = parseRAMQResponseModification(result.message);
                            displayResponseModification(objResponse);
                        }
                        else {
                            displayRamqAnswer("RAMQ", "RamqSoumissionDemandesModification Error");
                        }
                    })
            .fail(function () {
                alert("Ramq RamqSoumissionDemandesModification Error.");
            });
    }
    else {
        alert("There is nothing to send.")
    }
}

function RamqSoumissionDemandedAnnulation() {
    RamqBillClearFormFactures();
    var objSoumissionDemandesAnnulationData = RamqSoumissionDemandesAnnulationGetData();
    if (objSoumissionDemandesAnnulationData != null) {
        var operationName = "Annulation";
        var inputXMl = RamqGetXmlToSend(operationName, objSoumissionDemandesAnnulationData); //This data is used to send to RAMQ.

        var jsonXML = {
            "request": inputXMl,
            "info": objSoumissionDemandesAnnulationData //this data is used to store bill info on the server
        }
        
        $.post("allScriptsv1.py", { tx: "cancelRamqData", clinicId: globClinicId, patientId: globPatientId, nodossier: globNoDossier, nofact: globBillNumber, json: JSON.stringify(jsonXML) },
                    function (result) {
                        if (result.outcome === 'error')//Display python Error
                        {
                            alert(result.message);
                        }
                        else if (result.message != null && result.message.substring(0, 5) == 'Error') {
                            displayRamqAnswer("RAMQ", result.message);
                        }
                        else if (result.message != null && result.message.substring(0, 5) != 'Error') {
                            var objResponse = parseRAMQResponseAnnulation(result.message);
                            displayResponseAnnulation(objResponse);
                        }
                        else {
                            displayRamqAnswer("RAMQ", "RamqSoumissionDemandesAnnulation Error");
                        }
                    })
            .fail(function () {
                alert("Ramq RamqSoumissionDemandesAnnulation Error.");
            });
    }
    else {
        alert("There is nothing to send.")
    }
}

function RamqRESoumissionDemandesPaiement()
{
    RamqBillClearFormFactures();
    var objRESoumissionDemandesPaiementData = RamqRESoumissionDemandesPaiementGetData();
    if (objRESoumissionDemandesPaiementData != null) {
        var operationName = "Paiement";
        var inputXMl = RamqGetXmlToSend(operationName, objRESoumissionDemandesPaiementData); //This data is used to send to RAMQ.

        var jsonXML = {
            "request": inputXMl,
            "info": objRESoumissionDemandesPaiementData //this data is used to store bill info on the server
        }
        
        $.post("allScriptsv1.py", { tx: "getRamqData", clinicId: globClinicId, patientId: globPatientId, nodossier: globNoDossier, nofact: globBillNumber, json: JSON.stringify(jsonXML) },
                    function (result) {
                        if (result.outcome === 'error')//Display python Error
                        {
                            alert(result.message);
                        }
                        else if (result.message != null && result.message.substring(0, 5) == 'Error') {
                            displayRamqAnswer("RAMQ", result.message);
                        }
                        else if (result.message != null && result.message.substring(0, 5) != 'Error') {
                            var objResponse = parseRAMQResponsePaiment(result.message);
                            displayResponsePaiment(objResponse);
                        }
                        else {
                            displayRamqAnswer("RAMQ", "SoumissionDemandesPaiement Error");
                        }
                    })
            .fail(function () {
                alert("Ramq SoumissionDemandesPaiement Error.");
            });
    }
    else {
        alert("There is nothing to send.")
    }
}

function RamqGetXmlToSend(operationName, _objData)
{
    var xmlAEnvoyer = '';

    if (operationName == 'Paiement')
    {
        xmlAEnvoyer = RamqGetSoumissionDemandesPaimentXML(_objData);
    }
    else if (operationName == 'Modification')
    {
        xmlAEnvoyer = RamqGetSoumissionDemandesModificationXML(_objData);
    }
    else if (operationName == 'Annulation')
    {
        xmlAEnvoyer = RamqGetSoumissionDemandesAnnulationXML(_objData);
    }
    
    return xmlAEnvoyer;
}

// Create common part for all specialists
function RamqGetSoumissionDemandesPaimentXML(_arrData) {

    var xml = '<?xml version=\\"1.0\\" encoding=\\"utf-8\\"?>' +
    '<dem_paimt xmlns=\\"urn:ramq-gouv-qc-ca:RFP\\">' +
    '<no_dem_ext>' + RamqGenerateNoDemExt() + '</no_dem_ext>' +
    '<logcl_fact>' +
        '<no_devpr_logcl>' + _arrData[0][0].NoDevprLogcl + '</no_devpr_logcl>' + //?
        '<nom_devpr_logcl>' + _arrData[0][0].NomDevprLogcl + '</nom_devpr_logcl>' + //?
        '<nom_logcl_fact>' + _arrData[0][0].NomLogclFact + '</nom_logcl_fact>' + //?
        '<no_versi_logcl_fact>' + _arrData[0][0].NoVersiLogclFact + '</no_versi_logcl_fact>' + //?
        '<no_versi_xml_dem>' + _arrData[0][0].NoVersiXmlDem + '</no_versi_xml_dem>' + //?
    '</logcl_fact>' +
    '<demdr>' +
        '<typ_id_intvn>' + _arrData[0][1].DemdrTypIdIntvn + '</typ_id_intvn>' + //const
        '<id_intvn>' + _arrData[0][2].DemdrIdIntvn + '</id_intvn>' + //?
    '</demdr>' +
    '<exped_difrn_demdr>' +
        '<typ_id_intvn>' + _arrData[0][1].ExpedTypIdIntvn + '</typ_id_intvn>' + //const
        '<id_intvn>' + _arrData[0][1].ExpedIdIntvn + '</id_intvn>' + //?
    '</exped_difrn_demdr>' +
    '<moda_paimt>' +
        '<typ_moda_paimt>' + _arrData[0][2].TypModaPaimt + '</typ_moda_paimt>' + //1 : Compte personnel du professionnel 2 : Compte administratif
        RamqGenerateNoCpteAdmin(_arrData[0][2].TypModaPaimt, _arrData[0][2].NoCpteAdmin) + 
    '</moda_paimt>' +
    '<liste_fact>' +
        RamqGetListFact(_arrData) +
    '</liste_fact>' +
'</dem_paimt>';
    return xml;
}

// Create common part for all specialists
function RamqGetSoumissionDemandesModificationXML(_arrData) {
    var xml = '<?xml version=\\"1.0\\" encoding=\\"utf-8\\"?>' +
    '<dem_modif xmlns=\\"urn:ramq-gouv-qc-ca:RFP\\">' +
    '<no_dem_ext>' + RamqGenerateNoDemExt() + '</no_dem_ext>' +
    '<logcl_fact>' +
        '<no_devpr_logcl>' + _arrData[0][0].NoDevprLogcl + '</no_devpr_logcl>' + //?
        '<nom_devpr_logcl>' + _arrData[0][0].NomDevprLogcl + '</nom_devpr_logcl>' + //?
        '<nom_logcl_fact>' + _arrData[0][0].NomLogclFact + '</nom_logcl_fact>' + //?
        '<no_versi_logcl_fact>' + _arrData[0][0].NoVersiLogclFact + '</no_versi_logcl_fact>' + //?
        '<no_versi_xml_dem>' + _arrData[0][0].NoVersiXmlDem + '</no_versi_xml_dem>' + //?
    '</logcl_fact>' +
    '<demdr>' +
        '<typ_id_intvn>' + _arrData[0][1].DemdrTypIdIntvn + '</typ_id_intvn>' + //const
        '<id_intvn>' + _arrData[0][2].DemdrIdIntvn + '</id_intvn>' + //?
    '</demdr>' +
    '<exped_difrn_demdr>' +
        '<typ_id_intvn>' + _arrData[0][1].ExpedTypIdIntvn + '</typ_id_intvn>' + //const
        '<id_intvn>' + _arrData[0][1].ExpedIdIntvn + '</id_intvn>' + //?
    '</exped_difrn_demdr>' +
    '<id_fact_ramq>' +
		'<no_fact_ramq>' + globRamqNoFactRamq + '</no_fact_ramq>' +
		'<jeton_comm>' + globRamqJetonComm + '</jeton_comm>' +
	'</id_fact_ramq>' +
    '<fact_a_modif>' +
        RamqGetListFact(_arrData) +
    '</fact_a_modif>' +
'</dem_modif>';
    return xml;
}

function RamqGetSoumissionDemandesAnnulationXML(_arrData)
{
    var xml = '<?xml version=\\"1.0\\" encoding=\\"utf-8\\"?>' +
                '<dem_annu xmlns=\\"urn:ramq-gouv-qc-ca:RFP\\" >' +
	                '<no_dem_ext>' + RamqGenerateNoDemExt() + '</no_dem_ext>' +
	                '<logcl_fact>' +
                        '<no_devpr_logcl>' + _arrData[0][0].NoDevprLogcl + '</no_devpr_logcl>' + //?
                        '<nom_devpr_logcl>' + _arrData[0][0].NomDevprLogcl + '</nom_devpr_logcl>' + //?
                        '<nom_logcl_fact>' + _arrData[0][0].NomLogclFact + '</nom_logcl_fact>' + //?
                        '<no_versi_logcl_fact>' + _arrData[0][0].NoVersiLogclFact + '</no_versi_logcl_fact>' + //?
                        '<no_versi_xml_dem>' + _arrData[0][0].NoVersiXmlDem + '</no_versi_xml_dem>' + //?
                    '</logcl_fact>' +
	                '<demdr>' +
                        '<typ_id_intvn>' + _arrData[0][1].DemdrTypIdIntvn + '</typ_id_intvn>' + //const
                        '<id_intvn>' + _arrData[0][2].DemdrIdIntvn + '</id_intvn>' + //?
                    '</demdr>' +
                    '<exped_difrn_demdr>' +
                        '<typ_id_intvn>' + _arrData[0][2].ExpedTypIdIntvn + '</typ_id_intvn>' + //const
                        '<id_intvn>' + _arrData[0][2].ExpedIdIntvn + '</id_intvn>' + //?
                    '</exped_difrn_demdr>' +
	                '<liste_fact_a_annu>' +
		                '<id_fact_ramq>' +
			                '<no_fact_ramq>' + globRamqNoFactRamq + '</no_fact_ramq>' +
			                '<jeton_comm>' + globRamqJetonComm + '</jeton_comm>' +
		                '</id_fact_ramq>' +
	                '</liste_fact_a_annu>' +
                '</dem_annu>';
    return xml;
}

// Create part of xml for Chirg 
function RamqGetListFact(_arrData)
{
    var objDataFromVisionR = _arrData[0][1];
    var objAdditionalData = _arrData[0][2];
    var xml = '';
    var factServDentaTitle = '';
    var listeLigneFactServDentaTitle = '';
    var typProf = objDataFromVisionR.TypProf;
    if (typProf == 'Dentiste')
    {
        factServDentaTitle = 'fact_serv_denta_chirg_denti_1_1_0';
        listeLigneFactServDentaTitle = 'liste_ligne_fact_serv_denta_chirg_denti';
    }
    else if (typProf == 'Chirurgiens')
    {
        factServDentaTitle = 'fact_serv_denta_chirg_bucc_1_1_0';
        listeLigneFactServDentaTitle = 'liste_ligne_fact_serv_denta_chirg_bucc';
    }
    else if (typProf == 'Denturologiste')
    {
        factServDentaTitle = 'fact_serv_denta_dentu_1_0_0';
        listeLigneFactServDentaTitle = 'liste_ligne_fact_serv_denta_dentu';
    }

    xml +=
        '<' + factServDentaTitle + '>' +
                    //'<no_fact_ext>' + RamqGetFactNumber() + '</no_fact_ext>' +
                    '<no_fact_ext>' + globBillNumber + '</no_fact_ext>' +
                    '<prof>' +
                        '<typ_id_prof>' + objDataFromVisionR.TypIdProf + '</typ_id_prof>' + //const 1 : Numéro dispensateur RAMQ
                        '<id_prof>' + objDataFromVisionR.IdProf + '</id_prof>' + //?
                    '</prof>' +
                    '<lieu_consi>' +
                        RamqGetLieuConsiXml(objAdditionalData) + 
                        //'<lieu_phys>' +
                        //    '<typ_id_lieu_phys>' + objDataFromVisionR.TypIdLieuPhys + '</typ_id_lieu_phys>' + //1 : Lieu physique, reconnu et codifié à la Régie (établissement SSS, Cabinet, etc.)
                        //    '<id_lieu_phys>' + objDataFromVisionR.IdLieuPhys + '</id_lieu_phys>' + //?
                        //'</lieu_phys>' +
                    '</lieu_consi>' +
                    
                    RamqGetListePersObjetFact(objDataFromVisionR, objAdditionalData)+
                    
                    RamqGetIndFactAssocDrXml(objAdditionalData.IndFactAssosDr, typProf) +//? Indique si la facture est associée à une demande de remboursement d'un bénéficiare.
                    '<' + listeLigneFactServDentaTitle + '>' +
                        RamqGetListeLigneFactServDenta(_arrData[1],_arrData[2], typProf) +
                    '</' + listeLigneFactServDentaTitle + '>' +
                '</' + factServDentaTitle + '>';
    return xml;
}

function RamqGetListePersObjetFact(pObjDataFromVisionR, pObjAdditionalData)
{
    var isFactAssosDr;
    if (globRamqOperationType == "New")
    {
        isFactAssosDr = $('#optRegiIndFactAssosDrYes').is(':checked');
    }
    else if (globRamqOperationType == "Update")
    {
        isFactAssosDr = $('#optRegiIndFactAssosDrYes_Upd').is(':checked');
    }
    
    var xml = '';
    if (isFactAssosDr)
    {
        if (pObjDataFromVisionR.IdPers) {
            if (pObjDataFromVisionR.IdPers === '1') 
            {
                var arrNAM = RamqGetSpecialArrNAM();
                if (arrNAM.length > 0)
                {
                    xml +=
                        '<liste_pers_objet_fact>';

                    for (var i = 0; i < arrNAM.length; i++) {
                        xml +=
                            '<pers_patnt_avec_idt>' +
                                '<typ_situ_consi>1</typ_situ_consi>' + //Domaine de valeurs 1 : Situation normale 10 : Délai de carence, services nécessaires aux victimes de violence conjugale ou familiale ou d'une agression 11 : Délai de carence, services liés à la grossesse, à l\'accouchement ou à l'interruption de grossesse 12 : Délai de carence, services nécessaires aux personnes aux prises avec problèmes de santé de nature infectieuse ayant une incidence sur la santé publique
                                '<typ_id_pers>1</typ_id_pers>' + //1 : NAM RAMQ
                                '<id_pers>' + arrNAM[i] + '</id_pers>' + //NAM
                            '</pers_patnt_avec_idt>';
                    }
                    //xml += '</liste_pers_objet_fact>';
                }
                
            }
            else {
                xml +=
                '<liste_pers_objet_fact>' +
                    '<pers_patnt_avec_idt>' +
                        '<typ_situ_consi>' + pObjDataFromVisionR.TypSituConsi + '</typ_situ_consi>' + //Domaine de valeurs 1 : Situation normale 10 : Délai de carence, services nécessaires aux victimes de violence conjugale ou familiale ou d'une agression 11 : Délai de carence, services liés à la grossesse, à l\'accouchement ou à l'interruption de grossesse 12 : Délai de carence, services nécessaires aux personnes aux prises avec problèmes de santé de nature infectieuse ayant une incidence sur la santé publique
                        '<typ_id_pers>1</typ_id_pers>' + //1 : NAM RAMQ
                        '<id_pers>' + pObjDataFromVisionR.IdPers + '</id_pers>' + //NAM
                        RamqGetInfoMdcalPers(pObjAdditionalData) +
                       '</pers_patnt_avec_idt>';
            }
            
        }
        else //patient without id
        {
            xml +=
                '<liste_pers_objet_fact>' +
                '<pers_patnt_sans_idt>' +
                  '<typ_situ_consi>2</typ_situ_consi>' +
                  '<info_pers_patnt>' +
                      '<nom_pers>' + pObjDataFromVisionR.NomPers + '</nom_pers>' +
                      (pObjDataFromVisionR.PrePers) ? '<pre_pers>' + pObjDataFromVisionR.PrePers + '</pre_pers>' : '' +
                      '<dat_naiss_pers>' + pObjDataFromVisionR.DatNaissPers + '</dat_naiss_pers>' +
                      '<cod_sexe_pers>' + pObjDataFromVisionR.CodSexPers + '</cod_sexe_pers>' +
                      (pObjDataFromVisionR.NoOrdreNaissPers) ? '<no_ordre_naiss_pers>' + pObjDataFromVisionR.NoOrdreNaissPers + '<no_ordre_naiss_pers/>' : '' +
                      (pObjDataFromVisionR.NoOrdreNaissPers) ? '<nas>' + pObjDataFromVisionR.Nas + '</nas>' : '' +
                  '</info_pers_patnt>' +
                (pObjDataFromVisionR.AdrPersPatnt) ? '<adr_pers_patnt>' + pObjDataFromVisionR.AdrPersPatnt + '<adr_pers_patnt/>' : '' +
                RamqGetInfoMdcalPers(pObjAdditionalData);
            if (pObjDataFromVisionR.RepdnIdPers) {
                xml +=
                    '<pers_repdn>' +
                    '<repdn_avec_idt>' +
                      '<typ_id_pers>1</typ_id_pers>' +
                      '<id_pers>' + pObjDataFromVisionR.RepdnIdPers + '</id_pers>' +
                    '</repdn_avec_idt>' +
                  '</pers_repdn>';
            }
            xml += '</pers_patnt_sans_idt>';
        }
        xml += '</liste_pers_objet_fact>';
    }
    else if (!isFactAssosDr && pObjDataFromVisionR.IdPers === '1')
    {
        var arrNAM = RamqGetSpecialArrNAM();
        if (arrNAM.length > 0) {
            xml +=
                '<liste_pers_objet_fact>';

            for (var i = 0; i < arrNAM.length; i++) {
                xml +=
                    '<pers_patnt_avec_idt>' +
                        '<typ_situ_consi>1</typ_situ_consi>' + //Domaine de valeurs 1 : Situation normale 10 : Délai de carence, services nécessaires aux victimes de violence conjugale ou familiale ou d'une agression 11 : Délai de carence, services liés à la grossesse, à l\'accouchement ou à l'interruption de grossesse 12 : Délai de carence, services nécessaires aux personnes aux prises avec problèmes de santé de nature infectieuse ayant une incidence sur la santé publique
                        '<typ_id_pers>1</typ_id_pers>' + //1 : NAM RAMQ
                        '<id_pers>' + arrNAM[i] + '</id_pers>' + //NAM
                    '</pers_patnt_avec_idt>';
            }
            xml += '</liste_pers_objet_fact>';
        }
    }
    
    return xml;
}

function RamqGetSpecialArrNAM()
{
    var arr = [];
    var strNam = $('#txtRamqSpecialNams').val();
    arr = strNam.split(',');
    return arr;
}

function RamqGetInfoMdcalPers(pObjAdditionalData)
{
    var xml ='';

    if ((pObjAdditionalData.TypEvenePers && pObjAdditionalData.DatEvenePers) || pObjAdditionalData.DatEntrePersLieu && pObjAdditionalData.DatSortiPersLieu || pObjAdditionalData.CodDiagnMdcal)
    {
        xml += '<info_mdcal_pers>';

        if (pObjAdditionalData.CodDiagnMdcal)
        {
            var arrCodDiagnMdcal = RamqGetArrCodDiagnMdcal(pObjAdditionalData.CodDiagnMdcal);
            if (arrCodDiagnMdcal.length > 0)
            {
                xml += '<liste_diagn_mdcal>';
                for (var i = 0; i < arrCodDiagnMdcal.length; i++)
                {
                    if (arrCodDiagnMdcal[i] !== '')
                    {
                        xml += '<diagn_mdcal>' +
                        '<no_seq_sys_cla>12</no_seq_sys_cla>' +
                        '<cod_diagn_mdcal>' + arrCodDiagnMdcal[i] + '</cod_diagn_mdcal>' +
                        '</diagn_mdcal>';
                    }
                    xml += '</liste_diagn_mdcal>';
                }
            }
        }
        if (pObjAdditionalData.TypEvenePers && pObjAdditionalData.DatEvenePers)
        {
            xml+=
                '<evene_pers_objet_fact>' +
                    '<typ_evene_pers>' + pObjAdditionalData.TypEvenePers + '</typ_evene_pers>' +
                    '<dat_evene_pers>' + pObjAdditionalData.DatEvenePers + '</dat_evene_pers>' +
                '</evene_pers_objet_fact>';
        }
        if (pObjAdditionalData.DatEntrePersLieu)// && pObjAdditionalData.DatSortiPersLieu)
        {
            xml +=
                '<per_sej_pers_lieu>' +
                    '<dat_entre_pers_lieu>' + pObjAdditionalData.DatEntrePersLieu + '</dat_entre_pers_lieu>';// +
            if (pObjAdditionalData.DatSortiPersLieu)
            {
                xml += '<dat_sorti_pers_lieu>' + pObjAdditionalData.DatSortiPersLieu + '</dat_sorti_pers_lieu>';
            }
                    
            xml += '</per_sej_pers_lieu>';
        }
        xml+='</info_mdcal_pers>';
    }
    return xml;
}

function RamqGetArrCodDiagnMdcal(pCodDiagnMdcal)
{
    var array = [];
    array = pCodDiagnMdcal.split(',');
    return array;
}


function RamqGetLieuConsiXml(pObjAdditionalData)
{
    var xml = '';
    if (pObjAdditionalData.LieuCodifieRegie && pObjAdditionalData.IdLieuPhys)
    {
        var noSectActiv = (pObjAdditionalData.NoSectActiv) ? '<no_sect_activ>' + pObjAdditionalData.NoSectActiv + '</no_sect_activ>' : '';
        xml +=
                '<lieu_phys>'+
					'<typ_id_lieu_phys>1</typ_id_lieu_phys>'+
					'<id_lieu_phys>'+ pObjAdditionalData.IdLieuPhys+'</id_lieu_phys>'+
					noSectActiv +
				'</lieu_phys>';
    }
    else if (pObjAdditionalData.LieuNonCodifieRegie)
    {
        var typ_id_lieu_geo = -1;
        var id_lieu_geo = "";
        if (pObjAdditionalData.CodePostal) {
            typ_id_lieu_geo = 2;
            id_lieu_geo = pObjAdditionalData.CodePostal;
        }

        if (pObjAdditionalData.CodeLocalite) {
            typ_id_lieu_geo = 3;
            id_lieu_geo = pObjAdditionalData.CodeLocalite;
        }


        xml +=
            '<lieu_geo>' +
                '<typ_id_lieu_geo>' + typ_id_lieu_geo + '</typ_id_lieu_geo>' + //Domaine de valeurs 2 : Code postal 3 : Code localité
                '<id_lieu_geo>' + id_lieu_geo + '</id_lieu_geo>' +
                '<typ_lieu_geo>' + pObjAdditionalData.TypeDeLieu + '</typ_lieu_geo>';
        if (pObjAdditionalData.TypeDeLieu === "C") {
            if (pObjAdditionalData.NoBur)
            {
                xml += '<no_bur>' + pObjAdditionalData.NoBur + '</no_bur>';
            }
        }

        xml +=
            '</lieu_geo>';
    }
    return xml;
}

function RamqGetIndFactAssocDrXml(p_IndFactAssosDr, pTypProf)
{
    if (pTypProf == 'Denturologiste')
        return '';
    else
        return '<ind_fact_assoc_dr>' + p_IndFactAssosDr + '</ind_fact_assoc_dr>';
}

function RamqGetListeLigneFactServDenta(pArrGridData, pArrFormMoreData, pTypProf)
{
    var xml = '';
    if (pTypProf == 'Dentiste' || pTypProf == 'Chirurgiens')
        xml = RamqGetListe_ligne_fact_serv_denta_chirg(pArrGridData, pArrFormMoreData, pTypProf);
    else if (pTypProf == 'Denturologiste')
        xml = RamqGetListe_ligne_fact_serv_denta_dentu(pArrGridData, pArrFormMoreData, pTypProf);
    return xml;
}

function RamqGetListe_ligne_fact_serv_denta_chirg(pArrpGridData, pArrFormMoreData, ptypProf)
{
    var xml = '';
    var ligneFactServDentaChirgTitle = '';
    if (ptypProf == 'Dentiste') {
        ligneFactServDentaChirgTitle = 'ligne_fact_serv_denta_chirg_denti';
    }
    else if (ptypProf == 'Chirurgiens') {
        ligneFactServDentaChirgTitle = 'ligne_fact_serv_denta_chirg_bucc';
    }
    var ligneNum = 1;

    for (var i = 0; i < pArrpGridData.length; i++)
    {
        //var pObjBillData = pArrBillData[i];
        var pObjGridData = pArrpGridData[i];
        var pObjFormMoreData;

        if (pObjGridData.Type == 'AMQ' || pObjGridData.Type == 'BES' || pObjGridData.Type == 'HOP')
        {
            pObjFormMoreData = GetObjFormMoreData(pObjGridData.row_id, pArrFormMoreData, ptypProf);

            var dateServ;
            if (pObjFormMoreData && pObjFormMoreData.dat_serv_elm_fact) {
                dateServ = pObjFormMoreData.dat_serv_elm_fact;
            }
            else {
                dateServ = RamqGetCurrentDate();
            }

            var codeRole;
            if (pObjGridData && pObjGridData.codeRole) {
                codeRole = pObjGridData.codeRole;
            }
            else {
                codeRole = 1; //1 by default
            }

            var noLigne;
            if (pObjGridData && pObjGridData.ramq_id) {
                noLigne = pObjGridData.ramq_id
            }
            else
                noLigne = ligneNum;


            xml = xml +
                '<' + ligneFactServDentaChirgTitle + '>' +
                    '<no_ligne_fact>' + noLigne + '</no_ligne_fact>' +
                    //'<no_ligne_fact>' + ligneNum + '</no_ligne_fact>' +
                    '<typ_id_elm_fact>' + '1' + '</typ_id_elm_fact>' + //1 : Code facturation élément assuré
                    '<id_elm_fact>' + pObjGridData.Code + '</id_elm_fact>' + //Code de facturation
                    '<dat_serv_elm_fact>' + dateServ + '</dat_serv_elm_fact>' +
                    '<cod_role>' + codeRole + '</cod_role>' + //Data 1 : Responsable 4 : Assistant
                    RamqGetDateHeureDeDebutElemFact(pObjFormMoreData) + 
                    RamqGetDatAutorProthAcrylXml(pObjFormMoreData) +
                    RamqGetInfoServDenta(pObjFormMoreData, pObjGridData)+
                    
                    //optional
                    RamqGetListeElmMesurXml(pObjFormMoreData) +
                    //optional
                    RamqGetListElmContxXml(pObjFormMoreData) +
                    //optional
                    RamqGetListeLieuRefreXml(pObjFormMoreData) +
                    //optional
                    RamqGetRefreAutreProfXml(pObjFormMoreData) +

                    RamqGetMntPrcuPatntXml(pObjGridData.Total) +
                  
                 '</' + ligneFactServDentaChirgTitle + '>';
            ligneNum++;
        }
    }
     return xml;
}

function RamqGetDateHeureDeDebutElemFact(pObjFormMoreData)
{
    var res = '';
    if (pObjFormMoreData.dhd_elm_fact)
    {
        res += '<dhd_elm_fact>' + pObjFormMoreData.dhd_elm_fact + '</dhd_elm_fact>';
    }
    return res;
}

function RamqGetInfoServDenta(pObjFormMoreData, pObjGridData)
{
    var res='';
    var noDentXml = RamqGetNoDentXml(pObjGridData.Dent);
    var listeSurfDentTraitXml = RamqGetListeSurfDentTraitXml(pObjGridData.Surface);
    var raisTraitDentaXml = RamqGetRaisTraitDentaXml(pObjFormMoreData);
    var siteTraitDentaXml = RamqGetSiteTraitDentaXml(pObjFormMoreData);
    var infoMedConsmXml  = RamqGetInfoMedConsmXml(pObjFormMoreData);

    if (noDentXml || listeSurfDentTraitXml || raisTraitDentaXml || siteTraitDentaXml || infoMedConsmXml)
    {
        res +='<info_serv_denta>'+
            noDentXml +
            listeSurfDentTraitXml +
            raisTraitDentaXml +
            siteTraitDentaXml +
            infoMedConsmXml +
        '</info_serv_denta>';
    }

    return res;
}

function RamqGetNoDentXml(pDent)
{
    var res = '';
    if(pDent)
    {
        res +='<no_dent>' + pDent + '</no_dent>';
    }
    return res;
}

function RamqGetListe_ligne_fact_serv_denta_dentu(pArrGridData, pArrFormMoreData, ptypProf)
{
    var xml = '';
    var ligneNum = 1;

    var noLigne;
    if (pObjGridData && pObjGridData.ramq_id) {
        noLigne = pObjGridData.ramq_id
    }
    else
        noLigne = ligneNum;

    for (var i = 0; i < pArrGridData.length; i++) {
        //var pObjBillData = pArrBillData[i];
        var pObjGridData = pArrGridData[i];
        var pObjFormMoreData;

        if (pObjGridData.Type == 'AMQ' || pObjGridData.Type == 'BES' || pObjGridData.Type == 'HOP') {
            pObjFormMoreData = GetObjFormMoreData(pObjGridData.row_id, pArrFormMoreData, ptypProf);

            var dateServ;
            if (pObjFormMoreData && pObjFormMoreData.dat_serv_elm_fact) {
                dateServ = pObjFormMoreData.dat_serv_elm_fact;
            }
            else {
                dateServ = RamqGetCurrentDate();
            }

            var codeRole;
            if (pObjGridData && pObjGridData.codeRole) {
                codeRole = pObjGridData.codeRole;
            }
            else {
                codeRole = 1; //1 by default
            }

            var noLigne;
            if (pObjGridData && pObjGridData.ramq_id) {
                noLigne = pObjGridData.ramq_id
            }
            else
                noLigne = ligneNum;

            xml = xml +
                '<ligne_fact_serv_denta_dentu>' +
                    '<no_ligne_fact>' + noLigne + '</no_ligne_fact>' +
                    '<typ_id_elm_fact>' + '1' + '</typ_id_elm_fact>' + //1 : Code facturation élément assuré
                    '<id_elm_fact>' + pObjGridData.Code + '</id_elm_fact>' + //Code de facturation
                    '<dat_serv_elm_fact>' + dateServ + '</dat_serv_elm_fact>' + 
                    RamqGetDatAutorProthAcrylXml(pObjFormMoreData) +
                    RamqGetListElmContxXml(pObjFormMoreData) +
                    RamqGetRefreAutreProfXml(pObjFormMoreData) +
                 '</ligne_fact_serv_denta_dentu>';
            ligneNum++;
        }
    }
    return xml;
}

function RamqGetRaisTraitDentaXml(pObjFormMoreData)
{
    var res = '';
    if (pObjFormMoreData && pObjFormMoreData.typ_id_rais_trait_denta && pObjFormMoreData.id_rais_trait_denta)
    {
        res =
            '<rais_trait_denta>' +
                '<typ_id_rais_trait_denta>' + pObjFormMoreData.typ_id_rais_trait_denta + '</typ_id_rais_trait_denta>' +
                '<id_rais_trait_denta>' + pObjFormMoreData.id_rais_trait_denta + '</id_rais_trait_denta>' +
            '</rais_trait_denta>';
    }
    return res;
}

function RamqGetSiteTraitDentaXml(pObjFormMoreData)
{
    
    var res = '';
    if (pObjFormMoreData && pObjFormMoreData.typ_id_site_trait_denta && pObjFormMoreData.id_site_trait_denta)
    {
        res =
            '<site_trait_denta>'+
                '<typ_id_site_trait_denta>' + pObjFormMoreData.typ_id_site_trait_denta + '</typ_id_site_trait_denta>' +
                '<id_site_trait_denta>' + pObjFormMoreData.id_site_trait_denta + '</id_site_trait_denta>' +
            '</site_trait_denta>';
    }
    return res;
}

function RamqGetInfoMedConsmXml(pObjFormMoreData)
{
    var res = '';

    if (pObjFormMoreData && pObjFormMoreData.liste_med_consm && pObjFormMoreData.liste_med_consm.length > 0)
    {
        res =
            '<info_med_consm>' +
                '<typ_med_consm>' + '1' + '</typ_med_consm>' + //TODO: is this constant?
                '<liste_med_consm>';
            ;
        for (var i = 0; i < pObjFormMoreData.liste_med_consm.length; i++)
        {
            res +=
                '<med_consm>' +
                    '<typ_id_med_consm>' + '1' + '</typ_id_med_consm>' +//TODO: is this constant?
                    '<id_med_consm>' + pObjFormMoreData.liste_med_consm[i] + '</id_med_consm>' +
                '</med_consm>';
        }
        res +=
            '</liste_med_consm>' +
        '</info_med_consm>';
    }
    return res;
}

function RamqGetListeElmMesurXml(pObjFormMoreData)
{
    var res = '';
    if (pObjFormMoreData && pObjFormMoreData.liste_elm_mesur && pObjFormMoreData.liste_elm_mesur.length > 0)
    {
        res +=
            '<liste_elm_mesur>';
        for (var i = 0; i < pObjFormMoreData.liste_elm_mesur.length; i++)
        {
            var arrElem = pObjFormMoreData.liste_elm_mesur[i].split('/');
            res +=
                '<elm_mesur>'+
                    '<cod_elm_mesur>' + arrElem[1] + '</cod_elm_mesur>' +
                    '<val_mes>'+ arrElem[0]+'</val_mes>'+
                '</elm_mesur>';
        }
        res +=
            '</liste_elm_mesur>';
    }
    return res;
}

function RamqGetListElmContxXml(pObjFormMoreData)
{
    var res = '';
    if (pObjFormMoreData && pObjFormMoreData.liste_elm_contx && pObjFormMoreData.liste_elm_contx.length > 0)
    {
        res += '<liste_elm_contx>';
        for (var i = 0; i < pObjFormMoreData.liste_elm_contx.length; i++)
        {
            res += 
                '<elm_contx>'+
                    '<cod_elm_contx>' + pObjFormMoreData.liste_elm_contx[i] + '</cod_elm_contx>' +
                '</elm_contx>';
        }
        res +=
            '</liste_elm_contx>';
    }
    return res;
}

function RamqGetListeLieuRefreXml(pObjFormMoreData)
{
    var res = '';
    if (pObjFormMoreData && ((pObjFormMoreData.isLieuCodifieALaRegie != null && pObjFormMoreData.typ_refre_lieu && pObjFormMoreData.id_lieu_phys) || (pObjFormMoreData.isLieuCodifieALaRegie != null && pObjFormMoreData.typ_refre_lieu && pObjFormMoreData.lieu_type)))
    {
        res +=
        '<lieu_en_refre>' +
            '<typ_refre_lieu>' + pObjFormMoreData.typ_refre_lieu + '</typ_refre_lieu>' + // 10 : Établissement pris en charge lors d'une garde multi-établissements 14 : Lieu de départ pour un déplacement
            '<liste_lieu_refre>';

        if (pObjFormMoreData.isLieuCodifieALaRegie) {
            res +=
                '<lieu_refre_phys>' +
                    '<typ_id_lieu_phys>' + '1' + '</typ_id_lieu_phys>' + //TODO: is it constant?
                    '<id_lieu_phys>' + pObjFormMoreData.id_lieu_phys + '</id_lieu_phys>'+
                    '<no_sect_activ>' + pObjFormMoreData.no_sect_activ  + '</no_sect_activ>';

            res +=
                '</lieu_refre_phys>';
        }
        else  //Non codifie
        {
            var lieuType;
            if (pObjFormMoreData.lieu_type === "Cabinet")
                lieuType = 'C';
            else if (pObjFormMoreData.lieu_type === "Domicile")
                lieuType = 'D';
            else if (pObjFormMoreData.lieu_type === "Autre")
                lieuType = 'A';

            var typ_id_lieu_geo = -1;
            var id_lieu_geo = "";
            if (pObjFormMoreData.codePostal)
            {
                typ_id_lieu_geo = 2;
                id_lieu_geo = pObjFormMoreData.codePostal;
            }
                
            if (pObjFormMoreData.code_localite_dentiste)
            {
                typ_id_lieu_geo = 3;
                id_lieu_geo = pObjFormMoreData.code_localite_dentiste;
            }
                
           
            res +=
                '<lieu_refre_geo>' +
                    '<typ_id_lieu_geo>' + typ_id_lieu_geo + '</typ_id_lieu_geo>' + //Domaine de valeurs 2 : Code postal 3 : Code localité
                    '<id_lieu_geo>' + id_lieu_geo + '</id_lieu_geo>' +
                    '<typ_lieu_geo>' + lieuType + '</typ_lieu_geo>';
            if (pObjFormMoreData.lieu_type === "Cabinet" && pObjFormMoreData.no_bur) {
                res += '<no_bur>' + pObjFormMoreData.no_bur + '</no_bur>';
            }

            res +=
                '</lieu_refre_geo>';
                
        }
        res += '</liste_lieu_refre>'+
            '</lieu_en_refre>';
    }
    return res;
}

function RamqGetRefreAutreProfXml(pObjFormMoreData)
{
    var res = '';
    if (pObjFormMoreData && pObjFormMoreData.typ_refre_autre_prof && pObjFormMoreData.typ_id_prof && pObjFormMoreData.id_prof)
    {
        res +=
            '<refre_autre_prof>' +
            '<typ_refre_autre_prof>' + pObjFormMoreData.typ_refre_autre_prof + '</typ_refre_autre_prof>' +
            '<info_prof_refre>' +
                '<prof_refre_connu>' +
                '<typ_id_prof>' + '1' + '</typ_id_prof>' +
                '<id_prof>' + pObjFormMoreData.id_prof + '</id_prof>' +
                '</prof_refre_connu>' +
            '</info_prof_refre>';// +
        if (pObjFormMoreData.dh_dem_cnsul)
            res += '<dh_dem_cnsul>'+pObjFormMoreData.dh_dem_cnsul +'</dh_dem_cnsul>';

        res += '</refre_autre_prof>';
    }
    return res;
}

function RamqGetMntPrcuPatntXml(p_mnt_prcu_patnt)
{
    var pAmount = 0;
    var res = '';
    var total = parseFloat(p_mnt_prcu_patnt);
    var fTotal = total.toFixed(2);

    if (!isNaN(fTotal))
    {
        pAmount = fTotal;
    }

    
    if (globRamqOperationType == "New")
    {
        if ($("#optRegiIndFactAssosDrYes").is(':checked'))
        {
            var amount = 0;
            if ($("#remb_dem_oui").is(':checked')) {
                amount = pAmount;
            }
            res = '<mnt_prcu_patnt>' + amount + '</mnt_prcu_patnt>';
        }
    }
    else if (globRamqOperationType == "Update")
    {
        var amount = 0;
        if ($("#remb_dem_oui_regie_fact").is(':checked')) {
            amount = pAmount;
        }
        res = '<mnt_prcu_patnt>' + amount + '</mnt_prcu_patnt>';
    }

    return res;
}

function RamqGetDatAutorProthAcrylXml(pObjFormMoreData)
{

    var res = '';
    if (pObjFormMoreData && pObjFormMoreData.dat_autor_proth_acryl)
        res = '<dat_autor_proth_acryl>' + pObjFormMoreData.dat_autor_proth_acryl + '</dat_autor_proth_acryl>';
    return res;
}

function RamqGetListeSurfDentTraitXml(strSurf)
{
    var xml = '';
    if(strSurf)
    {
        xml += '<liste_surf_dent_trait>';
        var arrCharSurf = strSurf.split('');
    
        for (var i = 0; i < arrCharSurf.length; i++)
        {
            xml = xml + '<surf_dent>' +
                            '<cod_surf_dent>' + arrCharSurf[i] + '</cod_surf_dent>' +
                        '</surf_dent>';
        }
        xml += '</liste_surf_dent_trait>';
    }

    return xml;
}

function RamqGenerateNoCpteAdmin(pTypModaPaimt, pNoCpteAdmin)
{
    var res = '';
    if (pTypModaPaimt == '2' && pNoCpteAdmin)
    {
        res += '<no_cpte_admin>' + pNoCpteAdmin + '</no_cpte_admin>';
    }
    return res;
}

function RamqGetCurrentDate()
{
    var date = '';
    var d = new Date();
    var y = d.getFullYear();
    var m = d.getMonth() +1;
    var day = d.getDate();
    if (day < 10) day = '0' + day;
    if (m < 10) m = '0' + m;

    return  y + '-' + m +'-' + day;
}


function parseRAMQResponsePaiment(strXml)
{
    var parser = new DOMParser();
    var xml = strXml.replace(/\\"/g, '"');
    var xmlDoc = parser.parseFromString(xml, "text/xml");
    
    var response = {};

    //Global info
    response.GlobalNoDemExt = (xmlDoc.getElementsByTagName("no_dem_ext")[0]!=null)? xmlDoc.getElementsByTagName("no_dem_ext")[0].childNodes[0].nodeValue:null;
    response.GlobalStaRecev = (xmlDoc.getElementsByTagName("sta_recev")[0]!=null)? xmlDoc.getElementsByTagName("sta_recev")[0].childNodes[0].nodeValue:null;
    response.GlobalArrListeMsgExplRecev = [];
    if (response.GlobalStaRecev == "2")
    {
        var GlobalArrListeMsgExplRecev =(xmlDoc.getElementsByTagName('liste_msg_expl_recev')[0]!=null)? xmlDoc.getElementsByTagName('liste_msg_expl_recev')[0].children: null;
        if (GlobalArrListeMsgExplRecev)
        {
            for (var i = 0; i < GlobalArrListeMsgExplRecev.length; i++) {
                var msgExplRecev = {};
                msgExplRecev.code = GlobalArrListeMsgExplRecev[i].children[0].innerHTML;
                msgExplRecev.text = GlobalArrListeMsgExplRecev[i].children[1].innerHTML;
                response.GlobalArrListeMsgExplRecev.push(msgExplRecev);
            }
        }
    }
    

    //liste_fact_recev
    response.arrListeFactRecev = [];

    var arrFactRecev = xmlDoc.getElementsByTagName("liste_fact_recev")[0].children;

    for (var j = 0; j < arrFactRecev.length; j++)
    {
        var objFactRecev = {};
        objFactRecev.NoFactExt = arrFactRecev[j].getElementsByTagName("no_fact_ext")[0].innerHTML;
        objFactRecev.StaRecev = arrFactRecev[j].getElementsByTagName("sta_recev")[0].innerHTML;

        objFactRecev.ListMsgExplRecev = [];
        if (objFactRecev.StaRecev == '2')
        {
            //liste_msg_expl_recev
            var arrListMsgExplRecev = arrFactRecev[j].getElementsByTagName('liste_msg_expl_recev')[0].children;
            for (var k = 0; k < arrListMsgExplRecev.length; k++)
            {
                var msgExplRecev = {};
                msgExplRecev.code = arrListMsgExplRecev[k].children[0].innerHTML;
                msgExplRecev.text = arrListMsgExplRecev[k].children[1].innerHTML;
                objFactRecev.ListMsgExplRecev.push(msgExplRecev);
            }
        }

        //liste_ligne_fact_recev
        objFactRecev.ListeLigneFactRecev = [];
        var arrListeLigneFactRecev = arrFactRecev[j].getElementsByTagName('liste_ligne_fact_recev')[0].children;
        for (var l = 0; l < arrListeLigneFactRecev.length; l++)
        {
            var LigneFactRecev = {};
            LigneFactRecev.NoLigneFact = arrListeLigneFactRecev[l].children[0].innerHTML;
            LigneFactRecev.StaRecev = arrListeLigneFactRecev[l].children[1].innerHTML;

            if (LigneFactRecev.StaRecev == "1")
            {
                LigneFactRecev.MntPrel = (arrListeLigneFactRecev[l].children[2])? arrListeLigneFactRecev[l].children[2].innerHTML:'';
                LigneFactRecev.FormuExpl = (arrListeLigneFactRecev[l].children[3])? arrListeLigneFactRecev[l].children[3].innerHTML:'';
            }
            else if (LigneFactRecev.StaRecev == "2")
            {
                LigneFactRecev.LigneMsgExplRecev = []
                var arrListMsgExplRecev = arrListeLigneFactRecev[l].getElementsByTagName('liste_msg_expl_recev')[0].children;
                for (var m = 0; m < arrListMsgExplRecev.length; m++) {
                    var msgExplRecev = {};
                    msgExplRecev.code = arrListMsgExplRecev[m].children[0].innerHTML;
                    msgExplRecev.text = arrListMsgExplRecev[m].children[1].innerHTML;
                    LigneFactRecev.LigneMsgExplRecev.push(msgExplRecev);
                }
            }
            objFactRecev.ListeLigneFactRecev.push(LigneFactRecev);
        }
        response.arrListeFactRecev.push(objFactRecev);
    }
    return response;
}

function parseRAMQResponseModification(strXml)
{
    var parser = new DOMParser();
    var xml = strXml.replace(/\\"/g, '"');
    var xmlDoc = parser.parseFromString(xml, "text/xml");

    var response = {};

    //Global info
    response.GlobalNoDemExt = (xmlDoc.getElementsByTagName("no_dem_ext")[0] != null) ? xmlDoc.getElementsByTagName("no_dem_ext")[0].childNodes[0].nodeValue : null;
    response.GlobalStaRecev = (xmlDoc.getElementsByTagName("sta_recev")[0] != null) ? xmlDoc.getElementsByTagName("sta_recev")[0].childNodes[0].nodeValue : null;
    response.GlobalArrListeMsgExplRecev = [];
    response.GlobalArrListeMsgExplRecev2 = [];
    if (response.GlobalStaRecev == "2") {
        var GlobalArrListeMsgExplRecev = (xmlDoc.getElementsByTagName('liste_msg_expl_recev')[0] != null) ? xmlDoc.getElementsByTagName('liste_msg_expl_recev')[0].children : null;
        var GlobalArrListeMsgExplRecev2 = (xmlDoc.getElementsByTagName('liste_msg_expl_recev')[1] != null) ? xmlDoc.getElementsByTagName('liste_msg_expl_recev')[1].children : null;

        if (GlobalArrListeMsgExplRecev) {
            for (var i = 0; i < GlobalArrListeMsgExplRecev.length; i++) {
                var msgExplRecev = {};
                msgExplRecev.code = GlobalArrListeMsgExplRecev[i].children[0].innerHTML;
                msgExplRecev.text = GlobalArrListeMsgExplRecev[i].children[1].innerHTML;
                response.GlobalArrListeMsgExplRecev.push(msgExplRecev);
            }
        }

        if (GlobalArrListeMsgExplRecev2) {
            for (var i = 0; i < GlobalArrListeMsgExplRecev2.length; i++) {
                var msgExplRecev = {};
                msgExplRecev.code = GlobalArrListeMsgExplRecev2[i].children[0].innerHTML;
                msgExplRecev.text = GlobalArrListeMsgExplRecev2[i].children[1].innerHTML;
                response.GlobalArrListeMsgExplRecev.push(msgExplRecev);
            }
        }
    }
    else if (response.GlobalStaRecev == "1")
    {
        var objLigneFactRecev = {};
        //liste_ligne_fact_recev
        objLigneFactRecev.ListeLigneFactRecev = [];
        var arrListeLigneFactRecev = xmlDoc.getElementsByTagName('liste_ligne_fact_recev')[0].children;
        for (var l = 0; l < arrListeLigneFactRecev.length; l++) {
            var LigneFactRecev = {};
            LigneFactRecev.NoLigneFact = arrListeLigneFactRecev[l].children[0].innerHTML;
            LigneFactRecev.StaRecev = arrListeLigneFactRecev[l].children[1].innerHTML;

            if (LigneFactRecev.StaRecev == "1") {
                LigneFactRecev.MntPrel = (arrListeLigneFactRecev[l].children[2]) ? arrListeLigneFactRecev[l].children[2].innerHTML : '';
                LigneFactRecev.FormuExpl = (arrListeLigneFactRecev[l].children[3]) ? arrListeLigneFactRecev[l].children[3].innerHTML : '';
            }
                
            objLigneFactRecev.ListeLigneFactRecev.push(LigneFactRecev);
        }
        response.arrListeLigneFactRecev = [];
        response.arrListeLigneFactRecev.push(objLigneFactRecev);
    }
    return response;
}

function parseRAMQResponseAnnulation(strXml) {
    var parser = new DOMParser();
    var xml = strXml.replace(/\\"/g, '"');
    var xmlDoc = parser.parseFromString(xml, "text/xml");

    var response = {};

    //Global info
    response.GlobalNoDemExt = (xmlDoc.getElementsByTagName("no_dem_ext")[0] != null) ? xmlDoc.getElementsByTagName("no_dem_ext")[0].childNodes[0].nodeValue : null;
    response.GlobalStaRecev = (xmlDoc.getElementsByTagName("sta_recev")[0] != null) ? xmlDoc.getElementsByTagName("sta_recev")[0].childNodes[0].nodeValue : null;
    response.GlobalArrListeMsgExplRecev = [];
    if (response.GlobalStaRecev == "2") {
        var GlobalArrListeMsgExplRecev = (xmlDoc.getElementsByTagName('liste_msg_expl_recev')[0] != null) ? xmlDoc.getElementsByTagName('liste_msg_expl_recev')[0].children : null;
        var GlobalArrListeMsgExplRecev2 = (xmlDoc.getElementsByTagName('liste_msg_expl_recev')[1] != null) ? xmlDoc.getElementsByTagName('liste_msg_expl_recev')[1].children : null;
        if (GlobalArrListeMsgExplRecev) {
            for (var i = 0; i < GlobalArrListeMsgExplRecev.length; i++) {
                var msgExplRecev = {};
                msgExplRecev.code = GlobalArrListeMsgExplRecev[i].children[0].innerHTML;
                msgExplRecev.text = GlobalArrListeMsgExplRecev[i].children[1].innerHTML;
                response.GlobalArrListeMsgExplRecev.push(msgExplRecev);
            }
        }
        response.GlobalArrListeMsgExplRecev2 = [];
        if (GlobalArrListeMsgExplRecev2) {
            for (var i = 0; i < GlobalArrListeMsgExplRecev2.length; i++) {
                var msgExplRecev = {};
                msgExplRecev.code = GlobalArrListeMsgExplRecev2[i].children[0].innerHTML;
                msgExplRecev.text = GlobalArrListeMsgExplRecev2[i].children[1].innerHTML;
                response.GlobalArrListeMsgExplRecev2.push(msgExplRecev);
            }
        }
    }
    return response;
}

function displayResponsePaiment(_response)
{
    var sumMntPrel = 0;
    var msg = "";
    var globalStaRecev = _response.GlobalStaRecev;
    if (globalStaRecev == "2") //Error message.
    {
        var GlobalArrListeMsgExplRecev = _response.GlobalArrListeMsgExplRecev;
        if (GlobalArrListeMsgExplRecev != null) {
            for (var i = 0; i < GlobalArrListeMsgExplRecev.length; i++) {
                msg += '<p>'+GlobalArrListeMsgExplRecev[i].code + ': ' + GlobalArrListeMsgExplRecev[i].text + '</p>';
            }
        }
        var arrListeFactRecev = _response.arrListeFactRecev;
        if (arrListeFactRecev != null)
        {
            for (var j = 0; j < arrListeFactRecev.length; j++)
            {
                var arrMsgExplRecev = arrListeFactRecev[j].ListMsgExplRecev;
                if (arrMsgExplRecev != null)
                {
                    for (var k = 0; k < arrMsgExplRecev.length; k++)
                    {
                        msg += '<p>'+arrMsgExplRecev[k].code + ': ' + arrMsgExplRecev[k].text + '</p>';
                    }
                }

                var arrLigneFactRecev = arrListeFactRecev[j].ListeLigneFactRecev;
                if (arrLigneFactRecev != null)
                {
                    for (var m = 0; m < arrLigneFactRecev.length; m++)
                    {
                        var ligneFactRecev = arrLigneFactRecev[m];
                        if (ligneFactRecev.StaRecev == '2')
                        {
                            var arrLigneMsgExplRecev = arrLigneFactRecev[m].LigneMsgExplRecev;
                            if (arrLigneMsgExplRecev != null)
                            {
                                for (var l = 0; l < arrLigneMsgExplRecev.length; l++)
                                {
                                    msg += '<p><font color="red">Ligne ' + ligneFactRecev.NoLigneFact + ': ' + arrLigneMsgExplRecev[l].code + ' ' + arrLigneMsgExplRecev[l].text + '</font></p>';
                                }
                            }
                        }
                        else if(ligneFactRecev.StaRecev == '1')
                        {
                            msg += '<p>Ligne ' + ligneFactRecev.NoLigneFact + ': OK</p>';
                        }
                    }
                }
            }
        }
    }
    else if (globalStaRecev == "1") //Success
    {
        var arrListeFactRecev = _response.arrListeFactRecev;
        if (arrListeFactRecev != null)
        {
            for (var n = 0; n < arrListeFactRecev.length; n++)
            {
                var arrLigneFactRecev = arrListeFactRecev[n].ListeLigneFactRecev;
                if (arrLigneFactRecev != null) {
                    for (var p = 0; p < arrLigneFactRecev.length; p++) {
                        var ligneFactRecev = arrLigneFactRecev[p];
                        sumMntPrel += Number(ligneFactRecev.MntPrel);
                        msg +='<p>' + 'Ligne ' + ligneFactRecev.NoLigneFact + ': ' + removeCDATA(ligneFactRecev.FormuExpl) +'</p>';
                    }

                    msg += '<p>Montant preliminaire total: ' + sumMntPrel + '$</p>';
                    $('#amq_total').val(sumMntPrel);
                }
            }
        }
    }
    displayRamqAnswer("RAMQ", msg);

    //if (_response.liste_fact_recev[0].id_fact_ramq_recev != null)
    //{
    //    $('#jeton_comm').val(_response.liste_fact_recev[0].id_fact_ramq_recev.jeton_comm);
    //    $('#no_fact_ramq').val(_response.liste_fact_recev[0].id_fact_ramq_recev.no_fact_ramq);
    //}
       
    //TODO:
}

function displayResponseModification(_response)
{
    var errormsg = '';
    if (_response.GlobalStaRecev == '1')
        alert("The Bill Updated successfully.");//TODO: change message
    else if (_response.GlobalStaRecev == '2') {
        if (_response.GlobalArrListeMsgExplRecev) {
            for (var i = 0; i < _response.GlobalArrListeMsgExplRecev.length; i++) {
                errormsg += _response.GlobalArrListeMsgExplRecev[i].code + ': ' + _response.GlobalArrListeMsgExplRecev[i].text + '\n';
            }
        }

        if (_response.GlobalArrListeMsgExplRecev2) {
            for (var i = 0; i < _response.GlobalArrListeMsgExplRecev2.length; i++) {
                errormsg += _response.GlobalArrListeMsgExplRecev2[i].code +': '+_response.GlobalArrListeMsgExplRecev2[i].text + '\n';
            }
        }
        alert(errormsg);
    }
    var sumMntPrel = 0;
    var arrListeLigneFactRecev = _response.arrListeLigneFactRecev;
    if (arrListeLigneFactRecev != null) {
        for (var n = 0; n < arrListeLigneFactRecev.length; n++) {
            var arrLigneFactRecev = arrListeLigneFactRecev[n].ListeLigneFactRecev;
            if (arrLigneFactRecev != null) {
                for (var p = 0; p < arrLigneFactRecev.length; p++) {
                    var ligneFactRecev = arrLigneFactRecev[p];
                    sumMntPrel += Number(ligneFactRecev.MntPrel);
                    //msg += '<p>' + 'Ligne ' + ligneFactRecev.NoLigneFact + ': ' + removeCDATA(ligneFactRecev.FormuExpl) + '</p>';
                }

                //msg += '<p>Montant preliminaire total: ' + sumMntPrel + '$</p>';
                $('#novl_montant_regie_fact').val(sumMntPrel);
            }
        }
    }

}
    
function displayResponseAnnulation(_response)
{
    var errormsg = '';
    if (_response.GlobalStaRecev == '1')
        alert("The Bill canceled successfully.");//TODO: change message
    else if (_response.GlobalStaRecev == '2')
    {
        if (_response.GlobalArrListeMsgExplRecev)
        {
            for (var i = 0; i < _response.GlobalArrListeMsgExplRecev.length; i++)
            {
                errormsg += _response.GlobalArrListeMsgExplRecev[i].code + ': ' + _response.GlobalArrListeMsgExplRecev[i].text + '\n';
            }
        }

        if (_response.GlobalArrListeMsgExplRecev2) {
            for (var i = 0; i < _response.GlobalArrListeMsgExplRecev2.length; i++) {
                errormsg += _response.GlobalArrListeMsgExplRecev2[i].code + ': ' + _response.GlobalArrListeMsgExplRecev2[i].text + '\n';
            }
        }
        alert(errormsg); 
    }
        
}

function removeCDATA(str) {
    var res = '';
    res = str.replace('<![CDATA[', '').replace(']]>', '');
    return res;
}

function RamqGetFactNumber()
{
    //For Test only
    return 'F' + new Date().getTime();

    //TODO: implement real algorithm.
}

function RamqSoumissionDemandesPaiementGetData()
{
    /*
     data source to create a json :
     1. Common data (Constant data related to application and developer + Data from visioneR); objCommonData
     2. Data from arrGrilleDeFacturation array.
     3. Data from arrGrilleDeFacturation_forms array.
    
    returns an  array of objects:
    arrData[0] = arrCommonData[objConstAppData,objVisionRData,objAdditionalData];
    arrData[1] = objGrilleDeFacturationData;
    arrData[2] = objGrilleDeFacturationFormData;
    */
    var objConstAppData = RamqGetConstAppData();



    var objVisionRData = globVisionRData;
    //var objBillData = RamqGetBillData();
    var objAdditionalData = RamqGetAdditionalData(); //Data from Payment form "Renseignements complementaires Regie"

    var arrCommonData = [objConstAppData, objVisionRData, objAdditionalData];
    
    var arrData = [];
    arrData[0] = arrCommonData;
    arrData[1] = RamqGetRamqDataFromGrille();
    arrData[2] = arrGrilleDeFacturation_forms;

    return arrData;
}

function RamqSoumissionDemandesModificationGetData() {
    /*
     data source to create a json :
     1. Common data (Constant data related to application and developer + Data from visioneR); objCommonData
     2. Data from arrGrilleDeFacturation array.
     3. Data from arrGrilleDeFacturation_forms array.
    
    returns an  array of objects:
    arrData[0] = arrCommonData[objConstAppData,objVisionRData,objAdditionalData];
    arrData[1] = arrGrilleDeFacturation_update;
    arrData[2] = arrGrilleDeFacturation_forms_update;
    */
    RamqBillUpdateBillInfo();
    //Update data in global arrays arrGrilleDeFacturation_update and arrGrilleDeFacturation_forms_update before sending.
    allTrData_update();

    var arrData = [];
    arrData[0] = globRamqBillInfo.info[0];
    arrData[1] = arrGrilleDeFacturation_update;
    arrData[2] = arrGrilleDeFacturation_forms_update;

    return arrData;
}

function RamqSoumissionDemandesAnnulationGetData()
{
    /*
     data source to create a json :
     1. Common data (Constant data related to application and developer + Data from visioneR); objCommonData
    
    returns an  array of objects:
    arrData[0] = arrCommonData[objConstAppData,objVisionRData,objAdditionalData];
    */

    //Update data in global arrays arrGrilleDeFacturation_update and arrGrilleDeFacturation_forms_update before sending.
    allTrData_update();

    RamqBillUpdateBillInfo();
    var arrData = [];
    arrData[0] = globRamqBillInfo.info[0];

    return arrData;
}

function RamqRESoumissionDemandesPaiementGetData()
{
    /*
     data source to create a json :
     1. Common data (Constant data related to application and developer + Data from visioneR); objCommonData
     2. Data from arrGrilleDeFacturation array.
     3. Data from arrGrilleDeFacturation_forms array.
    
    returns an  array of objects:
    arrData[0] = arrCommonData[objConstAppData,objVisionRData,objAdditionalData];
    arrData[1] = arrGrilleDeFacturation_update;
    arrData[2] = arrGrilleDeFacturation_forms_update;
    */
    RamqBillUpdateBillInfo();
    //Update data in global arrays arrGrilleDeFacturation_update and arrGrilleDeFacturation_forms_update before sending.
    allTrData_update();
    var arrData = [];
    arrData[0] = globRamqBillInfo.info[0];
    arrData[1] = arrGrilleDeFacturation_update;
    arrData[2] = arrGrilleDeFacturation_forms_update;

    return arrData;
}

function displayRamqAnswer(_header, _content)
{
    var modalDiv = document.getElementsByClassName('ui facture_response modal');
    var header = modalDiv[0].children[0].innerHTML = _header;
    var content = modalDiv[0].children[1].innerHTML = _content;
    modFactResponse();
}

function RamqGetConstAppData()
{
    var res = {};

    res.NoDevprLogcl = '18011';
    res.NomDevprLogcl = 'Axxium Vision Inc.';
    res.NomLogclFact = 'VisionR';
    res.NoVersiLogclFact = '11.0.0.4189';
    res.NoVersiXmlDem = 'ACTE';
    return res;
}

function RamqGetVisionRData()
{
    //TODO: call service to get this parameters
    var res = {};

    res.DemdrTypIdIntvn = '1'; //const

    res.DemdrIdIntvn = $('#pamnt_no_prof').val(); //? looks like Idprof
    res.ExpedTypIdIntvn = '3';//const
    res.ExpedIdIntvn = '18011';//?
    //res.TypModaPaimt = '';//1 : Compte personnel du professionnel 2 : Compte administratif
    //res.NoCpteAdmin =$('#txtRegiPaimentNoCompteAdmin').val();
    res.TypIdProf = '1'; //const 1 : Numéro dispensateur RAMQ
    res.IdProf = $('#pamnt_no_prof').val(); // 

    //res.TypIdLieuPhys = '1';//1 : Lieu physique, reconnu et codifié à la Régie (établissement SSS, Cabinet, etc.)
    //res.IdLieuPhys = '99999';//?
    res.TypSituConsi = '1';//Domaine de valeurs 1 : Situation normale 10 : Délai de carence, services nécessaires aux victimes de violence conjugale ou familiale ou d'une agression 11 : Délai de carence, services liés à la grossesse, à l\'accouchement ou à l'interruption de grossesse 12 : Délai de carence, services nécessaires aux personnes aux prises avec problèmes de santé de nature infectieuse ayant une incidence sur la santé publique
    res.TypIdPers = '1';//1 : NAM RAMQ
    res.IdPers = $('#ramq_no').val();//NAM
    res.NamExpDate = $('#ramq_exp');
    //res.IndFactAssosDr = 'true';//? Indique si la facture est associée à une demande de remboursement d'un bénéficiare.
    res.InsTypeList = ['AMQ', 'AGA'];
    //res.TypProf = 'Dentiste'; //TODO: For test only Dentiste , Chirurgiens , Denturologiste
    res.TypProf = dent_Type;

    //Patient without NAM
    res.NomPers='Smith';
    res.PrePers = 'Alex';
    res.DatNaissPers ='2001-01-01';
    res.CodSexPers = 1;            
    res.NoOrdreNaissPers =1;      //1 pour le premier bébé, 2 pour le deuxième bébé.       
    res.Nas ='123456789123'; 
    res.AdrPersPatnt='333 Place de la Belle-rive, Laval, QC, H7X3R5';
    res.RepdnIdPers = 'DISL14082217';

    //$('#pamnt_no_prof').val(res.IdProf);

    return res;
}

function RamqGetAdditionalData()//Data from Payment form "Renseignements complementaires Regie"
{

    globVisionRData.TypProf = dent_Type; //TODO: For Test only. Remove this When GetRamqData will be implemented.
    var res = {};

    
    res.IdPers = $('#ramq_no').val();

    res.RembDemParPatient = $('#remb_dem_oui').is(':checked');
    res.IndFactAssosDr = ($('#optRegiIndFactAssosDrYes').is(':checked')) ? 'true' : 'false';

    res.DemdrIdIntvn = $('#pamnt_no_prof').val();
    res.TypModaPaimt = ($('#optRegiePaimentComptePers').is(':checked')) ? '1' : '2';
    res.IsComptePersonnel = ($('#optRegiePaimentComptePers').is(':checked'));
    res.NoCpteAdmin = $('#txtRegiPaimentNoCompteAdmin').val();

    //code Diagnostic
    if ($('#code_diag_carie_dent').is(':checked'))
        res.CodDiagnMdcal = '5210';
    else if ($('#code_diag_etat_norm').is(':checked'))
        res.CodDiagnMdcal = 'V909';
    else if ($('#code_diag_autre_radio').is(':checked'))
        res.CodDiagnMdcal = $('#code_diag_autre_field').val(); //separated by comma
        
    res.DatEvenePers = $('#pamnt_even_date').val();

    res.DatEntrePersLieu = $('#pamnt_date_entre').val();
    res.DatSortiPersLieu = $('#pamnt_date_sorti').val();


    res.LieuCodifieRegie = $('#lieu_codifie').is(':checked');

    res.LieuNonCodifieRegie = $('#lieu_codifie_non').is(':checked'); 
    res.IdLieuPhys = $('#num_lieu_genr_fact').val();
    res.NoSectActiv = $('#secteur_active').val();

    res.CodePostal = $('#cod_postal_facture').val();
    res.CodeLocalite = $('#cod_local_facture').val();
    res.NoBur = $('#no_bur_facture').val();

    res.TypeDeLieu = null;
    if ($('#type_lieu_cab').is(':checked'))
        res.TypeDeLieu = "C";
    if ($('#type_lieu_dom').is(':checked'))
        res.TypeDeLieu = "D";
    if ($('#type_lieu_aut').is(':checked'))
        res.TypeDeLieu = "A";

    res.NoRamqSpecial = $('#txtRamqSpecialNams').val();

    return res;
}

//Returns an element from arrMoreInfo by element name
function RamqGetValueFromArrByName(pElementName, pArrMoreInfo)
{
    for (var i = 0; i < pArrMoreInfo.length; i++)
    {
        if (pArrMoreInfo[i].name == pElementName)
        {
            return pArrMoreInfo[i].value;
            break;
        }
    }
    return null;
}

function RamqGetArrayValueFromArrByName(pElementName, pArrMoreInfo)
{
    var arrOutput = [];
    $.each(pArrMoreInfo, function (idx, data) {
        if (data.name == pElementName) {
            arrOutput.push(data.value);
        }
    })
    return arrOutput;
}

//Returns object from array "More" form for the given rowId.
function GetObjFormMoreData(pRowId, pArrFormMoreData, ptypProf)
{
    var objRes = {};

    if (pRowId && pArrFormMoreData && pArrFormMoreData.length>0)
    {
        for (var i = 0; i < pArrFormMoreData.length; i++) {
            if (pArrFormMoreData[i][0].value == pRowId) {
                if (ptypProf == 'Dentiste' && globRamqOperationType == "New") {
                    //objRes.no_autorisation_dentiste = RamqGetValueFromArrByName('no_autor_proth_acryl_denti', arrMoreInfo);//TODO: this value isn't used
                    objRes.dat_autor_proth_acryl = RamqGetValueFromArrByName('dat_autor_proth_acryl_denti', pArrFormMoreData[i]);

                    objRes.typ_id_rais_trait_denta = RamqGetValueFromArrByName('typ_id_rais_trait_denta_denti', pArrFormMoreData[i]);
                    objRes.id_rais_trait_denta = RamqGetValueFromArrByName('id_rais_trait_denta_denti', pArrFormMoreData[i]);

                    objRes.typ_id_site_trait_denta = RamqGetValueFromArrByName('typ_id_site_trait_denta_denti', pArrFormMoreData[i]);
                    objRes.id_site_trait_denta = RamqGetValueFromArrByName('id_site_trait_denta_denti', pArrFormMoreData[i]);

                    objRes.liste_med_consm = RamqGetArrayValueFromArrByName('liste_med_consm_denti', pArrFormMoreData[i]);

                    objRes.liste_elm_contx = RamqGetArrayValueFromArrByName('liste_elm_contx_denti', pArrFormMoreData[i]);

                    objRes.liste_elm_mesur = RamqGetArrayValueFromArrByName('liste_elm_mesur_denti', pArrFormMoreData[i]);

                    objRes.dat_serv_elm_fact = RamqGetArrayValueFromArrByName('dat_serv_elm_fact_denti', pArrFormMoreData[i]);

                    var dateDebutEven = RamqGetValueFromArrByName('date_debu_lev', pArrFormMoreData[i]);
                    var timeDebutEven = RamqGetValueFromArrByName('time_debu_lev', pArrFormMoreData[i]);
                    if (dateDebutEven && timeDebutEven) {
                        objRes.dhd_elm_fact = dateDebutEven + 'T' + timeDebutEven + ':00';
                    }
                    else
                        objRes.dhd_elm_fact = null;

                    objRes.typ_refre_lieu = RamqGetValueFromArrByName('typ_refre_lieu_denti', pArrFormMoreData[i]); //Permet d'identifier le type de lieu en référence. Domaine de valeurs 10 : Établissement pris en charge lors d'une garde multi-établissements 14 : Lieu de départ pour un déplacement

                    objRes.no_sect_activ = RamqGetValueFromArrByName('no_sect_activ_refr_denti', pArrFormMoreData[i]);

                    objRes.isLieuCodifieALaRegie = (RamqGetValueFromArrByName('lieu_refre_phys_denti', pArrFormMoreData[i]) == null) ? null : (RamqGetValueFromArrByName('lieu_refre_phys_denti', pArrFormMoreData[i]) == 'Lieu codifié á la Régie') ? true : false; //null if not both radio button not selected, true if Lie Codifie a la Regie selected otherwise false.

                    objRes.id_lieu_phys = RamqGetValueFromArrByName('id_lieu_phys_denti', pArrFormMoreData[i]);
                    objRes.codePostal = RamqGetValueFromArrByName('code_postal_geo_denti', pArrFormMoreData[i]);

                    objRes.code_localite_dentiste = RamqGetValueFromArrByName('code_localite_geo_denti', pArrFormMoreData[i]);
                    objRes.no_bur = RamqGetValueFromArrByName('no_bureau_geo_denti', pArrFormMoreData[i]);
                    objRes.lieu_type = RamqGetValueFromArrByName('typ_lieu_geo_denti', pArrFormMoreData[i]);

                    //Referant
                    objRes.typ_refre_autre_prof = RamqGetValueFromArrByName('typ_refre_autre_prof_denti', pArrFormMoreData[i]); //Type de profession
                    objRes.typ_id_prof = '1' //1 : Numéro dispensateur RAMQ   
                    objRes.id_prof = RamqGetValueFromArrByName('id_prof_refre_denti', pArrFormMoreData[i]);//No du Referant

                    var dateDemCnsul = RamqGetValueFromArrByName('date_lappel_lev', pArrFormMoreData[i]);
                    var timeDemCnsul = RamqGetValueFromArrByName('time_lappel', pArrFormMoreData[i]);
                    if (dateDemCnsul && timeDemCnsul) {
                        objRes.dh_dem_cnsul = dateDemCnsul + 'T' + timeDemCnsul + ':00';
                    }
                    else
                        objRes.dh_dem_cnsul = null;
                    

                }
                else if (ptypProf == 'Chirurgiens' && globRamqOperationType == "New") {
                    //objRes.no_autorisation_dentiste = RamqGetValueFromArrByName('no_autor_proth_acryl_bucc', arrMoreInfo);//TODO: this value isn't used
                    objRes.dat_autor_proth_acryl = RamqGetValueFromArrByName('dat_autor_proth_acryl_bucc', pArrFormMoreData[i]);

                    objRes.typ_id_rais_trait_denta = RamqGetValueFromArrByName('typ_id_rais_trait_denta_bucc', pArrFormMoreData[i]);
                    objRes.id_rais_trait_denta = RamqGetValueFromArrByName('id_rais_trait_denta_bucc', pArrFormMoreData[i]);

                    objRes.typ_id_site_trait_denta = RamqGetValueFromArrByName('typ_id_site_trait_denta_bucc', pArrFormMoreData[i]);
                    objRes.id_site_trait_denta = RamqGetValueFromArrByName('id_site_trait_denta_bucc', pArrFormMoreData[i]);

                    objRes.liste_med_consm = RamqGetArrayValueFromArrByName('liste_med_consm_bucc', pArrFormMoreData[i]);

                    objRes.liste_elm_contx = RamqGetArrayValueFromArrByName('liste_elm_contx_bucc', pArrFormMoreData[i]);

                    objRes.liste_elm_mesur = RamqGetArrayValueFromArrByName('liste_elm_mesur_bucc', pArrFormMoreData[i]);

                    objRes.dat_serv_elm_fact = RamqGetArrayValueFromArrByName('dat_serv_elm_fact_bucc', pArrFormMoreData[i]);

                    var dateDebutEven = RamqGetValueFromArrByName('date_debu_lev', pArrFormMoreData[i]);
                    var timeDebutEven = RamqGetValueFromArrByName('time_debu_lev', pArrFormMoreData[i]);
                    if (dateDebutEven && timeDebutEven) {
                        objRes.dhd_elm_fact = dateDebutEven + 'T' + timeDebutEven + ':00';
                    }
                    else
                        objRes.dhd_elm_fact = null;

                    objRes.typ_refre_lieu = RamqGetValueFromArrByName('typ_refre_lieu_bucc', pArrFormMoreData[i]); //Permet d'identifier le type de lieu en référence. Domaine de valeurs 10 : Établissement pris en charge lors d'une garde multi-établissements 14 : Lieu de départ pour un déplacement

                    objRes.no_sect_activ = RamqGetValueFromArrByName('no_sect_activ_refr_bucc', pArrFormMoreData[i]);

                    objRes.isLieuCodifieALaRegie = (RamqGetValueFromArrByName('lieu_refre_phys_bucc', pArrFormMoreData[i]) == null) ? null : (RamqGetValueFromArrByName('lieu_refre_phys_bucc', pArrFormMoreData[i]) == 'Lieu codifié á la Régie') ? true : false; //null if not both radio button not selected, true if Lie Codifie a la Regie selected otherwise false.

                    objRes.id_lieu_phys = RamqGetValueFromArrByName('id_lieu_phys_bucc', pArrFormMoreData[i]);
                    objRes.codePostal = RamqGetValueFromArrByName('code_postal_geo_bucc', pArrFormMoreData[i]);

                    objRes.code_localite_dentiste = RamqGetValueFromArrByName('code_localite_geo_bucc', pArrFormMoreData[i]);
                    objRes.no_bur = RamqGetValueFromArrByName('no_bureau_geo_bucc', pArrFormMoreData[i]);
                    objRes.lieu_type = RamqGetValueFromArrByName('typ_lieu_geo_bucc', pArrFormMoreData[i]);

                    //Referant
                    objRes.typ_refre_autre_prof = RamqGetValueFromArrByName('typ_refre_autre_prof_bucc', pArrFormMoreData[i]); //Type de profession
                    objRes.typ_id_prof = '1' //1 : Numéro dispensateur RAMQ  
                    objRes.id_prof = RamqGetValueFromArrByName('id_prof_refre_bucc', pArrFormMoreData[i]);//No du Referant

                    var dateDemCnsul = RamqGetValueFromArrByName('date_lappel_lev', pArrFormMoreData[i]);
                    var timeDemCnsul = RamqGetValueFromArrByName('time_lappel', pArrFormMoreData[i]);
                    if (dateDemCnsul && timeDemCnsul) {
                        objRes.dh_dem_cnsul = dateDemCnsul + 'T' + timeDemCnsul + ':00';
                    }
                    else
                        objRes.dh_dem_cnsul = null;
                }
                else if (ptypProf == 'Denturologiste' && globRamqOperationType == "New") {//TODO: 
                    objRes.dat_serv_elm_fact = RamqGetArrayValueFromArrByName('dat_serv_elm_fact_dentu', pArrFormMoreData[i]);
                    objRes.dat_autor_proth_acryl = RamqGetValueFromArrByName('dat_autor_proth_acryl_dentu', pArrFormMoreData[i]);

                    objRes.liste_elm_contx = RamqGetArrayValueFromArrByName('liste_elm_contx_dentu', pArrFormMoreData[i]);

                    //Referant
                    objRes.typ_refre_autre_prof = RamqGetValueFromArrByName('typ_refre_autre_prof_dentu', pArrFormMoreData[i]); //Type de profession
                    objRes.typ_id_prof = '1' //1 : Numéro dispensateur RAMQ 
                    objRes.id_prof = RamqGetValueFromArrByName('id_prof_refre_dentu', pArrFormMoreData[i]);//No du Referant
                }
                else if (ptypProf == 'Dentiste' && globRamqOperationType == "Update") {
                    //objRes.no_autorisation_dentiste = RamqGetValueFromArrByName('no_autor_proth_acryl_denti_upd', arrMoreInfo);//TODO: this value isn't used
                    objRes.dat_autor_proth_acryl = RamqGetValueFromArrByName('dat_autor_proth_acryl_denti', pArrFormMoreData[i]);

                    objRes.typ_id_rais_trait_denta = RamqGetValueFromArrByName('typ_id_rais_trait_denta_denti', pArrFormMoreData[i]);
                    objRes.id_rais_trait_denta = RamqGetValueFromArrByName('id_rais_trait_denta_denti', pArrFormMoreData[i]);

                    objRes.typ_id_site_trait_denta = RamqGetValueFromArrByName('typ_id_site_trait_denta_denti', pArrFormMoreData[i]);
                    objRes.id_site_trait_denta = RamqGetValueFromArrByName('id_site_trait_denta_denti', pArrFormMoreData[i]);

                    objRes.liste_med_consm = RamqGetArrayValueFromArrByName('liste_med_consm_denti', pArrFormMoreData[i]);

                    objRes.liste_elm_contx = RamqGetArrayValueFromArrByName('liste_elm_contx_denti', pArrFormMoreData[i]);

                    objRes.liste_elm_mesur = RamqGetArrayValueFromArrByName('liste_elm_mesur_denti', pArrFormMoreData[i]);

                    objRes.dat_serv_elm_fact = RamqGetArrayValueFromArrByName('dat_serv_elm_fact_denti', pArrFormMoreData[i]);

                    var dateDebutEven = RamqGetValueFromArrByName('date_debu_lev', pArrFormMoreData[i]);
                    var timeDebutEven = RamqGetValueFromArrByName('time_debu_lev', pArrFormMoreData[i]);
                    if (dateDebutEven && timeDebutEven) {
                        objRes.dhd_elm_fact = dateDebutEven + 'T' + timeDebutEven + ':00';
                    }
                    else
                        objRes.dhd_elm_fact = null;

                    objRes.typ_refre_lieu = RamqGetValueFromArrByName('typ_refre_lieu_denti', pArrFormMoreData[i]); //Permet d'identifier le type de lieu en référence. Domaine de valeurs 10 : Établissement pris en charge lors d'une garde multi-établissements 14 : Lieu de départ pour un déplacement

                    objRes.no_sect_activ = RamqGetValueFromArrByName('no_sect_activ_refr_denti', pArrFormMoreData[i]);

                    objRes.isLieuCodifieALaRegie = (RamqGetValueFromArrByName('lieu_refre_phys_denti', pArrFormMoreData[i]) == null) ? null : (RamqGetValueFromArrByName('lieu_refre_phys_denti', pArrFormMoreData[i]) == 'Lieu codifié á la Régie') ? true : false; //null if not both radio button not selected, true if Lie Codifie a la Regie selected otherwise false.

                    objRes.id_lieu_phys = RamqGetValueFromArrByName('id_lieu_phys_denti', pArrFormMoreData[i]);
                    objRes.codePostal = RamqGetValueFromArrByName('code_postal_geo_denti', pArrFormMoreData[i]);

                    objRes.code_localite_dentiste = RamqGetValueFromArrByName('code_localite_geo_denti', pArrFormMoreData[i]);
                    objRes.no_bur = RamqGetValueFromArrByName('no_bureau_geo_denti', pArrFormMoreData[i]);
                    objRes.lieu_type = RamqGetValueFromArrByName('typ_lieu_geo_denti', pArrFormMoreData[i]);

                    //Referant
                    objRes.typ_refre_autre_prof = RamqGetValueFromArrByName('typ_refre_autre_prof_denti', pArrFormMoreData[i]); //Type de profession
                    objRes.typ_id_prof = '1' //1 : Numéro dispensateur RAMQ 
                    objRes.id_prof = RamqGetValueFromArrByName('id_prof_refre_denti', pArrFormMoreData[i]);//No du Referant

                    var dateDemCnsul = RamqGetValueFromArrByName('date_lappel_lev', pArrFormMoreData[i]);
                    var timeDemCnsul = RamqGetValueFromArrByName('time_lappel', pArrFormMoreData[i]);
                    if (dateDemCnsul && timeDemCnsul) {
                        objRes.dh_dem_cnsul = dateDemCnsul + 'T' + timeDemCnsul + ':00';
                    }
                    else
                        objRes.dh_dem_cnsul = null;

                }
                else if (ptypProf == 'Chirurgiens' && globRamqOperationType == "Update") {
                    //objRes.no_autorisation_dentiste = RamqGetValueFromArrByName('no_autor_proth_acryl_bucc_upd', arrMoreInfo);//TODO: this value isn't used
                    objRes.dat_autor_proth_acryl = RamqGetValueFromArrByName('dat_autor_proth_acryl_bucc', pArrFormMoreData[i]);

                    objRes.typ_id_rais_trait_denta = RamqGetValueFromArrByName('typ_id_rais_trait_denta_bucc', pArrFormMoreData[i]);
                    objRes.id_rais_trait_denta = RamqGetValueFromArrByName('id_rais_trait_denta_bucc', pArrFormMoreData[i]);

                    objRes.typ_id_site_trait_denta = RamqGetValueFromArrByName('typ_id_site_trait_denta_bucc', pArrFormMoreData[i]);
                    objRes.id_site_trait_denta = RamqGetValueFromArrByName('id_site_trait_denta_bucc', pArrFormMoreData[i]);

                    objRes.liste_med_consm = RamqGetArrayValueFromArrByName('liste_med_consm_bucc', pArrFormMoreData[i]);

                    objRes.liste_elm_contx = RamqGetArrayValueFromArrByName('liste_elm_contx_bucc', pArrFormMoreData[i]);

                    objRes.liste_elm_mesur = RamqGetArrayValueFromArrByName('liste_elm_mesur_bucc', pArrFormMoreData[i]);

                    objRes.dat_serv_elm_fact = RamqGetArrayValueFromArrByName('dat_serv_elm_fact_bucc', pArrFormMoreData[i]);

                    var dateDebutEven = RamqGetValueFromArrByName('date_debu_lev', pArrFormMoreData[i]);
                    var timeDebutEven = RamqGetValueFromArrByName('time_debu_lev', pArrFormMoreData[i]);
                    if (dateDebutEven && timeDebutEven) {
                        objRes.dhd_elm_fact = dateDebutEven + 'T' + timeDebutEven + ':00';
                    }
                    else
                        objRes.dhd_elm_fact = null;

                    objRes.typ_refre_lieu = RamqGetValueFromArrByName('typ_refre_lieu_bucc', pArrFormMoreData[i]); //Permet d'identifier le type de lieu en référence. Domaine de valeurs 10 : Établissement pris en charge lors d'une garde multi-établissements 14 : Lieu de départ pour un déplacement

                    objRes.no_sect_activ = RamqGetValueFromArrByName('no_sect_activ_refr_bucc', pArrFormMoreData[i]);

                    objRes.isLieuCodifieALaRegie = (RamqGetValueFromArrByName('lieu_refre_phys_bucc', pArrFormMoreData[i]) == null) ? null : (RamqGetValueFromArrByName('lieu_refre_phys_bucc', pArrFormMoreData[i]) == 'Lieu codifié á la Régie') ? true : false; //null if not both radio button not selected, true if Lie Codifie a la Regie selected otherwise false.

                    objRes.id_lieu_phys = RamqGetValueFromArrByName('id_lieu_phys_bucc', pArrFormMoreData[i]);
                    objRes.codePostal = RamqGetValueFromArrByName('code_postal_geo_bucc', pArrFormMoreData[i]);

                    objRes.code_localite_dentiste = RamqGetValueFromArrByName('code_localite_geo_bucc', pArrFormMoreData[i]);
                    objRes.no_bur = RamqGetValueFromArrByName('no_bureau_geo_bucc', pArrFormMoreData[i]);
                    objRes.lieu_type = RamqGetValueFromArrByName('typ_lieu_geo_bucc', pArrFormMoreData[i]);

                    //Referant
                    objRes.typ_refre_autre_prof = RamqGetValueFromArrByName('typ_refre_autre_prof_bucc', pArrFormMoreData[i]); //Type de profession
                    objRes.typ_id_prof = '1' //1 : Numéro dispensateur RAMQ 
                    objRes.id_prof = RamqGetValueFromArrByName('id_prof_refre_bucc', pArrFormMoreData[i]);//No du Referant

                    var dateDemCnsul = RamqGetValueFromArrByName('date_lappel_lev', pArrFormMoreData[i]);
                    var timeDemCnsul = RamqGetValueFromArrByName('time_lappel', pArrFormMoreData[i]);
                    if (dateDemCnsul && timeDemCnsul) {
                        objRes.dh_dem_cnsul = dateDemCnsul + 'T' + timeDemCnsul + ':00';
                    }
                    else
                        objRes.dh_dem_cnsul = null;


                }
                else if (ptypProf == 'Denturologiste' && globRamqOperationType == "Update") {
                    objRes.dat_serv_elm_fact = RamqGetArrayValueFromArrByName('dat_serv_elm_fact_dentu', pArrFormMoreData[i]);
                    objRes.dat_autor_proth_acryl = RamqGetValueFromArrByName('dat_autor_proth_acryl_dentu', pArrFormMoreData[i]);

                    objRes.liste_elm_contx = RamqGetArrayValueFromArrByName('liste_elm_contx_dentu', pArrFormMoreData[i]);

                    //Referant
                    objRes.typ_refre_autre_prof = RamqGetValueFromArrByName('typ_refre_autre_prof_dentu', pArrFormMoreData[i]); //Type de profession
                    objRes.typ_id_prof = '1' //1 : Numéro dispensateur RAMQ  
                    objRes.id_prof = RamqGetValueFromArrByName('id_prof_refre_dentu', pArrFormMoreData[i]);//No du Referant
                }
                break;
            }
        }
    }
    return objRes;
}

//Returns additional info for the line of Bill.
function RamqGetMoreInfo(pRowId)
{
    for (var i = 0; i < arrGrilleDeFacturation_forms.length; i++)
    {
        if (arrGrilleDeFacturation_forms[i][0].value == pRowId)
        {
            return arrGrilleDeFacturation_forms[i];
            break;
        }
    }
    return null;
}

function RamqGenerateNoDemExt()
{
    return new Date().getTime();
}


//creates new global bill (json file) on the servert and returns bill number.
function RamqCreateNewGlobalBill()
{
    $.post("allScriptsv1.py", { tx: "createFacture", patientId: globPatientId, nodossier: globNoDossier, clinicId: globClinicId },
            function (result) {
                if (result.outcome == 'error')
                    alert(result.message);
                else
                {
                    globBillNumber = result.nofact;
                    alert("Bill " + globBillNumber+ " is created")
                    //TODO: Display UI
                }
            });
}

function RamqUpdateGlobalBill()
{
    
    //RAMQ
    var arrRamqData = [];
    arrRamqData[0] = [];
    arrRamqData[1] = RamqGetRamqDataFromGrille();
    arrRamqData[2] = arrGrilleDeFacturation_forms;

    //Insurance
    var arrInsData = RamqGetInsDataFromGrille();

    //Cash
    var arrCasData = RamqGetCasDataFromGrille();

    var inputXMl = {
        "ins": arrInsData,
        "amq": arrRamqData,
        "cas": arrCasData
    };

    $.post("allScriptsv1.py", { tx: "updateFacture", clinicId: globClinicId, patientId: globPatientId, nodossier: globNoDossier, nofact: globBillNumber, json: JSON.stringify(inputXMl) },
        function (result) {
            if (result.outcome == 'updateFacture error')
                alert(result.message);
            else
                getAllTrData(); //Open Payment form
        });
}

//Returns an array with ONLY RamqData (AMQ, BES, HOP)
function RamqGetRamqDataFromGrille()
{
    var arrRes=[];
    for (var i = 0; i < arrGrilleDeFacturation.length; i++)
    {
        if (arrGrilleDeFacturation[i].Type == 'AMQ' || arrGrilleDeFacturation[i].Type == 'BES' || arrGrilleDeFacturation[i].Type == 'HOP')
        {
            arrRes.push(arrGrilleDeFacturation[i]);
        }
    }
    return arrRes;
}

//Returns an array with ONLY RamqData (AMQ, BES, HOP)
function RamqGetInsDataFromGrille() {
    var arrRes = [];
    for (var i = 0; i < arrGrilleDeFacturation.length; i++) {
        if (arrGrilleDeFacturation[i].Type !== 'AMQ' && arrGrilleDeFacturation[i].Type !== 'BES' && arrGrilleDeFacturation[i].Type !== 'HOP' && arrGrilleDeFacturation[i].Type !== 'CAS') {
            arrRes.push(arrGrilleDeFacturation[i]);
        }
    }
    return arrRes;
}

function RamqGetCasDataFromGrille() {
    var arrRes = [];
    for (var i = 0; i < arrGrilleDeFacturation.length; i++) {
        if (arrGrilleDeFacturation[i].Type == 'CAS') {
            arrRes.push(arrGrilleDeFacturation[i]);
        }
    }
    return arrRes;
}


