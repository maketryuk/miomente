jQuery(function () {
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
    if (window.matchMedia('(max-width: 991px)').matches) {
        jQuery('.nav-dropdown-wrapper').removeClass('with-border');
            // Nav Mobile //
        jQuery('.nav__trigger').click(function () {
            jQuery(this).toggleClass('active');
            jQuery(this).next('.nav-dropdown').slideToggle(300);
        });
        jQuery('.nav-sub__trigger').click(function () {
            jQuery(this).toggleClass('active');
            jQuery(this).next('.nav-dropdown-list').slideToggle(300);
      });
    } else {
    // Nav Desktop //
        jQuery('.nav__trigger').mouseover(function () {
            jQuery(this).addClass('active');
        });
        jQuery('.nav-item').mouseleave(function () {
            jQuery(this).children('.nav__trigger').removeClass('active');
        });
    }
})