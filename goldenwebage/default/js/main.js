jQuery(function () {

    jQuery(".tab__trigger").click(function() {
      jQuery(".tab__trigger").removeClass("active").eq(jQuery(this).index()).addClass("active");
      jQuery(".tab-list").removeClass('active').eq(jQuery(this).index()).addClass('active');
    }).eq(0).addClass("active");

    // Show-more //
    jQuery('.show-more button').click(function () {
      jQuery(this).parent().prev('.show-item').toggleClass('show');
      jQuery(this).toggleClass('show');
      if (jQuery(this).parent().prev('.show-item').hasClass('show')) {
        jQuery(this).text('Zeige weniger');
      } else {
        jQuery(this).text('Mehr anzeigen');
      }
    });

    jQuery('.show-more button').click(function () {
      if (jQuery(this).parent().parent().children('.tab-list').hasClass('active')) {
        jQuery('.tab-list.active').children('.show-item').toggleClass('show')
      } else {
        jQuery('.tab-list.active').chilren('.show-item').removeClass('show')
      }
    });

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

    // Scroll let's
    let scrollUpBtn = document.querySelector('.scroll-up')
    let scrollDownBtn = document.querySelector('.scroll-down')
    let categories = document.querySelector('.categories')

    // Scroll
    // scrollUpBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth'});
    // scrollDownBtn.onclick = () => categories.scrollIntoView({behavior: 'smooth'});

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

    // Remove class //
    jQuery('.nav-dropdown-wrapper').removeClass('with-border');

    // Dropdown Mobile //
    jQuery('.dropdown__trigger').click(function () {
      jQuery(this).toggleClass('active');
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
  };
})