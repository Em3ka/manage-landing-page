new Glide('.glide', {
  type: 'carousel',
  perView: 3,
  autoplay: 3000,
  animationDuration: 800,
  gap: 30,
  peek: { before: -120, after: -120 },
  breakpoints: {
    1110: {
      perView: 2,
      peek: 0,
    },

    870: {
      perView: 1,
      peek: 0,
    },
  },
}).mount();
