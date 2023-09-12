const swiper = () => {
  new Swiper('.album__slider', {
    slidesPerView: 1.5,
    loop: true,

    navigation: {
      nextEl: '.album__right',
      prevEl: '.album__left',
    },

    mousewheel: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      580: {
        slidesPerView: 1.5,
      },
    },
  });
};

export default swiper;
