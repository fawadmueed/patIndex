// Download new Etat de Compte. If new Etat de Compte is not accesible, display error message.
//This method should be called when the button 
function RamqECDownloadNew()
{
    if (globClinicId !== '') {
        //Show progress
        document.getElementById("loaderMain").setAttribute("class", "ui active inverted dimmer");
        $.post("allScriptsv1.py", { tx: "getEtatCompte", clinicId: globClinicId, TypEntIntvnEchgs: 'NT' },
            function (result) {
                // Hide progress
                document.getElementById("loaderMain").setAttribute("class", "ui inverted dimmer");
                if (result.outcome === 'error')
                    displayAlert("RAMQ", RamqECParseErrorMessage(result.message));
                else
                {
                    RamqECDownloadFromServer(result.message);
                }
            });
    }
    else {
        displayAlert("RAMQ", "Clinic Id is not defined.");
    }
}

//Returns the list of all EC.zip files from server, for given clinic and period
function RamqECGetList()
{
    var startDate = $('#date_entre_etat_compte').val();
    var endDate = $('#date_entre_etat_compte2').val();
    
    
    $.post("allScriptsv1.py", { tx: "getECFiles", clinicId: globClinicId, dFrom: startDate, dTo: endDate },
            function (result) {
                
                if (result.message !== undefined){
                    displayRamqAnswer("RAMQ", result.message);
                }
                else {
                    $('#etat_compte_table tbody').empty();
                    var tableContent = "";
                    $.each(result, function (key, val) {
                        if (key == "files") {
                            //items.push("<table>");
                            $.each(val, function (keyin, valin) {
                                tableContent += "<tr>";
                                tableContent += "<td>" + valin.date + "</td>";
                                tableContent += "<td><a href='" + valin.url + "'>" + valin.file + "</a></td>";
                                tableContent += "</tr>";
                            });
                            $('#etat_compte_table tbody').append(tableContent);
                        }
                    });
                }
            });
}

function RamqECDownloadFromServer(pFilePath)
{
    var a = document.createElement('a');
    //a.href = window.URL.createObjectURL(result.message); 
    a.href = pFilePath;
    //a.download = fileName; // Set the file name.
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    delete a;
}

function RamqECParseErrorMessage(pErMes)
{
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(pErMes, "text/xml");
    var response = "";
    if (xmlDoc.getElementsByTagName("Erreurs_DS")[0] != null) {
        var errCode = xmlDoc.getElementsByTagName("CodeErreur")[0].childNodes[0].nodeValue;
        var errMsg = xmlDoc.getElementsByTagName("Erreur")[0].childNodes[0].nodeValue;

        response = "Code Erreur: " + errCode + '\n' + 'Erreur: ' + errMsg;

    }
    else
        response = pErMes;
    return response;
}