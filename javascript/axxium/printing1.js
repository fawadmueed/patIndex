/**
 * Draws a dotted line on a jsPDF doc between two points.
 * Note that the segment length is adjusted a little so
 * that we end the line with a drawn segment and don't
 * overflow.
 */
function dottedLine(doc, xFrom, yFrom, xTo, yTo, segmentLength)
{
    // Calculate line length (c)
    var a = Math.abs(xTo - xFrom);
    var b = Math.abs(yTo - yFrom);
    var c = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));

    // Make sure we have an odd number of line segments (drawn or blank)
    // to fit it nicely
    var fractions = c / segmentLength;
    var adjustedSegmentLength = (Math.floor(fractions) % 2 === 0) ? (c / Math.ceil(fractions)) : (c / Math.floor(fractions));

    // Calculate x, y deltas per segment
    var deltaX = adjustedSegmentLength * (a / c);
    var deltaY = adjustedSegmentLength * (b / c);

    var curX = xFrom, curY = yFrom;
    while (curX <= xTo && curY <= yTo)
    {
        doc.line(curX, curY, curX + deltaX, curY + deltaY);
        curX += 2*deltaX;
        curY += 2*deltaY;
    }
}

  function printRDV(doc,topX,topY)
  {
	doc.setFontSize(10);
	doc.setDrawColor(0);
	doc.setFillColor(0,0,0);
	doc.rect(topX, topY, 100, 5, 'F'); // filled black square
	doc.setTextColor(255,255,255);
	doc.setFontType("bold");
	doc.text(topX+9, topY+3.5, 'PROCHAIN RENDEZ-VOUS / NEXT APPOINTMENT');
	doc.rect(topX, topY+6, 100, 20);
	doc.setTextColor(0,0,0);
	doc.text(topX+2, topY+12, 'DR '+curDentist+', '+curTitle);
	doc.setFontType("normal");
	doc.text(topX+2, topY+18, 'TEL: '+qParams["tel"]+' * '+qPAT.patients[curPatRow].last+", "+qPAT.patients[curPatRow].first);
	doc.text(topX+2, topY+23, 'Avec / With '+curDentist);
  }

  function printCLIN(doc,topX,topY)
  {
	doc.setFontSize(12);
	doc.setDrawColor(0);
	doc.setFillColor(0,0,0);
	doc.rect(topX+1, topY, 199, 20);
	//doc.addImage(qParams["imgD"], qParams["imgT"], topX+1, topY+1, 10, 10);
	doc.setFontType("bold");
	doc.text(topX+60, topY+6, qParams["name"]);
	doc.text(topX+68, topY+11, 'DR '+curDentist+', '+curTitle);
	doc.setFontType("normal");
	doc.text(topX+31, topY+16, qParams["adr"]+' TEL: '+qParams["tel"]);
  }

  function printDATE(doc,topX,topY)
  {
	doc.setFontSize(10);
	doc.setFontType("normal");
	doc.setDrawColor(0);
	doc.setFillColor(0,0,0);
	doc.rect(topX+1, topY, 36, 5);
  	var d = new Date();
  	var ddj = d.getFullYear() + '/' + twoDigits(d.getMonth() + 1) + '/' + twoDigits(d.getDate());
	doc.text(topX+2, topY+4, "Date "+ddj);
	doc.rect(topX+37, topY, 63, 5);
	doc.text(topX+38, topY+4, "Reference ");
	doc.rect(topX+101, topY, 99, 5);
	doc.text(topX+102, topY+4, curTitle+" "+curDentist);
  }

  function printPERS(doc,topX,topY)
  {
	doc.setFontSize(10);
	doc.setFontType("normal");
	doc.setDrawColor(0);
	doc.setFillColor(0,0,0);
	doc.rect(topX+1, topY, 80, 16);
  	doc.text(topX+5, topY+3.5, "Personne responsable / Party responsible ");
	doc.text(topX+2, topY+7, qPAT.patients[curPatRow].last+", "+qPAT.patients[curPatRow].first);
  	doc.text(topX+2, topY+11, "23 RUE DE LA CONCORDE");
  	doc.text(topX+2, topY+15, "LAVAL QC H7N 3K5");
	doc.rect(topX+82, topY, 118, 16);
  	doc.text(topX+83, topY+4, "# confirmation: ");
  	doc.text(topX+83, topY+7, "   authorization ");
  	doc.text(topX+83, topY+11, "# plan de traitement pre-autorise: ");
  	doc.text(topX+83, topY+14, "   pre-authorized treatment plan ");
  }

  function printPAT(doc,topX,topY)
  {
	doc.setFontSize(10);
	doc.setFontType("normal");
	doc.setDrawColor(0);
	doc.setFillColor(0,0,0);
	doc.rect(topX+1, topY, 80, 12);
  	doc.text(topX+2, topY+4, "Patient "+qPAT.patients[curPatRow].last+", "+qPAT.patients[curPatRow].first);
	doc.text(topX+2, topY+9, '# dossier: '+curPatient);
	doc.text(topX+25, topY+9, 'Ass. Mal. #: '+qPAT.patients[curPatRow].NAM);
  }

  function printAMT(doc,topX,topY,ope,tfr,ten,amt)
  {
	doc.setFontSize(10);
	doc.setFontType("normal");
	doc.setDrawColor(0);
	doc.setFillColor(0,0,0);
	doc.rect(topX+1, topY, 80, 8);
	doc.line(topX+55, topY, topX+55, topY+8);
  	doc.text(topX+4, topY+5, ope);
  	doc.text(topX+8, topY+4, tfr);
	doc.text(topX+8, topY+7, ten);
	doc.text(topX+67+(1.5*(7-amt.length)), topY+5, amt);
  }

  function printGRID(doc,topX,topY)
  {
	doc.setFontSize(8);
	doc.setFontType("normal");
	doc.setDrawColor(0);
	doc.setFillColor(0,0,0);
	doc.rect(topX, topY, 118, 8);
  	doc.text(topX+25, topY+5, "Description");
	doc.line(topX+60, topY, topX+60, topY+8);
  	doc.text(topX+61, topY+5, "Code");
	doc.line(topX+73, topY, topX+73, topY+8);
  	doc.text(topX+75, topY+3.5, "Dent");
  	doc.text(topX+74.5, topY+7, "Tooth");
	doc.line(topX+85, topY, topX+85, topY+8);
  	doc.text(topX+86, topY+5, "Surface");
	doc.line(topX+100, topY, topX+100, topY+8);
  	doc.text(topX+101, topY+3.5, "Honoraires");
  	doc.text(topX+105, topY+7, "Fees");

	doc.rect(topX, topY+9, 118, 52);
	doc.line(topX+60, topY+9, topX+60, topY+61);
	doc.line(topX+73, topY+9, topX+73, topY+61);
	doc.line(topX+85, topY+9, topX+85, topY+61);
	doc.line(topX+100, topY+9, topX+100, topY+61);
  }

  function printMESS(doc,topX,topY)
  {
	doc.setFontSize(9);
	doc.setFontType("normal");
	doc.setDrawColor(0);
	doc.setFillColor(0,0,0);
	doc.rect(topX, topY, 118, 8);
  	doc.text(topX+2, topY+3.5, "MESSAGE");
  	doc.text(topX+104, topY+3.5, "PAGE 1");
  	doc.text(topX+106, topY+7, "DE 1");
  }

  function printITEM(doc,topX,topY,des,cod,den,sur,hon)
  {
	doc.setFontSize(7);
	doc.setFontType("normal");
	doc.setDrawColor(0);
	doc.setFillColor(0,0,0);
  	doc.text(topX+2, topY, des);
  	doc.text(topX+61, topY, cod);
  	doc.text(topX+75, topY, den);
  	doc.text(topX+86, topY, sur);
  	doc.text(topX+109+(0.5*(6-(hon.length))), topY, hon);
  }

  function printRAMQ()
  {
    var doc = new jsPDF();

	//alert("Start print RAMQ");
	printRDV(doc,2,2);
	printRDV(doc,103,2);
	doc.setLineWidth(0.5);
	//doc.line(2, 24, 202, 24);
	dottedLine(doc, 2, 24, 202, 24, 3);
	doc.setLineWidth(0.1);
	doc.rect(2, 25, 201, 111);
	printCLIN(doc,2,26);
	printDATE(doc,2,42);
	printPERS(doc,2,48);
	printPAT(doc,2,65);
	printAMT(doc,2,78,"","Solde anterieur","Previous balance","37.00");
	printAMT(doc,2,86,"+","Honoraires","Fees","293.00");
	printAMT(doc,2,94,"=","Vous devez ce montant","You owe this amount","330.00");
	printAMT(doc,2,102,"-","Montant paye par patient","Amount paid by patient","140.00");
	printAMT(doc,2,110,"-","Montant paye par l'assurance","Amount paid by insurance","0.00");
	printAMT(doc,2,118,"=","Solde a payer","Balance due","190.00");
	printAMT(doc,2,127,"","Cheques post-dates","Post-dated checks","");
	printGRID(doc,84,65);
	printMESS(doc,84,127);
	printITEM(doc,84,78,"SOLDE ANTERIEUR","","","","37.00");
	var coy = 82;
	for (fitem in globRamqBillInfo["info"][1])
	{
		printITEM(doc,84,coy,fitem.Description,fitem.Code,fitem.Dent,fitem.Surface,fitem.Frais);
		coy = coy + 4;
	}
	//printITEM(doc,84,82,"COMPOSITE, PREMOLAIRE, TROIS SURFACES","23213","15","DMO","190.00");
	//printITEM(doc,84,86,"COMPOSITE, PREMOLAIRE, UNE SURFACE","23211","45","O","103.00");

  	doc.save('doc.pdf');

  	//nam = qPAT.patients[curPatRow].NAM;
	//var string = doc.output('datauristring');
	//var x = window.open();
	//x.document.open();
  	//x.document.location=string;
  }

  function printHEA(doc,topX,topY)
  {
	doc.setFontSize(10);
	doc.setFontType("normal");
	doc.setDrawColor(0);
	doc.setFillColor(0,0,0);
  	doc.text(topX+2, topY, "123456789");
	doc.text(topX+2, topY+7, qPAT.patients[curPatRow].last+", "+qPAT.patients[curPatRow].first);
  	doc.text(topX+2, topY+11, "23 RUE DE LA CONCORDE");
  	doc.text(topX+2, topY+15, "LAVAL QC H7N 3K5");
  	doc.text(topX+2, topY+19, "(514) 555-1234");
	doc.text(topX+68, topY+7, curDentist+', '+curTitle);
	doc.text(topX+68, topY+11, qParams["adr"]);
	doc.text(topX+68, topY+15, qParams["tel"]);
  }

  function printORD2()
  {
    var doc = new jsPDF();

	alert("Start printing INS");
	printHEA(doc,2,15);
	doc.setLineWidth(0.5);
	//printITEM(doc,84,78,"SOLDE ANTERIEUR","","","","37.00");
	//printITEM(doc,84,82,"COMPOSITE, PREMOLAIRE, TROIS SURFACES","23213","15","DMO","190.00");
	//printITEM(doc,84,86,"COMPOSITE, PREMOLAIRE, UNE SURFACE","23211","45","O","103.00");

  	doc.save('doc.pdf');

  	//nam = qPAT.patients[curPatRow].NAM;
	//var string = doc.output('datauristring');
	//var x = window.open();
	//x.document.open();
  	//x.document.location=string;
  }