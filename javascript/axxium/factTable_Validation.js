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
    console.log('Checking RAMQ Card Number');
    var ramq_num=$('#ramq_no').val(); //get ramq_number
    var nthDigit=String(ramq_num).charAt(10); //convert to string and get 11th digit (12th)
    var nthDigit_number=Number(nthDigit);   //convert back to number 8th digit
    if(!(nthDigit_number==9))
    { 
      return false;
    }
    else
    {
      return true;

    }
    

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
      alert('Valid Date! Card not expire');
      return true;
    }
    else if(curYear==formD_year)
    {
      if(curMonth<formD_month)
      {
      return true;
      alert('Valid Date! Card not expire');
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
  