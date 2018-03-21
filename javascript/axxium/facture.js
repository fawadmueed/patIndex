function factureResponseClose() {
    $('#amq_total').val(globRamqTotal.toFixed(2));
    modPayment();
    //if (globRamqTotal > -2) { //-2 means error occurs, -1: bill was canceled
    //    //Sending data to Visionr.
    //    var curDate = RamqGetCurrentDate();
    //    var xml = RamqCreateXmlForVisionR(0, curDate, 0.00, 0.00, 0.00);
    //    var inputXMl = { "data": xml };

    //    $.post("allScriptsv1.py", { tx: "SendXmlToVisionR", nodossier: globNoDossier, nofact: globBillNumber, json: JSON.stringify(inputXMl) },
    //        function (result) {
    //            if (result.outcome == 'success') {
    //                $('.facture_response').modal('hide');
    //                var msg = 'Les données ont été envoyées à VisionR avec succès.';
    //                modMessage('VisionR', msg);
    //            }
    //            else if (result.outcome == 'error') {
    //                modMessage('VisionR Erreur', result.message);
    //            }
    //        });
    //}
    //else {
    //    $('.facture_response').modal('hide');
    //}
}

function openFactureModal() {
    modFacture();
}