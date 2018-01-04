var globCdaReq2Obj = {};

function CdaV2SendRequestToCdaNet(pTransType, pG01) {
    var strRequest = CdaV2CreateRequestString(pTransType, pG01);
    // TODO: call WebService and send strRequest as a parameter.
}

//============================================= Create request string =============================================

//Returns request string depends on transaction type.
function CdaV2CreateRequestString(transactionType, pG01) {
    var strRequest = "";
    switch (transactionType) {
        case "Eligibility":
            {
                strRequest = CdaV2CreateEligibilityRequest();
            }
            break;
        case "Claim":
            {
                strRequest = CdaV2CreateClaimRequest();
            }
            break;
        case "ClaimReversal":
            {
                strRequest = CdaV2CreateClaimReversalRequest(pG01);
            }
            break;
        case "Predetermination":
            {
                strRequest = CdaV2CreatePredeterminationRequest();
            }
            break;
        case "PendedClaims":
            {
                strRequest = CdaV2CreatePendedClaimsRequest()();
            }
            break;
        default:
            {
                alert("Transaction Type is not correct!");
            }
    }
    return strRequest;
}

function CdaV2CreateEligibilityRequest() {
    var res = '';
    var req = CdaV2PopulateEligibilityObj();
    res += req.a01 + req.a02 + req.a03 + req.a04 + req.a05 + req.a06 + req.a07;
    res += req.b01 + req.b02;
    res += req.c01 + req.c11 + req.c02 +req.c03 + req.c04 + req.c05 + req.c06 + req.c07 + req.c08 + req.c09;
    res += req.d01 + req.d02 + req.d03 + req.d04;
    return res;
}

function CdaV2CreateClaimRequest() {
    var res = "";
    var req = CdaV2PopulateClaimObj();
    res += req.a01 + req.a02 + req.a03 + req.a04 + req.a05 + req.a06 + req.a07 + req.a08;
    res += req.b01 + req.b02;
    res += req.c01 + req.c11 + req.c02 + req.c03 + req.c04 + req.c05 + req.c06 + req.c07 + req.c08 + req.c09 + req.c10;
    res += req.d01 + req.d02 + req.d03 + req.d04 + req.d05 + req.d06 + req.d07 + req.d08 + req.d09 + req.d10;
    res += req.e01 +req.e02 + req.e05 + req.e03 + req.e04;
    res += req.f01 + req.f02 + req.f03 + req.f15 + req.f04 + req.f05 + req.f06;

    for (var i = 0; i < req.f06; i++) //Number of Procedures Performed
    {
        res += req.f07[i] + req.f08[i] + req.f09[i] + req.f10[i] + req.f11[i] + req.f12[i]  + req.f13[i] + req.f14[i];
    }
    return res;
}


function CdaV2CreateClaimReversalRequest(pG01) {
    var res = "";
    var req = CdaV2PopulateClaimReversalObj();

    res += req.a01 + req.a02 + req.a03 + req.a04 + req.a05 + req.a06  + req.a07;
    res += req.b01 + req.b02;
    res += req.c01 + req.c11 + req.c02 + req.c03;
    res += req.d02 + req.d03 + req.d04;
    res += CdaV2FormatField(pG01, 'AN', 14);
    return res;
}

function CdaV2CreatePredeterminationRequest() {
    var res = "";
    var req = CdaV2PopulatePredeterminationObj();
    res += req.a01 + req.a02 + req.a03 + req.a04 + req.a05 + req.a06 + req.a07 + req.a08;
    res += req.b01 + req.b02;
    res += req.c01 + req.c11 + req.c02 + req.c03 + req.c04 + req.c05 + req.c06 + req.c07 + req.c08 + req.c09 + req.c10;
    res += req.d01 + req.d02 + req.d03 + req.d04 + req.d05 + req.d06 + req.d07 + req.d08 + req.d09 + req.d10;
    res += req.e01 + req.e02 + req.e05 + req.e03 + req.e04;
    res += req.f02 + req.f15 + req.f04 + req.f06;

    for (var i = 0; i < req.f06; i++) {
        res += req.f07[i] + req.f08[i] + req.f10[i] + req.f11[i] + req.f12[i] + req.f13[i] +req.f14[i];
    }
    return res;
}

function CdaV2CreatePendedClaimsRequest() {
    var res = "PendedClaims";
    var req = CdaV2PopulatePendedClaimsObj();
    res += req.a01 + req.a02 + req.a03 + req.a04 + req.a06 + req.a07;
    res += req.b01 + req.b02;
    return res;
}

//============================================= Populate request objects =============================================

function CdaV2PopulateEligibilityObj() {
    var obj = {};
    var transactionType = "Eligibility";
    var objDataFromDB = CdaV2GetDataFromDB(transactionType);

    //A Transaction Header
    obj.a01 = CdaV2FormatField(objDataFromDB.a01, 'AN', 12); //Transaction Prefix
    obj.a02 = CdaV2FormatField(objDataFromDB.a02, 'N', 6); //Office Sequence Number
    obj.a03 = CdaV2FormatField(objDataFromDB.a03, 'N', 2); //Format Version Number
    obj.a04 = CdaV2FormatField(objDataFromDB.a04, 'N', 2); //Transaction Code
    obj.a05 = CdaV2FormatField(objDataFromDB.a05, 'N', 6); //Carrier Identification Number
    obj.a06 = CdaV2FormatField(objDataFromDB.a06, 'AN', 3); //Software System ID
    obj.a07 = CdaV2FormatField('178', 'N', 4); //Message Length

    //B Provider Identification
    obj.b01 = CdaV2FormatField(objDataFromDB.b01, 'AN', 9); //CDA Provider Number
    obj.b02 = CdaV2FormatField(objDataFromDB.b02, 'N', 4); // Provider Office Number

    //C Primary Subscriber & Patient Identification
    obj.c01 = CdaV2FormatField(objDataFromDB.c01, 'AN', 8); //Primary Policy/Plan Number
    obj.c11 = CdaV2FormatField(objDataFromDB.c11, 'AN', 10); //Primary Division/Section Number
    obj.c02 = CdaV2FormatField(objDataFromDB.c02, 'AN', 11); //Subscriber Identification Number
    obj.c03 = CdaV2FormatField(objDataFromDB.c03, 'N', 1); //Relationship Code
    obj.c04 = CdaV2FormatField(objDataFromDB.c04, 'A', 1); //Patient's Sex
    obj.c05 = CdaV2FormatField(objDataFromDB.c05, 'N', 8); //Patient's Birthday
    obj.c06 = CdaV2FormatField(objDataFromDB.c06, 'A', 25); //Patient's Last Name
    obj.c07 = CdaV2FormatField(objDataFromDB.c07, 'A', 15); //Patient's First Name
    obj.c08 = CdaV2FormatField(objDataFromDB.c08, 'A', 1); //Patient's Middle Initial
    obj.c09 = CdaV2FormatField(objDataFromDB.c09, 'N', 1); //Eligibility Exception Code

    //D Relevant Subscriber's Name & Address
    obj.d01 = CdaV2FormatField(objDataFromDB.d01, 'N', 8); //Subscriber's Birthday
    obj.d02 = CdaV2FormatField(objDataFromDB.d02, 'A', 25); //Subscriber's Last Name
    obj.d03 = CdaV2FormatField(objDataFromDB.d03, 'A', 15); //Subscriber's First Name
    obj.d04 = CdaV2FormatField(objDataFromDB.d04, 'A', 1); //Subscriber's Middle Initial

    return obj;
}

function CdaV2PopulateClaimObj() {
    var obj = {};
    var transactionType = "Claim";
    var objDataFromDB = CdaV2GetDataFromDB(transactionType);
    var objDataFromUI = CdaV2GetDataFromUI();

    //A Transaction Header
    obj.a01 = CdaV2FormatField(objDataFromDB.a01, 'AN', 12); //Transaction Prefix
    obj.a02 = CdaV2FormatField(objDataFromDB.a02, 'N', 6); //Office Sequence Number
    obj.a03 = CdaV2FormatField(objDataFromDB.a03, 'N', 2); //Format Version Number
    obj.a04 = CdaV2FormatField(objDataFromDB.a04, 'N', 2); //Transaction Code
    obj.a05 = CdaV2FormatField(objDataFromDB.a05, 'N', 6); //Carrier Identification Number
    obj.a06 = CdaV2FormatField(objDataFromDB.a06, 'AN', 3); //Software System ID
    obj.a07 = CdaV2FormatField((370+37*CdaV2GGetNumProcedures()).toString(), 'N', 4); //Message Length
    obj.a08 = CdaV2FormatField(objDataFromDB.a08, 'A', 1); //E-Mail Flag

    //B Provider Identification
    obj.b01 = CdaV2FormatField(objDataFromDB.b01, 'AN', 9); //CDA Provider Number
    obj.b02 = CdaV2FormatField(objDataFromDB.b02, 'N', 4); // Provider Office Number

    //C Primary Subscriber & Patient Identification
    obj.c01 = CdaV2FormatField(objDataFromDB.c01, 'AN', 8); //Primary Policy/Plan Number
    obj.c11 = CdaV2FormatField(objDataFromDB.c11, 'AN', 10); //Primary Division/Section Number
    obj.c02 = CdaV2FormatField(objDataFromDB.c02, 'AN', 11); //Subscriber Identification Number
    obj.c03 = CdaV2FormatField(objDataFromDB.c03, 'N', 1); //Relationship Code
    obj.c04 = CdaV2FormatField(objDataFromDB.c04, 'A', 1); //Patient's Sex
    obj.c05 = CdaV2FormatField(objDataFromDB.c05, 'N', 8); //Patient's Birthday
    obj.c06 = CdaV2FormatField(objDataFromDB.c06, 'A', 25); //Patient's Last Name
    obj.c07 = CdaV2FormatField(objDataFromDB.c07, 'A', 15); //Patient's First Name
    obj.c08 = CdaV2FormatField(objDataFromDB.c08, 'A', 1); //Patient's Middle Initial
    obj.c09 = CdaV2FormatField(objDataFromDB.c09, 'N', 1); //Eligibility Exception Code
    obj.c10 = CdaV2FormatField(objDataFromDB.c10, 'A', 25); //Name of School

    //D Relevant Subscriber's Name & Address
    obj.d01 = CdaV2FormatField(objDataFromDB.d01, 'N', 8); //Subscriber's Birthday
    obj.d02 = CdaV2FormatField(objDataFromDB.d02, 'A', 25); //Subscriber's Last Name
    obj.d03 = CdaV2FormatField(objDataFromDB.d03, 'A', 15); //Subscriber's First Name
    obj.d04 = CdaV2FormatField(objDataFromDB.d04, 'A', 1); //Subscriber's Middle Initial
    obj.d05 = CdaV2FormatField(objDataFromDB.d05, 'AN', 30); //Subscriber's Address Line 1
    obj.d06 = CdaV2FormatField(objDataFromDB.d06, 'AN', 30); //Subscriber's Address Line 2
    obj.d07 = CdaV2FormatField(objDataFromDB.d07, 'A', 20); //Subscriber's City
    obj.d08 = CdaV2FormatField(objDataFromDB.d08, 'A', 2); //Subscriber's Province/State
    obj.d09 = CdaV2FormatField(objDataFromDB.d09, 'AN', 6); //Subscriber's Postal/Zip Code
    obj.d10 = CdaV2FormatField(objDataFromDB.d10, 'A', 1); //Language of the Insured

    //E Secondary Carrier Information
    obj.e01 = CdaV2FormatField(objDataFromDB.e01, 'N', 6); //Secondary Carrier Id Number
    obj.e02 = CdaV2FormatField(objDataFromDB.e02, 'AN', 8); //Secondary Policy/Plan Number
    obj.e05 = CdaV2FormatField(objDataFromDB.e05, 'AN', 10); //Secondary Division/Section Number
    obj.e03 = CdaV2FormatField(objDataFromDB.e03, 'AN', 11); //Secondary Plan Subscriber ID
    obj.e04 = CdaV2FormatField(objDataFromDB.e04, 'N', 8); //Secondary Subscriber's Birthday

    //F Procedure Information
    obj.f01 = CdaV2FormatField(objDataFromDB.f01, 'N', 1); //Payee Code
    obj.f02 = CdaV2FormatField(objDataFromDB.f02, 'N', 8); //Accident Date
    obj.f03 = CdaV2FormatField(objDataFromDB.f03, 'AN', 14); //Predetermination Number
    obj.f15 = CdaV2FormatField(objDataFromDB.f15, 'A', 1); //Initial Placement Upper
    obj.f04 = CdaV2FormatField(objDataFromDB.f04, 'N', 8); //Date of Initial Placement Upper
    obj.f05 = CdaV2FormatField(objDataFromDB.f05, 'A', 1); //Treatment Required for Orthodontic Purposes
    obj.f06 = CdaV2FormatField(CdaV2GGetNumProcedures(), 'N', 1); //Number of Procedures Performed 

    for (var i = 0; i < arrGrilleDeFacturation.length; i++) {
        var lineCount = 0;
        if (arrGrilleDeFacturation[i].Type != 'AMQ' && arrGrilleDeFacturation[i].Type != 'BES' && arrGrilleDeFacturation[i].Type != 'HOP') {
            lineCount++;
            obj.f07[i] = CdaV2FormatField(lineCount, 'N', 1); //Procedure Line Number
            obj.f08[i] = CdaV2FormatField(arrGrilleDeFacturation[i].Code, 'N', 5); //Procedure Code
            obj.f09[i] = CdaV2FormatField(CdaV2GetCurrentDate(), 'N', 8); //Date of Service
            obj.f10[i] = CdaV2FormatField(arrGrilleDeFacturation[i].Dent, 'N', 2); //International Tooth, Sextant, Quad or Arch
            obj.f11[i] = CdaV2FormatField(arrGrilleDeFacturation[i].Surface, 'A', 5); //Tooth Surface

            obj.f12[i] = CdaV2FormatField(arrGrilleDeFacturation[i].Honoraires, 'D', 6); //Dentist's Fee Claimed
            obj.f13[i] = CdaV2FormatField(arrGrilleDeFacturation[i].Frais, 'D', 6); //Lab Procedure Fee # 1
            obj.f14[i] = '0000';
            
        }
    }
    return obj;
}

function CdaV2PopulateClaimReversalObj() {
    var obj = {};
    var transactionType = "ClaimReversal";
    var objDataFromDB = CdaV2GetDataFromDB(transactionType);

    //A Transaction Header
    obj.a01 = CdaV2FormatField(objDataFromDB.a01, 'AN', 12); //Transaction Prefix
    obj.a02 = CdaV2FormatField(objDataFromDB.a02, 'N', 6); //Office Sequence Number
    obj.a03 = CdaV2FormatField(objDataFromDB.a03, 'N', 2); //Format Version Number
    obj.a04 = CdaV2FormatField(objDataFromDB.a04, 'N', 2); //Transaction Code
    obj.a05 = CdaV2FormatField(objDataFromDB.a05, 'N', 6); //Carrier Identification Number
    obj.a06 = CdaV2FormatField(objDataFromDB.a06, 'AN', 3); //Software System ID
    obj.a07 = CdaV2FormatField('133', 'N', 4); //Message Length

    //B Provider Identification
    obj.b01 = CdaV2FormatField(objDataFromDB.b01, 'AN', 9); //CDA Provider Number
    obj.b02 = CdaV2FormatField(objDataFromDB.b02, 'N', 4); // Provider Office Number

    //C Primary Subscriber & Patient Identification
    obj.c01 = CdaV2FormatField(objDataFromDB.c01, 'AN', 8); //Primary Policy/Plan Number
    obj.c11 = CdaV2FormatField(objDataFromDB.c11, 'AN', 10); //Primary Division/Section Number
    obj.c02 = CdaV2FormatField(objDataFromDB.c02, 'AN', 11); //Subscriber Identification Number
    obj.c03 = CdaV2FormatField(objDataFromDB.c03, 'N', 1); //Relationship Code

    //D Relevant Subscriber's Name & Address
    obj.d02 = CdaV2FormatField(objDataFromDB.d02, 'A', 25); //Subscriber's Last Name
    obj.d03 = CdaV2FormatField(objDataFromDB.d03, 'A', 15); //Subscriber's First Name
    obj.d04 = CdaV2FormatField(objDataFromDB.d04, 'A', 1); //Subscriber's Middle Initial

    //obj.g01 = CdaV2FormatField(pG01, 'AN', 14); //Transaction Reference Number of Orig Claim

    return obj;
}

function CdaV2PopulatePredeterminationObj() {
    var obj = {};
    var transactionType = "Predetermination";
    var objDataFromDB = CdaV2GetDataFromDB(transactionType);
    var objDataFromUI = CdaV2GetDataFromUI();

    //A Transaction Header
    obj.a01 = CdaV2FormatField(objDataFromDB.a01, 'AN', 12); //Transaction Prefix
    obj.a02 = CdaV2FormatField(objDataFromDB.a02, 'N', 6); //Office Sequence Number
    obj.a03 = CdaV2FormatField(objDataFromDB.a03, 'N', 2); //Format Version Number
    obj.a04 = CdaV2FormatField(objDataFromDB.a04, 'N', 2); //Transaction Code
    obj.a05 = CdaV2FormatField(objDataFromDB.a05, 'N', 6); //Carrier Identification Number
    obj.a06 = CdaV2FormatField(objDataFromDB.a06, 'AN', 3); //Software System ID
    obj.a07 = CdaV2FormatField((355 + 29 * CdaV2GGetNumProcedures()).toString(), 'N', 4); //Message Length
    obj.a08 = CdaV2FormatField(objDataFromDB.a08, 'A', 1); //E-Mail Flag

    //B Provider Identification
    obj.b01 = CdaV2FormatField(objDataFromDB.b01, 'AN', 9); //CDA Provider Number
    obj.b02 = CdaV2FormatField(objDataFromDB.b02, 'N', 4); // Provider Office Number

    //C Primary Subscriber & Patient Identification
    obj.c01 = CdaV2FormatField(objDataFromDB.c01, 'AN', 8); //Primary Policy/Plan Number
    obj.c11 = CdaV2FormatField(objDataFromDB.c11, 'AN', 10); //Primary Division/Section Number
    obj.c02 = CdaV2FormatField(objDataFromDB.c02, 'AN', 11); //Subscriber Identification Number
    obj.c03 = CdaV2FormatField(objDataFromDB.c03, 'N', 1); //Relationship Code
    obj.c04 = CdaV2FormatField(objDataFromDB.c04, 'A', 1); //Patient's Sex
    obj.c05 = CdaV2FormatField(objDataFromDB.c05, 'N', 8); //Patient's Birthday
    obj.c06 = CdaV2FormatField(objDataFromDB.c06, 'A', 25); //Patient's Last Name
    obj.c07 = CdaV2FormatField(objDataFromDB.c07, 'A', 15); //Patient's First Name
    obj.c08 = CdaV2FormatField(objDataFromDB.c08, 'A', 1); //Patient's Middle Initial
    obj.c09 = CdaV2FormatField(objDataFromDB.c09, 'N', 1); //Eligibility Exception Code
    obj.c10 = CdaV2FormatField(objDataFromDB.c10, 'A', 25); //Name of School

    //D Relevant Subscriber's Name & Address
    obj.d01 = CdaV2FormatField(objDataFromDB.d01, 'N', 8); //Subscriber's Birthday
    obj.d02 = CdaV2FormatField(objDataFromDB.d02, 'A', 25); //Subscriber's Last Name
    obj.d03 = CdaV2FormatField(objDataFromDB.d03, 'A', 15); //Subscriber's First Name
    obj.d04 = CdaV2FormatField(objDataFromDB.d04, 'A', 1); //Subscriber's Middle Initial
    obj.d05 = CdaV2FormatField(objDataFromDB.d05, 'AN', 30); //Subscriber's Address Line 1
    obj.d06 = CdaV2FormatField(objDataFromDB.d06, 'AN', 30); //Subscriber's Address Line 2
    obj.d07 = CdaV2FormatField(objDataFromDB.d07, 'A', 20); //Subscriber's City
    obj.d08 = CdaV2FormatField(objDataFromDB.d08, 'A', 2); //Subscriber's Province/State
    obj.d09 = CdaV2FormatField(objDataFromDB.d09, 'AN', 6); //Subscriber's Postal/Zip Code
    obj.d10 = CdaV2FormatField(objDataFromDB.d10, 'A', 1); //Language of the Insured

    //E Secondary Carrier Information
    obj.e01 = CdaV2FormatField(objDataFromDB.e01, 'N', 6); //Secondary Carrier Id Number
    obj.e02 = CdaV2FormatField(objDataFromDB.e02, 'AN', 8); //Secondary Policy/Plan Number
    obj.e05 = CdaV2FormatField(objDataFromDB.e05, 'AN', 10); //Secondary Division/Section Number
    obj.e03 = CdaV2FormatField(objDataFromDB.e03, 'AN', 11); //Secondary Plan Subscriber ID
    obj.e04 = CdaV2FormatField(objDataFromDB.e04, 'N', 8); //Secondary Subscriber's Birthday

    //F Procedure Information
    //obj.f01 = CdaV2FormatField(objDataFromDB.f01, 'N', 1); //Payee Code
    obj.f02 = CdaV2FormatField(objDataFromDB.f02, 'N', 8); //Accident Date
    //obj.f03 = CdaV2FormatField(objDataFromDB.f03, 'AN', 14); //Predetermination Number
    obj.f15 = CdaV2FormatField(objDataFromDB.f15, 'A', 1); //Initial Placement Upper
    obj.f04 = CdaV2FormatField(objDataFromDB.f04, 'N', 8); //Date of Initial Placement Upper
    obj.f05 = CdaV2FormatField(objDataFromDB.f05, 'A', 1); //Treatment Required for Orthodontic Purposes
    obj.f06 = CdaV2FormatField(CdaV2GGetNumProcedures(), 'N', 1); //Number of Procedures Performed 

    for (var i = 0; i < arrGrilleDeFacturation.length; i++) {
        var lineCount = 1;
        if (arrGrilleDeFacturation[i].Type != 'AMQ' && arrGrilleDeFacturation[i].Type != 'BES' && arrGrilleDeFacturation[i].Type != 'HOP') {
            obj.f07[i] = CdaV2FormatField(lineCount, 'N', 1); //Procedure Line Number
            obj.f08[i] = CdaV2FormatField(arrGrilleDeFacturation[i].Code, 'N', 5); //Procedure Code
            //obj.f09[i] = CdaV2FormatField(CdaV2GetCurrentDate(), 'N', 8); //Date of Service
            obj.f10[i] = CdaV2FormatField(arrGrilleDeFacturation[i].Dent, 'N', 2); //International Tooth, Sextant, Quad or Arch
            obj.f11[i] = CdaV2FormatField(arrGrilleDeFacturation[i].Surface, 'A', 5); //Tooth Surface

            obj.f12[i] = CdaV2FormatField(arrGrilleDeFacturation[i].Honoraires, 'D', 6); //Dentist's Fee Claimed
            obj.f13[i] = CdaV2FormatField(arrGrilleDeFacturation[i].Frais, 'D', 6); //Lab Procedure Fee # 1
            obj.f14[i] = '0000';
            lineCount++;
        }
    }
    return obj;
}

function CdaV2PopulatePendedClaimsObj() {
    var obj = {};
    var transactionType = "PendedClaims";
    var objDataFromDB = CdaV2GetDataFromDB(transactionType);
    var objDataFromUI = CdaV2GetDataFromUI();

    //A Transaction Header
    obj.a01 = CdaV2FormatField(objDataFromDB.a01, 'AN', 12); //Transaction Prefix
    obj.a02 = CdaV2FormatField(objDataFromDB.a02, 'N', 6); //Office Sequence Number
    obj.a03 = CdaV2FormatField(objDataFromDB.a03, 'N', 2); //Format Version Number
    obj.a04 = CdaV2FormatField(objDataFromDB.a04, 'N', 2); //Transaction Code
    obj.a06 = CdaV2FormatField(objDataFromDB.a06, 'AN', 3); //Software System ID
    obj.a07 = CdaV2FormatField('42', 'N', 4); //Message Length

    //B Provider Identification
    obj.b01 = CdaV2FormatField(objDataFromDB.b01, 'AN', 9); //CDA Provider Number
    obj.b02 = CdaV2FormatField(objDataFromDB.b02, 'N', 4); // Provider Office Number
    return obj;
}

//============================================= Read and Parse response ============================================= 

function CdaV2ReadResponse(pResponse) {
    var res = {};
    var transCode = '';
    if (pResponse) {
        transCode = pResponse.substring(20, 23);

        switch (transCode) {
            case '10':
                res = CdaV2ParseEligibilityResp(pResponse);
                break;
            case '11':
                res = CdaV2ParseClaimAcknResp(pResponse);
                break;
            case '21':
                res = CdaV2ParseEOBResp(pResponse);
                break;
            case '12':
                res = CdaV2ParseClaimReversResp(pResponse);
                break;
            case '13':
                res = CdaV2ParsePredetAcknResp(pResponse);
                break;

        }
    }
    return res;
}

function CdaV2ParseEligibilityResp(pResponse) {
    var res = {};
    res.a01 = pResponse.substring(0, 12); //Transaction Prefix
    res.a02 = parseInt(pResponse.substring(12, 18));//Office Sequence Number
    res.a03 = parseInt(pResponse.substring(18, 20));//Format Version Number
    res.a04 = parseInt(pResponse.substring(20, 22));//Transaction Code
    res.a05 = parseInt(pResponse.substring(22, 28));//Carrier Identification Number
    res.a07 = parseInt(pResponse.substring(28, 32));//Message Length

    res.b01 = pResponse.substring(32, 41);//CDA Provider Number
    res.b02 = parseInt(pResponse.substring(41, 45));//Provider Office Number

    res.g01 = pResponse.substring(45, 59);//Transaction Reference Number
    res.g05 = pResponse.substring(59, 60);//Response Status
    res.g06 = parseInt(pResponse.substring(60, 62));//Number of Error Codes
    res.g07 = pResponse.substring(62, 137);//Disposition Message
    res.g02 = pResponse.substring(137, 138);//Employer Certified Flag
    //Repeat for number of times specified by G06.
    var lastPos = 138;
    for (var i = 0; i < res.g06; i++) {
        res.g08[i] = parseInt(pResponse.substring(lastPos, lastPos + 3));
        lastPos += 3;
    }
    return res;
}

function CdaV2ParseClaimAcknResp(pResponse) {
    var res = {};
    res.a01 = pResponse.substring(0, 12); //Transaction Prefix
    res.a02 = parseInt(pResponse.substring(12, 18));//Office Sequence Number
    res.a03 = parseInt(pResponse.substring(18, 20));//Format Version Number
    res.a04 = parseInt(pResponse.substring(20, 22));//Transaction Code
    res.a05 = parseInt(pResponse.substring(22, 28));//Carrier Identification Number
    res.a07 = parseInt(pResponse.substring(28, 32));//Message Length

    res.b01 = pResponse.substring(32, 41);//CDA Provider Number
    res.b02 = parseInt(pResponse.substring(41, 45));//Provider Office Number

    res.g01 = pResponse.substring(45, 59);//Transaction Reference Number
    res.g05 = pResponse.substring(59, 60);//Response Status
    res.g06 = parseInt(pResponse.substring(60, 62));//Number of Error Codes
    res.g07 = pResponse.substring(62, 137);//Disposition Message
    res.g02 = pResponse.substring(137,138);//Employer Certified Flag
    res.g04 = (parseFloat(pResponse.substring(138, 145)) / 100).toFixed(2);//Total Amount of Service
    res.g27 = pResponse.substring(145, 146);//Language of the Insured

    var lastPos = 146;

    //Repeat for number of times specified by G06.

    for (var j = 0; j < res.g06; j++) {
        res.f07[j] = parseInt(pResponse.substring(lastPos, lastPos + 1));
        lastPos += 1;

        res.g08[j] = parseInt(pResponse.substring(lastPos, lastPos + 3));
        lastPos += 3;
    }
    return res;
}

function CdaV2ParseEOBResp(pResponse) {
    var res = {};
    res.a01 = pResponse.substring(0, 12); //Transaction Prefix
    res.a02 = parseInt(pResponse.substring(12, 18));//Office Sequence Number
    res.a03 = parseInt(pResponse.substring(18, 20));//Format Version Number
    res.a04 = parseInt(pResponse.substring(20, 22));//Transaction Code
    res.a05 = parseInt(pResponse.substring(22, 28));//Carrier Identification Number
    res.a07 = parseInt(pResponse.substring(28, 32));//Message Length

    res.b01 = pResponse.substring(32, 41);//CDA Provider Number
    res.b02 = parseInt(pResponse.substring(41, 45));//Provider Office Number

    res.g01 = pResponse.substring(45, 59); //Transaction Reference Number
    res.g03 = parseInt(pResponse.substring(59, 67));//Expected Payment Date
    res.g04 = (parseFloat(pResponse.substring(67, 74)) / 100).toFixed(2);//Total Amount of Service
    res.g27 = pResponse.substring(74, 75);//Language of the Insured
    res.g09 = pResponse.substring(75, 76);//E-Mail Flag
    res.f06 = parseInt(pResponse.substring(76, 77));//Number of Procedures Performed
    res.g10 = parseInt(pResponse.substring(77, 78));//Number of Carrier Issued Procedure Codes
    res.g11 = parseInt(pResponse.substring(78, 80));//Number of Note Lines
    res.g28 = (parseFloat(pResponse.substring(80, 87)) / 100).toFixed(2);//Total Benefit Amounts
    res.g29 = (parseFloat(pResponse.substring(87, 93)) / 100).toFixed(2);//Deductible Amount - unallocated
    res.g30 = pResponse.substring(93, 103);//Transaction Validation Code


    var lastPos = 103;
    for (var i = 0; i < res.f06; i++) {
        res.f07[i] = parseInt(pResponse.substring(lastPos, lastPos + 1));
        lastPos += 1;
        res.g12[i] = (parseFloat(pResponse.substring(lastPos, lastPos + 6)) / 100).toFixed(2); //Eligible Amount
        lastPos += 6;
        res.g13[i] = (parseFloat(pResponse.substring(lastPos, lastPos + 5)) / 100).toFixed(2); //Deductible Amount
        lastPos += 5;
        res.g14[i] = parseInt(pResponse.substring(lastPos, lastPos + 3));//Eligible Percentage
        lastPos += 3;
        res.g15[i] = (parseFloat(pResponse.substring(lastPos, lastPos + 6)) / 100).toFixed(2);//Benefit Amount for the Procedure
        lastPos += 6;
        res.g16[i] = parseInt(pResponse.substring(lastPos, lastPos + 2)); // Explanation Note Number 1
        lastPos += 2;
        res.g17[i] = parseInt(pResponse.substring(lastPos, lastPos + 2)); // Explanation Note Number 2
        lastPos += 2;
        
    }

    for (var j = 0; j < res.g10; j++) {
        res.g18[j] = parseInt(pResponse.substring(lastPos, lastPos + 7)); //References to line number of the submitted procedure.
        lastPos += 7;
        res.g19[j] = parseInt(pResponse.substring(lastPos, lastPos + 5)); //Additional procedure Code
        lastPos += 5;
        res.g20[j] = (parseFloat(pResponse.substring(lastPos, lastPos + 6)) / 100).toFixed(2);//Eligible Amount for additional procedure.
        lastPos += 6;
        res.g21[j] = (parseFloat(pResponse.substring(lastPos, lastPos + 5)) / 100).toFixed(2);//Deductible for the additional procedure.
        lastPos += 5;
        res.g22[j] = parseInt(pResponse.substring(lastPos, lastPos + 3));//Eligible percentage for the additional procedure.
        lastPos += 3;
        res.g23[j] = (parseFloat(pResponse.substring(lastPos, lastPos + 6)) / 100).toFixed(2);//Benefit Amount for the additional procedure.
        lastPos += 6;
        res.g24[j] = parseInt(pResponse.substring(lastPos, lastPos + 2)); //Explanation Note Number 1 for the additional procedure.
        lastPos += 2;
        res.g25[j] = parseInt(pResponse.substring(lastPos, lastPos + 2));
        lastPos += 2;
    }

    for (var k = 0; k < res.g11; k++) {
        res.g26[k] = pResponse.substring(lastPos, lastPos + 75); //Note Text
        lastPos += 75;
    }

    return res;
}

function CdaV2ParseClaimReversResp(pResponse) {
    var res = {};
    res.a01 = pResponse.substring(0, 12); //Transaction Prefix
    res.a02 = parseInt(pResponse.substring(12, 18));//Office Sequence Number
    res.a03 = parseInt(pResponse.substring(18, 20));//Format Version Number
    res.a04 = parseInt(pResponse.substring(20, 22));//Transaction Code
    res.a05 = parseInt(pResponse.substring(22, 28));//Carrier Identification Number
    res.a07 = parseInt(pResponse.substring(28, 32));//Message Length

    res.b01 = pResponse.substring(32, 41);//CDA Provider Number
    res.b02 = parseInt(pResponse.substring(41, 45));//Provider Office Number

    res.g01 = pResponse.substring(45, 59); //Transaction Reference Number
    res.g05 = pResponse.substring(59, 60);//Response Status
    res.g06 = parseInt(pResponse.substring(60, 62)); //Number of Error Codes
    res.g07 = pResponse.substring(62, 137);//Disposition Message
    res.g04 = (parseFloat(pResponse.substring(137, 144)) / 100).toFixed(2); //Total Amount of Service

    var lastPos = 144;
    for (var j = 0; j < res.g06; j++) {
        res.g08[j] = parseInt(pResponse.substring(lastPos, lastPos + 3));//Error Code
        lastPos += 3;
    }
    return res;
}

function CdaV2ParsePredetAcknResp(pResponse) {
    var res = {};
    res.a01 = pResponse.substring(0, 12); //Transaction Prefix
    res.a02 = parseInt(pResponse.substring(12, 18));//Office Sequence Number
    res.a03 = parseInt(pResponse.substring(18, 20));//Format Version Number
    res.a04 = parseInt(pResponse.substring(20, 22));//Transaction Code
    res.a05 = parseInt(pResponse.substring(22, 28));//Carrier Identification Number
    res.a07 = parseInt(pResponse.substring(28, 32));//Message Length

    res.b01 = pResponse.substring(32, 41);//CDA Provider Number
    res.b02 = parseInt(pResponse.substring(41, 45));//Provider Office Number

    res.g01 = pResponse.substring(45, 59); //Transaction Reference Number
    res.g05 = pResponse.substring(59, 60);//Response Status
    res.g06 = parseInt(pResponse.substring(60, 62)); //Number of Error Codes
    res.g07 = pResponse.substring(62, 137);//Disposition Message
    res.g02 = pResponse.substring(137,138);//Employer Certified Flag
    res.g04 = (parseFloat(pResponse.substring(138, 145)) / 100).toFixed(2); //Total Amount of Service

    var lastPos = 145;

    for (var j = 0; j < res.g06; j++) {
        res.f07[j] = parseInt(pResponse.substring(lastPos, lastPos + 1));//Procedure Line Number
        lastPos += 1;
        res.g08[j] = parseInt(pResponse.substring(lastPos, lastPos + 3));//Error Code
        lastPos += 3;
    }

    return res;
}

////Returns an object with All formated fields;
//function CdaV2GetFormatedValues()
//{
//    var jsonFromServer = '{"A01":"test3","A02":"25","A03":"46"}';
//    var obj = JSON.parse(jsonFromServer);
//    var objRes = {};
//    objRes.A06 = CdaV2FormatField(obj.A06, 'D', 15);
//    objRes.A02 = CdaV2FormatField(obj.A02, 'N', 12);
//    objRes.A03 = CdaV2FormatField(obj.A03, 'D', 12);
//    objRes.A04 = CdaV2FormatField(obj.A04, 'A', 12);

//    return "OK";
//}

//============================================= Comon functions =============================================
//returns current date in "YYYYMMDD" format.
function CdaV2GetCurrentDate() {
    var date = '';
    var d = new Date();
    var y = d.getFullYear();
    var m = d.getMonth() + 1;
    var day = d.getDate();
    if (day < 10) day = '0' + day;
    if (m < 10) m = '0' + m;

    return y + m + day;
}

function CdaV2Topage850(pString) {
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

function CdaV2Frompage850(pString) {
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

function CdaV2FormatField(pValue, pFormatType, pRequiredLength) {
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
                    alert('adoV2FormatField Error: value is not an integer.');
                }
                else {
                    var len = v.length;
                    if (len < pRequiredLength) {
                        var asciiZero = String.fromCharCode(48);
                        //Fill with zeros.
                        var i = 0;
                        while (i < pRequiredLength) {
                            v = asciiZero + v;
                            i++;
                        }
                        res = v;
                    }
                    else if (len == pRequiredLength) {
                        res = v;
                    }
                    else if (len > pRequiredLength) {
                        alert('adoV2FormatField Error: Value is longer than required.');
                    }
                }

            }
            break;

            /*
            Alphabetic. Only ASCII upper and lower case ALPHABETIC characters including apostrophe ('), dash (-) and comma (,) are allowed.
            Left-justify and pad with blanks on the right. If only specific values are permitted, e.g., Y, N, D, M; then the upper case must be used.
            */
        case 'A':

            //Alphanumeric. Any printable ASCII character is allowed. Left-justify and pad with spaces on the right.
        case 'AN':
            {
                if (!v)
                    v = '';
                //Convert to page850
                //v = CdaV2Topage850(v);
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
                    alert('adoV2FormatField Error: Value is longer than required.');
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
                if (isNaN(Number(v))) {
                    alert('adoV2FormatField Error: value is not a number.');
                }
                else {
                    v = parseFloat(v).toFixed(2).toString();
                    v = v.replace('.', '');
                    v = v.replace(',', '');

                    var len = v.length;
                    if (len < pRequiredLength) {
                        var asciiZero = String.fromCharCode(48);
                        //Fill with zeros.
                        for (var i = len; i < pRequiredLength; i++) {
                            v = asciiZero + v;
                        }
                        res = v;
                    }
                    else if (len == pRequiredLength) {
                        res = v;
                    }
                    else if (len > pRequiredLength) {
                        alert('adoV2FormatField Error: Value is longer than required.');
                    }
                }

            }
            break;
        default:
            {
                alert("adoV2FormatField Error: Format Type is not correct.");
            }
    }
    return res;
}

function CdaV2GetDataFromDB(pRrequestType) {
    //TODO: implement
    var obj = {};
    return obj;
}

function CdaV2GetDataFromUI() {
    //TODO: implement
    var obj = {};
    return obj;
}

function CdaV2GGetNumProcedures() {
    var count = 0;
    for (var i = 0; i < arrGrilleDeFacturation.length; i++) {
        if (arrGrilleDeFacturation[i].Type != 'AMQ' && arrGrilleDeFacturation[i].Type != 'BES' && arrGrilleDeFacturation[i].Type != 'HOP')
            count++;
    }
    return count;
}


