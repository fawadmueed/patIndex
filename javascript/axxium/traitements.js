
  function traitEB()
  {
  	var qTodo = [ ];
  	for (tt in odonto.todo)
  	{
  	  qTodo.push({"code": odonto.todo[tt]["code"], "tooth": odonto.todo[tt]["tooth"], "surface": odonto.todo[tt]["surface"], "note": odonto.todo[tt]["note"]});
  	}
  	for (qq in qTRA.done)
  	{
  	  //Add to existing
  	  odonto.exist.push({"code": qTRA.done[qq]["code"], "tooth": qTRA.done[qq]["tooth"], "surface": qTRA.done[qq]["surface"], "note": ""});
  	  
  	  //Remove from todo
  	  qNewTodo = [ ];
  	  for (tt in qTodo)
  	  {
  	  	if (qTodo[tt]["code"] == qTRA.done[qq]["code"] && qTodo[tt]["tooth"] == qTRA.done[qq]["tooth"] && qTodo[tt]["surface"] == qTRA.done[qq]["surface"])
  	  	{
  			//Nothing
  	  	}
  	  	else
  	  	{
  			qNewTodo.push({"code": qTodo[tt]["code"], "tooth": qTodo[tt]["tooth"], "surface": qTodo[tt]["surface"], "note": qTodo[tt]["note"]});
  	  	}
  	  }
  	  qTodo = [ ];
  	  for (tt in qNewTodo)
  	  {
  	    qTodo.push({"code": qNewTodo[tt]["code"], "tooth": qNewTodo[tt]["tooth"], "surface": qNewTodo[tt]["surface"], "note": qNewTodo[tt]["note"]});
  	  }
  	}
  	odonto.todo = qTodo;
  	$('.menu .item').tab('change tab', 'odonto');
  	uploadODO(qFileOdo);
  }
  
  function cancelProts()
  {
	$('.modalTraits.modal').modal('hide');
  }
  
  function corProts(aNum)
  {
	modalCorr = aNum;
        //alert(modalCorr);
	document.getElementById("Ecorr").value = "";
	if (qTRA.done[modalCorr]["corr"]) document.getElementById("Ecorr").value = qTRA.done[modalCorr]["corr"];
	$('.modalCorr.modal').modal('show');
  }
	
  function acceptProts()
  {
  	if (protAdd)
  	{
  		var pT = textProts(pResp);
  		pT = pT.replace(/<br>/g, "\n");
  		document.getElementById("totTxt").value = pT;
  		$('.modalProts.modal').modal('hide');
  		$('.modalTwo.modal').modal('show');
  	}
  	else
  	{
  		//document.getElementById("dTRA"+protNum).innerHTML = textProts(pResp);
  		qTRA.done[protNum]["prots"] = pResp;
    		uploadTRA(qFileTrait);
  		$('.modalProts.modal').modal('hide');
  	}
  }
  
  function modProts(aType,aLine)
  {
	protNum = aLine;
	pResp = qTRA.done[protNum]["prots"];
	protAdd = false;
	if (aType == 1)
	{
		displayProts("Prévention");
	}
	else
	{
		displayProts("Diagnostic");
	}
	$('.modalProts.modal').modal('show');
  }

  function resetSelectButtons()
  {
	if(curKind == 'Diagnostic')		document.getElementById("sB1").setAttribute("class","ui axxium small disabled button"); else document.getElementById("sB1").setAttribute("class","ui axxium small button");
	if(curKind == 'Prévention')		document.getElementById("sB2").setAttribute("class","ui axxium small disabled button"); else document.getElementById("sB2").setAttribute("class","ui axxium small button");
	if(curKind == 'Restauration')		document.getElementById("sB3").setAttribute("class","ui axxium small disabled button"); else document.getElementById("sB3").setAttribute("class","ui axxium small button");
	if(curKind == 'Endodontie')		document.getElementById("sB4").setAttribute("class","ui axxium small disabled button"); else document.getElementById("sB4").setAttribute("class","ui axxium small button");
	if(curKind == 'Prothèses fixes')	document.getElementById("sB5").setAttribute("class","ui axxium small disabled button"); else document.getElementById("sB5").setAttribute("class","ui axxium small button");
	if(curKind == 'Chirurgie')		document.getElementById("sB6").setAttribute("class","ui axxium small disabled button"); else document.getElementById("sB6").setAttribute("class","ui axxium small button");
	if(curKind == 'Parodontie')		document.getElementById("sB7").setAttribute("class","ui axxium small disabled button"); else document.getElementById("sB7").setAttribute("class","ui axxium small button");
	if(curKind == 'Prothèses amovibles')	document.getElementById("sB8").setAttribute("class","ui axxium small disabled button"); else document.getElementById("sB8").setAttribute("class","ui axxium small button");
	if(curKind == 'Prothèse complète')	document.getElementById("sB9").setAttribute("class","ui axxium small disabled button"); else document.getElementById("sB9").setAttribute("class","ui axxium small button");
	if(curKind == 'Prothèses complète et partielle') document.getElementById("sB10").setAttribute("class","ui axxium small disabled button"); else document.getElementById("sB10").setAttribute("class","ui axxium small button");
  }
  
  function startProt()
  {
  	pResp = pMaster;
	displayProts("Diagnostic");
	$('.modalTwo.modal').modal('hide');
	$('.modalProts.modal').modal('show');
  }

  function resetProtButtons()
  {	
	if(curKind == 'Diagnostic')		document.getElementById("pB1").setAttribute("class","ui axxium small disabled button"); else document.getElementById("pB1").setAttribute("class","ui axxium small button");
	if(curKind == 'Prévention')		document.getElementById("pB2").setAttribute("class","ui axxium small disabled button"); else document.getElementById("pB2").setAttribute("class","ui axxium small button");
	if(curKind == 'Anesthésie')		document.getElementById("pB3").setAttribute("class","ui axxium small disabled button"); else document.getElementById("pB3").setAttribute("class","ui axxium small button");
	if(curKind == 'Endodontie')		document.getElementById("pB4").setAttribute("class","ui axxium small disabled button"); else document.getElementById("pB4").setAttribute("class","ui axxium small button");
	if(curKind == 'Occlusion')		document.getElementById("pB5").setAttribute("class","ui axxium small disabled button"); else document.getElementById("pB5").setAttribute("class","ui axxium small button");
	if(curKind == 'Chirurgie')		document.getElementById("pB6").setAttribute("class","ui axxium small disabled button"); else document.getElementById("pB6").setAttribute("class","ui axxium small button");
	if(curKind == 'Parodontie')		document.getElementById("pB7").setAttribute("class","ui axxium small disabled button"); else document.getElementById("pB7").setAttribute("class","ui axxium small button");
	if(curKind == 'Orthodontie')		document.getElementById("pB8").setAttribute("class","ui axxium small disabled button"); else document.getElementById("pB8").setAttribute("class","ui axxium small button");
	if(curKind == 'Prothèses amovibles')	document.getElementById("pB9").setAttribute("class","ui axxium small disabled button"); else document.getElementById("pB9").setAttribute("class","ui axxium small button");
	if(curKind == 'Prothèses fixes')	document.getElementById("pB10").setAttribute("class","ui axxium small disabled button"); else document.getElementById("pB10").setAttribute("class","ui axxium small button");
	if(curKind == 'Implant')		document.getElementById("pB11").setAttribute("class","ui axxium small disabled button"); else document.getElementById("pB11").setAttribute("class","ui axxium small button");
  }
  
  function addTrait()
  {
	pSelect = JSON.parse(JSON.stringify(masterResp));
	displaySelect("Restauration");
	$('.modalSelect.modal').modal('show');
  }

  function selectDent()
  {
	textS = "";
	document.getElementById("toothDent").value = "";
	$('.modalSelectDent.modal').modal('show');
  }

  function selectBL()
  {
	textS = "";
	document.getElementById("toothBL").value = "";
	isBuc = true;
	document.getElementById("butBuc").setAttribute("class","ui axxium tiny button");
	isLab = true;
	document.getElementById("butLab").setAttribute("class","ui axxium tiny button");
	$('.modalSelectBL.modal').modal('show');
  }

  function selectMD()
  {
	textS = "";
	document.getElementById("toothMD").value = "";
	isMed = true;
	document.getElementById("butMed").setAttribute("class","ui axxium tiny button");
	isDis = true;
	document.getElementById("butDis").setAttribute("class","ui axxium tiny button");
	$('.modalSelectMD.modal').modal('show');
  }

  function selectSurf()
  {
	textS = "";
	document.getElementById("toothSurf").value = "";
	isMs = true;
	document.getElementById("butMs").setAttribute("class","ui axxium tiny button");
	isOs = true;
	document.getElementById("butOs").setAttribute("class","ui axxium tiny button");
	isDs = true;
	document.getElementById("butDs").setAttribute("class","ui axxium tiny button");
	isBs = true;
	document.getElementById("butBs").setAttribute("class","ui axxium tiny button");
	isLs = true;
	document.getElementById("butLs").setAttribute("class","ui axxium tiny button");
	$('.modalSelectSurf.modal').modal('show');
  }

  function setBuc() { isBuc = true; document.getElementById("butBuc").setAttribute("class","ui red tiny button"); addTextS("B"); }
  function setLab() { isLab = true; document.getElementById("butLab").setAttribute("class","ui red tiny button"); addTextS("L"); }
  function setMed() { isMed = true; document.getElementById("butMed").setAttribute("class","ui red tiny button"); addTextS("M"); }
  function setDis() { isDis = true; document.getElementById("butDis").setAttribute("class","ui red tiny button"); addTextS("D"); }
  function setMs() { isMs = true; document.getElementById("butMs").setAttribute("class","ui red tiny button"); addTextS("M"); }
  function setOs() { isOs = true; document.getElementById("butOs").setAttribute("class","ui red tiny button"); addTextS("O"); }
  function setDs() { isDs = true; document.getElementById("butDs").setAttribute("class","ui red tiny button"); addTextS("D"); }
  function setBs() { isBs = true; document.getElementById("butBs").setAttribute("class","ui red tiny button"); addTextS("B"); }
  function setLs() { isLs = true; document.getElementById("butLs").setAttribute("class","ui red tiny button"); addTextS("L"); }

  function addTextS(aCode)
  {
	textS = textS + aCode;
  }

  function closeBL()
  {
	$('.modalSelectBL.modal').modal('hide');
  }

  function closeMD()
  {
	$('.modalSelectMD.modal').modal('hide');
  }

  function closeSurf()
  {
	$('.modalSelectSurf.modal').modal('hide');
  }

  function closeDent()
  {
	$('.modalSelectDent.modal').modal('hide');
  }
  
  function delTrait()
  {
  	var ctrp = 0;
  	var qNewDone = [ ];
  	for (tt in qTRA.done)
  	{
  	  if (document.getElementById("xTRA"+ctrp).checked)
  	  {
  		//Nothing
  	  }
  	  else
  	  {
  		qNewDone.push({"code": qTRA.done[tt]["code"], "tooth": qTRA.done[tt]["tooth"], "surface": qTRA.done[tt]["surface"], "prots": qTRA.done[tt]["prots"], "corr": qTRA.done[tt]["corr"]});
  	  }
  	  ctrp = ctrp + 1;
  	}
  	qTRA.done = qNewDone;
  	uploadTRA(qFileTrait);
  	//setTimeout(loadTRAS(curPatient), 3000);
  }
  
  function createTRA()
  {
  	//alert("Create TRA");
  	var d = new Date();
  	var ddj = d.getFullYear() + '/' + twoDigits(d.getMonth() + 1) + '/' + twoDigits(d.getDate());
  	var hdj = twoDigits(d.getHours()) + ':' + twoDigits(d.getMinutes());
  	qTRA = { "id" : curPatient, "date" : ddj, "time" : hdj, "done" : [ ] };
  	for (tt in odonto.todo)
  	{
  		qTRA.done.push({"code": odonto.todo[tt]["code"], "tooth": odonto.todo[tt]["tooth"], "surface": odonto.todo[tt]["surface"], "prots": pMaster, "corr": ""});
  	}
  	qFileTrait= "T_" + curPatient + "_" + d.getTime();
  	uploadTRA(qFileTrait);
  }
  
  function uploadTRA(aName)
  {
        $.post("uploadJSONsub.py", {sub: "traitements", name: aName, json: JSON.stringify(qTRA)}, function(result){
            //alert("Les traitements ont été enregistrés. "+aName);
            loadTRAS(curPatient, true);
        });
  }

  function acceptVal2(aList)
  {
    text422 = document.getElementById("text422").value;
    note422 = document.getElementById("totTxt").value;
    tooth422 = document.getElementById("EtoothT2").value;
    surf422 = document.getElementById("EsurfT2").value;
    //price422 = document.getElementById("EpriceT2").value;
    
    //{ "code" : "23223", "tooth" : "24", "surface" : "MDO", "prots": { list } }
    
    var nextTrait = qTRA.done.length;
    div = document.createElement("tr");
    div.setAttribute("id", currentCode2);
    div.innerHTML = '<td><h4><input id="xTRA'+nextTrait+'" type="checkbox" tabindex="'+nextTrait+'" class="hidden"></h4></td><td><h4>'+currentCode2+'</h4></td><td><h4>'+tooth422+'</h4></td><td><h4>'+surf422+'</h4></td><td><h4>'+note422+'</h4></td>';
    document.getElementById("eachTrait").appendChild(div);
    
    qTRA.done.push({ "code" : currentCode2, "tooth" : tooth422, "surface" : surf422, "prots" : pResp });
    clearVal2();
    $('.modalTwo.modal').modal('hide');
    uploadTRA(qFileTrait);
  }

  function clearVal2()
  {
    tracks422 = "";
    currentCode2 = "";
    document.getElementById("text422").value = "";
    document.getElementById("EtoothT2").value = "";
    document.getElementById("EsurfT2").value = "";
    //document.getElementById("EpriceT2").value = "";
    document.getElementById("totTxt").value = "";
    document.getElementById("searchField2").value = "";
    $('.ui.modalTwo').modal('hide');
  }

  function addText2(aText)  { document.getElementById("text422").value = document.getElementById("text422").value + aText;  }

  function keyEntry2(aNum)
  {
      		if (aNum == -1)
      			{
      				if (tracks422.length > 0) tracks422 = tracks422.substr(0,tracks422.length - 1);
      				document.getElementById("text422").value = tracks422;
      			}
      		if (aNum == -2)
      			{
    				tracks422 = "";
  				document.getElementById("text422").value = "";
      			}
      		if (aNum > -1)
      			{
  				tracks422 = tracks422 + aNum;
      				if (tracks422.length == 5)
      				{
      					currentCode2 = tracks422;
      					if (qCODES[currentCode2])
      						{
      							document.getElementById("text422").value = currentCode2 + " - " + qCODES[currentCode2].fr;
      							//document.getElementById("EpriceT2").value = qCODES[currentCode2].prix;
      						}
      					else
      						{
      							document.getElementById("text422").value = "CODE INCORRECT : "+ tracks422;
      							tracks422 = "";
      						}
      				}
      				else
      				{
      					document.getElementById("text422").value = tracks422;
      				}
      			}
  }
  
  function loadTrait()
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
      qTRA = JSON.parse(xmlhttp2.responseText);
      isLockedTRA = false;
      if (qTRA.date)
      {
  	var d = new Date();
  	var ddj = d.getFullYear() + '/' + twoDigits(d.getMonth() + 1) + '/' + twoDigits(d.getDate());
      	if (qTRA.date != ddj) isLockedTRA = true;
      }
      document.getElementById("eachTrait").innerHTML = "";
      //totTrait = 0;
      var ctrp = 0;
      for (tt in qTRA.done)
      		{
    			div = document.createElement("tr");
    			div.setAttribute("id", "TRA"+ctrp);
    			var pText = "";
    			if (qCODES[qTRA.done[tt]["code"]]) pText = qCODES[qTRA.done[tt]["code"]].fr + "<br>";
    			pText = pText + textProts(qTRA.done[tt]["prots"]);
    			//alert(pText);
    			var aCorr = "";
    			if (qTRA.done[tt]["corr"]) aCorr = '<br><font color="#ff695e">Correction : ' + qTRA.done[tt]["corr"] + '</font>';
    			if (isLockedTRA)
    			{
    				div.innerHTML = '<td><h4><input id="xTRA'+ctrp+'" type="checkbox" tabindex="'+ctrp+'" class="hidden"></h4></td><td><h4>'+qTRA.done[tt]["code"]+'</h4></td><td><h4>'+qTRA.done[tt]["tooth"]+'</h4></td><td><h4>'+qTRA.done[tt]["surface"]+'</h4></td><td><h4 id="dTRA'+ctrp+'">'+pText+aCorr+'</h4></td><td><h4><div class="ui axxium tiny button" onclick="corProts('+ctrp+');">Corriger</div></h4></td>';
    				document.getElementById("eachTrait").appendChild(div);
    			}
    			else
    			{
    				div.innerHTML = '<td><h4><input id="xTRA'+ctrp+'" type="checkbox" tabindex="'+ctrp+'" class="hidden"></h4></td><td><h4>'+qTRA.done[tt]["code"]+'</h4></td><td><h4>'+qTRA.done[tt]["tooth"]+'</h4></td><td><h4>'+qTRA.done[tt]["surface"]+'</h4></td><td><h4 id="dTRA'+ctrp+'">'+pText+aCorr+'</h4></td><td><h4><div class="ui axxium tiny button" onclick="modProts(1,'+ctrp+');">Prot</div>&nbsp;&nbsp;<div class="ui axxium tiny button" onclick="modProts(2,'+ctrp+');">Diag</div></h4></td>';
    				document.getElementById("eachTrait").appendChild(div);
    			}
    			//totTrait = totTrait + parseInt(qTRA.done[tt]["prix"]);
    			ctrp = ctrp + 1;
    	  	}
      if (isLockedTRA)
      {
      	document.getElementById("delTrait").setAttribute("class","ui axxium tiny disabled button");
      	document.getElementById("addTrait").setAttribute("class","ui axxium tiny disabled button");
      }
      else
      {
      	document.getElementById("delTrait").setAttribute("class","ui axxium tiny button");
      	document.getElementById("addTrait").setAttribute("class","ui axxium tiny button");
      }
      //alert(totTrait+" $");
      //document.getElementById("totTrait").innerHTML = totTrait+" $";
      displaySign(qTRA,"TRA");
      }
  }

  //alert("Get the qTRA!");
  xmlhttp2.open("GET","allScriptsv1.py?tx=getJSONsub&sub=traitements&code="+qFileTrait+"&rand="+Math.random(),true);
  xmlhttp2.send();

  }

  function loadTRAS(aPat, relBan)
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
      qTRAS = JSON.parse(xmlhttp2.responseText);
      curTrait = 0;
      	if (qTRAS.files.length > 0)
      	{
      		if (relBan) displaySub("traitements");
      		qFileTrait = qTRAS.files[curTrait].file;
      		//alert("Load trait "+curTrait);
      		loadTrait();
      	}
      	else
      	{
      		div = document.createElement("tr");
		aLine = '<td colspan="4"><h3>Aucun traitement</h3></td>';
      	  	div.innerHTML = aLine;
    	  	document.getElementById("eachTrait").appendChild(div);
      		//document.getElementById("addTrait").setAttribute("class", "ui axxium tiny disabled button");
      		//document.getElementById("delTrait").setAttribute("class", "ui axxium tiny disabled button");
      	}
      }
  }

  //alert("Get the Files!");
  xmlhttp2.open("GET","allScriptsv1.py?tx=getALLsub&sub=traitements&patID="+aPat+"&rand="+Math.random(),true);
  xmlhttp2.send();

  }

  function textProts(aProtList)
  {
  	  var qKeys = Object.keys(qProt);
  	  var aBR = false;
  	  var totTxt = "";
  	  for (key in qKeys)
  		{
  			var txt = "";
      		var ctrp = 0;
      		var aCM = false;
      		for (rr in qProt[qKeys[key]]["rows"])
      			{
    				div = document.createElement("tr");
    				for (cc in qProt[qKeys[key]]["rows"][rr])
    				{
    					aType = qProt[qKeys[key]]["rows"][rr][cc].type;
    					if (aType == "C")
    					{
    						if (aProtList[qKeys[key]][aType+ctrp] == "Y")
    						{
    							if (aCM)
    							{
    								txt = txt + ",&nbsp;&nbsp;&nbsp;" + qProt[qKeys[key]]["rows"][rr][cc].desc;
    							}
    							else
    							{
    								txt = qProt[qKeys[key]]["rows"][rr][cc].desc;
    								aCM = true;
    							}
    						}
    					}
    					if (aType == "T")
    					{
    						//alert(qKeys[key]+aType+ctrp+""+aProtList[qKeys[key]][aType+ctrp]);
    						if (aProtList[qKeys[key]][aType+ctrp].length > 0)
    						{
    							if (aCM)
    							{
    								txt = txt + ",&nbsp;&nbsp;&nbsp;" + qProt[qKeys[key]]["rows"][rr][cc].desc + " :&nbsp;&nbsp;&nbsp;" + aProtList[qKeys[key]][aType+ctrp];
    							}
    							else
    							{
    								txt = qProt[qKeys[key]]["rows"][rr][cc].desc + " :&nbsp;&nbsp;&nbsp;" + aProtList[qKeys[key]][aType+ctrp];
    								aCM = true;
    							}
    						}
    					}
    					ctrp = ctrp + 1;
    				}
    			}
    			//alert(qKeys[key]+"T"+ctrp);
    			if (aProtList[qKeys[key]]["T"+ctrp].length > 0)
    			{
    				if (aCM)
    				{
    					txt = txt + ",&nbsp;&nbsp;&nbsp;" + "Notes cliniques :&nbsp;&nbsp;&nbsp;" + aProtList[qKeys[key]]["T"+ctrp];
    				}
    				else
    				{
    					txt = "Notes cliniques :&nbsp;&nbsp;&nbsp;" + aProtList[qKeys[key]]["T"+ctrp];
    					aCM = true;
    				}
    			}
    		if (txt.length > 0)
    		{
    			if (aBR)
    			{
    				totTxt = totTxt + "<br>" + qProt[qKeys[key]].short + " :&nbsp;&nbsp;&nbsp;" + txt;
    			}
    			else
    			{
    				totTxt = qProt[qKeys[key]].short + " :&nbsp;&nbsp;&nbsp;" + txt;
    				aBR = true;
    			}
    		}
  		}
  		//alert(totTxt);
  		//document.getElementById("totTxt").value = totTxt;
  		//$('.modalProts.modal').modal('hide');
		//$('.modalTwo.modal').modal('show');
		return totTxt;
  }

  function displayProts(aKind)
  {
      curKind = aKind;
      resetProtButtons();
      document.getElementById("protHeader").innerHTML = '<i class="treatment icon"></i>' + aKind;
      document.getElementById("eachProtRow").innerHTML = "";
      var ctrp = 0;
      for (rr in qProt[aKind]["rows"])
      	{
    		div = document.createElement("tr");
    		for (cc in qProt[aKind]["rows"][rr])
    		{
    			//<td id="C8" name="Prophylaxie" class="two column wide">Prophylaxie</td>
    			aType = qProt[aKind]["rows"][rr][cc].type;
    			aDesc = qProt[aKind]["rows"][rr][cc].desc;
    			div2 = document.createElement("td");
    			div2.setAttribute("id", aType+ctrp);
    			div2.setAttribute("name", aDesc);
    			div2.setAttribute("class", "two column wide");
    			if (aType == "N" && cc == 0)
    			{
    				div2.innerHTML = '<h4>'+aDesc+'</h4>';
    			}
    			else if (aType == "T")
    			{
    				if (pResp[aKind][aType+ctrp].length > 0)
    				{
    					div2.innerHTML = '<i class="icon checkmark"></i> <b>' + aDesc + " : " + pResp[aKind][aType+ctrp];
    				}
    				else
    				{
    					div2.innerHTML = aDesc + " :";
    				}
    			}
    			else
    			{
    				if (pResp[aKind][aType+ctrp] == "Y")
    				{
    					div2.innerHTML = '<i class="icon checkmark"></i> <b>' + aDesc + '</b>';
    				}
    				else
    				{
    					div2.innerHTML = aDesc;
    				}
    			}
    			div.appendChild(div2);
    			ctrp = ctrp + 1;
    		}
    		document.getElementById("eachProtRow").appendChild(div);
    	}
    	div3 = document.createElement("tr");
    	//div3.setAttribute("colspan","6");
    	div2 = document.createElement("td");
    	div2.setAttribute("id", "T"+ctrp);
    	div2.setAttribute("name", "Notes cliniques");
    	div2.setAttribute("colspan","6");
    	div2.setAttribute("class", "sixteen column wide");
    	if (pResp[aKind]["T"+ctrp].length > 0)
    	{
    		div2.innerHTML = '<i class="icon checkmark"></i> <b>Notes cliniques : ' + pResp[aKind]["T"+ctrp] + '</b>';
    	}
    	else
    	{
    		div2.innerHTML = 'Notes cliniques : ';
    	}
    	div3.appendChild(div2);
    	document.getElementById("eachProtRow").appendChild(div3);

	    $('#protTable tbody tr td').click(function(){
	          curType = $(this).attr("id");
	          curProtName = $(this).attr("name");
	          cont = document.getElementById(curType).innerHTML;
	          if (curType.substring(0,1) == "C")
	          {
	          	if (pResp[curKind][curType] == "Y")
	          	{
	          		document.getElementById(curType).innerHTML = curProtName;
	          		pResp[curKind][curType] = "N";
	          	}
	          	else
	          	{
	          		document.getElementById(curType).innerHTML = '<i class="icon checkmark"></i> <b>' + cont + '</b>';
	          		pResp[curKind][curType] = "Y";
	          	}
	          }
	          if (curType.substring(0,1) == "T")
	          {
	          	if (pResp[curKind][curType].length > 0)
	          	{
	          		document.getElementById("EnoteProt").value = pResp[curKind][curType];
	          	}
	          	else
	          	{
	          		document.getElementById("EnoteProt").value = "";
	          	}
	          	$('.modalNoteProt.modal').modal('show');
	          }
      	});
  }

  function displaySelect(aKind)
  {
      curKind = aKind;
      resetSelectButtons();
      document.getElementById("selectHeader").innerHTML = '<i class="treatment icon"></i>' + aKind;
      document.getElementById("eachSelectRow").innerHTML = "";
      var ctrp = 0;
      for (rr in qSelect[aKind]["rows"])
      	{
    		div = document.createElement("tr");
    		for (cc in qSelect[aKind]["rows"][rr])
    		{
    			//<td id="C8" name="Prophylaxie" class="two column wide">Prophylaxie</td>
    			aType = qSelect[aKind]["rows"][rr][cc].type;
    			aDesc = qSelect[aKind]["rows"][rr][cc].desc;
    			div2 = document.createElement("td");
    			div2.setAttribute("id", aType+ctrp);
    			div2.setAttribute("name", aDesc);
    			div2.setAttribute("class", "two column wide");
    			if (aType == "N" && cc == 0)
    			{
    				div2.innerHTML = '<h4>'+aDesc+'</h4>';
    			}
    			else if (aType == "T")
    			{
    				div2.innerHTML = aDesc + " :";
    			}
    			else
    			{
    				div2.innerHTML = aDesc;
    			}
    			div.appendChild(div2);
    			ctrp = ctrp + 1;
    		}
    		document.getElementById("eachSelectRow").appendChild(div);
    	}

	    $('#selectTable tbody tr td').click(function(){
	          curType = $(this).attr("id");
	          curProtName = $(this).attr("name");
	          cont = document.getElementById(curType).innerHTML;
	          if (curType.substring(0,1) == "C" || curType.substring(0,1) == "D" || curType.substring(0,1) == "B" || curType.substring(0,1) == "M" || curType.substring(0,1) == "S")
	          {
	          	if (pSelect[curKind][curType] == "Y")
	          	{
	          		document.getElementById(curType).innerHTML = curProtName;
	          		pSelect[curKind][curType] = "N";
	          	}
	          	else
	          	{
	          		document.getElementById(curType).innerHTML = '<i class="icon checkmark"></i> <b>' + cont + '</b>';
	          		pSelect[curKind][curType] = "Y";
	          		if (curType.substring(0,1) == "D") selectDent();
	          		if (curType.substring(0,1) == "B") selectBL();
	          		if (curType.substring(0,1) == "M") selectMD();
	          		if (curType.substring(0,1) == "S") selectSurf();
	          	}
	          }
	          if (curType.substring(0,1) == "T")
	          {
	          	if (pSelect[curKind][curType].length > 0)
	          	{
	          		document.getElementById("EnoteProt").value = pSelect[curKind][curType];
	          	}
	          	else
	          	{
	          		document.getElementById("EnoteProt").value = "";
	          	}
	          	$('.modalNoteProt.modal').modal('show');
	          }
      	});
  }

  function selectTraits()
  {
  	var qKeys = Object.keys(qSelect);
  	var newTraits = { };
  	for (key in qKeys)
  	{	
      		var ctrp = 0;
      		for (rr in qSelect[qKeys[key]]["rows"])
      			{
    				for (cc in qSelect[qKeys[key]]["rows"][rr])
    				{
    					aType = qSelect[qKeys[key]]["rows"][rr][cc].type;
    					if (aType == "C" || aType == "D" || aType == "B" || aType == "M" || aType == "S")
    					{
    						if (pSelect[qKeys[key]][aType+ctrp] == "Y")
    						{
    							//alert("Hit!");
    							var aTooth = 0;
    							if (aType == "D") aTooth = document.getElementById("toothDent").value;
    							if (aType == "B") aTooth = document.getElementById("toothBL").value;
    							if (aType == "M") aTooth = document.getElementById("toothMD").value;
    							if (aType == "S") aTooth = document.getElementById("toothSurf").value;
    		//{ "code" : "23223", "tooth" : "24", "surface" : "MDO", "prots": { list } }
    		var aCode = qSelect[qKeys[key]]["rows"][rr][cc].desc.substring(0,5);
    		//alert(aCode+" "+aTooth);
  		qTRA.done.push({"code": aCode, "tooth": aTooth, "surface": textS, "prots": pMaster, "corr": ""});
    						}
    					}
    					ctrp = ctrp + 1;
    				}
    			}
  	}
  	uploadTRA(qFileTrait);
  	$('.modalSelect.modal').modal('hide');
  }

  function loadProts()
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
      qProt = JSON.parse(xmlhttp2.responseText);
  	  var qKeys = Object.keys(qProt);
  	  for (key in qKeys)
  		{
  			pMaster[qKeys[key]] = { };
      			var ctrp = 0;
      			for (rr in qProt[qKeys[key]]["rows"])
      			{
    				div = document.createElement("tr");
    				for (cc in qProt[qKeys[key]]["rows"][rr])
    				{
    					aType = qProt[qKeys[key]]["rows"][rr][cc].type;
    					if (aType == "C")
    					{
    						pMaster[qKeys[key]][aType+ctrp] = "N";
    					}
    					else
    					{
    						pMaster[qKeys[key]][aType+ctrp] = "";
    					}
    					ctrp = ctrp + 1;
    				}
    			}
    			pMaster[qKeys[key]]["T"+ctrp] = "";
  		}
      }
    }

		xmlhttp2.open("GET","json/params/protocoles.json",true);
		xmlhttp2.send();

  }

  function loadSelect()
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
      qSelect = JSON.parse(xmlhttp2.responseText);
  	  var qKeys = Object.keys(qSelect);
  	  for (key in qKeys)
  		{
  			masterResp[qKeys[key]] = { };
      			var ctrp = 0;
      			for (rr in qSelect[qKeys[key]]["rows"])
      			{
    				div = document.createElement("tr");
    				for (cc in qSelect[qKeys[key]]["rows"][rr])
    				{
    					aType = qSelect[qKeys[key]]["rows"][rr][cc].type;
    					if (aType == "C" || aType == "B" || aType == "M" || aType == "S")
    					{
    						masterResp[qKeys[key]][aType+ctrp] = "N";
    					}
    					else
    					{
    						masterResp[qKeys[key]][aType+ctrp] = "";
    					}
    					ctrp = ctrp + 1;
    				}
    			}
  		}
      }
    }

		xmlhttp2.open("GET","json/params/select.json",true);
		xmlhttp2.send();

  }

  function backTRA()
  {
      if (curTrait < qTRAS.files.length - 1)
      {
      	curTrait = curTrait + 1;
      	qFileTrait = qTRAS.files[curTrait].file;
  	loadTrait();
      }
      displaySub("traitements");
  }

  function forTRA()
  {
      if (curTrait > 0)
      {
      	curTrait = curTrait - 1;
      	qFileTrait = qTRAS.files[curTrait].file;
  	loadTrait();
      }
      displaySub("traitements");
  }