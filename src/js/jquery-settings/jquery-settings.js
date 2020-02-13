const nextArrow = '<svg width="100%" height="100%" viewBox="0 0 29 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 7.90495H25.3333L16.8889 1.23828"/></svg>',
	prevArrow = '<svg width="100%" height="100%" viewBox="0 0 29 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29 1.23861L3.66667 1.23861L12.1111 7.90527"/></svg>',
	buildArrow = function(className, direction) {
		return '<button type="button" class="' + className + '">' + direction + '</button>'
	};

let buildGallerySlider = function() {
	$('.gallery-popup-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: false,
		draggable: false,
		slide: '.gallery-popup-slider__slide-wrap',
		appendArrows: '.gallery-popup-slider__arrows',
		nextArrow: buildArrow('gallery-popup-slider__next next', nextArrow),
		prevArrow: buildArrow('gallery-popup-slider__prev prev', prevArrow)
	});
};


let destroyCatalogSlider = function() {
	$('.catalog-block').slick('unslick');
};

let buildCatalogSlider = function() {

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

	;(function() {
		if (!$('.catalog-block').hasClass('slick-slider')) {
			return;
		}
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
						if (dots.length-1 - nextSlide <= 5 && elipsisAfter) {
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


													} else if (nextSlide > 4 && elipsisAfter) { 
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
};

$(document).ready(function() {
	$('.delivery-block').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: false,
		mobileFirst: true,
		slide: '.delivery-card',
		centerMode: true,
		centerPadding: 'calc((100vw - 320px)/(575 - 320)*(125 - 0) + 0px)',
		appendArrows: '.delivery-block__arrows',
		nextArrow: buildArrow('delivery-block__next next', nextArrow),
		prevArrow: buildArrow('delivery-block__prev prev', prevArrow),
		responsive: [{
			breakpoint: 575.98,
			settings: 'unslick'
		}]
	});

		$('.production-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: false,
		mobileFirst: true,
		slide: '.production-slider__slide',
		appendArrows: '.production-slider__arrows',
		nextArrow: buildArrow('production-slider__next next', nextArrow),
		prevArrow: buildArrow('production-slider__prev prev', prevArrow),
		responsive: [{
			breakpoint: 575.98,
			settings: {
				slidesToShow: 2
			}
		}, {
			breakpoint: 991.98,
			settings: {
				slidesToShow: 3 
			}
		},{
			breakpoint: 1229.98,
			settings: {
				slidesToShow: 4
			}
		}]
	});

		$('.gallery-slider').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		infinite: false,
		mobileFirst: true,
		variableWidth: true,
		slidesPerRow: 1, 
	  rows: 2,
	  draggable: false,
		nextArrow: buildArrow('gallery-slider__next next', nextArrow),
		prevArrow: buildArrow('gallery-slider__prev prev', prevArrow),
		responsive: [{
			breakpoint: 575.98,
			settings: {
				slidesToShow: 3
			}
		}, {
			breakpoint: 991.98,
			settings: 'unslick'
		}]
	});
	;(function() {
			let timer,
				thanksPopup = document.querySelector('.thanks-popup'),
				overlay = document.querySelector('.overlay'),
				tryingPopup = document.querySelector('.trying-popup')
				checkInputs = document.querySelectorAll('input[type="checkbox"]');

					closeThanksPopup = function() {
					thanksPopup.style.animation = 'fadeOut .5s';
					if (overlay.classList.contains('active') && !tryingPopup.classList.contains('active')) {
						overlay.style.animation = 'fadeOut .5s';
					}
				};

				$('form').each(function() {
				$(this).validate({
					rules: {
						'user-name': {
							required: true,
							userName: true,
							minlength: 2,
							maxlength: 50
						},
						'user-tel': {
							required: true,
							userPhone: true
						},
						'user-email': {
							required: true,
							userEmail: true
						},
						'privacy-policy': {
							required: true,
							minlength: 1
						}
					},
					messages: {
						'user-name': {
							required: 'Укажите имя',
							minlength: jQuery.validator.format("Поле с именем должно содержать минимум 2 символа!"),
							maxlength: jQuery.validator.format("Поле с именем должно содержать не более {0} символов!"),
							userName: 'Допустимы только буквы'
						},
						'user-tel': {
							required: 'Укажите телефон',
							userPhone: 'Укажите верный номер телефона'
						},
						'user-email': {
							required: 'Укажите E-mail',
							userEmail: 'Укажите верный E-mail'
						},
						'privacy-policy': {
							required: 'Согласитель с политикой обработки персональных данных'
						}
					},
					errorClass: 'invalid',
					submitHandler: function(form, event) {
						event.preventDefault();
						form = $(this)[0].errorContext;
						form.find('input').val('');

							for (let i = 0; i < checkInputs.length; i++) {
							checkInputs[i].checked = false;
						}					

												$('.thanks-popup').addClass('active');
						if (!overlay.classList.contains('active')) {
							overlay.classList.add('active');
						}
						timer = setTimeout(function() {
							closeThanksPopup();
						}, 3000);
					}
				});
			});

				$('.thanks-popup__close').on('click', function() {
				closeThanksPopup();
				clearTimeout(timer);
			});

				$('.thanks-popup').on('animationend', function() {
				if (event.animationName === 'fadeOut') {
					$('.thanks-popup').removeClass('active');
					$('.thanks-popup').css('animation', '');
				}
			})
		})();

			$.validator.methods.userEmail = function(value, element) {
		  return /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/.test(value);
		}

			$.validator.methods.userPhone = function(value, element) {
		  return /\+7\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}/.test(value);
		}

			$.validator.methods.userName = function(value, element) {
		  return /^[а-яёА-ЯЁa-zA-Z\s]+$/.test(value);
		}

	})