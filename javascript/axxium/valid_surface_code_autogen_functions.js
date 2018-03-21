	var init_code;

// ~Updated

 function get_type_surf(val){

    // LINE 1525 u_fact2
    var type_surf;
	type_surf=3;
	
	// Condition 1
	if(val==''){
		type_surf=4;
		console.log('Surface empty Type is :' + type_surf);
		return type_surf;
	}

	if(val.length>5){
		type_surf=0;
		console.log('Surface length greater than 5, TYpe is :' + type_surf);
		return type_surf;
	}

	//Condition 3
	if(!(isNaN(parseFloat(val))) && (isFinite(val))) //if((!(isNaN(val)))&&(val.length!=''))
	{
		//isNAN Not-A-Number Function , If NOT A NUMBER : TRUE , IF NUMBER - FALSE
		//in loop when NOT TRUE - isNAN
		console.log('Surface is number : ' + isNaN(val));

		if(val=='97'||val=='87') { //tested
			type_surf=5;
			console.log('97 or 87 surface val,Type is :' + type_surf);
		}
		else if(!((val.charAt(0) >= 1) && (val.charAt(0) <= 6)))
		{
			console.log('if not surf[1] (greater than 1 less than 6)');
			type_surf=0;
		}
		else {
			// isNAN is TRUE
			type_surf=1;
		}
		return type_surf;
	}

	var surf_sextant=surface_validation_sextant(val);

	//Condition 4
	if(surf_sextant)
	{
		type_surf=2; //tested
		return type_surf;
	}

	var string_surface="IMOBDL";
	var concatStr2=val+string_surface;
	console.log('Sendng str to check repeat' + concatStr2);
	var ifExistInString=checkRepeatChrcInString(concatStr2);

	//Condition 5
	if(val.length!=0)
	{
		if(ifExistInString<1){
			// means User did not Input I,M,O,B,D,L
			console.log('TYPE 0 because string did not present in IMOBDL');
			type_surf=0;
			return type_surf;
		}

		//if (type_surf==0)
		//{
		//  warnMsg('Cette surface est invalide');
		//}
	}

	return type_surf;
}


 function surface_validation_sextant(val){

      if(((val!='SA')&&(val!='SPG')&&(val!='SPD')&&(val!='IA')&&(val!='IPG')&&(val!='IPD')))
      {
        return false;
      }
      else
      {
        return true;
      }

    }

 function gene_amq(dent,surf){

 	var ret_val;

 	if(is_dent_anterieur(dent))
 	{
 		init_code='';
 		code_surf_pre(dent,surf);
 		console.log('After Code_Surf function , init_code:' + init_code);

 		if ((init_code=='')||(surf=='O'))
 		{

 			warnMsg(msgerr.msg021);
 			return false;
 		}

 	}

 	else if((dent>=14 && dent<=18)||(dent>=24 && dent<=28)||(dent>=34 && dent<=38)||(dent>=44 && dent<=48)||(dent>=54 && dent<=55)||(dent>=64 && dent<=65)||(dent>=74 && dent<=75)||(dent>=84 && dent<=85))
 	{
 		init_code='';
 		if(surf!='97')
 		{
 			var code_surf_post=code_surf_post_fn(dent,surf);
 			if((init_code=='')||(surf=='I'))
 			{
 				warnMsg(msgerr.msg021);
 				return false;
 			}


 		}
 	}
 }

 function code_surf_pre(dent,surf){

 	if(surf=='97'){
 		init_code='23105';
 	}

 	if(surf=='87'){
 		init_code='23108';
 	}

 	if(surf.length!=1){

 	}

 	switch (surf.charAt(0)){

 		case 'B':
 			init_code='23102';
 		break;
 		case 'I':
 			var aouc=aouc_fn(1);
			if(aouc==1){
 				init_code='21231';
 			}
 			else{
 				init_code='23101';
 			}

 		break;
 		case 'O':
 			var aouc=aouc_fn(1);
			if(aouc==1){
 				init_code='21231';
 			}
 			else{
 				init_code='23101';
 			}
 		break;
 		case 'L':
 			var aouc=aouc_fn(1);
			if(aouc==1){
 				init_code='21231';
 			}
 			var classe=classe_fn(1);
 			if(classe=='1')
 			{
 				init_code='23101';
 			}
 			else
 			{
 			 init_code='23102';
 			}

 		break;
 		case 'M':
 			var aouc=aouc_fn(1);
			if(aouc==1){
 				init_code='21232';
 			}
 			var classe=classe_fn(2);
 			if(classe=='3')
 			{
 				init_code='23103';
 			}
 			else
 			{
 			 init_code='23104';
 			}
 		break;
 		case 'D':
 			var aouc=aouc_fn(1);
			if(aouc==1){
 				init_code='21232';
 			}
 			var classe=classe_fn(2);
 			if(classe=='3')
 			{
 				init_code='23103';
 			}
 			else
 			{
 			 init_code='23104';
 			}
 		break;
 	}

 }

 function aouc_fn(num){

 	return num;
 }

 function classe_fn(num){
 	return 2;
 }

 function code_surf_post_fn(dent,surf){

 	var surf_length=surf.length;
 	if(surf=='I')
 	{
 		return ;
 	}

 	if((dent>=54 && dent<=55)||(dent>=64 && dent<=65)||(dent>=74 && dent<=75)||(dent>=84 && dent<=85))
 	{
 		init_code='2110'+surf_length;

 		if ((surf=='DM')||(surf=='BL'))
 		{
 			warnMsg(msgerr.msg077);
 			return false;
 		}
 	}
 	if((dent>=14 && dent<=15)||(dent>=24 && dent<=25))
 	{
		init_code='2110'+surf_length;

		if((surf=='M')||(surf=='B')||(surf=='BM'))
		{
			var aouc=aouc_fn(2);
			if(aouc==2)
			{
				init_code='2330'+surf_length;
			}
			if(aouc==6)
			{
				init_code='2123'+surf_length;
			}
		else{
				warnMsg(msgerr.msg077);
				return false;
			}
		}
 	}
 	if((dent>=34 && dent<=35)||(dent>=44 && dent<=45))
 	{
		init_code='2121'+surf_length;

		if((surf=='DM')||(surf=='BL'))
		{
			warnMsg(msgerr.msg077);
			return false;
		}
 	}
 	if((dent>=16 && dent<=18)||(dent>=26 && dent<=28)||(dent>=36 && dent<=38)||(dent>=46 && dent<=48))
 	{
		//init_code='2122'+surf_length;
				if (surf_modal_btn_val == "1")
				{
		   	 			init_code='2122'+surf_length;
				}
				else if (surf_modal_btn_val == "2")
				{
		   	 			init_code='2322'+surf_length;
				}
				else if (surf_modal_btn_val == "3")
				{
		   	 		if(surf_length<=3)
		   	 		{
		   	 			init_code='25'+surf_length+'00';
		   	 		}
				}
				else if (surf_modal_btn_val == "4")
				{
		   	 		if(surf_length<=2)
		   	 		{
		   	 			init_code='2512'+surf_length;
		   	 		}
		   	 		if(surf_length>=3)
		   	 		{
		   	 			init_code='25123';
		   	 		}
				}
				else
				{
					init_code=surf_modal_btn_val;
				}

		//if((surf=='DM')||(surf=='BL'))
		//{
		//	warnMsg(msgerr.msg077);
		//	return false;
		//}
 	}
 }

 function surf_classe(dent, surface) {
	if((dent>=51 && dent<=53)||(dent>=61 && dent<=63)||(dent>=71 && dent<=73)||(dent>=81 && dent<=83))
	{
		switch (surface){

			case '1':
			case '5':
			case '6':
				if(locatn=='Quebec')
				{
					init_code='23311';
				}
				else
				{
					init_code='23411';
				}
				break;
			case '3':
				if(locatn=='Quebec')
				{
					init_code='23312';
				}
				else
				{
					init_code='23412';
				}
				break;
			case '4':
				if(locatn=='Quebec')
				{
					init_code='23314';
				}
				else
				{
					init_code='23414';
				}
				break;
		}
	}
	else if(((dent>=1 && dent<=6)||(dent>=11 && dent<=13)||(dent>=21 && dent<=23)||(dent>=31 && dent<=33)||(dent>=41 && dent<=43))||dent==99)
	{
		switch (surface){
			case '1':
			case '5':
			case '6':
				init_code='23111';
				break;
			case '3':
				init_code='23112';
				break;
			case '4':
				init_code='23114';
				break;
		}
	}

 }

 function surf_alpha_fn(val,dent){
 	console.log('In SURF_ALPHA_FN');
 	console.log('location is :'+ locatn + 'surfvace field and DENT is '+ val + dent);
 	var surf_length=val.length;

 	 // if not (treatment[current_index].treat_original_code = 'X') then
   //    	init_code('')
   if(((dent>=51 && dent<=53)||(dent>=61 && dent<=63)||(dent>=71 && dent<=73)||(dent>=81 && dent<=83))&&(val=='97'))
   {
   		if(locatn=='Quebec'){
   			init_code='23315';
   			console.log('init code now '+init_code);
   			}
   			else{
   				init_code='23415';
   			}

   }

else {

		if(((dent>=11 && dent<=13)||(dent>=21 && dent<=23)||(dent>=31 && dent<=33)||(dent>=41 && dent<=43))&&(val=='97'))
		{
	   		if(locatn=='Quebec')
	   		{
	   			init_code='23115';
	   		}
	   		else
	   		{
	   			init_code='23215';
	   		}
   		}
	   else
	   {
	   		if((dent>=51 && dent<=53)||(dent>=54 && dent<=55)||(dent>=61 && dent<=63)||(dent>=64 && dent<=65)||(dent>=71 && dent<=73)||(dent>=74 && dent<=75)||(dent>=81 && dent<=83)||(dent>=84 && dent<=85))
		   {
		   	 switch (surf_modal_btn_val){

		   	 	case '1':
			   	 	if(locatn=='Quebec')
			   		{
			   			init_code='2110'+surf_length;
			   		}
			   		else
			   		{
			   			init_code='2111'+surf_length;
			   		}

		   	 	break;

		   	 	case '9':
		   	 	if(locatn=='Quebec')
			   		{
			   			init_code='2130'+surf_length;
			   		}
			   		else
			   		{
			   			init_code='2130'+surf_length;
			   		}

		   	 	break;

		   	 	case '8':
		   	 			if(locatn=='Quebec')
			   		{
			   			init_code='2312'+surf_length;
			   		}
			   		else
			   		{
			   			init_code='2312'+surf_length;
			   		}

		   	 	break;

		   	 	case '2':
		   	 		if(((dent>=54 && dent<=55)||(dent>=64 && dent<=65)||(dent>=74 && dent<=75)||(dent>=84 && dent<=85)))
		   	 		{
		   	 			init_code='2341'+surf_length;
		   	 		}
		   	 	break;

		   	 	case '6':
		   	 		init_code='2112'+surf_length;
		   	 	break;
		   	 	case '7':
		   	 		init_code='2112'+surf_length;
		   	 	break;

		   	 	case '0':
		   	 			//FALSE
		   	 	break;

		   	 	case 'X':
		   	 		// TRUE
		   	 	break;


		   	 }

		   }

		   if((dent>=1 && dent<=6)||(dent>=11 && dent<=13)||(dent>=21 && dent<=23)||(dent>=31 && dent<=33)||(dent>=41 && dent<=43))
		   {
		   	switch (surf_modal_btn_val)
		   	{
		   		case '1':
		   	 			init_code='2121'+surf_length;
		   	 		break;
		   	 	case '9':
		   	 		init_code='2130'+surf_length;
		   	 		break;
		   	 	case '2':
		   	 			if(val==97)
		   	 			{
		   	 				init_code='23115';
		   	 			}
		   	 			else
		   	 			{
		   	 				if(surf_length==1)
		   	 				{
		   	 					//FALSE
		   	 				}
		   	 				else
		   	 				{
		   	 					if((surf_length==4)||(surf_length==5))
		   	 					{
		   	 						init_code='23118';
		   	 					}
		   	 				}
		   	 			}
		   	 			break;

		   	 	case '3':
						if(surf_length<=3)
						{
							init_code='25'+surf_length+'00';
						}
						break;

		   	 	case '4':
						if(surf_length<=2)
						{
							init_code='2512'+surf_length;
						}
						if(surf_length>=3)
						{
							init_code='25123';
						}
						break;

		   	 	case 'A':
						if(surf_length<=2)
						{
							init_code='2522'+surf_length;
						}
						if(surf_length>=3)
						{
							init_code='25223';
						}
						break;
		   	 	case 'B':

		   	 			init_code='25221';
		   	 			break;
		   	 	case '5':

		   	 			init_code='25500';
		   	 			break;
		   	 	case '6':
		   	 	case '7':
		   	 			init_code='2123'+surf_length;
		   	 			break;
		   	 	case '8':

		   	 		init_code='2312'+surf_length;
		   	 		break;
		   	 	case '0':
		   	 			//FALSE
		   	 	break;

		   	 	case 'X':
		   	 		// TRUE
		   	 	break;
		   	}
		   }

		   	 if((dent>=14 && dent<=15)||(dent>=24 && dent<=25)||(dent>=34 && dent<=35)||(dent>=44 && dent<=45))
		   {
		   	switch (surf_modal_btn_val)
		   	{
		   		case '1':
						init_code='2121'+surf_length;
						break;
		   	 	case '9':
						init_code='2130'+surf_length;
						break;					
		   	 	case '2':
		   	 			init_code='2321'+surf_length;
		   	 			break;
		   	 	case '3':
						if(surf_length<=3) {
							init_code='25'+surf_length+'00';
						}
						break;
		   	 	case '4':
						if(surf_length<=2) {
							init_code='2512'+surf_length;
						}
						if(surf_length>=3) {
							init_code='25123';
						}
						break;
		   	 	case 'A':
						if(surf_length<=2) {
							init_code='2522'+surf_length;
						}
						if(surf_length>=3) {
							init_code='25223';
						}
						break;
				case 'B':
		   	 			init_code='25221';
		   	 			break;
		   	 	case '5':
		   	 			init_code='25500';
		   	 			break;

		   	 	case '6':
		   	 	case '7':
		   	 			init_code='2123'+surf_length;
		   	 			break;
		   	 	case '8':
						if((val.indexOf('O') > 0)||(val.indexOf('B') > 0)||(val.indexOf('L') > 0)) {
							init_code='23210';
						}
						else {
							init_code='2331'+surf_length;
						}

		   	 			break;
		   	 	case '0':
		   	 			//FALSE
		   	 	break;

		   	 	case 'X':
		   	 		// TRUE
		   	 	break;

		   	}
}
		   	if((dent>=16 && dent<=18)||(dent>=26 && dent<=28)||(dent>=36 && dent<=38)||(dent>=46 && dent<=48))
		   {
		   	switch (surf_modal_btn_val)
		   	{
		   		case '1':
		   	 			init_code='2122'+surf_length;
		   	 			break;

		   	 	case '9':
		   	 			init_code='2130'+surf_length;
		   	 			break;
		   	 	case '2':
		   	 			init_code='2322'+surf_length;
		   	 			break;

		   	 	case '3':
		   	 			if(surf_length<=3)
		   	 			{
		   	 				init_code='25'+surf_length+'00';
		   	 			}
		   	 			break;
		   	 	case '4':
		   	 			if(surf_length<=2)
						{
							init_code='2512'+surf_length;
						}
						if(surf_length>=3)
						{
							init_code='25123';
						}
						break;

		   	 	case 'A':
						if(surf_length<=2)
						{
							init_code='2522'+surf_length;
						}
						if(surf_length>=3)
						{
							init_code='25223';
						}
						break;

		   	 	case 'B':
		   	 		init_code='25521';
		   	 		break;

		   	 	case '5':
		   	 		init_code='25500';
		   	 		break;
		   	 	case '6':
		   	 	case '7':
		   	 		init_code='2124'+surf_length;
		   	 		break;
		   	 	case '8':
		   	 		if((val.indexOf('O') > 0)||(val.indexOf('B') > 0)||(val.indexOf('L') > 0))
					{
						init_code='23220';
		   	 		}
		   	 		else
		   	 		{
		   	 			init_code='2332'+surf_length;
		   	 		}

		   	 	break;

		   	 	case '0':
		   	 		// TRUE
		   	 	break;
		   	 	case 'X':
		   	 		// TRUE
		   	 	break;

		   	}


	 }

   }

 }
}
