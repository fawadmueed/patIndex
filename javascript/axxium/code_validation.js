

var msgerror = {}; //JSon objet for message


 $.ajax({
 	type:'GET',
 	url:"json/factureValidation/msgerr.json",
 	// data:data,
 	async:false,
 	dataType: 'json',
 	success: function (data) {
    //Do stuff with the JSON data
    msgerror=data;
    console.log('ajax msg error here : ');
    console.log(msgerror);
  }
 })


function robValidation(type,code,tooth,age,surface){					

		console.log('In rob function type code dent age surf'+ type + code + tooth+age + surface);

					//!!!ATTENTION, this section must be execute after the user fill up the code
					if(type == 'AMQ' || type == 'BES' || type == 'HOP') 
					{
						if(type == 'BES' && is_ablation_code(parseInt(code))) {  //We must be in QC to execute this
							if(parseInt(age) < 10)
								warnMsg(msgerror.msg044);
								return false;
						}

						if(!code_amq(type,tooth,code,age))
							return false;
						
						if(!code_amq_canal(type, tooth, code, age))
							return false;
						
						if(!code_amq_endo(type, tooth, code, age)) 
							return false;
						
						//type_of_rate: valeur rentree par l'usager. 1: regulier, 2: special, 3: cas hopitalier
						// $('.type_rate').()
						if(!code_amq_abla(type, tooth, code, age)) 
							return false;
							
						if(!code_amq_cour(type, tooth, code, age))
							return false;

						if(!prothese(type, code))
							return false;
					} 

					else {
						if(is_dent_anterieur(parseInt(tooth))) {
							if(code == '' || surface == 'O') {
								warnMsg(msgerror.msg021);
								return false;
							} else {
								if(code == '' || surface == 'I') {
									warnMsg(msgerror.msg21);
									return false;
										}
									}
								}
							}
					
					if(code =='23105' || code == '23905' || code == '23108' || code == '23908') {
						if(surface == '' && !is_dent_anterieur(parseInt(code))) {
							warnMsg(msgerror.msg06);
							return false;
						}
					}

					if(dent_Type != 'Denturologiste') {
						var v_code = ['33100', '33200', '33300', '33120', '33220', '33320', '33400', '33420', '33501', '33502', '33503', '33504', '33999'];
						if($.inArray(code, v_code) > -1 && tooth == '79') {
							warnMsg(msgerror.msg06);
							return false;
						}

						//we must be in QC to execute this section
						if(code_avec_dent(code)) {
							if(tooth == '') {
								warnMsg(msgerror.msg083);
								return false;
							}
						}
						else if(code_avec_dent_et_surface(code, tooth) && (tooth == '' || surface == '')) {
							warnMsg(msgerror.msg081);
							return false;
						}
					}

					if(is_ablation_code(code)) {
						if(type == 'BES' && age < 10) {
							warnMsg(msgerror.msg044);
							return false;
						}
					}
				
					return true;

}