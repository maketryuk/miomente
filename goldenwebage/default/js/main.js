jQuery(function () {

    // Video //
    jQuery('.video-thumb').click(function () {
      jQuery(this).css('display', 'none')
      jQuery(this).next('.video').css('display', 'block');
      jQuery(this).next('.video').children('iframe')[0].src += '&autoplay=1';
    })

    // Elected List //
    jQuery('.elected').click(function () {
      jQuery(this).attr('tabindex', 1).focus();
      jQuery(this).toggleClass('active');
      jQuery(this).find('.elected-menu').slideToggle(300);
    });
    jQuery('.elected').focusout(function () {
      jQuery(this).removeClass('active');
      jQuery(this).find('.elected-menu').slideUp(300);
    });
    jQuery('.elected .elected-menu li').click(function () {
      jQuery(this).parents('.elected').find('span').text( jQuery(this).text());
      jQuery(this).parents('.elected').find('input').attr('value',  jQuery(this).attr('id'));
    });

    jQuery('.online-trigger').click(function () {
      jQuery(this).addClass('active');
      jQuery('.online-item').addClass('active');
      jQuery('.local-item').removeClass('active');
      jQuery('.local-trigger').removeClass('active');
      jQuery('.all-trigger').removeClass('active');
    })

    jQuery('.local-trigger').click(function () {
      jQuery(this).addClass('active');
      jQuery('.local-item').addClass('active');
      jQuery('.online-item').removeClass('active');
      jQuery('.online-trigger').removeClass('active')
      jQuery('.all-trigger').removeClass('active');
    })

    jQuery('.all-trigger').click(function () {
      jQuery(this).addClass('active');
      jQuery('.online-item').addClass('active');
      jQuery('.local-item').addClass('active');
      jQuery('.online-trigger').removeClass('active')
      jQuery('.local-trigger').removeClass('active');
    })

    // Show-more //
    jQuery('.show-more button').click(function () {
      jQuery(this).parent().prev('.show-item').toggleClass('show');
      jQuery(this).toggleClass('show');
      if (jQuery(this).parent().prev('.show-item').hasClass('show')) {
        jQuery(this).text('Weniger anzeigen');
      } else {
        jQuery(this).text('Mehr anzeigen');
      }
    });

    jQuery('.show-more span').click(function () {
      jQuery(this).toggleClass('show');
      jQuery(this).parent().parent().children('.show-item').toggleClass('show');
      if (jQuery(this).hasClass('show')) {
        jQuery(this).text('Weniger anzeigen');
      } else {
        jQuery(this).text('Mehr anzeigen');
      }
    })

    // Search Cities //
    var search = '',
    total = 0;
    
    jQuery('.hero .i-search').on('keyup',function(e){
      search = jQuery(this).val();
      total = 0;
      jQuery('.result-list li a').each(function(){
        var value = jQuery(this).text().toLowerCase();
        if( value.indexOf(search.toLowerCase()) == 0 ){
          total++;
          jQuery(this).parent().removeClass('hide');
        } else {
          jQuery(this).parent().addClass('hide');
        }
      });
      if( total>0 ) jQuery('.result__error').hide(); else jQuery('.result__error').show();
    });

    // Search //
    jQuery('.search__trigger').click(function () {
      jQuery('.header-main .search-wrapper').addClass('active');
      jQuery('.overlay').addClass('active');
    });
    jQuery('.search-close').click(function () {
      jQuery('.header-main .search-wrapper').removeClass('active');
      jQuery('.overlay').removeClass('active');
    });

    // Burger //
    jQuery('.burger-wrapper').click(function () {
      jQuery('.burger-wrapper').toggleClass('active');
      jQuery('.nav').toggleClass('active');
      jQuery('body').toggleClass('lock');
    });

    jQuery('.nav-header .burger-wrapper').click(function () {
      jQuery('.nav__trigger').removeClass('active');
      jQuery('.nav-sub__trigger').removeClass('active');
      jQuery('.nav-dropdown-list').slideUp(300);
      jQuery('.nav-dropdown').slideUp(300);
    })

    // Overlay //
    jQuery('.overlay').click(function () {
      jQuery(this).removeClass('active');
      jQuery('.header-main .search-wrapper').removeClass('active');
    });

    jQuery('.reviews-table').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      arrows: false,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            dots: true,
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
          }
        }
      ]
    });

    jQuery('.slide__trigger').click(function () {
      jQuery(this).toggleClass('active');
      jQuery(this).next('.slide-list').slideToggle(300);
    });
  
  if (window.matchMedia('(max-width: 991px)').matches) {

    const sellerSlider = new Swiper('.seller-slider', {
      slidesPerView: 'auto',
      freeMode: true,
      scrollbar: {
        el: ".seller-scrollbar",
        hide: false,
      },
    })

    jQuery('.slick-dots li button').text('');

    // Change Text //
    jQuery('.header-top .giftbox span').text('Geschenkbox');
    jQuery('.header-top .printer span').text('Gleich ausdrucken');
    jQuery('.header-top .contact h5').text('Kontakt zu Miomente');
    jQuery('.header-top .calendar span').text('Jahre gültig');
    jQuery('.safe-item .calendar span').text('Gutschein 3 Jahre gültig');
    jQuery('.cities .dropdown__trigger').text('Die Miomente Städte');
    jQuery('.hotel h2').text('Alle Events beidir zu Hause');

    // Remove class //
    jQuery('.nav-dropdown-wrapper').removeClass('with-border');

    jQuery('.categories-card .dropdown__trigger').click(function () {
      jQuery(this).toggleClass('active');
      jQuery(this).parent().next('.dropdown-list').slideToggle(300);
    });

    // Dropdown Mobile //
    jQuery('.dropdown__trigger').click(function () {
      jQuery(this).toggleClass('active');
      jQuery(this).parent().next().next('.dropdown-list').slideToggle(300);
      jQuery(this).next().next('.dropdown-list').slideToggle(300);
      jQuery(this).next('.dropdown-list').slideToggle(300);
    });

    // Nav Mobile //
    jQuery('.nav__trigger').click(function () {
      jQuery(this).toggleClass('active');
      jQuery(this).next('.nav-dropdown').slideToggle(300);
    });
    jQuery('.nav-sub__trigger').click(function () {
      jQuery(this).toggleClass('active');
      jQuery(this).next('.nav-dropdown-list').slideToggle(300);
    });

    // Hero Mobile //
    jQuery('.hero__trigger').click(function () {
      jQuery(this).toggleClass('active');
      jQuery(this).parent().next('.hero-dropdown').toggleClass('active');
    });

  } else {

    // Dropdown Desktop //
    jQuery('.dropdown__trigger').mouseover(function () {
      jQuery(this).addClass('active');
      jQuery(this).next('.dropdown-list').addClass('active');
    });
    jQuery('.dropdown-list').mouseleave(function () {
      jQuery(this).removeClass('active');
      jQuery(this).prev('.dropdown__trigger').removeClass('active');
    });

    // Hero Desktop //
    jQuery('.hero__trigger').mouseover(function () {
      jQuery(this).addClass('active');
      jQuery(this).parent().next('.hero-dropdown').addClass('active');
    });
    jQuery('.hero-dropdown').mouseleave(function () {
      jQuery(this).removeClass('active');
      jQuery('.hero__trigger').removeClass('active');
    });

    // Hero Dropdown Close on click outside//
    jQuery(document).click( function(event){
      if ( !jQuery(event.target).closest('.hero-dropdown.active').length ) {
        jQuery('.hero-dropdown').removeClass('active');
        jQuery('.hero__trigger').removeClass('active');
      }
    });

    // Nav Desktop //
    jQuery('.nav__trigger').mouseover(function () {
      jQuery(this).addClass('active');
    });
    jQuery('.nav-item').mouseleave(function () {
      jQuery(this).children('.nav__trigger').removeClass('active');
    });

    // Change Text //
    jQuery('.header-top .giftbox span').text('Wunderschöne Geschenkbox');
    jQuery('.header-top .printer span').text('Sofort selbst ausdrucken');
    jQuery('.header-top .calendar span').text('Gutschein 3 Jahre gültig');
    jQuery('.safe-item .calendar span').text('3 Jahre gültig');
    jQuery('.contact h5').text('Kundenservice');
    jQuery('.cities .dropdown__trigger').text('Die Moment Städte');
    jQuery('.hotel h2').text('Genussreisen bei Dir zuhause')
  };
})