
function SoumissionDemandesPaiement()
{
    var operationName = "Paiement";
    var jsonData = getData(operationName);
    
    $.ajax({
        type: "POST",
        url: 'http://localhost:80/ramqTest/001/',
        ProcessData: false,
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        data:jsonData,

        success: function (data, status, jqXHR) {
            var objResponse = parseRAMQResponsePaiment(data.d);
            displayResponsePaiment(objResponse);
        },
        error: function (xhr) {
            if (xhr.responceJSON != null)
                alert(xhr.responceJSON.Message);
        }
    });
}

function SoumissionDemandesModification()
{
    var jsonData = getData("Modification");

    $.ajax({
        type: "POST",
        url: 'http://localhost:8080/RamqTest',
        ProcessData: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,

        success: function (data, status, jqXHR) {
            var objResponse = parseRAMQResponseModification(data.d);
            displayResponseModification(objResponse);
        },
        error: function (xhr) {
            if (xhr.responceJSON != null)
                alert(xhr.responceJSON.Message);
        }
    });
}

function SoumissionDemandesAnnulation() {
    var jsonData = getData("Annulation");

    $.ajax({
        type: "POST",
        url: 'http://localhost:8080/RamqTest',
        ProcessData: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,

        success: function (data, status, jqXHR) {
            var objResponse = parseRAMQResponseAnnulation(data.d);
            alert(data.d);
            displayResponseAnnulation(objResponse);
        },
        error: function (xhr) {
            if (xhr.responceJSON != null)
                alert(xhr.responceJSON.Message);
            else
                alert(xhr);
        }
    });
}

function getData(operationName)
{
    var idUtilisateur, motDePasse, xmlAEnvoyer, data;
    var arrCredentials = getCredentials();
    idUtilisateur = arrCredentials[0];
    motDePasse = arrCredentials[1];

    if (operationName == 'Paiement')
    {
        xmlAEnvoyer = getSoumissionDemandesPaimentXML();
    }
    else if (operationName == 'Modification')
    {
        xmlAEnvoyer = getSoumissionDemandesModificationXML();
    }
    else if (operationName == 'Annulation')
    {
        xmlAEnvoyer = getSoumissionDemandesAnnulationXML();
    }
    
    data = '{"idUtilisateur":"' + idUtilisateur + '","motDePasse":"' + motDePasse + '","xmlAEnvoyer":"' + xmlAEnvoyer + '"}';
    return data;
}

function getCredentials()
{
    var arr = [];
    var jsonCredentials = '["AGR18011K","rT_Xw^9M"]';// TODO: getCredentials from DB
    try
    {
        arr = JSON.parse(jsonCredentials); 
    }
    catch(Exception){
        return null;
    }

    if(arr.length == 2)
        return arr;
    else 
        return null;
}

function getSoumissionDemandesPaimentXML()
{
    //For test only:
    var d = new Date();
    var n = d.getTime();
    var xml = '<?xml version=\\"1.0\\" encoding=\\"utf-8\\"?>' +
   '<dem_paimt xmlns=\\"urn:ramq-gouv-qc-ca:RFP\\">' +
    //'<no_dem_ext>' + $('#no_dem_ext').val() + '</no_dem_ext>' +
    '<no_dem_ext>' + n + '</no_dem_ext>' +
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
                               '<id_site_trait_denta>' + $('#id_site_trait_denta').val() + '</id_site_trait_denta>' +
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
                   '</liste_fact>' +
                 '</dem_paimt>';
    return xml;

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
    //var xmlDejaTraitee = '<?xml version="1.0" encoding="utf-8"?><dem_paimt_recev xmlns="urn:ramq-gouv-qc-ca:RFP"><no_dem_ext>T42376-ElmCtx</no_dem_ext><sta_recev>1</sta_recev><liste_msg_expl_recev><msg_expl_recev><cod_msg_expl_recev>9012</cod_msg_expl_recev><txt_msg_expl_recev>La demande ne sera pas traitée. Les numéros de demande et de facture fournis ont déjà été traités par la Régie, avec le résultat de recevabilité suivant.</txt_msg_expl_recev></msg_expl_recev></liste_msg_expl_recev><liste_fact_recev><fact_recev><no_fact_ext>!</no_fact_ext><id_fact_ramq_recev><no_fact_ramq>10006456940</no_fact_ramq><jeton_comm>87062125</jeton_comm></id_fact_ramq_recev><sta_recev>1</sta_recev><liste_ligne_fact_recev><ligne_fact_recev><no_ligne_fact>1</no_ligne_fact><sta_recev>1</sta_recev><mnt_prel>162.75</mnt_prel><formu_expl><![CDATA[Montant calculé : 162,75 $ Montant de base : 108,50 $    Taux selon l\'âge : 150 %]]></formu_expl></ligne_fact_recev></liste_ligne_fact_recev></fact_recev></liste_fact_recev></dem_paimt_recev>';
    //var xmlSuccess = '<?xml version="1.0" encoding="utf-8"?><dem_paimt_recev xmlns="urn:ramq-gouv-qc-ca:RFP"><no_dem_ext>T42400-ElmCtx</no_dem_ext><sta_recev>1</sta_recev><liste_fact_recev><fact_recev><no_fact_ext>!</no_fact_ext><id_fact_ramq_recev><no_fact_ramq>10006848849</no_fact_ramq><jeton_comm>87232311</jeton_comm></id_fact_ramq_recev><sta_recev>1</sta_recev><liste_ligne_fact_recev><ligne_fact_recev><no_ligne_fact>1</no_ligne_fact><sta_recev>1</sta_recev><mnt_prel>162.75</mnt_prel><formu_expl><![CDATA[Montant calculé : 162,75 $ Montant de base : 108,50 $ Taux selon l\'âge : 150 %]]></formu_expl></ligne_fact_recev></liste_ligne_fact_recev></fact_recev></liste_fact_recev></dem_paimt_recev>';
    //var xmlError = '<?xml version="1.0" encoding="utf-8"?><dem_paimt_recev xmlns="urn:ramq-gouv-qc-ca:RFP"><no_dem_ext>T42400-ElmCtx</no_dem_ext><sta_recev>2</sta_recev><liste_msg_expl_recev><msg_expl_recev><cod_msg_expl_recev>1056</cod_msg_expl_recev><txt_msg_expl_recev>La demande de paiement est non recevable car aucune des factures n\'est recevable.</txt_msg_expl_recev></msg_expl_recev></liste_msg_expl_recev><liste_fact_recev><fact_recev><no_fact_ext>!</no_fact_ext><sta_recev>2</sta_recev><liste_msg_expl_recev><msg_expl_recev><cod_msg_expl_recev>1081</cod_msg_expl_recev><txt_msg_expl_recev>Le professionnel dispensateur doit être le demandeur.</txt_msg_expl_recev></msg_expl_recev></liste_msg_expl_recev><liste_ligne_fact_recev /></fact_recev></liste_fact_recev></dem_paimt_recev>';
    var xmlDoc = parser.parseFromString(strXml, "text/xml");
    var response = {};


    response.no_dem_ext = xmlDoc.getElementsByTagName("no_dem_ext")[0].childNodes[0].nodeValue;
    response.sta_recev = xmlDoc.getElementsByTagName("sta_recev")[0].childNodes[0].nodeValue;

    // List of messages
    var tag_arr_liste_msg_expl_recev = xmlDoc.getElementsByTagName("liste_msg_expl_recev");
    if (tag_arr_liste_msg_expl_recev.length > 0) {
        var arr_liste_msg_expl_recev = tag_arr_liste_msg_expl_recev[0].children;
        var arr_msg_expl_recev = [];

        for (var i = 0; i < arr_liste_msg_expl_recev.length; i++) {
            var msg = {};
            msg.cod_msg_expl_recev = arr_liste_msg_expl_recev[i].childNodes[0].innerHTML;
            msg.txt_msg_expl_recev = arr_liste_msg_expl_recev[i].childNodes[1].innerHTML;
            arr_msg_expl_recev.push(msg);
        }
        response.liste_msg_expl_recev = arr_msg_expl_recev;
    }
    else {
        response.liste_msg_expl_recev = null;
    }
    

    //List of Factures
    var tag_arr_liste_fact_recev = xmlDoc.getElementsByTagName("liste_fact_recev");
    if (tag_arr_liste_fact_recev.length > 0)
    {
        var arr_liste_fact_recev = tag_arr_liste_fact_recev[0].children;
        var arr_fact_recev = [];
        for (var i = 0; i < arr_liste_fact_recev.length; i++) {
            var fact_recev = {};
            fact_recev.no_fact_ext = arr_liste_fact_recev[i].getElementsByTagName("no_fact_ext")[0].innerHTML;
            var obj_id_fact_ramq_recev = {};

            var obj_id_fact_ramq = arr_liste_fact_recev[i].getElementsByTagName("id_fact_ramq_recev")[0];

            if (obj_id_fact_ramq != null) {
                obj_id_fact_ramq_recev.no_fact_ramq = obj_id_fact_ramq.children[0].innerHTML;
                obj_id_fact_ramq_recev.jeton_comm = obj_id_fact_ramq.children[1].innerHTML;
                fact_recev.id_fact_ramq_recev = obj_id_fact_ramq_recev;
            }
            else {
                fact_recev.id_fact_ramq_recev = null;
            }

            fact_recev.sta_recev = arr_liste_fact_recev[i].getElementsByTagName("sta_recev")[0].innerHTML;

            fact_recev.liste_ligne_fact_recev = [];

            var tag_arr_liste_ligne_fact_recev = arr_liste_fact_recev[i].getElementsByTagName("liste_ligne_fact_recev");
            if (tag_arr_liste_ligne_fact_recev.length > 0)
            {
                var arr_liste_ligne_fact_recev = tag_arr_liste_ligne_fact_recev[0].children;
                for (var j = 0; j < arr_liste_ligne_fact_recev.length; j++) {
                    var ligne_fact_recev = {};
                    ligne_fact_recev.no_ligne_fact = arr_liste_ligne_fact_recev[j].children[0].innerHTML;
                    ligne_fact_recev.sta_recev = arr_liste_ligne_fact_recev[j].children[1].innerHTML;
                    ligne_fact_recev.mnt_prel = arr_liste_ligne_fact_recev[j].children[2].innerHTML;
                    ligne_fact_recev.formu_expl = arr_liste_ligne_fact_recev[j].children[3].innerHTML;
                    fact_recev.liste_ligne_fact_recev.push(ligne_fact_recev);
                }
            }
           



            fact_recev.liste_msg_expl_recev = [];
            var tag_arr_fact_recev_liste_msg_expl_recev = arr_liste_fact_recev[i].getElementsByTagName("liste_msg_expl_recev");


            if (tag_arr_fact_recev_liste_msg_expl_recev.length > 0) {
                var arr_fact_recev_liste_msg_expl_recev = tag_arr_fact_recev_liste_msg_expl_recev[0].childNodes;
                for (var k = 0; k < arr_fact_recev_liste_msg_expl_recev.length; k++) {
                    var msg_expl_recev = {};
                    msg_expl_recev.cod_msg_expl_recev = arr_fact_recev_liste_msg_expl_recev[k].childNodes[0].innerHTML;
                    msg_expl_recev.txt_msg_expl_recev = arr_fact_recev_liste_msg_expl_recev[k].childNodes[1].innerHTML;
                    fact_recev.liste_msg_expl_recev.push(msg_expl_recev);
                }
            }
            arr_fact_recev.push(fact_recev);
        }
    }
    
    response.liste_fact_recev = arr_fact_recev;
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
    if (_response.liste_fact_recev[0].id_fact_ramq_recev != null)
    {
        $('#jeton_comm').val(_response.liste_fact_recev[0].id_fact_ramq_recev.jeton_comm);
        $('#no_fact_ramq').val(_response.liste_fact_recev[0].id_fact_ramq_recev.no_fact_ramq);
    }
       
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
    
