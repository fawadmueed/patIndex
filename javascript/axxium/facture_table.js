
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
           tblData=$('<td>').append('<div class="ui axxium tiny button" onclick="findTableData(this);" >More!</div>');
       tblData.appendTo(tblRow);

        tblRow.appendTo(tblBody);
}


function getAllTrData(){
  
  modPayment();
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

      myObjects[key]=value;

      })

      arrGrilleDeFacturation.push(myObjects);
});
  console.log(arrGrilleDeFacturation); 
  console.log(arrGrilleDeFacturation_forms); 
  // console.log(moreInfoArray_glbl  )
  getMoreInfo();

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
              console.log($('form #rowId_dent').val());
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

function checkDentType(){
  // will check any type for Dentist Selected - 
  
  if(dent_Type!=''){
    return;
  }
  else{
    $('.dentSelectModal').modal('show');
  }

}

function setDentType(){

  dent_Type=$("input[name*='dent']:checked").val();
  $('.dentSelectModal').modal('hide');

}
function closeModal(){
  $('.modalFactTableMore').modal('hide');
}