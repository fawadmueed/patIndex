//TEST - FACT 
var arrGrilleDeFacturation=[];
var arrGrilleDeFacturation_forms = [];


$(document).ready(function(){

    //newRecordFact(); AK this function is called after getting data from Ramq (RamqGetVisionRData() ramq.js)

   $(document.body).on("keypress","#factTableBody tr td" , function(e) {

          if(e.which == 13) {
               

                
                 e.preventDefault();
                 return false;
// trigger an artificial keydown event with keyCode 64
          
            }

            return e.which!=13;
              }).not(':last');

  $(document.body).on("keypress","#factTableBody tr td[data-target='codeRole']", function(e) {

          if(e.which == 13) 
          {

                updateTotal_Fact(this);
                newRecordFact();

                var prev_type=$(this).siblings("td[data-target='Type']").text();
                var code_s=$(this).siblings("td[data-target='Code']").text();
                var dent_s=$(this).siblings("td[data-target='Dent']").text();
                var next_row=$(this).closest('tr').next('tr');

                traiter_valeur_de_base(code_s, dent_s,next_row,prev_type);

            //On Enter Key Press
      
                $(this).closest('tr').next().find('td[data-target=Type]').focus();
                 e.preventDefault();

// trigger an artificial keydown event with keyCode 64
            }

        else
          {
            if(roleDisableFlag)
            {
             e.preventDefault();
            }
            else
            {
              check_charcount(this,0,e,'alphaNumeric'); 
            }
            
          }

            return e.which!=13;
              });

  $(document.body).on("submit","#form_dentiste", function(event) {

                submitForm(this);
              });

  $(document.body).on("submit","#form_chirurgiens", function(event) {
                submitForm(this);

              });
  $(document.body).on("submit","#form_denturologiste", function(event) {
              submitForm(this);
              });


  $(document.body).on('focusout', "form :text", function () {
      $(this).val($(this).val().toUpperCase());
  });

  $(document.body).on('focusout', '.cashComponent', function (event) {
      CashCalculateCashTotal();
  });

   });

function newRecordFact(){

    
    var tblBody=$('#factTableBody');
    fact_tbl_row_id=fact_tbl_row_id+1;
    tblRow=$('<tr>').attr('id',fact_tbl_row_id);

    var fields=['id','Type','Dent','Surface','Code','Description','Frais','Honoraires','Total','Prod','codeRole'];
    for(i=0;i<=10;i++)
      {

        switch(fields[i]){
          case 'Type':

            if(fact_tbl_row_id==1)
                {
                  if(type_rate_glbl==3)
                  {
                     tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).text('HOP');
                  }
                  else
                  {
                        // Get First Value in TYPE from AMQ
                        if(globVisionRData.InsTypeList.length!=0)
                        { 
                          //Check if Insurance companies exist with Patient
                          tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).text(globVisionRData.InsTypeList[0]).focus();
                        }
                        else
                        { //If not exist take from url
                          tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).text(urlParams.ass).focus();
                        }
                  }
                 
                //tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).text('CAS');
                // globVisionRData.InsTypeList[0]  TYPE from VisionR
                tblData.appendTo(tblRow);
                
                
                //draw odonto
                odonto = {"id":"1","date":"2018/01/01","exist":[]};
                drawOdonFact("odonto2");
                }
            else{
                //typeOfLastRow
                // For All other TYPE - Get last Row TYPE Value
                prevRowId=fact_tbl_row_id-1;
                prevsRowType=getPrevRowType(prevRowId);
                tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).text(prevsRowType);
                tblData.appendTo(tblRow);
                //draw odonto
                odonto.exist.push({"code":getPrevRowCode(prevRowId),"tooth":getPrevRowDent(prevRowId),"surface":getPrevRowSurf(prevRowId),"note":""});
                drawOdonFact("odonto2");
                }

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
             tblData=$('<td>').attr('class','dol').append('<div class="circular ui icon button" onclick="fact_tarif_list($(this).parent())"><i class="icon info"></i></div>');
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


              tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]);
              // .bind('keypress', function (e)
              // {
              //     if (e.which == 13) {
                    

              //     newRecordFact();

                  
              //     //Rob Function : call this when change the current row
              //    var code_s=$(this).siblings("td[data-target='Code']").text();
              //    var dent_s=$(this).siblings("td[data-target='Dent']").text();

                  // traiter_valeur_de_base(code_s, dent_s);

              //   };
              //   e.which=9;
              //   e.keyCode=9;

              //   $('this').trigger(e);
              //   console.log(e.which);
              //   return e.which!=13;

              // })
             tblData.appendTo(tblRow);

          break;

        }


    }
           tblData=$('<td>').append('<div class="ui axxium tiny button plus" onclick="modFactTableMore(this);" >Plus</div><div class="ui axxium tiny button" onclick="deleteRow(this);" >Supprimer</div>');
       tblData.appendTo(tblRow);
       tblRow.appendTo(tblBody);

        //When type set automatically, To Run Validation : 
        if(fact_tbl_row_id==1)
        {
          $("#factTableBody td[data-target='Type']").trigger("focusout");
        }
}

function getPrevRowCode(idPrev){


  var factBody=$('#factTableBody tr[id='+idPrev+']');
  var prevCode;
  $.each(factBody,function(id,val){
  prevCode=$(val).find('td[data-target=Code]').text();


  });

  return prevCode;

}

function getPrevRowDent(idPrev){


  var factBody=$('#factTableBody tr[id='+idPrev+']');
  var prevDent;
  $.each(factBody,function(id,val){
  prevDent=$(val).find('td[data-target=Dent]').text();


  })

  return prevDent;

}

function getPrevRowSurf(idPrev){


  var factBody=$('#factTableBody tr[id='+idPrev+']');
  var prevSurf;
  $.each(factBody,function(id,val){
  prevSurf=$(val).find('td[data-target=Surface]').text();


  })

  return prevSurf;

}

function getPrevRowType(idPrev){


  // var factBody=$('#factTableBody tr[id='+idPrev+']');
  // var prevType;
  // $.each(factBody,function(id,val){
  // prevType=$(val).find('td[data-target=Type]').text();

  // if(prevType=='')
  // {
    prevType=$('#factTableBody tr:last td[data-target=Type]').text();
  // }


  // })

  return prevType;

}

function getAllTrData(){

  ramq_id=0;
  var count_ramq=0;
  var count_insur=0;

  arrGrilleDeFacturation=[] // For All Bills
  arrGrilleDeFacturation_Insurance=[]; // For Just Insurance Bills
   arrGrilleDeFacturation_Amq=[]; // For AMQ Bills

  var mytrs=$('#factTableBody tr');

  $.each(mytrs, function(idx,val){

    var myObjects={};
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
        ramq_id=ramq_id+1;
        var ramqId='ramq_id';
        var valID=ramq_id;
        myObjects[ramqId]=valID;

        amq_bills_flag=1;
      }

      if(key=='Type'&&((!(value=='AMQ'||value=='BES'||value=='HOP'))&&(!(value=='CAS')) )) {
        // Count Table Row entries for type Insurance
        count_insur=count_insur+1;
        
        insur_bills_flag=1;
      }

    
        myObjects[key]=value;
    

      })

      arrGrilleDeFacturation.push(myObjects);
      
      if(insur_bills_flag==1)
      { 
        // Array containing Just Insurance Bills 
        arrGrilleDeFacturation_Insurance.push(myObjects);
        insur_bills_flag=0;
      }
       if(amq_bills_flag==1)
      { 
        // Array containing Just Insurance Bills 
        arrGrilleDeFacturation_Amq.push(myObjects);
        amq_bills_flag=0;
      }
});


   if((count_ramq>=10)||(count_insur>=7))
   {
    alert("Limite dépassée! Limite autorisée: Bill RamQ = 10 lignes, facture d'assurance = 7 lignes. Supprimer quelques entrées pour continuer");
   }
   else{


    arrGrilleDeFacturation_update=arrGrilleDeFacturation;
   
   }

   

          if(!(arrGrilleDeFacturation_Insurance.length>0))                  
            
          {
              $('#divPaymentInsurance').addClass('disabled');
          }
          else
          {
              $('#divPaymentInsurance').removeClass('disabled ');
          }
          if(!(arrGrilleDeFacturation_Amq.length>0))
          {                  
              $('#divPaymentRamq').addClass('disabled');
          }
          else
          {
              $('#divPaymentRamq').removeClass('disabled ');
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



function getMoreInfo(){

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

      if((val.name=="row_id")&&(val.value==row_id))
      {
        arrayToPopulateForm=value;

      }

    })
  })

  return arrayToPopulateForm;
}

function populateForm(formname,thisFromData)
{


    $("#" + formname).deserialize(thisFromData);
    // AK Populate drop down lists
      RamqPopulateRaisonDdl('insert');
      RamqPopulateSiteDdl('insert');

      if(formname=='form_dentiste'){

        $('#form_dentiste #medi_com_list option').remove();
        $('#form_dentiste #elem_meas_list option').remove();

        $.each(thisFromData,function(id,val){


        if(val.name=='liste_med_consm_denti'){

          $('#form_dentiste #medi_com_list').append('<option selected="selected">'+val.value+'</option>')
        }

        if(val.name=='liste_elm_mesur_denti'){
          $('#form_dentiste #elem_meas_list').append('<option selected="selected">'+val.value+'</option>')
        }

        //AK set selected values for Traitement dentaire (reason and site)
        if (val.name === 'id_rais_trait_denta_denti') {
            $('#id_rais_trait_denta_denti').val(val.value);
            $('#id_rais_trait_denta_denti').trigger("chosen:updated");
        }

        if (val.name === 'id_site_trait_denta_denti') {
            $('#id_site_trait_denta_denti').val(val.value);
            $('#id_site_trait_denta_denti').trigger("chosen:updated");
        }

     })

      }
      else if(formname=='form_chirurgiens'){

        $('#form_chirurgiens #medi_com_list_chir option').remove();
        $('#form_chirurgiens #elem_meas_list option').remove();

         $.each(thisFromData,function(id,val){

        if(val.name=='liste_med_consm_bucc'){
        $('#form_chirurgiens #medi_com_list_chir').append('<option selected="selected">'+val.value+'</option>')
        }

        if(val.name=='liste_elm_mesur_bucc'){
        $('#form_chirurgiens #elem_meas_list').append('<option selected="selected">'+val.value+'</option>')
        }

        //AK set selected values for Traitement dentaire (reason and site)
        if (val.name === 'id_rais_trait_denta_denti') {
            $('#id_rais_trait_denta_denti').val(val.value);
            $('#id_rais_trait_denta_denti').trigger("chosen:updated");
        }

        if (val.name === 'id_site_trait_denta_denti') {
            $('#id_site_trait_denta_denti').val(val.value);
            $('#id_site_trait_denta_denti').trigger("chosen:updated");
        }

     })

      }
      else if(formname=='form_denturologiste'){

      }


 }

function emptyTable (option){
  //Empty Existing Table and Initialize all parameters of Table

  fact_tbl_row_id=0;
  arrGrilleDeFacturation=[];
  arrGrilleDeFacturation_forms=[];
  arrGrilleDeFacturation_Insurance=[];
 arrGrilleDeFacturation_Amq=[];


  // dent_Type='';
  init_code='';
  surf_type='';

  // checkDentType();
  //IMP! call Dent_type Modal again for selection in Main FactTabl

  $("#factTableBody tr").remove();

  if(option=='newTbl')
    {
      newRecordFact();
    }
  else
    {
      return;
    }

}

function deleteRow(x){

  getAllTrData();
  var lastType=$(x).parent().siblings('td[data-target="Type"]').text();

  var lengthTblArray=arrGrilleDeFacturation.length;
  var row_id_Del=$(x).closest('tr').attr('id');
  var prevRow=$(x).closest('tr').prev('tr');
   $(prevRow).children('td[data-target="Type"]').focus();
  var row=$(x).closest('tr').remove();
  var deleteThisIdForm=deleteFromArray('delete','row_id',row_id_Del);
  if(deleteThisIdForm){ console.log('Deleted Success'); };
  
  if(lengthTblArray==1)
  {
    
    newRecordFact();
    $('#factureTable td[data-target="Type"]').focus();
    $('#factureTable td[data-target="Type"]').text(lastType);
  }
  updateTotal_Fact();

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
              console.log('Form Array updated');
              console.log(arrGrilleDeFacturation_forms);
              return false;

            }
          }
        }
    return true;
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

function robData(){
  var formData=[];
  var rowData=[];

                  var row_id_count=[];
  $.post("allScriptsv1.py", {tx: "getFactureInfo", patientId: '234577', nodossier: '39' , nofact: '30'},
          function(result){
                if(result.outcome == 'error')
                    $("#message").append(result.message);
                else
                    $("#message").append("<h2>&nbsp;Creation of the file was .... </h2>");
                  console.log(result);
                  formData=result.infos;
                  rowData=result.rows;
                  populate_tbl_from(formData,rowData);


                  $.each(rowData,function(idx,value){
                    $.each(value,function(id,val){
                     if(id=="row_id"){
                        row_id_count.push(val);
                      }
                     })
                  })
                  var max = Math.max.apply(Math, row_id_count);

                  fact_tbl_row_id=max;
            });



}

function populate_tbl_from(arrayForm,arrayTbl)
{
  
  emptyTable('populate');
  arrGrilleDeFacturation=arrayTbl;
  arrGrilleDeFacturation_forms=arrayForm;
  arrGrilleDeFacturation_forms_update=arrayForm;
  populate_table_fact(arrGrilleDeFacturation);
}



function populate_table_fact(arrToPopTabl){

    var arrayToPopulate=arrToPopTabl;

    // arrGrilleDeFacturation_update=arrayToPopulate;
    // console.log(arrGrilleDeFacturation_update);


    var tblBody=$('#factTableBody');

          $.each(arrayToPopulate,function(idx,val){
            // val - each row

              //only Rows with ramq_id ( RAMQ )
            // fact_tbl_row_id_=val.row_id;
            // ramq_id=val.ramq_id

            tblRow=$('<tr>').attr('id',val.row_id).attr('ramq_id',val.ramq_id);

            var fields=['Type','Dent','Surface','Code','Description','Frais','Honoraires','Total','Prod','codeRole'];

                 for(i=0;i<10;i++)
                  {

                       switch (i) {

                       case 0: //Type
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).text(val.Type);
                       break;

                       case 1:
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).text(val.Dent);
                       break;

                       case 2:
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).text(val.Surface);
                       break;

                       case 3:
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).text(val.Code);
                       break;

                       case 4:
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).text(val.Description);
                       break;

                       case 5:
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).attr('class','mont').text(val.Frais);
                      tblData.appendTo(tblRow);
                      tblData=$('<td>').attr('class','dol').text('$');
                        
                      break;

                       case 6:
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).attr('class','mont').text(val.Honoraires);
                        tblData.appendTo(tblRow);
                      tblData=$('<td>').attr('class','dol').text('$');
                       break;

                       case 7:
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).attr('class','mont').text(val.Total);
                        tblData.appendTo(tblRow);
                      tblData=$('<td>').attr('class','dol').text('$');
                       break;

                       case 8:
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).text(val.Prod);
                       break;

                       case 9:
                       tblData=$('<td>').attr('contenteditable','true').attr('data-target',fields[i]).text(val.codeRole);
                       break;
                      }
                    tblData.appendTo(tblRow);
                  }
                   tblData=$('<td>').append('<div class="ui axxium tiny button" onclick="modFactTableMore(this,arrGrilleDeFacturation_forms);" >Plus</div><div class="ui axxium tiny button" onclick="deleteRow(this);" >Supprimer</div>');
               tblData.appendTo(tblRow);


                tblRow.appendTo(tblBody);
        });

}

function ReInitialize_fact_tbls()
{
  // To Re-Initialize all three Tables - FactureTable / PlanTraitement / Regie Table

  //Facture-Table Re-Initialize
  emptyTable('newTbl'); 

  //PlanTrait
  emptyTable_planTrait();

  //Regie

}

function updateTotal_Fact()
{
  // var thisTotalVal=$(x).closest('tr').find('td[data-target="Total"]').text();
  var allTrs=$('#factTableBody tr');
  var fact_total=0;
  
  $.each(allTrs,function(id,val){

    var thisTotalVal=$(val).find('td[data-target="Total"]').text();
    if(thisTotalVal!='')
    { 
      fact_total=parseFloat(fact_total)+parseFloat(thisTotalVal);
    }

  })


  if(fact_total=='NaN'){ fact_total=0.00};
  fact_total=(parseFloat(fact_total)).toFixed(2);
  $('.fact_tot').val(fact_total);

  
}

function checkIfAnyCodeFieldEmpty(tableName)
{
  var checkFlag=0;
  
      var alltds=$('#'+tableName+' tr td[data-target="Code"]');
      $.each(alltds,function(id,val){
        if($(val).text()=='')
        {
           checkFlag=1;
           return false;
        }
      })

       if(checkFlag==1)
        {
              if(globLang=='en')
            {
              alert('Please fill all the Code Fields before proceeding');
              return false;
            }
            else
            {
              alert('Veuillez remplir tous les champs de code avant de continuer');
              return false;
            }
        }
      else
        {
          if(tableName=='factTableBody')
          {
            RamqUpdateGlobalBill();
          }
          else
          {
            PlnTrSavePlan(false);
          }
      

          checkFlag=0;
        }
   


}

// Populate-Fact-Table-Guide
// Call populate_tbl_from(testForm,testArray) with Form-Array & TableData
//--TEST DATA--
// testArray=[{row_id:'1',Type:"SSQ",Dent:"ASD",Surface:"hello",Code:"01200",Description:'XYZZZ SJHXL SL',Frais:'123',Honoraires:'222',Total:'111',Prod:'1'}];
// testForm=[[{name: "row_id", value: "1"},{name: "no_autor_proth_acryl_denti", value: "ASD"},{name: "liste_med_consm_denti", value: "A"},{name: "liste_elm_contx_denti", value: "38"}, 
// {name: "liste_elm_mesur_denti", value: "/153"}]];