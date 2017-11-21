function RamqBillGetList()
{
    RamqBillGetDataFromServer();
}

function RamqBillGetDataFromServer()
{
    var dateFrom = $("#rgie_fact_ane_start").val();
    var dateTo = $("#rgie_fact_ane_end").val();
    $.post("allScriptsv1.py", { tx: "getPatientFactures", patientId: globPatientId, dFrom: dateFrom, dTo: dateTo },
            function (result) {
                if (result.message !== undefined)
                    alert(result.message);
                else {
                    if (result.factures.length > 0) {
                        var arrDataForTable = RamqBillGetDataForTable(result.factures);
                        RamqBillPopulateTable(arrDataForTable);
                    }
                }
            });
}

function RamqBillGetDataForTable(pArrDataFromServer)
{
    var arrData = [];
    for (var i = 0; i < pArrDataFromServer.length; i++)
    {
        var objInputData = pArrDataFromServer[i];
        var objOutputData = {};
        objOutputData.Dossier = objInputData.nodossier;//Dossier
        objOutputData.RamqNo = RamqBillGetNoRamq(objInputData.info); //#RAMQ
        objOutputData.Date = objInputData.date;
        objOutputData.FactureNo = objInputData.facture;
        objOutputData.Nom = "";
        objOutputData.Prenom = "";
        objOutputData.Montant = RamqBillGetMontant(objInputData.info); //Montant
        objOutputData.Status = RamqBillGetStatus(objInputData.info)

        arrData.push(objOutputData);
    }
    return arrData;
}

function RamqBillPopulateTable(pArrDataForTable)
{
    $('#rgie_fact_table tbody').empty();
    var tableContent = "";

    for(var i = 0; i<pArrDataForTable.length; i++)
    {
        tableContent += '<tr>';
        //tableContent += '<td onclick = "RamqBillPopulatDetailsArrays(' + pArrDataForTable[i].FactureNo + ')">' + pArrDataForTable[i].Dossier + "</td>"; //Dossier
        tableContent += '<td>' + pArrDataForTable[i].Dossier + "</td>"; //Dossier
        tableContent += "<td>" + pArrDataForTable[i].RamqNo + "</td>"; //#RAMQ
        tableContent += "<td>" + pArrDataForTable[i].Date + "</td>"; //Date
        tableContent += "<td>" + pArrDataForTable[i].FactureNo + "</td>"; //No de Facture
        tableContent += "<td>" + pArrDataForTable[i].Nom + "</td>"; //Nom
        tableContent += "<td>" + pArrDataForTable[i].Prenom + "</td>"; //Prenom
        tableContent += "<td>" + pArrDataForTable[i].Montant + "</td>"; //Montant
        tableContent += "<td>" + pArrDataForTable[i].Status + "</td>"; //Status
        tableContent += "</tr>";
    }
    $('#rgie_fact_table tbody').append(tableContent);
}

function RamqBillGetNoRamq(pObjDataFromServer)
{
    var ramqNo = pObjDataFromServer[0][1].IdPers;
    return ramqNo;
}


function RamqBillGetMontant(pObjDataFromServer)
{
    return "";
}

function RamqBillGetStatus(pObjDataFromServer)
{
    return "";
}

function RamqBillPopulatDetailsArrays(pBillNumber)
{
    alert(pBillNumber);
}





    