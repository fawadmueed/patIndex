function CDAV4FormatField(pValue, pFormatType, pRequiredLength)
{
    //convert input value to string.
    //var v = String(pValue);
    var v = pValue;
    var res = '';

    switch (pFormatType) {
        /*
        Numeric. Only ASCII digits are allowed in a field of this type. If a value is not present, fill with zeros. 
        Right-justify and fill with ASCII zeros on the left. 
        All date fields are of type numeric and formatted as YYYYMMDD.
        */
        case 'N':
            {
                if (!v)
                    v = '0';
                
                if (!Number.isInteger(Number(v))) {
                    alert('adoV4FormatField Error: value is not an integer.');
                }
                else {
                    var len = v.length;
                    if (len < pRequiredLength)
                    {
                        //Fill with zeros.
                        var lenDif = pRequiredLength - len;
                        for (var i = 0; i < lenDif; i++)
                        {
                            res += '0';
                        }
                        res += v;
                    }
                    else if (len == pRequiredLength)
                    {
                        res = v;
                    }
                    else if (len > pRequiredLength)
                    {
                        alert('adoV4FormatField Error: Value is longer than required.');
                    }
                }
                
            }
            break;

            /*
            Alphabetic. Only ASCII upper and lower case ALPHABETIC characters including apostrophe ('), dash (-) and comma (,) are allowed.
            Left-justify and pad with blanks on the right. If only specific values are permitted, e.g., Y, N, D, M; then the upper case must be used.
            */
            //TODO: Check if containg extended characters, character codes 128-255.
        case 'A':

            //as above but allows for the inclusion of extended characters, character codes 128-255.
        case 'AE':
            {
                if (!v)
                    v = '';
                //Check if all characters are alphabetical
                if (/^[a-zA-Z]+$/.test(v) || v=='') {
                    var len = v.length;
                    if (len < pRequiredLength) {
                        //Fill with spaces on the right.
                        var lenDif = pRequiredLength - len;
                        res = v;
                        for (var i = 0; i < lenDif; i++) {
                            res += ' ';
                        }
                    }
                    else if (len == pRequiredLength) {
                        res = v;
                    }
                    else if (len > pRequiredLength) {
                        alert('adoV4FormatField Error: Value is longer than required.');
                    }
                }
                else
                    alert('adoV4FormatField Error: Value contains not alphabetical caracters.');
            }
            break;

            //Alphanumeric. Any printable ASCII character is allowed. Left-justify and pad with spaces on the right.
            //TODO: check if contains extended characters, character codes 128 - 255.
        case 'AN':
            {
                if (!v)
                    v = '';
                var len = v.length;
                if (len < pRequiredLength) {
                    //Fill with spaces on the right.
                    var lenDif = pRequiredLength - len;
                    res = v;
                    for (var i = 0; i < lenDif; i++) {
                        res += ' ';
                    }
                }
                else if (len == pRequiredLength) {
                    res = v;
                }
                else if (len > pRequiredLength) {
                    alert('adoV4FormatField Error: Value is longer than required.');
                }
            }
            break;

            //as above but allows for the inclusion of extended characters, character codes 128 - 255.
        case 'AEN':
            {
                if (!v)
                    v = '';
                var len = v.length;
                if (len < pRequiredLength) {
                    //Fill with spaces on the right.
                    var lenDif = pRequiredLength - len;
                    res = v;
                    for (var i = 0; i < lenDif; i++) {
                        res += ' ';
                    }
                }
                else if (len == pRequiredLength) {
                    res = v;
                }
                else if (len > pRequiredLength) {
                    alert('adoV4FormatField Error: Value is longer than required.');
                }
            }
            break;

            /*
            Decimal amount. All decimal amount fields have implied decimal points two digits from the right.
            This field format is generally used for storing dollar amounts. Right-justify and zero fill on the left.
            */
        case 'D':
            {
                if (!v)
                    v = '0.0';
                if (isNaN(Number(v)))
                {
                    alert('adoV4FormatField Error: value is not a number.');
                }
                else {
                    v = parseFloat(v).toFixed(2).toString();
                    var len = v.length;
                    if (len < pRequiredLength) {
                        //Fill with zeros.
                        var lenDif = pRequiredLength - len;
                        for (var i = 0; i < lenDif; i++) {
                            res += '0';
                        }
                        res += v;
                    }
                    else if (len == pRequiredLength) {
                        res = v;
                    }
                    else if (len > pRequiredLength) {
                        alert('adoV4FormatField Error: Value is longer than required.');
                    }
                }

              }
            break;
        default:
            {
                alert("adoV4FormatField Error: Format Type is not correct.");
            }
    }
    return res;
}

//Returns an object with All formated fields;
function CDAV4GetFormatedValues()
{
    var jsonFromServer = '{"A01":"test3","A02":"25","A03":"46"}';
    var obj = JSON.parse(jsonFromServer);
    var objRes = {};
    objRes.A06 = CDAV4FormatField(obj.A06, 'D', 15);
    objRes.A02 = CDAV4FormatField(obj.A02, 'N', 12);
    objRes.A03 = CDAV4FormatField(obj.A03, 'D', 12);
    objRes.A04 = CDAV4FormatField(obj.A04, 'A', 12);

    return "OK";
}



