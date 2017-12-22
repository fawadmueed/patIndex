 
    var dataJson_Code;      
      $.ajax({
  type:'GET',
  url:"json/params/codes6.json",
  async:false,
  dataType: 'json',
  success: function (data) {
    dataJson_Code=data;
  }

 })
  
  var dataSurfaceRules;
     $.ajax({
  type:'GET',
  url:"json/factureValidation/rules.json",
  async:false,
  dataType: 'json',
  success: function (data) {
    dataSurfaceRules=data;
   }
 })

       var insuranceData;
     $.ajax({
  type:'GET',
  url:"json/insurances/insurances.json",
  async:false,
  dataType: 'json',
  success: function (data) {
    insuranceData=data;
   }
 })
     console.log(insuranceData);

    $(document).ready(function(){

       
  

     $(document.body).on('focusout', "#factTableBody td[data-target='Type'] ,#factTableBody_regie td[data-target='Type']", function(){

    var valid;
    var val=$(this).text();
    if(val=="")
    { // Condition 1 : If no entries , type CAS
      // alert("Selecing Default Type:CAS");
      $(this).text('CAS');
      warnMsg('Selecting Default TYPE : CAS ');
      valid=true;
    }
    else
    {
      valid=validation('Type',val);
    }

    if(!valid){
      $(this).focus();
      $(this).text('');
      
    }
     });

    $(document.body).on('focusout', "#factTableBody td[data-target='Dent'],#factTableBody_regie td[data-target='Dent']", function(){

  
    var valid;
    var val=$(this).text();
  
    var dent_chck=val;
    var surf_chck=$(this).siblings("td[data-target='Surface']").text();
    var chckDentSurf=chckDentSurfExistTbl(dent_chck,surf_chck);

    if(!chckDentSurf){
          warnMsg('Same procedure already exist. Please change Dent or Surface values');
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
            alert('Wrong Range! Please Enter Correct value.');
            $(this).text('');
            
          }

      }

});

    $(document.body).on('focusout', "#factTableBody td[data-target='Surface'],#factTableBody_regie td[data-target='Surface']", function(){

    var val=$(this).text();

    var surf_chck=val;
    var dent_chck=$(this).siblings("td[data-target='Dent']").text();
    var chckDentSurf=chckDentSurfExistTbl(dent_chck,surf_chck);
    if(!chckDentSurf){
      warnMsg('Same procedure already exist. Please change Dent or Surface values');
       $(this).focus();
      $(this).text('');
    }


    })

    $(document.body).on('focusout', "#factTableBody td[data-target='Code'],#factTableBody_regie td[data-target='Code']", function(){

      var type_s=$(this).siblings("td[data-target='Type']").text();
      var dent_s=$(this).siblings("td[data-target='Dent']").text();
      var surf_s=$(this).siblings("td[data-target='Surface']").text();
      var code_s=$(this).text();

      var age=get_age();

      var robertoValidation=robValidation(type_s,code_s,dent_s,age,surf_s);

      console.log('rob function return val : ');
      console.log(robertoValidation);

      var surfValid=surface_validation(type_s,dent_s,surf_s,code_s);

      // console.log("var SurfValid is T/F : " + surfValid );

    if(surfValid)
    {
    var valid;
    var val=$(this).text();
    var popData=$(this).parent();
    var code_data=getCodeData(val);

    if(code_data && !(val==""))
    {
      $(popData).children("td[data-target='Description']").text(code_data.fr);
      $(popData).children("td[data-target='Frais']").text(parseFloat(code_data.frais).toFixed(2));
       $(popData).children("td[data-target='Honoraires']").text(parseFloat(code_data.prix).toFixed(2));

    }
    else
    {
      warnMsg('Invalid value entered in CODE.');
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
        
          // console.log(hono);
          // console.log(frais);
      var totalVal=parseFloat(parseFloat(rhono)+parseFloat(rfrais)).toFixed(2);

    var total=$(this).siblings("td[data-target='Total']");
        $(total).text(totalVal);        
        }


        
     });

  
    $(document.body).on('focusout', "#factTableBody td[data-target='Frais'],#factTableBody_regie td[data-target='Frais']", function(){

        var valid;
        var valFrais=$(this).text();
        $(this).text(parseFloat(valFrais).toFixed(2));

     if(valFrais=="") 
          { 
            valFrais=0;
            rvalFrais=valFrais.toFixed(2);
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

     $(document.body).on('focusout', "#factTableBody td[data-target='Honoraires'],#factTableBody_regie td[data-target='Honoraires']", function(){

        var valid;
        var valHono=$(this).text();
        $(this).text(parseFloat(valHono).toFixed(2));
      
        if(valHono=="") 
          { 
            valHono=0;
            rvalHono=valHono.toFixed(2);
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
                break;
                  }
                }                    
        
        }

          return true;
}

 function warnMsg(msg)
 {  
  

    
    // $('#wrn_msg_fact_tbl').removeClass('hidden');
    $('#warn_msg_fact_content').text(msg);
    $('#wrn_msg_fact_tbl').addClass('visible').fadeIn("fast").delay(3000).fadeOut("slow",function(){
      $('#wrn_msg_fact_tbl').removeClass('visible');
      $('#wrn_msg_fact_tbl').addClass('hidden');
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
        warnMsg('Type not CAS, AMQ or Insrance Company');
        
      }
      

          //Condition 3: If AMQ BEs HOP check RAMQ Card Number & Expiry
          if(val=="AMQ" || val=="BES" || val=="HOP"){

                  if(!($('#optRegiIndFactAssosDrNo').is(':checked')))
                  {
                    // If ramq_no field equal 1 , Bypass both Validation AMQ and Expiry
                    var ramq_field=$('#ramq_no').val();
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
      if((val>=11 && val<=18)||(val>=21 && val<=28)||(val>=31 && val<=38)||(val>=41 && val<=48)||(val>=51 && val<=55)||(val>=61 && val<=65)||(val>=71 && val<=75)||(val>=81 && val<=88))
      {
        
        return true
      }
      else
      {
        warnMsg('Invalid input. This value does not exist for Denturologiste Dent type.');
        return false;
      }
      break;

    case 'Dentiste':

      if((val>=0 && val<=8)||(val>=10 && val<=20)||(val>=21 && val<=28)||(val>=30 && val<=38)||(val>=40 && val<=48)||(val>=51 && val<=55)||(val>=61 && val<=65)||(val>=71 && val<=75)||(val>=81 && val<=85)||(val==99))
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
        
       var output;
      
        var search1= codeVal;
        var reg=new RegExp(search1,'i');
      
          $.each(dataJson_Code,function(key,val){
      
            if(key.search(reg) != -1)
            {
               output=val;

          }
          });
      
        return output;
      
          // $('#codesBody').html(output);
      
      
      };

function chckDentSurfExistTbl(dent,surf)
  {

    // console.log('new function Dent :' + dent);
    // console.log('new function Dent :' + surf);
    var trs=$('#factTableBody tr ');
    var dentFound=0;
    var surfFound=0;

    $.each(trs, function(id,val){
    
     var cur_Dent= $(val).find('td[data-target=Dent]').text();
      var cur_Surf= $(val).find('td[data-target=Surface]').text();
      cur_Surf

  if(dent==cur_Dent){
    dentFound=dentFound+1;

  }

  var concatStr=surf+cur_Surf;
  checkReptCharc=checkRepeatChrcInString(concatStr);
  

  if(checkReptCharc>=1){
    surfFound=surfFound+1;
  }
 
    })

     if((dentFound>=2) && (surfFound>=2)){
      // console.log('this match Already Exist! Sorry');
      return false;
      
    }
    else{
    return true;
  }

}

function checkRepeatChrcInString(str){
   try{ return str.toLowerCase().split("").sort().join("").match(/(.)\1+/g).length; }
   catch(e){ return 0; } // if TypeError
}

function get_age(){

  var curr_year;
  var patnt_year;

  var formD=$('#Ebirth').val();
  var formD=formD.split('-');
  patnt_year=formD[0];

  var d1 = new Date();
  var curYear=d1.getYear()+1900;

  var age= parseInt(curYear)-parseInt(patnt_year);
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