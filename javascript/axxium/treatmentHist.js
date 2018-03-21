function TrHistGetDataFromDB() {

    var uri = 'http://ec2-52-38-58-195.us-west-2.compute.amazonaws.com/axxium/api/InsuranceWebApi/';
    $.ajax(
        {
            url: uri + 'PostTreatmentHistory',
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ NoDossier: globNoDossier, Dentiste: globDentist }),
            success: function (result) {
                globTreatHist=result;
                TrHistDraw(result);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.statusText);
            }
        });
}

function TrHistDraw(pArrHist)
{
    if (pArrHist && pArrHist.length>0 && mapping)
    {
        for (var i = 0; i < pArrHist.length; i++)
        {
            odonto.exist.push({ "code": pArrHist[i].code, "tooth": pArrHist[i].dent, "surface": pArrHist[i].surface, "note": "" });
        }
        drawOdonFact("odonto2");
        drawOdonFact("odonto3"); //Plan de traitement
    }
}
