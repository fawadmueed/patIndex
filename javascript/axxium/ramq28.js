

//var arrGrilleDeFacturation = getarrGrilleDeFacturation(); //for test only. in production arrGrilleDeFacturation should be global;
//TODO:rename SoumissionDemandesPaiement to RamqSoumissionDemandesPaiement;
function SoumissionDemandesPaiement()
{
    var objSoumissionDemandesPaiementData = RamqSoumissionDemandesPaiementGetData();
    if (objSoumissionDemandesPaiementData != null)
    {
        var operationName = "Paiement";
        var jsonData = RamqGetData(operationName, objSoumissionDemandesPaiementData);
        var methodName = "api/RamqWebApi/PostPaymentRequest";
        $.ajax({
            type: "POST",
            url: globRamqApiPath + methodName,
            ProcessData: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,

            success: function (data, status, jqXHR) {
                if (data.d != null && data.d.substring(0, 5) == 'Error') {
                    //alert(data.d);
                    displayRamqAnswer("RAMQ", data.d);
                }
                else if (data.d != null && data.d.substring(0, 5) != 'Error') {
                    var objResponse = parseRAMQResponsePaiment(data.d);
                    displayResponsePaiment(objResponse);
                }
                else {
                    displayRamqAnswer("RAMQ", "SoumissionDemandesPaiement Error");
                }
            },
            error: function (xhr) {
                if (xhr.responceJSON != null)
                    alert(xhr.responceJSON.Message);
            }
        });
    }
}

function RamqSoumissionDemandesModification()
{
    var jsonData = getData("Modification");

    $.ajax({
        type: "POST",
        url: globRamqApiPath,
        ProcessData: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,

        success: function (data, status, jqXHR) {
            if (data.d != null) {
                var objResponse = parseRAMQResponseModification(data.d);
                displayResponseModification(objResponse);
            }
            else {
                alert('SoumissionDemandesModification error');
            }
            
        },
        error: function (xhr) {
            if (xhr.responceJSON != null)
                alert(xhr.responceJSON.Message);
        }
    });
}

function RamqSoumissionDemandesAnnulation() {
    var objSoumissionDemandesAnnulationData = SoumissionDemandesAnnulationGetData();
    if (objSoumissionDemandesAnnulationData != null)
    {
        var jsonData = getData("Annulation");

        $.ajax({
            type: "POST",
            url: globRamqApiPath,
            ProcessData: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,

            success: function (data, status, jqXHR) {
                if (data.d != null) {
                    var objResponse = parseRAMQResponseAnnulation(data.d);
                    displayResponseAnnulation(objResponse);
                }
                else {
                    alert('SoumissionDemandesAnnulation error');
                }
            },
            error: function (xhr) {
                if (xhr.responceJSON != null)
                    alert(xhr.responceJSON.Message);
                else
                    alert(xhr);
            }
        });
    }
}

function RamqGetData(operationName, _objData)
{
    var xmlAEnvoyer, data;

    if (operationName == 'Paiement')
    {
        xmlAEnvoyer = RamqGetSoumissionDemandesPaimentXML(_objData);
    }
    else if (operationName == 'Modification')
    {
        xmlAEnvoyer = RamqGetSoumissionDemandesModificationXML();
    }
    else if (operationName == 'Annulation')
    {
        xmlAEnvoyer = RamqGetSoumissionDemandesAnnulationXML();
    }
    
    data = '{"idUtilisateur":"' + globRamqObjCredentials.MachineId + '","motDePasse":"' + globRamqObjCredentials.MachineIdPass + '","xmlAEnvoyer":"' + xmlAEnvoyer + '"}';
    return data;
}


// Create common part for all specialists
function RamqGetSoumissionDemandesPaimentXML(_arrData) {
    ////For test only:
    //var d = new Date();
    //var n = d.getTime();
    var xml = '<?xml version=\\"1.0\\" encoding=\\"utf-8\\"?>' +
    '<dem_paimt xmlns=\\"urn:ramq-gouv-qc-ca:RFP\\">' +
    //'<no_dem_ext>' + $('#no_dem_ext').val() + '</no_dem_ext>' + //?
    '<no_dem_ext>' + RamqGenerateNoDemExt() + '</no_dem_ext>' +
    '<logcl_fact>' +
        '<no_devpr_logcl>' + _arrData[0].NoDevprLogcl + '</no_devpr_logcl>' + //?
        '<nom_devpr_logcl>' + _arrData[0].NomDevprLogcl + '</nom_devpr_logcl>' + //?
        '<nom_logcl_fact>' + _arrData[0].NomLogclFact + '</nom_logcl_fact>' + //?
        '<no_versi_logcl_fact>' + _arrData[0].NoVersiLogclFact + '</no_versi_logcl_fact>' + //?
        '<no_versi_xml_dem>' + _arrData[0].NoVersiXmlDem + '</no_versi_xml_dem>' + //?
    '</logcl_fact>' +
    '<demdr>' +
        '<typ_id_intvn>' + _arrData[1].DemdrTypIdIntvn + '</typ_id_intvn>' + //const
        '<id_intvn>' + _arrData[1].DemdrIdIntvn + '</id_intvn>' + //?
    '</demdr>' +
    '<exped_difrn_demdr>' +
        '<typ_id_intvn>' + _arrData[1].ExpedTypIdIntvn + '</typ_id_intvn>' + //const
        '<id_intvn>' + _arrData[1].ExpedIdIntvn + '</id_intvn>' + //?
    '</exped_difrn_demdr>' +
    '<moda_paimt>' +
        '<typ_moda_paimt>' + _arrData[1].TypModaPaimt + '</typ_moda_paimt>' + //1 : Compte personnel du professionnel 2 : Compte administratif
    '</moda_paimt>' +
    '<liste_fact>' +
        RamqGetListe_factXML(_arrData, "Dentiste") +
    '</liste_fact>' +
'</dem_paimt>';
    return xml;

}

function RamqGetListe_factXML(_arrData, dent_Type)
{
    switch(dent_Type) {
        case "Dentiste":
            {
                RamqGetListFactChirgDenti(_arrData);
            }
            break;
        case "Chirurgiens":
            {
                RamqGetListFactChirgBucc(_arrData);
            }
            break;
        case "Denturologiste":
            {
                RamqGetListFactDentu(_arrData);
            }
            break;
        default:
            {
                alert("Ramq: dent_Type is not correct!")
            }
    }
    

    return xml;
}

// Create part of xml for Chirg Denti
function RamqGetListFactChirgDenti(_arrData)
{
    var objDataFromVisionR = _arrData[1];
    var xml = '';
    xml += '<fact_serv_denta_chirg_denti_1_1_0>' +
                    '<no_fact_ext>' + RamqGetFactNumber() + '</no_fact_ext>' +
                    '<prof>' +
                        '<typ_id_prof>' + objDataFromVisionR.TypIdProf + '</typ_id_prof>' + //const 1 : Numéro dispensateur RAMQ
                        '<id_prof>' + objDataFromVisionR.IdProf + '</id_prof>' + //?
                    '</prof>' +
                    '<lieu_consi>' +
                        '<lieu_phys>' +
                            '<typ_id_lieu_phys>' + objDataFromVisionR.TypIdLieuPhys + '</typ_id_lieu_phys>' + //1 : Lieu physique, reconnu et codifié à la Régie (établissement SSS, Cabinet, etc.)
                            '<id_lieu_phys>' + objDataFromVisionR.IdLieuPhys + '</id_lieu_phys>' + //?
                        '</lieu_phys>' +
                    '</lieu_consi>' +
                    '<liste_pers_objet_fact>' +
                        '<pers_patnt_avec_idt>' +
                            '<typ_situ_consi>' + objDataFromVisionR.TypSituConsi + '</typ_situ_consi>' + //Domaine de valeurs 1 : Situation normale 10 : Délai de carence, services nécessaires aux victimes de violence conjugale ou familiale ou d'une agression 11 : Délai de carence, services liés à la grossesse, à l\'accouchement ou à l'interruption de grossesse 12 : Délai de carence, services nécessaires aux personnes aux prises avec problèmes de santé de nature infectieuse ayant une incidence sur la santé publique
                            '<typ_id_pers>' + objDataFromVisionR.TypIdPers + '</typ_id_pers>' + //1 : NAM RAMQ
                            '<id_pers>' + objDataFromVisionR.IdPers + '</id_pers>' + // NAM
                        '</pers_patnt_avec_idt>' + //TODO: implement case if user doesn't have NAM
                    '</liste_pers_objet_fact>' +
                    '<ind_fact_assoc_dr>' + objDataFromVisionR.IndFactAssosDr + '</ind_fact_assoc_dr>' + //? Indique si la facture est associée à une demande de remboursement d'un bénéficiare.
                    '<liste_ligne_fact_serv_denta_chirg_denti>' +
                        RamqGetListe_ligne_fact_serv_denta_chirg_denti(_arrData[2]) +
                    '</liste_ligne_fact_serv_denta_chirg_denti>' +
                '</fact_serv_denta_chirg_denti_1_1_0>';
}

function RamqGetListe_ligne_fact_serv_denta_chirg_denti(pArrBillData)
{
    var xml = '';
    var ligneNum = 1;

    for (var i = 0; i < pArrBillData.length; i++)
    {
        var pObjBillData = pArrBillData[i];
        if (pObjBillData.Type == 'AMQ' || pObjBillData.Type == 'BES')
        {
            xml = xml +
                '<ligne_fact_serv_denta_chirg_denti>' +
                    '<no_ligne_fact>' + ligneNum + '</no_ligne_fact>' +
                    '<typ_id_elm_fact>' + '1' + '</typ_id_elm_fact>' + //1 : Code facturation élément assuré
                    '<id_elm_fact>' + pObjBillData.Code + '</id_elm_fact>' + //Code de facturation
                    '<dat_serv_elm_fact>' + RamqGetCurrentDate() + '</dat_serv_elm_fact>' + //TODO:Is current date? format YYYY-mm-DD (2017-08-01)
                    '<cod_role>' + '1' + '</cod_role>' + //TODO: Where from? Constant? Data 1 : Responsable 4 : Assistant
                    '<info_serv_denta>' +
                        '<no_dent>' + RamqGetCurrentDate.Dent + '</no_dent>' +
                        '<liste_surf_dent_trait>' +
                            RamqGetListe_surf_dent_trait(RamqGetCurrentDate.Surface) +
                        '</liste_surf_dent_trait>' +
                        //optional
                        RamqGetRaisTraitDentaXml(pObjBillData.typ_id_rais_trait_denta, pObjBillData.id_rais_trait_denta) +
                        //optional
                        RamqGetSiteTraitDentaXml(pObjBillData.typ_id_site_trait_denta, pObjBillData.id_site_trait_denta) +
                        //optional
                        RamqGetInfoMedConsmXml(pObjBillData.typ_med_consm, pObjBillData.arr_med_consm) +
                    '</info_serv_denta>' +
                    //optional
                    RamqGetListeElmMesurXml(pObjBillData.arr_elm_mesur) +
                    //optional
                    RamqGetListElmContxXml(pObjBillData.arr_elm_contx) +
                    //optional
                    RamqGetListeLieuRefreXml(pObjBillData.identification_lieu_dentiste, pObjBillData.id_lieu_phys, pObjBillData.no_sect_activ, pObjBillData.id_lieu_geo, pObjBillData.lieu_type, pObjBillData.no_bur_dentiste) +
                    //optional
                    RamqGetRefreAutreProfXml(pObjBillData.typ_refre_autre_prof, pObjBillData.typ_id_prof, pObjBillData.id_prof) +
                  '<mnt_prcu_patnt>' + pObjBillData.mnt_prcu_patnt + '</mnt_prcu_patnt>';
                 '</ligne_fact_serv_denta_chirg_denti>';
            ligneNum++;
        }
    }
     return xml;
}

function RamqGetRaisTraitDentaXml(p_typ_id_rais_trait_denta, p_id_rais_trait_denta )
{
    var res = '';
    if(p_typ_id_rais_trait_denta &&  p_id_rais_trait_denta)
    {
        res =
            '<rais_trait_denta>' +
                '<typ_id_rais_trait_denta>' + p_typ_id_rais_trait_denta + '</typ_id_rais_trait_denta>' +
                '<id_rais_trait_denta>' + p_id_rais_trait_denta + '</id_rais_trait_denta>' +
            '</rais_trait_denta>';
    }
    return res;
}

function RamqGetSiteTraitDentaXml(p_typ_id_site_trait_denta , p_id_site_trait_denta)
{
    var res = '';
    if (p_typ_id_site_trait_denta && p_id_site_trait_denta)
    {
        res =
            '<site_trait_denta>'
                '<typ_id_site_trait_denta>' + p_typ_id_site_trait_denta + '</typ_id_site_trait_denta>' +
                '<id_site_trait_denta>' + p_id_site_trait_denta + '</id_site_trait_denta>' +
            '</site_trait_denta>';
    }
    return res;
}

function RamqGetInfoMedConsmXml(p_typ_med_consm, p_arr_med_consm)
{
    var res = '';
    if (p_typ_med_consm && p_arr_med_consm && p_arr_med_consm.length > 0)
    {
        res =
            '<info_med_consm>' +
                '<typ_med_consm>' + p_typ_med_consm + '</typ_med_consm>' + //TODO: is this constant?
                '<liste_med_consm>';
                                    

            ;
        for (var i = 0; i < p_arr_med_consm.length; i++)
        {
            res +=
                '<med_consm>' +
                    '<typ_id_med_consm>' + p_arr_med_consm[i].typ_id_med_consm + '</typ_id_med_consm>' +//TODO: is this constant?
                    '<id_med_consm>' + p_arr_med_consm[i].typ_id_med_consm + '</id_med_consm>' +
                '</med_consm>';
        }
        res +=
            '</liste_med_consm>' +
        '</info_med_consm>';
    }
    return res;
}

function RamqGetListeElmMesurXml(p_arr_elm_mesur)
{
    var res = '';
    if(p_arr_elm_mesur && p_arr_elm_mesur.length>0)
    {
        res +=
            '<liste_elm_mesur>';
        for (var i = 0; i < p_arr_elm_mesur.length; i++)
        {
            res = 
                '<elm_mesur>'+
                    '<cod_elm_mesur>'+p_arr_elm_mesur[i].cod_elm_mesur+'</cod_elm_mesur>'+
                    '<val_mes>'+ p_arr_elm_mesur[i].val_mes+'</val_mes>'+
                '</elm_mesur>';
        }
        res +=
            '</liste_elm_mesur>';
    }
    return res;
}

function RamqGetListElmContxXml(p_arr_elm_contx)
{
    var res = '';
    if (p_arr_elm_contx && p_arr_elm_contx.length > 0)
    {
        res += 
            '<liste_elm_contx>';
        for(var i = 0; i< p_arr_elm_contx.length; i++)
        {
            res += 
                '<elm_contx>'+
                    '<cod_elm_contx>' + p_arr_elm_contx[i].cod_elm_contx + '</cod_elm_contx>' +
                '</elm_contx>';
        }
        res +=
            '</liste_elm_contx>';
    }
    return res;
}

function RamqGetListeLieuRefreXml(p_identification_lieu_dentiste, p_id_lieu_phys, p_no_sect_activ, p_id_lieu_geo, p_lieu_type, p_no_bur_dentiste)
{
    var res = '';
    if (p_identification_lieu_dentiste)
    {
        res +=
        '<lieu_en_refre>' +
            '<typ_refre_lieu>' + '10' + '</typ_refre_lieu>' + //TODO: where  from get this data? 10 : Établissement pris en charge lors d'une garde multi-établissements 14 : Lieu de départ pour un déplacement
            '<liste_lieu_refre>';

        if (p_identification_lieu_dentiste == 'Lieu codifié á la Régie') {
            res +=
                '<lieu_refre_phys>' +
                    '<typ_id_lieu_phys>' + '1' + '</typ_id_lieu_phys>' + //TODO: is it constant?
                    '<id_lieu_phys>' + p_id_lieu_phys + '</id_lieu_phys>';
            if (p_no_sect_activ) {
                res += '<no_sect_activ>' + p_no_sect_activ + '</no_sect_activ>';
            }
            res +=
                '</lieu_refre_phys>';
        }
        else if (p_identification_lieu_dentiste == 'Lieu non codifié') //TODO: 
        {
            var lieuType;
            if (p_lieu_type === "Cabinet")
                lieuType = 'C';
            else if (p_lieu_type === "Domicile")
                lieuType = 'D';
            else if (p_lieu_type === "Autre")
                lieuType = 'A';

            res +=
                '<lieu_refre_geo>' +
                    '<typ_id_lieu_geo>' + '2' + '</typ_id_lieu_geo>' + //TODO: is it constant?
                    '<id_lieu_geo>' + p_id_lieu_geo + '</id_lieu_geo>' +
                    '<typ_lieu_geo>' + lieuType + '</typ_lieu_geo>';
            if (p_lieu_type === "Cabinet") {
                res += '<no_bur>' + p_no_bur_dentiste + '</no_bur>';
            }

            res +=
                '</lieu_refre_geo>' +
                '</liste_lieu_refre>';
        }
    }
     
    return res;
}

function RamqGetRefreAutreProfXml(p_typ_refre_autre_prof, p_typ_id_prof, p_id_prof)
{
    var res = '';
    if (p_typ_refre_autre_prof && p_typ_id_prof && p_id_prof)
    {
        res +=
            '<refre_autre_prof>' +
            '<typ_refre_autre_prof>' + p_typ_refre_autre_prof + '</typ_refre_autre_prof>' +
            '<info_prof_refre>' +
                '<prof_refre_connu>' +
                '<typ_id_prof>' + p_typ_id_prof + '</typ_id_prof>' +
                '<id_prof>' + p_id_prof + '</id_prof>' +
                '</prof_refre_connu>' +
            '</info_prof_refre>' +
            '</refre_autre_prof>';
    }
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
    var xmlDoc = parser.parseFromString(strXml, "text/xml");
    var response = {};

    //Global info
    response.GlobalNoDemExt = (xmlDoc.getElementsByTagName("no_dem_ext")[0]!=null)? xmlDoc.getElementsByTagName("no_dem_ext")[0].childNodes[0].nodeValue:null;
    response.GlobalStaRecev = (xmlDoc.getElementsByTagName("sta_recev")[0]!=null)? xmlDoc.getElementsByTagName("sta_recev")[0].childNodes[0].nodeValue:null;
    response.GlobalArrListeMsgExplRecev = [];
    if (response.GlobalStaRecev == "2")
    {
        var GlobalArrListeMsgExplRecev = xmlDoc.getElementsByTagName('liste_msg_expl_recev')[0].children;

        for (var i = 0; i < GlobalArrListeMsgExplRecev.length; i++)
        {
            var msgExplRecev = {};
            msgExplRecev.code = GlobalArrListeMsgExplRecev[i].children[0].innerHTML;
            msgExplRecev.text = GlobalArrListeMsgExplRecev[i].children[1].innerHTML;
            response.GlobalArrListeMsgExplRecev.push(msgExplRecev);
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
    return null;
}

function parseRAMQResponseAnnulation(strXml) {
    return null;
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
    //TODO:
}
    
function displayResponseAnnulation(_response)
{
    //TODO:
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

function SoumissionDemandesPaiementValidation()
{
    
}


function RamqSoumissionDemandesPaiementGetData()
{
    /*
     data source to create an xml :
     1.Constant data related to application and developer. objConstAppData.
     2.Data from visioneR objVisionRData.
     4.Data from UI. objBillData.
    */
    /*returns an array of objects:
    arrData[0] = objConstAppData;
    arrData[1] = objVisionRData;
    arrData[2] = objBillData;
    */
    var objConstAppData = RamqGetConstAppData();
    var objVisionRData = RamqGetVisionRData();
    var objBillData = RamqGetBillData();

    var arrData = [];
    arrData[0] = objConstAppData;
    arrData[1] = objVisionRData;
    arrData[2] = objBillData;

    return arrData;
}

function SDPValidation(_objSDP)
{
    //var strResult='';
    //if (_objSDP.NAM == '')
    //    strResult += 'NAM est requis!';

    //if (strResult != '')
    //{
    //    alert(strResult);
    //    return false;
    //}
    //else{
    //    return true;
    //}
    return true;
}
    
function SoumissionDemandesAnnulationGetData()
{
    
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
    res.IdProf = '299801';// $('#no_prof').val();
    res.TypIdLieuPhys = '1';//1 : Lieu physique, reconnu et codifié à la Régie (établissement SSS, Cabinet, etc.)
    res.IdLieuPhys = '99999';//?
    res.TypSituConsi = '1';//Domaine de valeurs 1 : Situation normale 10 : Délai de carence, services nécessaires aux victimes de violence conjugale ou familiale ou d'une agression 11 : Délai de carence, services liés à la grossesse, à l\'accouchement ou à l'interruption de grossesse 12 : Délai de carence, services nécessaires aux personnes aux prises avec problèmes de santé de nature infectieuse ayant une incidence sur la santé publique
    res.TypIdPers = '1';//1 : NAM RAMQ
    res.IdPers = 'DISL14082210';//NAM
    res.IndFactAssosDr = 'true';//? Indique si la facture est associée à une demande de remboursement d'un bénéficiare.

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
            objRes.no_autorisation_dentiste = RamqGetValueFromArrByName('no_autorisation_dentiste', arrMoreInfo);
            objRes.date_autorisation_dentiste = RamqGetValueFromArrByName('date_autorisation_dentiste', arrMoreInfo);

            

            //TODO: we need typ_id_rais_trait_denta and id_rais_trait_denta enstead of type_raison_dentiste
            //objRes.type_raison_dentiste = arrMoreInfo[3].value;
            objRes.typ_id_rais_trait_denta = RamqGetValueFromArrByName('typ_id_rais_trait_denta', arrMoreInfo);
            objRes.id_rais_trait_denta = RamqGetValueFromArrByName('id_rais_trait_denta', arrMoreInfo);

            //TODO: we need typ_id_site_trait_denta and id_site_trait_denta enstead of type_site_dentiste
            objRes.type_site_dentiste = RamqGetValueFromArrByName('type_site_dentiste', arrMoreInfo);
            objRes.typ_id_site_trait_denta = RamqGetValueFromArrByName('typ_id_site_trait_denta', arrMoreInfo);
            objRes.id_site_trait_denta = RamqGetValueFromArrByName('id_site_trait_denta', arrMoreInfo);

            //TODO: we need typ_med_consm, and an ARRAY of med_consm. Each element of array should have two param: typ_id_med_consm and id_med_consm
            //objRes.medicament_dentiste = arrMoreInfo[5].value;
            objRes.typ_med_consm = RamqGetValueFromArrByName('typ_med_consm', arrMoreInfo);
            objRes.arr_med_consm = RamqGetValueFromArrByName('arr_med_consm', arrMoreInfo);

            //TODO: we need an ARRAY arr_elm_contx instead of single value element_contexte_dentiste
            //objRes.element_contexte_dentiste = arrMoreInfo[6].value;
            objRes.arr_elm_contx = RamqGetValueFromArrByName('arr_elm_contx', arrMoreInfo);

            //TODO: we need an ARRAY arr_elm_mesur instead of single value mesurables_dentiste
            //objRes.mesurables_dentiste = arrMoreInfo[7].value;
            objRes.arr_elm_mesur = objRes.arr_elm_contx = RamqGetValueFromArrByName('arr_elm_mesur', arrMoreInfo);

            objRes.identification_lieu_dentiste = RamqGetValueFromArrByName('identification_lieu_dentiste', arrMoreInfo);

            //TODO: we need id_lieu_phys: 
            objRes.id_lieu_phys = RamqGetValueFromArrByName('id_lieu_phys', arrMoreInfo);

            //TODO: we need no_sect_activ: 
            objRes.no_sect_activ = RamqGetValueFromArrByName('no_sect_activ', arrMoreInfo);

            //TODO: we need id_lieu_geo
            objRes.id_lieu_geo = RamqGetValueFromArrByName('id_lieu_geo', arrMoreInfo);

            objRes.lieu_type = RamqGetValueFromArrByName('lieu_type', arrMoreInfo);
            objRes.no_bur_dentiste = RamqGetValueFromArrByName('no_bur_dentiste', arrMoreInfo);

            //refre_autre_prof
            //TODO: we need typ_refre_autre_prof
            objRes.typ_refre_autre_prof = RamqGetValueFromArrByName('typ_refre_autre_prof', arrMoreInfo);
            //TODO: we need typ_id_prof
            objRes.typ_refre_autre_prof = RamqGetValueFromArrByName('typ_id_prof', arrMoreInfo);
            //TODO: we need id_prof
            objRes.typ_refre_autre_prof = RamqGetValueFromArrByName('id_prof', arrMoreInfo);

            //TODO: we need mnt_prcu_patnt
            objRes.mnt_prcu_patnt = RamqGetValueFromArrByName('mnt_prcu_patnt', arrMoreInfo);


            objRes.situation_lieu_dentiste = RamqGetValueFromArrByName('situation_lieu_dentiste', arrMoreInfo);// TODO: where put this value?
            objRes.postal_dentiste = RamqGetValueFromArrByName('postal_dentiste', arrMoreInfo);// TODO: where put this value?
            objRes.code_localite_dentiste = RamqGetValueFromArrByName('code_localite_dentiste', arrMoreInfo);
            
            objRes.no_referant_dentiste = RamqGetValueFromArrByName('no_referant_dentiste', arrMoreInfo);
            objRes.nom_dentiste = RamqGetValueFromArrByName('nom_dentiste', arrMoreInfo);
            objRes.prenom_dentiste = RamqGetValueFromArrByName('prenom_dentiste', arrMoreInfo);
            objRes.type_profession_dentiste = RamqGetValueFromArrByName('type_profession_dentiste', arrMoreInfo);
        }
        arrRes.push(objRes);
    }
    return arrRes;
}

//Returns an element from arrMoreInfo by element name
function RamqGetValueFromArrByName(pElementName, pArrMoreInfo)
{
    for (var i = 0; i < pArrMoreInfo.length; i++)
    {
        if (pArrMoreInfo[i].name = pElementName)
        {
            return pArrMoreInfo[i].value;
            break;
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
    //TODO:Implement real algorithm
    return new Date().getTime();
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