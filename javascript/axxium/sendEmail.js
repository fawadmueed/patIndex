function SendEmail() {
    var arrPdfFiles = printing('email');
    var jsonArrPdfFiles = { "pdfFiles": arrPdfFiles };
    var patientEmail = globVisionRData.Email;

    if (patientEmail) {
        if (arrPdfFiles && arrPdfFiles.length > 0)
        {
            $.post("allScriptsv1.py", { tx: "sendPdf3", json: JSON.stringify(jsonArrPdfFiles), email: patientEmail, clinicId: globClinicId },
            function (result) {
                if (result.outcome === 'success') {
                    displayRamqAnswer("Email", 'Les données ont été envoyées avec succès');
                }
                else if (result.outcome === 'error') {
                    displayRamqAnswer("Email", result.message);
                }

                SendEmailDeletePdfFiles();
            });
        }
    }
    else {
        displayRamqAnswer("Email", 'Le patient n\'a pas d\'adresse e-mail');
    }
}

function SendEmailDeletePdfFiles() {
    $.post("allScriptsv1.py", { tx: "deletePdf" },
            function (result) {
                if (result.outcome === 'error') {
                    alert(result.message);
                }
            });
}

$(window).bind('beforeunload', function (e) {
    return true;
});