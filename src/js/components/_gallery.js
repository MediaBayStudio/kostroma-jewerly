;(function() {
  let galleryPopup = new SimplePopup({
    popup: '.gallery-popup',
    openBtn: '.gallery-slider__img-wrap',
    closeBtn: '.gallery-popup__close',
    overlay: '.overlay',
    popupAnimation: 'fadeOut 0.5s',
    overlayAnimation: 'fadeOut 0.5s',
    popupAnimationName: 'fadeOut',
    overlayAnimationName: 'fadeOut'
  }),
    galleryThumbs = document.querySelectorAll('.gallery-slider__img-wrap'),
    galleryThumbsImg = document.querySelectorAll('.gallery-slider__img')
    gallerySlider = document.querySelector('.gallery-popup-slider');


  galleryPopup.addEventListener('beforeopen', function() {
    let initialSlide;
    
    for (let i = 0; i < galleryThumbsImg.length; i++) {
      if (!gallerySlider.classList.contains('slick-slider')) {
        
        let str = `<figure class="gallery-popup-slider__slide-wrap"><div class="loader-bg"><div class="loader"></div></div><img src="${galleryThumbsImg[i].dataset.big}" alt="#" class="gallery-popup-slider__slide"></figure>`;

        gallerySlider.insertAdjacentHTML('beforeend', str);
      }

      if (this.caller === galleryThumbs[i]) {
        initialSlide = i;
      }
    }
    if (!gallerySlider.classList.contains('slick-slider')) {
      buildGallerySlider();
    }
    $('.gallery-popup-slider').slick('slickGoTo', initialSlide, true);
  });
})();

// сделать затемнение соседних слайдов
// стрелки на соседние слайды