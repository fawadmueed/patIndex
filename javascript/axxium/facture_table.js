
  var dent_Type; //will have Type of Dentist

 // ====== factureTable last TD Enter key Monitor

$(document).ready(function(){

  
  $('.firstTdProd').keypress(function (e)
            {
              if(e.which == 13)
              {
                newRecordFact();

              };
              return e.which!=13;

            })

//=== Populate modal default with Dentiste Div
   // var thisVal=$('#modFactTabl_dropDown').val();
   // if(thisVal=='Dentiste')
   //          {
   //            var data=$('#div_dentiste').html();
   //            $('#modal_factTbl_more').html(data);
   //          }
            
  // ==Modal DropDown 

   // $('#modFactTabl_dropDown').dropdown().change(function() {
   //          var thisVal=$('#modFactTabl_dropDown').val();
          

   //          if(thisVal=='Dentiste')
   //          {
   //            var data=$('#div_dentiste').html();
   //            $('#modal_factTbl_more').html(data);
   //          }

   //          if(thisVal=='Chirurgiens')
   //          {

   //          var data=$('#div_chirurgiens').html();
   //          $('#modal_factTbl_more').html(data);
   //          }

   //          if(thisVal=='Denturologiste')
   //          {
   //            var data=$('#div_denturologiste').html();
   //            $('#modal_factTbl_more').html(data);
   //          }
   //          // if(thisVal=='État de compte')
   //          // {

   //          // }


   //        }) ;
});
//===xx



// ======== For table with id= factureTable 
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
    var mytds=$(val).children();

    $.each(mytds,function(idx,val){


      var key=$(val).attr('data-target');
      var value=$(val).text();

      myObjects[key]=value;

      })
      console.log(myObjects);

      arrGrilleDeFacturation.push(myObjects);

      // console.log(myArray);


  });
  console.log(arrGrilleDeFacturation);
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

  dent_Type=tdByAttribute;
  

  //CALL MODAL
  modFactTableMore();  
}

//===Modal

function modFactTableMore()
{ 
    
   switch(dent_Type){
      
      case 'A':
        
              var data=$('#div_dentiste').html();
              $('#modal_factTbl_more').html(data);
              break;

      case 'B':
      
              var data=$('#div_chirurgiens').html();
              $('#modal_factTbl_more').html(data);
              break;
      case 'C':
      
              var data=$('#div_denturologiste').html();
              $('#modal_factTbl_more').html(data);
              break;
      default:
              $('#modal_factTbl_more').html('<h1>Error Aquiring the Dentist Type</h1>');

  }
  $('.modalFactTableMore').modal('show');
}



