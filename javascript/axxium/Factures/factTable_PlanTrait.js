var arrGrilleDeFacturation_planTrait=[];

$(document).ready(function(){
$(document.body).on("keypress","#factureTable_planTrait tr td[data-target='codeRole']", function(e) {

          if(e.which == 13) {

                newRecordFact_planTrait();
                updateTotal_Fact_planTrait();

                var prev_type=$(this).siblings("td[data-target='Type']").text();
                var code_s=$(this).siblings("td[data-target='Code']").text();
                var dent_s=$(this).siblings("td[data-target='Dent']").text();
                var next_row=$(this).closest('tr').next('tr');

                  
                
                traiter_valeur_de_base(code_s, dent_s,next_row,prev_type);

              
                

                $(this).closest('tr').next().find('td[data-target=Date]').focus();
                 e.preventDefault();
// trigger an artificial keydown event with keyCode 64
          
            }
            else
            {
              check_charcount(this,0,e,'alphaNumeric'); 
            }

            return e.which!=13;
              });
});

function newRecordFact_planTrait(){

    var current_date=get_date();

    var tblBody=$('#factureTable_planTrait');
    fact_tbl_row_id_planTrait=fact_tbl_row_id_planTrait+1;
    tblRow=$('<tr>').attr('id',fact_tbl_row_id_planTrait);

    var fields=['id','Date','Type','Dent','Surface','Code','Description','Frais','Honoraires','Total','Prod','codeRole'];

    for(i=0;i<=11;i++)
      {

        switch(fields[i]){
          case 'Date':

            tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).text(current_date);
             tblData.appendTo(tblRow);

          break;
          case 'Type':

            tblData=$('<td>').attr('style','display:none').attr('data-target',fields[i]).text("CAS");
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

             tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]);
             tblData.appendTo(tblRow);

          break;

          case 'codeRole':


              tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i])
     //          .bind('keypress', function (e)
     //          {
     //              if (e.which == 13) {
                 
     //              newRecordFact_planTrait();


     //              var e = jQuery.Event("keyup");
					// e.which = 9; // # Some key code value
					// e.keyCode = 9
					// $("input").delay(800).trigger(e);
     //            };
     //            return e.which!=13;

     //          })
             tblData.appendTo(tblRow);

          break;

        }


    }
           

        tblData=$('<td>').append('<div class="ui axxium tiny button" onclick="deleteRow_planTrait(this);" >Supprimer</div>');
       tblData.appendTo(tblRow);

        tblRow.appendTo(tblBody);

}

function getAllTrData_planTrait(){

  
  arrGrilleDeFacturation_planTrait=[];

  var mytrs=$('#factTableBody_planTrait tr');
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

      arrGrilleDeFacturation_planTrait.push(myObjects);
});

   

    console.log(arrGrilleDeFacturation_planTrait);
    

}

$(document).ready(function(){
newRecordFact_planTrait();
});

function emptyTable_planTrait(){
  //Empty Existing Table and Initialize all parameters of Table

  fact_tbl_row_id_planTrait=0;
  arrGrilleDeFacturation_planTrait=[];
  
  
  //IMP! call Dent_type Modal again for selection in Main FactTabl
  
  $("#factTableBody_planTrait tr").remove();

  
      newRecordFact_planTrait();
}

function populate_table_fact_planTrait(arrToPopTabl){

  fact_tbl_row_id_planTrait=0;
  arrGrilleDeFacturation_planTrait=[];
  $("#factTableBody_planTrait tr").remove();
  
  var arrayToPopulate=arrToPopTabl;
  arrGrilleDeFacturation=arrToPopTabl;
  

    // arrGrilleDeFacturation_update=arrayToPopulate;
    // console.log(arrGrilleDeFacturation_update);


    var tblBody=$('#factTableBody_planTrait');

          $.each(arrayToPopulate,function(idx,val){
           
            tblRow=$('<tr>').attr('id',val.row_id).attr('ramq_id',val.ramq_id);

            var fields=['Date','Type','Dent','Surface','Code','Description','Frais','Honoraires','Total','Prod','codeRole'];

                 for(i=0;i<11;i++)
                  {

                       switch (i) {

                       case 0: //Type
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).text(val.Date);
                       break;

                       case 1:
                       tblData=$('<td>').attr('style','display:none').text("CAS");
                       break;

                       case 2:
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).text(val.Dent);
                       break;

                       case 3:
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).text(val.Surface);
                       break;

                       case 4:
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).text(val.Code);
                       break;

                       case 5:
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).text(val.Description);
                       break;

                       case 6:
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).attr('class','mont').text(val.Frais);
                      tblData.appendTo(tblRow);
                      tblData=$('<td>').attr('class','dol').text('$');
                        
                      break;

                       case 7:
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).attr('class','mont').text(val.Honoraires);
                        tblData.appendTo(tblRow);
                      tblData=$('<td>').attr('class','dol').text('$');
                       break;

                       case 8:
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).attr('class','mont').text(val.Total);
                        tblData.appendTo(tblRow);
                      tblData=$('<td>').attr('class','dol').text('$');
                       break;

                       case 9:
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).text(val.Prod);
                       break;

                       case 10:
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).text(val.codeRole);
                       break;
                      }
                    tblData.appendTo(tblRow);
                  }
                  tblData=$('<td>').append('<div class="ui axxium tiny button" onclick="deleteRow_planTrait(this);" >Supprimer</div>');
                tblData.appendTo(tblRow);
                 tblRow.appendTo(tblBody);
        });

}

function deleteRow_planTrait(x)
{

  getAllTrData_planTrait();
  // var lastType=$(x).parent().siblings('td[data-target="Type"]').text();
  var lengthTblArray=arrGrilleDeFacturation_planTrait.length;

  var row_id_Del=$(x).closest('tr').attr('id');
   var prevRow=$(x).closest('tr').prev('tr');
   $(prevRow).children('td[data-target="Dent"]').focus();
  var row=$(x).closest('tr').remove();
  
  if(lengthTblArray==1)
  {
    newRecordFact_planTrait();
    $('#factureTable_planTrait td[data-target="Dent"]').focus();
    // $('#factureTable_planTrait td[data-target="Type"]').text(lastType);
  }

  
  updateTotal_Fact_planTrait();
  // $('#factureTable_planTrait tr[id='+prevRow+'] td[data-target="codeRole"]').focus();
  // x.parents("tr:last");


}

function updateTotal_Fact_planTrait()
{
  // var thisTotalVal=$(x).closest('tr').find('td[data-target="Total"]').text();
  var allTrs=$('#factTableBody_planTrait tr');
  var fact_total=0;
  
  $.each(allTrs,function(id,val){

    var thisTotalVal=$(val).find('td[data-target="Total"]').text();
    if(thisTotalVal!='')
    {
      fact_total=parseFloat(fact_total)+parseFloat(thisTotalVal);
    }

  })

  if(fact_total=='NaN'){fact_total==0};
  fact_total=(parseFloat(fact_total)).toFixed(2);
  $('.fact_tot_planTrait').val(fact_total);


  
}

