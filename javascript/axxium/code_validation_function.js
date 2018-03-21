		//type_rate is Tarif regulier ,special ,Regie as 1, 2 , 3

		function code_amq_abla(insurance, tooth, code, age) {
			if(code.substring(0, 1) != '7' && code.substring(0, 2) != '04') {
				return true;
			}

			var first_3 = code.substring(0, 3);
			if(first_3 == '711' || first_3 == '714' || first_3 == '722') {
				var dent = parseInt(tooth);
				if((dent >= 1 && dent <= 6) || (dent >= 11 && dent <= 18) || (dent >= 21 && dent <= 28)
				|| (dent >= 31 && dent <= 38) || (dent >= 41 && dent <= 48) || (dent >= 51 && dent <= 55)
				|| (dent >= 61 && dent <= 65) || (dent >= 71 && dent <= 75) || (dent >= 81 && dent <= 85)) {
					if(!depuis(code, dent, '', 10000, 2, true)) {
						return false;
					}
				}
			}

			if(first_3 == '711' || first_3 == '714' || first_3 == '722' || first_3 == '753' || first_3 == '723' || code == '79301') {
				if(!regle1_4(16, insurance, parseInt(age)) && !(parseInt(tooth) >= 1 && parseInt(tooth) <= 6)) {
					globVarMessageErrorValidation = msgerror.msg227;
					return false;
				}
			}
			// global variable for type_rate
			if(type_rate_glbl == '3') {
				if(insurance == 'HOP') {
					if(first_3 == '711' || code == '72300' || code == '72311') {
						globVarMessageErrorValidation = msgerror.msg29;
						return false;
					}

					if(first_3 == '714' || code == '72351' || code == '72361') {
						globVarMessageErrorValidation = msgerror.msg030;
						return false;
					}
				}
			}
			else {
				var tmp_insurance = insurance;
				if(tmp_insurance == 'HOP') {
					tmp_insurance = 'BES';
				}

				if(code.substring(0, 2) == '04' && !(parseInt(tooth) >= 1 && parseInt(tooth) <= 6) && !regle1_4(13, tmp_insurance, parseInt(age))) {
					globVarMessageErrorValidation = msgerror.msg27;
					return false;
				}
			}

			return true;
		}

		function code_amq_endo(insurance, tooth, code, age) {
			if(code.substring(0, 2) != '32') {
				return true;
			}

			if(!regle1_4(13, insurance, parseInt(age)) && !(parseInt(tooth) >= 1 && parseInt(tooth) <= 6)) {
				globVarMessageErrorValidation = msgerror.msg27;
				return false;
			}

			if(code.substring(2, 3) == '9') {
				globVarMessageErrorValidation = msgerror.msg216;
				return false;
			}

			if(code != '32211' && code != '32310') {
				globVarMessageErrorValidation = msgerror.msg213;
				return false;
			}

			return true;
		}

		function code_amq_canal(insurance, tooth, code, age) {
			var first_two = code.substring(0, 2);
			if(first_two == '33' || first_two == '39') {
				if(insurance == 'BES') {
					if(parseInt(age) > 12) {
						if(code != '39910') {
							globVarMessageErrorValidation = msgerror.msg230;
							return false;
						}
					}
				}
				else if(parseInt(age) >= 10) {
					globVarMessageErrorValidation = msgerror.msg219;
					return false;
				}

				var trois_dern = code.substring(2, 6);
				var dern_code = ['001', '002', '003', '004', '100', '200', '300', '400', '120', '220', '320', '420', '501', '502', '503', '504', '999', '910'];
				if($.inArray(trois_dern, dern_code) > -1) {
					if(primary_tooth(parseInt(tooth))) {
						globVarMessageErrorValidation = msgerror.msg230;
						return false;
					}
					else if(!perment_tooth(parseInt(tooth))) {
						globVarMessageErrorValidation = msgerror.msg078;
						return false;
					}
				}
				else {
					globVarMessageErrorValidation = msgerror.msg213;
					return false;
				}
			}

			return true;
		}

		function code_amq_cour(insurance, tooth, code, age) {
			var first_two = code.substring(0, 2);
			if(first_two != '27') {
				return true;
			}

			if(!regle1_4(13, insurance, age) && !(parseInt(tooth) >= 1 && parseInt(tooth) <= 6)) {
				globVarMessageErrorValidation = msgerror.msg27;
				return false;
			}

			if(code.substring(2, 3) == '9') { // 3eme
				globVarMessageErrorValidation = msgerror.msg210;
				return false;
			}

			var deux_dern = code.substring(3);
			var dent = parseInt(tooth);
			switch(deux_dern){
				case "01":
				case "21":
					if(!((dent >= 1 && dent <= 6) || (dent >= 51 && dent <= 53)
						|| (dent >= 61 && dent <= 63) || (dent >= 71 && dent <= 73) || (dent >= 81 && dent <= 83)) && code.substring(0, 3) != '511') {
						globVarMessageErrorValidation = msgerror.msg211;
						return false;
					}
					break;
				case "03":
					if(!((dent >= 1 && dent <= 6) || (dent >= 54 && dent <= 55)
						|| (dent >= 64 && dent <= 65) || (dent >= 74 && dent <= 75) || (dent >= 84 && dent <= 85))) {
						globVarMessageErrorValidation = msgerror.msg212;
						return false;
					}
					break;
				case "11":
				case "13":
					if(code.substring(2, 3) != '4') {
						globVarMessageErrorValidation = msgerror.msg213;
						return false;
					}
					if(deux_dern == '11') {
						if(!((dent >= 1 && dent <= 6) || (dent >= 11 && dent <= 13)
						|| (dent >= 21 && dent <= 23) || (dent >= 31 && dent <= 33) || (dent >= 41 && dent <= 43))) {
							globVarMessageErrorValidation = msgerror.msg214;
							return false;
						}
					} else if(deux_dern == '13') {
						if(!((dent >= 1 && dent <= 6) || (dent >= 14 && dent <= 18)
						|| (dent >= 24 && dent <= 28) || (dent >= 34 && dent <= 38) || (dent >= 44 && dent <= 48))) {
							globVarMessageErrorValidation = msgerror.msg215;
							return false;
						}
					} else {
						globVarMessageErrorValidation = msgerror.msg213;
						return false;
					}
					break;
			}

			return true;
		}

		function code_amq(insurance, tooth, code, age, surface) {
			if(code == '01250') {
				globVarMessageErrorValidation = msgerror.msg213;
				return false;
			}

			if(code == '01120') {
				if(!(parseInt(age) >= 0 && parseInt(age) <= 11) && !(parseInt(tooth) >= 1 && parseInt(tooth) <= 6)) {
					globVarMessageErrorValidation = msgerror.msg21;
					return false;
				}
				return depuis(code, '', '', 365, 1, true);
			}

			if(code == '01130') {
				if(!(parseInt(age) >= 12 && parseInt(age) <= 15)) {
					if(!(insurance == 'BES' && parseInt(age) >= 16) && !(parseInt(tooth) >= 1 && parseInt(tooth) <= 6)) {
						globVarMessageErrorValidation = msgerror.msg22;
						return false;
					}
				}

				return depuis(code, '', '', 365, 1, true);
			}

			if(code == '01300' || code == '93200') {
				if(!(parseInt(age) >= 0 && parseInt(age) <= 15)) {
					if(!(insurance == 'BES' && parseInt(age) >= 16) && !(parseInt(tooth) >= 1 && parseInt(tooth) <= 6)) {
						globVarMessageErrorValidation = msgerror.msg23;
						return false;
					}
				}
			}

			if(code == '13200') {
				if(!(parseInt(age) >= 12 && parseInt(age) <= 15)) {
					if(!(insurance == 'BES' && parseInt(age) >= 16) && !(parseInt(tooth) >= 1 && parseInt(tooth) <= 6)) {
						globVarMessageErrorValidation = msgerror.msg22;
						return false;
					}
				}

				return  depuis(code, '', '', 365, 1, true);
			}

			if(code == '11200') {
				if(!(parseInt(age) >= 12 && parseInt(age) <= 15)) {
					if(!(insurance == 'BES' && parseInt(age) >= 16) && !(parseInt(tooth) >= 1 && parseInt(tooth) <= 6)) {
						globVarMessageErrorValidation = msgerror.msg22;
						return false;
					}
				}
				return depuis(code, '', '', 365, 1, true);
			}

			if(code == '43500') {
				if(!(insurance == 'BES' && parseInt(age) >= 16) && !(parseInt(tooth) >= 1 && parseInt(tooth) <= 6)) {
					globVarMessageErrorValidation = msgerror.msg24;
					return false;
				}
				return depuis(code, '', '', 365, 1, true);
			}

			if(code == '12400') {
				if((code != 'BES' || !(parseInt(age) >= 12 && parseInt(age) <= 15)) && !(parseInt(tooth) >= 1 && parseInt(tooth) <= 6)) {
					globVarMessageErrorValidation = msgerror.msg25;
					return false;
				}
				return depuis(code, '', '', 365, 1, true);
			}

			if(code == '23112' || code == '23301') {
				return depuis(code, tooth, surface, 365, 5, true);
			}

			if(code == '23999') {
				var tmp_code = '21999';
				if(!((parseInt(tooth) >= 1 && parseInt(tooth) <= 6) || parseInt(tooth) == 14 || parseInt(tooth) == 15
				|| parseInt(tooth) == 24 || parseInt(tooth) == 25) && !regle1_4(13, insurance, age)) {
					globVarMessageErrorValidation = msgerror.msg26;
					return false;
				}

				if(depuis(tmp_code, dentstr, surface, 365, 5, true)) {
					return  depuis(code, tooth, surface, 365, 5, true);
				}
				else { return false;}

			}

			if(is_obturation_code(code) && is_dent_anterieur(tooth)) {
				if(!depuis(code, tooth, surface, 365, 2, true))
					return false;
			}

			if(code == '21301' || code == '21302' || code == '21306') {
				if(!regle1_4(13, insurance, age) && !(parseInt(tooth) >= 1 && parseInt(tooth) <= 6)) {
					globVarMessageErrorValidation = msgerror.msg27;
					return false;
				}
			}

			if(code == '29101') {
				var dent = parseInt(tooth);
				if(!(regle1_4(13, insurance, age) && ((dent >= 1 && dent <= 6) || (dent >= 11 && dent <= 18) || (dent >= 21 && dent <= 28)
					|| (dent >= 31 && dent <= 38) || (dent >= 41 && dent <= 48) || (dent >= 51 && dent <= 55)
					|| (dent >= 61 && dent <= 65) || (dent >= 71 && dent <= 75) || (dent >= 81 && dent <= 85)))) {
					if(!(parseInt(tooth) >= 1 && parseInt(tooth) <= 6)) {
						globVarMessageErrorValidation = msgerror.msg28;
						return false;
					}
				}
				return depuis(code, tooth, '', 180, 2, true);
			}

			if(code.indexOf("21") > -1) {
				if(code == '32211')
					return true;

				var dent = parseInt(tooth);
				if(!regle1_4(13, insurance, age) && ((dent >= 1 && dent <= 6) || (dent >= 11 && dent <= 18) || (dent >= 21 && dent <= 28)
					|| (dent >= 31 && dent <= 38) || (dent >= 41 && dent <= 48) || (dent >= 51 && dent <= 55)
					|| (dent >= 61 && dent <= 65) || (dent >= 71 && dent <= 75) || (dent >= 81 && dent <= 85))) {
					if(!(parseInt(tooth) >= 1 && parseInt(tooth) <= 6)) {
						globVarMessageErrorValidation = msgerror.msg28;
						return false;
					}
				}
			}

			if(code == '31111') {
				if(!regle1_4(13, insurance, age) && !perment_tooth(tooth)) {
					if(!(parseInt(tooth) >= 1 && parseInt(tooth) <= 6)) {
						globVarMessageErrorValidation = msgerror.msg29;
						return false;
					}
				}
			}
			
			if(dent_Type != 'Denturologiste') {
				if ((code == '33501') || (code == '33502') || (code == '33503') || (code == '33504')) {
					return depuis(code, tooth, '', 365, 6, true);
				}
			}


			if((insurance == 'BES' || insurance == 'AMQ') && (code!='')) 
			{
				if($.inArray(code, regiecodes) == -1) {
					// -1 If Not Found , if its not -1 its FOUND
					globVarMessageErrorValidation = msgerror.msg0162.replace("@@", code);
					return false;
				}
				return true;
			}

			return true;
		}

		function quest_recl() {
			if (confirm(msgerror.msg0161)) {
				return true;
			} else {
				return false;
			}
		}

		function perment_tooth(tooth) {
			var dent_perment = [1,2,3,4,5,6,11,12,13,14,15,16,17,18,21,22,23,24,25,26,27,28,31,32,33,34,35,36,37,38,41,42,43,44,45,46,47,48];
			if($.inArray(tooth, dent_perment) > -1)
				return true;
			return false;
		}

		function primary_tooth(tooth) {
			var dent_primary = [51,52,53,54,55,61,62,63,64,65,71,72,73,74,75,81,82,83,84,85];
			if($.inArray(tooth, dent_primary) > -1)
				return true;
			return false;
		}

		function code_avec_dent(code) {
			var c_avec_dent = [20111, 20121, 20131, 20141, 21501, 23115, 23121, 23122, 23123, 23315,
							 23701, 25521, 27721, 29600, 63031, 75350, 75360, 79301, 75100, 75101, 75200,
							 75220, 79615, 79616 ,75502, 75503, 75504, 75505, 75506, 79405, 79406];

			var first_two = code.substring(0, 2);
			if(dent_Type != 'Denturologiste') { //We must be in QC to execute this
				if(is_endo_code(code) || $.inArray(parseInt(code), c_avec_dent) > -1 || first_two == '71' || first_two == '72') {
					return true;
				}
			}

			return false;
		}

		function code_avec_dent_et_surface(code, tooth) {
			if(code == '23210' || code == '23220')
				return false;

			if(dent_Type != 'Denturologiste' && !code_avec_dent(code)) { //we must be in QC to execute this
				var c_avec_dent = [211, 212, 231, 232, 233, 234, 251, 252, 253, 255];
				var first_three = parseInt(code.substring(0, 3));
				if($.inArray(first_three, c_avec_dent) > -1)
					return !is_dent_anterieur(tooth);
			}

			return false;
		}

		function veri_age(a, surffound, date, numjour, ll) {
			if(numjour != 10000) {
				var date1 = new Date(date); //MM/DD/YYYY
				var today = new Date();
				var diffDays = parseInt((today - date1) / (1000 * 60 * 60 * 24)); 
				if(diffDays >= 365) 
					return true;

				if(dent_Type  == 'Denturologiste') {
					numjour =  numjour*365;
				}
				
				if(diffDays >= numjour)
					return true;
			}

			if(dent_Type  == 'Denturologiste') {
				if(a=="1") {

				}
				else {

				}

			}
			else {
				switch (a)  {
					case "2":
						break;
					case "3":
						break;
					case "4":
						break;
					case "5":
						break;
				}
				if(ll) {

				}
			}
			
			return false;
		}

		function depuis(code, dent, surface, numjour, strat, ll){

			if(code =='01130') {
				var date01120 ='', date01130 ='';
				for (var i = 0; i < globTreatHist.length; i++)
				{
					if(globTreatHist[i].code == '01120') {
						date01120 = globTreatHist[i].date;
					}
					if(globTreatHist[i].code == '01130') {
						date01130 = globTreatHist[i].date;						
					}					
				}

				if(date01120 != '' &&  date01130 != '') {
					var tmpdate = date01120;
					if (tmpdate < date01130)
						tmpdate = date01130;
					
					return veri_age('1', ' ', tmpdate, numjour, ll);
				}
			}
			else {
				for (var i = 0; i < globTreatHist.length; i++)
				{
					if(globTreatHist[i].typ =='AMQ')
					{
						if(dent_Type == 'Denturologiste') {
							if(globTreatHist[i].typ == code) {
								return veri_age(strat, ' ', globTreatHist[i].date, numjour, ll);
							}
						}
						else
						{
							switch (strat) {
								case 1:
									if(globTreatHist[i].code == code)
										return veri_age('1', ' ', globTreatHist[i].date, numjour, ll);

									break;
								case 2:
									if(globTreatHist[i].code == code && globTreatHist[i].dent == dent) {
										if(globTreatHist[i].surface == surface) {
											return veri_age('5', ' ', globTreatHist[i].date, numjour, ll);
										} else {

										}
									}

									break;
								case 3:
									if(globTreatHist[i].dent == dent) {

									}

									break;
								case 4:
									if(globTreatHist[i].code == code)
										return veri_age('4', ' ', globTreatHist[i].date, numjour, ll);

									break;
								case 5:
									if(globTreatHist[i].code == code && globTreatHist[i].dent == dent){
										if(globTreatHist[i].surface == surface) {
											return veri_age('4', ' ', globTreatHist[i].date, numjour, ll);
										} 
										else {

										}
									}
									break;
							}
						}
					}
				}
			}
		
			return true;
		}

		function traiter_valeur_de_base(code, tooth,next_row,type_prev) {
			console.log('here vleur base' + code + tooth);
			var obj = {code : code};
			if(is_valeur_de_base(obj, tooth)) {
				var row = getCodeData(obj.code);
				populate_row_data(next_row,row,type_prev);
				return;
				//Fill up the next row with informations in row.....
				// warnMsg(row.fr);
			}
		}

		function populate_row_data(next_row,row_data,type_prev)
		{
			var tr=$(next_row);
			var type_s=type_prev;
			var hono;
			var thisDent=tr.prev().children('td[data-target="Dent"]').text();

			tr.children('td[data-target="Dent"]').text(thisDent);
			tr.children('td[data-target="Code"]').text(row_data.regiecode);
			tr.children('td[data-target="Frais"]').text(parseFloat(row_data.frais_lab).toFixed(2));
			
			tr.children('td[data-target="Prod"]').text(row_data.producer);
			tr.children('td[data-target="codeRole"]').text(row_data.time_unit);
			if(globLang=='fr')
			{
				tr.children('td[data-target="Description"]').text(row_data.descrf);
			}	
			else if(globLang=='en')
			{
				tr.children('td[data-target="Description"]').text(row_data.descra);
			}
			
			if(type_s=="AMQ" || type_s=="BES" || type_s=="HOP") {
				hono=parseFloat(row_data.prixa).toFixed(2);
              // tr.children('td[data-target="Honoraires"]').text(parseFloat(row_data.prixa).toFixed(2));
            }
            else 
            {
              if(type_rate_glbl === undefined || parseInt(type_rate_glbl) == 1) //regulier or special
               {
               	
               	hono=parseFloat(row_data.prixr).toFixed(2);
               }
              else
               {
               	
               	hono=parseFloat(row_data.prixs).toFixed(2);
       			}      
            }

            tr.children('td[data-target="Honoraires"]').text(hono);
            tr.children('td[data-target="Total"]').text(((parseFloat(row_data.frais_lab))+(parseFloat(hono))).toFixed(2));

		}

		function is_valeur_de_base(obj, tooth) {
			var codent_flag1 = false;
			var codent_flag2 = false;
			var type_dent = ['64', '65', '54', '55', '84', '85', '74', '75', '14', '15',
							'24', '25', '34', '44', '45', '16', '17', '18', '26', '27',
							'28', '35', '36', '37', '38', '46', '47', '48'];
			var tenons_code = ['21301', '21302', '21303', '21304', '21306', '27421', '27401', '27403', '27411', '27413', '27901', '27903', '27921', '29101'];
			var restauration_code = ['21101', '21102', '21103', '21104', '21105', '21105', '21211',
						'21212', '21213', '21214', '21215', '21221', '21222', '21223',
						'21224', '21225', '21231', '21232', '21901', '21903',
						'21904', '21905', '21911', '21912',
						'23101', '23102', '23103', '23104', '23105', '23111', '23112',
						'23113', '23114', '23115', '23118', '23211', '23212', '23213',
						'23904', '23214', '23215', '23221', '23222', '23223', '23224',
						'23225', '23301', '23302', '23311', '23312', '23313', '23314',
						'23315', '23411', '23412', '23413', '23414', '23415', '23901',
						'23902', '23903', '23904', '23905',
						'25100', '25200', '25300', '25500', '25521', '25601', '25602',
						'25603', '25604',
						'25121', '25122', '25123',
						'25221', '25222', '25223',
						'25521',
						'23121', '23123',
						'23122',
						'21301', '21302', '21303', '21304', '21306', '27421', '27401',
						'27403', '27411', '27413', '27901', '27903', '27921', '29101'];

			var valeur = tooth.substring(tooth.length - 1);
			if(tooth == '' || (valeur == "1" || valeur == "2" || valeur == "3"))
				return false;

			// One teeth can have ONLY one valeur de base. make a lopp to verifiy this.  if find same code and dent, exit, return false

			if($.inArray(obj.code, tenons_code) > -1)
				return false;

			//Verify if already generated, type[n-1] == type[n]

			if(obj.code.substring(0, 1) == "2" && obj.code != '21999' && obj.code != '23999') {
				if($.inArray(tooth, type_dent) > -1)
					codent_flag1 = true;

				if($.inArray(obj.code, restauration_code) > -1) {
					codent_flag1 = true;
				} else if(obj.code == '23301' || obj.code == '23302') {
					if($.inArray(tooth, type_dent) > -1) {
						codent_flag2 = true;
					}
				}
			}

			if(codent_flag1 || codent_flag2) {
				obj.code = '21999';
				if(codent_flag2) {
					obj.code = '23999';
				}

				//if find same code and dent, exit , return false

				return true;
			}

			return false;
		}

		function is_obturation_code(code) {
			var endo_code = [21231, 21911, 21232, 21912, 22103, 22903, 22102, 22902, 23101, 23901,
							23103, 23903, 23104, 23904, 23102, 23902, 23105, 23905, 23108, 23908];
			if($.inArray(parseInt(code), endo_code) > -1)
				return true;
			return false;
		}

		function is_dent_anterieur(tooth) {
			var dent_anterieur = [1,2,3,4,5,6,11,12,13,21,22,23,31,32,33,41,42,43,51,52,53,61,62,63,71,72,73,81,82,83];
			if($.inArray(parseInt(tooth), dent_anterieur) > -1)
				return true;
			return false;
		}

		function is_endo_code(code) {
			var endo_code = [33100, 33101, 33102, 33120, 33200, 33201, 33202, 33220, 33201, 33202,
							 33220, 33300, 33301, 33302, 33320, 33400, 33401, 33402, 33420, 33504, 33521,
							 33522, 33523, 33531, 33532, 33533, 33541, 33542, 33543, 33999, 39902];
			if($.inArray(parseInt(code), endo_code) > -1)
				return true;
			return false;
		}

		function is_ablation_code(code) {
			var ablation_code = [71101, 71111, 71401, 71411, 72210, 72230, 72250, 72260, 72300, 72311, 72351, 72361,
								72320, 75350, 75360, 79301];
			if($.inArray(parseInt(code), ablation_code) > -1)
				return true;
			return false;
		}

		function regle1_4(limit, insurance, age, insuranceCo) {
			if(age >= limit) {
				if(insurance != 'BES' && (insurance != 'HOP' && insuranceCo != 'BES')) {
					return false;
				} else {
					if(insuranceCo == 'BES' && insurance == 'HOP') {
						return false;
					} else {
						switch(limit) {
							case 13:
								if(age >= 13 && age <= 15)
									return quest_recl();
								break;
							case 16:
								if(age > 16)
									return quest_recl();
								break;
						}
					}
				}
			}
			return true;
		}

		function prothese(insurance, code) {
			if(code.substring(0, 1) != '5' || code == '55101' || code == '55102' || code == '55201' || code == '55202')
				return true;

			if(insurance != 'BES') {
				globVarMessageErrorValidation = msgerror.msg226;
				return false;
			}

			var deux_dern = code.substring(3);
			switch(code.substring(1, 2)) {
				case "1":
					if(!(code.substring(2, 3) == '1' &&
						(deux_dern == '00' || deux_dern == '01' || deux_dern == '10' || deux_dern == '11' || deux_dern == '20' || deux_dern == '21'))) {
						globVarMessageErrorValidation = msgerror.msg213;
						return false;
					}
					break;
				case "2":
					if(!(code.substring(2, 3) == '2' &&
						(deux_dern == '40' || deux_dern == '41' || deux_dern == '50' || deux_dern == '51' || deux_dern == '60' || deux_dern == '61'))) {
						globVarMessageErrorValidation = msgerror.msg213;
						return false;
					}
					break;
				case "5":
					if(!((code.substring(2, 3) == '1' || code.substring(2, 3) == '2') && (deux_dern == '01' || deux_dern == '02'))) {
						globVarMessageErrorValidation = msgerror.msg213;
						return false;
					}
					break;
				case "6":
					if(!(code.substring(2, 3) == '1' && (deux_dern == '01' || deux_dern == '02'))) {
						globVarMessageErrorValidation = msgerror.msg213;
						return false;
					}
					break;
				default:
					globVarMessageErrorValidation = msgerror.msg213;
					return false;
			}
			return true;
		}

		function ablation_same_tooth_two_times(code) {
			var trs=$('#factTableBody tr ');
			var codeFound=0;
			$.each(trs, function(id,val){
				var cur_Code= $(val).find('td[data-target=Code]').text();	
				if(code==cur_Code && (code=='71101' || code == '71401')){
					codeFound=codeFound+1;			
				}		
			});
		
			if(codeFound>=2) {
				globVarMessageErrorValidation = msgerror.msg04;
				return true;			
			}
			else{
				return false;
			}
	}

var regiecodes="01300,93200,13200,11200,43500,12400,94500,94510,01120,01130,04301,04312,21231,21911,21232,21912,23101,23901,23102,23902,23103,23903,23104,23904,23105,23905,23108,23908,21999,21101,21901,21102,21902,21103,21903,21104,21904,21105,21905,21211,21212,21213,21214,21215,21221,21222,21223,21224,21225,23999,23301,23302,21301,21302,21306,27421,27921,27401,27901,27403,27903,27411,27413,29100,29101,31111,32211,32911,32310,32910,33501,33502,33503,33504,33001,33002,33003,33004,33999,39910,31110,55520,55530,92221,94600,94405,93220,93230,71101,71111,71401,71411,72100,72200,72210,72220,72230,72250,72260,72300,72311,72351,72361,72320,75350,75360,79301,72412,72411,75100,75101,75200,75220,79615,79616,75502,75503,75504,75505,75506,74421,74422,74423,74424,74425,74426,74427,04311,04312,04301,04302,04330,74101,74102,74103,74104,74105,74106,74107,74111,74112,74113,74114,74115,74116,74117,75531,75532,75533,75534,75535,75536,75540,75551,75552,75553,75554,75555,75556,75560,73202,73203,73204,73205,73421,73422,73423,73424,73401,73402,73403,73404,73371,73372,73373,73374,73381,73382,73383,73384,77505,73130,73220,73021,73022,73023,73024,73025,73026,73150,73158,73159,73160,73001,73002,73003,73004,73005,73006,73171,73172,73173,73174,73175,73176,73177,73178,73181,73182,73183,73184,73185,73186,73187,73133,73134,73158,73171,73174,79101,79104,79105,79110,79106,79107,79111,79112,79109,79108,79113,79306,79312,77815,42010,42011,42012,42013,42014,42015,72410,79405,79406,76950,76951,76952,76953,76954,76955,76956,75957,75994,75995,75996,75997,76958,76960,76961,76962,76963,76964,76965,76966,76967,76968,79208,79203,79204,79211,79212,79402,77730,77710,77740,74224,74226,77860,74303,74305,74306,74307,76701,76702,76703,76704,76623,76622,76621,76503,76504,76310,76312,76410,76420,76430,76511,76512,76513,76411,76412,76413,76414,76421,76431,76810,76210,76221,76222,76223,76231,76232,76233,76241,76242,76243,76260,76520,76510,76530,76521,76522,76523,76911,76912,76913,76920,76930,76939,76940,76135,76136,76115,76104,76192,79984,79985,79986,79989,78115,78125,78200,78300,78400,77160,78600,77121,77451,77422,77440,77310,77411,77412,77400,77320,77325,77315,77305,77610,77611,77600,77425,77453,76957,79987,77452,79257,79259,74445,74449,74452,74454,79050,76551,76555,76154,76156,78407,78500,78401,78410,77720,75994,75995,75996,75997,79257,79259,74445,74449,74452,74454,79050,76551,76555,76154,76156,78407,78500,78401,78410,77720,77700,77701,77702,77703,94540,94541,51120,51100,51110,52240,52250,52260,51101,51111,51121,52241,52251,52261,56100,56101,55101,55102,55201,55202,55201,55202,51102,51112,51122,52242,52252,52262";
regiecodes = regiecodes.split(",");
