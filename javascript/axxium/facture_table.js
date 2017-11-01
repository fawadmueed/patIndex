
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
   var thisVal=$('#modFactTabl_dropDown').val();
   if(thisVal=='Dentiste')
            {
              var data=$('#div_dentiste').html();
              $('#modal_factTbl_more').html(data);
            }
            
  // ==Modal DropDown 

   $('#modFactTabl_dropDown').dropdown().change(function() {
            var thisVal=$('#modFactTabl_dropDown').val();
          

            if(thisVal=='Dentiste')
            {
              var data=$('#div_dentiste').html();
              $('#modal_factTbl_more').html(data);
            }

            if(thisVal=='Chirurgiens')
            {

            var data=$('#div_chirurgiens').html();
            $('#modal_factTbl_more').html(data);
            }

            if(thisVal=='Denturologiste')
            {
              var data=$('#div_denturologiste').html();
              $('#modal_factTbl_more').html(data);
            }
            // if(thisVal=='État de compte')
            // {

            // }


          }) ;
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
           tblData=$('<td>').append('<div class="ui axxium tiny button" onclick="thisTd(this.parent);" >More!</div>');
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

function thisTd(x){
  modFactTableMore();  
 console.log(x);

}

//===Modal

function modFactTableMore()
{
  $('.modalFactTableMore').modal('show');
}



