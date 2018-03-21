  function twoDigits(num) {
    return (num < 10 ? "0" : "") + num;
  }
  
  function exitQuest()
  {
 	var d = new Date();
 	fName = curPrefix + "_" + pKey + "_" + d.getTime();
  	uploadJSONP(fName);
  	document.getElementById("qChoice").innerHTML = '<h3 id="question" class="ui header"></h3>';
  	finalizeQ();
  }

  function sendToSuper(qCl, qNu, qFi, qLa) {
     var mData = { "qCl" : qCl, "qNu" : qNu, "qFi" : qFi, "qLa" : qLa };
     //alert(mData);
     $.ajax({
     	url: "sendToSuper.py",
        type: "post",
        datatype:"json",
        data: mData,
        success: function(response){
        	alert(response.message);
        }
     });
  }
  
  function uploadJSONP(aName)
  {
        $.post("allScriptsv1.py", {tx: "uploadJSONP", sub: curLoad, name: aName, json: JSON.stringify(outputJSONP)}, function(result){
            //alert("Le questionnaire " + curLoad + " a été enregistré.");
  	    if (curLoad == "antecedents") loadANT(curPatient, true);
  	    if (curLoad == "examens") loadEXAMS(curPatient, true);
        });
  }

  function OLDuploadJSONP(aName)
  {
  var xhr = new XMLHttpRequest();
  var body = "name=" + aName + "&sub=" + curLoad + "&json=" + encodeURIComponent(JSON.stringify(outputJSONP));
  xhr.open("POST", "uploadJSONP.py", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.setRequestHeader("Content-Length", body.length);
  xhr.setRequestHeader("Connection", "close");
  xhr.send(body);
  if (curLoad == "antecedents") setTimeout(loadANT(curPatient, true), 500);
  if (curLoad == "examens") setTimeout(loadEXAMS(curPatient, true), 500);
  }

  function getnextNumberP()
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
      	nextNumberP = eval(xmlhttp2.responseText);
      }
    }
  xmlhttp2.open("GET","allScriptsv1.py?tx=getnextNumber",true);
  xmlhttp2.send();
  }

  function checkWeight()
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
      	wJSON = JSON.parse(xmlhttp2.responseText);
      	weightVal = wJSON.weight;
      	document.getElementById("weightVal").innerHTML = '<font size=120>' + weightVal + '</font>';
      }
    }
  xmlhttp2.open("GET","andWeight.json",true);
  xmlhttp2.send();
  }

  function checkBP()
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
      	wJSON = JSON.parse(xmlhttp2.responseText);
      	sysVal = wJSON.sys;
      	diaVal = wJSON.dia;
      	document.getElementById("sysVal").innerHTML = '<font size=120>' + sysVal + '</font>';
      	document.getElementById("diaVal").innerHTML = '<font size=120>' + diaVal + '</font>';
      }
    }
  xmlhttp2.open("GET","andPressure.json",true);
  xmlhttp2.send();
  }

  function checkSpO2()
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
      	wJSON = JSON.parse(xmlhttp2.responseText);
      	spo2Val = wJSON.SpO2;
      	bpmVal = wJSON.pulse;
      	document.getElementById("spo2Val").innerHTML = '<font size=120>' + spo2Val + '</font>';
      	document.getElementById("bpmVal").innerHTML = '<font size=120>' + bpmVal + '</font>';
      }
    }
  xmlhttp2.open("GET","choicemmed.json",true);
  xmlhttp2.send();
  }

  function checkGluco()
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
      	wJSON = JSON.parse(xmlhttp2.responseText);
      	bglVal = wJSON.bgl;
      	document.getElementById("bglVal").innerHTML = '<font size=120>' + bglVal + '</font>';
      }
    }
  xmlhttp2.open("GET","myGlucoHealth.json",true);
  xmlhttp2.send();
  }

  function switchTo(newLang)
  {
	  lang = newLang;
	  adaptLanguage();
	  fillHeader();
	  //document.getElementById("qChoice").innerHTML = '<h2 id="question" class="ui header"></h2>';
	  $("#tempDiv").remove();
	  getNextQuestionP(qExtIDP);
  }

  function otherLanguages()
  {
	  if (lang == "fr") { return '&nbsp;&nbsp;<div class="ui axxium horizontal large label" onclick="switchTo(\'en\');">English</div>'; }
	  if (lang == "en") { return '&nbsp;&nbsp;<div class="ui axxium horizontal large label" onclick="switchTo(\'fr\');">Français</div>'; }
  }

  function fillHeader()
  {
	  topLogo = allJSONsP["tinsels"].topLogo;
	  topTitle = allJSONsP["tinsels"].topTitle[lang];
	  topSubTitle = 'Centre Dentaire Lasenfield /  ' + allJSONsP["tinsels"].protocolName;
	  document.getElementById("topHeader").innerHTML = topSubTitle;
	  //patientName = allJSONsP["tinsels"].patientFirst + ' ' + allJSONsP["tinsels"].patientLast;
	  //document.getElementById("topHeader").innerHTML = '<img id="topLogo" class="ui small left floated image" src="' + topLogo + '"><div id="topTitle" class="content">' + topTitle + '<div id="topSubTitle" class="sub header">' + topSubTitle + '</div></div>';
	  //document.getElementById("patientName").innerHTML = "";
  }

  function adaptLanguage()
  {
	  if (lang == "fr")
	  	{
			//document.getElementById("menuItem1").innerHTML = '<i class="pause icon"></i>Suspendre ce questionnaire';
			//document.getElementById("menuItem2").innerHTML = '<i class="trash icon"></i>Abandonner ce questionnaire';
			document.getElementById("buttonTxtP").innerHTML = "Suivant";
			document.getElementById("acceptTxtP").innerHTML = "Accepter";
		}
	  if (lang == "en")
	  	{
			//document.getElementById("menuItem1").innerHTML = '<i class="pause icon"></i>Suspend this questionnaire';
			//document.getElementById("menuItem2").innerHTML = '<i class="trash icon"></i>Abandon this questionnaire';
			document.getElementById("buttonTxtP").innerHTML = "Next";
			document.getElementById("acceptTxtP").innerHTML = "Accept";
		}
  }

  function selectingPat(aNAM, aName)
  {
	  //alert("we have a hit!");
	  //document.getElementById("pat0").setAttribute("class", "ui icon");
	  //document.getElementById("pat1").setAttribute("class", "ui icon");
	  //document.getElementById(aNAM).setAttribute("class", "ui checkmark icon");

	  //alert(aNAM);
	  idVal = aNAM;
	  outputJSONP["qHeader"]["pKey"] = aNAM;
  	  document.getElementById("idVal").innerHTML = "<font size=120>"+keyNumP+"</font>";
  	  document.getElementById("patientName").innerHTML = aName;

  	  $('.modalNumPat.modal').modal('hide');
  }

  function selecting(aNum, aClick, anInvite)
  {
    //alert(aNum+"-"+aClick+"-"+anInvite);
    if (qTypeP.substring(0,1) == "M" || qTypeP.substring(0,1) == "W" || qTypeP.substring(0,1) == "E")
    	{
    		selectedAnswerP = aNum;
    		for (var idx=0;idx<jResultsP.length;idx++)
    			{
    				jResultsP[idx] = false;
    				document.getElementById("a"+idx).setAttribute("class", "ui icon");
    				outputJSONP[qExtIDP].answers[idx].fChecked = "N";
    			}
    		outputJSONP[qExtIDP].answers[aNum].fChecked = "Y";
    	}
    if (qTypeP.substring(0,1) == "N" && jResultsP[aNum])
    	{
    		jResultsP[aNum] = false;
			document.getElementById("a"+aNum).setAttribute("class", "ui icon");
			outputJSONP[qExtIDP].answers[aNum].fChecked = "N";
    	}
    else
    	{
    		jResultsP[aNum] = true;
			document.getElementById("a"+aNum).setAttribute("class", "ui checkmark icon");
			outputJSONP[qExtIDP].answers[aNum].fChecked = "Y";
    	}
    if (aClick == "TX" || aClick == "GD")
    	{
    		document.getElementById("clickInvite"+aNum).style.visibility="visible";
    		document.getElementById("clickText"+aNum).style.visibility="visible";
    	}
    if (aClick == "GN")
    	{
  			whichValP = "num";
  			whichAnsP = aNum;
  			keyNumP = "";
  			document.getElementById("keyDisplayP").innerHTML = "<font size=120></font>";
  			document.getElementById("unitsP").innerHTML = anInvite;
  			$('.modalNumP.modal').modal('show');
    	}
    if (aClick == "GD")
    	{
  			whichValP = "gdNum";
  			whichAnsP = aNum;
  			keyNumP = "";
  			document.getElementById("keyDisplayP").innerHTML = "<font size=120></font>";
  			document.getElementById("unitsP").innerHTML = anInvite;
  			$('.modalNumP.modal').modal('show');
    	}
	//alert(jResultsP);
  }

  function toggling(aValue, aNum, aClick, anInvite)
  {
    //alert(aValue+aNum+"-"+aClick+"-"+anInvite);
    jResultsP[aNum] = true;
    toggleCount = toggleCount + 1;
    if (aValue == "yes")
    	{
			document.getElementById("yes"+aNum).setAttribute("class", "ui checkmark icon");
			document.getElementById("no"+aNum).setAttribute("class", "ui icon");
			outputJSONP[qExtIDP].answers[aNum].fChecked = "Y";
    			if (aClick == "TX" || aClick == "GD")
    				{
    					document.getElementById("clickInvite"+aNum).style.visibility="visible";
    					document.getElementById("clickText"+aNum).style.visibility="visible";
    				}
    	}
    else
    	{
    		jResultsP[aNum] = true;
			document.getElementById("no"+aNum).setAttribute("class", "ui checkmark icon");
			document.getElementById("yes"+aNum).setAttribute("class", "ui icon");
			outputJSONP[qExtIDP].answers[aNum].fChecked = "N";
    	}
	//alert(jResultsP);
  }

  function getNextQuestionP(anExtID)
  {
      QJSONP = allJSONsP[anExtID];
      qExtIDP = QJSONP.extID;
      //outputJSONP[qExtIDP] = [ ];
      qTypeP = QJSONP.qType;
      qNextP = QJSONP.nextStep;

      if (QJSONP.preCond.length > 0)
      	{
      		if (outputJSONP[QJSONP.preCond[0].condExtID].answers[QJSONP.preCond[0].condAnswer].fChecked != QJSONP.preCond[0].condTest)
      			{
      				//alert("We have a skipper!");
      				getNextQuestionP(qNextP);
      			}
      		else
      			{
      				//alert("We have a winner!");
      				quesCTR = quesCTR + 1;
      				setupDisplayP();
      			}
      	}
      else
      	{
      		quesCTR = quesCTR + 1;
      		setupDisplayP();
      	}
  }

  function finalizeQ()
  {
  	$('.modalAnt.modal').modal('hide');
  	if (curLoad == "examens")
  	{
  		getSign(1,'EXA');
  	}
  	if (curLoad == "antecedents")
  	{
  		getSign(0,'ANT');
  	}
  }

  function setupDisplayP()
  {
  		//alert("Set up display for type:"+qTypeP);
  		//var strQ = "";
  		//if (QJSONP.header[lang].length > 0)
  		//	{
  		//		strQ = QJSONP.header[lang] + "<br><br>";
  		//	}
        //document.getElementById("antHeader").innerHTML=QJSONP.header[lang];
        document.getElementById("antHeader").innerHTML=QJSONP.header[lang]+'&nbsp;&nbsp;&nbsp;<div id="buttonExit" class="ui axxium tiny button" onclick="exitQuest();">Quitter</div>';
  	if (quesCTR > 0)
  	{
  		strQ = quesCTR + ". "  + QJSONP.question[lang] + "<br><br>";
  	}
  	else
  	{
  		strQ = QJSONP.question[lang] + "<br><br>";
  	}
        document.getElementById("question").innerHTML=strQ;
        var div = document.createElement("div");
        div.setAttribute("id", "tempDiv");
        document.getElementById("qChoice").appendChild(div);
        document.getElementById("errMsg").style.visibility="hidden";
        if (qTypeP == "ZZ")
        	{
        	  	//document.getElementById("nextButtonP").style.visibility="hidden";
        	  	document.getElementById("buttonTxtP").setAttribute("onclick", "finalizeQ();");
 			  var d = new Date();
 			  //var s = d.getFullYear() + '/' + twoDigits(d.getMonth()) + '/' + twoDigits(d.getDate());
 			  fName = curPrefix + "_" + pKey + "_" + d.getTime();
 			  //alert(totScoreP);
 			  outputJSONP["qHeader"]["qScore"] = totScoreP;
        	  if (firstJSON == "PATv1" || firstJSON == "PATv2" || firstJSON == "LEBv1")
        	  	{
        	  		uploadJSONv1(outputJSONP["qHeader"]["qClient"], fName);
					setTimeout(function(){ window.location.reload(); }, 5000);
				} else {
        	  		uploadJSONP(fName);
				}
        	}
        if (qTypeP == "IN")
        	{
        	  //document.getElementById("nextButtonP").style.visibility="hidden";
        	}
        if (qTypeP.substring(0,1) == "F")
        	{
				//alert("Dans F");
        		var ctr = 0;
        		nStepsP = [];
        		jResultsP = [];
        		for (ans in QJSONP.answers)
        			{
        				div2 = document.createElement("div");
        	  			div2.setAttribute("id", "fieldLabel"+ctr);
  						div2.setAttribute("class", "ui header");
  						div2.innerHTML = QJSONP.answers[ans].answer[lang]+"&nbsp;&nbsp;&nbsp;";

        	  			div = document.createElement("div");
        	  			div.setAttribute("id", "fieldAnswer"+ctr);
        	  			div.setAttribute("class", "ui mini input");
        	  			div.innerHTML = '<input type="text" placeholder="Texte...">';
      					div2.appendChild(div);

      					div = document.createElement("div");
  						div.setAttribute("class", "ui divider");
      					div2.appendChild(div);

      					document.getElementById("tempDiv").appendChild(div2);
      					nStepsP.push(QJSONP.answers[ans].next);
      					ctr++;
      			}
      	}
      if (qTypeP == "G7")
      	{
      	  div = document.createElement("div");
      	  div.setAttribute("id", "gridSeven");
      	  div.setAttribute("class", "ui one column grid");
      	  if (lang == "fr")
      	  	{
				div.innerHTML = '<div class="row"><div class="column"><table class="ui seven column celled table segment"><thead><th></th><th>Déjeuner</th><th></th><th>Diner</th><th></th><th>Souper</th><th></th></thead><tbody><tr><td></td><td>A jeun</td><td>Après</td><td>A jeun</td><td>Après</td><td>A jeun</td><td>Après</td></tr><tr><td>Dimanche</td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td></tr><tr><td>Lundi</td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td></tr><tr><td>Mardi</td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td></tr><tr><td>Mercredi</td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td></tr><tr><td>Jeudi</td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td></tr><tr><td>Vendredi</td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td></tr><tr><td>Samedi</td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td></tr></tbody></table></div></div>';
			}
		  if (lang == "en")
		  	{
				div.innerHTML = '<div class="row"><div class="column"><table class="ui seven column celled table segment"><thead><th></th><th>Breakfast</th><th></th><th>Lunch</th><th></th><th>Supper</th><th></th></thead><tbody><tr><td></td><td>Fasting</td><td>After</td><td>Fasting</td><td>After</td><td>Fasting</td><td>After</td></tr><tr><td>Dimanche</td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td></tr><tr><td>Lundi</td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td></tr><tr><td>Mardi</td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td></tr><tr><td>Mercredi</td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td></tr><tr><td>Jeudi</td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td></tr><tr><td>Vendredi</td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td></tr><tr><td>Samedi</td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td><td><i class="edit icon"></i></td></tr></tbody></table></div></div>';
			}
      	  document.getElementById("tempDiv").appendChild(div);
    	  //alert("grid "+document.getElementById("qChoice").innerHTML);

    	  var gluVal = [];
    	  $('table').on('click','tbody tr', function (evt) {
		      var $row=$(evt.target).closest('tr'), msg;
		      var $cell=$(evt.target).closest('td'), msg;
		      //alert($row.index() * 7 + $cell.index());
		      whichTDP = $row.index() * 7 + $cell.index();
		      whichValP = "glu";
		      keyNumP = "";
		      document.getElementById("keyDisplayP").innerHTML = "<font size=120></font>";
  			  document.getElementById("unitsP").innerHTML = "<font size=40>mmol/L</font>";
		      $('.modalNumP.modal').modal('show');
		  });

      	}
        if (qTypeP == "CO")
        	{
        		div2 = document.createElement("div");
        	  	div2.setAttribute("id", "textLabel"+ctr);
  				div2.setAttribute("class", "ui header");
  				theName = outputJSONP["qHeader"]["qFirst"] + " " + outputJSONP["qHeader"]["qLast"];
  				if (lang == "fr")
  					{
						div2.innerHTML = "Je, soussigné, <div id='textAnswer0' class='ui medium input'><input type='text' value='"+theName+"'></div>, déclare que les réponses que j’ai données aux questions contenues dans ce questionnaire médical sont exactes et complètes.<br><br>En outre, je comprends que mon dentiste rédigera un rapport contenant ses conclusions découlant de mes réponses, j’autorise mon dentiste à transmettre son rapport ainsi que tous les renseignements sur mon état de santé physique et psychologique au demandeur et je comprends que ce rapport appartiendra à cette dernière et que toute requête de copie devra lui être adressée.";
					}
				if (lang == "en")
					{
						div2.innerHTML = "I, the undersigned, <div id='textAnswer0' class='ui wide input'><input type='text' value='"+theName+"'> </ div>, declare that the answers provided in this medical questionnaire are accurate and complete. <br>In addition, I understand that my dentist will, from the answers given in the present questionnaire, prepare a report containing its conclusions.  I authorize my dentist to transmit its report and all information on my state of physical and psychological health to the applicant and I understand that the report is theirs and that all requests for copies should be addressed to Lizotte Medico-Experts.";
					}
  				document.getElementById("tempDiv").appendChild(div2);
      			if (lang == "fr") { document.getElementById("buttonTxtP").innerHTML = "Accepter" }
      			if (lang == "en") { document.getElementById("buttonTxtP").innerHTML = "Accept" }
        	}
        if (qTypeP == "XP")
        	{
			  div = document.createElement("div");
        	  div.setAttribute("id", "banner-slide");
        	  document.getElementById("tempDiv").appendChild(div);
        	  div = document.createElement("ul");
        	  div.setAttribute("id", "slider-list");
        	  div.setAttribute("class", "bjqs");
        	  document.getElementById("banner-slide").appendChild(div);
        	  for (med in QJSONP.photos)
        			{
      	  			div = document.createElement("li");
      	  			div.innerHTML = '<img src="'+QJSONP.photos[med].photo+'" title="'+QJSONP.photos[med].caption[lang]+'">';
      	  			document.getElementById("slider-list").appendChild(div);
      	  		}
            $('#banner-slide').bjqs({
              animtype      : 'slide',
              height        : 320,
              width         : 620,
              responsive    : true,
              randomstart   : false
            });
        	}
        if (qTypeP == "XV")
        	{
        	  for (med in QJSONP.videos)
        			{
      	  			div = document.createElement("li");
      	  			div.innerHTML = '<iframe width="560" height="315" src="'+QJSONP.videos[med].video+'" frameborder="0" allowfullscreen></iframe>';
      	  			document.getElementById("tempDiv").appendChild(div);
      	  		}
        	}
        if (qTypeP == "XL")
        	{
        	  div = document.createElement("div");
        	  div.setAttribute("id", "mainList");
        	  div.setAttribute("class", "ui divided list");
        	  document.getElementById("tempDiv").appendChild(div);
        	  for (med in QJSONP.links)
        			{
        	  			div = document.createElement("div");
        	  			div.setAttribute("class", "item");
        	  			document.getElementById("mainList").appendChild(div);
        	  			var div2 = document.createElement("div");
        	  			div2.setAttribute("class", "right floated tiny axxium ui button");
  					div2.setAttribute("onclick", "window.open('"+QJSONP.links[med].link[lang]+"', '_blank')");
        	  			div2.innerHTML = 'Visiter ce site';
        	  			div.appendChild(div2);
        	  			var div3 = document.createElement("h2");
        	  			div3.innerHTML = QJSONP.links[med].caption[lang];
        	  			div.appendChild(div3);
      	  		}
        	}
        if (qTypeP == "TX")
        	{
        	  div = document.createElement("div");
        	  div.setAttribute("id", "txtAnswerP");
        	  div.setAttribute("class", "ui fluid mini input");
        	  if (QJSONP.invite[lang].length > 0)
        	  	{
        	  		div.innerHTML = '<input type="text" placeholder="'+QJSONP.invite[lang]+'">';
        	  	}
        	  else
        	  	{
        	  		div.innerHTML = '<input type="text" placeholder="Texte...">';
        	  	}
        	  document.getElementById("tempDiv").appendChild(div);
        	}
        if (qTypeP == "BP")
        	{
        	  div = document.createElement("div");
        	  div.setAttribute("id", "sysVal");
        	  div.setAttribute("class", "ui axxium tiny button");
        	  div.setAttribute("onclick", "getSys();");
        	  div.innerHTML = '<font size=120>---</font>';
        	  document.getElementById("tempDiv").appendChild(div);
        	  div2 = document.createElement("div");
        	  div2.setAttribute("class", "ui small header");
        	  div2.innerHTML = 'SYS mmHG / ';
        	  document.getElementById("tempDiv").appendChild(div2);
        	  div3 = document.createElement("div");
        	  div3.setAttribute("id", "diaVal");
        	  div3.setAttribute("class", "ui axxium tiny button");
        	  div3.setAttribute("onclick", "getDia();");
        	  div3.innerHTML = '<font size=120>--</font>';
        	  document.getElementById("tempDiv").appendChild(div3);
        	  div4 = document.createElement("div");
        	  div4.setAttribute("class", "ui small header");
        	  div4.innerHTML = 'DIA mmHG';
        	  document.getElementById("tempDiv").appendChild(div4);
        	}
        if (qTypeP == "BO")
        	{
			  //alert("Capture SpO2");
        	  div = document.createElement("div");
        	  div.setAttribute("id", "spo2Val");
        	  div.setAttribute("class", "ui axxium tiny button");
        	  div.setAttribute("onclick", "getSPO2();");
        	  div.innerHTML = '<font size=120>--</font>';
        	  document.getElementById("tempDiv").appendChild(div);
        	  div2 = document.createElement("div");
        	  div2.setAttribute("class", "ui small header");
        	  div2.innerHTML = '% SpO2 / ';
        	  document.getElementById("tempDiv").appendChild(div2);
        	  div3 = document.createElement("div");
        	  div3.setAttribute("id", "bpmVal");
        	  div3.setAttribute("class", "ui axxium tiny button");
        	  div3.setAttribute("onclick", "getBPM();");
        	  div3.innerHTML = '<font size=120>--</font>';
        	  document.getElementById("tempDiv").appendChild(div3);
        	  div4 = document.createElement("div");
        	  div4.setAttribute("class", "ui small header");
        	  div4.innerHTML = 'BPM';
        	  document.getElementById("tempDiv").appendChild(div4);
        	}
        if (qTypeP == "BW")
        	{
			  //alert("Capture weight");
        	  div = document.createElement("div");
        	  div.setAttribute("id", "weightVal");
        	  div.setAttribute("class", "ui axxium tiny button");
        	  div.setAttribute("onclick", "getWeight();");
        	  div.innerHTML = '<font size=120>--</font>';
        	  document.getElementById("tempDiv").appendChild(div);
        	  div2 = document.createElement("div");
        	  div2.setAttribute("class", "ui small header");
        	  div2.innerHTML = 'Kg ';
        	  document.getElementById("tempDiv").appendChild(div2);
        	}
        if (qTypeP == "BG")
        	{
			  //alert("Capture blood glucose level");
        	  div = document.createElement("div");
        	  div.setAttribute("id", "bglVal");
        	  div.setAttribute("class", "ui axxium tiny button");
        	  div.setAttribute("onclick", "getBGL();");
        	  div.innerHTML = '<font size=120>-.-</font>';
        	  document.getElementById("tempDiv").appendChild(div);
        	  div2 = document.createElement("div");
        	  div2.setAttribute("class", "ui small header");
        	  div2.innerHTML = 'mmol/L ';
        	  document.getElementById("tempDiv").appendChild(div2);
        	}
        if (qTypeP == "BL")
        	{
			  //alert("Capture residence number");
        	  div = document.createElement("div");
        	  div.setAttribute("id", "idVal");
        	  div.setAttribute("class", "ui axxium tiny button");
        	  div.setAttribute("onclick", "getIDPat();");
        	  div.innerHTML = '<font size=120>---</font>';
        	  document.getElementById("tempDiv").appendChild(div);
        	  div2 = document.createElement("div");
        	  div2.setAttribute("class", "ui small header");
        	  div2.innerHTML = 'ID ';
        	  document.getElementById("tempDiv").appendChild(div2);
        	}
        if (qTypeP == "BN")
        	{
			  //alert("Capture residence number");
        	  div = document.createElement("div");
        	  div.setAttribute("id", "idVal");
        	  div.setAttribute("class", "ui axxium tiny button");
        	  div.setAttribute("onclick", "getID();");
        	  div.innerHTML = '<font size=120>---</font>';
        	  document.getElementById("tempDiv").appendChild(div);
        	  div2 = document.createElement("div");
        	  div2.setAttribute("class", "ui small header");
        	  div2.innerHTML = 'ID ';
        	  document.getElementById("tempDiv").appendChild(div2);
        	}
        if (qTypeP == "UW")
        	{
			  //alert("Capture USB weight");
        	  div = document.createElement("div");
        	  div.setAttribute("id", "weightVal");
        	  div.setAttribute("class", "ui axxium tiny button");
        	  div.setAttribute("onclick", "getWeight();");
        	  div.innerHTML = '<font size=120>--</font>';
        	  document.getElementById("tempDiv").appendChild(div);
        	  div2 = document.createElement("div");
        	  div2.setAttribute("class", "ui small header");
        	  div2.innerHTML = 'Kg ';
        	  document.getElementById("tempDiv").appendChild(div2);

        	  div5 = document.createElement("div");
        	  div5.setAttribute("class", "ui floated right segment");
        	  document.getElementById("tempDiv").appendChild(div5);
        	  div6 = document.createElement("div");
        	  div6.setAttribute("class", "ui axxium tiny button");
        	  div6.setAttribute("onclick", "startWeightScan();");
        	  div6.innerHTML = 'Scan';
        	  document.getElementById("tempDiv").appendChild(div6);
        	}
        if (qTypeP == "UP")
        	{

        	  div5 = document.createElement("div");
        	  div5.setAttribute("class", "ui floated right segment");
        	  document.getElementById("tempDiv").appendChild(div5);

        	  div = document.createElement("div");
        	  div.setAttribute("id", "sysVal");
        	  div.setAttribute("class", "ui axxium tiny button");
        	  div.setAttribute("onclick", "getSys();");
        	  div.innerHTML = '<font size=120>---</font>';
        	  document.getElementById("tempDiv").appendChild(div);

        	  div3 = document.createElement("div");
        	  div3.setAttribute("id", "diaVal");
        	  div3.setAttribute("class", "ui axxium tiny button");
        	  div3.setAttribute("onclick", "getDia();");
        	  div3.innerHTML = '<font size=120>--</font>';
        	  document.getElementById("tempDiv").appendChild(div3);

        	  div2 = document.createElement("div");
        	  div2.setAttribute("class", "ui small header");
        	  div2.innerHTML = 'SYS mmHG / DIA mmHG';
        	  document.getElementById("tempDiv").appendChild(div2);

        	  div6 = document.createElement("div");
        	  div6.setAttribute("class", "ui axxium tiny button");
        	  div6.setAttribute("onclick", "startBPScan();");
        	  div6.innerHTML = 'Scan';
        	  document.getElementById("tempDiv").appendChild(div6);
        	}
        if (qTypeP == "UO")
        	{
			  //alert("Capture Bluetooth SpO2");
        	  div5 = document.createElement("div");
        	  div5.setAttribute("class", "ui floated right segment");
        	  document.getElementById("tempDiv").appendChild(div5);

        	  div = document.createElement("div");
        	  div.setAttribute("id", "spo2Val");
        	  div.setAttribute("class", "ui axxium tiny button");
        	  div.setAttribute("onclick", "getSPO2();");
        	  div.innerHTML = '<font size=120>--</font>';
        	  document.getElementById("tempDiv").appendChild(div);

        	  div3 = document.createElement("div");
        	  div3.setAttribute("id", "bpmVal");
        	  div3.setAttribute("class", "ui axxium tiny button");
        	  div3.setAttribute("onclick", "getBPM();");
        	  div3.innerHTML = '<font size=120>--</font>';
        	  document.getElementById("tempDiv").appendChild(div3);

        	  div2 = document.createElement("div");
        	  div2.setAttribute("class", "ui small header");
        	  div2.innerHTML = '% SpO2 / BPM';
        	  document.getElementById("tempDiv").appendChild(div2);

        	  div6 = document.createElement("div");
        	  div6.setAttribute("class", "ui axxium tiny button");
        	  div6.setAttribute("onclick", "startSpO2Scan();");
        	  div6.innerHTML = 'Scan';
        	  document.getElementById("tempDiv").appendChild(div6);
        	}
        if (qTypeP == "UG")
        	{
			  //alert("Capture USB glucose");
        	  div = document.createElement("div");
        	  div.setAttribute("id", "bglVal");
        	  div.setAttribute("class", "ui axxium tiny button");
        	  div.setAttribute("onclick", "getBGL();");
        	  div.innerHTML = '<font size=120>-.-</font>';
        	  document.getElementById("tempDiv").appendChild(div);
        	  div2 = document.createElement("div");
        	  div2.setAttribute("class", "ui small header");
        	  div2.innerHTML = 'mmol/L ';
        	  document.getElementById("tempDiv").appendChild(div2);

        	  div5 = document.createElement("div");
        	  div5.setAttribute("class", "ui floated right segment");
        	  document.getElementById("tempDiv").appendChild(div5);
        	  div6 = document.createElement("div");
        	  div6.setAttribute("class", "ui axxium tiny button");
        	  div6.setAttribute("onclick", "startGlucoScan();");
        	  div6.innerHTML = 'Scan';
        	  document.getElementById("tempDiv").appendChild(div6);
        	}
        if (qTypeP.substring(0,1) == "E")
        	{
        		var ctr = 0;
        		nStepsP = [];
        		jResultsP = [];
        		toggleCount = 0;
        		//alert("Langue "+lang);
        		for (ans in QJSONP.answers)
        			{
        				div2 = document.createElement("div");
        	  			div2.setAttribute("id", "textLabel"+ctr);
  						div2.setAttribute("class", "ui header");
  						div2.innerHTML = QJSONP.answers[ans].answer[lang];

      					div = document.createElement("div");
  						div.setAttribute("class", "ui axxium tiny right floated button");
  						jResultsP.push(false);
  						//outputJSONP[qExtIDP].answers[ctr].fChecked = "N";
  						div.setAttribute("onclick", 'toggling("no",'+ctr+',"'+QJSONP.answers[ans].click+'","'+QJSONP.answers[ans].invite[lang]+'");');
  						if (lang == "fr") div.innerHTML = '<i id="no'+ctr+'" class="ui icon"></i>Non';
  						if (lang == "en") div.innerHTML = '<i id="no'+ctr+'" class="ui icon"></i>No';
      					div2.appendChild(div);

      					div = document.createElement("div");
  						div.setAttribute("class", "ui axxium tiny right floated button");
  						div.setAttribute("onclick", 'toggling("yes",'+ctr+',"'+QJSONP.answers[ans].click+'","'+QJSONP.answers[ans].invite[lang]+'");');
  						if (lang == "fr") div.innerHTML = '<i id="yes'+ctr+'" class="ui icon"></i>Oui';
  						if (lang == "en") div.innerHTML = '<i id="yes'+ctr+'" class="ui icon"></i>Yes';
      					div2.appendChild(div);

      					div = document.createElement("div");
        	  			div.setAttribute("style", "visibility:hidden");
        	  			div.setAttribute("id", "clickInvite"+ctr);
  					div.setAttribute("class", "ui medium label");
  					div.innerHTML = QJSONP.answers[ans].invite[lang];
      					div2.appendChild(div);

        	  			div = document.createElement("div");
        	  			div.setAttribute("style", "visibility:hidden");
        	  			div.setAttribute("id", "clickText"+ctr);
        	  			div.setAttribute("class", "ui right mini input");
        	  			if (lang == "fr" ) { div.innerHTML = '<input type="text" placeholder="Texte...">' }
        	  			if (lang == "en" ) { div.innerHTML = '<input type="text" placeholder="Text...">' }
      					div2.appendChild(div);

      					div = document.createElement("div");
  					div.setAttribute("class", "ui divider");
      					div2.appendChild(div);

      					document.getElementById("tempDiv").appendChild(div2);
      					nStepsP.push(QJSONP.answers[ans].next);
      					ctr++;
      			}
      	}
        if (qTypeP.substring(0,1) == "Y")
        	{
        		var ctr = 0;
        		nStepsP = [];
        		jResultsP = [];
        		for (ans in QJSONP.answers)
        			{
        				div2 = document.createElement("div");
        	  			div2.setAttribute("id", "textLabel"+ctr);
  						div2.setAttribute("class", "ui header");
  						div2.innerHTML = QJSONP.answers[ans].answer[lang]+"&nbsp;&nbsp;&nbsp;";

        	  			div = document.createElement("div");
        	  			//div.setAttribute("id", "textAnswer"+ctr);
        	  			div.setAttribute("class", "ui mini input");
        	  			if (QJSONP.answers[ans].fType == "TX")
        	  				{
        	  					if (lang == "fr") { div.innerHTML = '<input id="fieldAnswer'+ctr+'" type="text" placeholder="Texte...">' }
        	  					if (lang == "en") { div.innerHTML = '<input id="fieldAnswer'+ctr+'" type="text" placeholder="Text...">' }
							}
        	  			if (QJSONP.answers[ans].fType == "TN")
        	  				{
        	  					if (lang == "fr") { div.innerHTML = '<input id="fieldAnswer'+ctr+'" type="number" placeholder="Chiffres...">' }
        	  					if (lang == "en") { div.innerHTML = '<input id="fieldAnswer'+ctr+'" type="number" placeholder="Number...">' }
							}
        	  			if (QJSONP.answers[ans].fType == "D3")
        	  				{
        	  					if (lang == "fr") { div.innerHTML = '<input id="fieldAnswer'+ctr+'" type="date" placeholder="Date...">' }
        	  					if (lang == "en") { div.innerHTML = '<input id="fieldAnswer'+ctr+'" type="date" placeholder="Date...">' }
							}
        	  			if (QJSONP.answers[ans].fType == "DU")
        	  				{
        	  					div.innerHTML = '<input id="spinIt1" value="1">';
							}
        	  			if (QJSONP.answers[ans].fType == "DY")
        	  				{
        	  					div.innerHTML = '<input id="spinIt2" value="2014">';
							}
      					div2.appendChild(div);

      					div = document.createElement("div");
  						div.setAttribute("class", "ui divider");
      					div2.appendChild(div);

      					document.getElementById("tempDiv").appendChild(div2);
      					nStepsP.push(QJSONP.answers[ans].next);
      					ctr++;
      			}
        	  	//$('#spinIt1').spinner({min: 0, max: 120, step: 1 });
        	  	//$('#spinIt2').spinner({min: 1900, max: 2014, step: 1 });

      	}
        if (qTypeP.substring(0,1) == "M" || qTypeP.substring(0,1) == "N")
        	{
				//alert("Dans M");
        		var ctr = 0;
        		nStepsP = [];
        		jResultsP = [];
        		for (ans in QJSONP.answers)
        			{
      				//alert(ans);
      				div = document.createElement("div");
  					div.setAttribute("class", "ui axxium tiny button");
  					//alert('document.getElementById("a'+ctr+'").setAttribute("class", "ui checkmark icon");');
  					jResultsP.push(false);
  					//outputJSONP[qExtIDP][ctr] = "N";
  					div.setAttribute("onclick", 'selecting('+ctr+',"'+QJSONP.answers[ans].click+'","'+QJSONP.answers[ans].invite[lang]+'");');
  					div.innerHTML = '<i id="a'+ctr+'" class="ui icon"></i>'+QJSONP.answers[ans].answer[lang];
      				document.getElementById("tempDiv").appendChild(div);

      				//Tips not enabled
      				//div = document.createElement("div");
  				//div.setAttribute("class", "ui medium pointing left label");
  				//div.innerHTML = '<i id="t'+ctr+'" class="ui question icon link" title="'+QJSONP.answers[ans].tip[lang]+'"></i>';
      				//document.getElementById("tempDiv").appendChild(div);

      				div = document.createElement("div");
        	  		div.setAttribute("style", "visibility:hidden");
        	  		div.setAttribute("id", "clickInvite"+ctr);
  				div.setAttribute("class", "ui medium label");
  				div.innerHTML = QJSONP.answers[ans].invite[lang];
      				document.getElementById("tempDiv").appendChild(div);

        	  		div = document.createElement("div");
        	  		div.setAttribute("style", "visibility:hidden");
        	  		div.setAttribute("id", "clickText"+ctr);
        	  		div.setAttribute("class", "ui right mini input");
        	  		if (lang == "fr" ) { div.innerHTML = '<input type="text" placeholder="Texte...">' }
        	  		if (lang == "en" ) { div.innerHTML = '<input type="text" placeholder="Text...">' }
      				document.getElementById("tempDiv").appendChild(div);

				div = document.createElement("div");
  				div.setAttribute("class", "ui divider");
      				document.getElementById("tempDiv").appendChild(div);

      				nStepsP.push(QJSONP.answers[ans].next);
      				ctr++;
      			}
      	}
        if (qTypeP == "WE")
        	{
        		var ctr = 0;
        		nStepsP = [];
        		jResultsP = [];

      			divTable = document.createElement("div");
  				divTable.setAttribute("class", "ui two column grid");
      			document.getElementById("tempDiv").appendChild(divTable);
      			divColumn = document.createElement("div");
  				divColumn.setAttribute("class", "column");
      			divTable.appendChild(divColumn);

        		for (ans in QJSONP.answers)
        			{
      				//alert(ans);

      				if (ctr == 4)
      					{
      						divColumn = document.createElement("div");
  							divColumn.setAttribute("class", "column");
      						divTable.appendChild(divColumn);
						}

      				div = document.createElement("div");
  					div.setAttribute("class", "ui axxium tiny button");
  					//alert('document.getElementById("a'+ctr+'").setAttribute("class", "ui checkmark icon");');
  					jResultsP.push(false);
  					//outputJSONP[qExtIDP][ctr] = "N";
  					div.setAttribute("onclick", 'selecting('+ctr+',"'+QJSONP.answers[ans].click+'","'+QJSONP.answers[ans].invite[lang]+'");');
  					div.innerHTML = '<i id="a'+ctr+'" class="ui icon"></i>'+QJSONP.answers[ans].answer[lang];
      				divColumn.appendChild(div);

      				//Tips not enabled
      				//div = document.createElement("div");
  					//div.setAttribute("class", "ui medium pointing left label");
  					//div.innerHTML = '<i id="t'+ctr+'" class="ui question icon link" title="'+QJSONP.answers[ans].tip[lang]+'"></i>';
      				//divColumn.appendChild(div);

      				div = document.createElement("div");
        	  		div.setAttribute("style", "visibility:hidden");
        	  		div.setAttribute("id", "clickInvite"+ctr);
  					div.setAttribute("class", "ui medium label");
  					div.innerHTML = QJSONP.answers[ans].invite[lang];
      				divColumn.appendChild(div);

        	  		div = document.createElement("div");
        	  		div.setAttribute("style", "visibility:hidden");
        	  		div.setAttribute("id", "clickText"+ctr);
        	  		div.setAttribute("class", "ui right mini input");
        	  		div.innerHTML = '<input type="text" placeholder="Texte...">';
      				divColumn.appendChild(div);

      				div = document.createElement("div");
  					div.setAttribute("class", "ui divider");
      				divColumn.appendChild(div);

      				nStepsP.push(QJSONP.answers[ans].next);
      				ctr++;
      			}
      	}
      selectedAnswerP = -1;
  }

  function goPrev()
  {
	  //getNextQuestionP(qNextP);
	  ss = eval(qNextP.substr(1,3)) - 1;
      qNextP = "Q" + ss;
      //alert(qNextP);
      QJSONP = allJSONsP[qNextP];
      qExtIDP = QJSONP.extID;
      qTypeP = QJSONP.qType;
      $("#tempDiv").remove();
      setupDisplayP();
  }

  function goNext2()
  {
	  //getNextQuestionP(qNextP);
	  ss = 1 + eval(qNextP.substr(1,3));
      qNextP = "Q" + ss;
      //alert(qNextP);
      QJSONP = allJSONsP[qNextP];
      qExtIDP = QJSONP.extID;
      qTypeP = QJSONP.qType;
      $("#tempDiv").remove();
      setupDisplayP();
  }

  function goNext()
  {
  	//$("#tempDiv").remove();
  	if (qTypeP.substring(0,1) == "M" || qTypeP.substring(0,1) == "W")
      	{
			//alert(document.getElementById("clickText0").firstChild.value.length);
      		if (selectedAnswerP == -1)
      			{
      				//alert("pas choisi");
      				document.getElementById("errMsg").style.visibility="visible";
      				if (lang == "fr") { document.getElementById("errMsgTxt").innerHTML = "Veuillez choisir une réponse s.v.p." }
      				if (lang == "en") { document.getElementById("errMsgTxt").innerHTML = "Please select an answer" }
      			}
			else
      			{
					txExtra = "";
					if (document.getElementById("a"+selectedAnswerP).parentNode.innerHTML != QJSONP.answers[selectedAnswerP].answer[lang])
						{
								txExtra = document.getElementById("a"+selectedAnswerP).parentNode.innerHTML+", ";
						}
					//outputJSONP[qExtIDP].answers[selectedAnswerP].fExtra = txExtra + document.getElementById("clickText"+selectedAnswerP).firstChild.value;
					outputJSONP[qExtIDP].answers[selectedAnswerP].fExtra = document.getElementById("clickText"+selectedAnswerP).firstChild.value;
      				//DANGER : Hard coded values!!!
      				if (qExtIDP == "Q098" && selectedAnswerP == 0) 
      				{ 
      					lang = "fr"; 
      					document.getElementById("buttonTxtP").innerHTML = "Suivant";
					document.getElementById("acceptTxtP").innerHTML = "Accepter";
      				}
      				if (qExtIDP == "Q098" && selectedAnswerP == 1)
      				{ 
      					lang = "en"; 
      					document.getElementById("buttonTxtP").innerHTML = "Next";
					document.getElementById("acceptTxtP").innerHTML = "Accept";
      				}
      				$("#tempDiv").remove();
      				getNextQuestionP(nStepsP[selectedAnswerP]);
      			}
      	}
    else if (qTypeP.substring(0,1) == "E")
    	{
			//alert("testing E toggles "+toggleCount);
      		if (toggleCount < QJSONP.answers.length)
      			{
      				//alert("pas tous cochés");
      				document.getElementById("errMsg").style.visibility="visible";
      				if (lang == "fr") { document.getElementById("errMsgTxt").innerHTML = "Veuillez répondre à toutes les questions s.v.p." }
      				if (lang == "en") { document.getElementById("errMsgTxt").innerHTML = "Please answer all the questions" }
      			}
			else
      			{
      				for (ans in QJSONP.answers)
      				{
      					outputJSONP[qExtIDP].answers[ans].fExtra = document.getElementById("clickText"+ans).firstChild.value;
      				}
      				$("#tempDiv").remove();
      				getNextQuestionP(qNextP);
      			}
    	}
    else if (qTypeP == "TX")
    	{
			//alert(document.getElementById("txtAnswerP").firstChild.value);
			//outputJSONP[qExtIDP].answers.push({ "text" : document.getElementById("txtAnswerP").firstChild.value });
			outputJSONP[qExtIDP].answers[0].text = document.getElementById("txtAnswerP").firstChild.value;
    			$("#tempDiv").remove();
  			getNextQuestionP(qNextP);
    	}
    else if (qTypeP.substring(0,1) == "F")
    	{
			//alert("Testing fields");
        	var ctr = 0;
			for (ans in QJSONP.answers)
        		{
					var filledCtr = "Y";
					//alert(document.getElementById("fieldAnswer"+ctr).firstChild.value);
        			if (QJSONP.answers[ans].mandatory == "Y" && document.getElementById("fieldAnswer"+ctr).firstChild.value.length < 1)
        	  			{
        	  				filledCtr = "N";
						}
      				ctr++;
      			}
      		if (filledCtr == "N")
      			{
					//alert("Champ-s pas remplis");
      				document.getElementById("errMsg").style.visibility="visible";
      				document.getElementById("errMsgTxt").innerHTML = "Veuillez remplir les champs obligatoires s.v.p.";
				}
			else
    			{
					for (ans in QJSONP.answers)
						{
							if (outputJSONP[qExtIDP].answers[ans].fValue.length > 0)
								{
									outputJSONP[qExtIDP].answers[ans].fValue = outputJSONP[qExtIDP].answers[ans].fValue + " / " + document.getElementById("fieldAnswer"+ans).firstChild.value.replace(/\"/g, "");
								}
							else
								{
									outputJSONP[qExtIDP].answers[ans].fValue = document.getElementById("fieldAnswer"+ans).firstChild.value.replace(/\"/g, "");
								}
						}
    				$("#tempDiv").remove();
  					getNextQuestionP(qNextP);
    			}
    	}
    else if (qTypeP == "G7")
    	{
			outputJSONP[qExtIDP].answers = gluVal;
    		$("#tempDiv").remove();
  			getNextQuestionP(qNextP);
    	}
    else if (qTypeP == "BP")
    	{
			outputJSONP[qExtIDP].answers.push({ "sysVal" : sysVal, "diaVal" : diaVal });
    		$("#tempDiv").remove();
  			getNextQuestionP(qNextP);
    	}
    else if (qTypeP == "BO")
    	{
			outputJSONP[qExtIDP].answers.push({ "spo2Val" : spo2Val, "bpmVal" : bpmVal });
    		$("#tempDiv").remove();
  			getNextQuestionP(qNextP);
    	}
    else if (qTypeP == "BW")
    	{
			outputJSONP[qExtIDP].answers.push({ "weightVal" : weightVal });
    		$("#tempDiv").remove();
  			getNextQuestionP(qNextP);
    	}
    else if (qTypeP == "BG")
    	{
			outputJSONP[qExtIDP].answers.push({ "bglVal" : bglVal });
    		$("#tempDiv").remove();
  			getNextQuestionP(qNextP);
    	}
    else if (qTypeP == "BN")
    	{
			outputJSONP[qExtIDP].answers.push({ "idVal" : idVal });
			outputJSONP["qHeader"]["pKey"] = idVal;
    		$("#tempDiv").remove();
  			getNextQuestionP(qNextP);
    	}
    else if (qTypeP == "UW")
    	{
			outputJSONP[qExtIDP].answers.push({ "weightVal" : weightVal });
			clearInterval(myTimerW);
    		$("#tempDiv").remove();
  			getNextQuestionP(qNextP);
    	}
    else if (qTypeP == "UP")
    	{
			outputJSONP[qExtIDP].answers.push({ "sysVal" : sysVal, "diaVal" : diaVal });
			clearInterval(myTimerW);
    		$("#tempDiv").remove();
  			getNextQuestionP(qNextP);
    	}
    else if (qTypeP == "UO")
    	{
			outputJSONP[qExtIDP].answers.push({ "spo2Val" : spo2Val, "bpmVal" : bpmVal });
			clearInterval(myTimerW);
    		$("#tempDiv").remove();
  			getNextQuestionP(qNextP);
    	}
    else if (qTypeP == "UG")
    	{
			outputJSONP[qExtIDP].answers.push({ "bglVal" : bglVal });
			clearInterval(myTimerW);
    		$("#tempDiv").remove();
  			getNextQuestionP(qNextP);
    	}
    else
    	{
    		$("#tempDiv").remove();
  			getNextQuestionP(qNextP);
    	}
  }

  function keyEntryP(aNum)
  {
  	if (aNum == -1)
      	{
      		keyNumP = "";
      		document.getElementById("keyDisplayP").innerHTML = "<font size=120></font>";
      	}
    else
    	{
    		if (aNum == -2)
    			{
  					keyNumP = keyNumP + ".";
      				document.getElementById("keyDisplayP").innerHTML = "<font size=120>"+keyNumP+"</font>";
    			}
    		else if (aNum == -3)
    			{
  					keyNumP = keyNumP + "A";
      				document.getElementById("keyDisplayP").innerHTML = "<font size=120>"+keyNumP+"</font>";
    			}
    		else if (aNum == -4)
    			{
  					keyNumP = keyNumP + "B";
      				document.getElementById("keyDisplayP").innerHTML = "<font size=120>"+keyNumP+"</font>";
    			}
    		else
    			{
  					keyNumP = keyNumP + aNum;
      				document.getElementById("keyDisplayP").innerHTML = "<font size=120>"+keyNumP+"</font>";
    			}
    	}
  }

  function getSys()
  {
  	clearInterval(myTimerW);
  	whichValP = "sys";
  	keyNumP = "";
  	validateNum = true;
  	document.getElementById("keyDisplayP").innerHTML = "<font size=120></font>";
  	document.getElementById("unitsP").innerHTML = "<font size=40>mmHg</font>";
  	document.getElementById("validationError").innerHTML = "";
  	$('.modalNum.modal').modal('show');
  }

  function getDia()
  {
  	clearInterval(myTimerW);
  	whichValP = "dia";
  	keyNumP = "";
  	validateNum = true;
  	document.getElementById("keyDisplayP").innerHTML = "<font size=120></font>";
  	document.getElementById("unitsP").innerHTML = "<font size=40>mmHg</font>";
  	document.getElementById("validationError").innerHTML = "";
  	$('.modalNum.modal').modal('show');
  }

  function getSPO2()
  {
  	clearInterval(myTimerW);
  	whichValP = "spo2";
  	keyNumP = "";
  	validateNum = true;
  	document.getElementById("keyDisplayP").innerHTML = "<font size=120></font>";
  	document.getElementById("unitsP").innerHTML = "<font size=40>% SpO2</font>";
  	document.getElementById("validationError").innerHTML = "";
  	$('.modalNum.modal').modal('show');
  }

  function getBPM()
  {
  	clearInterval(myTimerW);
  	whichValP = "bpm";
  	keyNumP = "";
  	validateNum = true;
  	document.getElementById("keyDisplayP").innerHTML = "<font size=120></font>";
  	document.getElementById("unitsP").innerHTML = "<font size=40>BPM</font>";
  	document.getElementById("validationError").innerHTML = "";
  	$('.modalNum.modal').modal('show');
  }

  function getWeight()
  {
  	clearInterval(myTimerW);
  	whichValP = "weight";
  	keyNumP = "";
  	validateNum = true;
  	document.getElementById("keyDisplayP").innerHTML = "<font size=120></font>";
  	document.getElementById("unitsP").innerHTML = "<font size=40>Kg</font>";
  	document.getElementById("validationError").innerHTML = "";
  	$('.modalNum.modal').modal('show');
  }

  function getBGL()
  {
  	clearInterval(myTimerW);
  	whichValP = "bgl";
  	keyNumP = "";
  	validateNum = true;
  	document.getElementById("keyDisplayP").innerHTML = "<font size=120></font>";
  	document.getElementById("unitsP").innerHTML = "<font size=40>mmol/L</font>";
  	document.getElementById("validationError").innerHTML = "";
  	$('.modalNum.modal').modal('show');
  }

  function getID()
  {
  	whichValP = "id";
  	keyNumP = "";
  	document.getElementById("keyDisplayP").innerHTML = "<font size=120></font>";
  	document.getElementById("unitsP").innerHTML = "<font size=40>ID</font>";
  	$('.modalNum.modal').modal('show');
  }

  function getIDPat()
  {
  	whichValP = "id";
  	keyNumP = "";
  	document.getElementById("keyDisplayPat").innerHTML = "<font size=120></font>";
  	//document.getElementById("unitsPat").innerHTML = "<font size=120>ID</font>";
  	document.getElementById("namesPat").innerHTML = "";
  	$('.modalNumPat.modal').modal('show');
  }

  function getAbs()
  {
  	whichValP = "abs";
  	keyNumP = "";
  	document.getElementById("keyDisplayG2").innerHTML = "<font size=120></font>";
  	document.getElementById("unitsG2").innerHTML = "jours";
  	document.getElementById("daysG2").setAttribute("class", "ui checkmark icon");
  	document.getElementById("monthsG2").setAttribute("class", "ui icon");
  	document.getElementById("yearsG2").setAttribute("class", "ui icon");
  	document.getElementById("validationError").innerHTML = "";
  	$('.modalG2.modal').modal('show');
  }

  function setUnits(aUnit)
  {

  	document.getElementById("days").setAttribute("class", "ui icon");
  	document.getElementById("months").setAttribute("class", "ui icon");
  	document.getElementById("years").setAttribute("class", "ui icon");
  	document.getElementById("validationError").innerHTML = "";
  	if (aUnit == "days")
  		{
  			document.getElementById("unitsP").innerHTML = "jours";
  			document.getElementById("days").setAttribute("class", "ui checkmark icon");
  		}
  	if (aUnit == "months")
  		{
  			document.getElementById("unitsP").innerHTML = "mois";
  			document.getElementById("months").setAttribute("class", "ui checkmark icon");
  		}
  	if (aUnit == "years")
  		{
  			document.getElementById("unitsP").innerHTML = "années";
  			document.getElementById("years").setAttribute("class", "ui checkmark icon");
  		}
  }

  function changeValP()
  {
  	if (whichValP == "gdNum")
  		{
  			document.getElementById("a"+whichAnsP).parentNode.innerHTML = document.getElementById("a"+whichAnsP).parentNode.innerHTML+", "+keyNumP+" "+document.getElementById("unitsP").innerHTML;
  			if (lang == "fr") { document.getElementById("clickInvite"+whichAnsP).innerHTML="Depuis combien d'années ?" }
  			if (lang == "en") { document.getElementById("clickInvite"+whichAnsP).innerHTML="How many years?" }
			document.getElementById("clickInvite"+whichAnsP).style.visibility="visible";
    		document.getElementById("clickText"+whichAnsP).style.visibility="visible";
  			$('.modalNumP.modal').modal('hide');
  		}
  	if (whichValP == "num")
  		{
  			document.getElementById("a"+whichAnsP).parentNode.innerHTML = '<i id="a'+whichAnsP+'" class="ui checkmark icon"></i>'+keyNumP+" "+document.getElementById("unitsP").innerHTML;
  			$('.modalNumP.modal').modal('hide');
  		}
  	if (whichValP == "sys")
  		{
  			if (validateNum == true && (keyNumP > 180 || keyNumP < 90))
  				{
  					document.getElementById("validationError").innerHTML = "Valeur hors norme (90 <= mmHg <= 180)";
  					validateNum = false;
  				}
  			else
  				{
					sysVal = keyNumP;
  					document.getElementById("sysVal").innerHTML = "<font size=120>"+keyNumP+"</font>";
  					$('.modalNum.modal').modal('hide');
  				}
  		}
  	if (whichValP == "dia")
  		{
  			if (validateNum == true && (keyNumP > 120 || keyNumP < 70))
  				{
  					document.getElementById("validationError").innerHTML = "Valeur hors norme (70 <= mmHg <= 120)";
  					validateNum = false;
  				}
  			else
  				{
					diaVal = keyNumP;
  					document.getElementById("diaVal").innerHTML = "<font size=120>"+keyNumP+"</font>";
  					$('.modalNum.modal').modal('hide');
  				}
  		}
  	if (whichValP == "spo2")
  		{
  			if (validateNum == true && (keyNumP > 99 || keyNumP < 90))
  				{
  					document.getElementById("validationError").innerHTML = "Valeur hors norme (90 <= SpO2 <= 99)";
  					validateNum = false;
  				}
  			else
  				{
					spo2Val = keyNumP;
  					document.getElementById("spo2Val").innerHTML = "<font size=120>"+keyNumP+"</font>";
  					$('.modalNum.modal').modal('hide');
  				}
  		}
  	if (whichValP == "bpm")
  		{
  			if (validateNum == true && (keyNumP > 100 || keyNumP < 60))
  				{
  					document.getElementById("validationError").innerHTML = "Valeur hors norme (60 <= BPM <= 100)";
  					validateNum = false;
  				}
  			else
  				{
					bpmVal = keyNumP;
  					document.getElementById("bpmVal").innerHTML = "<font size=120>"+keyNumP+"</font>";
  					$('.modalNum.modal').modal('hide');
  				}
  		}
  	if (whichValP == "weight")
  		{
  			if (validateNum == true && (keyNumP > 150 || keyNumP < 40))
  				{
  					document.getElementById("validationError").innerHTML = "Valeur hors norme (40 <= Kg <= 150)";
  					validateNum = false;
  				}
  			else
  				{
					weightVal = keyNumP;
  					document.getElementById("weightVal").innerHTML = "<font size=120>"+keyNumP+"</font>";
  					$('.modalNum.modal').modal('hide');
  				}
  		}
  	if (whichValP == "bgl")
  		{
  			if (validateNum == true && (keyNumP > 15 || keyNumP < 4))
  				{
  					document.getElementById("validationError").innerHTML = "Valeur hors norme (4.0 <= mmol/L <= 15.0)";
  					validateNum = false;
  				}
  			else
  				{
					bglVal = keyNumP;
  					document.getElementById("bglVal").innerHTML = "<font size=120>"+keyNumP+"</font>";
  					$('.modalNum.modal').modal('hide');
  				}
  		}
  	if (whichValP == "id")
  		{
			idVal = keyNumP;
  			document.getElementById("idVal").innerHTML = "<font size=120>"+keyNumP+"</font>";
  			$('.modalNum.modal').modal('hide');
  		}
  	if (whichValP == "glu")
  		{
  			//alert('Changing this'+whichTDP);
  			gluVal.push({ "td" : whichTDP, "val" : keyNumP });
  			$( "td:eq("+whichTDP+")" ).html("<font size=60>"+keyNumP+"</font>");
  			$('.modalNum.modal').modal('hide');
  		}
  	if (whichValP == "abs")
  		{
  			document.getElementById("a0").parentNode.innerHTML = document.getElementById("a0").parentNode.innerHTML+", "+keyNumP+" "+document.getElementById("unitsP").innerHTML;
  			$('.modalNum.modal').modal('hide');
  		}
  }

  function clearValP()
  {
	  	keyNumP = "";
      	document.getElementById("keyDisplayP").innerHTML = "<font size=90></font>";
  }

  function initQuesP()
  {

  	currentStepP = 1;
  	selectedAnswerP = -1;
  	QJSONP = "";
  	qExtIDP = "";
  	qTypeP = "";
  	qNextP = "";
  	nStepsP = [];
  	jResultsP = [];
  	jsonObjP = [];
  	keyNumP = "";
  	whichValP = "sys";
  	sysVal = "";
  	diaVal = "";
  	spo2Val = "";
  	bpmVal = "";
  	weightVal = "";
  	bglVal = "";
  	idVal = "";
  	gluVal = [];
  	whichAnsP = 0;
  	whichTDP = "";
  	totScoreP = 0;
  	myTimerW = "";
  	toggleCount = 0;
  	nextNumberP = 10001;
	
  	outputJSONP = {};
  	outputJSONP["qHeader"] = {};
  	outputJSONP["qHeader"]["firstJSON"] = firstJSON;
  	outputJSONP["qHeader"]["language"] = lang;
  	outputJSONP["qHeader"]["pKey"] = pKey;
  	var d = new Date();
  	var s = d.getFullYear() + '/' + twoDigits(d.getMonth() + 1) + '/' + twoDigits(d.getDate());
  	var t = twoDigits(d.getHours()) + ':' + twoDigits(d.getMinutes());
  	outputJSONP["qHeader"]["qDate"] = s;
  	outputJSONP["qHeader"]["qTime"] = t;
  	outputJSONP["qHeader"]["qScore"] = 0;
  	outputJSONP["qHeader"]["qClient"] = allJSONsP["tinsels"].cohort;
  	outputJSONP["qHeader"]["qFirst"] = "";
  	outputJSONP["qHeader"]["qLast"] = "";
  	outputJSONP["qHeader"]["qEmail"] = "";
  	outputJSONP["qHeader"]["qAlarm"] = "N";
  	outputJSONP["qHeader"]["qTreated"] = "N";
  	outputJSONP["qHeader"]["qWhom"] = "";
  	var qKeys = Object.keys(allJSONsP);
  	//alert(qKeys);
  	for (key in qKeys)
  	{
		if (qKeys[key] != "preloads" && qKeys[key] != "tinsels")
			{
				aQues = qKeys[key];
				//alert(aQues);
				outputJSONP[aQues] = {};
				outputJSONP[aQues]["qType"] = allJSONsP[aQues].qType;
				outputJSONP[aQues]["qEdits"] = "";
				if (allJSONsP[aQues].qType == "TX")
					{
						outputJSONP[aQues].answers = [{"text":""}];
					}
				else
					{
						outputJSONP[aQues].answers = [];
					}
				var ctr = 0;
				for (ans in allJSONsP[aQues].answers)
					{
						var dict = { "fChecked" : "N", "fExtra" : "" };
						outputJSONP[aQues]["answers"].push( dict );
						outputJSONP[aQues]["answers"][ctr]["fType"] = allJSONsP[aQues].answers[ctr].fType;
						outputJSONP[aQues]["answers"][ctr]["fValue"] = allJSONsP[aQues].answers[ctr].fValue;
						if (allJSONsP[aQues].qType.substring(0,1) == "F") outputJSONP[aQues]["answers"][ctr]["fValue"] = "";
						//if (allJSONsP[aQues].qType == "TX") outputJSONP[aQues]["answers"][ctr]["text"] = "";
						ctr++;
					}
			}
	}

	allResidents = "";

  	//adaptLanguage();
  	//fillHeader();

  	QJSONP = allJSONsP[firstQues];
  	qExtIDP = QJSONP.extID;
  	qTypeP = QJSONP.qType;
  	qNextP = QJSONP.nextStep;
  	getnextNumberP();
  	setupDisplayP();
       	
       	document.getElementById("buttonTxtP").setAttribute("onclick", "goNext();");
  	
  	$('.modalAnt.modal')
  	.modal('setting', 'closable', false)
  	.modal('show')
	;
  	
  	}