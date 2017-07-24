
  function addRDV()
  {
  	var d = new Date();
  	var ddj = d.getFullYear() + '/' + twoDigits(d.getMonth() + 1) + '/' + twoDigits(d.getDate());
  	var nextRDV = qENT.pay.length + 1;
  	qENT.pay.push({"date":ddj, "rdv": nextRDV, "montant": 0, "note":""});
  	uploadENT(qFileEnt);
  	setTimeout(loadENTS(curPatient), 500);
  }
  
  function delRDV()
  {
  	var ctrp = 0;
  	var ctrRDV = 1;
  	var qNewPay = [ ];
  	for (tt in qENT.pay)
  	{
  	  if (document.getElementById("xENT"+ctrp).checked)
  	  {
  		//Nothing
  	  }
  	  else
  	  {
  		qNewPay.push({"date":qENT.pay[tt]["date"], "rdv": ctrRDV, "montant": qENT.pay[tt]["montant"], "note": qENT.pay[tt]["note"]});
  	  	ctrRDV = ctrRDV + 1;
  	  }
  	  ctrp = ctrp + 1;
  	}
  	qENT.pay = qNewPay;
  	uploadENT(qFileEnt);
  	//setTimeout(loadENTS(curPatient), 3000);
  }
  
  function createENT()
  {
  	if (qENTS.files.length > 0)
  	{
  		qENT["locked"] = "Y";
  		uploadENT(qFileEnt);
  	}
  	nrdv = 0;
  	for (tt in qPLAN.todo)
  	{
  		if (qPLAN.todo[tt]["rdv"] > nrdv) nrdv = qPLAN.todo[tt]["rdv"];
  	}
  	if (nrdv > 0)
  	{
  		var d = new Date();
  		var ddj = d.getFullYear() + '/' + twoDigits(d.getMonth() + 1) + '/' + twoDigits(d.getDate());
  		var hdj = twoDigits(d.getHours()) + ':' + twoDigits(d.getMinutes());
  		qENT = { "id" : curPatient, "date" : ddj, "time" : hdj, "pay" : [ ] };
  		vecTot = [ ];
  		for (i = 0; i < nrdv; i++)
  		{
  			vecTot.push(0);
  		}
  		for (tt in qPLAN.todo)
  		{
  			vecTot[qPLAN.todo[tt]["rdv"] - 1] = vecTot[qPLAN.todo[tt]["rdv"] - 1] + qPLAN.todo[tt]["prix"];
  		}
  		for (i = 0; i < nrdv; i++)
  		{
  			qENT.pay.push({"date":ddj, "rdv":i+1, "montant":vecTot[i], "note":""});
  		}
  		qFileEnt = "N_" + curPatient + "_" + d.getTime();
  		uploadENT(qFileEnt);
  		//setTimeout(loadENTS(curPatient), 500);
  	}
  }
  
  function uploadENT(aName)
  {
        $.post("uploadJSONsub.py", {sub: "ententes", name: aName, json: JSON.stringify(qENT)}, function(result){
            //alert("L'entente a été enregistrée. "+aName);
            loadENTS(curPatient, true);
        });
  }
  
  function modMontant(aNum)
  {
	modalMontant = aNum;
        //alert(modalRep2);
	document.getElementById("EdateV").value = qENT.pay[aNum]["date"];
	document.getElementById("Emontant").value = qENT.pay[aNum]["montant"];
	document.getElementById("EnoteV").value = qENT.pay[aNum]["note"];
	$('.modalMontant.modal').modal('show');
  }
  
  function loadEnt()
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
      qENT = JSON.parse(xmlhttp2.responseText);
      isLockedENT = false;
      if (qENT.date)
      {
  	var d = new Date();
  	var ddj = d.getFullYear() + '/' + twoDigits(d.getMonth() + 1) + '/' + twoDigits(d.getDate());
      	if (qENT.date != ddj) isLockedENT = true;
      }
      document.getElementById("eachEnt").innerHTML = "";
      document.getElementById("totEnt").innerHTML = "";
      totEnt = 0;
      var ctrp = 0;
      for (tt in qENT.pay)
      		{
    			div = document.createElement("tr");
    			div.setAttribute("id", "ENT"+ctrp);
    			var toDis = (isLockedENT) ? "disabled ":"";
    			div.innerHTML = '<td><h4><input id="xENT'+ctrp+'" type="checkbox" tabindex="'+ctrp+'" class="hidden"></h4></td><td><h4>'+qENT.pay[tt]["rdv"]+'</h4></td><td id="wd'+ctrp+'"><h4>'+qENT.pay[tt]["date"]+'</h4></td><td id="wm'+ctrp+'"><h4>'+qENT.pay[tt]["montant"]+'</h4></td><td id="wn'+ctrp+'"><h4>'+qENT.pay[tt]["note"]+'</h4></td><td><h4><div class="ui axxium tiny '+toDis+'button" onclick="modMontant('+ctrp+');">Modifier</div></h4></td>';
    			document.getElementById("eachEnt").appendChild(div);
    			totEnt = totEnt + qENT.pay[tt]["montant"];
    			ctrp = ctrp + 1;
    	  	}
      if (isLockedENT)
      {
      	document.getElementById("delRDV").setAttribute("class","ui axxium tiny disabled button");
      	document.getElementById("addRDV").setAttribute("class","ui axxium tiny disabled button");
      }
      else
      {
      	document.getElementById("delRDV").setAttribute("class","ui axxium tiny button");
      	document.getElementById("addRDV").setAttribute("class","ui axxium tiny button");
      }
      //alert(totEnt+" $");
      document.getElementById("totEnt").innerHTML = totEnt+" $";
      displaySign(qENT,"ENT");
      }
  }

  //alert("Get the qENT!");
  xmlhttp2.open("GET","allScriptsv1.py?tx=getJSONsub&sub=ententes&code="+qFileEnt+"&rand="+Math.random(),true);
  xmlhttp2.send();

  }


  function loadENTS(aPat, relBan)
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
        qENTS = JSON.parse(xmlhttp2.responseText);
      	curEnt = 0;
      	//alert(qENTS.files.length);
      	if (qENTS.files.length > 0)
      	{
      		if (relBan) displaySub("ententes");
      		qFileEnt = qENTS.files[curEnt].file;
      		loadEnt();
      	}
      	else
      	{
      		div = document.createElement("tr");
		aLine = '<td colspan="4"><h3>Aucune entente de paiement</h3></td>';
      	  	div.innerHTML = aLine;
    	  	document.getElementById("eachEnt").appendChild(div);
      	}
      }
  }

  //alert("Get the Files!");
  xmlhttp2.open("GET","allScriptsv1.py?tx=getALLsub&sub=ententes&patID="+aPat+"&rand="+Math.random(),true);
  xmlhttp2.send();

  }

  function backENT()
  {
      if (curEnt < qENTS.files.length - 1)
      {
      	curEnt = curEnt + 1;
      	qFileEnt = qENTS.files[curEnt].file;
  	loadEnt();
      }
      displaySub("ententes");
  }

  function forENT()
  {
      if (curEnt > 0)
      {
      	curEnt = curEnt - 1;
      	qFileEnt = qENTS.files[curEnt].file;
  	loadEnt();
      }
      displaySub("ententes");
  }