// Managing RamqCredentials

/*
    Algorithm
    1. When the page is loaded, get ClinicId from url.
    2. When the user goes to Facture tab,  request RamqCredentials (MachineId, MachineIdPass, CreationDate) from our server using ClinicId. (RamqCredentials stored as a json file, one for each clinic at the our server).
        2.1. If request returns error (means MachineId wasn't generated)
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
var globClinicId = "";
var globPatientId = "";
var globNoDossier = "";
var globDentist = "";

//Page load
$(function () {
    //Get parameters from url and put it in global variable
    globClinicId = GetParamFromUrl("clinicId");
    globPatientId = GetParamFromUrl("patientId");
    globNoDossier = GetParamFromUrl("dossierNo");
    globDentist = GetParamFromUrl("dentist");
});

function RamqCheckCredentials()
{
    if (globClinicId !== "") {
        RamqGetCredentials(globClinicId);
    }
    else {
        alert("Clinic Id is not defined!");
    }
}

//Get RamqCredentials for the given clinicId from server and put it in global variable.
function RamqGetCredentials(pClinicId)
{
    var sub = "ramqCredentials";
    //var command = 'allScriptsv1.py?tx=getJSONsub&sub=ramqCreditial&code=' + pClinicId

    $.get("allScriptsv1.py?tx=getJSONsub&sub=ramqCredentials&code=" + pClinicId,
        function (data, status) {
            if (data && data.outcome && data.outcome === 'error') //means file doesn't exist
            {
                //open a popup "Demande d’un identifiant machine"
                $('#message_ramq_credential_alert').html("You have not credentials. Please create new Credentials in Admin panel.");
                ramqCredentialAlert();
            }
            else if (data && data.CreationDate)
            {
                globRamqObjCredentials = data;
                RamqCheckIfMachineIdExpired();
            }
    });
}

//Check if credentials will expired soon.
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
                //open a popup "Credentials expired"
                $('#message_ramq_credential_alert').html("Your Credentials will be expired soon. Do you want to update it?");
                ramqCredentialAlert();
            }
            else {
                //open a popup "Credentials expired"
                $('#message_ramq_credential_alert').html("Your Credentials is expired. Please update it.");
                ramqCredentialAlert();
            }
        }
    }
}


//Call this function when the button OK is clicked on the module UpdateMachineId.
function RamqUpdateMachineId() {
    $.post("allScriptsv1.py", { tx: "ChangePassword", clinicId: globClinicId },
            function (result) {
                if (result.outcome === 'error')
                    alert(result.message);
                else
                    alert("Credentials were updated successfully.");
            });
}

function RamqCreateCredentials()
{
    var clinicId = globClinicId;
    var pNoIntervenant = $('#no_trnsm_ramq_new').val();//18011
    var pIdUtilisateur = $('#no_identif_ramq_new').val(); //AGR18011
    var pMotDePasse = $('#acien_mot_ramq_new').val(); //axxium3800c

    $.post("allScriptsv1.py", { tx: "GenerIdMachine", clinicId: clinicId, NoIntervenant: pNoIntervenant, IdUtilisateur: pIdUtilisateur, MotDePasse: pMotDePasse },
            function (result) {
                if (result.outcome === 'error')
                    alert(result.message);
                else
                    alert("Credentials were created successfully.");
            });
}

//Returns number of days between two dates (date2 - date1)
function RamqDayDiff(date1, date2)
{
    var time1 = date1.getTime();
    var time2 = date2.getTime();
    return Math.round((time2 - time1) / (1000 * 60 * 60 * 24));
}


//returns param value for the given param name.
function GetParamFromUrl(name) {
    //TODO: uncomment for production.
    // var url = location.href;
    //var url = window.location.href;
    var url = "http://myserver/action?clinicId=AGP18011&patientId=234577&dossierNo=000192&dentist=MM";// For test only.

    if (!url) url = location.href;
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results === null ? null : results[1];
}

