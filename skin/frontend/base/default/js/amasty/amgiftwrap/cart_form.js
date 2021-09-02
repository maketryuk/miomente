/*
jQuery("document").ready(function () {
    var tag = jQuery(".cart");
    jQuery('html,body').animate({scrollTop: tag.offset().top - 16}, 'slow');

});
*/

function clearAmgiftwrapForm() {
    //document.getElementById('amgiftwrap_design_id').value = '';
    clearChecks('amgiftwrap_design_id');
    if (document.getElementById('amgiftwrap_separate_wrap') !== null) {
        document.getElementById('amgiftwrap_separate_wrap').checked = false;
    }
    submitAmgiftwrapForm();
}

function disableSeparateWrap() {
    if (document.getElementById('amgiftwrap_separate_wrap')) {
        document.getElementById('amgiftwrap_separate_wrap').checked = false;
    }
}

function clearChecks(radioName) {
    var radio = document.amgiftwrap_popup_form[radioName];
    for (x = 0; x < radio.length; x++) {
        document.amgiftwrap_popup_form[radioName][x].checked = false
    }
}


function submitAmgiftwrapForm() {

    try {
        // perform AJAX call on save
        jQuery.ajax({
            type: "POST",
            beforeSend: function () {
                jQuery('#amgiftwrap-loading').css("visibility", "visible");
            },
            url: amgiftwrap_save_form_data_url,
            data: jQuery('#amgiftwrap_popup_form').serialize()

        }).done(function (data) {

            //jQuery('#amgiftwrap-loading').css("visibility", "hidden");
            //jQuery('#amgiftwrap_popup_form_answer').html(data).fadeIn(500);
            if (amgiftwrap_only_button == '0') {
                //window.location.reload();
                jQuery('.the-cart-form').submit();
                //setTimeout('window.location.reload();', 500);
            } else {
                //jQuery.fancybox.close();
                if (typeof updateReview != undefined) {
                    updateReview();
                }
            }
        }).fail(function (error) {
            console.log(error);
            //jQueryQuery.fancybox.close();
        });
    } catch (err) {
    }


}
