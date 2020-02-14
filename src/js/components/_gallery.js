;(function() {
  let galleryPopup = new SimplePopup({
    popup: '.gallery-popup',
    openBtn: '.gallery-slider__img',
    closeBtn: '.gallery-popup__close',
    overlay: '.overlay',
    popupAnimation: 'fadeOut 0.5s',
    overlayAnimation: 'fadeOut 0.5s',
    popupAnimationName: 'fadeOut',
    overlayAnimationName: 'fadeOut'
  }),
    galleryThumbs = document.querySelectorAll('.gallery-slider__img'),
    gallerySlider = document.querySelector('.gallery-popup-slider');

  galleryPopup.addEventListener('beforeopen', function() {
    let initialSlide;
    
    for (let i = 0; i < galleryThumbs.length; i++) {
      if (!gallerySlider.classList.contains('slick-slider')) {
        // let src = `${galleryThumbs[i].src.slice(0, -3)}big.jpg`,
        //   str = `<figure class="gallery-popup-slider__slide-wrap"><img src="${src}" alt="#" class="gallery-popup-slider__slide"></figure>`;
        let img = document.createElement('img'),
          wrap = document.createElement('figure');

        img.setAttribute('src', galleryThumbs[i].src);
        img.classList.add('gallery-popup-slider__slide');
        wrap.classList.add('gallery-popup-slider__slide-wrap');
        wrap.appendChild(img);

        // gallerySlider.insertAdjacentElement('beforeend', wrap);
        gallerySlider.appendChild(wrap);

        // gallerySlider.insertAdjacentHTML('beforeend', str);
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