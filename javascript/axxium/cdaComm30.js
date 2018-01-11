var globCdaNetAPIuri = 'http://ec2-52-38-58-195.us-west-2.compute.amazonaws.com/axxium/api/InsuranceWebApi/';
var globCdanetTranscode = '1'; //'Claim';
var globCdaDataFromDB;

function CdaCommSendToSecondIns()
{ }

function CdaCommOpenCASPopup()
{ }

function CdaCommSendToCAS()
{ }

function CdaCommShowResp(pRespMessage)
{
    var message = pRespMessage.replace(/\n/g, '<br/>');
    var div = document.getElementById('cdanet_response_div');

    div.innerHTML = '<p>' + message + '</p>'
    //while (div.firstChild) {
    //    div.removeChild(div.firstChild);
    //}

    

    //var para = document.createElement("p");
    //para.document.write(message);
    ////var node = document.createTextNode(message);
    //para.appendChild(node);

    
    //div.appendChild(para);
    modResponseCDANET();
}

//Convert DateFrom YYYYMMDD to yyyy-mm-dd. Return current date if conversion impossible.
function CdaCommConvertDate(pStr)
{
    var formatedDate;
    if (pStr == '00000000' || isNaN(pStr)) {
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
function CdaCommConvertDate(pStr) {
    var formatedDate;
    if (pStr == '00000000' || isNaN(pStr)) {
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
    var arrString;
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
    var temp = '';
    switch (p)
    {
        case '001': temp = '(001) Préfixe de transaction absent ou invalide '; break;
        case '002': temp = '(002) No. de demande ou de séquence absent ou invalide '; break;
        case '003': temp = '(003) No. de version absent ou invalide '; break;
        case '004': temp = '(004) Code de transaction absent ou invalide '; break;
        case '005': temp = '(005) No. d\'identification de l\'assureur absent ou invalide '; break;
        case '006': temp = '(006) No du logiciel dentaire absent ou invalide'; break;
        case '007': temp = '(007) No. du dentiste attribué par ACDQ absent ou invalide '; break;
        case '008': temp = '(008) No. de cabinet attribué par ACDQ absent ou invalide '; break;
        case '009': temp = '(009) No. de police ou régime(premier assureur) absent ou invalide '; break;
        case '010': temp = '(010) No. de section ou de division absent ou invalide '; break;
        case '011': temp = '(011) No. du titulaire de l\'assurance absent ou invalide '; break;
        case '012': temp = '(012) Code de lien de parenté absent ou invalide '; break;
        case '013': temp = '(013) Sexe du patient absent ou invalide '; break;
        case '014': temp = '(014) Date de naissance du patient absente ou invalide '; break;
        case '015': temp = '(015) Nom du patient absent '; break;
        case '016': temp = '(016) Prénom du patient absent '; break;
        case '017': temp = '(017) Code indiquant exception quant à l\'admissibilité absent ou invalide '; break;
        case '018': temp = '(018) Nom d\'établissement scolaire absent '; break;
        case '019': temp = '(019) Nom de famille du titulaire absent ou non conforme au dossier '; break;
        case '020': temp = '(020) Prénom de famille du titulaire absent ou non conforme au dossier '; break;
        case '021': temp = '(021) Adresse du titulaire de l\'assurance absente '; break;
        case '022': temp = '(022) Ville du titulaire de l\'assurance absente '; break;
        case '023': temp = '(023) Code postal du titulaire de l\'assurance absent ou invalide '; break;
        case '024': temp = '(024) Langue du titulaire de l\'assurance invalide '; break;
        case '025': temp = '(025) Date de naissance du titulaire de l\'assurance absente ou invalide '; break;
        case '026': temp = '(026) No. du second assureur invalide '; break;
        case '027': temp = '(027) No. de police ou régime(second assureur) absent ou invalide '; break;
        case '028': temp = '(028) No. de division ou section (second assureur)absent ou invalide '; break;
        case '029': temp = '(029) No. du titulaire(second assureur) absent ou invalide '; break;
        case '030': temp = '(030) Date de naissance du titulaire(second assureur) absente ou invalide '; break;
        case '031': temp = '(031) Demande doit être d\'abord soumise au second assureur(second assureur=premier assureur) '; break;
        case '032': temp = '(032) Destinataire du paiement absent ou invalide '; break;
        case '033': temp = '(033) Date de l\'accident invalide '; break;
        case '034': temp = '(034) Nombre d\'actes exécutés absent ou invalide '; break;
        case '035': temp = '(035) Code de l\'acte absent ou invalide '; break;
        case '036': temp = '(036) Date à laquelle l\'acte a été executé absente ou invalide '; break;
        case '037': temp = '(037) No. international de dent, de sextant, de quadrant ou site absent ou invalide '; break;
        case '038': temp = '(038) Surface de la dent absente ou invalide '; break;
        case '039': temp = '(039) Date de la mise en bouche initiale au maxillaire absente ou invalide '; break;
        case '040': temp = '(040) Réponse absente ou invalide :Le traitement est-il requis en vue de soins d\'orthodonthie?'; break;
        case '041': temp = '(041) Honoraires demandés par le dentiste absents ou invalides '; break;
        case '042': temp = '(042) Frais de laboratoire absents ou invalides '; break;
        case '043': temp = '(043) Unité de temps absente ou invalide '; break;
        case '044': temp = '(044) Longueur du message indiquée non identique à la longueur du message reçu'; break;
        case '045': temp = '(045) Indicateur de courrier électronique absent ou invalide '; break;
        case '046': temp = '(046) No. de référence de la demande de prestations absent ou invalide '; break;
        case '047': temp = '(047) Le dentiste n\'a pas accés au réseau ACDQ-CDANet'; break;
        case '048': temp = '(048) S.V.P. soummettre la demande manuellement'; break;
        case '049': temp = '(049) Pas de réponse en suspens provenant du réseau '; break;
        case '050': temp = '(050) No. de ligne d\'acte absent ou imvalide '; break;
        case '051': temp = '(051) No. du plan de traitement introuvable '; break;
        case '052': temp = '(052) Demande de prestations ou plan de traitement doit contenir au moins un acte'; break;
        case '053': temp = '(053) Province du titulaire absente ou invalide'; break;
        case '054': temp = '(054) No du titulaire sur refus non conforme à la demande originale '; break;
        case '055': temp = '(055) Anulation ne concerne pas la transaction du jour'; break;
        case '056': temp = '(056) Code de spécialité du dentiste non conforme au dossier '; break;
        case '057': temp = '(057) Réponse absente ou invalide :S\'agit-il de la mise en bouche initiale? '; break;
        case '058': temp = '(058) Nombre d\'actes non conforme au nombre indqué'; break;
        case '059': temp = '(059) Logiciel dentaire du cabinet non autorisé à transmette des transactions au réseau ACDQ-CDANet '; break;
        case '060': temp = '(060) L\'annulation ne peut pas être acceptée maintenant.Veuillez réessayer plus tard aujourd\'hui'; break;
        case '061': temp = '(061) Erreur du réseau.Veuillez recommencer '; break;
        case '062': temp = '(062) Numéro du dentiste bénéficiaire du paiement absent ou invalide '; break;
        case '063': temp = '(063) Numéro du cabinet bénéficiaire du paiement absent ou invalide '; break;
        case '064': temp = '(064) Dentiste ayant référé le patient absent ou invalide '; break;
        case '065': temp = '(065) Code indiquant motif de la recommandation absent ou invalide '; break;
        case '066': temp = '(066) Indicateur d\'un régime de soin absent ou invalide '; break;
        case '067': temp = '(067) Champs se rapportant au régime NNSA absents '; break;
        case '068': temp = '(068) Numéro de la bande absent ou invalide '; break;
        case '069': temp = '(069) Numéro de la famille absent ou invalide '; break;
        case '070': temp = '(070) Odontogramme des dents manquantes, absent ou invalide '; break;
        case '071': temp = '(071) Code indiquant parenté patient-titulaire(second assureur)absent ou invalide '; break;
        case '072': temp = '(072) Code indiquant type d\'acte absent ou invalide '; break;
        case '073': temp = '(073) Codes de remarques absentes ou invalides '; break;
        case '074': temp = '(074) Date à laquelle l\'acte a été éxécuté est une date ultérieure '; break;
        case '075': temp = '(075) Date à laquelle l\'acte a été éxécuté est au-delà d\'un an '; break;
        case '076': temp = '(076) Groupe non accepté par l\'EDI '; break;
        case '077': temp = '(077) Type d\'acte non couvert par l\'assureur '; break;
        case '078': temp = '(078) Veuillez soumettre plan de traitement manuellement '; break;
        case '079': temp = '(079) Duplicata d\'une demande de prestations '; break;
        case '080': temp = '(080) Compteur des transactions par assureur absent ou invalide '; break;
        case '081': temp = '(081) Date d\'admisibilité invalide '; break;
        case '082': temp = '(082) Numéro de séquence ou version de la carte invalide '; break;
        case '083': temp = '(083) Nom de famille du titulaire(second assureur)absent ou invalide '; break;
        case '084': temp = '(084) Prénom du titulaire (second assureur) absent ou invalide '; break;
        case '085': temp = '(085) Lettre initiale du second prénom du titulaire(second assureur) absente '; break;
        case '086': temp = '(086) Première ligne de l\'adresse du titulaire (second assureur) absente '; break;
        case '087': temp = '(087) Ville du titulaire (second assureur) absente '; break;
        case '088': temp = '(088) Province ou Etat du titulaire (second assureur) absent '; break;
        case '089': temp = '(089) Code postal ou zip du titulaire (second assureur) absent '; break;
        case '090': temp = '(090) Réponse absente ou invalide: S\'agit-il de la mise en bouche initiale à la mandibule? '; break;
        case '091': temp = '(091) Date de la mise en bouche initiale à la mandibule absente ou invalide '; break;
        case '092': temp = '(092) Matériau de la prothèse au maxillaire absent ou invalide '; break;
        case '093': temp = '(093) Matériau de la prothèse à la mandibule absent ou invalide '; break;
        case '094': temp = '(094) Nombre de dents extraites absent ou invalide '; break;
        case '095': temp = '(095) Numéro de la dent extraite absent ou invalide '; break;
        case '096': temp = '(096) Date de l\'extraction absente ou invalide '; break;
        case '097': temp = '(097) Décalage du rapprochement invalide '; break;
        case '098': temp = '(098) Code pour frais de laboratoire absent ou invalide '; break;
        case '099': temp = '(099) Code pour chiffrement invalide '; break;
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
