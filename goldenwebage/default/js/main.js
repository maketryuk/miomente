jQuery(function () {

    // Scroll let's
    let scrollUpBtn = document.querySelector('.scroll-up')
    let scrollDownBtn = document.querySelector('.scroll-down')
    let categories = document.querySelector('.categories')

    // Scroll
    scrollUpBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth'});
    scrollDownBtn.onclick = () => categories.scrollIntoView({behavior: 'smooth'});

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

    jQuery('.slick-dots li button').text('');
    
  if (window.matchMedia('(max-width: 991px)').matches) {
    // Add data-simplebar for Seller Table //
    jQuery('.seller-table').data('data-simplebar', '').attr('data-simplebar', '');

    // Change Text //
    jQuery('.giftbox span').text('Geschenkbox');
    jQuery('.printer span').text('Gleich ausdrucken');
    jQuery('.contact h5').text('Kontakt zu Miomente');
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
      jQuery(this).next('.hero-dropdown').toggleClass('active');
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
      jQuery(this).next('.hero-dropdown').addClass('active');
    });
    jQuery('.hero-dropdown').mouseleave(function () {
      jQuery(this).removeClass('active');
      jQuery(this).prev('.hero__trigger').removeClass('active');
    });

    // Nav Desktop //
    jQuery('.nav__trigger').mouseover(function () {
      jQuery(this).addClass('active');
    });
    jQuery('.nav-item').mouseleave(function () {
      jQuery(this).children('.nav__trigger').removeClass('active');
    });

    // Change Text //
    jQuery('.giftbox span').text('Wunderschöne Geschenkbox');
    jQuery('.printer span').text('Sofort selbst ausdrucken');
    jQuery('.safe-item .calendar span').text('3 Jahre gültig');
    jQuery('.contact h5').text('Kundenservice');
    jQuery('.cities .dropdown__trigger').text('Die Moment Städte');
  };
})