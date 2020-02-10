$('.delivery-block').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	infinite: false,
	mobileFirst: true,
	slide: '.delivery-card',
	centerMode: true,
	centerPadding: 'calc((100vw - 320px)/(575 - 320)*(125 - 0) + 0px)',
	appendArrows: '.delivery-block__arrows',
	nextArrow: '<button type="button" class="delivery-block__next next"></button>',
	prevArrow: '<button type="button" class="delivery-block__prev prev"></button>',
	adaptiveHeight: true,
	responsive: [{
		breakpoint: 575.98,
		settings: 'unslick'
	}]
});