
  function toggleParo()
  {
        showAdultP = !showAdultP;
  	drawParo();
      	displaySub("paro");
  }
  
  function createPAR()
  {
  	if (qPARS.files.length > 0)
  	{
  		paro["locked"] = "Y";
  		uploadPAR(qFileParo);
  	}
  	var d = new Date();
  	var ddj = d.getFullYear() + '/' + twoDigits(d.getMonth() + 1) + '/' + twoDigits(d.getDate());
  	var hdj = twoDigits(d.getHours()) + ':' + twoDigits(d.getMinutes());
  	paro = { "id" : curPatient, "date" : ddj, "time" : hdj, "meas" : { } };
  	qFileParo = "A_" + curPatient + "_" + d.getTime();
  	uploadPAR(qFileParo);
  }
  
  function uploadPAR(aName)
  {
        $.post("uploadJSONsub.py", {sub: "paros", name: aName, json: JSON.stringify(paro)}, function(result){
            //alert("Le parogramme a été enregistré.");
            loadPARS(curPatient, true);
        });
  }
  
  function resetParo(aToothP)
  {
  	pVect = [0,0,0,0,0,0,0];
  	if (paro.meas[aToothP]) pVect = paro.meas[aToothP];
  	resetP(1,1);
  	document.getElementById("pB11"+pVect[0]).setAttribute("class","ui red tiny button");
  	resetP(1,2);
  	document.getElementById("pB12"+pVect[1]).setAttribute("class","ui red tiny button");
  	resetP(1,3);
  	document.getElementById("pB13"+pVect[2]).setAttribute("class","ui red tiny button");
  	resetP(2,1);
  	document.getElementById("pB21"+pVect[3]).setAttribute("class","ui red tiny button");
  	resetP(2,2);
  	document.getElementById("pB22"+pVect[4]).setAttribute("class","ui red tiny button");
  	resetP(2,3);
  	document.getElementById("pB23"+pVect[5]).setAttribute("class","ui red tiny button");
  	resetP(3,1);
  	document.getElementById("pB31"+pVect[6]).setAttribute("class","ui red tiny button");
  }
  
  function resetP(aPad,aCol)
  {
  	var maxP = 7;
  	if (aPad == 3) maxP = 3;
  	for (var i = 0; i < maxP; i++)
  	{
  		document.getElementById("pB"+aPad+aCol+i).setAttribute("class","ui axxium tiny button");
  	}
  }

  function keyEntryP(aPad,aCol,aVal)
  {
  	//alert("Key pB"+aPad+aCol+aVal);
  	resetP(aPad,aCol);
  	document.getElementById("pB"+aPad+aCol+aVal).setAttribute("class","ui red tiny button");
  	pVect[((aPad - 1)*3)+(aCol - 1)] = aVal;
  	//alert(pVect);
  }
  
  function setParo()
  {
  	paro.meas[aToothP] = pVect;
  	$('.modalParo.modal').modal('hide');
    	drawParo();
    	uploadPAR(qFileParo);
  }

  function drawParo()
  {
    //alert("Draw the whole thing!");
  	var canvas = document.getElementById("paro");
    	var ctx = canvas.getContext("2d");

  	if (showAdultP)
  	{
  		canvas.width = 600 * scaX;
  		canvas.height = 246 * scaY;
  		var background = new Image();
  		background.src = "images/parogramme3.png";
  	}
  	else
  	{
  		canvas.width = 389 * scaX;
  		canvas.height = 246 * scaY;
  		var background = new Image();
  		background.src = "images/parogramme4.png";
  	}

  	background.onload = function(){
      		ctx.drawImage(background,0,0,canvas.width,canvas.height);
		ctx.font="16px Arial";
		ctx.textAlign = "center";
		ctx.strokeStyle = "#888888";
	
      		for (var i = 0; i < 9; i++)
      		{
      			if (showAdultP)
      			{
      				ctx.beginPath();
				ctx.moveTo((5 * scaX),(70 * scaY)-(i*7*scaY));
				ctx.lineTo((600 * scaX)-(5 * scaX),(70 * scaY)-(i*7*scaY));
				ctx.stroke();
      			}
      			else
      			{
      				ctx.beginPath();
				ctx.moveTo((5 * scaX),(70 * scaY)-(i*7*scaY));
				ctx.lineTo((389*scaX)-(5 * scaX),(70 * scaY)-(i*7*scaY));
				ctx.stroke();
      			}
    		}
	
      		for (var i = 0; i < 9; i++)
      		{
      			if (showAdultP)
      			{
      				ctx.beginPath();
				ctx.moveTo((5 * scaX),(208 * scaY)-(i*7*scaY));
				ctx.lineTo((600 * scaX)-(5 * scaX),(208 * scaY)-(i*7*scaY));
				ctx.stroke();
      			}
      			else
      			{
      				ctx.beginPath();
				ctx.moveTo((5 * scaX),(208 * scaY)-(i*7*scaY));
				ctx.lineTo((389*scaX)-(5 * scaX),(208 * scaY)-(i*7*scaY));
				ctx.stroke();
      			}
    		}
    		
		if (showAdultP)
		{
			delta = canvas.width/16;
			teethU = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
			teethD = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];
		}
		else
		{
			delta = canvas.width/10;
			teethU = [55,54,53,52,51,61,62,63,64,65];
			teethD = [85,84,83,82,81,71,72,73,74,75];
		}
		
		allT = { };
		for (var i = 0; i < teethU.length; i++)
		{
			allT[teethU[i]] = [0,0,0,0,0,0,0];
		}
		for (var i = 0; i < teethD.length; i++)
		{
			allT[teethD[i]] = [0,0,0,0,0,0,0];
		}
    		for (tt in paro.meas)
    		{
    			allT[tt] = paro.meas[tt];
    		}
    		
    		isF = true;
    		lastX = 0;
    		lastY = 0;
    		for (tt in teethU)
    		{
    			var aVect = allT[teethU[tt]];
    			var aRank = 0;
    			var basY = (70*scaY);
    			if ($.inArray(eval(teethU[tt]),teethU) >= 0) 
    			{
    				aRank = $.inArray(eval(teethU[tt]),teethU);
    				basY = (68*scaY);
    			}
    			if ($.inArray(eval(teethU[tt]),teethD) >= 0) 
    			{
    				aRank = $.inArray(eval(teethU[tt]),teethD);
    				basY = (206*scaY);
    			}
    			var posX = (5*scaX) + (aRank * delta);
    			
    			//draw poche
    			ctx.fillStyle = "#ff0000";
    			ctx.strokeStyle = "#ff0000";
    			posY = basY - (aVect[0] * 7 * scaY);
    			if (isF)
    			{
    				isF = false;
    			}
    			else
    			{
      				ctx.beginPath();
				ctx.moveTo(lastX+(3*scaX),lastY+(3*scaY));
				ctx.lineTo(posX+(3*scaX),posY+(3*scaY));
				ctx.stroke();
    			}
    			
    			ctx.fillRect(posX,posY,(6*scaX),(6*scaY));
      				ctx.beginPath();
				ctx.moveTo(posX+(3*scaX),posY+(3*scaY));
				ctx.lineTo(posX+(13*scaX),(3*scaY) + basY - (aVect[1] * 7 * scaY));
				ctx.stroke();
				
    			ctx.fillRect(posX+(10*scaX),basY - (aVect[1] * 7 * scaY),(6*scaX),(6*scaY));
      				ctx.beginPath();
				ctx.moveTo(posX+(13*scaX),(3*scaY) + basY - (aVect[1] * 7 * scaY));
				ctx.lineTo(posX+(23*scaX),(3*scaY) + basY - (aVect[2] * 7 * scaY));
				ctx.stroke();
				
    			ctx.fillRect(posX+(20*scaX),basY - (aVect[2] * 7 * scaY),(6*scaX),(6*scaY));
    			
    			lastX = posX + (20*scaX);
    			lastY = basY - (aVect[2] * 7 * scaY);
    		}
    		isF = true;
    		lastX = 0;
    		lastY = 0;
    		for (tt in teethD)
    		{
    			var aVect = allT[teethD[tt]];
    			var aRank = 0;
    			var basY = (70*scaY);
    			//alert(tt+" "+$.inArray(eval(teethD[tt]),teethU));
    			if ($.inArray(eval(teethD[tt]),teethU) >= 0) 
    			{
    				aRank = $.inArray(eval(teethD[tt]),teethU);
    				basY = (68*scaY);
    			}
    			if ($.inArray(eval(teethD[tt]),teethD) >= 0) 
    			{
    				aRank = $.inArray(eval(teethD[tt]),teethD);
    				basY = (206*scaY);
    			}
    			var posX = (5*scaX) + (aRank * delta);
    			
    			//draw poche
    			ctx.fillStyle = "#ff0000";
    			ctx.strokeStyle = "#ff0000";
    			posY = basY - (aVect[0] * 7 * scaY);
    			if (isF)
    			{
    				isF = false;
    			}
    			else
    			{
      				ctx.beginPath();
				ctx.moveTo(lastX+(3*scaX),lastY+(3*scaY));
				ctx.lineTo(posX+(3*scaX),posY+(3*scaY));
				ctx.stroke();
    			}
    			
    			ctx.fillRect(posX,posY,(6*scaX),(6*scaY));
      				ctx.beginPath();
				ctx.moveTo(posX+(3*scaX),posY+(3*scaY));
				ctx.lineTo(posX+(13*scaX),(3*scaY) + basY - (aVect[1] * 7 * scaY));
				ctx.stroke();
				
    			ctx.fillRect(posX+(10*scaX),basY - (aVect[1] * 7 * scaY),(6*scaX),(6*scaY));
      				ctx.beginPath();
				ctx.moveTo(posX+(13*scaX),(3*scaY) + basY - (aVect[1] * 7 * scaY));
				ctx.lineTo(posX+(23*scaX),(3*scaY) + basY - (aVect[2] * 7 * scaY));
				ctx.stroke();
				
    			ctx.fillRect(posX+(20*scaX),basY - (aVect[2] * 7 * scaY),(6*scaX),(6*scaY));
    			
    			lastX = posX + (20*scaX);
    			lastY = basY - (aVect[2] * 7 * scaY);
    		}
    		
    		isF = true;
    		lastX = 0;
    		lastY = 0;
    		for (tt in teethU)
    		{
    			var aVect = allT[teethU[tt]];
    			var aRank = 0;
    			var basY = (70*scaY);
    			if ($.inArray(eval(teethU[tt]),teethU) >= 0) 
    			{
    				aRank = $.inArray(eval(teethU[tt]),teethU);
    				basY = (68*scaY);
    			}
    			if ($.inArray(eval(teethU[tt]),teethD) >= 0) 
    			{
    				aRank = $.inArray(eval(teethU[tt]),teethD);
    				basY = (206*scaY);
    			}
    			var posX = (5*scaX) + (aRank * delta);
    			
    			//draw recession
    			ctx.fillStyle = "#0000ff";
    			ctx.strokeStyle = "#0000ff";
    			posY = basY - (aVect[3] * 7 * scaY);
    			if (isF)
    			{
    				isF = false;
    			}
    			else
    			{
      				ctx.beginPath();
				ctx.moveTo(lastX+(3*scaX),lastY+(3*scaY));
				ctx.lineTo(posX+(3*scaX),posY+(3*scaY));
				ctx.stroke();
    			}
    			
    			ctx.fillRect(posX,posY,(6*scaX),(6*scaY));
      				ctx.beginPath();
				ctx.moveTo(posX+(3*scaX),posY+(3*scaY));
				ctx.lineTo(posX+(13*scaX),(3*scaY) + basY - (aVect[4] * 7 * scaY));
				ctx.stroke();
				
    			ctx.fillRect(posX+(10*scaX),basY - (aVect[4] * 7 * scaY),(6*scaX),(6*scaY));
      				ctx.beginPath();
				ctx.moveTo(posX+(13*scaX),(3*scaY) + basY - (aVect[4] * 7 * scaY));
				ctx.lineTo(posX+(23*scaX),(3*scaY) + basY - (aVect[5] * 7 * scaY));
				ctx.stroke();
				
    			ctx.fillRect(posX+(20*scaX),basY - (aVect[5] * 7 * scaY),(6*scaX),(6*scaY));
    			
    			lastX = posX + (20*scaX);
    			lastY = basY - (aVect[5] * 7 * scaY);
    			
			ctx.strokeStyle = "#000000";
			ctx.fillStyle = "#000000";
			ctx.fillText(aVect[6],posX+(13*scaX),basY+(24*scaY));
    		}
    		isF = true;
    		lastX = 0;
    		lastY = 0;
    		for (tt in teethD)
    		{
    			var aVect = allT[teethD[tt]];
    			var aRank = 0;
    			var basY = (70*scaY);
    			//alert(tt+" "+$.inArray(eval(teethD[tt]),teethU));
    			if ($.inArray(eval(teethD[tt]),teethU) >= 0) 
    			{
    				aRank = $.inArray(eval(teethD[tt]),teethU);
    				basY = (68*scaY);
    			}
    			if ($.inArray(eval(teethD[tt]),teethD) >= 0) 
    			{
    				aRank = $.inArray(eval(teethD[tt]),teethD);
    				basY = (206*scaY);
    			}
    			var posX = (5*scaX) + (aRank * delta);
    			
			//draw recession
			ctx.fillStyle = "#0000ff";
    			ctx.strokeStyle = "#0000ff";
    			posY = basY - (aVect[3] * 7 * scaY);
    			if (isF)
    			{
    				isF = false;
    			}
    			else
    			{
      				ctx.beginPath();
				ctx.moveTo(lastX+(3*scaX),lastY+(3*scaY));
				ctx.lineTo(posX+(3*scaX),posY+(3*scaY));
				ctx.stroke();
    			}
    			
    			ctx.fillRect(posX,posY,(6*scaX),(6*scaY));
      				ctx.beginPath();
				ctx.moveTo(posX+(3*scaX),posY+(3*scaY));
				ctx.lineTo(posX+(13*scaX),(3*scaY) + basY - (aVect[4] * 7 * scaY));
				ctx.stroke();
				
    			ctx.fillRect(posX+(10*scaX),basY - (aVect[4] * 7 * scaY),(6*scaX),(6*scaY));
      				ctx.beginPath();
				ctx.moveTo(posX+(13*scaX),(3*scaY) + basY - (aVect[4] * 7 * scaY));
				ctx.lineTo(posX+(23*scaX),(3*scaY) + basY - (aVect[5] * 7 * scaY));
				ctx.stroke();
				
    			ctx.fillRect(posX+(20*scaX),basY - (aVect[5] * 7 * scaY),(6*scaX),(6*scaY));
    			
    			lastX = posX + (20*scaX);
    			lastY = basY - (aVect[5] * 7 * scaY);
    			
			ctx.strokeStyle = "#000000";
			ctx.fillStyle = "#000000";
			ctx.fillText(aVect[6],posX+(13*scaX),basY+(24*scaY));
    		}
	}
  }

  function getToothP(evX, evY)
  {
  	//alert(evX + "-" + evY);
  	var div = document.getElementById("paro");
	var rect = div.getBoundingClientRect();
	var delta = 0;
	//alert(rect);
	realX = Math.floor(evX - rect.left);
	realY = Math.floor(evY - rect.top);
	if (showAdultP)
	{
		delta = rect.width/16;
	}
	else
	{
		delta = rect.width/10;
	}
	half = rect.height/2;
	h = rect.height;
	//alert("Coordinates: " + realX + "px, " + realY + "px");
  	aTooth = 0;
	//alert("Start calculations");
	if (realY < half)
	{
		//alert("haut");
		if (realY > half*0.85)
		{
			if (showAdultP)
			{
				teeth = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
			}
			else
			{
				teeth = [55,54,53,52,51,61,62,63,64,65];
			}
			//alert(Math.floor(realX/delta));
			aTooth = teeth[Math.floor(realX/delta)];
		}
	}
	else
	{
		//alert("bas");
		if (realY < half + (half*0.15))
		{
			if (showAdultP)
			{
				teeth = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];
			}
			else
			{
				teeth = [85,84,83,82,81,71,72,73,74,75];
			}
			//alert(Math.floor(realX/delta));
			aTooth = teeth[Math.floor(realX/delta)];
		}
	}
	return aTooth;
  }

  function loadParo()
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
      paro = JSON.parse(xmlhttp2.responseText);
      isLockedPAR = false;
      if (paro.date)
      {
  	var d = new Date();
  	var ddj = d.getFullYear() + '/' + twoDigits(d.getMonth() + 1) + '/' + twoDigits(d.getDate());
      	if (paro.date != ddj) isLockedPAR = true;
      }
      
      drawParo();
      displaySign(paro,"PAR");
      }
  }

  //alert("Get the Paro!");
  xmlhttp2.open("GET","allScriptsv1.py?tx=getJSONsub&sub=paros&code="+qFileParo+"&rand="+Math.random(),true);
  xmlhttp2.send();

  }

  function loadPARS(aPat, relBan)
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
      qPARS = JSON.parse(xmlhttp2.responseText);
      curParo = 0;
      	if (qPARS.files.length > 0)
      	{
      		if (relBan) displaySub("paro");
      		qFileParo = qPARS.files[curParo].file;
      		loadParo();
      	}
      	else
      	{
  		var canvas = document.getElementById("paro"),
    		ctx = canvas.getContext("2d");
		ctx.font="16px Arial";
		ctx.textAlign = "left";
		ctx.strokeStyle = "#000000";
		ctx.fillStyle = "#000000";
		ctx.fillText("Aucun diagramme",10,20);
      	}
      }
  }

  //alert("Get the Files!");
  xmlhttp2.open("GET","allScriptsv1.py?tx=getALLsub&sub=paros&patID="+aPat+"&rand="+Math.random(),true);
  xmlhttp2.send();

  }

  function backPAR()
  {
      if (curParo < qPARS.files.length - 1)
      {
      	curParo = curParo + 1;
      	qFileParo = qPARS.files[curParo].file;
  	loadParo();
      }
      displaySub("paros");
  }

  function forPAR()
  {
      if (curParo > 0)
      {
      	curParo = curParo - 1;
      	qFileParo = qPARS.files[curParo].file;
  	loadParo();
      }
      displaySub("paros");
  }

  function paroPlus()
  {
      if (scaX < 3)
      {
      	scaX = scaX + 0.5;
      	scaY = scaY + 0.5;
      }
      drawParo();
  }

  function paroMoins()
  {
      if (scaX > 1)
      {
      	scaX = scaX - 0.5;
      	scaY = scaY - 0.5;
      }
      drawParo();
  }
  