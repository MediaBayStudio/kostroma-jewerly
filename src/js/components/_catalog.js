;(function() {
	const catalogBlock = document.querySelector('.catalog-block');

	if (!catalogBlock) {
		return;
	}
	
	let count,
	start,
	resized = {
		'1230': true,
		'992': true,
		'768': true,
		'576': true
	},
	moreBtn = document.querySelector('.catalog-block__more-btn'),
	loader = catalogBlock.querySelector('.loader-bg'),
	catalogCards = catalogBlock.querySelectorAll('.catalog-card'),
	showProducts = function(num, len) {
		if (len === 0) {
			len = catalogCards.length;
		}
		for (let i = num; i < len; i++) {
			if (catalogCards[i]) {
				catalogCards[i].classList.remove('hide');
			}
		}
	},
	hideProducts = function(num, len) {
		for (let i = num; i >= len; i--) {
			if (catalogCards[i]) {
				catalogCards[i].classList.add('hide');
			}
		}
	},
	toggleVisibleMoreBtn = function() {
		if (catalogCards.length <= start) {
			moreBtn.classList.add('hide');
		} else {
			moreBtn.classList.remove('hide');
		}
	},
	catalogInit = function() {
		if (matchMedia('(min-width:1229.98px)').matches) {
			start = 8;
			count = 8;		
			resized['1230'] = false;	
		} else if (matchMedia('(min-width:991.98px)').matches) {
			start = 6;
			count = 6;
			resized['992'] = false;
		}	else if (matchMedia('(min-width:767.98px)').matches) {
			start = 4;
			count = 4;
			resized['768'] = false;
		} else {
			start = 0;
			count = 0;
			resized['576'] = false;
		}
		showProducts(0, start);
		toggleVisibleMoreBtn();
	},
	catalogReInit = function() {
		if (matchMedia('(min-width:1229.98px)').matches) {
			if (!resized['1230']) {
				return;
			}
			start = 8;
			count = 8;
			// console.log('resized 1230');
			resized['1230'] = false;
			resized['992'] = true;
			resized['768'] = true;
			resized['576'] = true;
		} else if (matchMedia('(min-width:991.98px)').matches) {
			if (!resized['992']) {
				return;
			}
			start = 6;
			count = 6;
			// console.log('resized 992');
			resized['1230'] = true;
			resized['992'] = false;
			resized['768'] = true;
			resized['576'] = true;
		}	else if (matchMedia('(min-width:767.98px)').matches) {
			if (!resized['768']) {
				return;
			}
			start = 4;
			count = 4;
			// console.log('resized 768');
			resized['1230'] = true;
			resized['992'] = true;
			resized['768'] = false;
			resized['576'] = true;
		} else {
			if (!resized['576']) {
				return;
			}
			start = 0;
			count = 0;
			// console.log('resized 576');
			resized['1230'] = true;
			resized['992'] = true;
			resized['768'] = true;
			resized['576'] = false;
			// if (start === 0 && start < catalogCards.length) {
			// 	showProducts(count, catalogCards.length);
			if (catalogCards.length > 1) {
				buildCatalogSlider();
			}

		}
		hideProducts(catalogCards.length, 0);
		showProducts(0, start);
		toggleVisibleMoreBtn();

	};

	moreBtn.addEventListener('click', function() {
		showProducts(count, count + start);
		count += start;
		if (count >= catalogCards.length) {
			this.classList.add('hide');
		}
	});

	window.addEventListener('resize', catalogReInit);

	catalogInit();

	if (count === 0 && catalogCards.length > 1) {
		buildCatalogSlider();
	}

	
})();