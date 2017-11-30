
$(document).ready(function(){

  
  
  
  $(document.body).on("submit","#form_dentiste_Up", function(event) {
                submitForm(this);
              });

  $(document.body).on("submit","#form_chirurgiens_Up", function(event) {
                submitForm(this);
                
              });
  $(document.body).on("submit","#form_denturologiste_Up", function(event) {
              submitForm(this);
              });
 

$(document.body).on('focusout',"form :text",function(){
                $(this).val($(this).val().toUpperCase());
              })            
 
   });




function populate_factTbl_update(testArrayTable){
		
		var arrayToPopulate=tableDataAmq(testArrayTable);

		arrGrilleDeFacturation_update=arrayToPopulate;
		// console.log(arrGrilleDeFacturation_update);

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
                   tblData=$('<td>').append('<div class="ui axxium tiny button" onclick="modFactTableMore_update(this,arrGrilleDeFacturation_forms_update);;" >Plus</div><div class="ui axxium tiny button" onclick="deleteRow(this);" >Supprimer</div>');
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


function modFactTableMore_update(x,arrGrilleDeFacturation_forms_update)
{ 
	
  var row_id=$(x).closest('tr').attr('id');
  
   switch(dent_Type){
      
      case 'Dentiste':
              var data=$('#div_dentiste_Up').html();
              $('#modal_factTbl_more_Up').html(data); 
              $('form #rowId_dent_Up').val(row_id); //Assign id of Row Working - to the Form 
              var thisFromData=getThisFormData(row_id,arrGrilleDeFacturation_forms_update);  //gets the Complete Array of FORM Data to populate 
              updatedPopulateForm('form_dentiste_Up',thisFromData);
              break;

      case 'Chirurgiens':
      
              var data=$('#div_chirurgiens_Up').html();
              $('#modal_factTbl_more_Up').html(data);
              $('form #rowId_chir_Up').val(row_id); //Assign id of Row Working - to the Form 
              var thisFromData=getThisFormData(row_id,arrGrilleDeFacturation_forms_update);
              updatedPopulateForm('form_chirurgiens_Up',thisFromData);
              
              break;
      case 'Denturologiste':
      
              var data=$('#div_denturologiste_Up').html();
              $('#modal_factTbl_more_Up').html(data);
              $('form #rowId_dentu_Up').val(row_id); //Assign id of Row Working - to the Form 
              var thisFromData=getThisFormData(row_id,arrGrilleDeFacturation_forms_update);
              updatedPopulateForm('form_denturologiste_Up',thisFromData);
      
              break;
      default:
              $('#modal_factTbl_more_Up').html('<h1>Error Aquiring the Dentist Type</h1>');

  }
  $('.modalFactTableMore_Up').modal('show');
}

function updatedPopulateForm(formname,thisFromData)
{ 
   if(thisFromData!="")
    {
      $("#"+formname).deserialize(thisFromData);

      if(formname=='form_dentiste'){
        
        $.each(thisFromData,function(id,val){
        
        if(val.name=='medi_com_list'){
        console.log(val.value);
        $('#medi_com_list').append('<option selected="selected">'+val.value+'</option>')
        }
        
        if(val.name=='elem_meas_list'){
        console.log(val.value);
        $('#elem_meas_list').append('<option selected="selected">'+val.value+'</option>')
        }


     })
  
      }
      else if(formname=='form_chirurgiens'){

         $.each(thisFromData,function(id,val){
        
        if(val.name=='medi_com_list_chir'){
        console.log(val.value);
        $('#medi_com_list_chir').append('<option selected="selected">'+val.value+'</option>')
        }
        
        if(val.name=='elem_meas_list'){
        console.log(val.value);
        $('#elem_meas_list').append('<option selected="selected">'+val.value+'</option>')
        }


     })

      }
      else if(formname=='form_denturologiste'){

      }
    }

 }

function getThisFormData(row_id,arrGrilleDeFacturation_forms_update){
  
  var arrayToPopulateForm=[];

  $.each(arrGrilleDeFacturation_forms_update,function(idx,value){
    $.each(value,function(id,val){
      if(val.value==row_id){
        arrayToPopulateForm=value;
      }

    })
  })
  return arrayToPopulateForm;
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

    var key='ramq_id';
    var value=$(val).attr('ramq_id');
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

function Regie_fact_modal()
   {

    populate_factTbl_update(arrGrilleDeFacturation_update);
    

    $('.modal_regie_fact_modal').modal('show');

   }

function submitForm_Up(thisForm){
	event.preventDefault();
	var moreInfoArray_Up=$(thisForm).serializeArray();
	var checkIfUpdate=updateArray_Up('row_id',moreInfoArray[0].value,moreInfoArray_Up);
	$('.modalFactTableMore_Up').modal('hide');
	if(checkIfUpdate){
	  arrGrilleDeFacturation_forms_update.push(moreInfoArray);


	}
		}


function updateArray_Up(namR,valR,newArray){
   // Update complete array if Matched in its object nameR and valR send i.e : nameR=row_id valR=2
  var nameD=namR;
  var valueD=valR;
  var newArray=newArray;

       if(arrGrilleDeFacturation_forms_update.length==0)
       { //first time when form is Empty
         return true;
       }

   for(var i=0;i<arrGrilleDeFacturation_forms_update.length;i++)
        {
          for(j=0;j<arrGrilleDeFacturation_forms_update[i].length;j++)
          {
            if(arrGrilleDeFacturation_forms_update[i][j].name==nameD && arrGrilleDeFacturation_forms_update[i][j].value==valueD)
            {
              arrGrilleDeFacturation_forms_update[i]=newArray;
              return false;
              
            }
          }
        }
    return true;
    }


    // for(var i=0;i<arrGrilleDeFacturation_forms_update.length;i++)
    //     {
    //       for(var j=0;j<arrGrilleDeFacturation_forms_update[i].length;j++)
    //       {
    //         if((arrGrilleDeFacturation_forms_update[i][j].name==nameD)&&(arrGrilleDeFacturation_forms_update[i][j].value==valR))
    //         {

    //           console.log('Old array :');
    //           console.log(arrGrilleDeFacturation_forms_update[i]);
    //           arrGrilleDeFacturation_forms_update[i]=newArray;
    //           console.log('new Array');
    //           console.log(newArray);
    //           // return true;
              
            
              
    //         }
          
    //       }
    //     }
