
  function toggleOdon()
  {
        showAdult = !showAdult;
  	drawOdon();
      	displaySub("odontos");
  }
  
  function delODO()
  {
  	var ctrp = 0;
  	var qNewExist = [ ];
  	for (tt in odonto.exist)
  	{
  	  if (document.getElementById("xOEB"+ctrp).checked)
  	  {
  		//Nothing
  	  }
  	  else
  	  {
  		qNewExist.push({"code": odonto.exist[tt]["code"], "tooth": odonto.exist[tt]["tooth"], "surface": odonto.exist[tt]["surface"], "note": odonto.exist[tt]["note"]});
  	  }
  	  ctrp = ctrp + 1;
  	}
  	odonto.exist = qNewExist;
  	
  	ctrp = 0;
  	var qNewTodo = [ ];
  	for (tt in odonto.todo)
  	{
  	  if (document.getElementById("xOAF"+ctrp).checked)
  	  {
  		//Nothing
  	  }
  	  else
  	  {
  		qNewTodo.push({"code": odonto.todo[tt]["code"], "tooth": odonto.todo[tt]["tooth"], "surface": odonto.todo[tt]["surface"], "note": odonto.todo[tt]["note"]});
  	  }
  	  ctrp = ctrp + 1;
  	}
  	odonto.todo = qNewTodo;
  	
  	ctrp = 0;
  	var qNewObserv = [ ];
  	for (tt in odonto.observ)
  	{
  	  if (document.getElementById("xOAS"+ctrp).checked)
  	  {
  		//Nothing
  	  }
  	  else
  	  {
  		qNewObserv.push({"code": odonto.observ[tt]["code"], "tooth": odonto.observ[tt]["tooth"], "surface": odonto.observ[tt]["surface"], "note": odonto.observ[tt]["note"]});
  	  }
  	  ctrp = ctrp + 1;
  	}
  	odonto.observ = qNewObserv;
  	
  	uploadODO(qFileOdo);
  	//setTimeout(loadODONS(curPatient), 500);
  }
  
  function createODO()
  {
  	if (qODONS.files.length > 0)
  	{
  		odonto["locked"] = "Y";
  		uploadODO(qFileOdo);
  	}
  	var d = new Date();
  	var ddj = d.getFullYear() + '/' + twoDigits(d.getMonth() + 1) + '/' + twoDigits(d.getDate());
  	var hdj = twoDigits(d.getHours()) + ':' + twoDigits(d.getMinutes());
  	odonto = { "id" : curPatient, "date" : ddj, "time" : hdj, "exist" : [ ], "todo" : [ ], "observ" : [ ] };
  	qFileOdo = "O_" + curPatient + "_" + d.getTime();
  	uploadODO(qFileOdo);
  	//drawOdon();
  	//setTimeout(loadODONS(curPatient), 500);
  }
  
  function uploadODO(aName)
  {
        $.post("uploadJSONsub.py", {sub: "odonto", name: aName, json: JSON.stringify(odonto)}, function(result){
            //alert("L'odontogramme a été enregistré.");
            loadODONS(curPatient, true);
        });
  }

  function drawOdon()
  {
    //alert("Draw the whole thing!");
  	var canvas = document.getElementById("odonto");
    	ctx = canvas.getContext("2d");

  	if (showAdult)
  	{
  		canvas.width = 600;
  		canvas.height = 395;
  		var background = new Image();
  		background.src = "images/odontogramme.png";
  	}
  	else
  	{
  		canvas.width = 389;
  		canvas.height = 395;
  		var background = new Image();
  		background.src = "images/odontogramme2.png";
  	}

  	background.onload = function(){
      	ctx.drawImage(background,0,0);

	ctx.strokeStyle = "#"+mapping["exist"];
	ctx.fillStyle = "#"+mapping["exist"];
	
      	for (cd in odonto["exist"])
      		{
    	  		if (odonto.exist[cd]["tooth"] && (odonto.exist[cd].code.substr(0,4) == "2122" || odonto.exist[cd].code.substr(0,4) == "2322"))
    	  			{
    	  				surf = odonto.exist[cd]["surface"];
    	  				for (var i = 0, len = surf.length; i < len; i++)
    	  				{
    	  				    if ((showAdult && odonto.exist[cd]["tooth"] < 50) || (!showAdult && odonto.exist[cd]["tooth"] > 50))
    	  				    {
    	  					pos = mapping[odonto.exist[cd]["tooth"]+surf[i]];
    	  					if (surf[i] == "O")
    	  						{
								ctx.beginPath();
								ctx.ellipse(pos.x,pos.y,pos.dx-4,pos.dy-3, 0, 0, 2 * Math.PI);
								ctx.closePath();
								ctx.fill();
    	  						}
    	  					else
    	  						{
    	  							ctx.fillRect(pos.x,pos.y,pos.dx,pos.dy);
    	  						}
    	  				    }
    	  				}
    	  			}
    	  	}

	ctx.strokeStyle = "#"+mapping["observ"];
	ctx.fillStyle = "#"+mapping["observ"];
	
      	for (cd in odonto["observ"])
      		{
    	  		if (odonto.observ[cd]["tooth"] && (odonto.observ[cd].code.substr(0,4) == "2122" || odonto.observ[cd].code.substr(0,4) == "2322"))
    	  			{
    	  				surf = odonto.observ[cd]["surface"];
    	  				for (var i = 0, len = surf.length; i < len; i++)
    	  				{
    	  				    if ((showAdult && odonto.observ[cd]["tooth"] < 50) || (!showAdult && odonto.observ[cd]["tooth"] > 50))
    	  				    {
    	  					pos = mapping[odonto.observ[cd]["tooth"]+surf[i]];
    	  					if (surf[i] == "O")
    	  						{
								ctx.beginPath();
								ctx.ellipse(pos.x,pos.y,pos.dx-4,pos.dy-3, 0, 0, 2 * Math.PI);
								ctx.closePath();
								ctx.fill();
    	  						}
    	  					else
    	  						{
    	  							ctx.fillRect(pos.x,pos.y,pos.dx,pos.dy);
    	  						}
    	  				    }
    	  				}
    	  			}
    	  	}

	ctx.strokeStyle = "#"+mapping["todo"];
	ctx.fillStyle = "#"+mapping["todo"];
	
      	for (cd in odonto["todo"])
      		{
    	  		if (odonto.todo[cd]["tooth"] && (odonto.todo[cd].code.substr(0,4) == "2122" || odonto.todo[cd].code.substr(0,4) == "2322"))
    	  			{
    	  				surf = odonto.todo[cd]["surface"];
    	  				for (var i = 0, len = surf.length; i < len; i++)
    	  				{
    	  				    if ((showAdult && odonto.todo[cd]["tooth"] < 50) || (!showAdult && odonto.todo[cd]["tooth"] > 50))
    	  				    {
    	  					pos = mapping[odonto.todo[cd]["tooth"]+surf[i]];
    	  					if (surf[i] == "O")
    	  						{
								ctx.beginPath();
								ctx.ellipse(pos.x,pos.y,pos.dx-4,pos.dy-3, 0, 0, 2 * Math.PI);
								ctx.closePath();
								ctx.fill();
    	  						}
    	  					else
    	  						{
    	  							ctx.fillRect(pos.x,pos.y,pos.dx,pos.dy);
    	  						}
    	  				    }
    	  				}
    	  			}
    	  	}
	}
  }

  function acceptVal1(aList)
  {
  	text42 = document.getElementById("text42").value;
  	note42 = document.getElementById("EnoteT").value;
  	if (trait == 1)
  		{
  			if (isAnte) { currentCode = "2110"+classNum(); } else { currentCode = "2122"+totSurf(); }
  		}
  	if (trait == 2)
  		{
  			if (isAnte) { currentCode = "2311"+classNum(); } else { currentCode = "2322"+totSurf(); }
  		}
  	if (trait == 3)
  		{
  			currentCode = "11300";
  		}
  	if (trait == 4)
  		{
  			currentCode = "01205";
  		}
  		
    div1 = document.createElement("tr");
    div1.setAttribute("id", currentCode);
    div1.innerHTML = '<td width="25%"><h5>'+currentCode+'</h5></td><td width="15%"><h5>'+aTooth+'</h5></td><td width="60%"><h5>'+textSurf()+'</h5></td>';
    
    div2 = document.createElement("tr");
    div2.setAttribute("id", currentCode);
    div2.innerHTML = '<td colspan="3"><h5>'+qCODES[currentCode].fr+'</h5></td>';
    
    div3 = document.createElement("tr");
    div3.setAttribute("id", currentCode);
    div3.innerHTML = '<td colspan="3"><h5>'+note42+'</h5></td>';
    
    if (aList == 0)
    	{
    		nextID = odonto.exist.length;
    		if (note42.length > 0)
    		{
    			newRow = document.getElementById("ebList").insertRow(0);
    			newCell = newRow.insertCell(0);
    			newCell.innerHTML = '<td colspan="4"><h5>'+note42+'</h5></td>';
    			newCell.colSpan = "4";
    		}
    		newRow = document.getElementById("ebList").insertRow(0);
    		newCell = newRow.insertCell(0);
    		newCell.innerHTML = '<td colspan="4"><h5>'+qCODES[currentCode].fr+'</h5></td>';
    		newCell.colSpan = "4";
    		newRow = document.getElementById("ebList").insertRow(0);
    		
    		newCell = newRow.insertCell(0);
    		newCell.innerHTML = '<td width="25%"><h4><input id="xOEB'+nextID+'" type="checkbox" tabindex="'+nextID+'" class="hidden"></h4></td>';
    		newCell = newRow.insertCell(1);
    		newCell.innerHTML = '<td width="25%"><h5>'+currentCode+'</h5></td>';
    		newCell = newRow.insertCell(2);
    		newCell.innerHTML = '<td width="15%"><h5>'+aTooth+'</h5></td>';
    		newCell = newRow.insertCell(3);
    		newCell.innerHTML = '<td width="60%"><h5>'+textSurf()+'</h5></td>';
    		odonto.exist.push({ "code" : currentCode, "tooth" : aTooth, "surface" : textSurf(), "note" : note42 });
    		$('.menu .item').tab('change tab', 'eb');
    	}
    if (aList == 1)
    	{
    		nextID = odonto.todo.length;
    		if (note42.length > 0)
    		{
    			newRow = document.getElementById("afList").insertRow(0);
    			newCell = newRow.insertCell(0);
    			newCell.innerHTML = '<td colspan="4"><h5>'+note42+'</h5></td>';
    			newCell.colSpan = "4";
    		}
    		newRow = document.getElementById("afList").insertRow(0);
    		newCell = newRow.insertCell(0);
    		newCell.innerHTML = '<td colspan="4"><h5>'+qCODES[currentCode].fr+'</h5></td>';
    		newCell.colSpan = "4";
    		newRow = document.getElementById("afList").insertRow(0);
    		
    		newCell = newRow.insertCell(0);
    		newCell.innerHTML = '<td width="25%"><h4><input id="xOAF'+nextID+'" type="checkbox" tabindex="'+nextID+'" class="hidden"></h4></td>';
    		newCell = newRow.insertCell(1);
    		newCell.innerHTML = '<td width="25%"><h5>'+currentCode+'</h5></td>';
    		newCell = newRow.insertCell(2);
    		newCell.innerHTML = '<td width="15%"><h5>'+aTooth+'</h5></td>';
    		newCell = newRow.insertCell(3);
    		newCell.innerHTML = '<td width="60%"><h5>'+textSurf()+'</h5></td>';
    		odonto.todo.push({ "code" : currentCode, "tooth" : aTooth, "surface" : textSurf(), "note" : note42 });
    		$('.menu .item').tab('change tab', 'af');
    	}
    if (aList == 2)
    	{
    		nextID = odonto.observ.length;
    		if (note42.length > 0)
    		{
    			newRow = document.getElementById("asList").insertRow(0);
    			newCell = newRow.insertCell(0);
    			newCell.innerHTML = '<td colspan="4"><h5>'+note42+'</h5></td>';
    			newCell.colSpan = "4";
    		}
    		newRow = document.getElementById("asList").insertRow(0);
    		newCell = newRow.insertCell(0);
    		newCell.innerHTML = '<td colspan="4"><h5>'+qCODES[currentCode].fr+'</h5></td>';
    		newCell.colSpan = "4";
    		newRow = document.getElementById("asList").insertRow(0);
    		
    		newCell = newRow.insertCell(0);
    		newCell.innerHTML = '<td width="25%"><h4><input id="xOAS'+nextID+'" type="checkbox" tabindex="'+nextID+'" class="hidden"></h4></td>';
    		newCell = newRow.insertCell(1);
    		newCell.innerHTML = '<td width="25%"><h5>'+currentCode+'</h5></td>';
    		newCell = newRow.insertCell(2);
    		newCell.innerHTML = '<td width="15%"><h5>'+aTooth+'</h5></td>';
    		newCell = newRow.insertCell(3);
    		newCell.innerHTML = '<td width="60%"><h5>'+textSurf()+'</h5></td>';
    		odonto.observ.push({ "code" : currentCode, "tooth" : aTooth, "surface" : textSurf(), "note" : note42 });
    		$('.menu .item').tab('change tab', 'as');
    	}
    drawOdon();
    clearVal1();
    uploadODO(qFileOdo);
  }

  function clearVal1()
  {
    tracks42 = "";
  	document.getElementById("text42").value = "";
  	document.getElementById("searchField").value = "";
  	trait = 0;
  	resetTrait();
  	resetMLDBO();
  	$('.ui.modal').modal('hide');
  }

  function totSurf()
  {
  	var tot = 0;
  	if (isM) tot = tot + 1;
  	if (isL) tot = tot + 1;
  	if (isD) tot = tot + 1;
  	if (isB) tot = tot + 1;
  	if (isO) tot = tot + 1;
  	return tot
  }

  function classNum()
  {
  	if (is1) return 1;
  	if (is2) return 2;
  	if (is3) return 3;
  	if (is4) return 4;
  	if (is5) return 5;
  	if (is6) return 6;
  }

  function textSurf()
  {
  	var txt = "";
  	if (isM) txt = txt + "M";
  	if (isL) txt = txt + "L";
  	if (isD) txt = txt + "D";
  	if (isB) txt = txt + "B";
  	if (isO) txt = txt + "O";
  	return txt
  }

  function addText(aText)  { document.getElementById("text42").value = document.getElementById("text42").value + aText;  }

  function setAmal()  { trait = 1; resetTrait(); document.getElementById("butAmal").setAttribute("class","ui red large fluid button");  addText(" AMALGAME"); }
  function setComp()  { trait = 2; resetTrait(); document.getElementById("butComp").setAttribute("class","ui red large fluid button");  addText(" COMPOSITE"); }
  function set1()   { trait = 3; resetTrait(); document.getElementById("butOr").setAttribute("class","ui red large fluid button");   currentCode = "11300"; document.getElementById("text42").value = currentCode + " - " + qCODES[currentCode].fr; }
  function set2()  { trait = 4; resetTrait(); document.getElementById("butRes").setAttribute("class","ui red large fluid button");  currentCode = "01205"; document.getElementById("text42").value = currentCode + " - " + qCODES[currentCode].fr; }

  function resetTrait()
  {
  	document.getElementById("butAmal").setAttribute("class","ui axxium large fluid button");
  	document.getElementById("butComp").setAttribute("class","ui axxium large fluid button");
  	document.getElementById("butOr").setAttribute("class","ui axxium large fluid button");
  	document.getElementById("butRes").setAttribute("class","ui axxium large fluid button");
  }

  function setC1() { 
  	is1 = true; 
  	document.getElementById("butM").setAttribute("class","ui red large fluid button");
  	document.getElementById("butM").setAttribute("onclick","setC1();");
  	document.getElementById("butM").innerHTML = "<font size=5>1</font>";
  	addText("CLASSE 1"); 
  }
  function setC2() { 
  	is2 = true; 
  	document.getElementById("butL").setAttribute("class","ui red large fluid button");
  	document.getElementById("butL").setAttribute("onclick","setC2();");
  	document.getElementById("butL").innerHTML = "<font size=5>2</font>";
  	addText("CLASSE 2"); 
  }
  function setC3() { 
  	is3 = true; 
  	document.getElementById("butD").setAttribute("class","ui red large fluid button");
  	document.getElementById("butD").setAttribute("onclick","setC3();");
  	document.getElementById("butD").innerHTML = "<font size=5>3</font>";
  	addText("CLASSE 3"); 
  }
  function setC4() { 
  	is4 = true; 
  	document.getElementById("butB").setAttribute("class","ui red large fluid button");
  	document.getElementById("butB").setAttribute("onclick","setC4();");
  	document.getElementById("butB").innerHTML = "<font size=5>4</font>";
  	addText("CLASSE 4"); 
  }
  function setC5() { 
  	is5 = true; 
  	document.getElementById("butO").setAttribute("class","ui red large fluid button");
  	document.getElementById("butO").setAttribute("onclick","setC5();");
  	document.getElementById("butO").innerHTML = "<font size=5>5</font>";
  	addText("CLASSE 5"); 
  }
  function setC6() { 
  	is6 = true; 
  	document.getElementById("butS").setAttribute("class","ui red large fluid button");
  	document.getElementById("butS").setAttribute("onclick","setC6();");
  	document.getElementById("butS").innerHTML = "<font size=5>6</font>";
  	addText("CLASSE 6"); 
  }

  function reset12345()
  {
  	isAnte = true;
  	is1 = false;
  	is2 = false;
  	is3 = false;
  	is4 = false;
  	is5 = false;
  	is6 = false;
  	document.getElementById("butM").setAttribute("class","ui axxium large fluid button");
  	document.getElementById("butM").setAttribute("onclick","setC1();");
  	document.getElementById("butM").innerHTML = "<font size=5>1</font>";
  	document.getElementById("butL").setAttribute("class","ui axxium large fluid button");
  	document.getElementById("butL").setAttribute("onclick","setC2();");
  	document.getElementById("butL").innerHTML = "<font size=5>2</font>";
  	document.getElementById("butD").setAttribute("class","ui axxium large fluid button");
  	document.getElementById("butD").setAttribute("onclick","setC3();");
  	document.getElementById("butD").innerHTML = "<font size=5>3</font>";
  	document.getElementById("butB").setAttribute("class","ui axxium large fluid button");
  	document.getElementById("butB").setAttribute("onclick","setC4();");
  	document.getElementById("butB").innerHTML = "<font size=5>4</font>";
  	document.getElementById("butO").setAttribute("class","ui axxium large fluid button");
  	document.getElementById("butO").setAttribute("onclick","setC5();");
  	document.getElementById("butO").innerHTML = "<font size=5>5</font>";
  	
  	document.getElementById("butS").setAttribute("style","visibility:visible");
  	document.getElementById("butS").setAttribute("class","ui axxium large fluid button");
  	document.getElementById("butS").setAttribute("onclick","setC6();");
  	document.getElementById("butS").innerHTML = "<font size=5>6</font>";
  }

  function resetMLDBO()
  {
  	isAnte = false;
  	isM = false;
  	isL = false;
  	isD = false;
  	isB = false;
  	isO = false;
  	document.getElementById("butM").setAttribute("class","ui axxium large fluid button");
  	document.getElementById("butM").setAttribute("onclick","setM();");
  	document.getElementById("butM").innerHTML = "<font size=6>M</font>";
  	document.getElementById("butL").setAttribute("class","ui axxium large fluid button");
  	document.getElementById("butL").setAttribute("onclick","setL();");
  	document.getElementById("butL").innerHTML = "<font size=6>L</font>";
  	document.getElementById("butD").setAttribute("class","ui axxium large fluid button");
  	document.getElementById("butD").setAttribute("onclick","setD();");
  	document.getElementById("butD").innerHTML = "<font size=6>D</font>";
  	document.getElementById("butB").setAttribute("class","ui axxium large fluid button");
  	document.getElementById("butB").setAttribute("onclick","setB();");
  	document.getElementById("butB").innerHTML = "<font size=6>B</font>";
  	document.getElementById("butO").setAttribute("class","ui axxium large fluid button");
  	document.getElementById("butO").setAttribute("onclick","setO();");
  	document.getElementById("butO").innerHTML = "<font size=6>O</font>";
  	
  	document.getElementById("butS").setAttribute("style","visibility:hidden");
  }

  function setM() { isM = true; document.getElementById("butM").setAttribute("class","ui red large fluid button"); addText("M"); }
  function setL() { isL = true; document.getElementById("butL").setAttribute("class","ui red large fluid button"); addText("L"); }
  function setD() { isD = true; document.getElementById("butD").setAttribute("class","ui red large fluid button"); addText("D"); }
  function setB() { isB = true; document.getElementById("butB").setAttribute("class","ui red large fluid button"); addText("B"); }
  function setO() { isO = true; document.getElementById("butO").setAttribute("class","ui red large fluid button"); addText("O"); }

  function keyEntry(aNum)
  {
      		if (aNum == -1)
      			{
      				if (tracks42.length > 0) tracks42 = tracks42.substr(0,tracks42.length - 1);
      				document.getElementById("text42").value = tracks42;
      			}
      		if (aNum == -2)
      			{
    				tracks42 = "";
  				document.getElementById("text42").value = "";
  				trait = 0;
  				resetTrait();
    				if (isAnte)
    				{
    					reset12345();
    				}
    				else
    				{
    					resetMLDBO();
    				}
      			}
      		if (aNum > -1)
      			{
  				tracks42 = tracks42 + aNum;
      				if (tracks42.length == 5)
      				{
      					currentCode = tracks42;
      					if (qCODES[currentCode])
      						{
      							document.getElementById("text42").value = currentCode + " - " + qCODES[currentCode].fr;
      						}
      					else
      						{
      							document.getElementById("text42").value = "CODE INCORRECT : "+tracks42;
      							tracks42 = "";
      						}
      				}
      				else
      				{
      					document.getElementById("text42").value = tracks42;
      				}
      			}
  }

  function getTooth(evX, evY)
  {
  	//alert(evX + "-" + evY);
  	var div = document.getElementById("odonto");
	var rect = div.getBoundingClientRect();
	//alert(rect);
	realX = evX - rect.left;
	realY = evY - rect.top;
	if (showAdult)
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
  	aTooth = "";
	//alert("Start calculations");
	if (realY < half)
	{
		//alert("haut");
		if (showAdult)
		{
			teeth = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
		}
		else
		{
			teeth = [55,54,53,52,51,61,62,63,64,65];
		}
		//alert(teeth[Math.floor(realX/delta)]);
		aTooth = teeth[Math.floor(realX/delta)];
	}
	else
	{
		//alert("bas");
		if (showAdult)
		{
			teeth = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];
		}
		else
		{
			teeth = [85,84,83,82,81,71,72,73,74,75];
		}
		//alert(teeth[Math.floor(realX/delta)]);
		aTooth = teeth[Math.floor(realX/delta)];
	}
	return aTooth;
  }

  function loadCODES()
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
      qCODES = JSON.parse(xmlhttp2.responseText);
      var qKeys = Object.keys(qCODES);
      searchItems = [];
      for (key in qKeys)
      		{
    	  		searchItems.push({ "code" : qKeys[key], "fr" : qCODES[qKeys[key]].fr });
    	  	}
	  $('.ui.search')
		  .search({
		    source : searchItems,
		    minCharacters : 3,
		    searchFields   : [
		      'code',
		      'fr'
		    ],
    		fields: {
    		  title : 'fr'
    		},
		    searchFullText: true,
    		onSelect: function(result, response) {
        		//alert(result.code+" - "+result.fr);
        		if (inTrait)
        		{
        			currentCode2 = result.code;
        			document.getElementById("text422").value = currentCode2 + " - " + qCODES[currentCode2].fr;
        			document.getElementById("EpriceT2").value = qCODES[currentCode2].prix;
        		}
        		else
        		{
        			currentCode = result.code;
        			document.getElementById("text42").value = currentCode + " - " + qCODES[currentCode].fr;
        		}
    		}
	  });
  	  loadMapping();
      }
    }

  //alert("Get the Files!");
  xmlhttp2.open("GET","json/ramq/codes5.json",true);
  xmlhttp2.send();

  }

  function loadMapping()
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
      mapping = JSON.parse(xmlhttp2.responseText);
      }
  }

  //alert("Get the Mappings!");
  xmlhttp2.open("GET","json/ramq/mapping4.json",true);
  xmlhttp2.send();

  }

  function loadOdonto()
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
      odonto = JSON.parse(xmlhttp2.responseText);
      isLockedODO = false;
      if (odonto.date)
      {
  	var d = new Date();
  	var ddj = d.getFullYear() + '/' + twoDigits(d.getMonth() + 1) + '/' + twoDigits(d.getDate());
      	if (odonto.date != ddj) isLockedODO = true;
      }
      document.getElementById("ebList").innerHTML = "";
      ctrID = 0;
      for (tt in odonto.exist)
      		{
    			div = document.createElement("tr");
    			div.setAttribute("id", "OEB"+ctrID);
    			div.setAttribute("class", "error");
    			div.innerHTML = '<td width="10%"><h4><input id="xOEB'+ctrID+'" type="checkbox" tabindex="'+ctrID+'" class="hidden"></h4></td><td width="25%"><h5>'+odonto.exist[tt]["code"]+'</h5></td><td width="15%"><h5>'+odonto.exist[tt]["tooth"]+'</h5></td><td width="40%"><h5>'+odonto.exist[tt]["surface"]+'</h5></td></td>';
    			document.getElementById("ebList").appendChild(div);
    			div = document.createElement("tr");
    			div.setAttribute("id", ctrID);
    			div.setAttribute("class", "error");
    			div.innerHTML = '<td colspan="4"><h5>'+qCODES[odonto.exist[tt]["code"]].fr+'</h5></td>';
    			document.getElementById("ebList").appendChild(div);
    			if (odonto.exist[tt]["note"].length > 0)
    			{
    				div = document.createElement("tr");
    				div.setAttribute("id", ctrID);
    				div.setAttribute("class", "error");
    				div.innerHTML = '<td colspan="4"><h5>'+odonto.exist[tt]["note"]+'</h5></td>';
    				document.getElementById("ebList").appendChild(div);
    			}
    			ctrID = ctrID + 1;
    	  	}
      document.getElementById("afList").innerHTML = "";
      ctrID = 0;
      for (tt in odonto.todo)
      		{
    			div = document.createElement("tr");
    			div.setAttribute("id", "OAF"+ctrID);
    			div.setAttribute("class", "error");
    			div.innerHTML = '<td width="10%"><h4><input id="xOAF'+ctrID+'" type="checkbox" tabindex="'+ctrID+'" class="hidden"></h4></td><td width="25%"><h5>'+odonto.todo[tt]["code"]+'</h5></td><td width="15%"><h5>'+odonto.todo[tt]["tooth"]+'</h5></td><td width="40%"><h5>'+odonto.todo[tt]["surface"]+'</h5></td></td>';
    			document.getElementById("afList").appendChild(div);
    			div = document.createElement("tr");
    			div.setAttribute("id", ctrID);
    			div.setAttribute("class", "error");
    			div.innerHTML = '<td colspan="4"><h5>'+qCODES[odonto.todo[tt]["code"]].fr+'</h5></td>';
    			document.getElementById("afList").appendChild(div);
    			if (odonto.todo[tt]["note"].length > 0)
    			{
    				div = document.createElement("tr");
    				div.setAttribute("id", ctrID);
    				div.setAttribute("class", "error");
    				div.innerHTML = '<td colspan="4"><h5>'+odonto.todo[tt]["note"]+'</h5></td>';
    				document.getElementById("afList").appendChild(div);
    			}
    			ctrID = ctrID + 1;
    	  	}
      document.getElementById("asList").innerHTML = "";
      ctrID = 0;
      for (tt in odonto.observ)
      		{
    			div = document.createElement("tr");
    			div.setAttribute("id", "OAS"+ctrID);
    			div.setAttribute("class", "error");
    			div.innerHTML = '<td width="10%"><h4><input id="xOAS'+ctrID+'" type="checkbox" tabindex="'+ctrID+'" class="hidden"></h4></td><td width="25%"><h5>'+odonto.observ[tt]["code"]+'</h5></td><td width="15%"><h5>'+odonto.observ[tt]["tooth"]+'</h5></td><td width="40%"><h5>'+odonto.observ[tt]["surface"]+'</h5></td></td>';
    			document.getElementById("asList").appendChild(div);
    			div = document.createElement("tr");
    			div.setAttribute("id", ctrID);
    			div.setAttribute("class", "error");
    			div.innerHTML = '<td colspan="4"><h5>'+qCODES[odonto.observ[tt]["code"]].fr+'</h5></td>';
    			document.getElementById("asList").appendChild(div);
    			if (odonto.observ[tt]["note"].length > 0)
    			{
    				div = document.createElement("tr");
    				div.setAttribute("id", ctrID);
    				div.setAttribute("class", "error");
    				div.innerHTML = '<td colspan="4"><h5>'+odonto.observ[tt]["note"]+'</h5></td>';
    				document.getElementById("asList").appendChild(div);
    			}
    			ctrID = ctrID + 1;
    	  	}
      if (isLockedODO)
      {
      	document.getElementById("delODO").setAttribute("class","ui axxium tiny disabled button");
      	//document.getElementById("addTrait").setAttribute("class","ui axxium tiny disabled button");
      }
      else
      {
      	document.getElementById("delODO").setAttribute("class","ui axxium tiny button");
      	//document.getElementById("addTrait").setAttribute("class","ui axxium tiny button");
      }
      drawOdon();
      displaySign(odonto,"ODO");
      }
  }

  //alert("Get the Odonto!");
  xmlhttp2.open("GET","allScriptsv1.py?tx=getJSONsub&sub=odonto&code="+qFileOdo+"&rand="+Math.random(),true);
  xmlhttp2.send();

  }

  function loadODONS(aPat, relBan)
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
      qODONS = JSON.parse(xmlhttp2.responseText);
      curOdo = 0;
      	if (qODONS.files.length > 0)
      	{
      		if (relBan) displaySub("odontos");
      		qFileOdo = qODONS.files[curOdo].file;
      		loadOdonto();
      	}
      	else
      	{
  		var canvas = document.getElementById("odonto"),
    		ctx = canvas.getContext("2d");
		ctx.font="16px Arial";
		ctx.textAlign = "left";
		ctx.strokeStyle = "#000000";
		ctx.fillStyle = "#000000";
		ctx.fillText("Aucun odontogramme",10,20);
      	}
      }
  }

  //alert("Get the Files!");
  xmlhttp2.open("GET","allScriptsv1.py?tx=getALLsub&sub=odonto&patID="+aPat+"&rand="+Math.random(),true);
  xmlhttp2.send();

  }

  function backODO()
  {
      if (curOdo < qODONS.files.length - 1)
      {
      	curOdo = curOdo + 1;
      	qFileOdo = qODONS.files[curOdo].file;
  	loadOdonto();
      }
      displaySub("odontos");
  }

  function forODO()
  {
      if (curOdo > 0)
      {
      	curOdo = curOdo - 1;
      	qFileOdo = qODONS.files[curOdo].file;
  	loadOdonto();
      }
      displaySub("odontos");
  }
  