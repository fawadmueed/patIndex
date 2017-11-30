

var globVisionRData;
//var arrGrilleDeFacturation = getarrGrilleDeFacturation(); //for test only. in production arrGrilleDeFacturation should be global;
//TODO:rename SoumissionDemandesPaiement to RamqSoumissionDemandesPaiement;

$(document).ready(function () {
    globVisionRData = RamqGetVisionRData();
});
function SoumissionDemandesPaiement()
{
    var objSoumissionDemandesPaiementData = RamqSoumissionDemandesPaiementGetData();
    if (objSoumissionDemandesPaiementData != null) //TODO: empty line shouldn't be added to an array.
    {
        var operationName = "Paiement";
        var inputXMl = RamqGetXmlToSend(operationName, objSoumissionDemandesPaiementData); //This data is used to send to RAMQ.

        var jsonDataArray = objSoumissionDemandesPaiementData; //this data is used to store bill info on the server
        var jsonXML = {
            "request": inputXMl,
            "info": jsonDataArray // JSON data
        }
        var billNumber = RamqGetBillNumberFromServer();
        $.post("allScriptsv1.py", { tx: "getRamqData", clinicId: globClinicId, patientId: globPatientId, nodossier: globNoDossier, nofact:billNumber, json: JSON.stringify(jsonXML) },
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
    var objSoumissionDemandesModificationData = RamqSoumissionDemandesModificationGetData();
    if (objSoumissionDemandesModificationData != null)
    {
        var operationName = "Modification";
        var inputXMl = RamqGetXmlToSend(operationName, objSoumissionDemandesModificationData); //This data is used to send to RAMQ.

        var jsonDataArray = objSoumissionDemandesModificationData; //this data is used to store bill info on the server
        var jsonXML = {
            "request": inputXMl,
            "info": jsonDataArray // JSON data
        }
        var billNumber = RamqGetBillNumberFromServer();
        $.post("allScriptsv1.py", { tx: "modifyRamqData", clinicId: globClinicId, patientId: globPatientId, nodossier: globNoDossier, nofact: billNumber, json: JSON.stringify(jsonXML) },
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
    var objSoumissionDemandesAnnulationData = RamqSoumissionDemandesAnnulationGetData();
    if (objSoumissionDemandesAnnulationData != null) {
        var operationName = "Annulation";
        var inputXMl = RamqGetXmlToSend(operationName, objSoumissionDemandesAnnulationData); //This data is used to send to RAMQ.

        var jsonDataArray = objSoumissionDemandesAnnulationData; //this data is used to store bill info on the server
        var jsonXML = {
            "request": inputXMl,
            "info": jsonDataArray // JSON data
        }
        var billNumber = RamqGetBillNumberFromServer();
        $.post("allScriptsv1.py", { tx: "cancelRamqData", clinicId: globClinicId, patientId: globPatientId, nodossier: globNoDossier, nofact: billNumber, json: JSON.stringify(jsonXML) },
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
        '<id_intvn>' + _arrData[0][1].DemdrIdIntvn + '</id_intvn>' + //?
    '</demdr>' +
    '<exped_difrn_demdr>' +
        '<typ_id_intvn>' + _arrData[0][1].ExpedTypIdIntvn + '</typ_id_intvn>' + //const
        '<id_intvn>' + _arrData[0][1].ExpedIdIntvn + '</id_intvn>' + //?
    '</exped_difrn_demdr>' +
    '<moda_paimt>' +
        '<typ_moda_paimt>' + _arrData[0][1].TypModaPaimt + '</typ_moda_paimt>' + //1 : Compte personnel du professionnel 2 : Compte administratif
    '</moda_paimt>' +
    '<liste_fact>' +
        RamqGetListFact(_arrData, dent_Type) +// dent_Type is a global variable : Dentist, Chirurgiens, Denturologiste
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
        '<id_intvn>' + _arrData[0][1].DemdrIdIntvn + '</id_intvn>' + //?
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
        RamqGetListFact(_arrData, dent_Type) +// dent_Type is a global variable : Dentist, Chirurgiens, Denturologiste
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
                        '<id_intvn>' + _arrData[0][1].DemdrIdIntvn + '</id_intvn>' + //?
                    '</demdr>' +
                    '<exped_difrn_demdr>' +
                        '<typ_id_intvn>' + _arrData[0][1].ExpedTypIdIntvn + '</typ_id_intvn>' + //const
                        '<id_intvn>' + _arrData[0][1].ExpedIdIntvn + '</id_intvn>' + //?
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
function RamqGetListFact(_arrData, _dent_Type)
{
    var objDataFromVisionR = _arrData[0][1];
    var objAdditionalData = _arrData[0][2];
    var xml = '';
    var factServDentaChirTitle = '';
    var listeLigneFactServDentaChirgTitle = '';
    if (_dent_Type == 'Dentiste')
    {
        factServDentaChirTitle = 'fact_serv_denta_chirg_denti_1_1_0';
        listeLigneFactServDentaChirgTitle = 'liste_ligne_fact_serv_denta_chirg_denti';
    }
    else if (_dent_Type == 'Chirurgiens')
    {
        factServDentaChirTitle = 'fact_serv_denta_chirg_bucc_1_1_0';
        listeLigneFactServDentaChirgTitle = 'liste_ligne_fact_serv_denta_chirg_bucc';
    }
    else if (_dent_Type == 'Denturologiste')
    {
        factServDentaChirTitle = 'fact_serv_denta_dentu_1_0_0';
        listeLigneFactServDentaChirgTitle = 'liste_ligne_fact_serv_denta_dentu';
    }

    xml +=
        '<' + factServDentaChirTitle + '>' +
                    '<no_fact_ext>' + RamqGetFactNumber() + '</no_fact_ext>' +
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
                    '<liste_pers_objet_fact>' +
                    RamqGetListePersObjetFact(objDataFromVisionR, objAdditionalData)+
                        //'<pers_patnt_avec_idt>' +
                        //    '<typ_situ_consi>' + objDataFromVisionR.TypSituConsi + '</typ_situ_consi>' + //Domaine de valeurs 1 : Situation normale 10 : Délai de carence, services nécessaires aux victimes de violence conjugale ou familiale ou d'une agression 11 : Délai de carence, services liés à la grossesse, à l\'accouchement ou à l'interruption de grossesse 12 : Délai de carence, services nécessaires aux personnes aux prises avec problèmes de santé de nature infectieuse ayant une incidence sur la santé publique
                        //    '<typ_id_pers>' + objDataFromVisionR.TypIdPers + '</typ_id_pers>' + //1 : NAM RAMQ
                        //    '<id_pers>' + objDataFromVisionR.IdPers + '</id_pers>' + // NAM
                        //'</pers_patnt_avec_idt>' + //TODO: implement case if user doesn't have NAM
                    '</liste_pers_objet_fact>' +
                    RamqGetIndFactAssocDrXml(objDataFromVisionR.IndFactAssosDr, _dent_Type) +//? Indique si la facture est associée à une demande de remboursement d'un bénéficiare.
                    '<' + listeLigneFactServDentaChirgTitle + '>' +
                        RamqGetListeLigneFactServDenta(_arrData[1],_arrData[2], _dent_Type) +
                    '</' + listeLigneFactServDentaChirgTitle + '>' +
                '</' + factServDentaChirTitle + '>';
    return xml;
}

function RamqGetListePersObjetFact(pObjDataFromVisionR, pObjAdditionalData)
{
    var xml = '';
    if (pObjDataFromVisionR.IdPers) {
        xml +=
                '<pers_patnt_avec_idt>' +
                    '<typ_situ_consi>' + pObjDataFromVisionR.TypSituConsi + '</typ_situ_consi>' + //Domaine de valeurs 1 : Situation normale 10 : Délai de carence, services nécessaires aux victimes de violence conjugale ou familiale ou d'une agression 11 : Délai de carence, services liés à la grossesse, à l\'accouchement ou à l'interruption de grossesse 12 : Délai de carence, services nécessaires aux personnes aux prises avec problèmes de santé de nature infectieuse ayant une incidence sur la santé publique
                    '<typ_id_pers>1</typ_id_pers>' + //1 : NAM RAMQ
                    '<id_pers>' + pObjDataFromVisionR.IdPers + '</id_pers>'+ //NAM
                    RamqGetInfoMdcalPers(pObjAdditionalData)+
                   '</pers_patnt_avec_idt>';
        }
    else //patient without id
    {
        xml +=
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
        if(pObjDataFromVisionR.RepdnIdPers)
        {
            xml+=
                '<pers_repdn>'+
                '<repdn_avec_idt>'+
                  '<typ_id_pers>1</typ_id_pers>'+
                  '<id_pers>'+pObjDataFromVisionR.RepdnIdPers+'</id_pers>'+
                '</repdn_avec_idt>'+
              '</pers_repdn>';
        }
        xml+='</pers_patnt_sans_idt>';
    }
    return xml;
}

function RamqGetInfoMdcalPers(pObjAdditionalData)
{
    var xml ='';

    if ((pObjAdditionalData.TypEvenePers && pObjAdditionalData.DatEvenePers) || pObjAdditionalData.DatEntrePersLieu && pObjAdditionalData.DatSortiPersLieu)
    {
        xml += '<info_mdcal_pers>';
        if (pObjAdditionalData.TypEvenePers && pObjAdditionalData.DatEvenePers)
        {
            xml+=
                '<evene_pers_objet_fact>' +
                    '<typ_evene_pers>' + pObjAdditionalData.TypEvenePers + '</typ_evene_pers>' +
                    '<dat_evene_pers>' + pObjAdditionalData.DatEvenePers + '</dat_evene_pers>' +
                '</evene_pers_objet_fact>';
        }
        if (pObjAdditionalData.DatEntrePersLieu && pObjAdditionalData.DatSortiPersLieu)
        {
            xml +=
                '<per_sej_pers_lieu>' +
                    '<dat_entre_pers_lieu>' + pObjAdditionalData.DatEntrePersLieu + '</dat_entre_pers_lieu>' +
                    '<dat_sorti_pers_lieu>' + pObjAdditionalData.DatSortiPersLieu + '</dat_sorti_pers_lieu>' +
                '</per_sej_pers_lieu>';
        }
        xml+='</info_mdcal_pers>';
    }
    return xml;
}

function RamqGetLieuConsiXml(pObjAdditionalData)
{
    var xml = '';
    if (pObjAdditionalData.LieuCodifieRegie && pObjAdditionalData.IdLieuPhys)
    {
        xml +=
                '<lieu_phys>'+
					'<typ_id_lieu_phys>1</typ_id_lieu_phys>'+
					'<id_lieu_phys>'+ pObjAdditionalData.IdLieuPhys+'</id_lieu_phys>'+
					//(pObjAdditionalData.NoSectActiv)?'<no_sect_activ>'+pObjAdditionalData.NoSectActiv+'</no_sect_activ>':''+ //TODO:
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
            xml += '<no_bur>' + pObjAdditionalData.NoBur + '</no_bur>';
        }

        xml +=
            '</lieu_geo>';
    }
    return xml;
}

function RamqGetIndFactAssocDrXml(p_IndFactAssosDr, p_dent_Type)
{
    if (p_dent_Type == 'Denturologiste')
        return '';
    else
        return '<ind_fact_assoc_dr>' + p_IndFactAssosDr + '</ind_fact_assoc_dr>';
}

function RamqGetListeLigneFactServDenta(pArrGridData, pArrFormMoreData, _dent_Type)
{
    var xml = '';
    if (_dent_Type == 'Dentiste' || _dent_Type == 'Chirurgiens')
        xml = RamqGetListe_ligne_fact_serv_denta_chirg(pArrGridData, pArrFormMoreData, _dent_Type);
    else if (_dent_Type == 'Denturologiste')
        xml = RamqGetListe_ligne_fact_serv_denta_dentu(pArrGridData, pArrFormMoreData, _dent_Type);
    return xml;
}

function RamqGetListe_ligne_fact_serv_denta_chirg(pArrpGridData, pArrFormMoreData, _dent_Type)
{
    var xml = '';
    var ligneFactServDentaChirgTitle = '';
    if (_dent_Type == 'Dentiste') {
        ligneFactServDentaChirgTitle = 'ligne_fact_serv_denta_chirg_denti';
    }
    else if (_dent_Type =='Chirurgiens') {
        ligneFactServDentaChirgTitle = 'ligne_fact_serv_denta_chirg_bucc';
    }
    var ligneNum = 1;

    for (var i = 0; i < pArrpGridData.length; i++)
    {
        //var pObjBillData = pArrBillData[i];
        var pObjGridData = pArrpGridData[i];
        var pObjFormMoreData;

        if (pObjGridData.Type == 'AMQ' || pObjGridData.Type == 'BES')
        {
            pObjFormMoreData = GetObjFormMoreData(pObjGridData.row_id, pArrFormMoreData);

            var dateServ;
            if (pObjFormMoreData && pObjFormMoreData.datServElmFact) {
                dateServ = pObjFormMoreData.datServElmFact;
            }
            else {
                dateServ = RamqGetCurrentDate();
            }

            var codeRole;
            if (pObjGridData && pObjGridData.codeRole) {
                codeRole = pObjGridData.codeRole;
            }
            else {
                codeRole = 1; //TODO:For test only
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
                    RamqGetDatAutorProthAcryl(pObjFormMoreData) +
                    '<info_serv_denta>' +
                        '<no_dent>' + pObjGridData.Dent + '</no_dent>' +
                        '<liste_surf_dent_trait>' +
                            RamqGetListe_surf_dent_trait(pObjGridData.Surface) +
                        '</liste_surf_dent_trait>' +
                        //optional
                        RamqGetRaisTraitDentaXml(pObjFormMoreData) +
                        //optional
                        RamqGetSiteTraitDentaXml(pObjFormMoreData) +
                        //optional
                        RamqGetInfoMedConsmXml(pObjFormMoreData) +
                    '</info_serv_denta>' +
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

function RamqGetListe_ligne_fact_serv_denta_dentu(pArrBillData, _dent_Type)
{
    var xml = '';
    var ligneNum = 1;

    for (var i = 0; i < pArrBillData.length; i++) {
        var pObjBillData = pArrBillData[i];
        if (pObjBillData.Type == 'AMQ' || pObjBillData.Type == 'BES') {
            xml = xml +
                '<ligne_fact_serv_denta_dentu>' +
                    '<no_ligne_fact>' + ligneNum + '</no_ligne_fact>' +
                    '<typ_id_elm_fact>' + '1' + '</typ_id_elm_fact>' + //1 : Code facturation élément assuré
                    '<id_elm_fact>' + pObjBillData.Code + '</id_elm_fact>' + //Code de facturation
                    '<dat_serv_elm_fact>' + RamqGetCurrentDate() + '</dat_serv_elm_fact>' + //TODO:Is current date? format YYYY-mm-DD (2017-08-01)
                    RamqGetDatAutorProthAcryl(pObjBillData.date_autorisation_dentiste) +
                    RamqGetListElmContxXml(pObjBillData.arr_elm_contx) +
                    //optional
                    //RamqGetListeLieuRefreXml(pObjBillData.identification_lieu_dentiste, pObjBillData.id_lieu_phys, pObjBillData.no_sect_activ, pObjBillData.id_lieu_geo, pObjBillData.lieu_type, pObjBillData.no_bur_dentiste) +
                    //optional
                    //RamqGetRefreAutreProfXml(pObjBillData.typ_refre_autre_prof, pObjBillData.typ_id_prof, pObjBillData.id_prof) +
                    //RamqGetMntPrcuPatntXml(pObjBillData.mnt_prcu_patnt) +

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
                    '<cod_elm_mesur>' + arrElem[0] + '</cod_elm_mesur>' +
                    '<val_mes>'+ arrElem[1]+'</val_mes>'+
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
                    '<id_lieu_phys>' + pObjFormMoreData.id_lieu_phys + '</id_lieu_phys>';
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
            if (p_lieu_type === "Cabinet") {
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

// TODO: waiting for UI
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
                '<typ_id_prof>' + pObjFormMoreData.typ_id_prof + '</typ_id_prof>' +
                '<id_prof>' + pObjFormMoreData.id_prof + '</id_prof>' +
                '</prof_refre_connu>' +
            '</info_prof_refre>' +
            '</refre_autre_prof>';
    }
    return res;
}

function RamqGetMntPrcuPatntXml(p_mnt_prcu_patnt)
{
    var amount = 0
    if ($("#remb_dem_oui").is(':checked'))
    {
        amount = p_mnt_prcu_patnt;
    }
    var res = '';
    if (p_mnt_prcu_patnt)
        res = '<mnt_prcu_patnt>' + amount + '</mnt_prcu_patnt>';
    return res;
}

function RamqGetDatAutorProthAcryl(pObjFormMoreData)
{

    var res = '';
    if (pObjFormMoreData && pObjFormMoreData.dat_autor_proth_acryl)
        res = '<dat_autor_proth_acryl>' + pObjFormMoreData.dat_autor_proth_acryl + '</dat_autor_proth_acryl>';
    return res;
}

function RamqGetListe_surf_dent_trait(strSurf)
{
    var arrCharSurf = strSurf.split('');
    var xml = '';
    for (var i = 0; i < arrCharSurf.length; i++)
    {
        xml = xml + '<surf_dent>' +
                        '<cod_surf_dent>' + arrCharSurf[i] + '</cod_surf_dent>' +
                    '</surf_dent>';
    }

    return xml;
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

function getSoumissionDemandesModificationXML()
{
    var xml = '<?xml version=\\"1.0\\" encoding=\\"utf-8\\"?>' +
   '<dem_modif xmlns=\\"urn:ramq-gouv-qc-ca:RFP\\">' +
    '<no_dem_ext>' + $('#no_dem_ext').val() + '</no_dem_ext>' +
     '<logcl_fact>' +
       '<no_devpr_logcl>' + $('#no_devpr_logcl').val() + '</no_devpr_logcl>' +
       '<nom_devpr_logcl>' + $('#nom_devpr_logcl').val() + '</nom_devpr_logcl>' +
       '<nom_logcl_fact>' + $('#nom_logcl_fact').val() + '</nom_logcl_fact>' +
          '<no_versi_logcl_fact>' + $('#no_versi_logcl_fact').val() + '</no_versi_logcl_fact>' +
             '<no_versi_xml_dem>' + $('#no_versi_xml_dem').val() + '</no_versi_xml_dem>' +
           '</logcl_fact>' +
           '<demdr>' +
             '<typ_id_intvn>' + $('#demdr_typ_id_intvn').val() + '</typ_id_intvn>' +
             '<id_intvn>' + $('#demdr_id_intvn').val() + '</id_intvn>' +
           '</demdr>' +
           '<exped_difrn_demdr>' +
             '<typ_id_intvn>' + $('#exped_typ_id_intvn').val() + '</typ_id_intvn>' +
             '<id_intvn>' + $('#exped_id_intvn').val() + '</id_intvn>' +
           '</exped_difrn_demdr>' +
           '<id_fact_ramq>' +
             '<no_fact_ramq>' + $('#no_fact_ramq').val() + '</no_fact_ramq>' +
             '<jeton_comm>' + $('#jeton_comm').val() + '</jeton_comm>' +
           '</id_fact_ramq>' +
           '<fact_a_modif>' +
           '<fact_serv_denta_chirg_denti_1_1_0>' +
               '<no_fact_ext>' + $('#no_fact_ext').val() + '</no_fact_ext>' +
               '<prof>' +
                 '<typ_id_prof>' + $('#typ_id_prof').val() + '</typ_id_prof>' +
                 '<id_prof>' + $('#id_prof').val() + '</id_prof>' +
               '</prof>' +
               '<lieu_consi>' +
                 '<lieu_phys>' +
                   '<typ_id_lieu_phys>' + $('#typ_id_lieu_phys').val() + '</typ_id_lieu_phys>' +
                   '<id_lieu_phys>' + $('#id_lieu_phys').val() + '</id_lieu_phys>' +
                 '</lieu_phys>' +
               '</lieu_consi>' +
               '<liste_pers_objet_fact>' +
                 '<pers_patnt_avec_idt>' +
                   '<typ_situ_consi>' + $('#typ_situ_consi').val() + '</typ_situ_consi>' +
                   '<typ_id_pers>' + $('#typ_id_pers').val() + '</typ_id_pers>' +
                   '<id_pers>' + $('#id_pers').val() + '</id_pers>' +
                   '<info_mdcal_pers>' +
                     '<liste_diagn_mdcal>' +
                       '<diagn_mdcal>' +
                         '<no_seq_sys_cla>' + $('#no_seq_sys_cla').val() + '</no_seq_sys_cla>' +
                         '<cod_diagn_mdcal>' + $('#cod_diagn_mdcal').val() + '</cod_diagn_mdcal>' +
                       '</diagn_mdcal>' +
                     '</liste_diagn_mdcal>' +
                     '<evene_pers_objet_fact>' +
                       '<typ_evene_pers>' + $('#typ_evene_pers').val() + '</typ_evene_pers>' +
                       '<dat_evene_pers>' + $('#dat_evene_pers').val() + '</dat_evene_pers>' +
                     '</evene_pers_objet_fact>' +
                     '<per_sej_pers_lieu>' +
                       '<dat_entre_pers_lieu>' + $('#dat_entre_pers_lieu').val() + '</dat_entre_pers_lieu>' +
                       '<dat_sorti_pers_lieu>' + $('#dat_sorti_pers_lieu').val() + '</dat_sorti_pers_lieu>' +
                     '</per_sej_pers_lieu>' +
                   '</info_mdcal_pers>' +
                 '</pers_patnt_avec_idt>' +
               '</liste_pers_objet_fact>' +
               '<ind_fact_assoc_dr>true</ind_fact_assoc_dr>' +
               '<liste_ligne_fact_serv_denta_chirg_denti>' +
                 '<ligne_fact_serv_denta_chirg_denti>' +
                   '<no_ligne_fact>' + $('#no_ligne_fact').val() + '</no_ligne_fact>' +
                   '<typ_id_elm_fact>' + $('#typ_id_elm_fact').val() + '</typ_id_elm_fact>' +
                   '<id_elm_fact>' + $('#id_elm_fact').val() + '</id_elm_fact>' +
                   '<dat_serv_elm_fact>' + $('#dat_serv_elm_fact').val() + '</dat_serv_elm_fact>' +
                   '<cod_role>1</cod_role>' +
                   '<dhd_elm_fact>' + $('#dhd_elm_fact').val() + '</dhd_elm_fact>' +
                           '<dat_autor_proth_acryl>' + $('#dat_autor_proth_acryl').val() + '</dat_autor_proth_acryl>' +
                          '<info_serv_denta>' +
                             '<no_dent>1</no_dent>' +
                             '<liste_surf_dent_trait>' +
                               '<surf_dent>' +
                                 '<cod_surf_dent>' + $('#cod_surf_dent').val() + '</cod_surf_dent>' +
                               '</surf_dent>' +
                             '</liste_surf_dent_trait>' +
                             '<site_trait_denta>' +
                               '<typ_id_site_trait_denta>' + $('#typ_id_site_trait_denta').val() + '</typ_id_site_trait_denta>' +
                               '<id_site_trait_denta>' + $('#id_site_trait_denta_modified').val() + '</id_site_trait_denta>' + //Modified
                             '</site_trait_denta>' +
                          '</info_serv_denta>' +
                           '<refre_autre_prof>' +
                             '<typ_refre_autre_prof>' + $('#typ_refre_autre_prof').val() + '</typ_refre_autre_prof>' +
                             '<info_prof_refre>' +
                               '<prof_refre_connu>' +
                                 '<typ_id_prof>' + $('#typ_id_prof').val() + '</typ_id_prof>' +
                                 '<id_prof>' + $('#id_prof').val() + '</id_prof>' +
                               '</prof_refre_connu>' +
                             '</info_prof_refre>' +
                           '</refre_autre_prof>' +
                           '<mnt_prcu_patnt>' + $('#mnt_prcu_patnt').val() + '</mnt_prcu_patnt>' +
                         '</ligne_fact_serv_denta_chirg_denti>' +
                       '</liste_ligne_fact_serv_denta_chirg_denti>' +
                     '</fact_serv_denta_chirg_denti_1_1_0>' +
           '</fact_a_modif>' +
         '</dem_modif>';
    return xml;
}

function getSoumissionDemandesAnnulationXML()
{
    var xml = '<?xml version=\\"1.0\\" encoding=\\"utf-8\\"?>'+
                '<dem_annu xmlns=\\"urn:ramq-gouv-qc-ca:RFP\\" >'+
	                '<no_dem_ext>'+ $('#no_dem_ext').val() +'</no_dem_ext>'+
	                '<logcl_fact>'+
		                '<no_devpr_logcl>' + $('#no_devpr_logcl').val() + '</no_devpr_logcl>' +
		                '<nom_devpr_logcl>' + $('#nom_devpr_logcl').val() + '</nom_devpr_logcl>' +
		                '<nom_logcl_fact>' + $('#nom_logcl_fact').val() + '</nom_logcl_fact>' +
		                '<no_versi_logcl_fact>' + $('#no_versi_logcl_fact').val() + '</no_versi_logcl_fact>' +
		                '<no_versi_xml_dem>' + $('#no_versi_xml_dem').val() + '</no_versi_xml_dem>' +
	                '</logcl_fact>'+
	                '<demdr>'+
		                '<typ_id_intvn>' + $('#demdr_typ_id_intvn').val() + '</typ_id_intvn>' +
		                '<id_intvn>' + $('#demdr_id_intvn').val() + '</id_intvn>' +
	                '</demdr>'+
	                '<exped_difrn_demdr>'+
		                '<typ_id_intvn>' + $('#exped_typ_id_intvn').val() + '</typ_id_intvn>' +
		                '<id_intvn>' + $('#exped_id_intvn').val() + '</id_intvn>' +
	                '</exped_difrn_demdr>'+
	                '<liste_fact_a_annu>'+
		                '<id_fact_ramq>'+
			                '<no_fact_ramq>' + $('#no_fact_ramq').val() + '</no_fact_ramq>' +
			                '<jeton_comm>' + $('#jeton_comm').val() + '</jeton_comm>' +
		                '</id_fact_ramq>'+
	                '</liste_fact_a_annu>'+
                '</dem_annu>';
    return xml;
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
        if (!GlobalArrListeMsgExplRecev)
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
                LigneFactRecev.MntPrel = arrListeLigneFactRecev[l].children[2].innerHTML;
                LigneFactRecev.FormuExpl = arrListeLigneFactRecev[l].children[3].innerHTML;
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
    if (response.GlobalStaRecev == "2") {
        var GlobalArrListeMsgExplRecev = (xmlDoc.getElementsByTagName('liste_msg_expl_recev')[0] != null) ? xmlDoc.getElementsByTagName('liste_msg_expl_recev')[0].children : null;
        if (GlobalArrListeMsgExplRecev) {
            for (var i = 0; i < GlobalArrListeMsgExplRecev.length; i++) {
                var msgExplRecev = {};
                msgExplRecev.code = GlobalArrListeMsgExplRecev[i].children[0].innerHTML;
                msgExplRecev.text = GlobalArrListeMsgExplRecev[i].children[1].innerHTML;
                response.GlobalArrListeMsgExplRecev.push(msgExplRecev);
            }
        }
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
    if (_response.GlobalStaRecev == '1')
        alert("The Bill updated successfully.");//TODO: change message
    else if (_response.GlobalStaRecev == '2')
        alert("Modification Error"); //TODO: Add details.

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
                errormsg += _response.GlobalArrListeMsgExplRecev[i].text + '/n';
            }
        }

        if (_response.GlobalArrListeMsgExplRecev2) {
            for (var i = 0; i < _response.GlobalArrListeMsgExplRecev2.length; i++) {
                errormsg += _response.GlobalArrListeMsgExplRecev2[i].text + '/n';
            }
        }
        alert(errormsg); //TODO: test
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
    var objBillData = RamqGetBillData();
    var objAdditionalData = RamqGetAdditionalData(); //Data from Payment form "Renseignements complementaires Regie"

    var arrCommonData = [objConstAppData, objVisionRData, objAdditionalData];
    
    var arrData = [];
    arrData[0] = arrCommonData;
    arrData[1] = arrGrilleDeFacturation;
    arrData[2] = arrGrilleDeFacturation_forms;


    //return JSON.stringify(arrData);
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
    arrData[1] = globArrGrilleDeFacturation_update;
    arrData[2] = globArrGrilleDeFacturation_forms_update;
    */
    RamqBillUpdateBillInfo();
    var arrData = [];
    arrData[0] = globRamqBillInfo.info[0];
    arrData[1] = globArrGrilleDeFacturation_update;
    arrData[2] = globArrGrilleDeFacturation_forms_update;

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
    RamqBillUpdateBillInfo();
    var arrData = [];
    arrData[0] = globRamqBillInfo.info[0];
    //arrData[1] = globArrGrilleDeFacturation_update;
    //arrData[2] = globArrGrilleDeFacturation_forms_update;

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
    //TODO: Change to real data.
    var res = {};

    res.NoDevprLogcl = '18011';//?
    res.NomDevprLogcl = 'Développeur';//?
    res.NomLogclFact = 'Mon logiciel';//?
    res.NoVersiLogclFact = '1.0.0';//?
    res.NoVersiXmlDem = 'ACTE';//?
    return res;
}

function RamqGetVisionRData()
{
    //TODO: call service to get this parameters

    var res = {};
    res.DemdrTypIdIntvn = '1';//const
    res.DemdrIdIntvn = '299801';//? looks like Idprof
    res.ExpedTypIdIntvn = '3';//const
    res.ExpedIdIntvn = '18011';//?
    res.TypModaPaimt = '1';//1 : Compte personnel du professionnel 2 : Compte administratif
    res.TypIdProf = '1';//const 1 : Numéro dispensateur RAMQ
    res.IdProf = '299801';// 
    res.TypIdLieuPhys = '1';//1 : Lieu physique, reconnu et codifié à la Régie (établissement SSS, Cabinet, etc.)
    res.IdLieuPhys = '99999';//?
    res.TypSituConsi = '1';//Domaine de valeurs 1 : Situation normale 10 : Délai de carence, services nécessaires aux victimes de violence conjugale ou familiale ou d'une agression 11 : Délai de carence, services liés à la grossesse, à l\'accouchement ou à l'interruption de grossesse 12 : Délai de carence, services nécessaires aux personnes aux prises avec problèmes de santé de nature infectieuse ayant une incidence sur la santé publique
    res.TypIdPers = '1';//1 : NAM RAMQ
    res.IdPers = 'DISL14082210';//NAM
    res.NamExpDate = '2018-01-01';
    res.IndFactAssosDr = 'true';//? Indique si la facture est associée à une demande de remboursement d'un bénéficiare.
    res.InsTypeList = ['ACE', 'AGA'];
    res.TypProf = 'Dentiste'; //TODO: For test only Dentiste , Chirurgiens , Denturologiste

    //Patient without NAM
    res.NomPers='Smith';
    res.PrePers = 'Alex';
    res.DatNaissPers ='2001-01-01';
    res.CodSexPers = 1;            
    res.NoOrdreNaissPers =1;      //1 pour le premier bébé, 2 pour le deuxième bébé.       
    res.Nas ='123456789123'; 
    res.AdrPersPatnt='333 Place de la Belle-rive, Laval, QC, H7X3R5';
    res.RepdnIdPers = 'DISL14082217';

    return res;
}

function RamqGetBillData()
{
    /*
    combine data from two arrays arrGrilleDeFacturation and arrGrilleDeFacturation_forms
    */
    var arrRes = [];

    for (var i = 0; i < arrGrilleDeFacturation.length; i++)
    {
        var objRes = {};
        objRes.Code = arrGrilleDeFacturation[i].Code;
        objRes.Dent = arrGrilleDeFacturation[i].Dent;
        objRes.Description = arrGrilleDeFacturation[i].Description;
        objRes.Frais = arrGrilleDeFacturation[i].Frais;
        objRes.Honoraires = arrGrilleDeFacturation[i].Honoraires;
        objRes.Prod = arrGrilleDeFacturation[i].Prod;
        objRes.Surface = arrGrilleDeFacturation[i].Surface;
        objRes.Total = arrGrilleDeFacturation[i].Total;
        objRes.Type = arrGrilleDeFacturation[i].Type;

        var arrMoreInfo = RamqGetMoreInfo(arrGrilleDeFacturation[i].row_id)
        if (arrMoreInfo)
        {
            if (dent_Type == 'Dentiste') {
                //objRes.no_autorisation_dentiste = RamqGetValueFromArrByName('no_autorisation_dentiste', arrMoreInfo);//TODO: this value isn't used
                objRes.dat_autor_proth_acryl = RamqGetValueFromArrByName('date_autorisation_dentiste', arrMoreInfo);

                objRes.typ_id_rais_trait_denta = RamqGetValueFromArrByName('type_dentiste', arrMoreInfo);
                objRes.id_rais_trait_denta = RamqGetValueFromArrByName('raison_dentiste', arrMoreInfo);

                objRes.typ_id_site_trait_denta = RamqGetValueFromArrByName('typeS_dentiste', arrMoreInfo);
                objRes.id_site_trait_denta = RamqGetValueFromArrByName('site_dentiste', arrMoreInfo);

                objRes.liste_med_consm = RamqGetArrayValueFromArrByName('medi_com_list', arrMoreInfo);

                objRes.liste_elm_mesur = RamqGetArrayValueFromArrByName('elem_meas_list', arrMoreInfo);

                objRes.liste_elm_contx = RamqGetArrayValueFromArrByName('element_contexte_dentiste', arrMoreInfo);

                //TODO: is typ_refre_lieu is the same situation_lieu_dentiste
                objRes.typ_refre_lieu = RamqGetValueFromArrByName('situation_lieu_dentiste', arrMoreInfo); //Permet d'identifier le type de lieu en référence. Domaine de valeurs 10 : Établissement pris en charge lors d'une garde multi-établissements 14 : Lieu de départ pour un déplacement

                objRes.isLieuCodifieALaRegie = (RamqGetValueFromArrByName('lieu_dentiste', arrMoreInfo) == null) ? null : (RamqGetValueFromArrByName('lieu_dentiste', arrMoreInfo) == 'Lieu codifié á la Régie') ? true : false; //null if not both radio button not selected, true if Lie Codifie a la Regie selected otherwise false.

                objRes.id_lieu_phys = RamqGetValueFromArrByName('numero_lieu', arrMoreInfo);
                objRes.codePostal = RamqGetValueFromArrByName('postal_dentiste', arrMoreInfo);

                objRes.code_localite_dentiste = RamqGetValueFromArrByName('code_localite_dentiste', arrMoreInfo);
                objRes.no_bur = RamqGetValueFromArrByName('no_bur_dentiste', arrMoreInfo);
                objRes.lieu_type = RamqGetValueFromArrByName('lieu_type', arrMoreInfo);

                //Referant
                objRes.typ_refre_autre_prof = RamqGetValueFromArrByName('type_profession_dentiste', arrMoreInfo); //Type de profession
                objRes.typ_id_prof = '1' //1 : Numéro dispensateur RAMQ
                objRes.id_prof = RamqGetValueFromArrByName('no_referant_dentiste', arrMoreInfo);//No du Referant

            }
            else if (dent_Type == 'Chirurgiens') {//TODO: 

            }
            else if (dent_Type == 'Denturologiste') {//TODO: 
                objRes.dat_autor_proth_acryl = RamqGetValueFromArrByName('autrstn_dentur', arrMoreInfo);
                objRes.liste_elm_contx = RamqGetArrayValueFromArrByName('element_context_dentur', arrMoreInfo);
            }
        }
        arrRes.push(objRes);
    }
    return arrRes;
}

function RamqGetAdditionalData()//Data from Payment form "Renseignements complementaires Regie"
{
    var res = {};
    if ($('#even_carie').is(':checked'))
        res.TypEvenePers = 0; //TODO: add real code.
    else if ($('#even_etat').is(':checked'))
        res.TypEvenePers = 0; //TODO: add real code.
    else if ($('#even_autre_rad').is(':checked'))
        res.TypEvenePers = $('#even_autre_cont').val();

    res.RembDemParPatient = $('#remb_dem_oui').is(':checked');

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
function GetObjFormMoreData(pRowId, pArrFormMoreData)
{
    if (pRowId)
    {
        for (var i = 0; i < pArrFormMoreData.length; i++) {
            if (pArrFormMoreData[i][0].value == pRowId) {
                return pArrFormMoreData[i];
                break;
            }
        }
    }
    return null;
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

function RamqGetBillNumberFromServer()
{
    var billNumber = new Date().getTime();
    $.post("allScriptsv1.py", {tx: "getNoFacture", clinicId: globClinicId}, 
    function(result){
        if(result.outcome == 'error')
            alert(result.message);
        else
            billNumber = result.nofact;
    });
    return billNumber;
}

    // for test only
    function getarrGrilleDeFacturation() {
        var arr = [];
        var line = {};
        //1
        line.Type = 'AMQ'; //BES
        line.Dent = '14';
        line.Surface = 'M';
        line.Code = '21211';
        line.Description = '';
        line.FraisLab = '';
        line.Honoraires = '';
        line.Total = '';
        line.Prod = '';
        arr.push(line);

        //2
        var line = {};
        line.Type = 'AMQ'; //BES
        line.Dent = '14';
        line.Surface = '';
        line.Code = '21211';//21999
        line.Description = '';
        line.FraisLab = '';
        line.Honoraires = '';
        line.Total = '';
        line.Prod = '';
        arr.push(line);

        //3
        var line = {};
        line.Type = 'AMQ'; //BES
        line.Dent = '15';
        line.Surface = 'M';
        line.Code = '21211';
        line.Description = '';
        line.FraisLab = '';
        line.Honoraires = '';
        line.Total = '';
        line.Prod = '';
        arr.push(line);

        ////4
        //var line = {};
        //line.Type = 'AMQ'; //BES
        //line.Dent = '15';
        //line.Surface = '';
        //line.Code = '21999';
        //line.Description = '';
        //line.FraisLab = '';
        //line.Honoraires = '';
        //line.Total = '';
        //line.Prod = '';
        //arr.push(line);

        ////5
        //var line = {};
        //line.Type = 'AMQ'; //BES
        //line.Dent = '16';
        //line.Surface = 'O';
        //line.Code = '21221';
        //line.Description = '';
        //line.FraisLab = '';
        //line.Honoraires = '';
        //line.Total = '';
        //line.Prod = '';
        //arr.push(line);

        ////6
        //var line = {};
        //line.Type = 'AMQ'; //BES
        //line.Dent = '16';
        //line.Surface = '';
        //line.Code = '21999';
        //line.Description = '';
        //line.FraisLab = '';
        //line.Honoraires = '';
        //line.Total = '';
        //line.Prod = '';
        //arr.push(line);

        ////7
        //var line = {};
        //line.Type = 'AMQ'; //BES
        //line.Dent = '17';
        //line.Surface = 'O';
        //line.Code = '21221';
        //line.Description = '';
        //line.FraisLab = '';
        //line.Honoraires = '';
        //line.Total = '';
        //line.Prod = '';
        //arr.push(line);

        ////8
        //var line = {};
        //line.Type = 'AMQ'; //BES
        //line.Dent = '17';
        //line.Surface = '';
        //line.Code = '21999';
        //line.Description = '';
        //line.FraisLab = '';
        //line.Honoraires = '';
        //line.Total = '';
        //line.Prod = '';
        //arr.push(line);

        ////9
        //var line = {};
        //line.Type = 'AMQ'; //BES
        //line.Dent = '24';
        //line.Surface = 'O';
        //line.Code = '21211';
        //line.Description = '';
        //line.FraisLab = '';
        //line.Honoraires = '';
        //line.Total = '';
        //line.Prod = '';
        //arr.push(line);

        ////10
        //var line = {};
        //line.Type = 'AMQ'; //BES
        //line.Dent = '24';
        //line.Surface = '';
        //line.Code = '21999';
        //line.Description = '';
        //line.FraisLab = '';
        //line.Honoraires = '';
        //line.Total = '';
        //line.Prod = '';
        //arr.push(line);

        ////11
        //var line = {};
        //line.Type = 'AMQ'; //BES
        //line.Dent = '25';
        //line.Surface = 'O';
        //line.Code = '21211';
        //line.Description = '';
        //line.FraisLab = '';
        //line.Honoraires = '';
        //line.Total = '';
        //line.Prod = '';
        //arr.push(line);

        ////12
        //var line = {};
        //line.Type = 'AMQ'; //BES
        //line.Dent = '25';
        //line.Surface = '';
        //line.Code = '21999';
        //line.Description = '';
        //line.FraisLab = '';
        //line.Honoraires = '';
        //line.Total = '';
        //line.Prod = '';
        //arr.push(line);

        ////13
        //var line = {};
        //line.Type = 'AMQ'; //BES
        //line.Dent = '26';
        //line.Surface = 'O';
        //line.Code = '21221';
        //line.Description = '';
        //line.FraisLab = '';
        //line.Honoraires = '';
        //line.Total = '';
        //line.Prod = '';
        //arr.push(line);

        ////14
        //var line = {};
        //line.Type = 'AMQ'; //BES
        //line.Dent = '26';
        //line.Surface = '';
        //line.Code = '21999';
        //line.Description = '';
        //line.FraisLab = '';
        //line.Honoraires = '';
        //line.Total = '';
        //line.Prod = '';
        //arr.push(line);

        ////15
        //var line = {};
        //line.Type = 'AMQ'; //BES
        //line.Dent = '27';
        //line.Surface = 'O';
        //line.Code = '21221';
        //line.Description = '';
        //line.FraisLab = '';
        //line.Honoraires = '';
        //line.Total = '';
        //line.Prod = '';
        //arr.push(line);

        ////16
        //var line = {};
        //line.Type = 'AMQ'; //BES
        //line.Dent = '27';
        //line.Surface = '';
        //line.Code = '21999';
        //line.Description = '';
        //line.FraisLab = '';
        //line.Honoraires = '';
        //line.Total = '';
        //line.Prod = '';
        //arr.push(line);

        ////17
        //var line = {};
        //line.Type = 'AMQ'; //BES
        //line.Dent = '34';
        //line.Surface = 'O';
        //line.Code = '21211';
        //line.Description = '';
        //line.FraisLab = '';
        //line.Honoraires = '';
        //line.Total = '';
        //line.Prod = '';
        //arr.push(line);

        ////18
        //var line = {};
        //line.Type = 'AMQ'; //BES
        //line.Dent = '34';
        //line.Surface = '';
        //line.Code = '21999';
        //line.Description = '';
        //line.FraisLab = '';
        //line.Honoraires = '';
        //line.Total = '';
        //line.Prod = '';
        //arr.push(line);

        ////19
        //var line = {};
        //line.Type = 'AMQ'; //BES
        //line.Dent = '35';
        //line.Surface = 'O';
        //line.Code = '21211';
        //line.Description = '';
        //line.FraisLab = '';
        //line.Honoraires = '';
        //line.Total = '';
        //line.Prod = '';
        //arr.push(line);

        ////20
        //var line = {};
        //line.Type = 'AMQ'; //BES
        //line.Dent = '35';
        //line.Surface = '';
        //line.Code = '21999';
        //line.Description = '';
        //line.FraisLab = '';
        //line.Honoraires = '';
        //line.Total = '';
        //line.Prod = '';
        //arr.push(line);

        ////21
        //var line = {};
        //line.Type = 'AMQ'; //BES
        //line.Dent = '';
        //line.Surface = '';
        //line.Code = '94541';
        //line.Description = '';
        //line.FraisLab = '';
        //line.Honoraires = '';
        //line.Total = '';
        //line.Prod = '';
        //arr.push(line);

        return arr;
    }

    /*
    function getSoumissionDemandesPaimentXML2() {
        //For test only:
        var d = new Date();
        var n = d.getTime();
        var xml = '<?xml version=\\"1.0\\" encoding=\\"utf-8\\"?>' +
        '<dem_paimt xmlns=\\"urn:ramq-gouv-qc-ca:RFP\\">' +
        //'<no_dem_ext>' + $('#no_dem_ext').val() + '</no_dem_ext>' +
        '<no_dem_ext>' + n + '</no_dem_ext>' +// for test only
        '<logcl_fact>' +
            '<no_devpr_logcl>' + $('#no_devpr_logcl').val() + '</no_devpr_logcl>' +
            '<nom_devpr_logcl>' + $('#nom_devpr_logcl').val() + '</nom_devpr_logcl>' +
            '<nom_logcl_fact>' + $('#nom_logcl_fact').val() + '</nom_logcl_fact>' +
            '<no_versi_logcl_fact>' + $('#no_versi_logcl_fact').val() + '</no_versi_logcl_fact>' +
            '<no_versi_xml_dem>' + $('#no_versi_xml_dem').val() + '</no_versi_xml_dem>' +
        '</logcl_fact>' +
        '<demdr>' +
            '<typ_id_intvn>' + $('#demdr_typ_id_intvn').val() + '</typ_id_intvn>' +
            '<id_intvn>' + $('#demdr_id_intvn').val() + '</id_intvn>' +
        '</demdr>' +
        '<exped_difrn_demdr>' +
            '<typ_id_intvn>' + $('#exped_typ_id_intvn').val() + '</typ_id_intvn>' +
            '<id_intvn>' + $('#exped_id_intvn').val() + '</id_intvn>' +
        '</exped_difrn_demdr>' +
        '<moda_paimt>' +
            '<typ_moda_paimt>' + $('#typ_moda_paimt').val() + '</typ_moda_paimt>' +
        '</moda_paimt>' +
        '<liste_fact>' +
            '<fact_serv_denta_chirg_denti_1_1_0>' +
                '<no_fact_ext>' + $('#no_fact_ext').val() + '</no_fact_ext>' +
                '<prof>' +
                    '<typ_id_prof>' + $('#typ_id_prof').val() + '</typ_id_prof>' +
                    '<id_prof>' + $('#id_prof').val() + '</id_prof>' +
                '</prof>' +
                '<lieu_consi>' +
                    '<lieu_phys>' +
                        '<typ_id_lieu_phys>' + $('#typ_id_lieu_phys').val() + '</typ_id_lieu_phys>' +
                        '<id_lieu_phys>' + $('#id_lieu_phys').val() + '</id_lieu_phys>' +
                    '</lieu_phys>' +
                '</lieu_consi>' +
                '<liste_pers_objet_fact>' +
                    '<pers_patnt_avec_idt>' +
                        '<typ_situ_consi>' + $('#typ_situ_consi').val() + '</typ_situ_consi>' +
                        '<typ_id_pers>' + $('#typ_id_pers').val() + '</typ_id_pers>' +
                        '<id_pers>' + $('#id_pers').val() + '</id_pers>' +
                    '</pers_patnt_avec_idt>' +
                '</liste_pers_objet_fact>' +
                '<ind_fact_assoc_dr>true</ind_fact_assoc_dr>' +
                '<liste_ligne_fact_serv_denta_chirg_denti>' +
                    '<ligne_fact_serv_denta_chirg_denti>' +
                        '<no_ligne_fact>' + $('#no_ligne_fact').val() + '</no_ligne_fact>' +
                        '<typ_id_elm_fact>' + $('#typ_id_elm_fact').val() + '</typ_id_elm_fact>' + //1 : Code facturation élément assuré
                        '<id_elm_fact>' + $('#id_elm_fact').val() + '</id_elm_fact>' +
                        '<dat_serv_elm_fact>' + $('#dat_serv_elm_fact').val() + '</dat_serv_elm_fact>' +
                        '<cod_role>1</cod_role>' + //1 : Responsable 4 : Assistant
                        //'<dhd_elm_fact>' + $('#dhd_elm_fact').val() + '</dhd_elm_fact>' +
                        //'<dat_autor_proth_acryl>' + $('#dat_autor_proth_acryl').val() + '</dat_autor_proth_acryl>' +
                        '<info_serv_denta>' +
                            '<no_dent>1</no_dent>' +
                            '<liste_surf_dent_trait>' +
                                '<surf_dent>' +
                                    '<cod_surf_dent>' + $('#cod_surf_dent').val() + '</cod_surf_dent>' +
                                '</surf_dent>' +
                            '</liste_surf_dent_trait>' +
                            '<site_trait_denta>' +
                                '<typ_id_site_trait_denta>' + $('#typ_id_site_trait_denta').val() + '</typ_id_site_trait_denta>' +
                                '<id_site_trait_denta>' + $('#id_site_trait_denta').val() + '</id_site_trait_denta>' +
                            '</site_trait_denta>' +
                        '</info_serv_denta>' +
                        //'<refre_autre_prof>' +
                        //    '<typ_refre_autre_prof>' + $('#typ_refre_autre_prof').val() + '</typ_refre_autre_prof>' +
                        //    '<info_prof_refre>' +
                        //        '<prof_refre_connu>' +
                        //            '<typ_id_prof>' + $('#typ_id_prof').val() + '</typ_id_prof>' +
                        //            '<id_prof>' + $('#id_prof').val() + '</id_prof>' +
                        //        '</prof_refre_connu>' +
                        //    '</info_prof_refre>' +
                        //'</refre_autre_prof>' +
                        '<mnt_prcu_patnt>' + $('#mnt_prcu_patnt').val() + '</mnt_prcu_patnt>' +
                    '</ligne_fact_serv_denta_chirg_denti>' +
                '</liste_ligne_fact_serv_denta_chirg_denti>' +
            '</fact_serv_denta_chirg_denti_1_1_0>' +
        '</liste_fact>' +
    '</dem_paimt>';
        return xml;
    
    }
    */

//function RamqSoumissionDemandesPaiementGetDataForXml()
//{
//    /*
//     data source to create an xml :
//     1.Constant data related to application and developer. objConstAppData.
//     2.Data from visioneR objVisionRData.
//     4.Data from UI. objBillData.
//    */
//    /*returns an array of objects:
//    arrData[0] = objConstAppData;
//    arrData[1] = objVisionRData;
//    arrData[2] = objBillData;
//    */
//    var objConstAppData = RamqGetConstAppData();
//    var objVisionRData = RamqGetVisionRData();
//    var objBillData = RamqGetBillData();
//    var objAdditionalData = RamqGetAdditionalData(); //Data from Payment form "Renseignements complementaires Regie"

//    var arrData = [];
//    arrData[0] = objConstAppData;
//    arrData[1] = objVisionRData;
//    arrData[2] = objBillData;
//    arrData[3] = objAdditionalData;
//    return arrData;
//}