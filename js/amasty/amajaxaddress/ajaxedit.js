/**
 * @author Amasty Team
 * @copyright Copyright (c) Amasty (http://www.amasty.com)
 * @package Amasty_Ajaxaddress
 */
function ameditAddress(url, type)
{
    orderId  = document.getElementsByName('order_id')[0].value;
    postData = 'form_key=' + FORM_KEY + '&order_id=' + orderId + '&type=' + type;
    
    new Ajax.Request(url, {
        method: 'post',
        postBody : postData,
        onSuccess: function(transport) {
            $('amajaxaddress_info_wrapper').innerHTML = transport.responseText;
        }
    });
}

function amsaveAddress(url, type)
{
    new Ajax.Request(url, {
        method: 'post',
        postBody : ampostPrepare(type),
        onSuccess: function(transport) {
            $('amajaxaddress_info_wrapper').innerHTML = transport.responseText;
        }
    });
}

function amcountryChange(url, type) // this url is the same as for edit address, but has forcesave param.
{
    new Ajax.Request(url, {
        method: 'post',
        postBody : ampostPrepare(type),
        onSuccess: function(transport) {
            $('amajaxaddress_info_wrapper').innerHTML = transport.responseText;
        }
    });
}

function ampostPrepare(type)
{
    orderId  = document.getElementsByName('order_id')[0].value;
    postData = 'form_key=' + FORM_KEY + '&order_id=' + orderId + '&type=' + type;
    
    $$('[id^=amajaxadress_field]').each(function(elem) {
        postData += '&' + elem.name + '=' + encodeURIComponent(elem.value);
    });

    return postData;
}