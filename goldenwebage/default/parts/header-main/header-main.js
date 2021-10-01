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