
  function sendCal()
  {
        rdvList = { };
  	for (tt in qPLAN.todo)
  	{
  		//alert(rdvList[qPLAN.todo[tt]["rdv"]]);
  		if (rdvList[qPLAN.todo[tt]["rdv"]])
  		{
  			rdvList[qPLAN.todo[tt]["rdv"]].push({ "code" : qPLAN.todo[tt]["code"], "unites" : qPLAN.todo[tt]["unites"] });
  		}
  		else
  		{
  			rdvList[qPLAN.todo[tt]["rdv"]] = [{ "code" : qPLAN.todo[tt]["code"], "unites" : qPLAN.todo[tt]["unites"] }];
  		}
  	}
   // previous link fawad: $.get("http://localhost/PatientService/PatientInfo.asmx/getAppointments?id="+curPatient+"&app="+JSON.stringify(rdvList), function(data, status){
  	$.get("http://192.168.2.15:8080/PatientInfo.asmx/Initialize?initial=&id="+curPatient+"&app="+JSON.stringify(rdvList), function(data, status){
	        //alert("Data: " + data + "\nStatus: " + status);
	        //var xmlString = (new XMLSerializer()).serializeToString(data);
	        //alert(xmlString);
	        //var pos1 = xmlString.indexOf('{');
	        //var pos2 = xmlString.indexOf('}');
	        //alert(pos1+"/"+pos2);
	        //alert(xmlString.substring(pos1,pos2+1));
	        //patAxxium = JSON.parse(xmlString.substring(pos1,pos2+1));
	        //alert(patAxxium["NAM"]);
    	 });
  }
  
  function delPLA()
  {
  	var ctrp = 0;
  	var qNewTodo = [ ];
  	for (tt in qPLAN.todo)
  	{
  	  if (document.getElementById("xPLA"+ctrp).checked)
  	  {
  		//qPLAN.todo.push({"code": odonto.todo[tt]["code"], "tooth": odonto.todo[tt]["tooth"], "surface": odonto.todo[tt]["surface"], "prix": //qCODES[odonto.todo[tt]["code"]].prix, "rdv": 1});
  	  }
  	  else
  	  {
  		qNewTodo.push({"code": qPLAN.todo[tt]["code"], "tooth": qPLAN.todo[tt]["tooth"], "surface": qPLAN.todo[tt]["surface"], "unites": qPLAN.todo[tt]["unites"], "prix": qPLAN.todo[tt]["prix"], "rdv": qPLAN.todo[tt]["rdv"]});
  	  }
  	  ctrp = ctrp + 1;
  	}
  	qPLAN.todo = qNewTodo;
  	uploadPLA(qFilePlan);
  	//setTimeout(loadPLANS(curPatient), 500);
  }
  
  function createPLA()
  {
  	if (qPLANS.files.length > 0)
  	{
  		qPLAN["locked"] = "Y";
  		uploadPLA(qFilePlan);
  	}
  	var d = new Date();
  	var ddj = d.getFullYear() + '/' + twoDigits(d.getMonth() + 1) + '/' + twoDigits(d.getDate());
  	var hdj = twoDigits(d.getHours()) + ':' + twoDigits(d.getMinutes());
  	qPLAN = { "id" : curPatient, "date" : ddj, "time" : hdj, "todo" : [ ] };
  	for (tt in odonto.todo)
  	{
  		qPLAN.todo.push({"code": odonto.todo[tt]["code"], "tooth": odonto.todo[tt]["tooth"], "surface": odonto.todo[tt]["surface"], "unites": qCODES[odonto.todo[tt]["code"]].unites, "prix": qCODES[odonto.todo[tt]["code"]].prix, "rdv": 1});
  	}
  	qFilePlan = "L_" + curPatient + "_" + d.getTime();
  	uploadPLA(qFilePlan);
  	//setTimeout(loadPLANS(curPatient), 3000);
  }
  
  function uploadPLA(aName)
  {
        $.post("uploadJSONsub.py", {sub: "plans", name: aName, json: JSON.stringify(qPLAN)}, function(result){
            //alert("Le plan été enregistré. "+aName);
            loadPLANS(curPatient, true);
        });
  }
  
  function setRDV(aNum,aLine)
  {
  	document.getElementById("k1"+aLine).setAttribute("class","ui axxium tiny button");
  	document.getElementById("k2"+aLine).setAttribute("class","ui axxium tiny button");
  	document.getElementById("k3"+aLine).setAttribute("class","ui axxium tiny button");
  	document.getElementById("k4"+aLine).setAttribute("class","ui axxium tiny button");
  	document.getElementById("k5"+aLine).setAttribute("class","ui axxium tiny button");
  	document.getElementById("k"+aNum+aLine).setAttribute("class","ui red tiny button");
  	qPLAN.todo[aLine]["rdv"] = aNum;
  	uploadPLA(qFilePlan);
  }
  
  function upUNIT(aLine)
  {
  	var units = qPLAN.todo[aLine]["unites"];
  	document.getElementById("units"+aLine).innerHTML = units + 1;
  	qPLAN.todo[aLine]["unites"] = units + 1;
  	uploadPLA(qFilePlan);
  }
  
  function downUNIT(aLine)
  {
  	var units = qPLAN.todo[aLine]["unites"];
  	if (units > 0)
  	{
  		document.getElementById("units"+aLine).innerHTML = units - 1;
  		qPLAN.todo[aLine]["unites"] = units - 1;
  		uploadPLA(qFilePlan);
  	}
  }
  
  function loadPlan()
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
      qPLAN = JSON.parse(xmlhttp2.responseText);
      isLockedPLA = false;
      if (qPLAN.date)
      {
  	var d = new Date();
  	var ddj = d.getFullYear() + '/' + twoDigits(d.getMonth() + 1) + '/' + twoDigits(d.getDate());
      	if (qPLAN.date != ddj) isLockedPLA = true;
      }
      document.getElementById("eachPlan").innerHTML = "";
      totPlan = 0;
      var ctrp = 0;
      for (tt in qPLAN.todo)
      		{
    			div = document.createElement("tr");
    			div.setAttribute("id", "PLA"+ctrp);
    			var toDis = (isLockedPLA) ? "disabled ":"";
    			div.innerHTML = '<td><h4><input id="xPLA'+ctrp+'" type="checkbox" tabindex="'+ctrp+'" class="hidden"></h4></td><td><h4>'+qPLAN.todo[tt]["code"]+'</h4></td><td><h4>'+qPLAN.todo[tt]["tooth"]+'</h4></td><td><h4>'+qPLAN.todo[tt]["surface"]+'</h4></td><td><h4>'+qCODES[qPLAN.todo[tt]["code"]].fr+'</h4></td><td><h4><div class="ui axxium mini '+toDis+'button" id="pUp'+ctrp+'" onclick="upUNIT('+ctrp+');"><i class="arrow up icon"></i></div><div class="ui axxium mini '+toDis+'button" id="pDown'+ctrp+'" onclick="downUNIT('+ctrp+');"><i class="arrow down icon"></i></div></h4></td><td><h4 id="units'+ctrp+'">'+qPLAN.todo[tt]["unites"]+'</h4></td><td><h4>'+qPLAN.todo[tt]["prix"]+' $</h4></td><td><h4>&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny '+toDis+'button" id="k1'+ctrp+'" onclick="setRDV(1,'+ctrp+');">1</div>&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny '+toDis+'button" id="k2'+ctrp+'" onclick="setRDV(2,'+ctrp+');">2</div>&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny '+toDis+'button" id="k3'+ctrp+'" onclick="setRDV(3,'+ctrp+');">3</div>&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny '+toDis+'button" id="k4'+ctrp+'" onclick="setRDV(4,'+ctrp+');">4</div>&nbsp;&nbsp;&nbsp;<div class="ui axxium tiny '+toDis+'button" id="k5'+ctrp+'" onclick="setRDV(5,'+ctrp+');">5</div></h4></td>';
    			document.getElementById("eachPlan").appendChild(div);
    			totPlan = totPlan + qPLAN.todo[tt]["prix"];
    			document.getElementById("k"+qPLAN.todo[tt]["rdv"]+ctrp).setAttribute("class",'ui red tiny '+toDis+'button');
    			ctrp = ctrp + 1;
    	  	}
      if (isLockedPLA)
      {
      	document.getElementById("delPLA").setAttribute("class","ui axxium tiny disabled button");
      	//document.getElementById("addTrait").setAttribute("class","ui axxium tiny disabled button");
      }
      else
      {
      	document.getElementById("delPLA").setAttribute("class","ui axxium tiny button");
      	//document.getElementById("addTrait").setAttribute("class","ui axxium tiny button");
      }
      //alert(totPlan+" $");
      document.getElementById("totPlan").innerHTML = totPlan+" $";
      displaySign(qPLAN,"PLA");
      }
  }

  //alert("Get the qPLAN!");
  xmlhttp2.open("GET","allScriptsv1.py?tx=getJSONsub&sub=plans&code="+qFilePlan+"&rand="+Math.random(),true);
  xmlhttp2.send();

  }


  function loadPLANS(aPat, relBan)
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
      qPLANS = JSON.parse(xmlhttp2.responseText);
      curPlan = 0;
      	if (qPLANS.files.length > 0)
      	{
      		if (relBan) displaySub("plans");
      		qFilePlan = qPLANS.files[curPlan].file;
      		loadPlan();
      	}
      	else
      	{
      		div = document.createElement("tr");
		aLine = '<td colspan="6"><h3>Aucun plan de traitement</h3></td>';
      	  	div.innerHTML = aLine;
    	  	document.getElementById("eachPlan").appendChild(div);
      	}
      }
  }

  //alert("Get the Files!");
  xmlhttp2.open("GET","allScriptsv1.py?tx=getALLsub&sub=plans&patID="+aPat+"&rand="+Math.random(),true);
  xmlhttp2.send();

  }

  function backPLA()
  {
      if (curPlan < qPLANS.files.length - 1)
      {
      	curPlan = curPlan + 1;
      	qFilePlan = qPLANS.files[curPlan].file;
  	loadPlan();
      }
      displaySub("plans");
  }

  function forPLA()
  {
      if (curPlan > 0)
      {
      	curPlan = curPlan - 1;
      	qFilePlan = qPLANS.files[curPlan].file;
  	loadPlan();
      }
      displaySub("plans");
  }