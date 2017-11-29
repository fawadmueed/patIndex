
function populate_fact_update(testArrayTable){
		
		var arrayToPopulate=tableDataAmq(testArrayTable);

		arrGrilleDeFacturation_update=arrayToPopulate;
		console.log(arrGrilleDeFacturation_update);

		$('#factTableBody_regie tr').remove();
		
		var tblBody=$('#factTableBody_regie');

          $.each(arrayToPopulate,function(idx,val){
            // val - each row 
            if(val.ramq_id)
            {
              //only Rows with ramq_id ( RAMQ )
            fact_tbl_row_id=val.row_id;
            ramq_id=val.ramq_id

            tblRow=$('<tr>').attr('id',fact_tbl_row_id).attr('ramq_id',val.ramq_id);

            var fields=['Type','Dent','Surface','Code','Description','Frais','Honoraires','Total','Prod','codeRole'];
            
                 for(i=0;i<10;i++)
                  {

                       switch (i) {

                       case 0: //Type
                       tblData=$('<td>').attr('data-target',fields[i]).text(val.Type);
                       break;

                       case 1:
                       tblData=$('<td>').attr('data-target',fields[i]).text(val.Dent);
                       break;

                       case 2:
                       tblData=$('<td>').attr('data-target',fields[i]).text(val.Surface);
                       break;

                       case 3:
                       tblData=$('<td>').attr('data-target',fields[i]).text(val.Code);
                       break;

                       case 4:
                       tblData=$('<td>').attr('data-target',fields[i]).text(val.Description);
                       break;

                       case 5:
                       tblData=$('<td>').attr('data-target',fields[i]).text(val.Frais);
                      break;

                       case 6:
                       tblData=$('<td>').attr('data-target',fields[i]).text(val.Honoraires);
                       break;

                       case 7:
                       tblData=$('<td>').attr('data-target',fields[i]).text(val.Total);
                       break;

                       case 8:
                       tblData=$('<td>').attr('data-target',fields[i]).text(val.Prod);
                       break;

                       case 9:
                       tblData=$('<td>').attr('data-target',fields[i]).text(val.codeRole);
                       break;
                      }
                    tblData.appendTo(tblRow);
                  }
                   tblData=$('<td>').append('<div class="ui axxium tiny button" onclick="findTableData(this);" >Plus</div><div class="ui axxium tiny button" onclick="deleteRow(this);" >Supprimer</div>');
               tblData.appendTo(tblRow);
            }
         
              

                tblRow.appendTo(tblBody);
        });

}

function tableDataAmq(updateArray){

	var update_amq_arry=[];

	$.each(updateArray,function(id,val){

		$.each(val,function(idx,valx){
			

		if((valx=="AMQ")||(valx=="BES")||(valx=="HOP")){

			update_amq_arry.push(val);

		}
		})
	})
	return update_amq_arry;
}

function allTrData_update(){

  var count_ramq=0;
  var count_insur=0;

  arrGrilleDeFacturation_update=[]
  
  var mytrs=$('#factTableBody_regie tr');
// console.log(mytrs);
  $.each(mytrs, function(idx,val){
    
    var myObjects={};
    // For each TR
    var mytds=$(val).children();

    var key='row_id';
    var value=$(val).attr('id');
    myObjects[key]=value;
    
    $.each(mytds,function(idx,val){

      var key=$(val).attr('data-target');
      var value=$(val).text();

      if(key=='Type'&&(value=='AMQ'||value=='BES'||value=='HOP')) {
        // Count Table Row entries for type RAMQ
        count_ramq=count_ramq+1;
        var ramqId='ramq_id';
        var valID=count_ramq;
        myObjects[ramqId]=valID;

      }

      if(key=='Type'&&((!(value=='AMQ'||value=='BES'||value=='HOP'))&&(!(value=='CAS')) )) {
        // Count Table Row entries for type Insurance
        count_insur=count_insur+1;
        console.log('INSUR count'+ count_insur);
      }

      myObjects[key]=value;

      })

      arrGrilleDeFacturation_update.push(myObjects);
});
   if((count_ramq>=10)||(count_insur>=7))
   {
    alert('Limit Exceeded! Allow Limit : RamQ Bill = 10 Lines , Insurance Bill = 7 Lines. Delete few entries to proceed');
   }
   else{

    console.log(arrGrilleDeFacturation_update); 
    
   }
  

}