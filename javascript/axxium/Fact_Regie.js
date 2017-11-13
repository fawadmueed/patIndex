  $(document).ready(function(){

  $('.ui.dropdown.fact_regie').dropdown().change(function() {

    var thisVal=$('.ui.dropdown.fact_regie').dropdown('get text');

    if(thisVal=='Factures')
    {
      // var data=$('#fact_regie_div_facture').html();
      // $('#fact_regie_div').html(data);

      $('#fact_regie_div_facture').show();
       $('#fact_regie_div_facture').siblings("div").hide()

      
    }
    if(thisVal=='Paiements')
    {

    $('#fact_regie_paiements').show();
    $('#fact_regie_paiements').siblings("div").hide()
    }
    if(thisVal=='Messages')
    {
      $('#fact_regie_messages').show();
      $('#fact_regie_messages').siblings("div").hide()
    }
    if(thisVal=='État de compte')
    {
      
      $('#fact_regie_etatCompte').show();
      $('#fact_regie_etatCompte').siblings("div").hide()
    }


  }) ;

});