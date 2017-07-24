
  function closeLAB()
  {
	$('.modalLabo.modal').modal('hide');
  }
  
  function showLabos()
  {
	document.getElementById("loadingText").setAttribute("class", "ui active inverted dimmer");
    	loadAllLABOS();
  }
  
  function setupLaboTable()
  {
      if (!firstLabos)
      {
      	//alert("Init table");
      	labDataTable = $('#labList').DataTable();
  	labDataTable.search( '' ).columns( [1] ).search( '' ).draw();
      }
      else
      {
      	firstLabos = false;
      	$('#labList').dataTable( {
      		"aLengthMenu": [5, 10, 25, -1]
        } );
      }
  	
  	$('.modalLabos.modal')
	  .modal({
	    closable  : false,
	    onDeny    : function(){
	      return false;
	    }
	  })
	  .modal('show')
	;
	document.getElementById("labList_filter").parentElement.setAttribute("class","left aligned eight wide column");
	//alert(document.getElementById("labList_filter").parentElement.getAttribute("class"));
	document.getElementById("loadingText").setAttribute("class", "ui inverted dimmer");
  }

  function loadAllLABOS()
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
      qAllLABOS = JSON.parse(xmlhttp2.responseText);
      qSearchLabos = qAllLABOS.labos;
      var ctrpr = 0;
      document.getElementById("eachLab").innerHTML = "";
      for (lab in qAllLABOS.labos)
      		{
    	  		div = document.createElement("tr");
      	  		div.setAttribute("id", qAllLABOS.labos[lab].code);
      	  		div.setAttribute("name", ctrpr);
      	  		div.innerHTML = '<td>'+qAllLABOS.labos[lab].num+'</td><td>'+qAllLABOS.labos[lab].nompre+'</td><td>'+qAllLABOS.labos[lab].labo+'</td><td>'+qAllLABOS.labos[lab].envoye+'</td><td>'+qAllLABOS.labos[lab].retour+'</td><td>'+qAllLABOS.labos[lab].rdv+'</td><td>'+qAllLABOS.labos[lab].note+'</td><td>'+qAllLABOS.labos[lab].recu+'</td>';
    	  		document.getElementById("eachLab").appendChild(div);
    	  		ctrpr = ctrpr + 1;
    	  	}
      $('table tbody tr').click(function(){
          //alert($(this).find('td')[2].innerHTML);
          curPatient = $(this).attr("id");
          curPatRow = $(this).attr("name");
          console.log(curPatient + " / " + curPatRow);
          $('.modalLabos.modal').modal('hide');
          fullLoadPatient();
      });
      setTimeout(setupLaboTable, 2000);
      }
  }

  //alert("Get the Files!");
  xmlhttp2.open("GET","allScriptsv1.py?tx=getLABOSv1&clinID=1"+"&rand="+Math.random(),true);
  xmlhttp2.send();

  }
  
  function newLAB()
  {
  	var d = new Date();
  	var ddj = d.getFullYear() + '/' + twoDigits(d.getMonth() + 1) + '/' + twoDigits(d.getDate());
  	var hdj = twoDigits(d.getHours()) + ':' + twoDigits(d.getMinutes());
  	aNum = qLABOS.files.length + 1;
  	aPatName = qPAT.patients[curPatRow].last + ", " + qPAT.patients[curPatRow].first;
  	qLAB = { "id" : curPatient, "date" : ddj, "time" : hdj, "num" : aNum, "nompre" : aPatName, "labo" : "", "envoye" : "", "retour" : "", "rdv" : "", "note" : "", "recu" : "" };
  	qFileLab = "B_" + curPatient + "_" + d.getTime();
  	uploadLAB(qFileLab);
  }
  
  function saveLAB()
  {
	qLAB["num"]	= document.getElementById("EnumL").value;
	qLAB["nompre"]	= document.getElementById("EnompreL").value;
	qLAB["labo"]	= document.getElementById("ElaboL").value;
	qLAB["envoye"]	= document.getElementById("EenvoyeL").value;
	qLAB["retour"]	= document.getElementById("EretourL").value;
	qLAB["rdv"]	= document.getElementById("ErdvL").value;
	qLAB["note"]	= document.getElementById("EnoteL").value;
	qLAB["recu"]	= document.getElementById("ErecuL").value;
  	uploadLAB(qFileLab);
  }
  
  function displayLab()
  {
	document.getElementById("EnumL").value = qLAB["num"];
	document.getElementById("EnompreL").value = qLAB["nompre"];
	document.getElementById("ElaboL").value = qLAB["labo"];
	document.getElementById("EenvoyeL").value = qLAB["envoye"];
	document.getElementById("EretourL").value = qLAB["retour"];
	document.getElementById("ErdvL").value = qLAB["rdv"];
	document.getElementById("EnoteL").value = qLAB["note"];
	document.getElementById("ErecuL").value = qLAB["recu"];
	
	document.getElementById("backLAB").setAttribute("class", "ui axxium disabled button");
	document.getElementById("forLAB").setAttribute("class", "ui axxium disabled button");
       	if (curLab < qLABOS.files.length - 1) document.getElementById("backLAB").setAttribute("class", "ui axxium button");
       	if (curLab > 0) document.getElementById("forLAB").setAttribute("class", "ui axxium button");
  }
  
  function uploadLAB(aName)
  {
        $.post("uploadJSONsub.py", {sub: "labos", name: aName, json: JSON.stringify(qLAB)}, function(result){
            //alert("Le labo a été enregistré. "+aName);
            loadLABOS(curPatient);
        });
  }
  
  function loadLab()
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
      qLAB = JSON.parse(xmlhttp2.responseText);
      displayLab()
  	if (qLABOS.files.length > 0) 
  	{
  	   //medLabo = qLAB.num+', '+qLAB.nompre+', '++', '+qLAB.envoye+', '+qLAB.retour+', '+qLAB.rdv+', '+qLAB.note+', '+qLAB.recu;
  		document.getElementById("Elabo01").value = qLAB.labo;
  		document.getElementById("Elabo02").value = qLAB.envoye;
  		document.getElementById("Elabo03").value = qLAB.retour;
  		document.getElementById("Elabo04").value = qLAB.recu;
  	}
      }
  }

  //alert("Get the qLAB!");
  xmlhttp2.open("GET","allScriptsv1.py?tx=getJSONsub&sub=labos&code="+qFileLab+"&rand="+Math.random(),true);
  xmlhttp2.send();

  }


  function loadLABOS(aPat)
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
        qLABOS = JSON.parse(xmlhttp2.responseText);
      	curLab = 0;
      	//alert(qLABOS.files.length);
      	if (qLABOS.files.length > 0)
      	{
      		qFileLab = qLABOS.files[curLab].file;
      		loadLab();
      	}
      }
  }

  //alert("Get the Files!");
  xmlhttp2.open("GET","allScriptsv1.py?tx=getALLsub&sub=labos&patID="+aPat+"&rand="+Math.random(),true);
  xmlhttp2.send();

  }

  function backLAB()
  {
      if (curLab < qLABOS.files.length - 1)
      {
      	curLab = curLab + 1;
      	qFileLab = qLABOS.files[curLab].file;
  	loadLab();
      }
      displayLab();
  }

  function forLAB()
  {
      if (curLab > 0)
      {
      	curLab = curLab - 1;
      	qFileLab = qLABOS.files[curLab].file;
  	loadLab();
      }
      displayLab();
  }
  