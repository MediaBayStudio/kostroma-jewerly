(function(ELEMENT) {
  ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
  ELEMENT.closest = ELEMENT.closest || function closest(selector) {
      if (!this) return null;
      if (this.matches(selector)) return this;
      if (!this.parentElement) {return null}
      else return this.parentElement.closest(selector)
    };
}(Element.prototype));

let menu,
	tryingPopup,
	thanksPopup,
	overlay,
	hdr;

document.addEventListener('DOMContentLoaded', function(){
	;(function() {
		hdr = document.querySelector('.hdr');
		menu = new SimpleMenu({
			mediaQuery: '(max-width: 992px)',
			menu: '.mobile-menu',
			openBtn: {
				selector: '.burger-btn',
				class: 'active'
			},
			overlay: {
				zi: 3,
				css: 'background:rgba(64,54,55,.85);'
			},
			closeBtn: {
				selector: '.burger-btn',
				class: 'active'
			},
			toRight: true 
		});

			if (menu.style) {
			menu.addEventListener('beforeopen', function() {
				hdr.classList.add('active');
			});
			menu.addEventListener('beforeclose', function() {
				hdr.classList.remove('active');
			});
		}
	})();
	;(function() {
		let linkNav = document.querySelectorAll('a:not(.disabled)[href^="#"]'),
			targets = document.querySelectorAll('#start, #catalog, #delivery, #contacts'),
			V = .25;



					for (let i = 0; i < linkNav.length; i++) {
			linkNav[i].addEventListener('click', function() {
				event.preventDefault();
					let w = window.pageYOffset,
					hash = this.href.replace(/[^#]*(.*)/, '$1'),
					t = document.querySelector(hash).getBoundingClientRect().top,
					start = null;

					requestAnimationFrame(step);

					function step(time) {
					if (start === null) {
						start = time;
					}
					let progress = time - start,
						r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));

						window.scrollTo(0, r);

						if (r != w + t) {
						requestAnimationFrame(step);
					} else {
						location.hash = hash;
					}
				}
			});
		}



			})();
	;(function() {
		tryingPopup = new SimplePopup({
			popup: '.trying-popup',
			openBtn: '.catalog-block__catalog-card',
			closeBtn: '.trying-popup__close',
			overlay: '.overlay',
			popupAnimation: 'fadeOut 0.5s',
			overlayAnimation: 'fadeOut 0.5s',
			popupAnimationName: 'fadeOut',
			overlayAnimationName: 'fadeOut',
		});
		let popupProductImg = tryingPopup.querySelector('.catalog-card__img'),
			popupProductTitle = tryingPopup.querySelector('.catalog-card__title'),
			popupProductDesc = tryingPopup.querySelector('.catalog-card__desc'),
			checkInputs = document.querySelectorAll('.check-inp-block__inp');

			for (let i = 0; i < checkInputs.length; i++) {
			checkInputs[i].addEventListener('focus', function() {
				this.parentElement.classList.add('focus');
			});
			checkInputs[i].addEventListener('blur', function() {
				this.parentElement.classList.remove('focus');
			});
		}

			tryingPopup.addEventListener('beforeopen', function() {
			let product = this.caller.closest('.catalog-card'),
				productImg = product.querySelector('.catalog-card__img'),
				imgSrc = productImg.src,
				imgAlt = productImg.alt,
				productName = product.querySelector('.catalog-card__title').textContent,
				productDesc = product.querySelector('.catalog-card__desc').textContent;
			product.classList.add('active');
			document.body.classList.add('blur');
			popupProductImg.src = imgSrc;
			popupProductImg.alt = imgAlt;
			popupProductTitle.textContent = productName;
			popupProductDesc.textContent = productDesc;

			});

			tryingPopup.addEventListener('beforeclose', function() {
			document.body.classList.remove('blur');
		});

			tryingPopup.addEventListener('close', function() {
			let catalogCards = document.querySelectorAll('.catalog-block__catalog-card');
			for (let i = 0; i < catalogCards.length; i++) {
				catalogCards[i].classList.remove('active');
			}
		});
	})();
	;(function() {
		let hdrClone = hdr.cloneNode(true),
			hdrParent = hdr.parentElement,
			fixThreshold = hdr.getBoundingClientRect().bottom + pageYOffset;

					hdrClone.style.opacity = 0;
		hdrClone.style.pointerEvents = 'none';

			window.addEventListener('scroll', fixHdr);
		fixHdr();

				function fixHdr() {
			if (pageYOffset > fixThreshold) {
				if (menu.style && menu.classList.contains('active')) {
					return;
				}
				hdrParent.appendChild(hdrParent.replaceChild(hdrClone, hdr));
				hdr.classList.add('fixed');
				window.removeEventListener('scroll', fixHdr);
				window.addEventListener('scroll', unfixHdr);
			}
		}

			function unfixHdr() {
			if (pageYOffset <= fixThreshold) {
				hdrParent.replaceChild(hdr, hdrClone);
				hdr.classList.remove('fixed');
				window.removeEventListener('scroll', unfixHdr);
				window.addEventListener('scroll', fixHdr);
			}
		}
	})();
	;(function() {
		let	guarantees = document.querySelectorAll('.delivery-card__guarantee');

			for (let i = 0; i < guarantees.length; i++) {
			guarantees[i].addEventListener('touchend', function() {
				console.log('touch');
				if (!this.classList.contains('active')) {
					for (let k = 0; k < guarantees.length; k++) {
						guarantees[k].classList.remove('active');
					}
				}

								this.classList.toggle('active');
			});
		}

		})();
	;(function() {
		function setCursorPosition(pos, elem) {
			elem.focus();
			if (elem.setSelectionRange) {
				elem.setSelectionRange(pos, pos);
			} else if (elem.createTextRange) {
				let range = elem.createTextRange();
				range.collapse(true);
				range.moveEnd("character", pos);
				range.moveStart("character", pos);
				range.select()
			}
		}

				function mask(event) {
			let matrix = "+7(___)___-__-__",
			i = 0,
			def = matrix.replace(/\D/g, ""),
			val = this.value.replace(/\D/g, "");
			if (def.length >= val.length) val = def;
			this.value = matrix.replace(/./g, function(a) {
			return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
			});
			if (event.type == "blur") {
			if (this.value.length == 2) this.value = ""
			} else setCursorPosition(this.value.length, this)
			};
			let input = document.querySelectorAll("[name=user-tel]");
			for (let i = 0; i < input.length; i++) {
				input[i].addEventListener("input", mask, false);
				input[i].addEventListener("focus", mask, false);
				input[i].addEventListener("blur", mask, false);
			}
	})();
	;(function() {
		let count,
		newCount,
		start,
		slicked,
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
				let str =
				'<div class="catalog-card catalog-block__catalog-card"><img src="' + products[i].img + '" alt="' +
				products[i].title + '" class="catalog-card__img"><strong class="catalog-card__title">' +
				products[i].article + ' ' + products[i].title + '</strong><b class="catalog-card__desc">' + 
				products[i].gems + '</b><div class="catalog-card__bottom flex"><b class="catalog-card__price">' +
				products[i].price + '.-</b><button type="button" class="catalog-card__btn btn-ol"><span class="catalog-card__btn-text">Примерить</span></button></div>';

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
				resized['1230'] = true;
				resized['992'] = true;
				resized['768'] = false;
				resized['576'] = true;
			} else {
				if (!resized['576']) {
					return;
				}
				start = 0;
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
		};





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
  ;(function() {
    let descBlock = document.querySelector('.about-sect__desc-block'),
      moreBtn = document.querySelector('.desc-block__more-btn');

      moreBtn.addEventListener('click', function() {
      descBlock.classList.remove('elipsis')
    });
  })();
});