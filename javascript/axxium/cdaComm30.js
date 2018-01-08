function CdaCommSendToSecondIns()
{ }

function CdaCommOpenCASPopup()
{ }

function CdaCommSendToCAS()
{ }

function CdaCommShowResp(pResp)
{
    $('#cda_resp_transcode').val(pResp.a04);
    $('#cda_resp_patient').val('');
    $('#cda_resp_assur').val();
    $('#cda_resp_no_seq').val(pResp.a02);
    $('#cda_resp_cod_resp').val();
    $('#cda_resp_mailbox').val();
    $('#cda_resp_demand_pamnt').val();
    $('#cda_resp_no_ref').val();
    $('#cda_resp_no_confirm').val();
    $('#cda_resp_montant_reclaim').val();
    $('#cda_resp_montant_deduct').val();
    $('#cda_resp_montant_prsntation').val();
    $('#cda_resp_montant_adjust').val();
    $('#cda_resp_mont_rembour').val();
    $('#cda_resp_date_pamnt').val();
    $('#cda_resp_date_pamnt_not').val();
    $('#cda_resp_payabl').val();
    $('#cda_resp_notes').val();
    modResponseCDANET();
}