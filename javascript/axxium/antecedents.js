
  function toggleForce()
  {
        forceMustSee = !forceMustSee;
  	loadJSON();
      	displaySub("antecedents");
  }
  
  function createANT()
  {
  	//loadJSONP(firstJSON);
  	allJSONsP = allJSONs;
  	prot = 1;
  	lang = "fr";
  	quesCTR = 0;
  	pKey = curPatient;
  	firstQues = "Q099";
  	curLoad = "antecedents";
  	curPrefix = "Q";
  	initQuesP();
  }
  
  function uploadANT(aName)
  {
        $.post("uploadJSONsub.py", {sub: "antecedents", name: aName, json: JSON.stringify(qJSON)}, function(result){
            //alert("Les notes ont été enregistrées.");
        });
  }
  
  function loadJSON()
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
        qJSON = JSON.parse(xmlhttp2.responseText);
        //document.getElementById("topNameDate").innerHTML = "&nbsp;&nbsp;<b>" + qJSON["qHeader"]["qLast"] + ", " + qJSON["qHeader"]["qFirst"] + "</b> - " + qJSON["qHeader"]["qDate"] + " / " + qJSON["qHeader"]["qTime"];
        //<h3 id="topNameDate" class="ui dividing header"></h3>
        var qKeys = Object.keys(qJSON);
        document.getElementById("eachAnt").innerHTML = "";
  		//alert(qKeys);
  		aSec = "";
  		for (key in qKeys)
  			{
				if (qKeys[key] != "qHeader")
					{
						extID = qKeys[key];
						if (allJSONs[extID].header[lang] != aSec && allJSONs[extID].header[lang] != "Bienvenue!")
							{
								div = document.createElement("tr");
								aLine = '<td></td><td><h3>'+allJSONs[extID].header[lang]+'</h3></td><td></td><td></td>';
      	  						div.innerHTML = aLine;
    	  						document.getElementById("eachAnt").appendChild(div);
								aSec = allJSONs[extID].header[lang];
							}

      					if (allJSONs[extID].mustSee == "Y")
      						{
      							//alert("Must see! "+extID);
      							displayCurrent("Y");
      						}
      					else if (allJSONs[extID].preCond.length > 0)
      						{
      							if (qJSON[allJSONs[extID].preCond[0].condExtID].answers[allJSONs[extID].preCond[0].condAnswer].fChecked != allJSONs[extID].preCond[0].condTest)
      								{
      									//alert("We have a skipper!");
      								}
      							else
      								{
      									//alert("We have a winner!");
      									displayCurrent("N");
      								}
      						}
      					else if (allJSONs[extID].qType == "IN" || allJSONs[extID].qType == "CO" || allJSONs[extID].qType == "ZZ")
      						{
      							//alert("We have a skipper!");
      						}
      					else
      						{
      							displayCurrent("N");
      						}
					}
				else
					{
      						if (qJSON["qHeader"]["sign0"])
      						{
      							document.getElementById("sigBelowANT0").src = qJSON["qHeader"]["sign0"];
      							document.getElementById("dateBelowANT0").innerHTML = curName + ", " + qJSON["qHeader"]["date0"];
      						}
      						else
      						{
      							document.getElementById("sigBelowANT0").src = "";
      							document.getElementById("dateBelowANT0").innerHTML = "";
      						}
      						displaySign(qJSON,"ANT");
					}
			}
  		}
  }

  //alert("Get the File!");
  xmlhttp2.open("GET","allScriptsv1.py?tx=getJSONsub&sub=antecedents&code="+qFile+"&rand="+Math.random(),true);
  xmlhttp2.send();

  }

  function displayCurrent(aMust)
  {
  //alert(aMust);
      	  				if (qJSON[extID].qType.substring(0,1) == "M" || qJSON[extID].qType.substring(0,1) == "N")
      	  					{
      	  						ctrM = 0;
      	  						chk = "";
      	  						comma = "N";
      	  						nominal = false;
    	  						div = document.createElement("tr");
      	  						for (ans in allJSONs[extID].answers)
      	  							{
      	  								if (qJSON[extID].answers[ans].fChecked == "Y")
      	  									{
      	  										ctrM = ctrM + 1;
      	  										if (comma == "Y") chk = chk + ", ";
      	  										comma = "Y";
      	  										chk = chk + allJSONs[extID].answers[ans].answer[lang];
      	  										if (qJSON[extID].answers[ans].fExtra.length > 0)
      	  										{
      	  											chk = chk + " (" + qJSON[extID].answers[ans].fExtra + ")";
      	  										}
      	  										if (allJSONs[extID].answers[ans].answer[lang] == "Non") nominal = true;
      	  									}
      	  							}
      	  						if (forceMustSee || aMust == "Y" || (ctrM > 0 && !nominal))
      	  						{
      	  							aLine = '<td>'+extID+'</td><td>'+allJSONs[extID].question[lang]+'</td>';
      	  							aLine = aLine + '<td><b>'+chk+'</b></td><td id="n'+extID+'" class="warning">'+qJSON[extID].qEdits+'</td><td><h4><div class="ui axxium tiny button" onclick="addNotes(\''+extID+'\');">Commentaire</div></h4></td>';
      	  							div.innerHTML = aLine;
    	  							document.getElementById("eachAnt").appendChild(div);
      	  						}
      	  					}
      	  				else if (qJSON[extID].qType.substring(0,1) == "E")
      	  					{
      	  						ctrE = 0;
      	  						chk = "";
      	  						comma = "N";
      	  						comma2 = "N";
    	  						div = document.createElement("tr");
    	  						aQues = allJSONs[extID].question[lang];
      	  						//aLine = '<td>'+extID+'</td><td>'+allJSONs[extID].question[lang]+'</td>';
      	  						for (ans in allJSONs[extID].answers)
      	  							{
      	  								if (qJSON[extID].answers[ans].fChecked == "Y")
      	  									{
      	  										ctrE = ctrE + 1;
      	  										if (comma2 == "Y") chk = chk + "<br>";
      	  										comma2 = "Y";
      	  										chk = chk + "<b>" + allJSONs[extID].answers[ans].answer[lang] + "(Oui) " + qJSON[extID].answers[ans].fExtra + "</b>";
      	  									}
      	  								else
      	  									{
      	  										if (forceMustSee || aMust == "Y")
      	  											{
      	  												if (comma2 == "Y") chk = chk + "<br>";
      	  												comma2 = "Y";
      	  												chk = chk + allJSONs[extID].answers[ans].answer[lang] + "(Non)";
      	  											}
      	  									}
      	  							}
      	  						if (forceMustSee || aMust == "Y" || ctrE > 0)
      	  						{
      	  							aLine = '<td>'+extID+'</td><td>'+aQues+'</td>';
      	  							aLine = aLine + '<td><b>'+chk+'</b></td><td id="n'+extID+'" class="warning">'+qJSON[extID].qEdits+'</td><td><h4><div class="ui axxium tiny button" onclick="addNotes(\''+extID+'\');">Commentaire</div></h4></td>';
      	  							div.innerHTML = aLine;
    	  							document.getElementById("eachAnt").appendChild(div);
      	  						}
      	  					}
      	  				else if (qJSON[extID].qType.substring(0,1) == "F")
      	  					{
      	  						ctrF = 0;
      	  						chk = "";
      	  						comma = "N";
    	  						div = document.createElement("tr");
      	  						for (ans in allJSONs[extID].answers)
      	  							{
      	  								if (comma == "Y") chk = chk + "<br>";
      	  								comma = "Y";
      	  								chk = chk + allJSONs[extID].answers[ans].answer[lang] + "(" + qJSON[extID].answers[ans].fValue + ")";
      	  								ctrF = ctrF + qJSON[extID].answers[ans].fValue.length;
      	  							}
      	  						if (forceMustSee || aMust == "Y" || ctrF > 0)
      	  						{
      	  							aLine = '<td>'+extID+'</td><td>'+allJSONs[extID].question[lang]+'</td>';
      	  							aLine = aLine + '<td><b>'+chk+'</b></td><td id="n'+extID+'" class="warning">'+qJSON[extID].qEdits+'</td><td><h4><div class="ui axxium tiny button" onclick="addNotes(\''+extID+'\');">Commentaire</div></h4></td>';
      	  							div.innerHTML = aLine;
    	  							document.getElementById("eachAnt").appendChild(div);
    	  						}
      	  					}
      	  				else if (qJSON[extID].qType == "TX")
      	  					{
      	  						ctrT = qJSON[extID].answers[0].text.length;
      	  						if (forceMustSee || aMust == "Y" || ctrT > 0)
      	  						{
    	  							div = document.createElement("tr");
      	  							aLine = '<td>'+extID+'</td><td>'+allJSONs[extID].question[lang]+'</td>';
      	  							aLine = aLine + '<td><b>'+qJSON[extID].answers[0].text+'</b></td><td id="n'+extID+'" class="warning">'+qJSON[extID].qEdits+'</td><td><h4><div class="ui axxium tiny button" onclick="addNotes(\''+extID+'\');">Commentaire</div></h4></td>';
      	  							div.innerHTML = aLine;
    	  							document.getElementById("eachAnt").appendChild(div);
      	  						}
      	  					}
      	  				else
      	  					{
    	  						div = document.createElement("tr");
      	  						aLine = '<td>'+extID+'</td><td>'+allJSONs[extID].question[lang]+'</td>';
      	  						aLine = aLine + '<td></td><td id="n'+extID+'" class="warning">'+qJSON[extID].qEdits+'</td><td><h4><div class="ui axxium tiny button" onclick="addNotes(\''+extID+'\');">Commentaire</div></h4></td>';
      	  						div.innerHTML = aLine;
    	  						document.getElementById("eachAnt").appendChild(div);
      	  					}
  }

  function loadQJSON(aName)
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
      	allJSONs = JSON.parse(xmlhttp2.responseText);
      }
  }

  //alert("Get the Questionnaire!");
  xmlhttp2.open("GET","allScriptsv1.py?tx=getFile&pKey=1&prot=1&extID="+aName+"&lang="+lang,true);
  xmlhttp2.send();

  }

  function twoDigits(num) {
    return (num < 10 ? "0" : "") + num;
  }

  function loadANT(aPat, relBan)
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
      	qANT = JSON.parse(xmlhttp2.responseText);
      	curAnt = 0;
      	//alert(qANT.files.length);
      	if (qANT.files.length > 0)
      	{
      		if (relBan) displaySub("antecedents");
      		qFile = qANT.files[curAnt].file;
      		firstJSON = qANT.files[curAnt].prot;
  		loadJSON();
      	}
      	else
      	{
      		div = document.createElement("tr");
		aLine = '<td colspan="4"><h3>Aucun historique médical</h3></td>';
      	  	div.innerHTML = aLine;
    	  	document.getElementById("eachAnt").appendChild(div);
      	}
      }
  }

  //alert("Get the Files!");
  xmlhttp2.open("GET","allScriptsv1.py?tx=getANTv1&patID="+aPat,true);
  xmlhttp2.send();

  }

  function backANT()
  {
      if (curAnt < qANT.files.length - 1)
      {
      	curAnt = curAnt + 1;
      	qFile = qANT.files[curAnt].file;
  	loadJSON();
      }
      displaySub("antecedents");
  }

  function forANT()
  {
      if (curAnt > 0)
      {
      	curAnt = curAnt - 1;
      	qFile = qANT.files[curAnt].file;
  	loadJSON();
      }
      displaySub("antecedents");
  }
