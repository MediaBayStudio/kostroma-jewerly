;(function() {
	let count,
	newCount,
	start,
	resized = {
		'1230': true,
		'992': true,
		'768': true,
		'576': true
	},
	catalogBlock = document.querySelector('.catalog-block'),
	moreBtn = document.querySelector('.catalog-block__more-btn'),
	loader = catalogBlock.querySelector('.loader-bg'),
	catalogCards,
	products,
	showProducts = function(num, len) {
		for (let i = num; i < len; i++) {
			if (!catalogCards[i]) {
				printProducts(num, len);
				return;
			}
			catalogCards[i].classList.remove('hide');
		}
	},
	hideProducts = function(num, len) {
		for (let i = num; i > len; i--) {
			if (!catalogCards[i]) {
				return;
			}
			catalogCards[i].classList.add('hide');
		}
	},
	printProducts = function(num, len) {
		if (len === 0) {
			len = products.length;
		}
		for (let i = num; i < len; i++) {
			if (!products[i]) {
				break;
			}
			let {img, title, gems, price} = products[i],
				str =
					`<div class="catalog-card catalog-block__catalog-card">
						<img src="${img}" alt="${title}" class="catalog-card__img">
						<strong class="catalog-card__title">${title}</strong>
						<b class="catalog-card__desc">${gems}</b>
						<div class="catalog-card__bottom flex">
							<b class="catalog-card__price">${price}.-</b>
							<button type="button" class="catalog-card__btn btn-ol">
								<span class="catalog-card__btn-text">Примерить</span>
							</button>
						</div>`;
			// '<div class="catalog-card catalog-block__catalog-card"><img src="' + products[i].img + '" alt="' +
			// products[i].title + '" class="catalog-card__img"><strong class="catalog-card__title">' +
			// products[i].article + ' ' + products[i].title + '</strong><b class="catalog-card__desc">' + 
			// products[i].gems + '</b><div class="catalog-card__bottom flex"><b class="catalog-card__price">' +
			// products[i].price + '.-</b><button type="button" class="catalog-card__btn btn-ol"><span class="catalog-card__btn-text">Примерить</span></button></div>';
			
			catalogBlock.insertAdjacentHTML('beforeend', str);
		}
		catalogCards = catalogBlock.querySelectorAll('.catalog-card');
		tryingPopup.openBtn.refresh();
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
	},
	catalogReInit = function() {
		if (matchMedia('(min-width:1229.98px)').matches) {
			if (!resized['1230']) {
				return;
			}
			start = 8;
			newCount = 8;
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
			newCount = 6;
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
			newCount = 4;
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
			// console.log('resized 576');
			resized['1230'] = true;
			resized['992'] = true;
			resized['768'] = true;
			resized['576'] = false;
			if (start === 0 && start < catalogCards.length) {
				showProducts(count, products.length);
			}
			buildCatalogSlider();
		}
		
		if (start !== 0) {
			if (count === 0) {
				hideProducts(catalogCards.length-1, start-1);
				count = newCount;
			} else {
				if (start > count) {
					showProducts(count, start);
					count = newCount;
				} else if (start < count) {
					hideProducts(count-1, start-1);
					count = newCount;
				}
			}			
		}

		moreBtn.classList.remove('hide');
		if (catalogCards.length === products.length) {
			moreBtn.classList.add('hide');
		} else {
			moreBtn.classList.remove('hide');
		}
		// console.log(catalogCards.length);
		// console.log(products.length);
	};

	// catalogBlock.addEventListener('mouseover', function() {
	// 	let target = event.target;

	// 	if (event.target.classList.contains('btn-ol'))	{
	// 		target.closest('.catalog-card').classList.add('active');
	// 	}
	// });

	// catalogBlock.addEventListener('mouseout', function() {
	// 	let target = event.target;

	// 	if (event.target.classList.contains('btn-ol') && !tryingPopup.classList.contains('active'))	{
	// 		target.closest('.catalog-card').classList.remove('active');
	// 	}
	// });

	moreBtn.addEventListener('click', function() {
		showProducts(count, count + start);
		count += start;
		if (count >= products.length) {
			this.classList.add('hide');
		}
	});

	window.addEventListener('resize', catalogReInit);

	catalogInit();

	if (!products) {
		let xhr = new XMLHttpRequest();

		xhr.open('GET', 'db.json');		
		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
		xhr.send();


		loader.classList.add('active');
		xhr.addEventListener('readystatechange', function() {
			if (xhr.readyState === 4 && xhr.status === 200) {
				products = JSON.parse(xhr.response).goods;
				printProducts(0, count);

				if (count === 0) {
					buildCatalogSlider();
				}
				loader.classList.remove('active');
			}
		});
	}

	
})();