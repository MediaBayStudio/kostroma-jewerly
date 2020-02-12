const nextArrow = '<svg width="100%" height="100%" viewBox="0 0 29 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 7.90495H25.3333L16.8889 1.23828"/></svg>',
	prevArrow = '<svg width="100%" height="100%" viewBox="0 0 29 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29 1.23861L3.66667 1.23861L12.1111 7.90527"/></svg>',
	buildArrow = function(className, direction) {
		return '<button type="button" class="' + className + '">' + direction + '</button>'
	};

destroyCatalogSlider = function() {
	$('.catalog-block').slick('unslick');
}

buildCatalogSlider = function() {
		// let catalogBlock = $('.catalog-block');

		$('.catalog-block').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			mobileFirst: true,
			infinite: false,
			draggable: false,
			centerMode: true,
			centerPadding: 'calc((100vw - 320px)/(575 - 320)*(140 - 0) + 0px)',
			dots: true,
			slide: '.catalog-card',
			appendArrows: '.catalog-block__dots',
			appendDots: '.catalog-block__dots',
			// nextArrow: '<button type="button" class="catalog-block__next next"></button>',
			// prevArrow: '<button type="button" class="catalog-block__prev prev"></button>',
			nextArrow: buildArrow('catalog-block__next next', nextArrow),
			prevArrow: buildArrow('catalog-block__prev prev', prevArrow),
			responsive: [{
				breakpoint: 575.98,
				settings: {
					centerPadding: 'calc((100vw - 576px)/(767 - 576)*(185 - 125) + 125px)',
				}
			}, {
				breakpoint: 768,
				settings: 'unslick'
			}]
		});
		// pagination func

	;(function() {
		if (!$('.catalog-block').hasClass('slick-slider')) {
			return;
		}
		// let dots = $('.catalog-block__dots>.slick-dots>li>button'),
		let dots = document.querySelectorAll('.catalog-block__dots>.slick-dots>li>button'),
			dotsParent = dots[0].parentElement.parentElement,
			elipsisAfter,
			elipsisBefore;

		if (dots.length > 8) {
			dotsParent.classList.add('elipsis-after');
			elipsisAfter = true;
			for (let i = 6; i < dots.length-1; i++) {
				dots[i].classList.add('hide');
			}

			$('.catalog-block').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
				if (currentSlide !== nextSlide) {
					if (nextSlide > currentSlide) {
						// console.log('nextSlide > currentSlide');
						if (dots.length-1 - nextSlide <= 5 && elipsisAfter) {
							// console.log('dots.length-1 - nextSlide <= 5 && elipsisAfter');
							dotsParent.classList.remove('elipsis-after');
							dotsParent.classList.add('elipsis-before');
							elipsisAfter = false;
							elipsisBefore = true;

							for (let i = 1, len = dots.length-1 - 5; i < len; i++) {
								dots[i].classList.add('hide');
							}

							for (let i = dots.length-1, len = dots.length-1 - 6; i > len; i--) {
								dots[i].classList.remove('hide');
							}

							
						} else if (nextSlide > 4 && elipsisAfter) { // nextSlide >= 5
							// console.log('nextSlide > 4 && elipsisAfter');
							elipsisBefore = true;
							dotsParent.classList.add('elipsis-before');

							dots[nextSlide+1].classList.remove('hide');
							dots[nextSlide+2].classList.remove('hide');								
							for (let i = 1; i < nextSlide-2; i++) {
								dots[i].classList.add('hide');
							}
						}				
					} else if (nextSlide < currentSlide) {
						if (nextSlide === 0) {
							dotsParent.classList.remove('elipsis-before');
							dotsParent.classList.add('elipsis-after');
							elipsisBefore = false;
							elipsisAfter = true;
							for (let i = 1; i < 6; i++) {
								dots[i].classList.remove('hide');
							}
							for (let i = 6, len = dots.length-1; i < len; i++) {
								dots[i].classList.add('hide');
							}
						} else if (nextSlide <= 5 && elipsisBefore) {
								dotsParent.classList.remove('elipsis-before');
								elipsisBefore = false;
								for (let i = 1; i < nextSlide; i++) {
									dots[i].classList.remove('hide');
								}

								for (let i = dots.length-2; i > 5; i--) {
									dots[i].classList.add('hide');
								}
						} else if (nextSlide <= dots.length-1 - 5 && nextSlide > 5) {
							elipsisAfter = true;
							dotsParent.classList.add('elipsis-after');

							dots[nextSlide-1].classList.remove('hide');
							dots[nextSlide-2] && dots[nextSlide-2].classList.remove('hide');
							for (let i = dots.length-2, len = nextSlide+2; i > len; i--) {
								dots[i].classList.add('hide');
							}
						}					
					}
				}
				
			});
		}
	})();
}