 $(document).ready(function(){

     // $("#factTableBody td[data-target='Type']").focusout(function(){
     $(document.body).on('focusout', "#factTableBody td[data-target='Type']", function(){
    var valid;
    var val=$(this).text();
    if(val=="")
    { // Condition 1 : If no entries , type CAS
      alert("Selecing Default Type:CAS");
      $(this).text('CAS');
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

   });


  function validation(type,val)
  {
    if(type=="Type")
    { 
      //Condition 2: If none of AMQ BES HOP and CAS and Selected DrpDown Value - MESSAGE ERROR
      if ((!(val=="AMQ"||val=="BES"||val=="HOP" ))&&(!(val=="CAS"))&&(!(val==$("#ramq_select").val())))
    {
      alert('Error! No type selected');
      return false;
    }
    
    //Condition 3: If AMQ BED HOP check RAMQ Card Number & Expiry
    if(val=="AMQ" || val=="BES" || val=="HOP"){

        var valid_ramq=check_Ramq_Num();
        
        if(!valid_ramq)
        {
        alert('Invalid RAMQ Card Number : Please check Ramq Card Number');
        return false;
      
        }
        else
        {
          console.log('Checking expiry Now');
          var check_exp=check_ramq_exp();
          if(!check_exp){
            return false;
          }
          return true;

        }
        
      }
  
  else{
      return true;
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
    console.log(formD_month);
    var ramqNumber_toBe=lastName+firstName+formD_year+(sexe_factor+formD_month)+formD_day+ramq_num.slice(10);
    console.log(ramqNumber_toBe);
    
    if(ramqNumber_toBe==ramq_num)
    {
      console.log('Correct Ramq Number');
      return true;
    }
    else
    {
      console.log('Wrong Ramq Card number');
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
  