var globCdaReq4Obj = {};

function CdaV4SendRequestToCdaNet(pTransType) {
    var strRequest = CdaV4CreateRequestString(pTransType);
    // TODO: call WebService and send strRequest as a parameter.
}

//Returns request string depends on transaction type.
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
        case "COBClaim":
            {
                strRequest = CdaV4CreateCOBClaimRequest();
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
        case "SumReconcilation":
            {
                strRequest = CdaV4CreateSumReconcilationRequest();
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
    var res = '';
    var req = CdaV4PopulateEligibilityObj();
    res += req.a01 + req.a02 + req.a03 + req.a04 + req.a05 + req.a06 + req.a10 + req.a07 + req.a09;
    res += req.b01 + req.b02 + req.b03;
    res += req.c01 + req.c11 + req.c02 + req.c17 + req.c03 + req.c04 + req.c05 + req.c06 + req.c07 + req.c08 + req.c09 + req.c12 + req.c18 + req.c16;
    res += req.d01 + req.d02 + req.d03 + req.d04 + req.d10 + req.d11
    res += req.c19;
    return res;
}

function CdaV4CreateClaimRequest() {
    var res = "";
    var req = CdaV4PopulateClaimObj();
    res += req.a01 + req.a02 + req.a03 + req.a04 + req.a05 + req.a06 + req.a10 + req.a07 + req.a08 + req.a09;
    res += req.b01 + req.b02 + req.b03 + req.b04 + req.b05 + req.b06;
    res += req.c01 + req.c11 + req.c02 + req.c17 + req.c03 + req.c04 + req.c05 + req.c06 + req.c07 + req.c08 + req.c09 + req.c10 + req.c12 + req.c18;
    res += req.d01 + req.d02 + req.d03 + req.d04 + req.d05 + req.d06 + req.d07 + req.d08 + req.d09 + req.d10 + req.d11;
    res += req.e18 + req.e20;
    res += req.f06 + req.f22;

    if (req.e20 == 1) 
    {
        res += req.e19 + req.e01 + req.e02 + req.e05 + req.e03 + req.e17 + req.e06 + req.e04 + req.e08 + req.e09 + req.e10 + req.e11 + req.e12 + req.e13 + req.e14 + req.e15 + req.e16 + req.e07
    }
    res += req.f01 + req.f02 + req.f03 + req.f15 + req.f04 + req.f18 + req.f19 + req.f05 + req.f20 + req.f21;

    if (req.f22 > 0) //Extracted Teeth Count //TODO: check if convertion required.
    {
        for (var i = 0; i < req.f22; i++)
        {
            res += req.f23[i] + req.f24[i]; //Extracted Tooth Number, Extraction Date
        }
    }

    for (var i = 0; i < req.f06; i++) //Number of Procedures Performed
    {
        res += req.f07[i] + req.f08[i] + req.f09[i] + req.f10[i] + req.f11[i] + req.f12[i] + req.f34[i] + req.f13[i] + req.f35[i] + req.f36[i] + req.f16[i] + req.f17[i];
    }

    if (req.c18 == 1)
    {
        res += req.c19;
    }

    return res;
}

function CdaV4CreateCOBClaimRequest() {
    var res = "";
    var req = CdaV4PopulateCOBClaimObj();
    res += req.a01 + req.a02 + req.a03 + req.a04 + req.a05 + req.a06 + req.a10 + req.a07 + req.a08 + req.a09;
    res += req.b01 + req.b02 + req.b03 + req.b04 + req.b05 + req.b06;
    res += req.c01 + req.c11 + req.c02 + req.c17 + req.c03 + req.c04 + req.c05 + req.c06 + req.c07 + req.c08 + req.c09 + req.c10 + req.c12 + req.c18;
    res += req.d01 + req.d02 + req.d03 + req.d04 + req.d05 + req.d06 + req.d07 + req.d08 + req.d09 + req.d10 + req.d11;
    res += req.e18 + req.e20;
    res += req.f06 + req.f22;
    res += req.g39;
    if (req.e20 == 1)
    {
        res += req.e19 + req.e01 + req.e02 + req.e05 + req.e03 + req.e17 + req.e06 + req.e04 + req.e08 + req.e09 + req.e09 + req.e10 + req.e11 + req.e12 + req.e13 + req.e14 + req.e15 + req.e16 + req.e07;
    }

    res += req.f01 + req.f02 + req.f03 + req.f15 + req.f04 + req.f18 + req.f19 + req.f05 + req.f20 + req.f21;
    if (req.f22 > 0) //Extracted Teeth Count //TODO: check if convertion required.
    {
        for (var i = 0; i < req.f22; i++)
        {
            res += req.f23[i] + req.f24[i]; //Extracted Tooth Number, Extraction Date
        }
    }
    for (var i = 0; i < req.f06; i++)
    {
        res += req.f07[i] + req.f08[i] + req.f09[i] + req.f10[i] + req.f11[i] + req.f12[i] + req.f34[i] + req.f34[i] + req.f35[i] + req.f36[i] + req.f16[i] + req.f17[i];
    }
    
    if (req.c18 == 1)
    {
        res += req.c19;
    }

    res += req.eob;
    
    return res;
}

function CdaV4CreateClaimReversalRequest() {
    var res = "";
    var req = PopulateClaimReversalObj();

    res += req.a01 + req.a02 + req.a03 + req.a04 + req.a05 + req.a06 + req.a10 + req.a07 + req.a09;
    res += req.b01 + req.b02 + req.b03 + req.b04;
    res += req.c01 + req.c11 + req.c02 + req.c03;
    res += req.d02 + req.d03 + req.d04 + '000000';
    res += req.g01;
    return res;
}

function CdaV4CreatePredeterminationRequest() {
    var res = "";
    var req = PopulatePredeterminationObj();
    res += req.a01 + req.a02 + req.a03 + req.a04 + req.a05 + req.a06 + req.a10 + req.a07 + req.a08 + req.a09;
    res += req.b01 + req.b02 + req.b03 + req.b04 + req.b05 + req.b06;
    res += req.c01 + req.c11 + req.c02 + req.c17 + req.c03 + req.c04 + req.c05 + req.c06 + req.c07 + req.c08 + req.c09 + req.c10 + req.c12 + req.c18;
    res += req.d01 + req.d02 + req.d03 + req.d04 + req.d05 + req.d06 + req.d07 + req.d08 + req.d09 + req.d10 + req.d11;
    res += req.e18 + req.e20;
    res += req.f06 + req.f22 + req.f25;
    if (req.e20 == 1)
    {
        res += req.e19 + req.e01 + req.e02 + req.e05 + req.e03 + req.e17 + req.e06 + req.e04 + req.e08 + req.e09 + req.e10 + req.e11 + req.e12 + req.e13 + req.e13 + req.e14 + req.e15 + req.e16 + req.e07;
    }
    res += req.f02 + req.f15 + req.f04 + req.f18 + req.f19 + req.f05 + req.f20 + req.f21;

    //Extracted Teeth Count //TODO: check if convertion required.
    //TODO: check if have to loop through array.
    if (req.f22 > 0)
    {
        res += req.f23[0] + req.f24[0];
    }

    res += req.g46 + req.g47;

    if (req.f25 == 1)//Orthodontic Record Flag
    {
        res += req.f37 + req.f26 + req.f27 + req.f28 + req.f29 + req.f30 + req.f31 + req.f32;
    }

    for (var i = 0; i < req.f06; i++)
    {
        res += req.f07[i] + req.f08[i] + req.f10[i] + req.f11[i] + req.f12[i] + req.f34[i] + req.f13[i] + req.f35[i] + req.f36[i] + req.f16[i] + req.f17[i];
    }

    if(req.c18 == 1)
    {
        res += req.c19;
    }

    return res;
}

function CdaV4CreateOutstandingRequest() {
    var res = "";
    var req = PopulateOutstandingObj();
    res += req.a01 + req.a02 + req.a03 + req.a04 + req.a05 + req.a06 + req.a10 + req.a07 + req.a09;
    res += req.b01 + req.b03;
    return res;
}

function CdaV4CreateReconcilationRequest() {
    var res = "";
    var req = PopulateReconcilationObj();
    res += req.a01 + req.a02 + req.a03 + req.a04 + req.a05 + req.a06 + req.a10 + req.a07 + req.a09;
    res += req.b01 + req.b02 + req.b03 + req.b04;
    res += req.f33 + req.f38;
    return res;
}

function CdaV4CreateSumReconcilationRequest() {
    var res = "";
    var req = PopulateSumReconcilationObj();
    res += req.a01 + req.a02 + req.a03 + req.a04 + req.a05 + req.a06 + req.a10 + req.a07 + req.a09;
    res += req.b01 + req.b02;
    res += req.f33;
    
    return res;
}

//function CdaV4PopulateClaimArrV() {
//    var myArray = { A0: '', A1: '', A2: '' };
//    myArray['A0'] = 'hello';
//    myArray['A1'] = 'bye';
//    alert(myArray['A0']);
//    return myArray;
//}

////Converts string to char array with given length. If string is shorter than length, adds extra spaces after.
//function CdaV4FillArray(filla, size, fillstring)//filla: array of char; size: integer; fillstring:string
//{
//    var resArr = [];
//    var fillstringArr = fillstring.split('');
//    for (var i = 0; i < size - 1; i++) {
//        if (i >= fillstring.length) {
//            resArr[i] = ' ';
//        }
//        else {
//            resArr[i] = fillstringArr[i];
//        }
//    }
//    return resArr;
//}

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
    var v = String(pValue);
    
    var res = '';

    switch (pFormatType) {
        /*
        Numeric. Only ASCII digits are allowed in a field of this type. If a value is not present, fill with zeros. 
        Right-justify add fill with ASCII zeros on the left. 
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
                        var asciiZero = String.fromCharCode(48);
                        //Fill with zeros.
                        var i = 0;
                        while (i < pRequiredLength)
                        {
                            v = asciiZero + v;
                            i++;
                        }
                        res = v;
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
        case 'A':

            //as above but allows for the inclusion of extended characters, character codes 128-255.
        case 'AE':
            {
                if (!v)
                    v = '';
                //Convert to page850
                v = CdaV4Topage850(v);
                v = v.trim(); //remove spaces

                //Check if all characters are alphabetical
                if (/^[a-zA-Z]+$/.test(v) || v=='') {
                    var len = v.length;
                    if (len < pRequiredLength) {
                        //Fill with spaces on the right.
                        var i = 0;
                        while (i < pRequiredLength)
                        {
                            v += ' ';
                        }
                        res = v;
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
            //as above but allows for the inclusion of extended characters, character codes 128 - 255.
        case 'AEN':
            {
                if (!v)
                    v = '';
                //Convert to page850
                v = CdaV4Topage850(v);
                v = v.trim(); //remove spaces.

                var len = v.length;
                if (len < pRequiredLength) {
                    //Fill with spaces on the right.
                    var i = 0;
                    while (i < pRequiredLength) {
                        v += ' ';
                    }
                    res = v;
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
                    v = '0.00';
                if (isNaN(Number(v)))
                {
                    alert('adoV4FormatField Error: value is not a number.');
                }
                else {
                    v = parseFloat(v).toFixed(2).toString();
                    v = v.replace('.', '');
                    v = v.replace(',', '');

                    var len = v.length;
                    if (len < pRequiredLength) {
                        var asciiZero = String.fromCharCode(48);
                        //Fill with zeros.
                        for (var i = len; i < pRequiredLength;i++) {
                            v = asciiZero + v;
                        }
                        res = v;
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

//============================================= Populate request objects =============================================
function CdaV4PopulateClaimObj()
{
    var obj = {};
    var objDataFromDB = daV4GetDataFromDBForClaimRequest();
    var objDataFromUI = CdaV4GetDataFromUI();

    
    //A Transaction Header
    obj.a01 = CDAV4FormatField(objDataFromDB.a01, 'AN', 12); //Transaction Prefix
    obj.a02 = CDAV4FormatField(objDataFromDB.a02, 'N', 6); //Office Sequence Number
    obj.a03 = CDAV4FormatField(objDataFromDB.a03, 'N', 2); //Format Version Number
    obj.a04 = CDAV4FormatField(objDataFromDB.a04, 'N', 2); //Transaction Code
    obj.a05 = CDAV4FormatField(objDataFromDB.a05, 'N', 6); //Carrier Identification Number
    obj.a06 = CDAV4FormatField(objDataFromDB.a06, 'AN', 3); //Software System ID
    obj.a10 = CDAV4FormatField(objDataFromDB.a10, 'N', 1); //Encryption Method
    obj.a07 = CDAV4FormatField(objDataFromDB.a07, 'N', 5); //Message Length
    obj.a08 = CDAV4FormatField(objDataFromDB.a08, 'AN', 1); //Materials Forwarded
    obj.a09 = CDAV4FormatField(objDataFromDB.a09, 'N', 5); //Carrier Transaction Counter

    //B Provider Identification
    obj.b01 = CDAV4FormatField(objDataFromDB.b01, 'AN', 9); //CDA Provider Number
    obj.b02 = CDAV4FormatField(objDataFromDB.b02, 'AN', 4); // Provider Office Number
    obj.b03 = CDAV4FormatField(objDataFromDB.b03, 'AN', 9); //Billing Provider Number
    obj.b04 = CDAV4FormatField(objDataFromDB.b04, 'AN', 4); //Billing Office Number
    obj.b05 = CDAV4FormatField(objDataFromDB.b05, 'AN', 10); //Referring Provider
    obj.b06 = CDAV4FormatField(objDataFromDB.b06, 'N', 2); //Referral Reason

    //C Primary Subscriber & Patient Identification
    obj.c01 = CDAV4FormatField(objDataFromDB.c01, 'AN', 12); //Primary Policy/Plan Number
    obj.c11 = CDAV4FormatField(objDataFromDB.c11, 'AN', 10); //Primary Division/Section Number
    obj.c02 = CDAV4FormatField(objDataFromDB.c02, 'AN', 12); //Subscriber Identification Number
    obj.c17 = CDAV4FormatField(objDataFromDB.c17, 'N', 2); //Primary Dependant Code
    obj.c03 = CDAV4FormatField(objDataFromDB.c03, 'N', 1); //Relationship Code
    obj.c04 = CDAV4FormatField(objDataFromDB.c04, 'A', 1); //Patient's Sex
    obj.c05 = CDAV4FormatField(objDataFromDB.c05, 'N', 8); //Patient's Birthday
    obj.c06 = CDAV4FormatField(objDataFromDB.c06, 'AE', 25); //Patient's Last Name
    obj.c07 = CDAV4FormatField(objDataFromDB.c07, 'AE', 15); //Patient's First Name
    obj.c08 = CDAV4FormatField(objDataFromDB.c08, 'AE', 1); //Patient's Middle Initial
    obj.c09 = CDAV4FormatField(objDataFromDB.c09, 'N', 1); //Eligibility Exception Code
    obj.c10 = CDAV4FormatField(objDataFromDB.c10, 'AEN', 25); //Name of School
    obj.c12 = CDAV4FormatField(objDataFromDB.c12, 'A', 1); //Plan Flag
    obj.c18 = CDAV4FormatField(objDataFromDB.c18, 'N', 1); //Plan Record Count

    //D Relevant Subscriber's Name & Address
    obj.d01 = CDAV4FormatField(objDataFromDB.d01, 'N', 8); //Subscriber's Birthday
    obj.d02 = CDAV4FormatField(objDataFromDB.d02, 'AE', 25); //Subscriber's Last Name
    obj.d03 = CDAV4FormatField(objDataFromDB.d03, 'AE', 15); //Subscriber's First Name
    obj.d04 = CDAV4FormatField(objDataFromDB.d04, 'AE', 1); //Subscriber's Middle Initial
    obj.d05 = CDAV4FormatField(objDataFromDB.d05, 'AEN', 30); //Subscriber's Address Line 1
    obj.d06 = CDAV4FormatField(objDataFromDB.d06, 'AEN', 30); //Subscriber's Address Line 2
    obj.d07 = CDAV4FormatField(objDataFromDB.d07, 'AEN', 20); //Subscriber's City
    obj.d08 = CDAV4FormatField(objDataFromDB.d08, 'A', 2); //Subscriber's Province/State
    obj.d09 = CDAV4FormatField(objDataFromDB.d09, 'AN', 9); //Subscriber's Postal/Zip Code
    obj.d10 = CDAV4FormatField(objDataFromDB.d10, 'A', 1); //Language of the Insured
    obj.d11 = CDAV4FormatField(objDataFromDB.d11, 'N', 2); //Card Sequence/Version Number

    //E Secondary Carrier Information
    
    obj.e18 = CDAV4FormatField(objDataFromDB.e18, 'A', 1); //Secondary Coverage Flag
    obj.e20 = CDAV4FormatField(objDataFromDB.e20, 'N', 1); //Secondary Record Count

    //F Procedure Information
    obj.f06 = CDAV4FormatField(objDataFromDB.f06, 'N', 1); //Number of Procedures Performed //TODO: where from get this data?
    obj.f22 = CDAV4FormatField(objDataFromDB.f22, 'N', 2); //Extracted Teeth Count //TODO: where from get this data?

    //If E20 = 1 then the following Secondary Carrier fields would appear (E19 to E07)
    obj.e19 = CDAV4FormatField(objDataFromDB.e19, 'N', 6); //Secondary Carrier Transaction Counter
    obj.e01 = CDAV4FormatField(objDataFromDB.e01, 'N', 6); //Secondary Carrier Id Number
    obj.e02 = CDAV4FormatField(objDataFromDB.e02, 'AN', 12); //Secondary Policy/Plan Number
    obj.e05 = CDAV4FormatField(objDataFromDB.e05, 'AN', 10); //Secondary Division/Section Number
    obj.e03 = CDAV4FormatField(objDataFromDB.e03, 'AN', 12); //Secondary Plan Subscriber ID
    obj.e17 = CDAV4FormatField(objDataFromDB.e17, 'N', 2); //Secondary Dependant Code
    obj.e06 = CDAV4FormatField(objDataFromDB.e06, 'N', 1); //Secondary Relationship Code
    obj.e04 = CDAV4FormatField(objDataFromDB.e04, 'N', 8); //Secondary Subscriber's Birthday
    obj.e08 = CDAV4FormatField(objDataFromDB.e08, 'AE', 25); //Secondary Subscriber's Last Name
    obj.e09 = CDAV4FormatField(objDataFromDB.e09, 'AE', 15); //Secondary Subscriber's First Name
    obj.e10 = CDAV4FormatField(objDataFromDB.e10, 'AE', 1); //Secondary Subscriber's Middle Initial
    obj.e11 = CDAV4FormatField(objDataFromDB.e11, 'AEN', 30); //Secondary Subscriber's Address Line 1
    obj.e12 = CDAV4FormatField(objDataFromDB.e12, 'AEN', 30); //Secondary Subscriber's Address Line 2
    obj.e13 = CDAV4FormatField(objDataFromDB.e13, 'AEN', 20); //Secondary Subscriber's City
    obj.e14 = CDAV4FormatField(objDataFromDB.e14, 'A', 2); //Secondary Subscriber's Province/State
    obj.e15 = CDAV4FormatField(objDataFromDB.e15, 'AN', 9); //Secondary Subscriber's Postal/Zip Code
    obj.e16 = CDAV4FormatField(objDataFromDB.e16, 'A', 1); //Secondary Language
    obj.e07 = CDAV4FormatField(objDataFromDB.e07, 'N', 2); //Secondary Card Sequence/Version Number
    //End of the Secondary Subscriber fields. The field positions to follow assume that E20 = 1.

    //F Procedure Information (continue)
    obj.f01 = CDAV4FormatField(objDataFromDB.f01, 'N', 1); //Payee Code
    obj.f02 = CDAV4FormatField(objDataFromDB.f02, 'N', 8); //Accident Date
    obj.f03 = CDAV4FormatField(objDataFromDB.f03, 'AN', 14); //Predetermination Number
    obj.f15 = CDAV4FormatField(objDataFromDB.f15, 'A', 1); //Initial Placement Upper
    obj.f04 = CDAV4FormatField(objDataFromDB.f04, 'N', 8); //Date of Initial Placement Upper
    obj.f18 = CDAV4FormatField(objDataFromDB.f18, 'A', 1); //Initial Placement Lower
    obj.f19 = CDAV4FormatField(objDataFromDB.f19, 'N', 8); //Date of Initial Placement Lower
    obj.f05 = CDAV4FormatField(objDataFromDB.f05, 'A', 1); //Treatment Required for Orthodontic Purposes
    obj.f20 = CDAV4FormatField(objDataFromDB.f20, 'N', 1); //Maxillary Prosthesis Material
    obj.f21 = CDAV4FormatField(objDataFromDB.f21, 'N', 1); //Mandibular Prosthesis Material

    for (var i = 0; i < obj.f22; i++)
    {
        obj.f23[i] = CDAV4FormatField(objDataFromDB.f23[i], 'N', 2); //Extracted Tooth Number
        obj.f24[i] = CDAV4FormatField(objDataFromDB.f24[i], 'N', 8); //Extraction Date
    }

    for (var i = 0; i<arrGrilleDeFacturation.length; i++)
    {
        if (arrGrilleDeFacturation[i].Type != 'AMQ' && arrGrilleDeFacturation[i].Type != 'BES' && arrGrilleDeFacturation[i].Type != 'HOP')
        {
            obj.f07[i] = CDAV4FormatField(i+1, 'N', 1); //Procedure Line Number
            obj.f08[i] = CDAV4FormatField(arrGrilleDeFacturation[i].Code, 'AN', 5); //Procedure Code
            obj.f09[i] = CDAV4FormatField(CDAV4GetCurrentDate(), 'N', 8); //Date of Service
            obj.f10[i] = CDAV4FormatField(arrGrilleDeFacturation[i].Dent, 'N', 2); //International Tooth, Sextant, Quad or Arch
            obj.f11[i] = CDAV4FormatField(arrGrilleDeFacturation[i].Surface, 'A', 5); //Tooth Surface

            obj.f12[i] = CDAV4FormatField(arrGrilleDeFacturation[i].Honoraires, 'D', 6); //Dentist's Fee Claimed
            obj.f34[i] = CDAV4FormatField('', 'AN', 5); //Lab Procedure Code # 1  //TODO:
            obj.f13[i] = CDAV4FormatField(arrGrilleDeFacturation[i].Frais, 'D', 6); //Lab Procedure Fee # 1
            obj.f35[i] = CDAV4FormatField('', 'AN', 5); //Lab Procedure Code # 2 //TODO:
            obj.f36[i] = CDAV4FormatField('', 'D', 6); //Lab Procedure Fee # 2 //TODO:
            obj.f16[i] = CDAV4FormatField('', 'A', 5); //Procedure Type Codes
            obj.f17[i] = CDAV4FormatField(00, 'N', 2); //Remarks Code
            
        }
    }

    obj.c19 = CDAV4FormatField(objDataFromDB.c19, 'AN', 1); //Plan Record

    return obj;
}

function CdaV4GetDataFromDBForClaimRequest()
{
    var obj = {};
    return obj;
}

function CdaV4GetDataFromUI()
{
    var obj = {};
    return obj;
}

function CdaV4ReadResponse(pResponse)
{
    var res = {};
    var transCode = '';
    if(pResponse)
    {
        respType = pResponse.substring(20, 23);
        
        switch (transCode) {
            case '18':
                res = CdaV4ParseEligibilityResp(pResponse);
                break;
            case '11':
                res = CdaV4ParseClaimAcknResp(pResponse);
                break;
            case '21':
                res = CdaV4ParseEOBResp(pResponse);
                break;
            case '19':
                res = CdaV4ParseAttachmentResp(pResponse);
                break;
            case '12':
                res = CdaV4ParseClaimReversResp(pResponse);
                break;
            case '13':
                res = CdaV4ParsePredetAcknResp(pResponse);
                break;
            case '23':
                res = CdaV4ParsePredetEOBResp(pResponse);
                break;
            case '14':
                res = CdaV4ParseOutstandAcknResp(pResponse);
                break;
            case '24':
                res = CdaV4ParseOutstandEmailResp(pResponse);
                break;
            case '16':
                res = CdaV4ParseReconsilResp(pResponse);
                break;
            case '15':
                res = CdaV4ParseSummReconsilResp(pResponse);
                break;

        }
    }
    return res;
}

function CdaV4ParseEligibilityResp(pResponse)
{
    var res = {};
    res.a01 = pResponse.substring(0, 12); //Transaction Prefix
    res.a02 = parseInt(pResponse.substring(12, 18));//Office Sequence Number
    res.a03 = parseInt(pResponse.substring(18, 20));//Format Version Number
    res.a04 = parseInt(pResponse.substring(20, 22));//Transaction Code
    res.a05 = parseInt(pResponse.substring(22, 28));//Carrier Identification Number
    res.a07 = parseInt(pResponse.substring(28, 33));//Message Length
    res.a11 = pResponse.substring(33, 34);//Mailbox Indicator

    res.b01 = pResponse.substring(34, 43);//CDA Provider Number
    res.b02 = pResponse.substring(43, 47);//Provider Office Number

    res.g01 = pResponse.substring(47, 61);//Transaction Reference Number
    res.g05 = pResponse.substring(61, 62);//Response Status
    res.g06 = parseInt(pResponse.substring(62, 64));//Number of Error Codes
    res.g07 = pResponse.substring(64, 139);//Disposition Message
    res.g31 = parseInt(pResponse.substring(139, 141));//Display Message Count
    res.g42 = parseInt(pResponse.substring(141, 143));//Form ID

    //Repeat for number of times specified by G06.
    var lastPos= 143;
    for(var i=0; i<res.g06; i++)
    {
        res.g08[i] = parseInt(pResponse.substring(lastPos, lastPos + 3));
        lastPos += 3;
    }

    //Repeat for number of times specified by G31
    for(var j = 0; j<res.g31; j++)
    {
        res.g32[i] = pResponse.substring(lastPos, lastPos + 75);
        lastPos += 75;
    }
    return res;
}


////Returns an object with All formated fields;
//function CDAV4GetFormatedValues()
//{
//    var jsonFromServer = '{"A01":"test3","A02":"25","A03":"46"}';
//    var obj = JSON.parse(jsonFromServer);
//    var objRes = {};
//    objRes.A06 = CDAV4FormatField(obj.A06, 'D', 15);
//    objRes.A02 = CDAV4FormatField(obj.A02, 'N', 12);
//    objRes.A03 = CDAV4FormatField(obj.A03, 'D', 12);
//    objRes.A04 = CDAV4FormatField(obj.A04, 'A', 12);

//    return "OK";
//}

//returns current date in "YYYYMMDD" format.
function CDAV4GetCurrentDate() {
    var date = '';
    var d = new Date();
    var y = d.getFullYear();
    var m = d.getMonth() + 1;
    var day = d.getDate();
    if (day < 10) day = '0' + day;
    if (m < 10) m = '0' + m;

    return y + m + day;
}





