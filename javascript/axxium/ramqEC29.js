// Download new Etat de Compte. If new Etat de Compte is not accesible, display error message.
//This method should be called when the button 
function RamqECDownloadNew()
{
    if (globClinicId !== '') {
        $.post("RamqService.py", { tx: "getEtatCompte", clinicId: globClinicId, TypEntIntvnEchgs: 'NT' },
            function (result) {
                if (result.outcome === 'error')
                    alert(result.message);
                else
                {
                    RamqECDownloadFromServer(result.message);
                }
            });
    }
    else {
        alert("Clinic Id is not defined.");
    }
}

//Returns the list of all EC.zip files from server, for given clinic and period
function RamqECGetList()
{
    var startDate = $('#').val();
    var endDate = $('#').val();
    
    $.post("allScriptsv1.py", { tx: "getECFiles", clinicId: globClinicId, dFrom: startDate, dTo: endDate },
            function (result) {
                if (result.message !== undefined)
                    alert(result.message);
                else {
                    //TODO: put real tableId
                    $('#tableIdXXXXXXXXXXXXXX tbody').empty();
                    var tableContent = "";
                    $.each(result, function (key, val) {
                        if (key == "files") {
                            items.push("<table>");
                            $.each(val, function (keyin, valin) {
                                tableContent += "<tr>";
                                tableContent += "<td>" + valin.date + "</td>";
                                tableContent += "<td><a href='" + valin.url + "'>" + valin.file + "</a></td>";
                                tableContent += "</tr>";
                            });
                            //TODO: put real tableId
                            $('#tableIdXXXXXXXXXXXXXX tbody').append(tableContent);
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