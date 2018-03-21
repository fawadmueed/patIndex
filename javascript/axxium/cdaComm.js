var globCdaNetAPIuri = 'http://ec2-52-38-58-195.us-west-2.compute.amazonaws.com/axxium/api/InsuranceWebApi/';
var globCdanetTranscode = '1'; //'Claim';
var globCdaDataFromDB;
//var globCdaProviderSequence; //populate this variable when transaction is selected in the transaction grid.
var globCdaRespObj;
var globCdaTransHistListData =[];
var globCdaTransHistTable;
var globCdaTransHistSelectedData;
var globCdaVersion = '';

$(document).ready(function () {
    //Transaction history table
    // globCdaTransHistTable = $('#cdan_table').DataTable({
    //     "oLanguage": CdaCommTranslateDataTable(),
    //     "columns": [
    //         null,
    //         null,
    //         null,
    //         null,
    //         null,
    //         null,
    //         null,
    //         null,
    //         null,
    //         null,
    //         { "visible": false },
    //         { "visible": false },
    //         { "visible": false },
    //         { "visible": false }
    //     ],
    //     //dom: 'Bfrtip',
    //     searching: false
    // });

    $('#cdan_table tbody').on('click', 'tr', function () {
        globCdaTransHistTable.$('tr.active').removeClass('active');
        $(this).addClass('active');

        //if ($(this).hasClass('active')) {
        //    $(this).removeClass('active');
        //}
        //else {
        //    globCdaTransHistTable.$('tr.active').removeClass('active');
        //    $(this).addClass('active');
        //}
        globCdaTransHistSelectedData = globCdaTransHistTable.row(this).data();
        globNoDossier = globCdaTransHistSelectedData[2];
        globBillNumber = globCdaTransHistSelectedData[11];

        //TODO:
        CdaCommDisplayTransDetails();
    });
});

function CdaCommSendToSecondIns()
{ }



function CdaCommOpenCASPopup() {
    var montantReclame = (globCdaRespObj && globCdaRespObj.g04 && !isNaN(parseFloat(globCdaRespObj.g04))) ? parseFloat(globCdaRespObj.g04):0;
    var montantTotalRembourse = (globCdaRespObj && globCdaRespObj.g28 && !isNaN(parseFloat(globCdaRespObj.g28))) ? parseFloat(globCdaRespObj.g28):0;
    var montantCas = (montantReclame - montantTotalRembourse);

    $('#to_cas_montant_de_facture').val(montantReclame.toFixed(2));
    $('#to_cas_remboursement').val(montantTotalRembourse.toFixed(2));
    $('#to_cas_enter_montant').val(montantCas.toFixed(2));

    modToCAS();//Open Cash modal
}

function CdaCommSendToCAS()
{
    var montantTotalRembourse = (globCdaRespObj && globCdaRespObj.g28 && !isNaN(parseFloat(globCdaRespObj.g28))) ? parseFloat(globCdaRespObj.g28) : 0;
    var montantCash = (isNaN(parseFloat($('#to_cas_enter_montant').val())) ? 0 : parseFloat($('#to_cas_enter_montant').val()));
    $('#ass_total').val(montantTotalRembourse.toFixed(2));
    $('#pers_total').val(montantCash.toFixed(2));
    //Open Payment form
    getAllTrData(); 
    modPayment();
}

function CdaCommShowResp(pRespMessage)
{
    var message = pRespMessage.replace(/\n/g, '<br/>');
    var div = document.getElementById('cdanet_response_div');

    div.innerHTML = '<p>' + message + '</p>';
    //Show modal
    modResponseCDANET();
}

//Convert DateFrom YYYYMMDD to yyyy-mm-dd. Return current date if conversion impossible.
function CdaCommConvertDate(pStr)
{
    var formatedDate;
    if (pStr == 0 || isNaN(pStr)) {
        formatedDate = new Date().toISOString().slice(0, 10);
    }
    else {
        var year = pStr.substring(0, 4);
        var month = pStr.substring(4, 6);
        var day = pStr.substring(6, 8);
        formatedDate = year + '-' + month + '-' + day;
    }
    
    return formatedDate;
}

//Convert DateFrom YYYYMMDD to yyyy-mm-dd. Return '-1' if conversion impossible.
function CdaCommConvertDate2(pStr) {
    var formatedDate;
    if (pStr == 0 || isNaN(pStr)) {
        formatedDate =-1;
    }
    else {
        var year = pStr.substring(0, 4);
        var month = pStr.substring(4, 6);
        var day = pStr.substring(6, 8);
        formatedDate = year + '-' + month + '-' + day;
    }

    return formatedDate;
}

function CdaCommTopage850(pString) {
    var code;
    var arrString =[];
    if (pString) {
        arrString = pString.split('');
        for (var i = 0; i < arrString.length; i++) {
            code = arrString[i].charCodeAt(0);
            switch (arrString[i]) {
                case 'É': code = 144; break;
                case 'È': code = 212; break;
                case 'Ê': code = 210; break;
                case 'À': code = 183; break;
                case 'Â': code = 182; break;
                case 'Ï': code = 216; break;
                case 'Î': code = 215; break;
                case 'Ô': code = 226; break;
                case 'Ö': code = 153; break;
                case 'Û': code = 234; break;
                case 'Ü': code = 154; break;
                case 'Ç': code = 128; break;
                case 'é': code = 130; break;
                case 'è': code = 138; break;
                case 'ê': code = 136; break;
                case 'à': code = 133; break;
                case 'â': code = 131; break;
                case 'ï': code = 139; break;
                case 'î': code = 140; break;
                case 'ô': code = 147; break;
                case 'ö': code = 148; break;
                case 'û': code = 150; break;
                case 'ü': code = 129; break;
                case 'ç': code = 135; break;
            }
            arrString[i] = String.fromCharCode(code);
        }
    }
    return arrString.join("");
}

function CdaCommFrompage850(pString) {
    var code;
    var arrString;
    if (pString) {
        arrString = pString.split('');
        for (var i = 0; i < arrString.length; i++) {
            code = arrString[i].charCodeAt(0);
            switch (code) {
                case 144: arrString[i] = 'É'; break;
                case 212: arrString[i] = 'È'; break;
                case 210: arrString[i] = 'Ê'; break;
                case 211: arrString[i] = 'Ë'; break;
                case 183: arrString[i] = 'À'; break;
                case 182: arrString[i] = 'Â'; break;
                case 181: arrString[i] = 'Á'; break;
                case 142: arrString[i] = 'Ä'; break;
                case 143: arrString[i] = 'Å'; break;
                case 146: arrString[i] = 'Æ'; break;
                case 216: arrString[i] = 'Ï'; break;
                case 215: arrString[i] = 'Î'; break;
                case 222: arrString[i] = 'Ì'; break;
                case 214: arrString[i] = 'Í'; break;

                case 226: arrString[i] = 'Ô'; break;
                case 153: arrString[i] = 'Ö'; break;
                case 224: arrString[i] = 'Ó'; break;
                case 227: arrString[i] = 'Ò'; break;
                case 229: arrString[i] = 'Õ'; break;

                case 235: arrString[i] = 'Ù'; break;
                case 233: arrString[i] = 'Ú'; break;
                case 234: arrString[i] = 'Û'; break;
                case 154: arrString[i] = 'Ü'; break;

                case 128: arrString[i] = 'Ç'; break;
                case 237: arrString[i] = 'Ý'; break;

                case 130: arrString[i] = 'é'; break;
                case 138: arrString[i] = 'è'; break;
                case 136: arrString[i] = 'ê'; break;
                case 137: arrString[i] = 'ë'; break;

                case 133: arrString[i] = 'à'; break;
                case 131: arrString[i] = 'â'; break;
                case 160: arrString[i] = 'á'; break;
                case 198: arrString[i] = 'ã'; break;
                case 132: arrString[i] = 'ä'; break;
                case 134: arrString[i] = 'å'; break;
                case 145: arrString[i] = 'æ'; break;

                case 139: arrString[i] = 'ï'; break;
                case 140: arrString[i] = 'î'; break;
                case 141: arrString[i] = 'ì'; break;
                case 161: arrString[i] = 'í'; break;

                case 147: arrString[i] = 'ô'; break;
                case 148: arrString[i] = 'ö'; break;
                case 149: arrString[i] = 'ò'; break;
                case 228: arrString[i] = 'õ'; break;
                case 162: arrString[i] = 'ó'; break;

                case 208: arrString[i] = 'ð'; break;

                case 150: arrString[i] = 'û'; break;
                case 129: arrString[i] = 'ü'; break;
                case 151: arrString[i] = 'ù'; break;
                case 163: arrString[i] = 'ú'; break;

                case 152: arrString[i] = 'ÿ'; break;
                case 236: arrString[i] = 'ý'; break;

                case 135: arrString[i] = 'ç'; break;
            }
        }
    }
    return arrString.join("");
}

//Returns Error message by code.
function CdaCommGetCDANETMessage(p)
{
    var error = p.toString();
    var temp = '';
    switch (error)
    {
        case '1': temp = '(001) Préfixe de transaction absent ou invalide '; break;
        case '2': temp = '(002) No. de demande ou de séquence absent ou invalide '; break;
        case '3': temp = '(003) No. de version absent ou invalide '; break;
        case '4': temp = '(004) Code de transaction absent ou invalide '; break;
        case '5': temp = '(005) No. d\'identification de l\'assureur absent ou invalide '; break;
        case '6': temp = '(006) No du logiciel dentaire absent ou invalide'; break;
        case '7': temp = '(007) No. du dentiste attribué par ACDQ absent ou invalide '; break;
        case '8': temp = '(008) No. de cabinet attribué par ACDQ absent ou invalide '; break;
        case '9': temp = '(009) No. de police ou régime(premier assureur) absent ou invalide '; break;
        case '10': temp = '(010) No. de section ou de division absent ou invalide '; break;
        case '11': temp = '(011) No. du titulaire de l\'assurance absent ou invalide '; break;
        case '12': temp = '(012) Code de lien de parenté absent ou invalide '; break;
        case '13': temp = '(013) Sexe du patient absent ou invalide '; break;
        case '14': temp = '(014) Date de naissance du patient absente ou invalide '; break;
        case '15': temp = '(015) Nom du patient absent '; break;
        case '16': temp = '(016) Prénom du patient absent '; break;
        case '17': temp = '(017) Code indiquant exception quant à l\'admissibilité absent ou invalide '; break;
        case '18': temp = '(018) Nom d\'établissement scolaire absent '; break;
        case '19': temp = '(019) Nom de famille du titulaire absent ou non conforme au dossier '; break;
        case '20': temp = '(020) Prénom de famille du titulaire absent ou non conforme au dossier '; break;
        case '21': temp = '(021) Adresse du titulaire de l\'assurance absente '; break;
        case '22': temp = '(022) Ville du titulaire de l\'assurance absente '; break;
        case '23': temp = '(023) Code postal du titulaire de l\'assurance absent ou invalide '; break;
        case '24': temp = '(024) Langue du titulaire de l\'assurance invalide '; break;
        case '25': temp = '(025) Date de naissance du titulaire de l\'assurance absente ou invalide '; break;
        case '26': temp = '(026) No. du second assureur invalide '; break;
        case '27': temp = '(027) No. de police ou régime(second assureur) absent ou invalide '; break;
        case '28': temp = '(028) No. de division ou section (second assureur)absent ou invalide '; break;
        case '29': temp = '(029) No. du titulaire(second assureur) absent ou invalide '; break;
        case '30': temp = '(030) Date de naissance du titulaire(second assureur) absente ou invalide '; break;
        case '31': temp = '(031) Demande doit être d\'abord soumise au second assureur(second assureur=premier assureur) '; break;
        case '32': temp = '(032) Destinataire du paiement absent ou invalide '; break;
        case '33': temp = '(033) Date de l\'accident invalide '; break;
        case '34': temp = '(034) Nombre d\'actes exécutés absent ou invalide '; break;
        case '35': temp = '(035) Code de l\'acte absent ou invalide '; break;
        case '36': temp = '(036) Date à laquelle l\'acte a été executé absente ou invalide '; break;
        case '37': temp = '(037) No. international de dent, de sextant, de quadrant ou site absent ou invalide '; break;
        case '38': temp = '(038) Surface de la dent absente ou invalide '; break;
        case '39': temp = '(039) Date de la mise en bouche initiale au maxillaire absente ou invalide '; break;
        case '40': temp = '(040) Réponse absente ou invalide :Le traitement est-il requis en vue de soins d\'orthodonthie?'; break;
        case '41': temp = '(041) Honoraires demandés par le dentiste absents ou invalides '; break;
        case '42': temp = '(042) Frais de laboratoire absents ou invalides '; break;
        case '43': temp = '(043) Unité de temps absente ou invalide '; break;
        case '44': temp = '(044) Longueur du message indiquée non identique à la longueur du message reçu'; break;
        case '45': temp = '(045) Indicateur de courrier électronique absent ou invalide '; break;
        case '46': temp = '(046) No. de référence de la demande de prestations absent ou invalide '; break;
        case '47': temp = '(047) Le dentiste n\'a pas accés au réseau ACDQ-CDANet'; break;
        case '48': temp = '(048) S.V.P. soummettre la demande manuellement'; break;
        case '49': temp = '(049) Pas de réponse en suspens provenant du réseau '; break;
        case '50': temp = '(050) No. de ligne d\'acte absent ou imvalide '; break;
        case '51': temp = '(051) No. du plan de traitement introuvable '; break;
        case '52': temp = '(052) Demande de prestations ou plan de traitement doit contenir au moins un acte'; break;
        case '53': temp = '(053) Province du titulaire absente ou invalide'; break;
        case '54': temp = '(054) No du titulaire sur refus non conforme à la demande originale '; break;
        case '55': temp = '(055) Anulation ne concerne pas la transaction du jour'; break;
        case '56': temp = '(056) Code de spécialité du dentiste non conforme au dossier '; break;
        case '57': temp = '(057) Réponse absente ou invalide :S\'agit-il de la mise en bouche initiale? '; break;
        case '58': temp = '(058) Nombre d\'actes non conforme au nombre indqué'; break;
        case '59': temp = '(059) Logiciel dentaire du cabinet non autorisé à transmette des transactions au réseau ACDQ-CDANet '; break;
        case '60': temp = '(060) L\'annulation ne peut pas être acceptée maintenant.Veuillez réessayer plus tard aujourd\'hui'; break;
        case '61': temp = '(061) Erreur du réseau.Veuillez recommencer '; break;
        case '62': temp = '(062) Numéro du dentiste bénéficiaire du paiement absent ou invalide '; break;
        case '63': temp = '(063) Numéro du cabinet bénéficiaire du paiement absent ou invalide '; break;
        case '64': temp = '(064) Dentiste ayant référé le patient absent ou invalide '; break;
        case '65': temp = '(065) Code indiquant motif de la recommandation absent ou invalide '; break;
        case '66': temp = '(066) Indicateur d\'un régime de soin absent ou invalide '; break;
        case '67': temp = '(067) Champs se rapportant au régime NNSA absents '; break;
        case '68': temp = '(068) Numéro de la bande absent ou invalide '; break;
        case '69': temp = '(069) Numéro de la famille absent ou invalide '; break;
        case '70': temp = '(070) Odontogramme des dents manquantes, absent ou invalide '; break;
        case '71': temp = '(071) Code indiquant parenté patient-titulaire(second assureur)absent ou invalide '; break;
        case '72': temp = '(072) Code indiquant type d\'acte absent ou invalide '; break;
        case '73': temp = '(073) Codes de remarques absentes ou invalides '; break;
        case '74': temp = '(074) Date à laquelle l\'acte a été éxécuté est une date ultérieure '; break;
        case '75': temp = '(075) Date à laquelle l\'acte a été éxécuté est au-delà d\'un an '; break;
        case '76': temp = '(076) Groupe non accepté par l\'EDI '; break;
        case '77': temp = '(077) Type d\'acte non couvert par l\'assureur '; break;
        case '78': temp = '(078) Veuillez soumettre plan de traitement manuellement '; break;
        case '79': temp = '(079) Duplicata d\'une demande de prestations '; break;
        case '80': temp = '(080) Compteur des transactions par assureur absent ou invalide '; break;
        case '81': temp = '(081) Date d\'admisibilité invalide '; break;
        case '82': temp = '(082) Numéro de séquence ou version de la carte invalide '; break;
        case '83': temp = '(083) Nom de famille du titulaire(second assureur)absent ou invalide '; break;
        case '84': temp = '(084) Prénom du titulaire (second assureur) absent ou invalide '; break;
        case '85': temp = '(085) Lettre initiale du second prénom du titulaire(second assureur) absente '; break;
        case '86': temp = '(086) Première ligne de l\'adresse du titulaire (second assureur) absente '; break;
        case '87': temp = '(087) Ville du titulaire (second assureur) absente '; break;
        case '88': temp = '(088) Province ou Etat du titulaire (second assureur) absent '; break;
        case '89': temp = '(089) Code postal ou zip du titulaire (second assureur) absent '; break;
        case '90': temp = '(090) Réponse absente ou invalide: S\'agit-il de la mise en bouche initiale à la mandibule? '; break;
        case '91': temp = '(091) Date de la mise en bouche initiale à la mandibule absente ou invalide '; break;
        case '92': temp = '(092) Matériau de la prothèse au maxillaire absent ou invalide '; break;
        case '93': temp = '(093) Matériau de la prothèse à la mandibule absent ou invalide '; break;
        case '94': temp = '(094) Nombre de dents extraites absent ou invalide '; break;
        case '95': temp = '(095) Numéro de la dent extraite absent ou invalide '; break;
        case '96': temp = '(096) Date de l\'extraction absente ou invalide '; break;
        case '97': temp = '(097) Décalage du rapprochement invalide '; break;
        case '98': temp = '(098) Code pour frais de laboratoire absent ou invalide '; break;
        case '99': temp = '(099) Code pour chiffrement invalide '; break;
        case '100': temp = '(100) Chiffrement invalide '; break;
        case '101': temp = '(101) Initiale du second prénom du titulaire invalide '; break;
        case '102': temp = '(102) Initiale du second prénom du patient invalide '; break;
        case '103': temp = '(103) Code de la personne à charge (première assurance) absent ou invalide '; break;
        case '104': temp = '(104) Code de la personne à charge (seconde assurance) absente ou invalide '; break;
        case '105': temp = '(105) Numéro de séquence /version de la carte (seconde assurence) absente ou invalide '; break;
        case '106': temp = '(106) Langue de titulaire (seconde assurance)absente ou invalide '; break;
        case '107': temp = '(107) Indicateur de régime (seconde assurance) absente ou invalide '; break;
        case '108': temp = '(108) Champs portant sur la seconde assurance absents '; break;
        case '109': temp = '(109) Numéro de séquence (seconde assurance) absent ou invalide '; break;
        case '110': temp = '(110) Indicateur de plan de traitement d\'orthodontie absent ou invalide '; break;
        case '111': temp = '(111) Tarif du premier examen absent ou invalide '; break;
        case '112': temp = '(112) Tarif de la phase diagnostique absent ou invalide '; break;
        case '113': temp = '(113) Paiement initial absent ou invalide '; break;
        case '114': temp = '(114) Mode de paiement absent ou invalide '; break;
        case '115': temp = '(115) Durée du traitement absente ou invalide '; break;
        case '116': temp = '(116) Nombre prévu de paiements absent ou invalide'; break;
        case '117': temp = '(117) Montant prévu du paiement absent ou invalide '; break;
        case '118': temp = '(118) Code des frais de laboratoire # 2 absent ou invalid '; break;
        case '119': temp = '(119) Frais de laboratoire #2 absent ou invalide '; break;
        case '120': temp = '(120) Début prévue de traitement '; break;
        case '121': temp = '(121) Détail des prestations(première assurance) modifié, différent de l\'original '; break;
        case '122': temp = '(122) Date plus disponible '; break;
        case '123': temp = '(123) Numéro de page du rapprochement absent ou invalide '; break;
        case '124': temp = '(124) Type de Transaction non supportée par l\'assureur '; break;
        case '125': temp = '(125) Version de transaction non acceptée '; break;
        case '126': temp = '(126) Code diagnostic absent ou invalide '; break;
        case '127': temp = '(127) Code institutionnel absent ou invalide '; break;
        case '128': temp = '(128) Numéro de page du plan de traitement courant absent ou invalide '; break;
        case '129': temp = '(129) Numéro de page du dernier plan de traitement absent ou invalide '; break;
        case '130': temp = '(130) Nombre du plan du dossier gouvernemental absent ou invalide '; break;
        case '131': temp = '(131) Plan du dossier gouvernemental absent ou invalide '; break;
        case '132': temp = '(132) Nombre de dossier secondaire absent ou invalide '; break;
        case '997': temp = '(997) Dernière transaction illisible '; break;
        case '998': temp = '(998) Pour usage futur par l\'ADC '; break;
        case '999': temp = '(999) Erreur du système central, S.V.P. soumettre manuellement '; break;

        default:
            temp='(' + p + ') Erreur inconnue';
    }
    return temp;

}

//Returns Print form name
function CdaCommGetFormToPrint(pFormId)
{
    var formId = '0' + pFormId;
    var res = '';
    switch (formId)
    {
        case '01': res = 'EXPLICATION DES PRESTATIONS-RÉCLAMATION'; break;
        case '02': res = 'DENTAIDE'; break;
        case '03': res = 'ACCUSÉ DE RÉCEPTION-RÉCLAMATION'; break;
        case '04': res = 'FORMULAIRE DE VALIDATION PAR L\'EMPLOYEUR'; break;
        case '05': res = 'FORMULAIRE NORMAL'; break;
        case '06': res = 'ACCUSÉ DE RÉCEPTION-PLAN DE TRAITEMENT'; break;
        case '07': res = 'EXPLICATION DES PRESTATIONS-PLAN DE TRAITEMENT'; break;
        case '08': res = 'FORMULAIRE D\'ADMISSIBILITÉ'; break;
    }
    return res;
}

//returns random number, adds extra '0' to the left. Ex: 002
function CdaCommCreateRandomNumber(min, max)
{
    var random =  (Math.floor(Math.random() * (max - min + 1)) + min).toString();

    var len = max.toString().length;

    while (random.length < len)
    {
        random = '0' + random;
    }

    return random;
}

//Returns result. if result != 0 (means there are some errors)display allert message.
function CdaCommGetCommStatus(pResponseLine)
{
    var CommErrormess = '';
    var startPos = pResponseLine.indexOf(',') +1;
    var endPos = pResponseLine.indexOf(',',startPos);

    var result = parseInt(pResponseLine.substring(startPos, endPos));
    switch(result)
    {
        case 1001: CommErrormess = ('Erreur interne. '); break; //Consulter le fichier CDALOG.TXT pour plus de détails
        case 1003: CommErrormess = ('Appel interrompu par l\'utilisateur...'); break;
        case 1011: CommErrormess = ('Cryptage non autorisé.' + '\n'+ 'Le cryptage a  été déclaré dans le fichier de requête mais pas dans le fichier de configuration CCD.INI...'); break;
        case 1012: CommErrormess = ('Ne peut encrypter .' + '\n' + 'Le cryptage nécessite une connexion de 8 bits alors que la connexion déclarée dans CCD.INI est de 7 bits...'); break;
        case 1013: CommErrormess = ('Le fichier de configuration de l\'encryptage ACDQ-CDA.CFG manquant ou non valide...'); break;
        case 1021:
        case 1002: CommErrormess = ('Délai de composition échu.Le serveur n\'a pu être joint...'); break;
        case 1022: CommErrormess = ('Pas de tonalité .Vérifier le branchement de la ligne ...'); break;
        case 1023: CommErrormess = ('Ligne engagée...'); break;
        case 1024: CommErrormess = ('Bris de communication pendant l\'attente d\'une réponse...'); break;
        case 1025: CommErrormess = ('Le logiciel n\'a pu établir un protocole compatible avec le serveur CDANet...'); break;
        case 1026: CommErrormess = ('Le serveur ne répond pas...'); break;
        case 1027: CommErrormess = ('La connexion DATAPACC a été annulée.Le serveur CDANet est peut être occupé.' + '\n'+ 'Réessayer plus tard...'); break;
        case 1028: CommErrormess = ('Erreur de script dans le fichier CCD.INI...'); break;
        case 1031: CommErrormess = ('Erreur de protocole...'); break;
        case 1032: CommErrormess = ('Erreur de décompression.Le fichier de réponse est possiblement corrompu...'); break;
        case 1033: CommErrormess = ('Erreur de lecture du fichier de requête... '); break;
        case 1034: CommErrormess = ('Le fichier de requête n\'est pas conforme au format CDANet...'); break;
        case 1041: CommErrormess = ('La connexion a été établie mais le serveur CADNet a des problèmes...'); break;
        case 1042: CommErrormess = ('La requête est envoyée mais aucune réponse n\'est reçue du serveur CDANet...'); break;
        case 1044: CommErrormess = ('Probablement une mauvaise ligne .Réessayer...'); break;
        case 1045: CommErrormess = ('Le serveur CDANet a brusquement mis fin à la communication...'); break;
        case 1051: CommErrormess = ('Le port de communication n\'a pu être ouvert...' + '\n' + 'Le port est mal configuré ou utilisé par un autre programme...'); break;
        case 1052: CommErrormess = ('Erreur dans les paramètres du port de communication...'); break;
        case 1053: CommErrormess = ('Erreur d\'écriture vers le port de communication...' + '\n' + 'Veuillez vérifier le modem...'); break;
        case 1054: CommErrormess = ('Erreur de lecture à partir du port de communication...'); break;
    }

    if (result != 0)
    {
        var errorMess = 'Erreur de communication ' + result.toString() +'\n'+ CommErrormess;
        alert(errorMess);
    }
    return result;

}

// Returns Cda version(2 or 4) for givent company code
function CdaCommGetVersion(pCode)
{
    var version = '';
    $.ajax({
        type: 'GET',
        url: "json/insurances/insurances.json",
        async: false,
        dataType: 'json',
        success: function (data) {
            insuranceData = data;

            for (var i = 0; i < data.length; i++) {
                if (data[i].code == pCode) {
                    version = data[i].cdaVersion;
                    if (data[i].AcceptPredeterm === 'N')
                    {
                        $('#btnPlnTrSoumettre').attr('disabled', 'disabled');
                    }
                    if (data[i].AcceptOutstanding === 'N')
                    {
                        $('#btnReqOutstTransSend').attr('disabled', 'disabled');
                    }
                    if (data[i].AcceptEligibility === 'N')
                    {
                        $('#btnEligibilityTransSend').attr('disabled', 'disabled');
                    }

                    break;
                }
            }
        }
    });

    return version;
}

function CdaCommIsRamqCode(pCode)
{
    if (pCode) {
        pCode = pCode.trim();
        var result = false;
        if (pCode == 'AMQ' || pCode == 'BES' || pCode == 'HOP')
            result = true;
        return result;
    }
    else {
        return false;
    }
    
}

//===================================== Historique des transaction =====================================
function CdaCommGetTransList(){
    CdaCommClearHistoryTable();
    CdaCommGetHistoryTransDataFromServer();
}

function CdaCommGetHistoryTransDataFromServer() {
    var dateFrom = $("#ins_fact_ane_start").val();
    var dateTo = $("#ins_fact_ane_end").val();
    $.post("allScriptsv1.py", { tx: "getPatientFactures", clinicId: globClinicId, patientId: globPatientId, dFrom: dateFrom, dTo: dateTo, section: 'ins'},
            function (result) {
                if (result.message !== undefined)
                    alert(result.message);
                else {
                    if (result.factures.length > 0) {
                        globCdaTransHistListData = CdaCommGetDataForTransHistTable(result.factures);
                        CdaCommUpdateTransHistTable();
                    }
                }
            });
}

function CdaCommClearHistoryTable() {
    $('#cdan_table tbody').empty();
}

function CdaCommGetDataForTransHistTable(pTransactions) {
    var arrData = [];
    for (var i = 0; i < pTransactions.length; i++) {
        var objOutputData = {};
        var objResponse = {};
        var description = '';
        var strResponse = '';
        var versionNumber = '';
        var transCode = '';
        var noSeq = '';
        var objInputData = pTransactions[i];
        if (objInputData.resp)
        {
            strResponse = objInputData.resp.split(',').slice(3).toString(); // extract string after 3th comma;
        }
        
        
        var transactionString = (objInputData.transaction)? objInputData.transaction:'';
        versionNumber = transactionString.substring(18, 20);
        transCode = transactionString.substring(20, 22);
        noSeq = transactionString.substring(12, 18);

        if (versionNumber == '02')
        {
            objResponse = CdaV2ReadResponse(strResponse);
            description = CdaV2GetTransactionName(transCode);
        }
        else if (versionNumber == '04')
        {
            objResponse = CdaV4ReadResponse(strResponse);
            description = CdaV4GetTransactionName(transCode);
        }
        objOutputData.NoSeq = noSeq;
        objOutputData.Description = description;
        objOutputData.NoDossier = (objInputData.nodossier) ? objInputData.nodossier : '';
        objOutputData.Prenom = (objInputData.info && objInputData.info.Prenom)?objInputData.info.Prenom:'';
        objOutputData.Nom = (objInputData.info && objInputData.info.Nom)?objInputData.info.Nom:'';
        objOutputData.Assur = (objInputData.info && objInputData.info.Ass)?objInputData.info.Ass:'';
        objOutputData.Couver = '';
        objOutputData.Date = (objInputData.datetransaction)?objInputData.datetransaction:'';
        objOutputData.NoRef = (objResponse&&objResponse.g01) ? (objResponse.g01).toString().trim() : '';
        objOutputData.Status = objInputData.status;
        objOutputData.VersionNumber = versionNumber;
        objOutputData.NoFacture = (objInputData.facture)?objInputData.facture:'';
        objOutputData.Resp = (objInputData.resp)?objInputData.resp:'';
        objOutputData.Transaction = (objInputData.transaction) ? objInputData.transaction : '';

        arrData.push(objOutputData);
    }
    return arrData;
}

function CdaCommUpdateTransHistTable() {
    var arrData = [];
    for (var i = 0; i < globCdaTransHistListData.length; i++)
    {
        var arr = [];

        arr.push(globCdaTransHistListData[i].NoSeq);
        arr.push(globCdaTransHistListData[i].Description);
        arr.push(globCdaTransHistListData[i].NoDossier);
        arr.push(globCdaTransHistListData[i].Prenom);
        arr.push(globCdaTransHistListData[i].Nom);
        arr.push(globCdaTransHistListData[i].Assur);
        arr.push(globCdaTransHistListData[i].Couver);
        arr.push(globCdaTransHistListData[i].Date);
        arr.push(globCdaTransHistListData[i].NoRef);
        arr.push(CdaCommGetStatus(globCdaTransHistListData[i].Status));
        arr.push(globCdaTransHistListData[i].VersionNumber);
        arr.push(globCdaTransHistListData[i].NoFacture);
        arr.push(globCdaTransHistListData[i].Resp);
        arr.push(globCdaTransHistListData[i].Transaction);
        arrData.push(arr);
    }

    globCdaTransHistTable.clear().draw();
    globCdaTransHistTable.rows.add(arrData); // Add new data
    globCdaTransHistTable.columns.adjust().draw();
}

function CdaCommGetStatus(pStatusNumber)
{
    var strStatus = '';
    switch (pStatusNumber.toString())
    {
        case '0': strStatus = 'En suspens'; break;
        case '1': strStatus = 'Traité'; break;
        case '2': strStatus = 'Refusé'; break;
        case '3': strStatus = 'Annulé'; break;
    }
    return strStatus;
}

function CdaCommOpenClaimReversPopup()
{
    if (globCdaTransHistSelectedData)
    {
        //if (CdaCommIsClaimReversPossible()) {
        if (true) {
            modCdaClaimReversConfirm();
        }
        else {
            modMessage('CDANET', 'Il est impossible d\'annuler la transaction. Le délai de 24 heure est dépassé.');
        }
        
    }
}

function CdaCommSendClaimReversRequest()
{
    globCdanetTranscode = '2';
    if (globCdaTransHistSelectedData[10] == '02')
    {
        CdaV2SendRequestToCdaNet();
    }
    else if (globCdaTransHistSelectedData[10] == '04')
    {
        CdaV4SendRequestToCdaNet();
    }
}

function CdaCommReSendClaimRequest() {
    var strRequest = globCdaTransHistSelectedData[13];
    if (strRequest)
    {
        var transCode = parseInt(globCdaTransHistSelectedData[13].substring(20, 22)).toString();
        globCdanetTranscode = transCode;
        //get version number from request
        if (globCdaTransHistSelectedData[10] == '02') {
            CdaV2CallCDAService(strRequest);
        }
        else if (globCdaTransHistSelectedData[10] == '04') {
            CdaV4CallCDAService(strRequest);
        }
    }
    
}
//Returns false if Claim date more than 24 hours from now. Otherwise true;
function CdaCommIsClaimReversPossible()
{
    var res = false;
    var claimDate = globCdaTransHistSelectedData[7];
    try {
        var difHours = 0;
        var billDate = new Date(claimDate);
        var billTimeMSec = billDate.getTime();
        var currentTimeMSec = new Date().getTime();
        difHours = (currentTimeMSec - billTimeMSec) / (1000 * 60 * 60);
        if (difHours < 24) {
            res = true;
        }
    }
    catch (e) {
        res = false;
    }
    return res;
}

//Returns date of birth in format YYYYMMDD for givent ramqNo
function CdaCommGetDateOfBirthFromRamq(pRamqNo) {
    var currentYear = new Date().getFullYear();
    var century = Math.floor(currentYear / 100) * 100;

    var birthYear = parseInt(pRamqNo.substring(4, 6));
    birthYear += century;

    if (birthYear > currentYear) {
        birthYear -= 100;
    }

    var birthMonth = parseInt(pRamqNo.substring(6, 8));
    var birthDay = parseInt(pRamqNo.substring(8, 10));
    if (birthMonth >= 51) {
        birthMonth -= 50;
    }

    if (birthMonth < 10) birthMonth = '0' + birthMonth;
    if (birthDay < 10) birthDay = '0' + birthDay;

    return birthYear.toString() + birthMonth + birthDay.toString();

}

function CdaCommDisplayTransDetails()
{
    var responseLine = globCdaTransHistSelectedData[12];
    var transactionLine = responseLine.split(',').slice(3); // extract string after 3th comma
    var respMessage = '';
    var versionNumber = globCdaTransHistSelectedData[10];
    if (versionNumber == '02') {
        var cdaRespObj = CdaV2ReadResponse(transactionLine);
        respMessage = CdaV2CreateRespMessage(cdaRespObj, transactionLine);
    }
    else if (versionNumber == '04') {
        var cdaRespObj = CdaV4ReadResponse(transactionLine);
        respMessage = CdaV4CreateRespMessage(cdaRespObj, transactionLine);
    }
    //var message = respMessage.replace(/\n/g, '<br/>');
    var txtArea = document.getElementById('txtCdaTransDetails');
    txtArea.innerHTML = respMessage;
}

// Returns json object that contains french definition for DataTable's labels.
function CdaCommTranslateDataTable() {
    var jsonTransl = {};
    if (globLang === 'fr') {
        jsonTransl =
            {
                "sProcessing": "Traitement en cours...",
                "sSearch": "Rechercher&nbsp;:",
                "sLengthMenu": "Afficher _MENU_ &eacute;l&eacute;ments",
                "sInfo": "Affichage de l'&eacute;l&eacute;ment _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
                "sInfoEmpty": "Affichage de l'&eacute;l&eacute;ment 0 &agrave; 0 sur 0 &eacute;l&eacute;ment",
                "sInfoFiltered": "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
                "sInfoPostFix": "",
                "sLoadingRecords": "Chargement en cours...",
                "sZeroRecords": "Aucun &eacute;l&eacute;ment &agrave; afficher",
                "sEmptyTable": "Aucune donn&eacute;e disponible dans le tableau",
                "oPaginate": {
                    "sFirst": "Premier",
                    "sPrevious": "Pr&eacute;c&eacute;dent",
                    "sNext": 'Suivant',
                    "sLast": "Dernier"
                },
                "oAria": {
                    "sSortAscending": ": activer pour trier la colonne par ordre croissant",
                    "sSortDescending": ": activer pour trier la colonne par ordre d&eacute;croissant"
                }
            };
    }

    return jsonTransl;
}