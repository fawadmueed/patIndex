
$(document).ready(function(){

      $(document.body).on('keydown', "#factTableBody td[data-target='Frais'], #factTableBody_planTrait td[data-target='Frais'],#factTableBody td[data-target='Honoraires'],#factTableBody_regie td[data-target='Honoraires'], #factTableBody_planTrait td[data-target='Honoraires'],#factTableBody td[data-target='Total'],#factTableBody_regie td[data-target='Total'], #factTableBody_planTrait td[data-target='Total']", function(e){
      	
  	   check_charcount(this,6, e,'numbers');		
      })

      $(document.body).on('keydown', "#factTableBody td[data-target='Prod'], #factTableBody_planTrait td[data-target='Prod']", function(e){
              
       check_charcount(this,0,e,'alphaNumeric');
      })

      $(document.body).on('keydown', "#factTableBody td[data-target='Surface'],#factTableBody_planTrait td[data-target='Surface']", function(e){
        
       check_charcount(this,4,e,'alphaNumeric');    
      })
      $(document.body).on('keydown', "#factTableBody td[data-target='Dent'],#factTableBody_planTrait td[data-target='Dent']", function(e){
        
       check_charcount(this,1,e,'numbers');    
      })
      $(document.body).on('keydown', "#factTableBody td[data-target='Code'],#factTableBody_planTrait td[data-target='Code']", function(e){
        
       check_charcount(this,4,e,'numbers');    
      })
      $(document.body).on('keydown', "#factTableBody td[data-target='Type']", function(e){
       check_charcount(this,2,e,'alphabets');    
      })


      // All fields with .mont class are Montant ( Amount / Bills in DOllars). Validation is to restrict it to 2 decimal places and Float.
      $(document.body).on('change','#total_pamnt, .mont ',function(){

        var thisAmount=$(this).val();
        $(this).val(parseFloat(thisAmount).toFixed(2));

      })
    
  	   

})


function check_charcount(content_id, max, e,valid_type)
      {   
    
            
              if(valid_type=='numbers')
              {


          // Allow: backspace, delete, tab, escape, enter and .
              if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                  // Allow: Ctrl+A, Command+A
                  (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
                  // Allow: home, end, left, right, down, up
                  (e.keyCode >= 35 && e.keyCode <= 40)) {
                      // let it happen, don't do anything
                      return;
              }
                  // Ensure that it is a number and stop the keypress
                    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) 
                    {
                        e.preventDefault();
                    }
                    else
                    {
                 
        
                    // Restrict Max length to 6 1000.00
                    if(e.which != 8 && $(content_id).text().length > max)
                    {
                      // $('#'+content_id).text($('#'+content_id).text().substring(0, max));
                       
                      if(e.which==9 || e.which==46 || (e.which>=33 && e.which<=46))
                      {
              
                      }
                      else
                      {
                         e.preventDefault();
                     }
    
                    }
                  }
               }

              if(valid_type=='alphaNumeric')
              {
                if (!((e.keyCode == 8)||(e.keyCode == 9) || (e.keyCode == 32) || (e.keyCode == 46) || (e.keyCode >= 35 && e.keyCode <= 40) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 97 && e.keyCode <= 122)) || (e.keyCode==16) ) 
                    {
                        e.preventDefault();
                    }
                    else
                    {
                 
        
                    // Restrict Max length to 6 1000.00
                    if(e.which != 8 && $(content_id).text().length > max)
                    {
                      // $('#'+content_id).text($('#'+content_id).text().substring(0, max));
                       
                      if(e.which==9 || e.which==46 ||(e.which>=33 && e.which<=46))
                      {
              
                      }
                      else
                      {
                         e.preventDefault();
                     }
    
                    }
                  }
              }

              if(valid_type=='alphabets')
              {
                if (!((e.keyCode == 8)||(e.keyCode == 9) || (e.keyCode == 32) || (e.keyCode == 46) || (e.keyCode >= 35 && e.keyCode <= 40) || (e.keyCode >= 65 && e.keyCode <= 90)  || (e.keyCode==16) )) 
                    {
                        e.preventDefault();
                    }
                    else
                    {
                 
                    // Restrict Max length 
                    if(e.which != 8 && $(content_id).text().length > max)
                    {
                      // $('#'+content_id).text($('#'+content_id).text().substring(0, max));
                       
                      if(e.which==9 || e.which==46 || (e.which>=33 && e.which<=46))
                      {
              
                      }
                      else
                      {
                         e.preventDefault();
                     }
    
                    }
                  }
              }
    }