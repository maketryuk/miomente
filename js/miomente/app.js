$j(document).ready(function() {

    $j.get(BASE_URL + STORE_CODE + '/ajax/cart/cartItemsCount', function(data) {
        var cartItemsCount = eval(data);
        
        if(cartItemsCount > 0) {
            var html = '<span>' + cartItemsCount + '</span>'
            + '<div class="m-c-n-c-overlay" style="display:none;">';
                    
            if(cartItemsCount == 1) {
                html += 'In Ihrem Warenkorb befindet sich <strong>1 Artikel</strong>.'
            } else {
                html += 'In Ihrem Warenkorb befinden sich <strong>' + cartItemsCount + ' Artikel</strong>.'
            }
                        
            html += '</div>';
             
            $j('#m-c-nav .cart a').html(html);
        }                
    });
        
        
    // search events calendar
    var dates = null;
    var uniqId = 0;
    // it's for fix with double fired events
    var isRedirecting = false;
    
    $j.get(BASE_URL + STORE_CODE + '/ajax/dates/', function(data) {
        try{
            dates = eval(data);
        } catch(ex) {}
        
        $j('#search-calendar').datepicker({
            onSelect: function(dateText, inst) {
                var url = BASE_URL + STORE_CODE + '/catalogsearch/advanced/result/?dates[]=';
                if (isRedirecting == false) {
                    window.location.href = url + dateText;
                }
                return false;
            },
            dateFormat: 'yy-mm-dd',
            beforeShowDay: highlightDays
        });
        dispDate = $j('#calendar-display-date').html();       

        if (dispDate && dispDate.length == 10) {
            $j('#search-calendar').datepicker('setDate', dispDate);
        }
    });

    $j('#simple_product_dates').datepicker({
        onSelect: function(dateText, inst) {
            return false;
        },
        dateFormat: 'yy-mm-dd'
    });

    function highlightDays(date) {
        if (dates) {
            for (var i = 0; i < dates.length; i++) {                
                if (eval(dates[i]['date']) - date == 0) {
                    uniqId = uniqId + 1;
                    var dateClass = 'date-' + uniqId;
                    $j(document).on('mouseenter', '.' + dateClass, function (event) {
                        openPopup(dates[i], $j(this));
                    });
                    $j(document).on('mouseleave', '.' + dateClass, function (event) {
                        closePopup(dates[i], $j(this));
                    });
                    $j(document).on('click, mousedown', '.' + dateClass + ' dl a', function (event) {
                        if (isRedirecting == false) {
                            window.location.href = $j(this).attr('href');
                            isRedirecting = true;
                        }
                        return true;
                    });
                   
                    return [true, 'ui-state-active ' + dateClass];
                }
            }
            return [true, ''];
        }
        return [true, ''];
    }

    function openPopup(data, handler)
    {
        var popupCode = '<div class="cal-popup">' +
        '<div class="overall">' + 
        '<div class="header">' + data['dateText'] + '</div>' +
        '<div class="pop-body"><dl>';
       
        for (var i = 0; i < data['events'].length; i++) {
            popupCode = popupCode + 
            '<dt><a href="' + data['events'][i]['url'] + '">' + data['events'][i]['name'] + '</a></dt>' +
            '<dd>' + data['events'][i]['desc'] + '</dd>';
        }
        popupCode = popupCode + '</dl></div></div></div>';
        handler.append(popupCode);
        return true;
    }

    function closePopup(events, handler)
    {
        handler.find('.cal-popup').remove();
    }

    $j("div.carousel").carousel({
        animSpeed: "slow",
        nextBtn: "<span>►</span>",
        prevBtn: "<span>◄</span>",
        autoSlide: true,
        autoSlideInterval: 4000,
        delayAutoSlide: 4000
    });

    // clearing inputs after focus
    $j("#h-s-query, #h-n-email").focus(function () {
        $j(this).val('');
    });

    $j("#h-n-submit").hover(function () {
        $j(this).addClass('submit-hover');
    }, function () {
        $j(this).removeClass('submit-hover');
    });

    $j("#product-event-person").dialog({
        autoOpen: false,
        width: 485,
        dialogClass: 'event-person-dialog',
        modal: true,
        show: 'fade',
        hide: 'fade',
        open: function () {
            $j("#product-event-person").dialog('widget').position({
                my: "left",
                at: "left",
                of: $j(this),
                offset: "-20 0"
            });
            $j('#overlay, #product-event-person').show();
            $j('#overlay').click(function () {
                $j('#product-event-person').dialog('close');
            })
        }, 
        close: function () {
            $j('#overlay, #product-event-person').hide();
        }
    });
    $j("#product-event-person-link>a").click(function () {
        $j("#product-event-person").dialog('open');
        return false;
    });

    $j("#product-social>a").click(function () {
        if ($j("#product-social-box").is(':hidden')) {
            $j("#product-social-box").show();
            $j("body").click(function(){
                $j("#product-social-box").hide();
            });
        } else {
            $j("#product-social-box").hide();
        }
        return false;
    });

    $j(".mwst>a").click(function () {
        if ($j("#product-mwst-box").is(':hidden')) {
            $j("#product-mwst-box").show();
            $j("body").click(function(){
                $j("#product-mwst-box").hide();
            });
        } else {
            $j("#product-mwst-box").hide();
        }
        return false;
    });

    $j("#cart-items input").bind('change keyup', function() {
        var total = 0; 
        $j("#cart-items .item").each(function() {
            var qty = $j(this).find(".qty").val();
            var price = parseInt($j(this).find(".item-price .purePrice").val());
            var sum = price*qty;

            total = sum+total;

            $j(this).find(".price-sum .price").html(
                priceFormat.replace("0", sum.toFixed(0))
                );
        });

        $j("#shopping-cart-totals-table .price").html(
            priceFormat.replace("0", total.toFixed(0))
            );
    });

    $j("#cart-page button").click(function () {
        $j('#cart-submit').addClass('disabled');
        $j('#cart-submit').css('opacity', '.5');
        $j('#cart-submit button').attr('disabled', true);
        $j('#cart-please-wait').show();

        var data = {};
        var items = $j("#cart-page form").serializeArray();
        $j.each(items, function(i,item) {
            data[item['name']]=item['value'];
        });

        $j.post($j("#cart-page form").attr('action'), data, function () {
            window.location = checkoutUrl;
        })
    });

    $j('#product-comments-link').click(function() {
        $j('#product-comments-dialog').load(BASE_URL + STORE_CODE + '/ajax/review/list/id/'+productId+'/').dialog(
        {
            width: 600, 
            height: 300, 
            dialogClass: 'comments-dialog', 
            open: function () {
                $j('#overlay, #product-comments-dialog').show();
                $j('#overlay').click(function () {
                    $j('#product-comments-dialog').dialog('close');
                })
            }, 
            close: function () {
                $j('#overlay, #product-comments-dialog').hide();
            }, 
            closeText: CLOSE
        }
        );
        return false;
    });
    $j('#product-social-box .email a').click(function() {
        $j('#product-email-box').load(BASE_URL + STORE_CODE + '/ajax/sendfriend/index/id/'+productId+'/').dialog(
        {
            width: 370, 
            height: 500, 
            dialogClass: 'sendfriend-dialog', 
            open: function () {
                $j('#overlay, #product-email-box').show();
                $j('#overlay').click(function () {
                    $j('#product-email-box').dialog('close');
                })
            }, 
            close: function () {
                $j('#overlay, #product-email-box').hide();
            }, 
            closeText: CLOSE
        }
        );
        return false;
    });
    $j('#categories-list .item').hover(function () {
        $j(this).addClass('hover');
    }, function () {
        $j(this).removeClass('hover');
    });
    $j("#m-c-nav .first").hover(function () {
        $j(this).addClass('active').find('ul').show();
    }, function () {
        $j(this).removeClass('active').find('ul').hide();
    });
    $j('#select-store').msDropDown();
    $j('.ddChild a').click(function () {
        var elements = $j(this).attr('id').split('_');
        var n = elements[elements.length-1];

        location.href = $j('#select-store option:eq(' + n + ')').attr('value');

        return false;
    });
    
    $j('.business-momente-contact').click(function() {
        $j('#m-c-c-kontakt').dialog(
        {
            width: 655, 
            height: 708, 
            dialogClass: 'contact-dialog', 
            open: function () {
                $j('#overlay').show();
                $j('#overlay').click(function () {
                    $j('.business-momente-contact').dialog('close');
                });
                
                $j('.ui-dialog-titlebar-close').appendTo('.ui-dialog-content')
            }, 
            close: function () {
                $j('#overlay').hide();
            }, 
            closeText: 'X'
        }
        );
        return false;
    });
    // on messages i.e. on captcha error, open dialog again.
    if($j('.category-business-momente #m-c-c-kontakt ul.messages').length > 0) {
        $j('.business-momente-contact').trigger('click');
    }
    
    // switch product order details
    $j('.p-i-o-d-switch').click(function(event) {
        event.preventDefault();

        var curBox = $j(this).next('.p-i-o-d-box');
        
        /*if(curBox.is(':hidden')) {
            $j('.p-i-o-d-switch').next('.p-i-o-d-box').hide();
        }*/
        /*curBox.toggle();*/
    });    
    $j('.p-i-o-d-switch img, .p-i-o-request img').mouseenter(function(){                
        $j(this).next('.p-i-o-d-s-overlay').show();
    }).mouseleave(function(){
        $j('.p-i-o-d-s-overlay').hide();
    });
    
    $j('img.info1').mouseenter(function(){                
        $j(this).next('.info-overlay1').show();
    }).mouseleave(function(){
        $j('.info-overlay1').hide();
    });
    
    $j('img.info2').mouseenter(function(){                
        $j(this).next('.info-overlay2').show();
    }).mouseleave(function(){
        $j('.info-overlay2').hide();
    });
    
    $j('#m-c-nav ul .cart a').mouseenter(function(){                
        $j(this).children('.m-c-n-c-overlay').show();
    }).mouseleave(function(){
        $j('.m-c-n-c-overlay').hide();
    });
    
    // switch advanced search box
    $j('#advanced-search-list a').click(function(event) {        
        event.preventDefault();
        var curBox = $j(this).next('ul');
        
        $j(this).toggleClass('opend');
        curBox.toggle();
    }); 
    
    $j('#advanced-search-list .checkbox').click(function(event) { 
        event.preventDefault();
        var curInput = $j(this).next('input');

        if(curInput.attr('checked')) {
            $j(curInput).attr('checked', false);            
        } else {
            var checkBoxes = $j(this).parent().parent().find('.single.checked');
            $j(checkBoxes).removeClass('checked');
            $j(curInput).attr('checked', true);            
        }
        
        $j(this).toggleClass('checked');        
    }); 
    
    $j('dl.collapsible dt').click(function(event) {        
        event.preventDefault();
        var curDD = $j(this).next('dd');
       
        $j(this).toggleClass('open');
        curDD.toggle();
    }); 
    
    $j('#why-miomente .aside-box-wrapper').hover(function() {
        $j(this).find('li').addClass('hover');
        $j(this).animate({
            left: -7,
            top: -3,
            width: 150,
            height: 74
        });
    }, function() {
        $j(this).find('li:first').animate({
            marginTop: -3,
            marginLeft: -7
        }, 'fast', 'linear', function() {
            $j(this).parent().children('li').removeClass('hover');
            $j(this).parent().children('li').removeAttr('style');
        });

        $j(this).animate({
            left: 0,
            top: 0,
            width: 137,
            height: 67
        });
    });     
       
    $j('#why-miomente li').hover(function() {
        if($j(this).hasClass('current')) {
            $j(this).removeClass('current');
            $j(this).stop(true, true).delay(2000);
        }     
        $j(this).animate({
            marginLeft: -($j(this).children('.prev').outerWidth())
        });
    }, function() {
        $j(this).stop(true, true);
    });   
    $j('#why-miomente li').click(function() {         
        $j(this).next().addClass('current');
        $j(this).parent().animate({
            marginTop: -($j(this).outerHeight())
        }, 'slow', 'linear', function() {       
            $j(this).children(':first').removeAttr('style');
            $j(this).children(':first').appendTo($j(this)); 
            $j(this).css('margin-top', '0');
        });   
    });   
    
    setInterval(function() {
        if(!$j('#why-miomente .aside-box-wrapper').is(':hover')) {
            $j('#why-miomente li:first').trigger('click');
            $j('#why-miomente li').removeClass('current');
        }               
    }, 5000);
    
    $j('#categories-list .description').hover(
        function(){
            var hDelta = $j(this).height()/100*10;
            var wDelta = $j(this).width()/100*10;
            
            $j(this).addClass('hover');
            $j(this).animate({
                width: $j(this).width() + wDelta,
                height: $j(this).height() + hDelta,
                marginLeft: -(wDelta/2)
            }, {
                duration:100, 
                queue: false
            });         
            
            $j(this).find('*').each(function() {
                $j(this).animate({
                    width: $j(this).width() /100*110,
                    height: $j(this).height() /100*110,
                    fontSize:  parseInt($j(this).css('fontSize'))/100*110
                }, {
                    duration:100, 
                    queue: false
                });
            });                       
        }, function() {
            $j(this).stop(true, true);
            $j(this).removeAttr('style');
            $j(this).find('*').each(function() {
                $j(this).stop(true, true);
                $j(this).removeAttr('style');
            });
            $j(this).removeClass('hover');
        }        
        );
        
    $j('.aside-box.miomente-label ul').hover(function() { 
        if(!$j('.aside-box.miomente-label li:animated').length) {
            $j('.aside-box.miomente-label .pulldown').hide();

            $j('.aside-box.miomente-label li:not(:first)').animate({
                marginTop: -66
            });
        }
    }, function() {
        $j('.aside-box.miomente-label li:not(:first)').animate({
            marginTop: -160
        }, 400, function() {
            $j('.aside-box.miomente-label .pulldown').show();
        });        
    }); 
    $j('.aside-box.miomente-label .pulldown').click(function() {    
       $j('.aside-box.miomente-label ul').trigger('mouseenter');
    });   
    
});