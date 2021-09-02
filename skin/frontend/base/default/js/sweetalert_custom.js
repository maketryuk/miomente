/* Review accept terms */
function saveReview() {
    if (jQuery('#agreement-1').prop('checked')) {
        review.save();
    } else {
        sweetAlert('', 'Bitte akzeptieren Sie unsere Allgemeinen Geschäftsbedingungen', 'error');
    }
}
/* Review accept terms end */

/* Paypal Express Checkout */
function checkShippingSelected(){

    var accept_terms = "Bitte akzeptieren Sie unsere Allgemeinen Geschäftsbedingungen.";
    var chose_shipping = "Bitte wählen Sie eine Versandart.";

    if (!jQuery('#agreement-1').prop('checked') && !jQuery( "#shipping_method").val()) {
        sweetAlert('', chose_shipping + "\n\n" + accept_terms, 'error');
        document.getElementById('shipping_method').setAttribute("style", "border:1px solid #bf0926;width:250px");
        return false;
    }

    else if (!jQuery('#agreement-1').prop('checked')) {
        sweetAlert('', accept_terms, 'error');
        return false;
    }

    else if (!jQuery( "#shipping_method").val()) {
        sweetAlert('', chose_shipping, 'error');
        document.getElementById('shipping_method').setAttribute("style", "border:1px solid #bf0926;width:250px");
        return false;
    }
}
/* Paypal Express End */