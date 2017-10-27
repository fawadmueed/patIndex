   function modFacture()
   // Button-->openModFacture(in facture28.js)->modFacture()
  {
    $('.modalFacture')
   .modal('setting', {
            closable  : false,
            onDeny    : function(){
              window.alert('Wait not yet!');
              return false;
            }
  }).modal('show');
  }

  function modRapelFacture()
  {
    $('.modalRapelFacture').modal('show')
  }
   function modFactAnticip()
  {
    $('.modalFactAnticip').modal('show')
  }
    function modCdan()
  {
    $('.modalCdan').modal('show')
  }