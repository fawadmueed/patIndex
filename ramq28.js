var strServicePath = "http://ramqtest.cloudapp.net/RamqTest.svc/ajaxEndpoint/SoumissionDemandesPaiement";

var arrGrilleDeFacturation = getarrGrilleDeFacturation(); //for test only. in production arrGrilleDeFacturation should be global;
function SoumissionDemandesPaiement()
{
    var objSoumissionDemandesPaiementData = SoumissionDemandesPaiementGetData();
    if (objSoumissionDemandesPaiementData != null)
    {
        var operationName = "Paiement";
        var jsonData = getData(operationName, objSoumissionDemandesPaiementData);

        $.ajax({
            type: "POST",
            url: strServicePath,
            ProcessData: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,

            success: function (data, status, jqXHR) {
                if (data.d != null && data.d.substring(0, 5) == 'Error') {
                    alert(data.d);
                }
                else if (data.d != null && data.d.substring(0, 5) != 'Error') {
                    var objResponse = parseRAMQResponsePaiment(data.d);
                    displayResponsePaiment(objResponse);
                }
                else
                    alert("SoumissionDemandesPaiement Error");

            },
            error: function (xhr) {
                if (xhr.responceJSON != null)
                    alert(xhr.responceJSON.Message);
            }
        });
    }
    
}

function SoumissionDemandesModification()
{
    var jsonData = getData("Modification");

    $.ajax({
        type: "POST",
        url: strServicePath,
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

function SoumissionDemandesAnnulation() {
    var objSoumissionDemandesAnnulationData = SoumissionDemandesAnnulationGetData();
    if (objSoumissionDemandesAnnulationData != null)
    {
        var jsonData = getData("Annulation");

        $.ajax({
            type: "POST",
            url: strServicePath,
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

function getData(operationName, _objData)
{
    var idUtilisateur, motDePasse, xmlAEnvoyer, data;
    var arrCredentials = getCredentials();
    idUtilisateur = arrCredentials[0];
    motDePasse = arrCredentials[1];

    if (operationName == 'Paiement')
    {
        xmlAEnvoyer = getSoumissionDemandesPaimentXML(_objData);
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


function getSoumissionDemandesPaimentXML(_objData) {
    ////For test only:
    //var d = new Date();
    //var n = d.getTime();
    var xml = '<?xml version=\\"1.0\\" encoding=\\"utf-8\\"?>' +
    '<dem_paimt xmlns=\\"urn:ramq-gouv-qc-ca:RFP\\">' +
    //'<no_dem_ext>' + $('#no_dem_ext').val() + '</no_dem_ext>' + //?
    '<no_dem_ext>' + new Date().getTime() + '</no_dem_ext>' +// for test only
    '<logcl_fact>' +
        '<no_devpr_logcl>' + _objData.NoDevprLogcl + '</no_devpr_logcl>' + //?
        '<nom_devpr_logcl>' + _objData.NomDevprLogcl + '</nom_devpr_logcl>' + //?
        '<nom_logcl_fact>' + _objData.NomLogclFact + '</nom_logcl_fact>' + //?
        '<no_versi_logcl_fact>' + _objData.NoVersiLogclFact + '</no_versi_logcl_fact>' + //?
        '<no_versi_xml_dem>' + _objData.NoVersiXmlDem + '</no_versi_xml_dem>' + //?
    '</logcl_fact>' +
    '<demdr>' +
        '<typ_id_intvn>' + _objData.DemdrTypIdIntvn + '</typ_id_intvn>' + //const
        '<id_intvn>' + _objData.DemdrIdIntvn + '</id_intvn>' + //?
    '</demdr>' +
    '<exped_difrn_demdr>' +
        '<typ_id_intvn>' + _objData.ExpedTypIdIntvn + '</typ_id_intvn>' + //const
        '<id_intvn>' + _objData.ExpedIdIntvn + '</id_intvn>' + //?
    '</exped_difrn_demdr>' +
    '<moda_paimt>' +
        '<typ_moda_paimt>' + _objData.TypModaPaimt + '</typ_moda_paimt>' + //1 : Compte personnel du professionnel 2 : Compte administratif
    '</moda_paimt>' +
    '<liste_fact>' +
        getListe_factXML(_objData) +
    '</liste_fact>' +
'</dem_paimt>';
    return xml;

}

function getListe_factXML(_objData)
{
    var xml = '';
    var arrGrilleDeFacturation = getarrGrilleDeFacturation(); //for test only. in production arrGrilleDeFacturation should be global;
    var factQty = Math.ceil(arrGrilleDeFacturation.length / 10);
    for (var i = 0; i < factQty; i++)
    {
        xml += '<fact_serv_denta_chirg_denti_1_1_0>' +
                    '<no_fact_ext>' + getFactNumber() + '</no_fact_ext>' +  
                    '<prof>' +
                        '<typ_id_prof>' + _objData.TypIdProf + '</typ_id_prof>' + //const 1 : Numéro dispensateur RAMQ
                        '<id_prof>' + _objData.IdProf + '</id_prof>' + //?
                    '</prof>' +
                    '<lieu_consi>' +
                        '<lieu_phys>' +
                            '<typ_id_lieu_phys>' + _objData.TypIdLieuPhys + '</typ_id_lieu_phys>' + //1 : Lieu physique, reconnu et codifié à la Régie (établissement SSS, Cabinet, etc.)
                            '<id_lieu_phys>' + _objData.IdLieuPhys + '</id_lieu_phys>' + //?
                        '</lieu_phys>' +
                    '</lieu_consi>' +
                    '<liste_pers_objet_fact>' +
                        '<pers_patnt_avec_idt>' +
                            '<typ_situ_consi>' + _objData.TypSituConsi + '</typ_situ_consi>' + //Domaine de valeurs 1 : Situation normale 10 : Délai de carence, services nécessaires aux victimes de violence conjugale ou familiale ou d'une agression 11 : Délai de carence, services liés à la grossesse, à l\'accouchement ou à l'interruption de grossesse 12 : Délai de carence, services nécessaires aux personnes aux prises avec problèmes de santé de nature infectieuse ayant une incidence sur la santé publique
                            '<typ_id_pers>' + _objData.TypIdPers + '</typ_id_pers>' + //1 : NAM RAMQ
                            //'<id_pers>' + 'DISL14082210' + '</id_pers>' + //?
                            '<id_pers>' + _objData.NAM + '</id_pers>' + //?
                        '</pers_patnt_avec_idt>' +
                    '</liste_pers_objet_fact>' +
                    '<ind_fact_assoc_dr>' + _objData.IndFactAssosDr + '</ind_fact_assoc_dr>' + //? Indique si la facture est associée à une demande de remboursement d'un bénéficiare.
                    '<liste_ligne_fact_serv_denta_chirg_denti>' +
                        getListe_ligne_fact_serv_denta_chirg_denti(i + 1) +
                    '</liste_ligne_fact_serv_denta_chirg_denti>' +
                '</fact_serv_denta_chirg_denti_1_1_0>';
    }
    return xml;
}

function getListe_ligne_fact_serv_denta_chirg_denti(_noFact)
{
    
    var xml = '';
    var count = _noFact * 10 - 10;
    
    var ligneNum = 1;
    for (var i = count; (i < count + 10 && i < arrGrilleDeFacturation.length) ; i++)
    {
        if (arrGrilleDeFacturation[i].Type == 'AMQ' || arrGrilleDeFacturation[i].Type == 'BES')
        {
            xml = xml + '<ligne_fact_serv_denta_chirg_denti>' +
                            '<no_ligne_fact>' + ligneNum + '</no_ligne_fact>' +
                            '<typ_id_elm_fact>' + '1' + '</typ_id_elm_fact>' + //1 : Code facturation élément assuré
                            '<id_elm_fact>' + arrGrilleDeFacturation[i].Code + '</id_elm_fact>' + //Code de facturation
                            '<dat_serv_elm_fact>' + getCurrentDate() + '</dat_serv_elm_fact>' + //Is current date? format YYYY-mm-DD (2017-08-01)
                            '<cod_role>' + '1' + '</cod_role>' + //1 : Responsable 4 : Assistant
                            '<info_serv_denta>' +
                                '<no_dent>' + arrGrilleDeFacturation[i].Dent + '</no_dent>' +
                                '<liste_surf_dent_trait>' +
                                    getListe_surf_dent_trait(arrGrilleDeFacturation[i].Surface) +
                                '</liste_surf_dent_trait>' +
                            '</info_serv_denta>' +
                            '<mnt_prcu_patnt>' + "0" + '</mnt_prcu_patnt>' +//?
                        '</ligne_fact_serv_denta_chirg_denti>';
            ligneNum++;
        }
    }
    return xml;
}

function getListe_surf_dent_trait(strSurf)
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
function getCurrentDate()
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

function getSoumissionDemandesPaimentXML2()
{
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
                msg += GlobalArrListeMsgExplRecev[i].code + ' ' + GlobalArrListeMsgExplRecev[i].text + '\n';
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
                        msg += arrMsgExplRecev[k].code + ' ' + arrMsgExplRecev[k].text + '\n';
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
                                    msg += 'Ligne ' + ligneFactRecev.NoLigneFact + ': ' + arrLigneMsgExplRecev[l].code + ' ' + arrLigneMsgExplRecev[l].text + '\n';
                                }
                            }
                        }
                        else if(ligneFactRecev.StaRecev == '1')
                        {
                            msg += 'Ligne ' + ligneFactRecev.NoLigneFact + ': OK\n';
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
                        msg += 'Ligne: ' + ligneFactRecev.NoLigneFact + ' Explication: ' + removeCDATA(ligneFactRecev.FormuExpl) +'\n\n';
                    }

                    msg += "\nMontant preliminaire total: " + sumMntPrel + '$';
                    $('#amq_total').val(sumMntPrel);
                }
            }
        }
    }
    alert (msg);

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

function getFactNumber()
{
    //For Test only
    return 'F' + new Date().getTime();

    //TODO: implement real algorithm.
}

function SoumissionDemandesPaiementValidation()
{
    
}

function SoumissionDemandesPaiementGetData()
{
    var objSDP = {};
    var cPat = 0;
    var validationResult = false;
    for (pat in qPAT.patients) 
    {
        if (curPatient == qPAT.patients[pat].id)
        {
            cPat = pat;
            break;
        }
    }
    //var nam = qPAT.patients[cPat].NAM; //uncomment for production
    var nam = 'DISL14082210'; //For test only.
    objSDP.NAM = nam;
    objSDP.NoDevprLogcl = '18011';//?
    objSDP.NomDevprLogcl = 'Développeur';//?
    objSDP.NomLogclFact = 'Mon logiciel';//?
    objSDP.NoVersiLogclFact = '1.0.0';//?
    objSDP.NoVersiXmlDem = 'ACTE';//?
    objSDP.DemdrTypIdIntvn = '1';//const
    objSDP.DemdrIdIntvn = '299801';//? looks like Idprof
    objSDP.ExpedTypIdIntvn = '3';//const
    objSDP.ExpedIdIntvn = '18011';//?
    objSDP.TypModaPaimt = '1';//1 : Compte personnel du professionnel 2 : Compte administratif
    objSDP.TypIdProf = '1';//const 1 : Numéro dispensateur RAMQ
    objSDP.IdProf = '299801';// $('#no_prof').val();
    objSDP.TypIdLieuPhys = '1';//1 : Lieu physique, reconnu et codifié à la Régie (établissement SSS, Cabinet, etc.)
    objSDP.IdLieuPhys = '99999';//?
    objSDP.TypSituConsi = '1';//Domaine de valeurs 1 : Situation normale 10 : Délai de carence, services nécessaires aux victimes de violence conjugale ou familiale ou d'une agression 11 : Délai de carence, services liés à la grossesse, à l\'accouchement ou à l'interruption de grossesse 12 : Délai de carence, services nécessaires aux personnes aux prises avec problèmes de santé de nature infectieuse ayant une incidence sur la santé publique
    objSDP.TypIdPers = '1';//1 : NAM RAMQ
    objSDP.IndFactAssosDr = 'true';//? Indique si la facture est associée à une demande de remboursement d'un bénéficiare.

    validationResult = SDPValidation(objSDP);
    if (validationResult)
        return objSDP;
    else
        return null;
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