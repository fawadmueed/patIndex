
$(document).ready(function(){

  
  $(document.body).on("keypress","#factTableBody_regie tr td[data-target='codeRole']", function(e) {

  				if(e.which == 13) {
                add_empty_row();
            }
            return e.which!=13;
              });
  
  $(document.body).on("submit","#form_dentiste_Up", function(event) {

                submitForm_Up(this);
              });

  $(document.body).on("submit","#form_chirurgiens_Up", function(event) {
                submitForm_Up(this);
                
              });
  $(document.body).on("submit","#form_denturologiste_Up", function(event) {
              submitForm_Up(this);
              });
 

$(document.body).on('focusout',"form :text",function(){
                $(this).val($(this).val().toUpperCase());
              })            
 
   });




function populate_table(arrToPopTabl){
		
		var arrayToPopulate=arrToPopTabl; 

		// arrGrilleDeFacturation_update=arrayToPopulate;
		// console.log(arrGrilleDeFacturation_update);

		
		var tblBody=$('#factTableBody_regie');

          $.each(arrayToPopulate,function(idx,val){
            // val - each row 
            if(val.ramq_id)
            {
              //only Rows with ramq_id ( RAMQ )
            // fact_tbl_row_id_=val.row_id;
            // ramq_id=val.ramq_id
            var ramqId=val.ramq_id;

            
            tblRow=$('<tr>').attr('id',val.row_id).attr('ramq_id',ramqId);

            var fields=['Type','Dent','Surface','Code','Description','Frais','Honoraires','Total','Prod','codeRole'];
            
                 for(i=0;i<10;i++)
                  {

                       switch (i) {

                       case 0: //Type
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).text(val.Type);
                       
                       tblData.appendTo(tblRow);
                       break;

                       case 1:
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).text(val.Dent);
                       
                       tblData.appendTo(tblRow);
                       break;

                       case 2:
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).text(val.Surface);
                       
                       tblData.appendTo(tblRow);
                       break;

                       case 3:
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).text(val.Code);
                       
                       tblData.appendTo(tblRow);
                       break;

                       case 4:
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).text(val.Description);
                       
                       tblData.appendTo(tblRow);
                       break;

                       case 5:
                       tblData=$('<td>').attr('contenteditable','true').attr('class','mont').attr('data-target',fields[i]).text(val.Frais);
                       tblData.appendTo(tblRow);
                       tblData=$('<td>').attr('class','dol').text('$');
                       tblData.appendTo(tblRow);
                      break;

                       case 6:
                       tblData=$('<td>').attr('contenteditable','true').attr('class','mont').attr('data-target',fields[i]).text(val.Honoraires);
                       tblData.appendTo(tblRow);
                       tblData=$('<td>').attr('class','dol').text('$');
                       tblData.appendTo(tblRow);
                       break;

                       case 7:
                       tblData=$('<td>').attr('contenteditable','true').attr('class','mont').attr('data-target',fields[i]).text(val.Total);
                       tblData.appendTo(tblRow);
                       tblData=$('<td>').attr('class','dol').text('$');
                       tblData.appendTo(tblRow);
                       break;
                       case 8:
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).text(val.Prod);
                       tblData.appendTo(tblRow);
                       break;

                       case 9:
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).text(val.codeRole);
                       tblData.appendTo(tblRow);
                       break;
                      }
                    
                  }
                   tblData=$('<td>').append('<div class="ui axxium tiny button" onclick="modFactTableMore_update(this,arrGrilleDeFacturation_forms_update);" >Plus</div><div class="ui axxium tiny button" onclick="deleteRow(this);" >Supprimer</div>');
               tblData.appendTo(tblRow);
            }
         
              

                tblRow.appendTo(tblBody);
        });

}

function add_empty_row(){

	var tblBody=$('#factTableBody_regie');

              //only Rows with ramq_id ( RAMQ )
            // fact_tbl_row_id=val.row_id;
            // ramq_id=val.ramq_id
            fact_tbl_row_id_Up=fact_tbl_row_id_Up+1;
            ramq_id_Up=ramq_id_Up+1;
          
			tblRow=$('<tr>').attr('id',fact_tbl_row_id_Up).attr('ramq_id',ramq_id_Up); 
			//fact_tbl_row id sorting the highest value already, also asiging to ramq_id

            var fields=['Type','Dent','Surface','Code','Description','Frais','Honoraires','Total','Prod','codeRole'];
            
                 for(i=0;i<10;i++)
                  {

                       switch (fields[i]) {

                       case 'Type': //Type
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]);
                        tblData.appendTo(tblRow);
                       break;

                       case 'Dent':
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]);
                        tblData.appendTo(tblRow);
                       break;

                       case 'Surface':
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]);
                        tblData.appendTo(tblRow);
                       break;

                       case 'Code':
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]);
                        tblData.appendTo(tblRow);
                       break;

                       case 'Description':
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]);
                        tblData.appendTo(tblRow);
                       break;

                       case 'Frais':
                       tblData=$('<td>').attr('contenteditable','true').attr('class','mont').attr('data-target',fields[i]);
                        tblData.appendTo(tblRow);
                        tblData=$('<td>').attr('class','dol').text('$');
                        tblData.appendTo(tblRow);
                      break;

                       case 'Honoraires':
                       tblData=$('<td>').attr('contenteditable','true').attr('class','mont').attr('data-target',fields[i]);
                        tblData.appendTo(tblRow);
                        tblData=$('<td>').attr('class','dol').text('$');
                        tblData.appendTo(tblRow);
                       break;

                       case 'Total':
                       tblData=$('<td>').attr('contenteditable','true').attr('class','mont').attr('data-target',fields[i]);
                        tblData.appendTo(tblRow);
                        tblData=$('<td>').attr('class','dol').text('$');
                        tblData.appendTo(tblRow);
                       break;

                       case 'Prod':
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).text(1);
                        tblData.appendTo(tblRow);
                       break;

                       case 'codeRole':
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).text(1);
                        tblData.appendTo(tblRow);
                       break;
                      }
                   
                  }
                    tblData=$('<td>').append('<div class="ui axxium tiny button" onclick="modFactTableMore_update(this,arrGrilleDeFacturation_forms_update);;" >Plus</div><div class="ui axxium tiny button" onclick="deleteRow(this);" >Supprimer</div>');
               		tblData.appendTo(tblRow);
         			tblRow.appendTo(tblBody);
        

}

function tableDataAmq(updateArray){

	var update_amq_arry=[];
	var row_id_count=[];
	var ramq_id_count=[];

	$.each(updateArray,function(id,val){

		$.each(val,function(idx,valx){
			

		if((valx=="AMQ")||(valx=="BES")||(valx=="HOP")){

			update_amq_arry.push(val);

		}

		if(idx=='row_id'){
			// Count the highes row_id from current Loaded table
			row_id_count.push(valx);

		}
		if(idx=='ramq_id'){
			// Count the highes ramq id from current Loaded table
			ramq_id_count.push(valx);

		}

		})
	})
	console.log(row_id_count);
	var max = Math.max.apply(Math, row_id_count);
	fact_tbl_row_id_Up=max;

	console.log(ramq_id_count);
	var maxRamqId = Math.max.apply(Math, ramq_id_count);
	ramq_id_Up=maxRamqId;

	return update_amq_arry;
}


function modFactTableMore_update(x,arrGrilleDeFacturation_forms_update)
{ 
	console.log(arrGrilleDeFacturation_forms_update);

  var row_id=$(x).closest('tr').attr('id');

   switch(dent_Type){
      
      case 'Dentiste':

              var data=$('#div_dentiste_Up').html();
              $('#modal_factTbl_more_Up').html(data); 
              $('form #rowId_dent_Up').val(row_id); //Assign id of Row Working - to the Form 
              var thisFromData_Up=getThisFormData_Up(row_id,arrGrilleDeFacturation_forms_update);  //gets the Complete Array of FORM Data to populate 
              updatedPopulateForm('form_dentiste_Up',thisFromData_Up);
              break;

      case 'Chirurgiens':
      
              var data=$('#div_chirurgiens_Up').html();
              $('#modal_factTbl_more_Up').html(data);
              $('form #rowId_chir_Up').val(row_id); //Assign id of Row Working - to the Form 
              var thisFromData_Up=getThisFormData_Up(row_id,arrGrilleDeFacturation_forms_update);
              updatedPopulateForm('form_chirurgiens_Up',thisFromData_Up);
              
              break;
      case 'Denturologiste':
      
              var data=$('#div_denturologiste_Up').html();
              $('#modal_factTbl_more_Up').html(data);
              $('form #rowId_dentu_Up').val(row_id); //Assign id of Row Working - to the Form 
              var thisFromData_Up=getThisFormData_Up(row_id,arrGrilleDeFacturation_forms_update);
              updatedPopulateForm('form_denturologiste_Up',thisFromData_Up);
      
              break;
      default:
              $('#modal_factTbl_more_Up').html('<h1>Error Aquiring the Dentist Type</h1>');

  }
  $('.modalFactTableMore_Up').modal('show');
}

function updatedPopulateForm(formname,thisFromData_Up)
{ 
   
      $("#"+formname).deserialize(thisFromData_Up);

      // AK Populate drop down lists
      RamqPopulateRaisonDdl('update');
      RamqPopulateSiteDdl('update');

      if(formname=='form_dentiste_Up'){

      	$('#form_dentiste_Up #medi_com_list_Up option').remove();
      	$('#form_dentiste_Up #elem_meas_list_Up option').remove();
        
        $.each(thisFromData_Up,function(id,val){
        
	        if(val.name=='liste_med_consm_denti')
	        {
		        console.log(val.value);
		        $('#form_dentiste_Up #medi_com_list_Up').append('<option selected="selected">'+val.value+'</option>')
	        }
	        
	        if(val.name=='liste_elm_mesur_denti')
	        {
		        console.log(val.value);
		        $('#form_dentiste_Up #elem_meas_list_Up').append('<option selected="selected">'+val.value+'</option>')
	        }

            //AK set selected values for Traitement dentaire (reason and site)
	        if (val.name === 'id_rais_trait_denta_denti') {
	            $('#id_rais_trait_denta_denti_update').val(val.value);
	            $('#id_rais_trait_denta_denti_update').trigger("chosen:updated");
	        }

	        if (val.name === 'id_site_trait_denta_denti') {
	            $('#id_site_trait_denta_denti_update').val(val.value);
	            $('#id_site_trait_denta_denti_update').trigger("chosen:updated");
	        }
     })
  
      }
      else if(formname=='form_chirurgiens_Up'){

      	$('#form_chirurgiens_Up #medi_com_list_chir option').remove();
      	$('#form_dentiste_Up #elem_meas_list option').remove();

        $.each(thisFromData_Up,function(id,val){
        
        if(val.name=='liste_med_consm_bucc'){
        console.log(val.value);
        $('#form_chirurgiens_Up #medi_com_list_chir').append('<option selected="selected">'+val.value+'</option>')
        }
        
        if(val.name=='liste_elm_mesur_bucc'){
        console.log(val.value);
        $('#form_chirurgiens_Up #elem_meas_list').append('<option selected="selected">'+val.value+'</option>')
        }

        //AK set selected values for Traitement dentaire (reason and site)
        if (val.name === 'id_rais_trait_denta_denti') {
            $('#id_rais_trait_denta_denti_update').val(val.value);
            $('#id_rais_trait_denta_denti_update').trigger("chosen:updated");
        }

        if (val.name === 'id_site_trait_denta_denti') {
            $('#id_site_trait_denta_denti_update').val(val.value);
            $('#id_site_trait_denta_denti_update').trigger("chosen:updated");
        }

     })

      }
      else if(formname=='form_denturologiste'){

  //     	$('#form_denturologiste #dropD_denturologiste_Up option').remove();
      	
		// $.each(thisFromData_Up,function(id,val){
        
  //       if(val.name=='liste_elm_contx_dentu_upd'){
  //       console.log(val.value);
  //       $('#form_chirurgiens_Up #dropD_denturologiste_Up').append('<option selected="selected">'+val.value+'</option>')
  //       }
        
  //       if(val.name=='liste_elm_mesur_bucc_upd'){
  //       console.log(val.value);
  //       $('#form_chirurgiens_Up #elem_meas_list').append('<option selected="selected">'+val.value+'</option>')
  //       }

      }
    

 }

function getThisFormData_Up(row_id,arrGrilleDeFacturation_forms_update){
  
  var arrayToPopulateForm_Up=[];

  $.each(arrGrilleDeFacturation_forms_update,function(idx,value){
    $.each(value,function(id,val){
      if((val.name=="row_id")&&(val.value==row_id))
      {
        arrayToPopulateForm_Up=value;
      }

    })
  })
  return arrayToPopulateForm_Up;
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
    console.log('this is value asign to ramq id:' + value);
    myObjects[key]=value;
    
    $.each(mytds,function(idx,val){

      var key=$(val).attr('data-target');
      var value=$(val).text();

      if(key=='Type'&&(value=='AMQ'||value=='BES'||value=='HOP')) {
        // Count Table Row entries for type RAMQ
        count_ramq=count_ramq+1;
        // var ramqId='ramq_id';
        // var valID=count_ramq;
        // myObjects[ramqId]=valID;

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
    console.log(arrGrilleDeFacturation_forms_update); 
    
   }
  

}

function Regie_fact_modal()
   {

   	fact_tbl_row_id_Up=0;
   	ramq_id_Up=0;
   	// arrGrilleDeFacturation_update=[];
   	arrGrilleDeFacturation_update=tableDataAmq(arrGrilleDeFacturation_update);
   	$('#factTableBody_regie tr').remove();
    populate_table(arrGrilleDeFacturation_update);
    
    $('.modal_regie_fact_modal.modal').modal('show');

   }

   function TestData(){
   		arrGrilleDeFacturation_forms_update=[];

   	arrGrilleDeFacturation_forms_update.push( [
{name: "row_id", value: "1"},
{name: "no_autor_proth_acryl_denti", value: "FAWAD  1 "},
{name: "dat_autor_proth_acryl_denti", value: "02/22/2017"},
{name: "typ_id_rais_trait_denta_denti", value: "AB"},
{name: "id_rais_trait_denta_denti", value: "123"},
{name: "typ_id_site_trait_denta_denti", value: ""},
{name: "id_site_trait_denta_denti", value: ""},
{name: "liste_med_consm_denti", value: "FAWW"},
{name: "liste_elm_contx_denti", value: "1727"},
{name: "liste_elm_mesur_denti", value: "RAMM/Kilomètres"},
{name: "lieu_refre_phys_denti", value: ""},
{name: "id_lieu_phys_denti", value: ""},
{name: "code_postal_geo_denti", value: ""},
{name: "code_localite_geo_denti", value: ""},
{name: "no_bureau_geo_denti", value: ""},
{name: "id_prof_refre_denti", value: ""},
{name: "lieu_refre_phys_denti", value: "Lieu codifié á la Régie"},
{name: "id_lieu_phys_denti", value: "1222222"}
],
[
{name: "row_id", value: "2"},
{name: "no_autor_proth_acryl_denti_upd", value: "Rameeeee 2"},
{name: "dat_autor_proth_acryl_denti_upd", value: "02/22/2017"},
{name: "typ_id_rais_trait_denta_denti_upd", value: "AB"},
{name: "id_rais_trait_denta_denti_upd", value: "123"},
{name: "typ_id_site_trait_denta_denti_upd", value: ""},
{name: "id_site_trait_denta_denti_upd", value: ""},
{name: "liste_med_consm_denti_upd", value: "FAWW"},
{name: "liste_elm_contx_denti_upd", value: "1727"},
{name: "liste_elm_mesur_denti_upd", value: "RAMM/Kilomètres"},
{name: "lieu_refre_phys_denti_upd", value: ""},
{name: "id_lieu_phys_denti_upd", value: ""},
{name: "code_postal_geo_denti_upd", value: ""},
{name: "code_localite_geo_denti_upd", value: ""},
{name: "no_bureau_geo_denti_upd", value: ""},
{name: "id_prof_refre_denti_upd", value: ""},
{name: "lieu_refre_phys_denti_upd", value: "Lieu codifié á la Régie"},
{name: "id_lieu_phys_denti_upd", value: "1222222"}
],
[
{name: "row_id", value: "3"},
{name: "no_autor_proth_acryl_denti_upd", value: "Naveee 3"},
{name: "dat_autor_proth_acryl_denti_upd", value: "02/22/2017"},
{name: "typ_id_rais_trait_denta_denti_upd", value: "AB"},
{name: "id_rais_trait_denta_denti_upd", value: "123"},
{name: "typ_id_site_trait_denta_denti_upd", value: ""},
{name: "id_site_trait_denta_denti_upd", value: ""},
{name: "liste_med_consm_denti_upd", value: "FAWW"},
{name: "liste_elm_contx_denti_upd", value: "1727"},
{name: "liste_elm_mesur_denti_upd", value: "RAMM/Kilomètres"},
{name: "lieu_refre_phys_denti_upd", value: ""},
{name: "id_lieu_phys_denti_upd", value: ""},
{name: "code_postal_geo_denti_upd", value: ""},
{name: "code_localite_geo_denti_upd", value: ""},
{name: "no_bureau_geo_denti_upd", value: ""},
{name: "id_prof_refre_denti_upd", value: ""},
{name: "lieu_refre_phys_denti_upd", value: "Lieu codifié á la Régie"},
{name: "id_lieu_phys_denti_upd", value: "1222222"}
]);
   	console.log('More form Loaded Success');
   }

function submitForm_Up(thisForm){
	
	event.preventDefault();
	var moreInfoArray_Up=$(thisForm).serializeArray();
	var checkIfUpdate=updateArray_Up('row_id',moreInfoArray_Up[0].value,moreInfoArray_Up);
	$('.modalFactTableMore_Up').modal('hide');
	if(checkIfUpdate){
	  arrGrilleDeFacturation_forms_update.push(moreInfoArray_Up);
	}
		}


function updateArray_Up(namR,valR,newArray_Up){
   // Update complete array if Matched in its object nameR and valR send i.e : nameR=row_id valR=2
  var nameD=namR;
  var valueD=valR;
  var newArray_Up=newArray_Up;

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
              arrGrilleDeFacturation_forms_update[i]=newArray_Up;
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
