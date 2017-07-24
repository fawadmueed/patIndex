  
  var thePDF = null;
  var numPages = 0;
  var curPage = 1;

  function nextPage()
  {
      if (curPage < numPages)
      {
      	curPage = curPage + 1;
  	thePDF.getPage(curPage).then(function(page) {
	  displayPage(page);
	});
      }
      displaySub("documents");
  }

  function prevPage()
  {
      if (curPage > 1)
      {
      	curPage = curPage - 1;
  	thePDF.getPage(curPage).then(function(page) {
	  displayPage(page);
	});
      }
      displaySub("documents");
  }
  
  function displayPage(page)
  {
	var scale = 1.5;
	var viewport = page.getViewport(scale);
		  
	var canvas = document.getElementById('pdf-canvas');
	var context = canvas.getContext('2d');
	canvas.height = viewport.height;
	canvas.width = viewport.width;
		  
	var renderContext = {
	  canvasContext: context,
	  viewport: viewport
	};
	page.render(renderContext);
  }
  
  function loadDoc()
  {
  	PDFJS.getDocument("json/documents/"+qFileDoc+".pdf").then(function(pdf) {
  		// you can now use *pdf* here
  		thePDF = pdf;
        	numPages = pdf.numPages;
  		curPage = 1;
  		pdf.getPage(1).then(function(page) {
		  displayPage(page);
		  cPage = curPage + " / " + numPages;
		  document.getElementById('pageCount').innerHTML = cPage;
		});
	});
  }

  function loadDOCS(aPat, relBan)
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
      qDOCS = JSON.parse(xmlhttp2.responseText);
      curDoc = 0;
      	//alert(qDOCS.files.length);
      	if (qDOCS.files.length > 0)
      	{
      		if (relBan) displaySub("documents");
      		qFileDoc = qDOCS.files[curDoc].file;
      		loadDoc();
      		document.getElementById("noDocs").innerHTML = "";
      	}
      	else
      	{
    	  	document.getElementById("noDocs").innerHTML = '<td colspan="4"><h3>Aucun document</h3></td>';
    	  	canvas = document.getElementById('pdf-canvas');
		ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
      	}
      }
  }

  //alert("Get the Files!");
  xmlhttp2.open("GET","allScriptsv1.py?tx=getDOCv2&patID="+aPat+"&rand="+Math.random(),true);
  xmlhttp2.send();

  }
  
  function olduploadDoc()
  {
      //alert(aFile);
      myDocs = document.getElementById('docCapture');
      docFile = myDocs.files[0];
      var blob_url = window.URL.createObjectURL(docFile);
      //alert(blob_url);
      if (blob_url.length > 0)
      {
    	var reader = new FileReader();
    	reader.onload = function(event) {  
    	  object = {};
    	  object.filename = docFile.name;
    	  object.data = event.target.result;
    	  setTimeout(postDocUpload, 3000);
    	};  
    	reader.readAsDataURL(docFile);     
      }
      else
      {
      	alert("src", "Erreur!");
      }
  }

  function exuploadDoc()
  {
        var fd = new FormData($("#fileinfo"));
        fd.append("tx", "uploadDOC");
        fd.append("patID", curPatient);
      	myDocs = document.getElementById('docCapture');
      	fd.append("file", myDocs.files[0]);
    	$.ajax({url: "allScriptsv1.py",
          type: 'POST',
          data: fd,
          cache: false,
          contentType: false,
          processData: false,
          success: function(data, status, xhr) {
		alert('File uploaded! '+data.message);
          },
	  error: function (data) {
		alert('There was an error uploading your file!');
	  }
    	}); 
  }

  function backDOC()
  {
      if (curDoc < qDOCS.files.length - 1)
      {
      	curDoc = curDoc + 1;
      	qFileDoc = qDOCS.files[curDoc].file;
  	loadDoc();
      }
      displaySub("documents");
  }

  function forDOC()
  {
      if (curDoc > 0)
      {
      	curDoc = curDoc - 1;
      	qFileDoc = qDOCS.files[curDoc].file;
  	loadDoc();
      }
      displaySub("documents");
  }