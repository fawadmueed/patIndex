  // Edit this new file : Data grabbed on the PATIENT New TAB , have to disable some lines in getAxxium 


  function fullLoadPatient()
  {

          //alert(curPatient);
          displayPatient(curPatient);
          resetPatient();
          loadPHO(curPatient);
          loadANT(curPatient, false);
          loadEXAMS(curPatient, false);
          loadODONS(curPatient, false);
          loadPARS(curPatient, false);
          loadPLANS(curPatient, false);
          loadENTS(curPatient, false);
          loadTRAS(curPatient, false);
          loadORDS(curPatient, false);
          loadDOCS(curPatient, false);
          loadLABOS(curPatient);
          $('#context1 .menu .item').tab({ 'onVisible':function(aTab){context:$('#context1'); updateAvail(aTab)}});
          $('#context1 .menu .item').tab('change tab', 'patient');
          // $('#context2 .menu .item').tab({'onVisible':function(aTab){context:$('#context2'); updateAvail(aTab)}});
          // $('#context2 .menu .item').tab('change tab', 'patient');
  }
  
  function addAxxium()
  {
        curPatient = patAxxium["id"];
    var d = new Date();
    qFilePat = "P_" + curPatient + "_" + d.getTime();
        $('.modalSearch.modal').modal('hide');
        $.post("allScriptsv1.py", {tx: "uploadJSONsub", sub: "patients", name: qFilePat, json: JSON.stringify(patAxxium)}, function(result){
              //alert("Le patient a été enregistré. "+curPatient);
              $('.modalAxxium.modal').modal('hide');
            REloadPAT();
        });
  }
  
  function cancelAxxium()
  {
    $('.modalSearch.modal')
    .modal({
      closable  : false,
      onDeny    : function(){
        return false;
      }
    })
    .modal('show');
  }
  
  function getAxxium()
  {
    axxNumber = document.getElementById("axxNumber").value;
    var isThere = false;
    for (pat in qPAT.patients)
    {
      if (axxNumber == qPAT.patients[pat]["id"]) isThere = true
    }
    if (isThere)
    {
      alert("Le dossier "+axxNumber+" est déjà dans le sans-papier");
    }
    else
    {    

        $.get("http://localhost:8080/Axxium/WebService/PatientInfo.asmx/getPatient?id="+axxNumber, function(data, status){
          //data="hi Fawad";
          //alert("Data: " + data + "\nStatus: " + status);
          var xmlString = (new XMLSerializer()).serializeToString(data);
          //alert(xmlString);
          var pos1 = xmlString.indexOf('{');
          var pos2 = xmlString.indexOf('}');
          //alert(pos1+"/"+pos2);
          //alert(xmlString.substring(pos1,pos2+1));
          patAxxium = JSON.parse(xmlString.substring(pos1,pos2+1));
          //alert(patAxxium["NAM"]);
          if (patAxxium["id"])
          {
            //{"id":"1","NAM":"AXXA11102590","last":"AXXIUM","first":"AXXIUM","birth":"2011/10/25"}
            document.getElementById("ElastA").value = patAxxium["last"];
            document.getElementById("EfirstA").value = patAxxium["first"];
            document.getElementById("EIDA").value = patAxxium["id"];
            document.getElementById("ENAMA").value = patAxxium["NAM"];
            document.getElementById("EbirthA").value = patAxxium["birth"];
            $('.modalSearch.modal').modal('hide');
            $('.modalAxxium.modal').modal('show');
          }
          else
          {
            alert("Dossier introuvable");
          }
          });
    }
  }
  
  function getSign(aRole,aTab)
  {
    signTxt = '<i class="write icon"></i>Signature ';
    if (aTab == "ANT") signTxt = signTxt + "des antécédents ";
    if (aTab == "EXA") signTxt = signTxt + "de l'examen dentaire ";
    if (aTab == "ODO") signTxt = signTxt + "de l'odontogramme ";
    if (aTab == "TRA") signTxt = signTxt + "des traitements ";
    if (aTab == "PAR") signTxt = signTxt + "des mesures ";
    if (aTab == "PLA") signTxt = signTxt + "du plan de traitements ";
    if (aTab == "ENT") signTxt = signTxt + "de l'entente de paiement ";
    if (aTab == "ORD") signTxt = signTxt + "de l'ordonnance ";
    if (aTab == "DOC") signTxt = signTxt + "du document ";
    if (aRole == 0) signTxt = signTxt + 'par ' + curName;
    document.getElementById("signHeader"+aRole).innerHTML = signTxt;
    signID = "sigBelow" + aTab + aRole;
    signDateID = "dateBelow" + aTab + aRole;
    signRole = aRole;
    signTab = aTab;
        existingSign = "";
      keyNumS = "";
    if (aRole == 0)
    {
      if (firstSign0) 
      {
        //$('#signature0').jSignature();
        $('#signature0').jSignature({width:600,height:200});
        firstSign0 = false;
      }
      else
      {
        $('#signature0').jSignature("reset");
      }
      $('.modalSign0.modal').modal('show');
    }
    if (aRole == 1)
    {
      if (firstSign1) 
      {
        //$('#signature1').jSignature();
        $('#signature1').jSignature({width:600,height:200});
        firstSign1 = false;
      }
      else
      {
        $('#signature1').jSignature("reset");
      }
      keyNumS = "";
      $('.modalSign1.modal').modal('show');
    }
  }
  
  function displaySign(aJSON,aTab)
  {
      if (aTab == "ANT" || aTab == "EXA")
      {
        if (aJSON["qHeader"]["signFile0"])
        {
          //document.getElementById("sigBelow"+aTab"+"0").src = aJSON["qHeader"]["sign0"];
          $.get("allScriptsv1.py?tx=getJSONsub&sub=signatures&code="+aJSON["qHeader"]["signFile0"]+"&rand="+Math.random(), function(data, status){
            document.getElementById("sigBelow"+aTab+"0").src = data["sign"];
        });
          document.getElementById("dateBelow"+aTab+"0").innerHTML = curName + ", " + aJSON["qHeader"]["date0"];
        }
        else
        {
          //alert("displaySign "+aTab);
          document.getElementById("sigBelow"+aTab+"0").src = "";
          document.getElementById("dateBelow"+aTab+"0").innerHTML = "";
        }
        if (aJSON["qHeader"]["signFile1"])
        {
          //document.getElementById("sigBelow"+aTab+"1").src = aJSON["qHeader"]["sign1"];
          $.get("allScriptsv1.py?tx=getJSONsub&sub=signatures&code="+aJSON["qHeader"]["signFile1"]+"&rand="+Math.random(), function(data, status){
            //alert("Retreived signature "+aJSON["qHeader"]["signFile1"]);
            document.getElementById("sigBelow"+aTab+"1").src = data["sign"];
            document.getElementById("dateBelow"+aTab+"1").innerHTML = data["name"] + ", " + data["prat"] + ", " + aJSON["qHeader"]["date1"];
        });
        }
        else
        {
          document.getElementById("sigBelow"+aTab+"1").src = "";
          document.getElementById("dateBelow"+aTab+"1").innerHTML = "";
        }
      }
      else
      {
        if (aJSON["signFile0"])
        {
          //document.getElementById("sigBelow"+aTab"+"0").src = aJSON["sign0"];
          $.get("allScriptsv1.py?tx=getJSONsub&sub=signatures&code="+aJSON["signFile0"]+"&rand="+Math.random(), function(data, status){
            document.getElementById("sigBelow"+aTab+"0").src = data["sign"];
        });
          document.getElementById("dateBelow"+aTab+"0").innerHTML = curName + ", " + aJSON["date0"];
        }
        else
        {
          //alert("displaySign "+aTab);
          document.getElementById("sigBelow"+aTab+"0").src = "";
          document.getElementById("dateBelow"+aTab+"0").innerHTML = "";
        }
        if (aJSON["signFile1"])
        {
          //document.getElementById("sigBelow"+aTab+"1").src = qENT["sign1"];
          $.get("allScriptsv1.py?tx=getJSONsub&sub=signatures&code="+aJSON["signFile1"]+"&rand="+Math.random(), function(data, status){
            document.getElementById("sigBelow"+aTab+"1").src = data["sign"];
            document.getElementById("dateBelow"+aTab+"1").innerHTML = data["name"] + ", " + data["prat"] + ", " + aJSON["date1"];
        });
        }
        else
        {
          document.getElementById("sigBelow"+aTab+"1").src = "";
          document.getElementById("dateBelow"+aTab+"1").innerHTML = "";
        }
      }
  }

  function keyEntryS(aNumS)
  {
    if (aNumS == -2)
    {
        keyNumS = "";
    }
    else
    {
      if (aNumS == -1)
      {
      if (keyNumS.length > 0) keyNumS = keyNumS.substr(0,keyNumS.length-1);
      }
      else
      {
      keyNumS = keyNumS + aNumS;
      if (keyNumS.length == 4)
      {
            $.get("allScriptsv1.py?tx=getJSONsub&sub=signatures&code=S_"+keyNumS+"&rand="+Math.random(), function(data, status){
              //alert(data["sign"]);
              if (data["sign"])
              {
                $('#signature1').jSignature("reset");
                $("#signature1").jSignature("importData",data["sign"]);
                existingSign = "S_"+keyNumS;
                existingName = data["name"];
                existingPrat = data["prat"];
              keyNumS = "";
              }
              else
              {
                alert("Le code numérique est inconnu");
              keyNumS = "";
              }
          });
      }
      }
    }
  }
  
  function saveSign()
  {
    //alert(signDateID);
    var d = new Date();
    var ddj = d.getFullYear() + '/' + twoDigits(d.getMonth() + 1) + '/' + twoDigits(d.getDate());
  var datapair = $('#signature'+signRole).jSignature("getData");
  document.getElementById(signID).src = datapair;
  if (existingSign.length > 0)
  {
    if (signRole == 0)
    {
      document.getElementById("dateBelow" + signTab + signRole).innerHTML = curName + ", " + ddj;
    }
    else
    {
      document.getElementById("dateBelow" + signTab + signRole).innerHTML = existingName + ", " + existingPrat + ", " + ddj;
    }
    newSign = existingSign;
      if (signTab == "ANT")
      {
        qJSON["qHeader"]["signFile"+signRole] = newSign;
        qJSON["qHeader"]["date"+signRole] = ddj;
        uploadANT(qFile);
      }
      if (signTab == "EXA")
      {
        qEXA["qHeader"]["signFile"+signRole] = newSign;
        qEXA["qHeader"]["date"+signRole] = ddj;
        uploadEXA(qFileExa);
      }
      if (signTab == "ODO")
      {
        odonto["signFile"+signRole] = newSign;
        odonto["date"+signRole] = ddj;
        uploadODO(qFileOdo);
      }
      if (signTab == "PAR")
      {
        paro["signFile"+signRole] = newSign;
        paro["date"+signRole] = ddj;
        uploadPAR(qFileParo);
      }
      if (signTab == "PLA")
      {
        qPLAN["signFile"+signRole] = newSign;
        qPLAN["date"+signRole] = ddj;
        uploadPLA(qFilePlan);
      }
      if (signTab == "ENT")
      {
        qENT["signFile"+signRole] = newSign;
        qENT["date"+signRole] = ddj;
        uploadENT(qFileEnt);
      }
      if (signTab == "TRA")
      {
        qTRA["signFile"+signRole] = newSign;
        qTRA["date"+signRole] = ddj;
        uploadTRA(qFileTrait);
      }
      $('.modalSign'+signRole+'.modal').modal('hide');
  }
  else
  {
          newSign = "S_"+curPatient+"_"+d.getTime();
    var signJ = { };
    signJ["name"] = curName;
    signJ["prat"] = "";
    signJ["code"] = curPatient;
    signJ["sign"] = datapair;
          $.post("uploadJSONsub.py", {sub: "signatures", name: newSign, json: JSON.stringify(signJ)}, function(result){
                //alert("La signature a été enregistrée. "+newSign);
      if (signRole == 0)
      {
        document.getElementById("dateBelow" + signTab + signRole).innerHTML = curName + ", " + ddj;
      }
      else
      {
        document.getElementById("dateBelow" + signTab + signRole).innerHTML = curDentist + ", " + ddj;
      }
        if (signTab == "ANT")
        {
          qJSON["qHeader"]["signFile"+signRole] = newSign;
          qJSON["qHeader"]["date"+signRole] = ddj;
          uploadANT(qFile);
        }
        if (signTab == "EXA")
        {
          qEXA["qHeader"]["signFile"+signRole] = newSign;
          qEXA["qHeader"]["date"+signRole] = ddj;
          uploadEXA(qFileExa);
        }
        if (signTab == "ODO")
        {
          odonto["signFile"+signRole] = newSign;
          odonto["date"+signRole] = ddj;
          uploadODO(qFileOdo);
        }
        if (signTab == "PAR")
        {
          paro["signFile"+signRole] = newSign;
          paro["date"+signRole] = ddj;
          uploadPAR(qFileParo);
        }
        if (signTab == "PLA")
        {
          qPLAN["signFile"+signRole] = newSign;
          qPLAN["date"+signRole] = ddj;
          uploadPLA(qFilePlan);
        }
        if (signTab == "ENT")
        {
          qENT["signFile"+signRole] = newSign;
          qENT["date"+signRole] = ddj;
          uploadENT(qFileEnt);
        }
        if (signTab == "TRA")
        {
          qTRA["signFile"+signRole] = newSign;
          qTRA["date"+signRole] = ddj;
          uploadTRA(qFileTrait);
        }
      $('.modalSign'+signRole+'.modal').modal('hide');
          });
  }
  }
  
  function setupDataTable()
  {
      //alert("Init table");
      //patDataTable = $('#patList').DataTable(); <-- Contexte
      
      $('#patList').dataTable( {
      "aLengthMenu": [5, 10, 25, -1],
        "columns": [
          null,
          { "searchable": false },
          null,
          { "searchable": false },
          { "searchable": false }
        ] } );
    
    $('.modalSearch.modal')
    .modal({
      closable  : false,
      onDeny    : function(){
        return false;
      }
    })
    .modal('show')
  ;
  document.getElementById("patList_filter").parentElement.setAttribute("class","left aligned eight wide column");
  //alert(document.getElementById("patList_filter").parentElement.getAttribute("class"));
  document.getElementById("loadingText").setAttribute("class", "ui inverted dimmer");
  }
  
  function reOpenSearch()
  {
    //alert("Reset "+patDataTable);
    //patDataTable.search( '' ).columns().search( '' ).draw();
    //patDataTable.search( '' ).columns( [1] ).search( '' ).draw();
    document.getElementById("axxNumber").value = "";
    document.getElementById("patList_filter").firstChild.childNodes[1].value = "";
    patDataTable = $('#patList').DataTable();
    patDataTable.search( '' ).columns( [1] ).search( '' ).draw();
    $('.modalSearch.modal').modal('show');
  }

  function loadPAT()
  {
    // alert("Load PAT F Called");
  var xmlhttp2;
  if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp2=new XMLHttpRequest();
    }
  else
    {// code for IE6, IE5
    xmlhttp2=new ActiveXObject("Microsoft.XMLHTTP");
    }
  xmlhttp2.onreadystatechange=function()
    {
    if (xmlhttp2.readyState==4 && xmlhttp2.status==200)
      {
      //alert(xmlhttp2.responseText.length);
      qPAT = JSON.parse(xmlhttp2.responseText);
      qSearch = qPAT.patients;
      var ctrpr = 0;
      for (pat in qPAT.patients)
          {
            div = document.createElement("tr");
              div.setAttribute("id", qPAT.patients[pat].id);
              div.setAttribute("name", ctrpr);
              div.innerHTML = '<td>'+qPAT.patients[pat].last+'</td><td>'+qPAT.patients[pat].first+'</td><td>'+qPAT.patients[pat].id+'</td><td>'+qPAT.patients[pat].NAM+'</td><td>'+qPAT.patients[pat].birth+'</td>';
            document.getElementById("eachPat").appendChild(div);
            ctrpr = ctrpr + 1;
          }
      $('table.eachPat tbody tr').click(function(){
        // alert('Load Patient');
          //alert($(this).find('td')[2].innerHTML);
          curPatient = $(this).attr("id");
          curPatRow = $(this).attr("name");
          $('.modalSearch.modal').modal('hide');
          fullLoadPatient();
      });
      setTimeout(setupDataTable, 2000);
      }
  }

  //alert("Get the Files!");
  xmlhttp2.open("GET","allScriptsv1.py?tx=getPATv1&clinID=1",true);
  xmlhttp2.send();

  }

  function REloadPAT()
  {
  var xmlhttp2;
  if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp2=new XMLHttpRequest();
    }
  else
    {// code for IE6, IE5
    xmlhttp2=new ActiveXObject("Microsoft.XMLHTTP");
    }
  xmlhttp2.onreadystatechange=function()
    {
    if (xmlhttp2.readyState==4 && xmlhttp2.status==200)
      {
      //alert(xmlhttp2.responseText.length);
      qPAT = JSON.parse(xmlhttp2.responseText);
      
      //{"id":"1","NAM":"AXXA11102590","last":"AXXIUM","first":"AXXIUM","birth":"2011/10/25"}
      patDataTable = $('#patList').DataTable();
      patDataTable.row.add( [ patAxxium["last"], patAxxium["first"], patAxxium["id"], patAxxium["NAM"], patAxxium["birth"] ] ).draw();
      fullLoadPatient();
      }
  }

  //alert("Get the Files!");
  xmlhttp2.open("GET","allScriptsv1.py?tx=getPATv1&clinID=1&rand="+Math.random(),true);
  xmlhttp2.send();

  }
  
  function uploadPhoto()
  {
      //alert(aFile);
      myPhotos = document.getElementById('photoCapture');
      photoFile = myPhotos.files[0];
      var blob_url = window.URL.createObjectURL(photoFile);
      //alert(blob_url);
      if (blob_url.length > 0)
      {
        document.getElementById("patPhoto").setAttribute("src", blob_url);
      var reader = new FileReader();
      reader.onload = function(event) {  
        object = {};
        object.filename = photoFile.name;
        object.data = event.target.result;
        setTimeout(postUpload, 3000);
      };  
      reader.readAsDataURL(photoFile);     
      }
      else
      {
        document.getElementById("patPhoto").setAttribute("src", "json/images/square-image.png");
      }
  }

  function postUpload()
  {
      //alert(object.filename);
      $.ajax({url: "allScriptsv1.py",
          type: 'POST',
          data: {tx: "uploadPhoto3", patID: curPatient, file: object.data},
          success: function(data, status, xhr) {
    //alert('File uploaded!'+data);
          },
    error: function (data) {
    alert('There was an error uploading your file!');
    }
      }); 
  }

  function loadPHO(aPat)
  {
  var xmlhttp2;
  if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp2=new XMLHttpRequest();
    }
  else
    {// code for IE6, IE5
    xmlhttp2=new ActiveXObject("Microsoft.XMLHTTP");
    }
  xmlhttp2.onreadystatechange=function()
    {
    if (xmlhttp2.readyState==4 && xmlhttp2.status==200)
      {
      //alert(xmlhttp2.responseText.length);
      qPHO = JSON.parse(xmlhttp2.responseText);
      if (qPHO.files.length > 0)
      {
        document.getElementById("patPhoto").setAttribute("src", "json/photos/"+qPHO.files[0].file+".jpg");
      }
      else
      {
        document.getElementById("patPhoto").setAttribute("src", "json/images/square-image.png");
      }
      //alert(document.getElementById("capture").value);
    }
  }

  //alert("Get the Photos!");
  xmlhttp2.open("GET","allScriptsv1.py?tx=getPHOv1&patID="+aPat+"&rand="+Math.random(),true);
  xmlhttp2.send();

  }

  function loadParams()
  {
  var xmlhttp2;
  if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp2=new XMLHttpRequest();
    }
  else
    {// code for IE6, IE5
    xmlhttp2=new ActiveXObject("Microsoft.XMLHTTP");
    }
  xmlhttp2.onreadystatechange=function()
    {
    if (xmlhttp2.readyState==4 && xmlhttp2.status==200)
      {
      //alert(xmlhttp2.responseText.length);
      qParams = JSON.parse(xmlhttp2.responseText);
      if (qParams["logo"])
      {
        document.getElementById("topLogo").setAttribute("src", "images/"+qParams["logo"]);
      }
    }
  }

  //alert("Get the Params!");
  xmlhttp2.open("GET","allScriptsv1.py?tx=getJSONsub&sub=params&code=settings&rand="+Math.random(),true);
  xmlhttp2.send();

  }
  
  function resetPatient()
  {
    document.getElementById("eachAnt").innerHTML = "";
    document.getElementById("eachExa").innerHTML = "";
    document.getElementById("eachPlan").innerHTML = "";
    document.getElementById("eachEnt").innerHTML = "";
    document.getElementById("eachTrait").innerHTML = "";
    //document.getElementById("eachOrd").innerHTML = "";
    //document.getElementById("eachDoc").innerHTML = "";
    
    var canvas = document.getElementById("odonto"),
      ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0,0,600,395);
    var canvas = document.getElementById("paro"),
      ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0,0,600,246);
    document.getElementById("totPlan").innerHTML = "";
    document.getElementById("totEnt").innerHTML = "";
    
    document.getElementById("sigBelowANT0").src = "";
    document.getElementById("sigBelowANT1").src = "";
    document.getElementById("dateBelowANT0").innerHTML = "";
    document.getElementById("dateBelowANT1").innerHTML = "";
    document.getElementById("sigBelowEXA0").src = "";
    document.getElementById("sigBelowEXA1").src = "";
    document.getElementById("dateBelowEXA0").innerHTML = "";
    document.getElementById("dateBelowEXA1").innerHTML = "";
    document.getElementById("sigBelowODO0").src = "";
    document.getElementById("sigBelowODO1").src = "";
    document.getElementById("dateBelowODO0").innerHTML = "";
    document.getElementById("dateBelowODO1").innerHTML = "";
    document.getElementById("sigBelowPAR0").src = "";
    document.getElementById("sigBelowPAR1").src = "";
    document.getElementById("dateBelowPAR0").innerHTML = "";
    document.getElementById("dateBelowPAR1").innerHTML = "";
    document.getElementById("sigBelowPLA0").src = "";
    document.getElementById("sigBelowPLA1").src = "";
    document.getElementById("dateBelowPLA0").innerHTML = "";
    document.getElementById("dateBelowPLA1").innerHTML = "";
    document.getElementById("sigBelowENT0").src = "";
    document.getElementById("sigBelowENT1").src = "";
    document.getElementById("dateBelowENT0").innerHTML = "";
    document.getElementById("dateBelowENT1").innerHTML = "";
    document.getElementById("sigBelowTRA0").src = "";
    document.getElementById("sigBelowTRA1").src = "";
    document.getElementById("dateBelowTRA0").innerHTML = "";
    document.getElementById("dateBelowTRA1").innerHTML = "";
    document.getElementById("sigBelowORD1").src = "";
    document.getElementById("dateBelowORD1").innerHTML = "";
    document.getElementById("sigBelowDOC0").src = "";
    document.getElementById("sigBelowDOC1").src = "";
    document.getElementById("dateBelowDOC0").innerHTML = "";
    document.getElementById("dateBelowDOC1").innerHTML = "";
    displaySub("patient");
  }
  
  function displayPatient(aPat)
  {
    var cPat = 0;
    for (pat in qPAT.patients)
    {
      if (aPat == qPAT.patients[pat].id) cPat = pat;
    }
    fName = qPAT.patients[cPat].first;
    lName = qPAT.patients[cPat].last;
    curName = fName+' '+lName;
    nam = qPAT.patients[cPat].NAM;
    birth = qPAT.patients[cPat].birth;
    medAlert = "";
    if (qPAT.patients[cPat].alert) 
    {
      medAlert = qPAT.patients[cPat].alert;
      console.log(medAlert);
      if (qPAT.patients[cPat].alertD) medAlert = qPAT.patients[cPat].alertD + " " + medAlert;
    }
    medSuivi = "";
    if (qPAT.patients[cPat].suivi) 
    {
      medSuivi = qPAT.patients[cPat].suivi;
      if (qPAT.patients[cPat].suiviD) medSuivi = qPAT.patients[cPat].suiviD + " " + medSuivi;
    }
    
    document.getElementById("EID").value = aPat;
    document.getElementById("Efirst").value = fName;
    document.getElementById("Elast").value = lName;
    //document.getElementById("ENAM").value = nam;
    document.getElementById("Ebirth").value = birth;
    //document.getElementById("Ealert").value = medAlert;
    //document.getElementById("Esuivi").value = medSuivi;
    // document.getElementById("Elabo01").value = "";
    // document.getElementById("Elabo02").value = "";
    // document.getElementById("Elabo03").value = "";
    // document.getElementById("Elabo04").value = "";
    //Centre dentaire Sirois<br>100001 - Claude Arsenault, 1946-07-12&nbsp;&nbsp;&nbsp;&nbsp;
    var topPat = '<h3 class="ui center aligned header">'+curInitials+aPat+' - '+curName+', '+birth + '</h3>';
    var topPatSub;
    if (medAlert.length > 0) topPatSub=' <i class="red first aid icon"></i>&nbsp;&nbsp;Alerte : ' + medAlert;
    // var topPat = curInitials+'&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="reOpenSearch();">Changer de patient</div>&nbsp;&nbsp;&nbsp;'+aPat+' - '+curName+', '+birth+'&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="showLabos();">Laboratoires</div>&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="window.print();">Imprimer</div>&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="location.reload();">Déconnexion</div>';
    // if (medAlert.length > 0) topPat = topPat + '<br><i class="red first aid icon"></i>&nbsp;&nbsp;Alerte : ' + medAlert;
    document.getElementById("patName").innerHTML = topPat;
    document.getElementById("patNameSub").innerHTML=topPatSub;
  }
  
  function updateAvail(aTab)
  {
    displaySub(aTab);
  }
  
  function displaySub(aTab)
  {
    //alert(aTab);
        
        if (aTab == "patient")
        {
          document.title = "Axxium | Patient";

          document.getElementById("updateAvail").innerHTML = " ";
            //   '<div id="context2">\
            //     <div class="ui pointing secondary menu"> \
            //      <a class="item" data-tab="Dossier">Dossier Patient</a>\
            //      <a class="item" data-tab="Facturation">Facturation</a>\
            //      <a class="item" data-tab="traitement">Plan de traitement</a>\
            //      <a class="item" data-tab="Paiements">Paiements</a>\
            //      <a class="item" data-tab="Historique">Historique</a>\
            //      <a class="item" data-tab="Financier">Financier</a>\
            //      <a class="item" data-tab="Rappel">Rappel</a>\
            //      <a class="item" data-tab="Alertes">Alertes</a>\
            //     </div>\
            //     <div class="ui tab segment" data-tab="Dossier">\
            //      <div class="ui axxium tiny button" onclick="modCreateDos();">Creer un dossier</div><div class="ui axxium tiny button" onclick="modCreateDos();">Creation rapide</div><div class="ui axxium tiny button" onclick=";">Modifier</div><div class="ui axxium tiny button" onclick="modResponsable();" style="margin:5px">Responsable</div><div class="ui axxium tiny button" onclick="modFamille();">Famille</div><div class="ui axxium tiny button" onclick="modReference();">Reference</div><div class="ui axxium tiny button" onclick="dosConsul();">Dossier consultes</div><div class="ui axxium tiny button" onclick="modEnregistrer();">Enregistrer</div><div class="ui axxium tiny button" onclick="modImpression();">Impression</div><div class="ui axxium tiny button" onclick="modAlert();">Alerte médicale</div><div class="ui axxium tiny button" onclick="modSuivi();">Suivi médical</div><div class="ui axxium tiny button" onclick="modLabo();">Laboratoires</div> \
            //     </div>\
            //     <div class="ui tab segment" data-tab="Facturation">\
            //      <div class="ui axxium tiny button" onclick="modCreateDos();">Creer un dossier</div><div class="ui axxium tiny button" onclick="modCreateDos();">Creation rapide</div><div class="ui axxium tiny button" onclick=";">Modifier</div><div class="ui axxium tiny button" onclick="modResponsable();" style="margin:5px">Responsable</div><div class="ui axxium tiny button" onclick="modFamille();">Famille</div><div class="ui axxium tiny button" onclick="modReference();">Reference</div><div class="ui axxium tiny button" onclick="dosConsul();">Dossier consultes</div><div class="ui axxium tiny button" onclick="modEnregistrer();">Enregistrer</div><div class="ui axxium tiny button" onclick="modImpression();">Impression</div><div class="ui axxium tiny button" onclick="modAlert();">Alerte médicale</div><div class="ui axxium tiny button" onclick="modSuivi();">Suivi médical</div><div class="ui axxium tiny button" onclick="modLabo();">Laboratoires</div> \
            //     </div>\
            //     <div class="ui tab segment" data-tab="traitement">\
            //      <div class="ui axxium tiny button" onclick="modCreateDos();">Creer un dossier</div><div class="ui axxium tiny button" onclick="modCreateDos();">Creation rapide</div><div class="ui axxium tiny button" onclick=";">Modifier</div><div class="ui axxium tiny button" onclick="modResponsable();" style="margin:5px">Responsable</div><div class="ui axxium tiny button" onclick="modFamille();">Famille</div><div class="ui axxium tiny button" onclick="modReference();">Reference</div><div class="ui axxium tiny button" onclick="dosConsul();">Dossier consultes</div><div class="ui axxium tiny button" onclick="modEnregistrer();">Enregistrer</div><div class="ui axxium tiny button" onclick="modImpression();">Impression</div><div class="ui axxium tiny button" onclick="modAlert();">Alerte médicale</div><div class="ui axxium tiny button" onclick="modSuivi();">Suivi médical</div><div class="ui axxium tiny button" onclick="modLabo();">Laboratoires</div> \
            //     </div>\
            //     <div class="ui tab segment" data-tab="Paiements">\
            //      <div class="ui axxium tiny button" onclick="modCreateDos();">Creer un dossier</div><div class="ui axxium tiny button" onclick="modCreateDos();">Creation rapide</div><div class="ui axxium tiny button" onclick=";">Modifier</div><div class="ui axxium tiny button" onclick="modResponsable();" style="margin:5px">Responsable</div><div class="ui axxium tiny button" onclick="modFamille();">Famille</div><div class="ui axxium tiny button" onclick="modReference();">Reference</div><div class="ui axxium tiny button" onclick="dosConsul();">Dossier consultes</div><div class="ui axxium tiny button" onclick="modEnregistrer();">Enregistrer</div><div class="ui axxium tiny button" onclick="modImpression();">Impression</div><div class="ui axxium tiny button" onclick="modAlert();">Alerte médicale</div><div class="ui axxium tiny button" onclick="modSuivi();">Suivi médical</div><div class="ui axxium tiny button" onclick="modLabo();">Laboratoires</div> \
            //     </div>\
            //     <div class="ui tab segment" data-tab="Historique">\
            //      <div class="ui axxium tiny button" onclick="modCreateDos();">Creer un dossier</div><div class="ui axxium tiny button" onclick="modCreateDos();">Creation rapide</div><div class="ui axxium tiny button" onclick=";">Modifier</div><div class="ui axxium tiny button" onclick="modResponsable();" style="margin:5px">Responsable</div><div class="ui axxium tiny button" onclick="modFamille();">Famille</div><div class="ui axxium tiny button" onclick="modReference();">Reference</div><div class="ui axxium tiny button" onclick="dosConsul();">Dossier consultes</div><div class="ui axxium tiny button" onclick="modEnregistrer();">Enregistrer</div><div class="ui axxium tiny button" onclick="modImpression();">Impression</div><div class="ui axxium tiny button" onclick="modAlert();">Alerte médicale</div><div class="ui axxium tiny button" onclick="modSuivi();">Suivi médical</div><div class="ui axxium tiny button" onclick="modLabo();">Laboratoires</div> \
            //     </div>\
            //     </div>'
            // ;
             
        }
        if (aTab == "facturation")
        {
          document.title = "Axxium | Patient";

          document.getElementById("updateAvail").innerHTML = " ";
          
        }
        
        if (aTab == "antecedents")
        {
          //alert(curAnt);
          document.title = "Axxium | Historique médical";
          if (qANT.files.length > 0)
          {
            aDate = qANT.files[curAnt].date;
            document.getElementById("updateAvail").innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="createANT();">Nouvel historique médical</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div id="bPrec" class="ui axxium tiny disabled button" onclick="backANT();">Précédent</div>&nbsp;&nbsp;'+aDate+'&nbsp;&nbsp;&nbsp;<div id="bSuiv" class="ui axxium tiny disabled button" onclick="forANT();">Suivant</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="toggleForce();">Voir toutes les réponses</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="getSign(0,\'ANT\');"><i class="write icon"></i> patient</div>&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="getSign(1,\'ANT\');"><i class="write icon"></i> dentiste</div>';
            
            if (curAnt < qANT.files.length - 1) document.getElementById("bPrec").setAttribute("class", "ui axxium tiny button");
            if (curAnt > 0) document.getElementById("bSuiv").setAttribute("class", "ui axxium tiny button");
          }
          else
          {
            document.getElementById("updateAvail").innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="createANT();">Nouvel historique médical</div>';
          }
        }
        
        if (aTab == "examens")
        {
          //alert(curExa);
          document.title = "Axxium | Examen dentaire";
          if (qEXAMS.files.length > 0)
          {
            aDate = qEXAMS.files[curExa].date;
            document.getElementById("updateAvail").innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="createEXA();">Nouvel examen dentaire</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div id="bPrec" class="ui axxium tiny disabled button" onclick="backEXA();">Précédent</div>&nbsp;&nbsp;'+aDate+'&nbsp;&nbsp;&nbsp;<div id="bSuiv" class="ui axxium tiny disabled button" onclick="forEXA();">Suivant</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="toggleForceExa();">Voir toutes les réponses</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="getSign(0,\'EXA\');"><i class="write icon"></i> patient</div>&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="getSign(1,\'EXA\');"><i class="write icon"></i> dentiste</div>';
            
            if (curExa < qEXAMS.files.length - 1) document.getElementById("bPrec").setAttribute("class", "ui axxium tiny button");
            if (curExa > 0) document.getElementById("bSuiv").setAttribute("class", "ui axxium tiny button");
          }
          else
          {
            document.getElementById("updateAvail").innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="createEXA();">Nouvel examen dentaire</div>';
          }
        }
        
        if (aTab == "odontos")
        {
          //alert(curOdo);
          document.title = "Axxium | Odontogramme";
          if (qODONS.files.length > 0)
          {
            aDate = qODONS.files[curOdo].date;
            var omen = '<div id="bPrec" class="ui axxium tiny disabled button" onclick="initialODO();">Odontogramme initial</div>&nbsp;&nbsp;<div id="bSuiv" class="ui axxium tiny button" onclick="evolutifODO();">Odontogramme évolutif</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="toggleOdon();">';
            if (showAdult)
            {
              omen = omen + "Voir dentition primaire";
            }
            else
            {
              omen = omen + "Voir dentition permanente";
            }
            omen = omen + '</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="odonMoins();">Plus petit</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="odonPlus();">Plus grand</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="getSign(0,\'ODO\');"><i class="write icon"></i> patient</div>&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="getSign(1,\'ODO\');"><i class="write icon"></i> dentiste</div>';
            document.getElementById("updateAvail").innerHTML = omen
            
            if (curOdo < qODONS.files.length - 1) document.getElementById("bPrec").setAttribute("class", "ui axxium tiny button");
            if (curOdo > 0) document.getElementById("bSuiv").setAttribute("class", "ui axxium tiny button");
          }
          else
          {
            document.getElementById("updateAvail").innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="createODO();">Nouvel odontogramme</div>';
          }
        }
        
        if (aTab == "paros")
        {
          //alert(curParo);
          document.title = "Axxium | Parodontie";
          if (qPARS.files.length > 0)
          {
            aDate = qPARS.files[curOdo].date;
            var omen = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="createPAR();">Nouveau diagramme</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div id="bPrec" class="ui axxium tiny disabled button" onclick="backPAR();">Précédent</div>&nbsp;&nbsp;'+aDate+'&nbsp;&nbsp;&nbsp;<div id="bSuiv" class="ui axxium tiny disabled button" onclick="forPAR();">Suivant</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="toggleParo();">';
            if (showAdultP)
            {
              omen = omen + "Voir dentition primaire";
            }
            else
            {
              omen = omen + "Voir dentition permanente";
            }
            omen = omen + '</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="paroMoins();">Plus petit</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="paroPlus();">Plus grand</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="getSign(0,\'PAR\');"><i class="write icon"></i> patient</div>&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="getSign(1,\'PAR\');"><i class="write icon"></i> dentiste</div>';
            document.getElementById("updateAvail").innerHTML = omen
            
            if (curParo < qPARS.files.length - 1) document.getElementById("bPrec").setAttribute("class", "ui axxium tiny button");
            if (curParo > 0) document.getElementById("bSuiv").setAttribute("class", "ui axxium tiny button");
          }
          else
          {
            document.getElementById("updateAvail").innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="createPAR();">Nouveau diagramme</div>';
          }
        }
        
        if (aTab == "plans")
        {
          document.title = "Axxium | Planificateur de traitement";
          if (qPLANS.files.length > 0)
          {
            aDate = qPLANS.files[curPlan].date;
            document.getElementById("updateAvail").innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="createPLA();">Nouveau plan</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div id="bPrec" class="ui axxium tiny disabled button" onclick="backPLA();">Précédent</div>&nbsp;&nbsp;'+aDate+'&nbsp;&nbsp;&nbsp;<div id="bSuiv" class="ui axxium tiny disabled button" onclick="forPLA();">Suivant</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="getSign(0,\'PLA\');"><i class="write icon"></i> patient</div>&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="getSign(1,\'PLA\');"><i class="write icon"></i> dentiste</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="sendCal();">Calendrier Vision-R</div>';
          
            if (curPlan < qPLANS.files.length - 1) document.getElementById("bPrec").setAttribute("class", "ui axxium tiny button");
            if (curPlan > 0) document.getElementById("bSuiv").setAttribute("class", "ui axxium tiny button");
          }
          else
          {
            document.getElementById("updateAvail").innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="createPLA();">Nouveau plan de traitement</div>';
          }
        }

        if(aTab=="codes")
        {
          document.getElementById("updateAvail").innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui icon input"><input type="text" class="search1" onkeydown="searchPrix(false)" placeholder="Search by Codes" ><i class="circular search link icon"></i>';

//</div><div class="ui form field"> <label>Search By Code</label><input type="text" class="search1" onkeydown="searchPrix()"></div>';
        }
        
        if (aTab == "ententes")
        {
          document.title = "Axxium | Entente de paiement";
          if (qENTS.files.length > 0)
          {
            aDate = qENTS.files[curEnt].date;
            document.getElementById("updateAvail").innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="createENT();">Nouvelle entente de paiement</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div id="bPrec" class="ui axxium tiny disabled button" onclick="backENT();">Précédent</div>&nbsp;&nbsp;'+aDate+'&nbsp;&nbsp;&nbsp;<div id="bSuiv" class="ui axxium tiny disabled button" onclick="forENT();">Suivant</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="getSign(0,\'ENT\');"><i class="write icon"></i> patient</div>&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="getSign(1,\'ENT\');"><i class="write icon"></i> dentiste</div>';
          
            if (curEnt < qENTS.files.length - 1) document.getElementById("bPrec").setAttribute("class", "ui axxium tiny button");
            if (curEnt > 0) document.getElementById("bSuiv").setAttribute("class", "ui axxium tiny button");
          }
          else
          {
            document.getElementById("updateAvail").innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="createENT();">Nouvelle entente de paiement</div>';
          }
        }
        
        if (aTab == "traitements")
        {
          document.title = "Axxium | Traitements";
          if (qTRAS.files.length > 0)
          {
            aDate = qTRAS.files[curTrait].date;
            document.getElementById("updateAvail").innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="createTRA();">Nouveaux traitements</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div id="bPrec" class="ui axxium tiny disabled button" onclick="backTRA();">Précédent</div>&nbsp;&nbsp;'+aDate+'&nbsp;&nbsp;&nbsp;<div id="bSuiv" class="ui axxium tiny disabled button" onclick="forTRA();">Suivant</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="getSign(0,\'TRA\');"><i class="write icon"></i> patient</div>&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="getSign(1,\'TRA\');"><i class="write icon"></i> dentiste</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="traitEB();">Enregistrer en bouche</div>';
            
            if (curTrait < qTRAS.files.length - 1) document.getElementById("bPrec").setAttribute("class", "ui axxium tiny button");
            if (curTrait > 0) document.getElementById("bSuiv").setAttribute("class", "ui axxium tiny button");
          }
          else
          {
            document.getElementById("updateAvail").innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="createTRA();">Nouveaux traitements</div>';
          }
        }
        
        if (aTab == "ordonnances")
        {
          document.title = "Axxium | Ordonnances";
          if (qORDS.files.length > 0)
          {
            aDate = qORDS.files[curOdo].date;
            document.getElementById("updateAvail").innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="createORD();">Nouvelle ordonnance</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div id="bPrec" class="ui axxium tiny disabled button" onclick="backORD();">Précédent</div>&nbsp;&nbsp;'+aDate+'&nbsp;&nbsp;&nbsp;<div id="bSuiv" class="ui axxium tiny disabled button" onclick="forORD();">Suivant</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="printORD();">Ordonnance imprimable</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="getSign(1,\'ORD\');"><i class="write icon"></i> dentiste</div>';
            
            if (curOrd < qORDS.files.length - 1) document.getElementById("bPrec").setAttribute("class", "ui axxium tiny button");
            if (curOrd > 0) document.getElementById("bSuiv").setAttribute("class", "ui axxium tiny button");
          }
          else
          {
            document.getElementById("updateAvail").innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="createORD();">Nouvelle ordonnance</div>';
          }
        }
        
        if (aTab == "documents")
        {
          document.title = "Axxium | Documents";
          if (qDOCS.files.length > 0)
          {
            aDate = qDOCS.files[curDoc].date;
            cPage = curPage + " / " + numPages;
            document.getElementById("updateAvail").innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="file" name="UploadFile" id="txtUploadFile" accept="application/pdf" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div id="bPrec" class="ui axxium tiny disabled button" onclick="backDOC();">Précédent</div>&nbsp;&nbsp;'+aDate+'&nbsp;&nbsp;&nbsp;<div id="bSuiv" class="ui axxium tiny disabled button" onclick="forDOC();">Suivant</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div id="pPage" class="ui axxium tiny button" onclick="prevPage();">Page précédente</div>&nbsp;&nbsp;<label id="pageCount">'+cPage+'</label>&nbsp;&nbsp;&nbsp;<div id="nPage" class="ui axxium tiny button" onclick="nextPage();">Page suivante</div>';
            
            if (curDoc < qDOCS.files.length - 1) document.getElementById("bPrec").setAttribute("class", "ui axxium tiny button");
            if (curDoc > 0) document.getElementById("bSuiv").setAttribute("class", "ui axxium tiny button");
          }
          else
          {
            //document.getElementById("updateAvail").innerHTML = '<form id="myDocForm" enctype="multipart/form-data" method="post"><input type="hidden" name="dPatID" value="'+curPatient+'"><input type="hidden" name="tx" value="uploadDOC">Document :<input type="file" name="file"><input type="submit" value="Envoyer"></form>';
            document.getElementById("updateAvail").innerHTML = '<input type="file" name="UploadFile" id="txtUploadFile" accept="application/pdf" />';
          }
          
      $('#txtUploadFile').on('change', function (e) {
          var files = e.target.files;
          //alert("Nb files: "+files.length);
          if (files.length > 0) {
              if (this.value.lastIndexOf('.pdf') === -1) {
                  alert('Only pdf files are allowed!');
                  this.value = '';
                  return;
              }
              if (window.FormData !== undefined) {
                  var data = new FormData();
                  //for (var x = 0; x < files.length; x++) {
                  //    data.append("file" + x, files[x]);
                  //}
                  data.append("file", files[0]);
                  data.append("tx", "uploadDOC");
                  data.append("dPatID", curPatient);
             
                  $.ajax({
                      type: "POST",
                      url: 'allScriptsv1.py',
                      cache: false,
                      contentType: false,
                      processData: false,
                      data: data,
                      success: function (result) {
                          console.log(result);
                          //$('#response').html(result);
          loadDOCS(curPatient, true);
                      },
                      error: function (xhr, status, p3, p4) {
                          console.log(xhr);
                          //$('#response').html(err);
                      }
                  });
              } else {
                  alert("This browser doesn't support HTML5 file uploads!");
              }
          }
      });

        }
         
  }

 