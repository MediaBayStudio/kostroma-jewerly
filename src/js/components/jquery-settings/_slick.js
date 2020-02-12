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