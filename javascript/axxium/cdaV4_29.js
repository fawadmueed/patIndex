var globCdaReq4Obj = {};

function CdaV4SendRequestToCdaNet(pTransType) {
    var strRequest = CdaV4CreateRequestString(pTransType);
    // TODO: call WebService and send strRequest as a parameter.
}


function CdaV4CreateRequestString(transactionType) {
    var strRequest = "";
    switch (transactionType) {
        case "Eligibility":
            {
                strRequest = CdaV4CreateEligibilityRequest();
            }
            break;
        case "Claim":
            {
                strRequest = CdaV4CreateClaimRequest();
            }
            break;
        case "ClaimReversal":
            {
                strRequest = CdaV4CreateClaimReversalRequest();
            }
            break;
        case "Predetermination":
            {
                strRequest = CdaV4CreatePredeterminationRequest();
            }
            break;
        case "Outstanding":
            {
                strRequest = CdaV4CreateOutstandingRequest();
            }
            break;
        case "Reconcilation":
            {
                strRequest = CdaV4CreateReconcilationRequest();
            }
            break;
        default:
            {
                alert("Transaction Type is not correct!");
            }
    }
    return strRequest;
}

function CdaV4CreateEligibilityRequest() {
    var req = {};
    req = CdaV4PopulateEligibilityObj();

    return req;
}

function CdaV4CreateClaimRequest() {
    var res = "";
    var arrParam = CdaV4PopulateClaimObj();
    return res;
}

function CdaV4CreateClaimReversalRequest() {
    var res = "";
    var arrParam = PopulateClaimReversalObj();
    return res;
}

function CdaV4CreatePredeterminationRequest() {
    var res = "";
    var arrParam = PopulatePredeterminationObj();
    return res;
}

function CdaV4CreateOutstandingRequest() {
    var res = "";
    var arrParam = PopulateOutstandingObj();
    return res;
}

function CdaV4CreateReconcilationRequest() {
    var res = "";
    var arrParam = PopulateReconcilationObj();
    return res;
}

function CdaV4PopulateClaimArrV() {
    var myArray = { A0: '', A1: '', A2: '' };
    myArray['A0'] = 'hello';
    myArray['A1'] = 'bye';
    alert(myArray['A0']);
    return myArray;
}

//Converts string to char array with given length. If string is shorter than length, adds extra spaces after.
function CdaV4FillArray(filla, size, fillstring)//filla: array of char; size: integer; fillstring:string
{
    var resArr = [];
    var fillstringArr = fillstring.split('');
    for (var i = 0; i < size - 1; i++) {
        if (i >= fillstring.length) {
            resArr[i] = ' ';
        }
        else {
            resArr[i] = fillstringArr[i];
        }
    }
    return resArr;
}

function CdaV4Topage850(pString) {
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

function CdaV4Frompage850(pString) {
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


function CDAV4FormatField(pValue, pFormatType, pRequiredLength)
{
    //convert input value to string.
    //var v = String(pValue);
    var v = pValue;
    var res = '';

    switch (pFormatType) {
        /*
        Numeric. Only ASCII digits are allowed in a field of this type. If a value is not present, fill with zeros. 
        Right-justify and fill with ASCII zeros on the left. 
        All date fields are of type numeric and formatted as YYYYMMDD.
        */
        case 'N':
            {
                if (!v)
                    v = '0';
                
                if (!Number.isInteger(Number(v))) {
                    alert('adoV4FormatField Error: value is not an integer.');
                }
                else {
                    var len = v.length;
                    if (len < pRequiredLength)
                    {
                        //Fill with zeros.
                        var lenDif = pRequiredLength - len;
                        for (var i = 0; i < lenDif; i++)
                        {
                            res += '0';
                        }
                        res += v;
                    }
                    else if (len == pRequiredLength)
                    {
                        res = v;
                    }
                    else if (len > pRequiredLength)
                    {
                        alert('adoV4FormatField Error: Value is longer than required.');
                    }
                }
                
            }
            break;

            /*
            Alphabetic. Only ASCII upper and lower case ALPHABETIC characters including apostrophe ('), dash (-) and comma (,) are allowed.
            Left-justify and pad with blanks on the right. If only specific values are permitted, e.g., Y, N, D, M; then the upper case must be used.
            */
            //TODO: Check if containg extended characters, character codes 128-255.
        case 'A':

            //as above but allows for the inclusion of extended characters, character codes 128-255.
        case 'AE':
            {
                if (!v)
                    v = '';
                //Check if all characters are alphabetical
                if (/^[a-zA-Z]+$/.test(v) || v=='') {
                    var len = v.length;
                    if (len < pRequiredLength) {
                        //Fill with spaces on the right.
                        var lenDif = pRequiredLength - len;
                        res = v;
                        for (var i = 0; i < lenDif; i++) {
                            res += ' ';
                        }
                    }
                    else if (len == pRequiredLength) {
                        res = v;
                    }
                    else if (len > pRequiredLength) {
                        alert('adoV4FormatField Error: Value is longer than required.');
                    }
                }
                else
                    alert('adoV4FormatField Error: Value contains not alphabetical caracters.');
            }
            break;

            //Alphanumeric. Any printable ASCII character is allowed. Left-justify and pad with spaces on the right.
            //TODO: check if contains extended characters, character codes 128 - 255.
        case 'AN':
            {
                if (!v)
                    v = '';
                var len = v.length;
                if (len < pRequiredLength) {
                    //Fill with spaces on the right.
                    var lenDif = pRequiredLength - len;
                    res = v;
                    for (var i = 0; i < lenDif; i++) {
                        res += ' ';
                    }
                }
                else if (len == pRequiredLength) {
                    res = v;
                }
                else if (len > pRequiredLength) {
                    alert('adoV4FormatField Error: Value is longer than required.');
                }
            }
            break;

            //as above but allows for the inclusion of extended characters, character codes 128 - 255.
        case 'AEN':
            {
                if (!v)
                    v = '';
                var len = v.length;
                if (len < pRequiredLength) {
                    //Fill with spaces on the right.
                    var lenDif = pRequiredLength - len;
                    res = v;
                    for (var i = 0; i < lenDif; i++) {
                        res += ' ';
                    }
                }
                else if (len == pRequiredLength) {
                    res = v;
                }
                else if (len > pRequiredLength) {
                    alert('adoV4FormatField Error: Value is longer than required.');
                }
            }
            break;

            /*
            Decimal amount. All decimal amount fields have implied decimal points two digits from the right.
            This field format is generally used for storing dollar amounts. Right-justify and zero fill on the left.
            */
        case 'D':
            {
                if (!v)
                    v = '0.0';
                if (isNaN(Number(v)))
                {
                    alert('adoV4FormatField Error: value is not a number.');
                }
                else {
                    v = parseFloat(v).toFixed(2).toString();
                    var len = v.length;
                    if (len < pRequiredLength) {
                        //Fill with zeros.
                        var lenDif = pRequiredLength - len;
                        for (var i = 0; i < lenDif; i++) {
                            res += '0';
                        }
                        res += v;
                    }
                    else if (len == pRequiredLength) {
                        res = v;
                    }
                    else if (len > pRequiredLength) {
                        alert('adoV4FormatField Error: Value is longer than required.');
                    }
                }

              }
            break;
        default:
            {
                alert("adoV4FormatField Error: Format Type is not correct.");
            }
    }
    return res;
}

//Returns an object with All formated fields;
function CDAV4GetFormatedValues()
{
    var jsonFromServer = '{"A01":"test3","A02":"25","A03":"46"}';
    var obj = JSON.parse(jsonFromServer);
    var objRes = {};
    objRes.A06 = CDAV4FormatField(obj.A06, 'D', 15);
    objRes.A02 = CDAV4FormatField(obj.A02, 'N', 12);
    objRes.A03 = CDAV4FormatField(obj.A03, 'D', 12);
    objRes.A04 = CDAV4FormatField(obj.A04, 'A', 12);

    return "OK";
}



