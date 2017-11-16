
  var arrGrilleDeFacturation=[];
  var arrGrilleDeFacturation_forms=[];

$(document).ready(function(){

  newRecordFact();
  $('.firstTdProd').keypress(function (e)
            {
              if(e.which == 13)
              {
                newRecordFact();
              };
              return e.which!=13;
            })
  
  $(document.body).on("submit","#form_dentiste", function(event) {
                submitForm(this);
              });
  $(document.body).on("submit","#form_chirurgiens", function(event) {
                submitForm(this);
                
              });
  $(document.body).on("submit","#form_denturologiste", function(event) {
              submitForm(this);
              });

   });

function newRecordFact(){

    var tblBody=$('#factTableBody');
    fact_tbl_row_id=fact_tbl_row_id+1;
    tblRow=$('<tr>').attr('id',fact_tbl_row_id);
    var fields=['id','Type','Dent','Surface','Code','Description','Frais','Honoraires','Total','Prod'];
    for(i=0;i<9;i++)
      {
        if(i==8)
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
           tblData=$('<td>').append('<div class="ui axxium tiny button" onclick="findTableData(this);" >More</div><div class="ui axxium tiny button" onclick="deleteRow(this);" >Delete</div>');
       tblData.appendTo(tblRow);

        tblRow.appendTo(tblBody);
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
    console.log(arrGrilleDeFacturation_forms); 
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

function findTableData(x){
  //Get id of the Row Working
  var row_id=$(x).closest('tr').attr('id'); 
  modFactTableMore(row_id);  
}

function getMoreInfo(){
  
  // var anyData={};
  // anyData['hello']='fawad';
  // console.log(anyData); 


}

//===Modal

function modFactTableMore(row_id)
{ 
   
   switch(dent_Type){
      
      case 'Dentiste':
              var data=$('#div_dentiste').html();
              $('#modal_factTbl_more').html(data); 
              $('form #rowId_dent').val(row_id); //Assign id of Row Working - to the Form 
              
              break;

      case 'Chirurgiens':
      
              var data=$('#div_chirurgiens').html();
              $('#modal_factTbl_more').html(data);
              $('form #rowId_chir').val(row_id); //Assign id of Row Working - to the Form 
              console.log($('form #rowId_chir').val());
              break;
      case 'Denturologiste':
      
              var data=$('#div_denturologiste').html();
              $('#modal_factTbl_more').html(data);
              $('form #rowId_dentu').val(row_id); //Assign id of Row Working - to the Form 
              console.log($('form #rowId_dentu').val());
              break;
      default:
              $('#modal_factTbl_more').html('<h1>Error Aquiring the Dentist Type</h1>');

  }
  $('.modalFactTableMore').modal('show');
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