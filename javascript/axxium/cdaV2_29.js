//var globCdaReq2Obj = {};
//var globCdaV2g01 = '';


function CdaV2SendRequestToCdaNet() {
    CdaV2GetDataFromDB();
}

function CdaV2CallCDAService(pReqString)
{
    var strRequest = '';
    if (pReqString) {
        strRequest = pReqString;
    }
    else {
        strRequest = CdaV2CreateRequestString();
    }

    var randomNum = CdaCommCreateRandomNumber(1, 999);
    //var transCode = globCdaDataFromDB.a04;//TODO: send to server
    var inputXMl = {
        "request": strRequest, //request to send
        "info": { 'Prenom': globVisionRData.PrePers, 'Nom': globVisionRData.NomPers, 'Ass': globVisionRData.InsTypeList[0] } // JSON data
    };
    //Show progress
    document.getElementById("loaderCdan2Form").setAttribute("class", "ui active inverted dimmer");
    document.getElementById("loaderMain").setAttribute("class", "ui active inverted dimmer");
    try {
        $.post("allScriptsv1.py", { tx: "sendInsurance", clinicId: globClinicId, patientId: globPatientId, nodossier: globNoDossier, nofact: globBillNumber, lun: randomNum, json: JSON.stringify(inputXMl) },
        function (result) {
            //Hide progress
            document.getElementById("loaderCdan2Form").setAttribute("class", "ui inverted dimmer");
            document.getElementById("loaderMain").setAttribute("class", "ui inverted dimmer");
            if (result.outcome === 'error')
                alert(result.message);
            else {
                var responseLine = result.message;
                var communicationResult = CdaCommGetCommStatus(responseLine);
                if (communicationResult == 0)// No errors
                {
                    var transactionLine = responseLine.split(',').slice(3); // extract string after 3th comma

                    globCdaRespObj = CdaV2ReadResponse(transactionLine);
                    if (globCdaRespObj) {
                        respMessage = CdaV2CreateRespMessage(globCdaRespObj, transactionLine);
                    }
                    else {
                        respMessage = 'Parsing CdaNet response failed.'
                    }

                    CdaCommShowResp(respMessage);
                }
            }
        });
    }
    catch (e)
    {
        document.getElementById("loaderCdan2Form").setAttribute("class", "ui inverted dimmer");
        document.getElementById("loaderMain").setAttribute("class", "ui inverted dimmer");
        alert(e.message);
    }
}

//============================================= Create request string =============================================

//Returns request string depends on transaction type.
function CdaV2CreateRequestString() {
    var strRequest = "";
    switch (globCdanetTranscode) {
        case "Eligibility":
            {
                strRequest = CdaV2CreateEligibilityRequest();
            }
            break;
        case '1'://"Claim":
            {
                strRequest = CdaV2CreateClaimRequest();
            }
            break;
        case '2'://"ClaimReversal":
            {
                strRequest = CdaV2CreateClaimReversalRequest();
            }
            break;
        case "3":
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
    res += req.g01;
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
    res += req.f02 + req.f15 + req.f04 + req.f05 +req.f06;

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
    var objDataFromDB = globCdaDataFromDB;

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

    var objDataFromDB = globCdaDataFromDB;

    //A Transaction Header
    obj.a01 = CdaV2FormatField(objDataFromDB.a01, 'AN', 12); //Transaction Prefix
    obj.a02 = CdaV2FormatField(objDataFromDB.a02, 'N', 6); //Office Sequence Number
    obj.a03 = CdaV2FormatField(objDataFromDB.a03, 'N', 2); //Format Version Number
    obj.a04 = CdaV2FormatField(objDataFromDB.a04, 'N', 2); //Transaction Code
    obj.a05 = CdaV2FormatField(objDataFromDB.a05, 'N', 6); //Carrier Identification Number
    obj.a06 = CdaV2FormatField(objDataFromDB.a06, 'AN', 3); //Software System ID
    obj.a07 = CdaV2FormatField((370+37*CdaV2GGetNumProcedures()).toString(), 'N', 4); //Message Length
    obj.a08 = CdaV2FormatField(CdaV2GetEmailFlag(), 'A', 1); //E-Mail Flag

    //B Provider Identification
    obj.b01 = CdaV2FormatField(objDataFromDB.b01, 'AN', 9); //CDA Provider Number
    obj.b02 = CdaV2FormatField(objDataFromDB.b02, 'N', 4); // Provider Office Number

    //C Primary Subscriber & Patient Identification
    obj.c01 = CdaV2FormatField(objDataFromDB.c01, 'AN', 8); //Primary Policy/Plan Number
    obj.c11 = CdaV2FormatField(objDataFromDB.c11, 'AN', 10); //Primary Division/Section Number
    obj.c02 = CdaV2FormatField(objDataFromDB.c02, 'AN', 11); //Subscriber Identification Number
    obj.c03 = CdaV2FormatField(objDataFromDB.c03, 'N', 1); //Relationship Code
    obj.c04 = CdaV2FormatField(objDataFromDB.c04, 'A', 1); //Patient's Sex
    obj.c05 = CdaV2FormatField(CdaCommGetDateOfBirthFromRamq(globVisionRData.IdPers), 'N', 8); //Patient's Birthday
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
    obj.f01 = CdaV2FormatField($("#cdan1_payabl").val(), 'N', 1); //Payee Code
    obj.f02 = CdaV2FormatField($('#cdan1_date_accident').val(), 'N', 8); //Accident Date
    obj.f03 = CdaV2FormatField($('#cdan1_no_confrmtn_plan').val(), 'AN', 14); //Predetermination Number
    obj.f15 = CdaV2FormatField($('#cdan1_placmnt').val(), 'A', 1); //Initial Placement 
    obj.f04 = CdaV2FormatField($('#cdan1_placmnt_date').val(), 'N', 8); //Date of Initial Placement 
    obj.f05 = CdaV2FormatField($('#q1_orthodon_oui').is(':checked') ? 'Y' : 'N', 'A', 1); //Treatment Required for Orthodontic Purposes 
    obj.f06 = CdaV2FormatField(CdaV2GGetNumProcedures(), 'N', 1); //Number of Procedures Performed 


    obj.f07 = []; obj.f08 = []; obj.f09 = []; obj.f10 = []; obj.f11 = []; obj.f12 = []; obj.f13 = []; obj.f14 = [];
    var lineCount = 0;
    for (var i = 0; i < arrGrilleDeFacturation.length; i++) {
        if (arrGrilleDeFacturation[i].Type != 'AMQ' && arrGrilleDeFacturation[i].Type != 'BES' && arrGrilleDeFacturation[i].Type != 'HOP') {
            lineCount++;
            obj.f07[i] = CdaV2FormatField(lineCount, 'N', 1); //Procedure Line Number
            obj.f08[i] = CdaV2FormatField(arrGrilleDeFacturation[i].Code, 'N', 5); //Procedure Code
            obj.f09[i] = CdaV2FormatField(CdaV2GetCurrentDate(), 'N', 8); //Date of Service
            obj.f10[i] = CdaV2FormatField(arrGrilleDeFacturation[i].Dent, 'N', 2); //International Tooth, Sextant, Quad or Arch
            obj.f11[i] = CdaV2FormatField(arrGrilleDeFacturation[i].Surface, 'A', 5); //Tooth Surface
            obj.f12[i] = CdaV2FormatField(arrGrilleDeFacturation[i].Honoraires, 'D', 6); //Dentist's Fee Claimed
            obj.f13[i] = CdaV2FormatField(arrGrilleDeFacturation[i].Frais, 'D', 6); //Lab Procedure Fee # 1
            obj.f14[i] = '0000';// In visionR it's always '0000'
            
        }
    }
    return obj;
}

function CdaV2PopulateClaimReversalObj() {
    var obj = {};
    var transactionType = "ClaimReversal";
    var objDataFromDB = globCdaDataFromDB;

    //A Transaction Header
    obj.a01 = CdaV2FormatField(objDataFromDB.a01, 'AN', 12); //Transaction Prefix
    obj.a02 = CdaV2FormatField(globCdaTransHistSelectedData[0], 'N', 6); //Office Sequence Number
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

    obj.g01 = CdaV2FormatField(globCdaTransHistSelectedData[8], 'AN', 14); //Transaction Reference Number of Orig Claim

    return obj;
}

function CdaV2PopulatePredeterminationObj() {
    var obj = {};
    var transactionType = "Predetermination";
    var objDataFromDB = globCdaDataFromDB;
    //var objDataFromUI = CdaV2GetDataFromUI();

    obj.f07 = []; obj.f08=[]; obj.f10=[]; obj.f11=[]; obj.f12=[]; obj.f13=[]; obj.f14=[];

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
    obj.c05 = CdaV2FormatField(CdaCommGetDateOfBirthFromRamq(globVisionRData.IdPers), 'N', 8); //Patient's Birthday
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
    obj.f02 = CdaV2FormatField($('#cdan1_date_accident').val(), 'N', 8); //Accident Date
    obj.f15 = CdaV2FormatField($('#cdan1_placmnt').val(), 'A', 1); //Initial Placement Upper
    obj.f04 = CdaV2FormatField($('#cdan1_placmnt_date').val(), 'N', 8); //Date of Initial Placement Upper
    obj.f05 = CdaV2FormatField($('#q1_orthodon_oui').is(':checked') ? 'Y' : 'N', 'A', 1); //Treatment Required for Orthodontic Purposes
    obj.f06 = CdaV2FormatField(CdaV2GGetNumProcedures(), 'N', 1); //Number of Procedures Performed 

    for (var i = 0; i < arrGrilleDeFacturation_planTrait.length; i++) {
        var lineCount = 1;
        obj.f07[i] = CdaV2FormatField(lineCount, 'N', 1); //Procedure Line Number
        obj.f08[i] = CdaV2FormatField(arrGrilleDeFacturation_planTrait[i].Code, 'N', 5); //Procedure Code
        //obj.f09[i] = CdaV2FormatField(CdaV2GetCurrentDate(), 'N', 8); //Date of Service
        obj.f10[i] = CdaV2FormatField(arrGrilleDeFacturation_planTrait[i].Dent, 'N', 2); //International Tooth, Sextant, Quad or Arch
        obj.f11[i] = CdaV2FormatField(arrGrilleDeFacturation_planTrait[i].Surface, 'A', 5); //Tooth Surface

        obj.f12[i] = CdaV2FormatField(arrGrilleDeFacturation_planTrait[i].Honoraires, 'D', 6); //Dentist's Fee Claimed
        obj.f13[i] = CdaV2FormatField(arrGrilleDeFacturation_planTrait[i].Frais, 'D', 6); //Lab Procedure Fee # 1
        obj.f14[i] = '0000';
        lineCount++;
    }
    return obj;
}

function CdaV2PopulatePendedClaimsObj() {
    var obj = {};
    var transactionType = "PendedClaims";
    var objDataFromDB = globCdaDataFromDB;
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
        transCode = pResponse.toString().substring(20, 22);

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
    res.g08 = [];

    pResponse = pResponse.toString();
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
    res.f07 = [];
    res.g08 = [];

    pResponse = pResponse.toString();
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
    res.g04 = (parseFloat(pResponse.substring(138, 145))/100).toFixed(2);//Total Amount of Service
    res.g27 = pResponse.substring(145, 146);//Language of the Insured

    var lastPos = 146;

    //Repeat for number of times specified by G06.

    for (var j = 0; j < res.g06; j++) {
        res.f07[j] = parseInt(pResponse.substring(lastPos, lastPos + 1));
        lastPos += 1;

        res.g08[j] = pResponse.substring(lastPos, lastPos + 3);
        lastPos += 3;
    }
    return res;
}

function CdaV2ParseEOBResp(pResponse) {
    var res = {};
    res.f07 = []; res.g12 = []; res.g13 = []; res.g14 = []; res.g15 = []; res.g16 = []; res.g17 = [];
    res.g18 = []; res.g19 = []; res.g20 = []; res.g21 = []; res.g22 = []; res.g23 = []; res.g24 = []; res.g25 = [];
    res.g26 = [];

    pResponse = pResponse.toString();
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
    res.g04 = (parseFloat(pResponse.substring(67, 74))/100).toFixed(2);//Total Amount of Service
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
    res.g08 = [];
    pResponse = pResponse.toString();
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
    res.f07 = []; res.g08 = [];
    pResponse = pResponse.toString();
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


//============================================= Common functions =============================================
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


function CdaV2FormatField(pValue, pFormatType, pRequiredLength) {
    //convert input value to string.

    var v = (pValue) ? String(pValue) : '';
    v = v.trim();

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
                v = v.replace(/-/g, '');// Replase '-' from date.

                if (!Number.isInteger(Number(v))) {
                    alert('adoV2FormatField Error: value is not an integer.');
                }
                else {
                    var len = v.length;
                    if (len < pRequiredLength) {
                        var asciiZero = String.fromCharCode(48);
                        //Fill with zeros.
                        
                        while (v.length < pRequiredLength) {
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
                    while (v.length < pRequiredLength) {
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

function CdaV2GetDataFromDB() {

    $.ajax(
        {
            url: globCdaNetAPIuri + "PostGenerTransaction",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ Version: '2', TransactionType: globCdanetTranscode, NoDossier: globNoDossier, Dentiste: globDentist}),
            success: function (result) {
                switch (globCdanetTranscode) {
                    case '1'://Claim
                    case '2'://Claim reversial
                        {
                            globCdaDataFromDB = result;
                            CdaV2CallCDAService();
                        }
                        break;
                    case '3'://Predetermination
                        {
                            globCdaDataFromDB = result;
                            PlnTrSendToCdaNet();
                        }
                }

                //console.log(result);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //debugger;
                alert(xhr.statusText);
            }
        });
}

//Returns number of procedures 
function CdaV2GGetNumProcedures() {
    var count = 0;
    for (var i = 0; i < arrGrilleDeFacturation.length; i++) {
        if (arrGrilleDeFacturation[i].Type != 'AMQ' && arrGrilleDeFacturation[i].Type != 'BES' && arrGrilleDeFacturation[i].Type != 'HOP')
            count++;
    }
    return count;
}

function CdaV2CreateRespMessage(pResp, pResponseLine)
{
    var ResponseList = '';

    if (![2, 4, 5, 6, 99].includes(parseInt(globCdanetTranscode)))
    {
        var lastName = (globVisionRData && globVisionRData.NomPers) ? globVisionRData.NomPers : '';
        var firstName = (globVisionRData && globVisionRData.PrePers) ? globVisionRData.PrePers : '';
        ResponseList += 'Patient: ' + lastName + ' ' + firstName + '\n';

        var assurance = (globVisionRData && globVisionRData.InsTypeList && globVisionRData.InsTypeList.length > 0) ? globVisionRData.InsTypeList[0] : '';
        ResponseList += 'Assurance: ' + assurance + '\n';
    }

    var noSequence = (pResp.a02) ? pResp.a02 : '';
    ResponseList += 'No de Séquence: ' + noSequence +'\n';

    var respCode = (pResp.a04) ? pResp.a04 : '';
    ResponseList += 'Code de réponse: ' + respCode + '\n';

    if (respCode == '21')//adjudicated ,explanation of benefits
    {
        ResponseList += CdaV2GetResponseListForEOB(pResp);
    }
    else if (respCode == '11')//Claim acknowledge
    {
        ResponseList += CdaV2GetResponseListForClaimAck(pResp);
    }
    else if (respCode == '13')// Predetermination(paln de trait) acknowledge
    {
        ResponseList += CdaV2GetResponseListForPredeterm(pResp);
    }
    else if (respCode == '12')// Claim Reversal Response
    {
        ResponseList += CdaV2GetResponseListForClaimRevers(pResp);
    }
    else if (respCode == '10')// eligibility  Response
    {
        ResponseList += CdaV2GetResponseListForEligibil(pResp);
    }
    else
        ResponseList += 'La réponse n\'a pas pu être interprétée. Veuillez vérifier la réponse reçue ci-dessous.\n-----------------------\n' + pResponseLine;
    
    return ResponseList;
}

function CdaV2GetResponseListForEOB(pResp)
{
    var ResponseList = '';
    ResponseList += 'Réponse à la demande de réglement: Réclamation acceptée\n';
    var gTransref = (pResp.g01) ? pResp.g01 : '';
    ResponseList += 'No de Référence: ' + gTransref + '\n';

    var gNoConfirm = (pResp.g30) ? pResp.g30 : '';
    objResponseList = 'No de confirmation: ' + gNoConfirm + '\n';

    var montantReclame = (isNaN(parseFloat(pResp.g04))) ? 0 : parseFloat(pResp.g04);
    ResponseList += 'Montant réclamé: ' + montantReclame.toFixed(2) + '\n';

    var montantDuDeductibleNonAlloue = (isNaN(parseFloat(pResp.g29))) ? 0 : parseFloat(pResp.g29);
    ResponseList += 'Montant du déductible non alloué: ' + montantDuDeductibleNonAlloue.toFixed(2) + '\n';

    var montantTotalRembourse = (isNaN(parseFloat(pResp.g28))) ? 0 : parseFloat(pResp.g28);
    ResponseList += 'Montant total remboursé: ' + montantTotalRembourse.toFixed(2) + '\n';

    var dateDePaiement = CdaCommConvertDate(pResp.g03);
    ResponseList += 'Date de paiement : ' + dateDePaiement + '\n';

    var g11 = parseInt(pResp.g11);
    g11 = (isNaN(g11)) ? 0 : g11;

    var nNotes = g11;
    if (g11 > 0) //nNotes
    {
        ResponseList += 'Notes (' + nNotes + '):\n';
        for (var i = 0; i < nNotes; i++) {
            ResponseList += CdaCommFrompage850(pResp.g26[i]) + '\n';
        }
    }
    return ResponseList;
}

function CdaV2GetResponseListForClaimAck(pResp)
{
    var ResponseList = '';
    var responsemess = '';
    if (globCdanetTranscode = '00')
        responsemess = 'Réponse à l\'interrogation sur l\'admissibilité: ';
    else
        responsemess = 'Réponse la demande de réglement: ';

    ResponseList += responsemess;
    var responsestatus = pResp.g05;

    switch (responsestatus) {
        case 'R':
            responsemess = 'Réclamation rejetée à cause d\'erreurs.Veuillez corriger les erreurs avant de re-soumettre\n';
            break;
        case 'H':
            responsemess = 'Réclamation reçue par l\'assureur.\nSera traitée à une date ultérieure...\nVous ne recevrez pas de réponse electronique\n';
            break;
        case 'B':
            responsemess = 'Réclamation reçue par le réseau.\nSera envoyée à l\'assureur pour traitement ultérieur \nVous ne recevrez pas de réponse electronique\n';
            break;
        case 'C':
            responsemess = 'Réclamation reçue par la compagnie d\'assurance.\nSera traitée à une date ultérieure...\nVous pourriez recevoir une réponse electronique\n';
            break;
        case 'N':
            responsemess = 'Réclamation reçue par le réseau.\nSera envoyée à l\'assureur pour traitement ultérieur\nVous pourriez recevoir une réponse electronique\n';
            break;
        case 'M':
            responsemess = 'La réclamation doit être soumise manuellement.';
            break;
    }

    ResponseList += responsemess;

    var disposition = (pResp.g07) ? pResp.g07 : '';
    ResponseList += CdaCommFrompage850(disposition) + '\n';

    var gTransref = (pResp.g01) ? pResp.g01 : '';
    ResponseList += 'No de Référence: ' + gTransref + '\n';

    var montantReclame = (isNaN(parseFloat(pResp.g04))) ? 0 : parseFloat(pResp.g04);
    ResponseList += 'Montant réclamé : ' + montantReclame.toFixed(2) + '\n';


    var g06 = parseInt(pResp.g06);
    g06 = (isNaN(g06)) ? 0 : g06;//g06 Number of Error Codes

    ResponseList += 'Nombre d\'erreurs  :' + g06 + '\n';
    for (var i = 0; i < g06; i++)
    {
        if (pResp.f07[i] != 0)// f07 Procedure Line Number
        {
            ResponseList +='Erreur dans le traitement # ' + pResp.f07[i] + ' ; Erreur No ' + CdaCommGetCDANETMessage(pResp.g08);
        }
        else {
            ResponseList += 'Erreur #  ' + CdaCommGetCDANETMessage(pResp.g08);
        }
    }
    return ResponseList;
}

function CdaV2GetResponseListForPredeterm(pResp) {
    var ResponseList = '';
    ResponseList += 'Réponse à la soumission d\'un plan de traitement';
    var responsemess = '';
    var responsestatus = pResp.g05;
    switch (responsestatus) {
        case 'R':
            responsemess = 'Plan de traitement rejeté à cause d\'erreurs.Veuillez corriger les erreurs avant de re-soumettre\n';
            break;
        case 'A':
            responsemess = 'Plan de traitement reçu par l\'assureur.\nSera traité à une date ultérieure.\n';
            break;
        case 'C':
            responsemess = 'Plan de traitement reçu par l\'assureur.\nSera traité à une date ultérieure.\nVous pourriez recevoir les détails par voie électronique.\n';
            break;
    }
    ResponseList += responsemess;
    ResponseList += CdaCommFrompage850(pResp.g07) + '\n'; //g07 disposition;

    ResponseList += 'No de Référence: ' + pResp.g01 + '\n';

    var montantReclame = (isNaN(parseFloat(pResp.g04))) ? 0 : parseFloat(pResp.g04);
    ResponseList += 'Montant réclamé : ' + montantReclame.toFixed(2) + '\n';

    var g06 = parseInt(pResp.g06);
    g06 = (isNaN(g06)) ? 0 : g06;//g06 Number of Error Codes

    ResponseList += 'Nombre d\'erreurs  :' + g06 + '\n';
    for (var i = 0; i < g06; i++) {
        if (pResp.f07[i] != 0)// f07 Procedure Line Number
        {
            ResponseList += 'Erreur dans le traitement # ' + pResp.f07[i] + ' ; Erreur No ' + CdaCommGetCDANETMessage(pResp.g08[i]) + '\n';
        }
        else {
            ResponseList += 'Erreur #  ' + CdaCommGetCDANETMessage(pResp.g08[i]) + '\n';
        }
    }
    return ResponseList;
}

function CdaV2GetResponseListForClaimRevers(pResp) {
    var ResponseList = '';
    ResponseList += 'Réponse à la demande d\'annulation de la réclamation No :' + pResp.a02 + '\n';
    ResponseList += 'No de Référence: ' + pResp.g01 + '\n';
    var Nnotes = pResp.g06; //g06 error codes

    var responsestatus = pResp.g05;
    switch (responsestatus) {
        case 'A':
            responsemess = 'Demande  d\'annulation acceptée...\n';
            break;
        case 'R':
            {
                if (Nnotes != 0) {
                    responsemess = 'Demande  d\'annulation rejetée à cause d\'erreurs...\nVeuillez la re-soumettre après avoir corrigé les erreurs...\n';
                }
                else {
                    responsemess = 'Demande  d\'annulation refusée ...\nVeuillez la soumettre manuellement...\n';
                }
            }
            
            break;
        
        case 'B':
            responsemess = 'Le réseau a reçu la demande d\'annulation et la transmettra à la compagnie d\'assurance...\nPas de réponse électronique retournée.\n';
            break;
        case 'N':
            responsemess = 'Le réseau a reçu la demande d\'annulation et la transmettra à la compagnie d\'assurance...\nPas de réponse électronique retournée.\n';
    }
    ResponseList += responsemess;
    ResponseList += pResp.g07 + '\n'; //g07
    ResponseList += 'Nombre d\'erreurs : ' + Nnotes + '\n';

    for (var i = 0; i < Nnotes; i++)
    {
        ResponseList += 'Erreur No: ' + CdaCommGetCDANETMessage(pResp.g08[i]) + '\n';
    }
    return ResponseList;
}

function CdaV2GetResponseListForEligibil(pResp) {
    var ResponseList = '';
    ResponseList += 'Réponse à l\'interrogation sur l\'admissibilité';

    var gTransref = (pResp.g01) ? pResp.g01 : '';
    ResponseList += 'No de Référence: ' + gTransref + '\n';

    var responsemess = '';
    var responsestatus = pResp.g05;

    switch (responsestatus) {
        case 'E':
        case 'M':
            responsemess = 'Patient admissible...';
        case 'R':
            {
                if (pRes.g06 == 0)
                    responsemess = 'Patient inadmissible...' + '\n';
                else
                    responsemess = 'Il y a des erreurs dans la demande.Veuillez corriger les erreurs avant de la re-soumettre' + '\n';
            }
            break;
        
    }
    ResponseList += responsemess + '\n';
    ResponseList += CdaCommFrompage850(pResp.g07) + '\n'; //g07 disposition;

    var Nnotes = parseInt(pResp.g06);
    Nnotes = (isNaN(Nnotes)) ? 0 : Nnotes;//g06 Number of Error Codes

    if (Nnotes > 0)
    {
        ResponseList += 'Nombre d\'erreurs : ' + Nnotes + '\n';
        for (var i = 0; i < Nnotes; i++)
        {
            ResponseList += 'Erreur No: ' + CdaCommGetCDANETMessage(pResp.g08[i]) + '\n';
        }

    }

    return ResponseList;
}

function CdaV2GetTransactionName(pTransNumber) {
    var transName = '';

    //TODO: Translate to french.
    switch (pTransNumber) {
        case '': transName = ''; break;
        case '00': transName = 'Eligibility'; break;

        case '1':
        case '01': transName = 'Réclamation'; break;

        case '10': transName = 'Eligibility Response'; break;


        case '11': transName = 'Claim Response'; break;
        case '21': transName = 'Explanation of Benefit'; break;

        case '31': transName = 'Coordination of Benefit Claim'; break;

        case '2':
        case '02': transName = 'Annulation'; break;

        case '12': transName = 'Reversal Response'; break;

        case '3':
        case '03': transName = 'Predetermination'; break;

        case '13': transName = 'Response to Pre-Determination'; break;
        case '23': transName = 'Coordination of Benefit Pre-Determination'; break;

        case '4': transName = ''; break;
        case '04': transName = 'Request for Pended Claims'; break;

    }
    return transName;
}

function CdaV2GetEmailFlag()
{
    var res = '';
    if ($('#chkCda2FollowNo').prop('checked'))
    {
        res = '0'
    }
    else if ($('#chkCda2FollowEmail').prop('checked')) {
        res = '1'
    }
    else if ($('#chkCda2FollowLettre').prop('checked')) {
        res = '2'
    }
    return res;
}


