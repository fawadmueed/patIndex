function RamqBillGetList()
{
    var arrDataFromServer = RamqBillGetDataFromServer();
    if (arrDataFromServer.length > 0)
    {
        var arrDataForTable = RamqBillGetDataForTable(arrDataFromServer);
        RamqBillPopulateTable(arrDataForTable);
    }
}

function RamqBillGetDataFromServer()
{
    var arrData = [];
    var dateFrom = $("#rgie_fact_ane_start").val();
    var dateTo = $("#rgie_fact_ane_end").val();
    $.post("allScriptsv1.py", { tx: "getPatientFactures", patientId: globPatientId, dFrom: dateFrom, dTo: dateTo },
            function (result) {
                if (result.message !== undefined)
                    alert(result.message);
                else {
                    arrData = result;//Need to TEST!!!
                    //var items = [];
                    //$.each(result, function (key, val) {

                    //    if (key == "files") {
                    //        items.push("<table>");
                    //        $.each(val, function (keyin, valin) {
                    //            items.push("<tr>");
                    //            items.push("<td>&nbsp;<a href=\"#\">" + valin.facture + "</a></td><td>&nbsp;" + valin.date + "</td>");
                    //            items.push("</tr>");
                    //        });
                    //        items.push("</table>");
                    //    }

                    //    if (key == "count") {
                    //        if (val == '0')
                    //            items.push("<h2>not files found<h2>");
                    //    }

                    //});
                    //$("#message").append(items.join(""));
                }
            });
    return arrData;
}

function RamqBillGetDataForTable(pArrDataFromServer)
{
    var arrData = [];
    for (var i = 0; i < pArrDataFromServer.length; i++)
    {
        arrData[i][0] = RamqBillGetNoDossier(pArrDataFromServer[i]); //Dossier
        arrData[i][1] = RamqBillGetNoRamq(pArrDataFromServer[i]); //#RAMQ
        arrData[i][2] = RamqBillGetFactureDate(pArrDataFromServer[i]); //Date
        arrData[i][3] = RamqBillGetNoFacture(pArrDataFromServer[i]); //No de Facture
        arrData[i][4] = ""; //Nom
        arrData[i][5] = ""; //Prenom
        arrData[i][6] = RamqBillGetMontant(pArrDataFromServer[i]); //Montant
        arrData[i][7] = RamqBillGetStatus(pArrDataFromServer[i]); //Status
    }
    return arrData;
}

function RamqBillPopulateTable(pArrDataForTable)
{
    $('#rgie_fact_table tbody').empty();
    var tableContent = "";
    var noFacture = pArrDataForTable[i][3];
    for(var i = 0; i<pArrDataForTable.length; i++)
    {
        tableContent += '<tr onclick = "RamqBillPopulatDetailsArrays(' + noFacture + ') ">';
        tableContent += "<td>" + pArrDataForTable[i][0] + "</td>"; //Dossier
        tableContent += "<td>" + pArrDataForTable[i][1] + "</td>"; //#RAMQ
        tableContent += "<td>" + pArrDataForTable[i][2] + "</td>"; //Date
        tableContent += "<td>" + noFacture + "</td>"; //No de Facture
        tableContent += "<td>" + pArrDataForTable[i][4] + "</td>"; //Nom
        tableContent += "<td>" + pArrDataForTable[i][5] + "</td>"; //Prenom
        tableContent += "<td>" + pArrDataForTable[i][6] + "</td>"; //Montant
        tableContent += "<td>" + pArrDataForTable[i][7] + "</td>"; //Status
        tableContent += "</tr>";
    }
    $('#tableIdXXXXXXXXXXXXXX tbody').append(tableContent);
}

function RamqBillGetNoRamq(pObjDataFromServer)
{
    
}

function RamqBillGetNoFacture(pObjDataFromServer)
{

}

function RamqBillGetMontant(pObjDataFromServer)
{

}

function RamqBillGetStatus(pObjDataFromServer)
{

}

function RamqBillGetNoDossier(pObjDataFromServer) {

}

function RamqBillGetFactureDate(pObjDataFromServer) {

}


    