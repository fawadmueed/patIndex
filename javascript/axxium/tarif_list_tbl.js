

$(document).ready(function(){
	

 
	$('.tarif_list_table').on('click','tr',function()
	{
		var tarif_row_data=tarifTbl_datTbl.row(this).data() ;
		
		console.log(tarif_row_data.value.regiecode);
		$('#factTableBody tr[id='+globVarSurfValidation_this_row_id+']').children("td[data-target='Code']").text(tarif_row_data.value.regiecode);
		$("#factTableBody td[data-target='Code'],#factTableBody_regie td[data-target='Code").trigger("focusout");	

		$('.fact_tarif_list.modal').modal('hide');
	})

	// $('.dataTables_filter input').off().on('keyup', function() {
 //    $('#myTable').DataTable().search(this.value.trim(), true, false).draw();
 // });   

	$('.searchTarif').click(function(){
		var srch='\\b'+$(this).val();
		console.log(srch);
		tarifTbl_datTbl.column(0).search(srch,true,false).draw();
		
	})
})

function fact_tarif_list(x)
	{

		var this_row_id=$(x).parent('tr').attr('id');
		globVarSurfValidation_this_row_id=this_row_id;

		$.fn.dataTable.ext.errMode = 'none';
		$.fn.dataTable.render.number( '.', ',', 2, '' );
		// Getting data for the Modal, Mapping it from JSON to ARRAY
		var arr = $.map(dataJson_Code, function(val,key) { return {code:key,value:val} });
		//Popup Modal
		popTarifTbl(arr);
		// resetDataTableFilter();
		$('.fact_tarif_list.modal').modal({
			observeChanges: true
		}).modal('show');

	}


	function popTarifTbl(arr){
		
		var descrLn;


		if(globLang=='en')
		{
			descrLn='descra';
			tarifTbl_datTbl=$('.tarif_list_table').DataTable({
			"data":arr,
			"columns": [    // Assign KEY Values to COLUMNS

			    { "data": "code" },
			    { "data": "value.regiecode" },
			    { "data": "value."+descrLn },
			    { "data": "value.prixs",
			    	render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) 
			    	 },
			    { "data": "value.prixr",
			    	render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) 	
			    },
			    { "data": "value.prixa" ,
				render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) 
				},
			    { "data": "value.frais_lab", 
				render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) 
				},
			    { "data": "value.frais_lab" ,
				render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) 
				},
			    { "data": "value.lab" },
			    { "data": "value.producer" },

		    ],
            dom: 'lrtip'

		})
			// tarifTbl_datTbl.column(0).search('0',true,false).draw();


		}
		else
		{
			descrLn='descrf';
			languageUrl ='../axxium/translator/dataTablesFrench.json';
			tarifTbl_datTbl=$('.tarif_list_table').DataTable({
			"data":arr,
			"columns": [    // Assign KEY Values to COLUMNS

			    { "data": "code" },
			    { "data": "value.regiecode" },
			    { "data": "value."+descrLn },
			    { "data": "value.prixs",
			    	render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) 
			    	 },
			    { "data": "value.prixr",
			    	render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) 	
			    },
			    { "data": "value.prixa" ,
				render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) 
				},
			    { "data": "value.frais_lab", 
				render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) 
				},
			    { "data": "value.frais_lab" ,
				render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) 
				},
			    { "data": "value.lab" },
			    { "data": "value.producer" },

		    ],
            dom: 'lrtip'
		    

		})

			// $('.tarif_list_table').css( 'display', 'block' );
			// 	tarifTbl_datTbl.columns.adjust().draw();
			// tarifTbl_datTbl.column(0).search('0',true,false).draw();
		}

		

// $('.dataTables_filter input').bind('keyup', function() {
//    var searchTerm = this.value.toLowerCase()
//    if (!searchTerm) {
//       tarifTbl_datTbl.draw()
//       return
//    }
//    $.fn.dataTable.ext.search.push(function(settings, data, dataIndex) {
//       for (var i=0;i<data.length;i++) {
//          if (data[i].toLowerCase() == searchTerm) return true
//       }	
//       return false
//    })
//    tarifTbl_datTbl.draw();   
//    $.fn.dataTable.ext.search.pop()
// })
$('#search_code').on('keyup', function () {
	{
		var valHere=this.value;
		 tarifTbl_datTbl
        .columns( 0 )
        .search('\\b'+this.value,true, false)
        .draw();

 	}
 	});  

$('#search_desc').on('keyup', function () {

		var valHere=this.value;
   		 tarifTbl_datTbl
        .columns(2)
        .search( '(^|\s)'+valHere+'(\s|)',true,false)
        .draw().sort();

	     if(valHere=='')
	     {
		  tarifTbl_datTbl
	     .columns(2)
	     .search('[\s\S]*',true,false,true)
	     .draw();
	     }


} );

}

function resetDataTableFilter()
{
	$('.tarif_list_table').DataTable().search('0').columns(0).search('0').draw();
}




