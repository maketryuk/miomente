/**
 * Magento
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@magentocommerce.com so we can send you a copy immediately.
 *
 * @copyright  Copyright (c) 2009 Phoenix Medien GmbH & Co. KG (http://www.phoenix-medien.de)
 */
Event.observe(window, 'load', function(){
    if (isCcApiEnabled != undefined && isCcApiEnabled) {
        payonePaymentWrap();
    }
})

function payonePaymentWrap() {
	payment.save = payment.save.wrap(function(origSaveMethod){
		if ($('p_method_payone_cc') && $('p_method_payone_cc').checked) {
			if (checkout.loadWaiting!=false) return;
			var validator = new Validation(this.form);

			if (this.validate() && validator.validate()) {
				checkout.setLoadWaiting('payment');

				var form = $('payment_form_'+payment.currentMethod);
				var elements = form.getElementsBySelector('input');
				for (var i=0; i<elements.length; i++) {
					if (elements[i].type == 'hidden') {
						switch (elements[i].name) {
							case 'payment[cc_owner]':
								elements[i].value = $(payment.currentMethod+'_cc_owner').value;
								break;
							case 'payment[cc_type]':
								elements[i].value = $(payment.currentMethod+'_cc_type').value;
								break;
							case 'payment[cc_number]':
								elements[i].value = $(payment.currentMethod+'_cc_number').value.substr(-4);
								break;
							case 'payment[cc_exp_month]':
								elements[i].value = $(payment.currentMethod+'_expiration').value;
								break;
							case 'payment[cc_exp_year]':
								elements[i].value = $(payment.currentMethod+'_expiration_yr').value;
								break;
						}
					}
				}
				payoneSwitchEditFields(payment.currentMethod, 'disable');
                application.getApplicationParams();
			}
		} else {
			origSaveMethod();
		}
	});
}
function payoneSwitchEditFields(method, mode)
{
	if ((typeof mode == 'undefined') || (mode == 'enable')) {
		$(method+'_edit_switch').style.display = 'none';
		mode = false;
	} else {
		$(method+'_edit_switch').style.display = '';
		mode = true;
	}

	var form = $('payment_form_'+payment.currentMethod);
	var elements = form.getElementsByClassName('no-submit');
	for (var i=0; i<elements.length; i++) elements[i].disabled = mode;
}

var payoneApplication = Class.create();
    payoneApplication.prototype = {
        initialize: function(initUrl){
            this.isError = false;
            this.error = '';
            this.initUrl = initUrl;
            this.data = {
                request : 'creditcardcheck',
                storecarddata : 'yes'
            }
            this.onSuccessGetParams = this.initApplication.bindAsEventListener(this);
            this.onCompleteGetParams = this.payoneCcSave.bindAsEventListener(this);
        },
        getApplicationParams: function()
        {
            var request = new Ajax.Request(
                this.initUrl,
                {
                    method:'post',
                    onComplete: this.onCompleteGetParams,
                    onSuccess: this.onSuccessGetParams,
                    onFailure: checkout.ajaxFailure.bind(checkout),
                    parameters: ''
                }
            );
        },
        initApplication: function(transport)
        {
            if (transport && transport.responseText){
                try{
                    response = eval('(' + transport.responseText + ')');
                }
                catch (e) {
                    response = {};
                }
            }
            this.data.mode = response.mode;
			this.data.mid = response.mid;
            this.data.aid = response.aid;
            this.data.portalid = response.portalid;
            this.data.language = response.language;
            this.data.encoding = response.encoding;
            this.data.hash = response.hash;
			this.data.cardholder = $(payment.currentMethod + '_cc_owner').value;
			this.data.cardpan = $(payment.currentMethod + '_cc_number').value;
			this.data.cardtype = getCardType($(payment.currentMethod + '_cc_type').value);
			this.data.cardexpiremonth = $(payment.currentMethod + '_expiration').value;
			this.data.cardexpireyear = $(payment.currentMethod + '_expiration_yr').value;
			this.data.cardcvc2 = $(payment.currentMethod + '_cc_cid').value;
        },
        payoneCcSave: function()
        {
            var request = new PayoneRequest(this.data, {
                return_type : 'object',
                callback_function_name : 'processPayoneResponse'
            });
            request.checkAndStore();            
        }
    }
function processPayoneResponse(response)
{
    
    if (response.get('status') == 'ERROR') {
    	alert(response.get('customermessage'));
        checkout.setLoadWaiting(false);
        payoneSwitchEditFields(payment.currentMethod, 'enable');
    } else {
        $('hidden_cc_additional_data').value = response.get('pseudocardpan');
        var request = new Ajax.Request(
            payment.saveUrl,
            {
                method:'post',
                onComplete: payment.onComplete,
                onSuccess: payment.onSave,
                onFailure: checkout.ajaxFailure.bind(checkout),
                parameters: Form.serialize(payment.form)
            }
        );
    }
}
function getCardType(cardtype){
	if(cardtype == "VI") return "V";
	else if(cardtype == "MC") return "M";
	else if(cardtype == "AE") return "A";
	else return "";
}
