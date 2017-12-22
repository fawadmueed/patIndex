 
    var dataJson_Code;      
      // $.getJSON("json/params/codes6.json",function(data){
      //   dataJson_Code=data;
      // });

      $.ajax({
  type:'GET',
  url:"json/params/codes6.json",
  // data:data,
  async:false,
  dataType: 'json',
  success: function (data) {
    //Do stuff with the JSON data
    dataJson_Code=data;
   
  }
 })
  

   var dataSurfaceRules;
 // $.getJSON("json/factureValidation/rules.json",function(data){
 //          dataSurfaceRules=data;
 //          // console.log(dataSurfaceRules);
 //        });

     $.ajax({
  type:'GET',
  url:"json/factureValidation/rules.json",
  // data:data,
  async:false,
  dataType: 'json',
  success: function (data) {
    //Do stuff with the JSON data
    dataSurfaceRules=data;
   
  }
 })


    

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
      if ((!(val=="AMQ"||val=="BES"||val=="HOP" ))&&(!(val=="CAS"))&&(!(val==$("#ramq_select").val())))
      {
        // alert('Error! No type selected');
        // warnMsg('TYPE error. Please enter correct type.')
        // return false;
        warnMsg('Type not CAS or AMQ. Considering Insurance for Testing! ');
        return true;
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

// function robValidation(type,code,tooth,age){

// // /!!!ATTENTION, this section must be execute after the user fill up the code

//                    if(type == 'AMQ' || type == 'BES' || type == 'HOP') {
//                        if(type == 'BES' && is_ablation_code(parseInt(code))) {  //We must be in QC to execute this
//                            if(parseInt(age) < 10)
//                                $("#message2").append(msgerror.msg044);
//                              alert(msgerror.msg044)
//                                return false;
//                        }

//                        if(!code_amq(type, tooth, code, age))
//                            return false;
                       
//                        if(!code_amq_canal(type, tooth, code, age))
//                            return false;
//                    }
                   
//                    if(code == '23105' || code == '23905' || code == '23108' || code == '23908') {
//                        $("#message2").append(msgerror.msg06);
//                        alert(msgerror.msg06)
//                        return false;
//                    }

//                    if(dent_Type) {
//                        var v_code = [33100, 33200, 33300, 33120, 33220, 33320, 33400, 33420, 33501, 33502, 33503, 33504, 33999];
//                        if($.inArray(parseInt(code), v_code) > -1 && tooth == '79') {
//                            $("#message2").append(msgerror.msg06);
//                            alert(msgerror.msg06);
//                            return false;
//                        }
//                    }

//                    //we must be in QC to execute this section
//                    if(code_avec_dent(parseInt(code), dent_Type)) {
//                        if(tooth == '') {
//                            $("#message2").append(msgerror.msg083);
//                            alert(msgerror.msg083);
//                            return false;
//                        }
//                    }
//                    else if(code_avec_dent_et_surface(parseInt(code), dent_Type) && (tooth == '' || surface == '')) {
//                        $("#message2").append(msgerror.msg081);
//                        alert(msgerror.msg081);
//                        return false;
//                    }
                   
//                    return true;

// }


// // ============= FUNCTIONS ROBERTO VALIDATION=======

// //  var msgerror = {}; //JSon objet for message
// // //replace insuranceCo with globVisionRData.InsTypeList[0] 

// // // var insuranceCo=globVisionRData.InsTypeList[0];

// //         function code_amq_canal(insurance, tooth, code, age) {
// //             var first_two = code.substring(0, 2);
            
// //             if(first_two == '33' || first_two == '39') {
// //                 if(insurance == 'BES') {
// //                     if(parseInt(age) > 12) {
// //                         if(code != '39910') {
// //                             $("#message2").append(msgerror.msg230);
// //                             return false;
// //                         }
// //                     }
// //                     else if(parseInt(age) >= 10) {
// //                         $("#message2").append(msgerror.msg219);
// //                         return false;                       
// //                     }
// //                 }
// //                 var trois_dern = code.substring(2, 6);
// //                 var dern_code = ['001', '002', '003', '004', '100', '200', '300', '400', '120', '220', '320', '420', '501', '502', '503', '504', '999', '910'];
// //                 if($.inArray(trois_dern, dern_code) > -1) {
// //                     if(primary_tooth(parseInt(tooth))) {
// //                         $("#message2").append(msgerror.msg230);
// //                         return false;
// //                     }
// //                     else if(!perment_tooth(parseInt(tooth))) {
// //                         $("#message2").append(msgerror.msg078);
// //                         return false;                       
// //                     }
// //                 }
// //                 else {
// //                     $("#message2").append(msgerror.msg213);
// //                     return false;
// //                 }
// //             }
        
// //             return true;
// //         }


// //         function code_amq(insurance, tooth, code, age) {
// //             if(code == '01250') {
// //                 $("#message2").append(msgerror.msg213);
// //                 return false;
// //             }
// //             if(code == '01120') {
// //                 if(!(parseInt(age) >= 0 && parseInt(age) <= 11) && !(parseInt(tooth) >= 1 && parseInt(tooth) <= 6)) {
// //                     $("#message2").append(msgerror.msg21);
// //                     return false;
// //                 }
                
// //                 //return Depuis() missing....
// //             } 
// //             if(code == '01130') {
// //                 if(!(parseInt(age) >= 12 && parseInt(age) <= 15)) {
// //                     if(!(insurance == 'BES' && parseInt(age) >= 16) && !(parseInt(tooth) >= 1 && parseInt(tooth) <= 6)) {
// //                         $("#message2").append(msgerror.msg22);
// //                         return false;
// //                     }
// //                 }
                
// //                 //return Depuis() missing...
// //             }
// //             if(code == '01300' || code == '93200') {
// //                 if(!(parseInt(age) >= 0 && parseInt(age) <= 15)) {
// //                     if(!(insurance == 'BES' && parseInt(age) >= 16) && !(parseInt(tooth) >= 1 && parseInt(tooth) <= 6)) {
// //                         $("#message2").append(msgerror.msg23);
// //                         return false;                   
// //                     }
// //                 }
// //             }
// //             if(code == '13200') {
// //                 if(!(parseInt(age) >= 12 && parseInt(age) <= 15))  {
// //                     if(!(insurance == 'BES' && parseInt(age) >= 16) && !(parseInt(tooth) >= 1 && parseInt(tooth) <= 6)) {
// //                         $("#message2").append(msgerror.msg22);
// //                         return false;   
// //                     }
// //                 }
// //                 //return Depuis() missing...
// //             }
// //             //to continue...            
// //             if(insurance == 'BES' || insurance == 'AMQ') {
// //                 if(code) {
// //                 }
// //                 //Translate('Le code "') + code +
// //                 //  Translate('" n''est pas un code RAMQ.'), mtInformation, [mbOK], 0);
// //             }
// //             return true;
// //         }
        

// //         function quest_recl() {
// //             if (confirm('Avez-vous vérifié le carnet de réclamation?')) {
// //                 return true;
// //             } else {
// //                 return false;
// //             }       
// //         }


// //         function perment_tooth(tooth) {
// //             var dent_perment = [1,2,3,4,5,6,11,12,13,14,15,16,17,18,21,22,23,24,25,26,27,28,31,32,33,34,35,36,37,38,41,42,43,44,45,46,47,48];
// //             if($.inArray(tooth, dent_perment) > -1)
// //                 return true
// //             return false;                   
// //         }


// //         function primary_tooth(tooth)  {
// //             var dent_primary = [51,52,53,54,55,61,62,63,64,65,71,72,73,74,75,81,82,83,84,85];
// //             if($.inArray(tooth, dent_primary) > -1)
// //                 return true
// //             return false;           
// //         }


// //         function is_dent_anterieur(tooth) {
// //             var dent_anterieur = [1,2,3,4,5,6,11,12,13,21,22,23,31,32,33,41,42,43,51,52,53,61,62,63,71,72,73,81,82,83];
// //             if($.inArray(tooth, dent_anterieur) > -1)
// //                 return true
// //             return false;           
// //         }


// //         function code_avec_dent(code, dent_Type) {
// //             var c_avec_dent = [20111, 20121, 20131, 20141, 21501, 23115, 23121, 23122, 23123, 23315,
// //                              23701, 25521, 27721, 29600, 63031, 75350, 75360, 79301, 75100, 75101, 75200,
// //                              75220, 79615, 79616 ,75502, 75503, 75504, 75505, 75506, 79405, 79406];
// //             var first_two = code.toString().substring(0, 2);
// //             if(dent_Type) { //We must be in QC to execute this
// //                 if(is_endo_code(code) || $.inArray(code, c_avec_dent) > -1 || first_two == '71' || first_two == '72') {
// //                     return true;
// //                 }
// //             }
// //             return false;
// //         }


// //         function is_endo_code(code) {
// //             var endo_code = [33100, 33101, 33102, 33120, 33200, 33201, 33202, 33220, 33201, 33202,
// //                              33220, 33300, 33301, 33302, 33320, 33400, 33401, 33402, 33420, 33504, 33521,
// //                              33522, 33523, 33531, 33532, 33533, 33541, 33542, 33543, 33999, 39902];
// //             if($.inArray(code, endo_code) > -1)
// //                 return true
// //             return false;
// //         }


// //         function code_avec_dent_et_surface(code, dent_Type) {
// //             if(code == 23210 || code == 23220)
// //                 return false;   
// //             if(dent_Type && code_avec_dent(code, dent_Type)) { //we must be in QC to execute this
// //                 var c_avec_dent = [211, 212, 231, 232, 233, 234, 251, 252, 253, 255];
// //                 var first_three = parseInt(code.toString().substring(0, 3));
// //                 if($.inArray(first_three, c_avec_dent) > -1)
// //                     return true 
// //             }
// //             return false;
// //         }


// //         function is_ablation_code(code) {
// //             var ablation_code = [71101, 71111, 71401, 71411, 72210, 72230, 72250, 72260, 72300, 72311, 72351, 72361, 
// //                                 72320, 75350, 75360, 79301];
// //             if($.inArray(code, ablation_code) > -1)
// //                 return true
// //             return false;
// //         }


// //         function regle1_4(age, limit, insurance, insuranceCo ) {
// //             if(age >= limit) {
// //                 if(insurance != 'BES' && (insurance != 'HOP' && insuranceCo  != 'BES')) {
// //                     return false;
// //                 } else {
// //                     if(insuranceCo  != 'BES' && insurance == 'HOP') {
// //                         return false;   
// //                     } else {
// //                         switch(limit) {
// //                             case 13:
// //                                 if(age >= 13 && age <= 15)
// //                                     return quest_recl();
// //                                 break;
// //                             case 16:
// //                                 if(age > 16)
// //                                     return quest_recl();
// //                                 break;
// //                         }
// //                     }
// //                 }
// //             }           
// //             return true;
// //         }
// //         // =====xx===================================xx==========