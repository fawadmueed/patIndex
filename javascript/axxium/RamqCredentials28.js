// Managing RamqCredentials

/*
    Algorithm
    1. When the page is loaded, get ClinicId from url.
    2. Request RamqCredentials (MachineId, MachineIdPass, CreationDate) from our server using ClinicId. (RamqCredentials stored as a json file, one for each clinic at the our server).
        2.1. If request returns null (means MachineId wasn't generated)
            - open a popup "Demande d’un identifiant machine".
            - user should put three parameters in the appropriate textboxes (or we can get this parameters from VisionR if they have it in the database):
                - Numéro de transmission de l’agence;
                - L’identifiant TIP-I de l’agence;
                - Mot de passe TIP-I de l’agence;
            - send these parameters to RAMQ in order to get MachineId and MachineIdPassword.
            - save MachineId and MachineIdPassword in the json file in our server.
        2.2. If request returns credentials (means MachineId was generated),
            -Check expiration date.
                - if credentials will be expired soon (less than 5 days), 
                    - show popup that allows user to insert three parameters:
                        - Numéro de transmission de l’agence (we can get it from VisionR if they have it).
                        - Identifiant machine (we can get it from Credentials json file from our server).
                        - Ancien Mot De Passe (we can get it from Credentials json file from our server).
                    - send these parameters to RAMQ in order to get new MachineIdPassword
                    - get new MachineIdPassword and save it in the appropriate json file.
    Also, user should be able to change MachineIdPassword at any time. So, we need an appropriate button anywhere.
   

*/

var globServerUrl = 'http://144.217.219.194/axxium/';
var globRamqApiPath = "http://semiosisaxxiumwebapi20171101022833.azurewebsites.net/";
var globRamqObjCredentials;
//var globClinicId;

//TODO: call this function from PageLoad event.
$(function () {
    RamqGetClinicIdFromUrl();
});

function RamqGetClinicIdFromUrl()
{
    //TODO: uncomment for production.
    // var url = location.href;
    var url = "http://myserver/action?clinicId=AGR18011";// For test only.
    var clinicId = GetParamFromUrl("clinicId", url);
    if (clinicId != null && clinicId != "") {
        RamqGetCredentials(clinicId);
    }
    else {
        alert("Clinic Id is not defined!");
    }
}

//Get RamqCredentials for the given clinicId from server and put it in global variable.
function RamqGetCredentials(pClinicId)
{
    //TODO: call method on server side to get credentials for clinic.
    var methodName = "json/ramqCredentials/AGR18011.json";
    var path = globServerUrl + methodName;
    var data = new FormData();
    data.append("clinicId", pClinicId);

    $.ajax({
        type: "POST",
        url: path,
        data: data,
        //contentType: false,
        processData: false,
        //contentType: "application/json; charset=utf-8",
        //dataType: "json",
        success: function (result) {
            if (result != null) //Credential file exist
            {
                globRamqObjCredentials = result;
                RamqCheckIfMachineIdExpired();
            }
            else //credentials file doesn't exist.
            {
                RamqCreateCredentials();
            }
        },
        error: function (xhr) {
            alert("Error!");
        }
    });
}

function RamqCheckIfMachineIdExpired()
{
    if (globRamqObjCredentials.CreationDate && globRamqObjCredentials.CreationDate!=="")
    {
        var creationDate = new Date(globRamqObjCredentials.CreationDate);
        var currentDate = new Date();
        var dayDiff = RamqDayDiff(creationDate, currentDate);
        if (dayDiff > 25) {
            var numberDaysUntilExpiration = 30 - dayDiff;
            if (numberDaysUntilExpiration > 0) {
                // TODO: change alert to popup;
                alert("Your MachineId will expired in " + numberDaysUntilExpiration + " days. Do you want to update it?");
            }
            else {
                // TODO: change alert to popup;
                alert("Your MachineId is expired. Please update it");
            }
            // TODO: Remove after testing.
            RamqUpdateMachineId();
        }
    }
}

//Call this function when the button OK is clicked on the module UpdateMachineId.
function RamqUpdateMachineId() {
    //Populate popup fields from global var.
    //$("#").val(globRamqObjCredentials.machineId);
    //$("#").val(globRamqObjCredentials.MotDePasseMachine);


    //get parameters from popup
    var transmissionNumber = '18011';//$("#").val();
    var machineId = "AGR18011K";// $("#").val();
    var oldPassword = "rT_Xw^9M";// $("#").val();
    var newPassword = "MyPass1";// $("#").val();
    var errorMsg = "";

    var dataJSON = { CodeErreur: '', NoIntervenant: transmissionNumber, IdMachine: machineId, AncienMotDePasse: oldPassword, MotDePasseMachine: newPassword, ServerError: "" }
    var _data = JSON.stringify(dataJSON);
    $.ajax({
        type: "POST",
        url: globRamqApiPath + 'api/RamqWebApi/PostChangePassword',
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, status, jqXHR) {
            if (data.CodeErreur != '')
            {
                errorMsg = "Code Erreur: " + data.CodeErreur;
            }
            if (data.ServerError != '')
            {
                errorMsg += "Server Erreur: " + data.ServerError;
            }
            if (errorMsg != "")
                alert(errorMsg);
        },
        error: function (xhr) {
            if (xhr.responseJSON != null)
                alert(xhr.responseJSON.ExceptionMessage);
        }
    });
}

//Returns number of days between two dates (date2 - date1)
function RamqDayDiff(date1, date2)
{
    var time1 = date1.getTime();
    var time2 = date2.getTime();
    return Math.round((time2 - time1) / (1000 * 60 * 60 * 24));
}



//function GetParamFromUrlTest()
//{
//    //var url = window.location.href;
//    //var url = "http://myserver/action?myParam=2";
//    var url = null;
//    var paramName = "myParam";
//    alert(GetParamFromUrl(paramName, url));
    
//}

//returns param value for the given param name.
function GetParamFromUrl(name, url) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? null : results[1];
}

