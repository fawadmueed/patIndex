
  var arrGrilleDeFacturation=[];
  var arrGrilleDeFacturation_forms=[];

  // set TYPE from here globVisionRData.InsTypeList[0]

$(document).ready(function(){

  newRecordFact();
  
  
  $(document.body).on("submit","#form_dentiste", function(event) {
                submitForm(this);
              });
  $(document.body).on("submit","#form_chirurgiens", function(event) {
                submitForm(this);
                
              });
  $(document.body).on("submit","#form_denturologiste", function(event) {
              submitForm(this);
              });
 

$(document.body).on('focusout',"form :text",function(){
                $(this).val($(this).val().toUpperCase());
              })            
 
   });

function newRecordFact(){

    var tblBody=$('#factTableBody');
    fact_tbl_row_id=fact_tbl_row_id+1;
    tblRow=$('<tr>').attr('id',fact_tbl_row_id);

    var fields=['id','Type','Dent','Surface','Code','Description','Frais','Honoraires','Total','Prod','codeRole'];
    for(i=0;i<10;i++)
      {
        if(i==0){

              if(fact_tbl_row_id==1)
                {
                
                tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i+1]).text('AMQ'); 
                // globVisionRData.InsTypeList[0]
                tblData.appendTo(tblRow);
                }
            else{
                //typeOfLastRow
                prevRowId=fact_tbl_row_id-1;
                prevsRowType=getPrevRowType(prevRowId);
                tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i+1]).text(prevsRowType);
                tblData.appendTo(tblRow);
                } 
            }
        else if(i==9)
        {
          tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i+1])
          .bind('keypress', function (e)
            {
              if(e.which == 13) {
                newRecordFact();

              };
              return e.which!=13;

            })
           tblData.appendTo(tblRow);
        }
        else{

       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i+1]);
       tblData.appendTo(tblRow);
   }
      }
           tblData=$('<td>').append('<div class="ui axxium tiny button" onclick="modFactTableMore(this);" >Plus</div><div class="ui axxium tiny button" onclick="deleteRow(this);" >Supprimer</div>');
       tblData.appendTo(tblRow);

        tblRow.appendTo(tblBody);
}

function getPrevRowType(idPrev){

  
  var factBody=$('#factTableBody tr[id='+idPrev+']');
  var prevType;
  $.each(factBody,function(id,val){
  prevType=$(val).find('td[data-target=Type]').text();
  

  })

  return prevType; 

}

function getAllTrData(){

  var count_ramq=0;
  var count_insur=0;

  arrGrilleDeFacturation=[]
  var mytrs=$('#factTableBody tr');
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

      arrGrilleDeFacturation.push(myObjects);
});
   if((count_ramq>=10)||(count_insur>=7))
   {
    alert('Limit Exceeded! Allow Limit : RamQ Bill = 10 Lines , Insurance Bill = 7 Lines. Delete few entries to proceed');
   }
   else{

    console.log(arrGrilleDeFacturation); 
    arrGrilleDeFacturation_update=arrGrilleDeFacturation;
    // 

    // console.log(moreInfoArray_glbl  )
    modPayment();
    // getMoreInfo();
   }
  

}

function submitForm(thisForm){
    event.preventDefault();
    var moreInfoArray=$(thisForm).serializeArray();
    var checkIfUpdate=updateArray('row_id',moreInfoArray[0].value,moreInfoArray);
    $('.modalFactTableMore').modal('hide');
    if(checkIfUpdate){
      arrGrilleDeFacturation_forms.push(moreInfoArray);
    }

                
}

// function findTableData(x){
//   //Get id of the Row Working
//   var row_id=$(x).closest('tr').attr('id'); 
//   modFactTableMore(row_id);  
// }

function getMoreInfo(){
  
  // var anyData={};
  // anyData['hello']='fawad';
  // console.log(anyData); 


}

//===Modal

function modFactTableMore(x)
{ 
  var row_id=$(x).closest('tr').attr('id');
   
   switch(dent_Type){
      
      case 'Dentiste':
              var data=$('#div_dentiste').html();
              $('#modal_factTbl_more').html(data); 
              $('form #rowId_dent').val(row_id); //Assign id of Row Working - to the Form 
              var thisFromData=getThisFormData(row_id);  //gets the Complete Array of FORM Data to populate 
              populateForm('form_dentiste',thisFromData);
              break;

      case 'Chirurgiens':
      
              var data=$('#div_chirurgiens').html();
              $('#modal_factTbl_more').html(data);
              $('form #rowId_chir').val(row_id); //Assign id of Row Working - to the Form 
              var thisFromData=getThisFormData(row_id);
              populateForm('form_chirurgiens',thisFromData);
              
              break;
      case 'Denturologiste':
      
              var data=$('#div_denturologiste').html();
              $('#modal_factTbl_more').html(data);
              $('form #rowId_dentu').val(row_id); //Assign id of Row Working - to the Form 
              var thisFromData=getThisFormData(row_id);
              populateForm('form_denturologiste',thisFromData);
      
              break;
      default:
              $('#modal_factTbl_more').html('<h1>Error Aquiring the Dentist Type</h1>');

  }
  $('.modalFactTableMore').modal('show');
}

function getThisFormData(row_id){
  var arrayToPopulateForm=[];

  $.each(arrGrilleDeFacturation_forms,function(idx,value){
    $.each(value,function(id,val){
      if(val.value==row_id){
        arrayToPopulateForm=value;
      }

    })
  })
  return arrayToPopulateForm;
}

function populateForm(formname,thisFromData)
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

function emptyTable (){
  //Empty Existing Table and Initialize all parameters of Table
  fact_tbl_row_id=0;
  arrGrilleDeFacturation=[];
  arrGrilleDeFacturation_forms=[];
  dent_Type=''; 
  checkDentType();
  //IMP! call Dent_type Modal again for selection in Main FactTabl
  $("#factTableBody tr").remove(); 
  newRecordFact();

}

function deleteRow(x){

  var row_id_Del=$(x).closest('tr').attr('id');

  var row=$(x).closest('tr').remove();
  //remove this Row's Form too 
  var deleteThisIdForm=deleteFromArray('delete','row_id',row_id_Del);
  if(deleteThisIdForm){ console.log('Deleted Success'); };

}

function deleteFromArray(toDo,namR,valR){
  // Delete complete array if Matched in its object nameR and valR send i.e : nameR=row_id valR=2
  //toDo= for now =='delete'
  var nameD=namR;
  var valueD=valR;
  var action=toDo;


    for(var i=0;i<arrGrilleDeFacturation_forms.length;i++)
        {
          for(var j=0;j<arrGrilleDeFacturation_forms[i].length;j++)
          {
            if((arrGrilleDeFacturation_forms[i][j].name==nameD)&&(arrGrilleDeFacturation_forms[i][j].value==valR))
            {
              if(action=='delete')
              {
              arrGrilleDeFacturation_forms.splice([i],1);
              return true;
              }
            
              
            }
          
          }
        }
}

function updateArray(namR,valR,newArray){
   // Update complete array if Matched in its object nameR and valR send i.e : nameR=row_id valR=2
  var nameD=namR;
  var valueD=valR;
  var newArray=newArray;

       if(arrGrilleDeFacturation_forms.length==0)
       { //first time when form is Empty
         return true;
       }

   for(var i=0;i<arrGrilleDeFacturation_forms.length;i++)
        {
          for(j=0;j<arrGrilleDeFacturation_forms[i].length;j++)
          {
            if(arrGrilleDeFacturation_forms[i][j].name==nameD && arrGrilleDeFacturation_forms[i][j].value==valueD)
            {
              arrGrilleDeFacturation_forms[i]=newArray;
              return false;
              
            }
          }
        }
    return true;
    }


    for(var i=0;i<arrGrilleDeFacturation_forms.length;i++)
        {
          for(var j=0;j<arrGrilleDeFacturation_forms[i].length;j++)
          {
            if((arrGrilleDeFacturation_forms[i][j].name==nameD)&&(arrGrilleDeFacturation_forms[i][j].value==valR))
            {

              console.log('Old array :');
              console.log(arrGrilleDeFacturation_forms[i]);
              arrGrilleDeFacturation_forms[i]=newArray;
              console.log('new Array');
              console.log(newArray);
              // return true;
              
            
              
            }
          
          }
        }



function checkDentType(){
  
  // will check any type for Dentist Selected - 
  if(dent_Type!=''){
    return;
  }
  else{
    $('.dentSelectModal').modal('show');
  }
  RamqCheckCredentials();

}

function setDentType(){

  dent_Type=$("input[name*='dent']:checked").val();
  $('.dentSelectModal').modal('hide');

}
function closeModal(){
  $('.modalFactTableMore').modal('hide');
}