const swiper = new Swiper('.swiper', {
  loop: true,
  slidesPerView: 1,
  keyboard: true,
  centeredSlides: true,
  observer: true,
  observeParents: true,
  watchOverflow: true,

  breakpoints: {
    // when window width is >= 1110px
    1110: {
      slidesPerView: 2.58,
      spaceBetween: 30,
    },
  },

  // autoplay: {
  //   delay: 5000,
  // },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

const resizeObserver = new ResizeObserver(() => {});

resizeObserver.observe(document.body);
