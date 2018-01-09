var globCdanetTranscode = '1'; //'Claim';

function CdaCommSendToSecondIns()
{ }

function CdaCommOpenCASPopup()
{ }

function CdaCommSendToCAS()
{ }

function CdaCommShowResp(pResp)
{
    var objRespMessage = {};

    
    var lastName = (globVisionRData && globVisionRData.NomPers) ? globVisionRData.NomPers : '';
    var firstName = (globVisionRData && globVisionRData.PrePers) ? globVisionRData.PrePers : '';
    var insurance = (globVisionRData && globVisionRData.InsTypeList && globVisionRData.InsTypeList.length > 0) ? globVisionRData.InsTypeList[0] : '';
    var noSequence = (pResp.a02) ? pResp.a02 : '';
    var respCode = (pResp.a04) ? pResp.a04 : '';


    $('#cda_resp_transcode').val(globCdaV2TransType);
    $('#cda_resp_patient').val(lastName + ' ' + firstName);
    $('#cda_resp_assur').val(insurance);
    $('#cda_resp_no_seq').val(noSequence);
    $('#cda_resp_cod_resp').val(respCode);
    $('#cda_resp_mailbox').val();
    $('#cda_resp_demand_pamnt').val();
    $('#cda_resp_no_ref').val();
    $('#cda_resp_no_confirm').val();
    $('#cda_resp_montant_reclaim').val();
    $('#cda_resp_montant_deduct').val();
    $('#cda_resp_montant_prsntation').val();
    $('#cda_resp_montant_adjust').val();
    $('#cda_resp_mont_rembour').val();
    $('#cda_resp_date_pamnt').val();
    $('#cda_resp_date_pamnt_not').val();
    $('#cda_resp_payabl').val();
    $('#cda_resp_notes').val();
    modResponseCDANET();
}

//Convert DateFrom YYYYMMDD to yyyy-mm-dd. Return current date if conversion impossible.
function CdaCommConvertDate(pStr)
{
    var formatedDate;
    if (pStr == '00000000') {
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
