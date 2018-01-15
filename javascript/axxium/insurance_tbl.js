
var insuranceData;
  
  $.ajax({
  type:'GET',
  url:"json/insurances/insurances.json",
  async:false,
  dataType: 'json',
  success: function (data) {
    insuranceData=data;
    populate_tbl_insrnce();

   }
 })

console.log(insuranceData);

//Populate Table
function populate_tbl_insrnce(){

    $('#insr_tbl').DataTable({
      
      "data":insuranceData, //JSON 

      "columns": [    // Assign KEY Values to COLUMNS
    { "data": "code" },
    { "data": "numero_id" },
    { "data": "nom" },
    { "data": "adress" },
    { "data": "ville" },
    { "data": "prov" },
    { "data": "postal" },
    { "data": "tel" },
    { "data":"carrier"}
  ],
  "columnDefs": [{
    "targets":[0],
    "createdCell": function(td){
        td.setAttribute('data-insr','code');
      } }]

  })

}


$(document).on('click','#insr_tbl_body tr', function(){
  // console.log($(this).tr());
  this_tr=$(this).closest('tr');
  insr_code=$(this_tr).children('td[data-insr=code]');

  populate_insr_from();
  console.log($(insr_code).text());


});

function populate_insr_from(){

}

$('tabular.menu .item').on('ready', function() {
    // programmatically activating tab
    $.tab('change tab', 'Insurances');
  })
;
         


function modAdInsr(){
  $('.modal.modalAdInsr').modal('show');
}

