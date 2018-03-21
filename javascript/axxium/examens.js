
  function toggleForceExa()
  {
        forceMustSeeExa = !forceMustSeeExa;
  	loadEXA();
      	displaySub("examens");
  }
  
  function createEXA()
  {
  	//loadJSONP(firstJSON);
  	allJSONsP = allEXAMs;
  	prot = 1;
  	lang = "fr";
  	quesCTR = 1;
  	pKey = curPatient;
  	firstQues = "Q102";
  	curLoad = "examens";
  	curPrefix = "E";
  	initQuesP();
  }
  
  function uploadEXA(aName)
  {
        $.post("uploadJSONsub.py", {sub: "examens", name: aName, json: JSON.stringify(qEXA)}, function(result){
            //alert("Les notes ont été enregistrées. "+aName);
        });
  }
  
  function loadEXA()
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
        qEXA = JSON.parse(xmlhttp2.responseText);
        //document.getElementById("topNameDate").innerHTML = "&nbsp;&nbsp;<b>" + qEXA["qHeader"]["qLast"] + ", " + qEXA["qHeader"]["qFirst"] + "</b> - " + qEXA["qHeader"]["qDate"] + " / " + qEXA["qHeader"]["qTime"];
        //<h3 id="topNameDate" class="ui dividing header"></h3>
        var qKeys = Object.keys(qEXA);
        document.getElementById("eachExa").innerHTML = "";
  		//alert(qKeys);
  		aSec = "";
  		for (key in qKeys)
  			{
				if (qKeys[key] != "qHeader")
					{
						extIDexa = qKeys[key];
						if (allEXAMs[extIDexa].header[lang] != aSec && allEXAMs[extIDexa].header[lang] != "Bienvenue!")
							{
								div = document.createElement("tr");
								aLine = '<td></td><td><h3>'+allEXAMs[extIDexa].header[lang]+'</h3></td><td></td><td></td>';
      	  						div.innerHTML = aLine;
    	  						document.getElementById("eachExa").appendChild(div);
								aSec = allEXAMs[extIDexa].header[lang];
							}

      					if (allEXAMs[extIDexa].mustSee == "Y")
      						{
      							//alert("Must see! "+extIDexa);
      							displayCurrentEXA("Y");
      						}
      					else if (allEXAMs[extIDexa].preCond.length > 0)
      						{
      							if (qEXA[allEXAMs[extIDexa].preCond[0].condextIDexa].answers[allEXAMs[extIDexa].preCond[0].condAnswer].fChecked != allEXAMs[extIDexa].preCond[0].condTest)
      								{
      									//alert("We have a skipper!");
      								}
      							else
      								{
      									//alert("We have a winner!");
      									displayCurrentEXA("N");
      								}
      						}
      					else if (allEXAMs[extIDexa].qType == "IN" || allEXAMs[extIDexa].qType == "CO" || allEXAMs[extIDexa].qType == "ZZ")
      						{
      							//alert("We have a skipper!");
      						}
      					else
      						{
      							displayCurrentEXA("N");
      						}
					}
				else
					{
      						displaySign(qEXA,"EXA");
					}
			}
  		}
  }

  //alert("Get the Exa File!");
  xmlhttp2.open("GET","allScriptsv1.py?tx=getJSONsub&sub=examens&code="+qFileExa+"&rand="+Math.random(),true);
  xmlhttp2.send();

  }

  function displayCurrentEXA(aMust)
  {
      	  				if (qEXA[extIDexa].qType.substring(0,1) == "M" || qEXA[extIDexa].qType.substring(0,1) == "N")
      	  					{
      	  						ctrM = 0;
      	  						chk = "";
      	  						comma = "N";
    	  						div = document.createElement("tr");
      	  						for (ans in allEXAMs[extIDexa].answers)
      	  							{
      	  								if (qEXA[extIDexa].answers[ans].fChecked == "Y")
      	  									{
      	  										ctrM = ctrM + 1;
      	  										if (comma == "Y") chk = chk + ", ";
      	  										comma = "Y";
      	  										chk = chk + allEXAMs[extIDexa].answers[ans].answer[lang];
      	  										//if (qEXA[extIDexa].answers[ans].fExtra.length > 0) chk = chk + " (" + qEXA[extIDexa].answers[ans].fExtra + ")"
      	  										if (qEXA[extIDexa].answers[ans].fExtra.length > 0)
      	  										{
      	  											chk = chk + " (" + qEXA[extIDexa].answers[ans].fExtra + ")";
      	  										}
      	  									}
      	  							}
      	  						if (forceMustSeeExa || aMust == "Y" || ctrM > 0)
      	  						{
      	  							aLine = '<td>'+extIDexa+'</td><td>'+allEXAMs[extIDexa].question[lang]+'</td>';
      	  							aLine = aLine + '<td><b>'+chk+'</b></td><td id="m'+extIDexa+'" class="warning">'+qEXA[extIDexa].qEdits+'</td><td><h4><div class="ui axxium tiny button" onclick="addNotes2(\''+extIDexa+'\');">Commentaire</div></h4></td>';
      	  							div.innerHTML = aLine;
    	  							document.getElementById("eachExa").appendChild(div);
      	  						}
      	  					}
      	  				else if (qEXA[extIDexa].qType.substring(0,1) == "E")
      	  					{
      	  						ctrE = 0;
      	  						chk = "";
      	  						comma = "N";
      	  						comma2 = "N";
    	  						div = document.createElement("tr");
    	  						aQues = allEXAMs[extIDexa].question[lang];
      	  						//aLine = '<td>'+extIDexa+'</td><td>'+allEXAMs[extIDexa].question[lang]+'</td>';
      	  						for (ans in allEXAMs[extIDexa].answers)
      	  							{
      	  								if (qEXA[extIDexa].answers[ans].fChecked == "Y")
      	  									{
      	  										ctrE = ctrE + 1;
      	  										if (comma2 == "Y") chk = chk + "<br>";
      	  										comma2 = "Y";
      	  										chk = chk + "<b>" + allEXAMs[extIDexa].answers[ans].answer[lang] + "(Oui) " + qEXA[extIDexa].answers[ans].fExtra + "</b>";
      	  									}
      	  								else
      	  									{
      	  										if (forceMustSeeExa || aMust == "Y")
      	  											{
      	  												if (comma2 == "Y") chk = chk + "<br>";
      	  												comma2 = "Y";
      	  												chk = chk + allEXAMs[extIDexa].answers[ans].answer[lang] + "(Non)";
      	  											}
      	  									}
      	  							}
      	  						if (forceMustSeeExa || aMust == "Y" || ctrE > 0)
      	  						{
      	  							aLine = '<td>'+extIDexa+'</td><td>'+aQues+'</td>';
      	  							aLine = aLine + '<td><b>'+chk+'</b></td><td id="m'+extIDexa+'" class="warning">'+qEXA[extIDexa].qEdits+'</td><td><h4><div class="ui axxium tiny button" onclick="addNotes2(\''+extIDexa+'\');">Commentaire</div></h4></td>';
      	  							div.innerHTML = aLine;
    	  							document.getElementById("eachExa").appendChild(div);
      	  						}
      	  					}
      	  				else if (qEXA[extIDexa].qType.substring(0,1) == "F")
      	  					{
      	  						ctrF = 0;
      	  						chk = "";
      	  						comma = "N";
    	  						div = document.createElement("tr");
      	  						for (ans in allEXAMs[extIDexa].answers)
      	  							{
      	  								if (comma == "Y") chk = chk + "<br>";
      	  								comma = "Y";
      	  								chk = chk + qEXA[extIDexa].answers[ans].fValue;
      	  								ctrF = ctrF + qEXA[extIDexa].answers[ans].fValue.length;
      	  							}
      	  						if (forceMustSeeExa || aMust == "Y" || ctrF > 0)
      	  						{
      	  							aLine = '<td>'+extIDexa+'</td><td>'+allEXAMs[extIDexa].question[lang]+'</td>';
      	  							aLine = aLine + '<td><b>'+chk+'</b></td><td id="m'+extIDexa+'" class="warning">'+qEXA[extIDexa].qEdits+'</td><td><h4><div class="ui axxium tiny button" onclick="addNotes2(\''+extIDexa+'\');">Commentaire</div></h4></td>';
      	  							div.innerHTML = aLine;
    	  							document.getElementById("eachExa").appendChild(div);
    	  						}
      	  					}
      	  				else if (qEXA[extIDexa].qType == "TX")
      	  					{
      	  						ctrT = qEXA[extIDexa].answers[0].text.length;
      	  						if (forceMustSeeExa || aMust == "Y" || ctrT > 0)
      	  						{
    	  							div = document.createElement("tr");
      	  							aLine = '<td>'+extIDexa+'</td><td>'+allEXAMs[extIDexa].question[lang]+'</td>';
      	  							aLine = aLine + '<td><b>'+qEXA[extIDexa].answers[0].text+'</b></td><td id="m'+extIDexa+'" class="warning">'+qEXA[extIDexa].qEdits+'</td><td><h4><div class="ui axxium tiny button" onclick="addNotes2(\''+extIDexa+'\');">Commentaire</div></h4></td>';
      	  							div.innerHTML = aLine;
    	  							document.getElementById("eachExa").appendChild(div);
      	  						}
      	  					}
      	  				else
      	  					{
    	  						div = document.createElement("tr");
      	  						aLine = '<td>'+extIDexa+'</td><td>'+allEXAMs[extIDexa].question[lang]+'</td>';
      	  						aLine = aLine + '<td></td><td id="m'+extIDexa+'" class="warning">'+qEXA[extIDexa].qEdits+'</td><td><h4><div class="ui axxium tiny button" onclick="addNotes2(\''+extIDexa+'\');">Commentaire</div></h4></td>';
      	  						div.innerHTML = aLine;
    	  						document.getElementById("eachExa").appendChild(div);
      	  					}
  }

  function loadQEXA(aName)
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
      	allEXAMs = JSON.parse(xmlhttp2.responseText);
      }
  }

  //alert("Get the Questionnaire!");
  xmlhttp2.open("GET","allScriptsv1.py?tx=getFile&pKey=1&prot=1&extID="+aName+"&lang="+lang,true);
  xmlhttp2.send();

  }

  function loadEXAMS(aPat, relBan)
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
      qEXAMS = JSON.parse(xmlhttp2.responseText);
      curExa = 0;
      	if (qEXAMS.files.length > 0)
      	{
      		if (relBan) displaySub("examens");
      		qFileExa = qEXAMS.files[curExa].file;
      		firstEXA = qEXAMS.files[curExa].prot;
  		loadEXA();
      	}
      	else
      	{
      		div = document.createElement("tr");
		aLine = '<td colspan="4"><h3>Aucun examen dentaire</h3></td>';
      	  	div.innerHTML = aLine;
    	  	document.getElementById("eachExa").appendChild(div);
      	}
      }
  }

  //alert("Get the Files!");
  xmlhttp2.open("GET","allScriptsv1.py?tx=getEXAv1&patID="+aPat,true);
  xmlhttp2.send();

  }

  function backEXA()
  {
      if (curExa < qEXAMS.files.length - 1)
      {
      	curExa = curExa + 1;
      	qFileExa = qEXAMS.files[curExa].file;
      	//firstEXA = qEXAMS.files[curExa].prot;
  	loadEXA();
      }
      displaySub("examens");
  }


  function forEXA()
  {
      if (curExa > 0)
      {
      	curExa = curExa - 1;
      	qFileExa = qEXAMS.files[curExa].file;
      	//firstEXA = qEXAMS.files[curExa].prot;
  	loadEXA();
      }
      displaySub("examens");
  }
  
  function loadNewEXA()
  {
        var qKeys = Object.keys(qEXA);
        document.getElementById("eachExa").innerHTML = "";
  		//alert(qKeys);
  		aSec = "";
  		for (key in qKeys)
  			{
				if (qKeys[key] != "qHeader")
					{
						extIDexa = qKeys[key];
						if (allEXAMs[extIDexa].header[lang] != aSec && allEXAMs[extIDexa].header[lang] != "Bienvenue!")
							{
								div = document.createElement("tr");
								aLine = '<td></td><td><h3>'+allEXAMs[extIDexa].header[lang]+'</h3></td><td></td><td></td>';
      	  						div.innerHTML = aLine;
    	  						document.getElementById("eachExa").appendChild(div);
								aSec = allEXAMs[extIDexa].header[lang];
							}

      					if (allEXAMs[extIDexa].mustSee == "Y")
      						{
      							//alert("Must see! "+extIDexa);
      							displayNewEXA("Y");
      						}
      					else if (allEXAMs[extIDexa].preCond.length > 0)
      						{
      							if (qEXA[allEXAMs[extIDexa].preCond[0].condextIDexa].answers[allEXAMs[extIDexa].preCond[0].condAnswer].fChecked != allEXAMs[extIDexa].preCond[0].condTest)
      								{
      									//alert("We have a skipper!");
      								}
      							else
      								{
      									//alert("We have a winner!");
      									displayNewEXA("N");
      								}
      						}
      					else if (allEXAMs[extIDexa].qType == "IN" || allEXAMs[extIDexa].qType == "CO" || allEXAMs[extIDexa].qType == "ZZ")
      						{
      							//alert("We have a skipper!");
      						}
      					else
      						{
      							displayNewEXA("N");
      						}
					}
			}
	var d = new Date();
	qFileExa = "E_" + curPatient + "_" + d.getTime();

  }

  function displayNewEXA(aMust)
  {
      	  				if (qEXA[extIDexa].qType.substring(0,1) == "M" || qEXA[extIDexa].qType.substring(0,1) == "N")
      	  					{
      	  						ctrM = 0;
      	  						chk = "";
      	  						comma = "N";
    	  						div = document.createElement("tr");
      	  						for (ans in allEXAMs[extIDexa].answers)
      	  							{
      	  								if (qEXA[extIDexa].answers[ans].fChecked == "Y")
      	  									{
      	  										ctrM = ctrM + 1;
      	  										if (comma == "Y") chk = chk + ", ";
      	  										comma = "Y";
      	  										chk = chk + allEXAMs[extIDexa].answers[ans].answer[lang];
      	  										//if (qEXA[extIDexa].answers[ans].fExtra.length > 0) chk = chk + " (" + qEXA[extIDexa].answers[ans].fExtra + ")"
      	  									}
      	  							}
      	  						if (aMust == "Y" || ctrM > 0)
      	  						{
      	  							aLine = '<td>'+extIDexa+'</td><td>'+allEXAMs[extIDexa].question[lang]+'</td>';
      	  							aLine = aLine + '<td><b>'+chk+'</b></td><td class="warning">'+qEXA[extIDexa].qEdits+'<div id="r'+extIDexa+'" class="ui axxium large right floated button" onclick="addRep2(\''+extIDexa+'\');">Réponse</div></td>';
      	  							div.innerHTML = aLine;
    	  							document.getElementById("eachExa").appendChild(div);
      	  						}
      	  					}
      	  				else if (qEXA[extIDexa].qType.substring(0,1) == "E")
      	  					{
      	  						ctrE = 0;
      	  						chk = "";
      	  						comma = "N";
      	  						comma2 = "N";
    	  						div = document.createElement("tr");
    	  						aQues = allEXAMs[extIDexa].question[lang];
      	  						//aLine = '<td>'+extIDexa+'</td><td>'+allEXAMs[extIDexa].question[lang]+'</td>';
      	  						for (ans in allEXAMs[extIDexa].answers)
      	  							{
      	  								if (aMust == "Y")
      	  									{
      	  										if (comma2 == "Y") aQues = aQues + ", ";
      	  										comma2 = "Y";
      	  										aQues = aQues + allEXAMs[extIDexa].answers[ans].answer[lang];
      	  									}
      	  								if (qEXA[extIDexa].answers[ans].fChecked == "Y")
      	  									{
      	  										if (comma == "Y") chk = chk + ", ";
      	  										comma = "Y";
      	  										chk = chk + "Oui";
      	  										ctrE = ctrE + 1;
      	  									}
      	  								else
      	  									{
      	  										if (aMust == "Y")
      	  											{
      	  												if (comma == "Y") chk = chk + ", ";
      	  												comma = "Y";
      	  												chk = chk + "Non";
      	  											}
      	  									}
      	  							}
      	  						if (aMust == "Y" || ctrE > 0)
      	  						{
      	  							aLine = '<td>'+extIDexa+'</td><td>'+aQues+'</td>';
      	  							aLine = aLine + '<td><b>'+chk+'</b></td><td class="warning">'+qEXA[extIDexa].qEdits+'<div id="r'+extIDexa+'" class="ui axxium large right floated button" onclick="addRep2(\''+extIDexa+'\');">Réponse</div></td>';
      	  							div.innerHTML = aLine;
    	  							document.getElementById("eachExa").appendChild(div);
      	  						}
      	  					}
      	  				else if (qEXA[extIDexa].qType.substring(0,1) == "F")
      	  					{
      	  						ctrF = 0;
      	  						chk = "";
      	  						comma = "N";
    	  						div = document.createElement("tr");
      	  						for (ans in allEXAMs[extIDexa].answers)
      	  							{
      	  								if (comma == "Y") chk = chk + ", ";
      	  								comma = "Y";
      	  								chk = chk + qEXA[extIDexa].answers[ans].fValue;
      	  								ctrF = ctrF + qEXA[extIDexa].answers[ans].fValue.length;
      	  							}
      	  						if (aMust == "Y" || ctrF > 0)
      	  						{
      	  							aLine = '<td>'+extIDexa+'</td><td>'+allEXAMs[extIDexa].question[lang]+'</td>';
      	  							aLine = aLine + '<td><b>'+chk+'</b></td><td class="warning">'+qEXA[extIDexa].qEdits+'<div id="r'+extIDexa+'" class="ui axxium large right floated button" onclick="addRep2(\''+extIDexa+'\');">Réponse</div></td>';
      	  							div.innerHTML = aLine;
    	  							document.getElementById("eachExa").appendChild(div);
    	  						}
      	  					}
      	  				else if (qEXA[extIDexa].qType == "TX")
      	  					{
      	  						ctrT = qEXA[extIDexa].answers[0].text.length;
      	  						if (aMust == "Y" || ctrT > 0)
      	  						{
    	  							div = document.createElement("tr");
      	  							aLine = '<td>'+extIDexa+'</td><td>'+allEXAMs[extIDexa].question[lang]+'</td>';
      	  							aLine = aLine + '<td><b>'+qEXA[extIDexa].answers[0].text+'</b></td><td class="warning">'+qEXA[extIDexa].qEdits+'<div id="r'+extIDexa+'" class="ui axxium large right floated button" onclick="addRep2(\''+extIDexa+'\');">Réponse</div></td>';
      	  							div.innerHTML = aLine;
    	  							document.getElementById("eachExa").appendChild(div);
      	  						}
      	  					}
      	  				else
      	  					{
    	  						div = document.createElement("tr");
      	  						aLine = '<td>'+extIDexa+'</td><td>'+allEXAMs[extIDexa].question[lang]+'</td>';
      	  						aLine = aLine + '<td></td><td class="warning">'+qEXA[extIDexa].qEdits+'<div id="r'+extIDexa+'" class="ui axxium large right floated button" onclick="addRep2(\''+extIDexa+'\');">Réponse</div></td>';
      	  						div.innerHTML = aLine;
    	  						document.getElementById("eachExa").appendChild(div);
      	  					}
  }
