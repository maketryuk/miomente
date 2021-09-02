$j(document).ready(function() {

    //check browser version - display overlay if < IE8
    /*if ($j.browser.msie && +$j.browser.version < 8) {
        var trigger = $j("#overlay");
        
        trigger.overlay({
                fixed: true,
                mask: {
                    color: "#000",
                    opacity: .4
                },
                onBeforeLoad: function() {
                    var overlay = this.getOverlay();
                    
                    $j('#overlay').addClass('browser-support');
                    
                    overlay.append('<div class="contentWrap"><div class="std">'
                        + '<h1>Entschuldigung, Ihr Browser wird leider nicht mehr unterstützt.</h1>'
                        + '<p>Bitte beachten Sie unsere Mindestanforderungen:</p>'
                        + '<ul><li>Safari 10+</li><li>Mozilla Firefox 3.6+</li><li>Opera 10+</li><li>Internet Explorer 8+</li><li>Google Chrome 12+</li></ul>'
                        + '</div></div>');                  
                },
                onClose: function() {
                    $j('#overlay').removeClass('browser-support');
                },
                load: true
            });       
    }*/

    $j(".mwst>a").click(function() {
        if ($j("#product-mwst-box").is(':hidden')) {
            $j("#product-mwst-box").show();
            $j("body").click(function() {
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
            var sum = price * qty;

            total = sum + total;

            $j(this).find(".price-sum .price").html(
                    priceFormat.replace("0", sum.toFixed(0))
                    );
        });

        $j("#shopping-cart-totals-table .price").html(
                priceFormat.replace("0", total.toFixed(0))
                );
    });

    $j("#cart-page button").click(function() {
        $j('#cart-submit').addClass('disabled');
        $j('#cart-submit').css('opacity', '.5');
        $j('#cart-submit button').attr('disabled', true);
        $j('#cart-please-wait').show();

        var data = {};
        var items = $j("#cart-page form").serializeArray();
        $j.each(items, function(i, item) {
            data[item['name']] = item['value'];
        });

        $j.post($j("#cart-page form").attr('action'), data, function() {
            window.location = checkoutUrl;
        })
    });

    // Navigation
    $j("#m-c-nav .first").hover(function() {
        $j(this).addClass('active').find('.ul').show();
    }, function() {
        $j(this).removeClass('active').find('.ul').hide();
    });

    // switch product order details
    $j('.p-i-o-d-switch').click(function(event) {
        event.preventDefault();

        var curBox = $j(this).next('.p-i-o-d-box');

        if (curBox.is(':hidden')) {
            $j('.p-i-o-d-switch').next('.p-i-o-d-box').hide();
        }
        curBox.toggle();
    });
    $j('.p-i-o-d-switch img, .p-i-o-request img').mouseenter(function() {
        $j(this).next('.p-i-o-d-s-overlay').show();
    }).mouseleave(function() {
        $j('.p-i-o-d-s-overlay').hide();
    });

    $j('#m-c-nav ul .cart a').mouseenter(function() {
        $j(this).children('.m-c-n-c-overlay').show();
    }).mouseleave(function() {
        $j('.m-c-n-c-overlay').hide();
    });

    $j('.arrow.down').click(function(event) {
        $j(this).parent().find('.hidden').toggle();
    });

/*
    $j('#slider-nav .arrow.left, .slider-nav-opener').click(function(event) {
        event.preventDefault();
        var nav = $j('#slider-nav');

        if ($j(nav).not(':animated').length) {
            if ($j(nav).css('right') === '0px') {
                $j(nav).animate({
                    right: -170
                }, 1000);
            } else {
                $j(nav).animate({
                    right: 0
                }, 1000);
            }
        }
    });
*/
    // Event person overlay
    $j("#product-event-person-link>a").overlay({
        mask: {
            color: '#000',
            loadSpeed: 200,
            opacity: 0.8,
            top: '10%'
        },
        closeOnClick: true,
        onBeforeLoad: function() {
            var overlay = this.getOverlay();

            initOverlay(overlay);

            // grab wrapper element inside content           
            var wrap = overlay.find(".contentWrap");

            var person = $j("#product-event-person").clone(true);

            person.show();

            wrap.append(person);

            function initOverlay(overlay) {
                var close = $j('#overlay a.close').clone(true);
                overlay.empty();

                $j(close).appendTo(overlay);
                overlay.append('<div class="contentWrap"></div>');

                $j('#overlay').addClass('product-event-person');
            }
        },
        onClose: function() {
            $j('#overlay').removeClass('product-event-person');
        }
    });

    $j('.images a[rel]').overlay({
        mask: {
            color: '#000',
            loadSpeed: 200,
            opacity: 0.8
        },
        closeOnClick: true,
        onBeforeLoad: function() {
            var overlay = this.getOverlay();

            initOverlay(overlay);

            // grab wrapper element inside content           
            var wrap = overlay.find(".contentWrap");

            var images = getImages(this.getTrigger());

            var scrollHtml = getScrollerHtml(images);

            $j(wrap).append(scrollHtml);

            initScroller();

            function initOverlay(overlay) {
                var close = $j('#overlay a.close').clone(true);
                overlay.empty();

                $j(close).appendTo(overlay);
                overlay.append('<div class="contentWrap"></div><div class="arrow left"></div><div class="arrow right"></div>');

                $j('#overlay .arrow.left').click(function() {
                    $j(this).parent().find('.scroll').data("scrollable").prev();
                });

                $j('#overlay .arrow.right').click(function() {
                    $j(this).parent().find('.scroll').data("scrollable").next();
                });
            }

            function getImages(trigger) {
                var curImageUrl = $j(trigger).attr('href');
                var images = $j(trigger).parents('.images').find('a');

                // start at clicked image
                var curImageIndex = 0;
                $j.each(images, function(index, value) {
                    if ($j(value).attr('href') == curImageUrl) {
                        curImageIndex = index;
                        return false;
                    }
                });

                var first = images.slice(curImageIndex, (images.length));
                var last = images.slice(0, curImageIndex);
                images = $j.merge(first, last);

                return images;
            }

            function getScrollerHtml(images) {
                var html = '<div class="scroll"><div class="pics">';

                $j.each(images, function(index, value) {
                    html += '<div style="background-image:url(' + $j(value).attr('href') + ')"></div>';
                });

                html += '</div></div>';

                return html;
            }

            function initScroller() {
                $j(".scroll").scrollable({
                    circular: true
                });
            }
        }
    });

    // Image overlay
    $j("a.image[rel]").overlay({
        mask: {
            color: '#000',
            loadSpeed: 200,
            opacity: 0.8
        },
        closeOnClick: true,
        onBeforeLoad: function() {
            var overlay = this.getOverlay();

            initOverlay(overlay);

            // grab wrapper element inside content           
            var wrap = overlay.find(".contentWrap");
            var img = "<img src='" + this.getTrigger().attr("href") + "'/>"

            wrap.append(img);

            function initOverlay(overlay) {
                var close = $j('#overlay a.close').clone(true);
                overlay.empty();

                $j(close).appendTo(overlay);
                overlay.append('<div class="contentWrap"></div>');
            }
        }
    });
    $j('a.image').mouseover(function() {
        $j(this).find('.magnifier').stop().animate({"width": "40px"}, 400, 'swing');
    }).mouseout(function() {
        $j(this).find('.magnifier').stop().animate({"width": "20px"}, 200, 'swing');
    });
});