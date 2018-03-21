//Returns an object with info about which types exist in Facturation grid:
// ex: {Ramq:false, Insur:true, Cash:false}
function PaymGetFactGridTypesInfo()
{
    var res = {};
    var isRamqExist = false;
    var isInsurExist = false;
    var isCashExist = false;
    for (var i = 0; i < arrGrilleDeFacturation.length; i++)
    {
        if (arrGrilleDeFacturation[i].Type == 'AMQ' || arrGrilleDeFacturation[i].Type == 'BES' || arrGrilleDeFacturation[i].Type == 'HOP')
            isRamqExist = true; continue;
        if (arrGrilleDeFacturation[i].Type != 'AMQ' && arrGrilleDeFacturation[i].Type != 'BES' && arrGrilleDeFacturation[i].Type != 'HOP' && arrGrilleDeFacturation[i].Type != 'CAS' && arrGrilleDeFacturation[i].Type != '')
            isInsurExist = true; continue;
        if (arrGrilleDeFacturation[i].Type == 'CAS')
            isCashExist = true; continue;
    }

    res.Ramq = isRamqExist;
    res.Insur = isInsurExist;
    res.Cash = isCashExist;

    return res;
}


//TODO:Implement
//Enable (disable) section of Payment form depends on operation types
function PaymEnableSectionIPaymeForm() {
    var types = PaymGetFactGridTypesInfo();

    if (!types.Ramq && types.Insur && !types.Cash)// only insurance
    {
    }
    else if (!types.Ramq && !types.Insur && types.Cash) //only cash
    {
    }
    else if (types.Ramq && !types.Insur && !types.Cash) //only Ramq
    {

    }
    else if (types.Ramq && types.Insur && !types.Cash)//Insurance and Ramq
    {

    }
    else if (!types.Ramq && types.Insur && types.Cash)//Insurance and Cash
    {

    }
    else if (types.Ramq && !types.Insur && types.Cash)//Ramq and Cash
    {

    }


}
