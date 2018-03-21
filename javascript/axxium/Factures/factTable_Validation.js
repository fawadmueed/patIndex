
  function drawOdonFact(aCanvas)
  {
    //alert("Draw the whole thing!");
  	var canvas = document.getElementById(aCanvas);
    var ctx = canvas.getContext("2d");
  	canvas.width = 600 * odoX;
  	canvas.height = 395 * odoY;
  	var background = new Image();
  	background.src = "images/odontogramme.png";

  	background.onload = function(){
      	ctx.drawImage(background,0,0,canvas.width,canvas.height);

		//Amalgame and Composite
		drawRest(ctx,mapping["amalgame"],mapping["composite"],odonto.exist);

		//Exo
		drawExo(ctx,"ffffff",odonto.exist);

		//Endo
		drawEnd(ctx,mapping["exist"],odonto.exist);

		//Peripiale
		drawPer(ctx,mapping["todo"],odonto.exist);

		//Rotation top
		drawRto(ctx,mapping["todo"],odonto.exist);

		//Rotation bottom
		drawRbo(ctx,mapping["todo"],odonto.exist);

		//Corps etranger
		drawEtr(ctx,mapping["todo"],odonto.exist);

		//Incluse
		drawInc(ctx,mapping["todo"],odonto.exist);

		//Pontique
		drawPon(ctx,mapping["exist"],odonto.exist);

		//Couronne
		drawCou(ctx,mapping["exist"],odonto.exist);
	  };
  }

  var dataJson_Code;

  var dataSurfaceRules;
     $.ajax({
  type:'GET',
  url:"json/factureValidation/rules.json",
  async:false,
  dataType: 'json',
  success: function (data) {
    dataSurfaceRules=data;
   }
 });


  var msgerr;
     $.ajax({
  type:'GET',
  url:"json/factureValidation/msgerr.json",
  async:false,
  dataType: 'json',
  success: function (data) {
    msgerr=data;
   }
 });

 var insuranceData;
     $.ajax({
  type:'GET',
  url:"json/insurances/insurances.json",
  async:false,
  dataType: 'json',
  success: function (data) {
    insuranceData=data;
   }
 });


var codesData;
  $.ajax({
    type:'GET',
    url:"json/params/codes.json",
    async:false,
    dataType:'json',
    success: function(data){
      codesData=data;
    }
  })
     // console.log(insuranceData);

$(document).ready(function(){

//$(document.body).on('focusin', "#factTableBody td[data-target='Type'] ,#factTableBody_regie td[data-target='Type']", function(){
//    	$(this).text('CAS');
//     });

// $(document.body).on('focusin', "#factTableBody td[data-target='Dent'],#factTableBody_regie td[data-target='Dent']", function(){
//     	$(this).text('');
//      });

// $(document.body).on('focusin', "#factTableBody td[data-target='Surface'],#factTableBody_regie td[data-target='Surface']", function(){
//     	$(this).text('');
//      });

//$(document.body).on('focusin', "#factTableBody td[data-target='Code'],#factTableBody_regie td[data-target='Code']", function(){
//    	$(this).text('');
//     });

//$(document.body).on('focusin', "#factTableBody td[data-target='Frais'],#factTableBody_regie td[data-target='Frais']", function(){
//    	$(this).text('');
//     });

//$(document.body).on('focusin', "#factTableBody td[data-target='Honoraires'],#factTableBody_regie td[data-target='Honoraires']", function(){
//    	$(this).text('');
//     });

$(document.body).on('focusout', "#factTableBody td[data-target='Type'] ,#factTableBody_regie td[data-target='Type']", function(){

    var valid;
    var val=$(this).text();
    valid=validation('Type',val);
    

    if(valid && (val=="AMQ" || val=="BES" || val=="HOP"))
      {
        
        $(this).closest('tr').find('.plus').removeClass('disabled');
        
        roleDisableFlag=false;
        
        //Always 1 - From Roberto 16/3/2018
          $(this).siblings('td[data-target="codeRole"]').text('1');
        
        

        // $(this).siblings("td[data-target='codeRole']").attr('contenteditable','false').text('--');
      }
      else if(val=="CAS")
      {
        
        $(this).closest('tr').find('.plus').addClass('disabled'); 
        roleDisableFlag=true;
        $(this).siblings('td[data-target="codeRole"]').text('-');
      }
    else{
        $(this).siblings('td[data-target="codeRole"]').text('-');
        roleDisableFlag=true;

        $(this).closest('tr').find('.plus').addClass('disabled'); 
        $(this).siblings("td[data-target='codeRole']").attr('contenteditable','true');
      }
      
    if(!valid){
      $(this).focus();
      $(this).text('');
    }
});

    $(document.body).on('focusout', "#factTableBody td[data-target='Dent'],#factTableBody_regie td[data-target='Dent'],#factTableBody_planTrait td[data-target='Dent']", function(){


    var valid;
    var val=$(this).text();

    var dent_chck=val;
    var surf_chck=$(this).siblings("td[data-target='Surface']").text();
    var type_val=$(this).siblings("td[data-target='Type']").text();
    var chckDentSurf=chckDentSurfExistTbl(dent_chck,surf_chck);

    if(!chckDentSurf){

          warnMsg(msgerr.msg041);
          $(this).focus();
          $(this).text('');
    }
    else{

        valid=validation('Dent',val);

         if((val=="")||(val==null))
          {
            // warnMsg('No Value entered in DENT. Selecting default value 1.')
            // alert("No Value, Selecting default Val :1");
            // $(this).text('1');
            valid=true;
          }
          else
          {
            valid=validation('Dent',val);
          }

       if(!valid){
            valid=true;
            warnMsg(msgerr.msg013);          
            $(this).text('');
            $(this).focus();
          }

      }

});


    $(document.body).on('focusout', "#factTableBody td[data-target='Surface'],#factTableBody_planTrait td[data-target='Surface']", function(){

    init_code = '';
    globVarMessageErrorValidation = '';

    tables_object=$(this);

    var val=$(this).text();
    var this_row_id=$(this).parent("tr").attr('id');
    var surf_chck=val;
    var type_chck=$(this).siblings("td[data-target='Type']").text();
    var dent_chck=$(this).siblings("td[data-target='Dent']").text();
    var code_chck=$(this).siblings("td[data-target='Code']").text();


    //-- Set global variable for  surf_code_dent_gen_validation function 
    globVarSurfValidation_val=val;
    globVarSurfValidation_surf_chck=surf_chck;
    globVarSurfValidation_dent_check=dent_chck;
    globVarSurfValidation_type_chck=type_chck;
    globVarSurfValidation_code_chck=code_chck;
    globVarSurfValidation_this_row_id=this_row_id;


    var chckDentSurf=chckDentSurfExistTbl(dent_chck,surf_chck);

    if(!chckDentSurf)
    {
      warnMsg(msgerr.msg041);
       $(this).focus();
       $(this).text('');
    }
    else 
    {
      //--------------- suf_dent_code ---------------------------------
      var age=get_age();
      var type_surf=get_type_surf(val);
    
     // If Number Typesurf=1  
    if(type_surf == 1 || surf_chck == 'TI') 
      {
        surf_code_dent_gen_validation();
        if(surf_chck == 'TI') 
          {
            $(this).text('97');
          }
      } 

      else 
      {
        if(robValidation(type_chck,code_chck,dent_chck,age,surf_chck)) 
        {
          // Generate CODE based on SURFACE DENT,SURFACE & TYPE -
          if(type_chck!= '' && dent_chck != '' && surf_chck != '') 
          {
            facture_surf_modal();
          }

        }  
      }

      //if(robValidation(type_chck,code_chck,dent_chck,age,surf_chck)) {
      //  // Generate CODE based on SURFACE DENT,SURFACE & TYPE -
      // if(type_chck!= '' && dent_chck != '' && surf_chck != '') {
      //    facture_surf_modal();
      //  }
      //}

  //-- Set global variable for  surf_code_dent_gen_validation function 
      //globVarSurfValidation_val=val;
      //globVarSurfValidation_surf_chck=surf_chck;
      //globVarSurfValidation_dent_check=dent_chck;
      //globVarSurfValidation_type_chck=type_chck;
      //globVarSurfValidation_code_chck=code_chck;
      //globVarSurfValidation_this_row_id=this_row_id;
  }

    // STEP # 1   //752 line U_FACTPA

    //------------------------------------------------------

});

    $(document.body).on('focusin', "#factTableBody td[data-target='Code'],#factTableBody_regie td[data-target='Code'], #factTableBody_planTrait td[data-target='Code']", function(){
    
    if(code_to_prod_flag==1)
    {
      if($(this).text()!='')
      {
        code_to_prod_flag=0;
        $(this).siblings("td[data-target='Prod']").focus();

      }
    }

  })


    $(document.body).on('focusout', "#factTableBody td[data-target='Code'],#factTableBody_planTrait td[data-target='Code']", function(){

      globVarMessageErrorValidation = '';
      var type_s=$(this).siblings("td[data-target='Type']").text();
      var dent_s=$(this).siblings("td[data-target='Dent']").text();
      var surf_s=$(this).siblings("td[data-target='Surface']").text();
      var code_s=$(this).text();
      
      if(code_s == '')
      {
       return;
      }

      var age=get_age();
      var codeValid=robValidation(type_s,code_s,dent_s,age,surf_s);

      if(!codeValid) 
      {
        warnMsg(globVarMessageErrorValidation);
        $(this).focus();
        $(this).text('');
        $(this).siblings('td[data-target="Description"],[data-target="Frais"],[data-target="Honoraires"],[data-target="Total"]').text('');
      }
      else {
        var surfValid=chckDentCodeExistTbl(dent_s,code_s,surf_s);

        if(surfValid)
        {
          var valid;
          var val=$(this).text();
          var popData=$(this).parent();
          var code_data=getCodeData(val);

          if(code_data && val!="")
          {  
            //1 = Tarif Regulier , 2 = Tarif Special , 3 is Regie  
            $(popData).children("td[data-target='Description']").text(code_data.descrf);
            $(popData).children("td[data-target='Prod']").text(code_data.producer);
            $(popData).children("td[data-target='Frais']").text(parseFloat(code_data.frais_lab).toFixed(2));
            if(type_s=="AMQ" || type_s=="BES" || type_s=="HOP") {
              $(popData).children("td[data-target='Honoraires']").text(parseFloat(code_data.prixa).toFixed(2));
            }
            else {
              if(type_rate_glbl === undefined || parseInt(type_rate_glbl) == 1) //regulier or special
                $(popData).children("td[data-target='Honoraires']").text(parseFloat(code_data.prixr).toFixed(2));
              else
                $(popData).children("td[data-target='Honoraires']").text(parseFloat(code_data.prixs).toFixed(2));      
            }
          }
          else
          {
            warnMsg(msgerr.msg0163.replace("@@", val));
            $(this).focus();
          }

          var sibl=$(this).siblings("td[data-target='Honoraires']");
          var hono;
          if($(sibl).text()=="")
          {
            hono=0;
            rhono=hono.toFixed(2);
          }
          else{
            hono= parseFloat($(sibl).text());
            rhono=hono.toFixed(2);
          }

          var sibl=$(this).siblings("td[data-target='Frais']");

          if($(sibl).text()=="")
          {
            frais=0;
            rfrais=frais.toFixed(2);
          }
          else{
            frais= parseFloat($(sibl).text());
            rfrais=frais.toFixed(2);
          }

          var totalVal=parseFloat(parseFloat(rhono)+parseFloat(rfrais)).toFixed(2);
          var total=$(this).siblings("td[data-target='Total']");
          $(total).text(totalVal);

          
          if((tables_object.siblings("td[data-target='Code']").text())=='')
          {
             tables_object.siblings("td[data-target='Code']").focus();
          }
          else
          {
            tables_object.siblings("td[data-target='Prod']").focus();
          } 
          // return true;

        }
        else 
        {
          warnMsg(msgerr.msg041);
          $(this).focus();
          $(this).text('');
          return false;
        }


      }

     });


    $(document.body).on('focusout', "#factTableBody td[data-target='Frais'],#factTableBody_regie td[data-target='Frais', #factTableBody_planTrait td[data-target='Frais']", function(){

        var valid;
        var valFrais=$(this).text();
        $(this).text(parseFloat(valFrais).toFixed(2));

        // check_charcount("factTableBody td[data-target='Frais' ", 4, e);

     if(valFrais=="")
          {
            valFrais=0;
            rvalFrais=valFrais.toFixed(2);
            $(this).text('');
          }
      else{
            valFrais=parseFloat(valFrais);
            rvalFrais=valFrais.toFixed(2);
          }

        var sibl=$(this).siblings("td[data-target='Honoraires']");
        var hono;
        if($(sibl).text()=="")
          {
            hono=0;
            rhono=hono.toFixed(2);
          }
          else{
            hono= parseFloat($(sibl).text());
            rhono=hono.toFixed(2);
          }


        var totalVal=parseFloat(parseFloat(rvalFrais)+parseFloat(rhono)).toFixed(2);

        var total=$(this).siblings("td[data-target='Total']");
        $(total).text(totalVal);

    });

     $(document.body).on('focusout', "#factTableBody td[data-target='Honoraires'],#factTableBody_regie td[data-target='Honoraires'], #factTableBody_planTrait td[data-target='Honoraires']", function(){

        var valid;
        var valHono=$(this).text();
        $(this).text(parseFloat(valHono).toFixed(2));

        if(valHono=="")
          {
            valHono=0;
            rvalHono=valHono.toFixed(2);
            $(this).text('');
          }
          else{
            valHono= parseFloat(valHono);
            rvalHono=valHono.toFixed(2);
          }

        var sibl=$(this).siblings("td[data-target='Frais']");

     if($(sibl).text()=="")
          {
            frais=0;
            rfrais=frais.toFixed(2);
          }
          else{
            frais= parseFloat($(sibl).text());
            rfrais=frais.toFixed(2);
          }

        console.log(rfrais.replace(/\ $/g,''));
        console.log(rvalHono.replace(/\ $/g,''));

        var totalVal=parseFloat(parseFloat(rvalHono)+parseFloat(rfrais)).toFixed(2);

        console.log(totalVal.replace(/\ $/g,''));

        var total=$(this).siblings("td[data-target='Total']");

        $(total).text(totalVal);

    });

     $(document.body).on('focusout', "#factTableBody td[data-target='codeRole'],#factTableBody_regie td[data-target='codeRole', #factTableBody_planTrait td[data-target='codeRole']", function(){

      var thisTxt=$(this).text();
      var type=$(this).siblings("td[data-target='Type']").text();

      if(type=="AMQ" || type=="BES" || type=="HOP")
      {
       $(this).text('1');
      }
      // else{
      //   if(thisTxt == '')
      //     return;

      //   $(this).text('');
      //   warnMsg('Null Role when Type is not AMQ/BES/HOP');
      // }

   });

     });

//     }

//    else
//    {
//     console.log('VALIDATION IN-ACTIVE');
//    }
// // =====================================================================
// });
  function surface_validation(typ,dent,surf,code)
  {

    if(!(typ == 'AMQ' || typ == 'BES' || typ == 'HOP' || typ =='CAS'))
    {
      // console.log('no amq bes typ code validation');
      typ = 'ASS'; //ASS for all others insurance
    }

   for( var i=0; i <dataSurfaceRules.length; i++)
        {

              for( var i=0; i < dataSurfaceRules.length; i++)
               {
                  if(dataSurfaceRules[i].ins == typ && dataSurfaceRules[i].too == dent && dataSurfaceRules[i].surf == surf && dataSurfaceRules[i].cod == code)
                  {
                      alert(dataSurfaceRules[i].msg);
                return false;
                //break;
                  }
                }

        }

          return true;
}

 function warnMsg(msg)
 {

  if($('#divFacturationSub').hasClass('active'))
  {
    var selector='wrn_msg_fact_tbl';
  }
  else if($('#divPlnTrSub').hasClass('active'))
  {
    var selector='wrn_msg_fact_tbl_planTrait';
  }
    // $('#wrn_msg_fact_tbl').removeClass('hidden');
    $('#' + selector).finish();
    $('#'+selector+' > '+'#warn_msg_fact_content').text(msg);
    $('#'+selector).addClass('visible').fadeIn("fast").delay(4000).fadeOut("slow",function(){
      $('#'+selector).removeClass('visible');
      $('#'+selector).addClass('hidden');
    });

 }

  function validation(type,val)
  {
    // console.log(type);
    // =========== TYPE VALIDATION==============
    if(type=="Type")
    {
      //Condition 2: If none of AMQ BES HOP and CAS and Selected DrpDown Value - MESSAGE ERROR
      if ((!(val=="AMQ"||val=="BES"||val=="HOP" ))&&(!(val=="CAS"))&&(!(val==$("#ramq_select").val()))&&(!(ifExist=checkInsuranceExist(val))))
      {
        // alert('Error! No type selected');
        // warnMsg('TYPE error. Please enter correct type.')
        // return false;
        warnMsg("Le type n'est pas CAS, AMQ ou COMPAGNIE D'ASSURANCE");
        return false;
      }
      //Condition 3: If AMQ BEs HOP check RAMQ Card Number & Expiry
      if(val=="AMQ" || val=="BES" || val=="HOP"){

          if(!($('#optRegiIndFactAssosDrNo').is(':checked')))
          {
            // If ramq_no field equal 1 , Bypass both Validation AMQ and Expiry
              //var ramq_field=$('#ramq_no').val();
              var ramq_field = 1;// Bypass validation
            if(ramq_field==1)
              {
                return true;
              }

              var valid_ramq=check_Ramq_Num();

              if(!valid_ramq)
              {
              // alert('Invalid RAMQ Card Number : Please check Ramq Card Number');
              warnMsg('Invalid RAMQ card number. Please check RAMQ card number.');
              return false;

              }
              else
              {
                warnMsg('Checking expiry Now');
                var check_exp=check_ramq_exp();
                if(!check_exp){
                  warnMsg('RAMQ card expired. Please put valid RAMQ card.')
                  return false;
                }
                return true;

              }
          }
      else{
          // console.log('RAMQ NO empty, ByPass Validation')
            return true;
          }

          $(this).siblings("td[data-target='Code']");
    }
    else{
        return true;
        }

  }
  // =========== DENT VALIDATION==============

  if(type=='Dent'){
    if((val=='')||(val==null)){
      valid=true;

    }
    // console.log(dent_Type);

    val=parseInt(val);
    switch(dent_Type){

    case 'Denturologiste':
      if((val>=11 && val<=18)||(val>=21 && val<=28)||(val>=31 && val<=38)||(val>=41 && val<=48)||(val>=51 && val<=55)||(val>=61 && val<=65)||(val>=71 && val<=75)||(val>=81 && val<=88) || isNaN(val))
      {
        return true;
      }
      else
      {
        warnMsg('Invalid input. This value does not exist for Denturologiste Dent type.');
        return false;
      }
      break;

    case 'Dentiste':

      if((val>=0 && val<=8)||(val>=10 && val<=20)||(val>=21 && val<=28)||(val>=30 && val<=38)||(val>=40 && val<=48)||(val>=51 && val<=55)||(val>=61 && val<=65)||(val>=71 && val<=75)||(val>=81 && val<=85)||(val==99)|| isNaN(val))
      {
        return true;
      }
      else
      {
        warnMsg('Invalid input. This value does not exist for Dentiste Dent type.');
        return false;
      }
      break;

    default:
       if((val<1)||(val>85))
    {
      warnMsg('Invalid input.This value does not exist for any Dent Type.')
      return false;
    }
else{
    return true;
    }


  }

 }
}

  function check_Ramq_Num(){
// RULES
    // The Health Insurance Number, unique to each person, consisting of:
    // the first 3 letters of the last name
    // the first letter of the first name
    // the last 2 digits of the year of birth
    // the month of birth (to which 50 is added to indicate female)
    // the day of birth
    // an administrative code used by the Régie

    console.log('Checking RAMQ Card Number');
    var ramq_num=$('#ramq_no').val(); //get ramq_number
    var firstName=$('#Elast').val();
    var lastName=$('#Efirst').val();
    var Sexe=$('#sexe').val();
    var sexe_factor=0;
    var formD=$('#Ebirth').val()
    var formD_comp=formD.split('-');
    var formD_month=formD_comp[1];
    var formD_year=formD_comp[0];
    var formD_day=formD_comp[2];

    lastName=lastName.slice(0,3);
    firstName=firstName.slice(0,1);


    var lastName_ramqNo=ramq_num.slice(0,3);
    var firstName_ramqNo=ramq_num.slice(3,4);
    var birthYear_ramqNo=ramq_num.slice(4,6);
    var birthMonth_ramqNo=ramq_num.slice(6,8);
    var birthDay_ramqNo=ramq_num.slice(8,10);
    formD_year=formD_year.slice(2,4);
    //console.log("here :" + formD_year+50);

    if(Sexe=='F')
    {
      formD_month=parseInt(formD_month);
      sexe_factor=50;

    }
    else
    {
      sexe_factor='';
    }

    var ramqNumber_toBe=lastName+firstName+formD_year+(sexe_factor+formD_month)+formD_day+ramq_num.slice(10);
    // console.log(ramqNumber_toBe);

    if(ramqNumber_toBe==ramq_num)
    {
      // console.log('Correct Ramq Number');
      return true;
    }
    else
    {
      // console.log('Wrong Ramq Card number');
      return false;
    }


    // if((lastName==lastName_ramqNo)&&(firstName==firstName_ramqNo)&&())
    // {
    //   console.log(lastName+firstName);
    //   console.log('Fname and Last name good');
    // }
    // else
    // {
    //   console.log('Sorry');
    // }



   //  var nthDigit_number=ramq_num.slice(10,11);

   //  if(!(nthDigit_number==9))
    // {
   //    alert('Not working');
    //  return false;
    // }
    // else
    // {
   //    alert('working');
    //  return true;

    // }

  }

  

  function check_ramq_exp(){

    var formD=$('#ramq_exp').val()
    var formD_comp=formD.split('-');
    var formD_month=formD_comp[1];
    var formD_year=formD_comp[0];

    var d1 = new Date();
    var curMonth=d1.getMonth()+1;
    var curYear=d1.getYear()+1900;

    if(curYear<formD_year)
    {
      return true;
    }
    else if(curYear==formD_year)
    {
      if(curMonth<formD_month)
      {
      return true;

      }
      else
      {
      alert('Card is Expired');
      $(this).text('CAS');
      return false;
      }
    }
    else
    {
      alert('Card is Expired');

      return false;
    }
  }



function getCodeData(codeVal){

  return dataJson_Code[codeVal];
  
}
function chckCodeException(code) {

  var trs=$('#factTableBody tr ');
  var codeFound=0;

  $.each(trs, function(id,val){
    var cur_Code= $(val).find('td[data-target=Code]').text();
    if(code==cur_Code && (is_ablation_code(code))){
      codeFound=codeFound+1;
    }
  });

  if(codeFound>=2) {
    return false;
  }
  else{
    return true;
  }
}

function chckDentCodeExistTbl(dent,code,surf)
  {
    var trs=tables_object.parent().parent().find('tr');

    var found=0;

    $.each(trs, function(id,val){

      var cur_Dent= $(val).find('td[data-target=Dent]').text();
      var cur_Code= $(val).find('td[data-target=Code]').text();
      var cur_Surf= $(val).find('td[data-target=Surface]').text();

      if(dent==cur_Dent && code==cur_Code && surf==cur_Surf) {
        found=found+1;
      }

    });

    if((found>=2)) {
      return false;
    }
    else{
      return true;
    }

}

function chckDentSurfExistTbl(dent,surf)
  {
    if(surf == ''|| dent == '')
      return true;

    var trs=tables_object.parent().parent().find('tr');
    var found=0;

    $.each(trs, function(id,val){

      var cur_Dent= $(val).find('td[data-target=Dent]').text();
      var cur_Surf= $(val).find('td[data-target=Surface]').text();
      // cur_Surf
      if(dent==cur_Dent && cur_Surf.trim()==surf.trim()){
        found=found+1;
      }
    });

     if(found>=2) {
      console.log('validation false after Surf Dent Occurrence dentfound>=2 surffound>=2');
      return false;

    }
    else{
    return true;
  }

}

function checkRepeatChrcInString(str){
  var reslt;
  console.log('Check repeat function');
  console.log('String received' + str);
   try{
    reslt=str.toLowerCase().split("").sort().join("").match(/(.)\1+/g).length;
    console.log('Result of STRING Repeat :'+reslt);
    return reslt;  }
   catch(e){
    console.log('Result of STRING Repeat is 0');
   return 0; } // if TypeError
}

function get_age(){


  var curr_date=get_date();
  var curr_date_arr=curr_date.split('-');

  var curr_year=curr_date_arr[0];
  var curr_month=curr_date_arr[1];
  var curr_day=curr_date_arr[2];

  var formD = globVisionRData.DatNaissPers;
  formD=formD.split('-');

  var patnt_year=formD[0];
  var patnt_month=formD[1];
  var patnt_day=formD[2];


  // var d1 = new Date();
  // var curYear=d1.getYear()+1900;

  var age= parseInt(curr_year)-parseInt(patnt_year);

  if(parseInt(patnt_month)>=parseInt(curr_month))
  {
    if(parseInt(patnt_day)>parseInt(curr_day))
      {
        age=parseInt(age)-1;
      }
  }
  return age;
}


function checkInsuranceExist(compny){
  var validation;

  $.each(insuranceData,function(key,val){
    if(val.code==compny)
    {
      validation=true;

    }

  })

  if (validation==true){
      return true;
  }
  else{
    return false;
  }

}

function surf_code_dent_gen_validation() {

    var type_surf;
    var val = globVarSurfValidation_val;
    var surf_chck = globVarSurfValidation_surf_chck;
    var dent_chck = globVarSurfValidation_dent_check;
    var type_chck = globVarSurfValidation_type_chck;
    var code_chck = globVarSurfValidation_code_chck;
    var this_row_id = globVarSurfValidation_this_row_id;

    console.log('VALIDATION PROGRAM CALLED *****');

    var surf_dent_code;
    if (dent_Type == 'Denturologiste') {

        if (((dent_chck >= 11 && dent_chck <= 18) || (dent_chck >= 21 && dent_chck <= 28) || (dent_chck >= 31 && dent_chck <= 38) || (dent_chck >= 41 && dent_chck <= 48) || (dent_chck >= 51 && dent_chck <= 55) || (dent_chck >= 61 && dent_chck <= 65) || (dent_chck >= 71 && dent_chck <= 75) || (dent_chck >= 81 && dent_chck <= 85)) || (dent_chck == '')) {
            surf_dent_code = true;
            console.log('fact code gen condition :' + surf_dent_code);
        } else {
            warnMsg(msgerr.msg013);
            $(this).focus();

        }

    }
    else {
      if (dent_chck == '99') {

      }
      else 
      {
        if(val == 'TI') {
          globVarSurfValidation_val = surf_chck = globVarSurfValidation_surf_chck = val = '97';
        }
      // STEP # 2   ----- LINE 804 U_FACTPA typ_surf := read_surface;
      type_surf = get_type_surf(val);
      console.log('Type_Surf Value is : ' + type_surf);

      // STEP # 3  4015 line u_fact2 switch cases

      switch (type_surf) {

          case 1:
              console.log('In type surf case 1 ');
              var row_id_case1;
              row_id_case1=this_row_id;

              if ((type_chck == 'AMQ') || (type_chck == 'BES')) {
                  warnMsg(msgerr.msg018);
              }
              if (dent_chck == '') {
                  warnMsg(msgerr.msg019);
              }
              
              if (dent_Type != 'Denturologiste') {
                surf_classe(dent_chck, surf_chck);
              
              if(init_code!='')
              {
                $('.surfNumModal').modal('show');
                
                $('.surfNumSel').click( function(e){
                  
                  e.stopPropagation();
                  row_id_case1=globVarSurfValidation_this_row_id;
                  var surf_chck_new =$(this).text();
                  $('.surfNumModal').modal('hide');
                  var this_code_val= tables_object.siblings("td[data-target='Code']").text(init_code);
                  var this_code_val= tables_object.text(surf_chck_new);
                  tables_object.siblings("td[data-target='Prod']").focus();
                  var callCode=tables_object.siblings("td[data-target='Code']").trigger("focusout");
                  //   if(callCode)
                  //   {
                  //     return true;
                  //   }
                  
                   if((tables_object.siblings("td[data-target='Code']").text())=='')
                    {
                       tables_object.siblings("td[data-target='Code']").focus();
                    }                  
                  
                });

              }
              else
              {
                $(this).focus();
                warnMsg(msgerr.msg021);
              }
          


            }

             tables_object.siblings("td[data-target='Prod']").focus();
                
            
            
              console.log(init_code);
              break;

          case 2:

              console.log('In type surf case 2 ');
              if ((type_chck == 'AMQ') || (type_chck == 'BES')) {
                  warnMsg(msgerr.msg018);
              }

              // New Window Condition have to put later !
              console.log(init_code);
              break;

          case 3:
          case 5:

              console.log('In type surf case 3 ');

              if (dent_chck.length == 0) {
                  warnMsg(msgerr.msg019);
              }

              if (type_chck == 'AMQ' || type_chck == 'BES' || type_chck == 'HOP') {
                  // 4118 in u_fac2
                  var generate_code = gene_amq(dent_chck, val);
                  console.log('gene_amq status is : ' + generate_code);
                  if (generate_code) {

                      //checkcode in Code JSON File
                      var check_init_code = '';
                      check_init_code = getCodeData(init_code);
                      console.log('Case 3, Verifying Generate Code in JSON FILE');
                      console.log('Sent code :' + init_code + ': received data if :' + check_init_code);
                      if (check_init_code != '') {
                          console.log('The Generated code from CASE 3 , found in JSON FILE');

                      }

                      //find generated code in AMQ_Codes
                      var check = $.inArray(init_code, regiecodes);
                      if (check == -1) {
                          // FALSE VALIDATION VALUE
                          //-1 if not found
                          console.log('Generated Code NOT FOUND in Regie Codes!' + init_code);
                          warnMsg('Le code ' + init_code.Tostring() + 'n\'est pas un code RAMQ');
                      } else {
                          console.log('Generated Code FOUND in Regie Codes!' + init_code);

                      }

                  }

              } else if (is_dent_anterieur(dent_chck)) {
                  if ((code_chck == ' ') || (surf_chck == 'O')) {
                      // FALSE
                      warnMsg(msgerr.msg021);
                  }

              } else {
                  if ((code_chck == ' ') || (surf_chck == 'I')) {
                      //FALSE
                      warnMsg(msgerr.msg021);
                  }

              }

              console.log('init code b4 surf alpha fn :' + init_code);
              var surf_alpha = surf_alpha_fn(val, dent_chck);
              console.log('Done with function surf_alpha, Init code is :' + init_code);

              var check_init_code = '';
              check_init_code = getCodeData(init_code);
              console.log('Case 3, Verifying Generate Code in JSON FILE');
              console.log('Sent code :' + init_code + ': received data if :' + check_init_code);
              if (check_init_code != '') {
                  console.log('The Generated code from CASE 3 , found in JSON FILE');

              }

              console.log(init_code);
              break;

          case 4:

              break;
      }
    }
  }
    if(type_surf!=1)
    {
      surf_focusout_finish = true;
      code_to_prod_flag=1;
      var this_code_val =  tables_object.siblings('td[data-target="Code"]').text(init_code).trigger("focusout");
      

      // $("#factTableBody td[data-target='Code'],#factTableBody_regie td[data-target='Code").trigger("focusout");
    }

}