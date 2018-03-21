var globArrPostDateData = [];

$(document).ready(function () {
    $(document.body).on("keypress", "#tblPaymentFractBody tr td[data-target='producteur']", function (e) {

        if (e.which == 13) {
            CashFractAddRow();
            var totalAmount = CashFractCalcTotal();
            $('#lblPaymentFractAmount').html(totalAmount.toFixed(2));
        }
        return e.which != 13;
    });
})


function CashUpdatePostDateData()
{
    var newPostDateArr = [];
    //Create array from PostDatetable
    var currPostDateArr = CashGetPostDatesArr();
    //Compare current data with previous data

    var changedDateIndex = CashPostDateIsDateChanged(currPostDateArr);
    var changedAmountIndex = CashPostDateIsAmountChanged(currPostDateArr);

    if (changedDateIndex != -1)
    {
        globArrPostDateData[changedDateIndex].date = currPostDateArr[changedDateIndex].date;
        for (var i = changedDateIndex; i < globArrPostDateData.length-1; i++)
        {
            globArrPostDateData[i + 1].date = CashAddMonthToDate(parseDate(globArrPostDateData[i].date), 1);
        }
    }

    if (changedAmountIndex != -1) {
        var totalAmount = 0;
        for (var j = 0; j < globArrPostDateData.length; j++)
        {
            totalAmount += parseFloat(globArrPostDateData[j].montant);
        }

        globArrPostDateData[changedAmountIndex].montant = currPostDateArr[changedAmountIndex].montant;
        var tmpAmount = 0;
        for (var k = 0; k <= changedAmountIndex; k++)
        {
            tmpAmount += parseFloat(globArrPostDateData[k].montant);
        }
        var restAmount = totalAmount - tmpAmount;

        if (globArrPostDateData.length > changedAmountIndex+1)
        {
            var monthlyAmount = restAmount / (globArrPostDateData.length - (changedAmountIndex+1));
        }

        for (var i = changedAmountIndex + 1; i < globArrPostDateData.length; i++) {
            globArrPostDateData[i].montant = monthlyAmount.toFixed(2);
        }
    }
    CashPopulatePostDateTable();
}

//returns index if date was changed (and new date is correct), otherwise -1
function CashPostDateIsDateChanged(pCurrPostDateArr)
{
    for (var i = 0; i < globArrPostDateData.length; i++) {

        if (globArrPostDateData[i].date !== pCurrPostDateArr[i].date) {
            var olddate = parseDate(globArrPostDateData[i].date);
            var newDate = parseDate(pCurrPostDateArr[i].date);
            if (!isNaN(newDate) && (newDate > olddate)) {
                return i;
            }
        }
    }
    return -1;
}

//returns index if amount was changed (and new new amount is correct), otherwise -1
function CashPostDateIsAmountChanged(pCurrPostDateArr) {
    for (var i = 0; i < globArrPostDateData.length; i++) {

        if (globArrPostDateData[i].montant !== pCurrPostDateArr[i].montant) {
            if (!isNaN(parseFloat(pCurrPostDateArr[i].montant))) {
                return i;
            }
        }
    }
    return -1;
}



function CashCreateDataForPostDateTable()
{
    globArrPostDateData = [];
    var montant = parseFloat($('#pst_dat_mnt').val());
    var date = parseDate($('#pst_dat').val());
    var nb = parseInt($('#pst_nb').val());
    var type = $('#pst_type').val();

    if (!isNaN(date) && nb > 0 && !isNaN(montant) && montant > 0)
    {
        for (var i = 0; i < nb; i++) {
            var objData = {};
            objData.no = i + 1;
            objData.date = CashAddMonthToDate(date, i);

            objData.montant = (montant / nb).toFixed(2);
            objData.type = type;
            globArrPostDateData.push(objData);
        }
        CashPopulatePostDateTable();
    }
}

function CashPopulatePostDateTable()
{
    $('#tblCashPostDate tbody').empty();
    var tableContent = "";
    for (var i = 0; i < globArrPostDateData.length; i++) {
        tableContent += "<tr>";
        tableContent += "<td>" + globArrPostDateData[i].no + "</td>";
        tableContent += "<td contenteditable='true' >" + globArrPostDateData[i].date + "</td>";
        tableContent += "<td contenteditable='true' >" + globArrPostDateData[i].montant + "</td>";
        tableContent += "<td>" + globArrPostDateData[i].type + "</td>";
        tableContent += "</tr>";
    }

    $('#tblCashPostDate tbody').append(tableContent);
    $('.modalCashPostDate').modal('show');
}

function CashAddMonthToDate(pDate, pMonthN)
{
    var d = parseDate(pDate.toISOString().slice(0, 10));
    return addMonth(d,pMonthN).toISOString().slice(0, 10);
}

function CashFractAddRow() {
    var lastAmount =  $('#tblPaymentFract tr:last td:first').html();
    var lastProduct = $('#tblPaymentFract tr:last td:last').html();

    lastAmount = parseFloat(lastAmount);
    if (!isNaN(lastAmount) && lastProduct)
    {
        var tableRow = '<tr><td contenteditable="true" data-target="montant"></td><td contenteditable="true" data-target="producteur"></td></tr>';
        $('#tblPaymentFract tbody').append(tableRow);
    }
}

function CashFractCalcTotal()
{
    var table = document.getElementById('tblPaymentFract');
    var total = 0;
    var rowLength = table.rows.length;

    for (var i = 1; i < rowLength; i++) {
        var row = table.rows[i];
        var cell = row.cells[0];
        var amount = parseFloat(cell.innerHTML);

        if (!isNaN(amount))
        {
            total += amount;
        }
    }
    return total;
}

function CashSaveBill()
{
    var jsondata = CashGetCashData();
    var xmlBillInfo = CashCreateXmlForVisionR(jsondata);
    var inputXMl = {
        "xml":xmlBillInfo,
        "cas": jsondata
    };
    $.post("allScriptsv1.py", { tx: "SendUpdateToVisionR", clinicId: globClinicId, patientId: globPatientId, nodossier: globNoDossier, nofact: globBillNumber, json: JSON.stringify(inputXMl) },
        function(result){
            if (result.outcome == 'error')
                alert(result.message);
            else
                displayRamqAnswer("VisionR", 'Les données ont été envoyées à VisionR avec succès');
        });

    //Re-Initialize all tables
    ReInitialize_fact_tbls();

}

function CashGetCashData()
{
    var obj = {};
    obj.comptant_agrent = $('#argnt_pamnt').val();
    obj.comptant_debit = $('#debit_pamnt').val();
    obj.credit_type = CahsGetCreditCardType();
    obj.credit_montant = $('#visa_crdt_inpt').val();
    obj.postDate_No = $('#pst_dat_no').val();
    obj.postDate_montant = $('#pst_dat_mnt').val();
    obj.postDate_date = $('#pst_dat').val();
    obj.postDate_nb = $('#pst_nb').val();
    obj.postDate_type = $('#pst_type').val();
    obj.postDate_list = CashGetPostDatesArr();
    obj.fractPayment = $('#fract_pmnt_check').is(':checked');
    obj.fract_list = CashFractArr();
    obj.total_fact = $('#total_pamnt').val();
    obj.lab = $('#lab_prcnt').val();
    obj.listLigneFact = RamqGetCasDataFromGrille();
    return obj;
}

function CashCreateXmlForVisionR(pObjCash)
{
    var totalCash = parseFloat($('#pers_total').val());
    var totalAmq = parseFloat($('#amq_total').val());
    var totalIns = parseFloat($('#ass_total').val());

    totalCash = isNaN(totalCash)?0:totalCash;
    totalAmq = isNaN(totalAmq)?0:totalAmq;
    totalIns = isNaN(totalIns)?0:totalIns;

    var xml = '';
    xml += '<fact_info>' +
                '<dentist>' + globDentist + '</dentist>' +
                '<no_Facture>' + globBillNumber + '</no_Facture>' +
                '<no_Recu>' + globBillNumber + '</no_Recu>'+
                '<no_dossier>' + globNoDossier + '</no_dossier>' + //Numéro de dossier
                '<dat_serv>' + new Date().toISOString().slice(0, 10) + '</dat_serv>' + //Date
                '<total_amq>' + totalAmq + '</total_amq>' + // <!--Montant couvert par RAMQ -->
                '<total_assur>' + totalIns + '</total_assur>' + // Montant couvert par assurances
                '<total_patient>' + totalCash + '</total_patient>' + // <!--Montant couvert par patient-->
                '<paiement_details>' +
                    '<comptant>' +
                        '<agrent>' + pObjCash.comptant_agrent + '</agrent>' +
                        '<debit>' + pObjCash.comptant_debit + '</debit>' +
                    '</comptant>' +
                    '<credit>' +
                        '<credit_type>' + pObjCash.credit_type + '</credit_type>' + //  <!-- Value: 0-None 1-Visa 2-Amex 3-Master Card -->
                        '<credit_montant>' + pObjCash.credit_montant + '</credit_montant>' +
                    '</credit>' +
                    '<post_dates>' +
                        '<post_dates_no>' + pObjCash.postDate_No + '</post_dates_no>' +
                        '<post_dates_montant>' + pObjCash.postDate_montant + '</post_dates_montant>' +
                        '<post_dates_date>' + pObjCash.postDate_date + '</post_dates_date>' +
                        '<post_dates_nb>' + pObjCash.postDate_nb + '</post_dates_nb>' +
                        '<post_dates_type>' + pObjCash.postDate_type + '</post_dates_type>' + // Value: 0-None 1-Visa 2-Amex 3-Master Card 4-Chèque 5-Financement
                        '<list_ligne_post_dates>' +
                            CashCreateListPostDateXml(pObjCash.postDate_list) +
                        '</list_ligne_post_dates>' +
                    '</post_dates>' +
                    '<fract_payment>' + pObjCash.fractPayment + '</fract_payment>' + // true or false
                    '<list_ligne_fract_payment>' +
                        CashCreateListFractPaymentXml(pObjCash.fract_list) +
                    '</list_ligne_fract_payment>' +
                    '<total_fact>' + pObjCash.total_fact + '</total_fact>' + //<!--Total Cash-->
                    '<lab>' + pObjCash.lab + '</lab>' +
                '</paiement_details>' +
                '<liste_ligne_fact>' +
                    CashCreateListLigneFactXml() +
                '</liste_ligne_fact>' +
            '</fact_info>';

    return xml;
}

function CashCreateListLigneFactXml()
{
    var xml = '';
    for(var i= 0; i< arrGrilleDeFacturation.length; i++)
    {
        xml +=  '<ligne_fact>'+
                    '<no_ligne_fact>'+arrGrilleDeFacturation[i].row_id+'</no_ligne_fact>'+
                    '<type>'+arrGrilleDeFacturation[i].Type+'</type>'+
                    '<no_dent>'+arrGrilleDeFacturation[i].Dent+'</no_dent>'+
                    '<cod_surf_dent>'+arrGrilleDeFacturation[i].Surface+'</cod_surf_dent>'+
                    '<code>'+arrGrilleDeFacturation[i].Code+'</code>'+
                    '<frais_lab>'+arrGrilleDeFacturation[i].Frais+'</frais_lab>'+
                    '<honoraires>'+arrGrilleDeFacturation[i].Honoraires+'</honoraires>'+
                    '<ligne_total>'+arrGrilleDeFacturation[i].Total+'</ligne_total>'+//<!--Sum frais_lab and honoraires-->
                    '<cod_role>' + arrGrilleDeFacturation[i].codeRole + '</cod_role>' +
                    '<description>' + arrGrilleDeFacturation[i].Description + '</description>' +
                '</ligne_fact>';
    }
    return xml;
}

function CashCreateListPostDateXml(pArrPostDate)
{
    var xml= '';
    for(var i= 0; i<pArrPostDate.length;i++)
    {
        xml +=   '<ligne_post_dates>'+
                    '<no_ligne_post_dates>'+ pArrPostDate[i].no +'</no_ligne_post_dates>'+
                    '<date_ligne_post_dates>'+ pArrPostDate[i].date +'</date_ligne_post_dates>'+
                    '<montant_ligne_post_dates>'+ pArrPostDate[i].montant+'</montant_ligne_post_dates>'+
                '</ligne_post_dates>';
    }
    return xml;
}

function CashCreateListFractPaymentXml(pArrFractPaym)
{
    var xml= '';
    for(var i= 0; i<pArrFractPaym.length; i++)
    {
        xml +=   '<ligne_fract_payment>' +
                    '<montant_ligne_fract_payment>'+pArrFractPaym[i].montant+'</montant_ligne_fract_payment>'+
                    '<produc_ligne_fract_payment>'+pArrFractPaym[i].prod+'</produc_ligne_fract_payment>'+
                '</ligne_fract_payment>';
    }
    return xml;
}

function CahsGetCreditCardType()
{
    var creditCardType = 0;
    if ($('#visa_crdt_rad').is(':checked')) creditCardType = 1;
    else if ($('#amex_crdt').is(':checked')) creditCardType = 2;
    else if ($('#mstr_crdt').is(':checked')) creditCardType = 3;
    return creditCardType;
}

function CashGetPostDatesArr()
{
    var arr =  [];
    var table = document.getElementById('tblCashPostDate');
    var rows = table.rows;
    for (var i = 1, row; row = table.rows[i]; i++)
    {
        var obj = {};
        obj.no = row.cells[0].textContent;
        obj.date = row.cells[1].textContent;
        obj.montant = row.cells[2].textContent;
        arr.push(obj);
    }
    return arr;
}

function CashFractArr()
{
    var arr = [];
    var table = document.getElementById('tblPaymentFract');
    var rows = table.rows;
    for (var i = 1, row; row = table.rows[i]; i++) {
        var obj = {};
        obj.montant = row.cells[0].textContent;
        obj.prod = row.cells[1].textContent;
        if (obj.montant && obj.prod)
        {
            arr.push(obj);
        }
    }
    return arr;
}

function CashDisplayFractPayment() {
    if ($('#fract_pmnt_check').is(':checked')) {
        $("#facture_select_check").show();
    }
    else {
        $("#facture_select_check").hide();
    }
}

function CashPostDateOnChange()
{
    //Date should be at least one day after today.
    var date = parseDate($('#pst_dat').val());
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    if (date < tomorrow)
        $('#pst_dat').val('');
}

//recalculate total facture every time cash fields lost focus
function CashCalculateCashTotal() {
    var totalFacture = 0;
    var comptArgent = parseFloat($('#argnt_pamnt').val());
    var comptDebit = parseFloat($('#debit_pamnt').val());
    var credit = parseFloat($('#visa_crdt_inpt').val());
    var postDateMnt = parseFloat($('#pst_dat_mnt').val());

    comptArgent = isNaN(comptArgent) ? 0 : comptArgent;
    comptDebit = isNaN(comptDebit) ? 0 : comptDebit;
    credit = isNaN(credit) ? 0 : credit;
    postDateMnt = isNaN(postDateMnt) ? 0 : postDateMnt;

    totalFacture = comptArgent + comptDebit + credit + postDateMnt;

    $('#total_pamnt').val(totalFacture.toFixed(2));
}

function isLeapYear(year) {
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
}

function getDaysInMonth(year, month) {
    return [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

function addMonth(pDate, pMonthN) {
    var n = pDate.getDate();
    pDate.setDate(1);
    pDate.setMonth(pDate.getMonth() + pMonthN);
    pDate.setDate(Math.min(n, getDaysInMonth(pDate.getFullYear(),pDate.getMonth())));
    return pDate;
};

// parse a date in yyyy-mm-dd format
function parseDate(input) {
    if(isNaN(Date.parse(input)))
    {
        return NaN;
    }
    else{
        var parts = input.split('-');
        return new Date(parts[0], parts[1] - 1, parts[2]); // Note: months are 0-based
    }
}


