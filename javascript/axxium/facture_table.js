
   var moreInfoArray_glbl="";

 

$(document).ready(function(){

  // $("#form_denturologiste").on("submit", function(event) {
  //             alert('Hiii');
  //               event.preventDefault();
  //               var moreInfoArray=$(this).serializeArray();
  //               console.log(moreInfoArray);
  //             });

  // ====== factureTable last TD Enter key Monitor
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
    tblRow=$('<tr>');
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

    $.each(mytds,function(idx,val){


      var key=$(val).attr('data-target');
      var value=$(val).text();

      myObjects[key]=value;

      })
      arrGrilleDeFacturation.push(myObjects);
});
  if(moreInfoArray_glbl!=""){
    arrGrilleDeFacturation.push(moreInfoArray_glbl );
    }
  console.log(arrGrilleDeFacturation);  
  // console.log(moreInfoArray_glbl  )
  getMoreInfo();

}

function findTableData(x){
  
   //==Closest Row
  var row=$(x).closest('tr');
 
 //==All Td's
  var tds=row.find('td');

  //==Specific nth-td value
  var tdSpc=row.find("td:nth-child(1)").text();
  // console.log(tdSpc);
    
  //==Specific td with class 
  var tdByAttribute=row.find("td[data-target='Type']").text();

  //CALL MODAL
  modFactTableMore();  
}

function getMoreInfo(){
  
  // var anyData={};
  // anyData['hello']='fawad';
  // console.log(anyData); 


}

//===Modal

function modFactTableMore()
{ 
   
   switch(dent_Type){
      
      case 'Dentiste':
              var data=$('#div_dentiste').html();
              $('#modal_factTbl_more').html(data);
              break;

      case 'Chirurgiens':
      
              var data=$('#div_chirurgiens').html();
              $('#modal_factTbl_more').html(data);
              break;
      case 'Denturologiste':
      
              var data=$('#div_denturologiste').html();
              $('#modal_factTbl_more').html(data);
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