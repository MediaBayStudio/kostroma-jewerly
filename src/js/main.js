(function(){'use strict';function a(a){this.time=a.time,this.target=a.target,this.rootBounds=a.rootBounds,this.boundingClientRect=a.boundingClientRect,this.intersectionRect=a.intersectionRect||i(),this.isIntersecting=!!a.intersectionRect;var b=this.boundingClientRect,c=b.width*b.height,d=this.intersectionRect,e=d.width*d.height;this.intersectionRatio=c?+(e/c).toFixed(4):this.isIntersecting?1:0}function b(a,b){var c=b||{};if("function"!=typeof a)throw new Error("callback must be a function");if(c.root&&1!=c.root.nodeType)throw new Error("root must be an Element");this._checkForIntersections=d(this._checkForIntersections.bind(this),this.THROTTLE_TIMEOUT),this._callback=a,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(c.rootMargin),this.thresholds=this._initThresholds(c.threshold),this.root=c.root||null,this.rootMargin=this._rootMarginValues.map(function(a){return a.value+a.unit}).join(" ")}function c(){return window.performance&&performance.now&&performance.now()}function d(a,b){var c=null;return function(){c||(c=setTimeout(function(){a(),c=null},b))}}function e(a,b,c,d){"function"==typeof a.addEventListener?a.addEventListener(b,c,d||!1):"function"==typeof a.attachEvent&&a.attachEvent("on"+b,c)}function f(a,b,c,d){"function"==typeof a.removeEventListener?a.removeEventListener(b,c,d||!1):"function"==typeof a.detatchEvent&&a.detatchEvent("on"+b,c)}function g(a,b){var c=Math.max(a.top,b.top),d=Math.min(a.bottom,b.bottom),e=Math.max(a.left,b.left),f=Math.min(a.right,b.right),g=f-e,h=d-c;return 0<=g&&0<=h&&{top:c,bottom:d,left:e,right:f,width:g,height:h}}function h(a){var b;try{b=a.getBoundingClientRect()}catch(a){}return b?(b.width&&b.height||(b={top:b.top,right:b.right,bottom:b.bottom,left:b.left,width:b.right-b.left,height:b.bottom-b.top}),b):i()}function i(){return{top:0,bottom:0,left:0,right:0,width:0,height:0}}function j(a,b){for(var c=b;c;){if(c==a)return!0;c=k(c)}return!1}function k(a){var b=a.parentNode;return b&&11==b.nodeType&&b.host?b.host:b&&b.assignedSlot?b.assignedSlot.parentNode:b}if("object"==typeof window){if("IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype)return void("isIntersecting"in window.IntersectionObserverEntry.prototype||Object.defineProperty(window.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return 0<this.intersectionRatio}}));var l=window.document,m=[];b.prototype.THROTTLE_TIMEOUT=100,b.prototype.POLL_INTERVAL=null,b.prototype.USE_MUTATION_OBSERVER=!0,b.prototype.observe=function(a){var b=this._observationTargets.some(function(b){return b.element==a});if(!b){if(!(a&&1==a.nodeType))throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:a,entry:null}),this._monitorIntersections(),this._checkForIntersections()}},b.prototype.unobserve=function(a){this._observationTargets=this._observationTargets.filter(function(b){return b.element!=a}),this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())},b.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorIntersections(),this._unregisterInstance()},b.prototype.takeRecords=function(){var a=this._queuedEntries.slice();return this._queuedEntries=[],a},b.prototype._initThresholds=function(a){var b=a||[0];return Array.isArray(b)||(b=[b]),b.sort().filter(function(b,c,d){if("number"!=typeof b||isNaN(b)||0>b||1<b)throw new Error("threshold must be a number between 0 and 1 inclusively");return b!==d[c-1]})},b.prototype._parseRootMargin=function(a){var b=(a||"0px").split(/\s+/).map(function(a){var b=/^(-?\d*\.?\d+)(px|%)$/.exec(a);if(!b)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(b[1]),unit:b[2]}});return b[1]=b[1]||b[0],b[2]=b[2]||b[0],b[3]=b[3]||b[1],b},b.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(e(window,"resize",this._checkForIntersections,!0),e(l,"scroll",this._checkForIntersections,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in window&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(l,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))},b.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,f(window,"resize",this._checkForIntersections,!0),f(l,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))},b.prototype._checkForIntersections=function(){var b=this._rootIsInDom(),d=b?this._getRootRect():i();this._observationTargets.forEach(function(e){var f=e.element,g=h(f),i=this._rootContainsTarget(f),j=e.entry,k=b&&i&&this._computeTargetAndRootIntersection(f,d),l=e.entry=new a({time:c(),target:f,boundingClientRect:g,rootBounds:d,intersectionRect:k});j?b&&i?this._hasCrossedThreshold(j,l)&&this._queuedEntries.push(l):j&&j.isIntersecting&&this._queuedEntries.push(l):this._queuedEntries.push(l)},this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)},b.prototype._computeTargetAndRootIntersection=function(a,b){if("none"!=window.getComputedStyle(a).display){for(var c=h(a),d=c,e=k(a),f=!1;!f;){var i=null,j=1==e.nodeType?window.getComputedStyle(e):{};if("none"==j.display)return;if(e==this.root||e==l?(f=!0,i=b):e!=l.body&&e!=l.documentElement&&"visible"!=j.overflow&&(i=h(e)),i&&(d=g(i,d),!d))break;e=k(e)}return d}},b.prototype._getRootRect=function(){var a;if(this.root)a=h(this.root);else{var b=l.documentElement,c=l.body;a={top:0,left:0,right:b.clientWidth||c.clientWidth,width:b.clientWidth||c.clientWidth,bottom:b.clientHeight||c.clientHeight,height:b.clientHeight||c.clientHeight}}return this._expandRectByRootMargin(a)},b.prototype._expandRectByRootMargin=function(a){var b=this._rootMarginValues.map(function(b,c){return"px"==b.unit?b.value:b.value*(c%2?a.width:a.height)/100}),c={top:a.top-b[0],right:a.right+b[1],bottom:a.bottom+b[2],left:a.left-b[3]};return c.width=c.right-c.left,c.height=c.bottom-c.top,c},b.prototype._hasCrossedThreshold=function(a,b){var c=a&&a.isIntersecting?a.intersectionRatio||0:-1,d=b.isIntersecting?b.intersectionRatio||0:-1;if(c!==d)for(var e,f=0;f<this.thresholds.length;f++)if(e=this.thresholds[f],e==c||e==d||e<c!=e<d)return!0},b.prototype._rootIsInDom=function(){return!this.root||j(l,this.root)},b.prototype._rootContainsTarget=function(a){return j(this.root||l,a)},b.prototype._registerInstance=function(){0>m.indexOf(this)&&m.push(this)},b.prototype._unregisterInstance=function(){var a=m.indexOf(this);-1!=a&&m.splice(a,1)},window.IntersectionObserver=b,window.IntersectionObserverEntry=a}})();

(function(ELEMENT) {
  ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
  ELEMENT.closest = ELEMENT.closest || function closest(selector) {
      if (!this) return null;
      if (this.matches(selector)) return this;
      if (!this.parentElement) {return null}
      else return this.parentElement.closest(selector)
    };
}(Element.prototype));

;(function () {
  if (typeof window.CustomEvent === "function") return false;

  function CustomEvent (event, params) {
    params = params || {bubbles: false, cancelable: false, detail: null};
    let evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }
  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();

let menu,
	tryingPopup,
	thanksPopup,
  quizPopup,
	overlay,
	hdr,
  catalogCards = document.querySelectorAll('.catalog-block__catalog-card');

for (let i = 0; i < catalogCards.length; i++) {
  let child = catalogCards[i].children[0];

  if (child.textContent !== '') {
    catalogCards[i].jewerly = JSON.parse(child.textContent);
  }

  child.textContent = '';
}

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

//for ie
let inputs = document.querySelectorAll('.inp');

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('focus', function() {
    if (!this.classList.contains('focus')) {
      this.classList.add('focus');
    }
  });
  inputs[i].addEventListener('blur', function() {
    if (this.classList.contains('focus') && (this.value === '' || this.value === '+7')) {
      this.classList.remove('focus');
    }
  });
}

let websiteInputs = document.querySelectorAll('input[name="website"]'),
  siteName = document.querySelector('.hero-sect__title').textContent,
  articleInput = document.querySelector('input[name="article"]');

  for (let i = 0;i < websiteInputs.length;i++) {
    websiteInputs[i].value = siteName;
  }

document.addEventListener('DOMContentLoaded', function(){
  new lazyload();
  ;(function() {
  	hdr = document.querySelector('.hdr');
  	menu = new MobileMenu({
  		menu: '.mobile-menu',
  		openBtn: '.burger-btn',
  		closeBtn: '.burger-btn',
  		overlay: '.overlay',
  		fixHeader: '.hdr',
  		toRight: true 
  	});
  
  	if (menu.style) {
  		menu.addEventListener('menubeforeopen', function() {
  			hdr.classList.add('active');
  		});
  		menu.addEventListener('menubeforeclose', function() {
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
	
					let wndwY = window.pageYOffset,
					hash = this.href.replace(/[^#]*(.*)/, '$1'),
					targetTop = document.querySelector(hash).getBoundingClientRect().top - hdr.offsetHeight,
					start = null;
	
				requestAnimationFrame(step);
				menu.closeMenu();
	
				function step(time) {
					if (start === null) {
						start = time;
					}
					let progress = time - start,
						r = (targetTop < 0 ? Math.max(wndwY - progress/V, wndwY + targetTop) : Math.min(wndwY + progress/V, wndwY + targetTop));
	
					window.scrollTo(0, r);
	
	
					if (r != wndwY + targetTop) {
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
	
		quizPopup = new SimplePopup({
			popup: '.quiz-popup',
			openBtn: '.hero-sect__btn',
			closeBtn: '.quiz-popup__close',
			overlay: '.overlay',
			popupAnimation: 'fadeOut 0.5s',
			overlayAnimation: 'fadeOut 0.5s',
			popupAnimationName: 'fadeOut',
			overlayAnimationName: 'fadeOut',
		});
		let videoPopup = new SimplePopup({
			popup: '.video-popup',
			openBtn: '.about-sect__preview-img-wrap',
			closeBtn: '.video-popup__close',
			overlay: '.overlay',
			popupAnimation: 'fadeOut 0.5s',
			overlayAnimation: 'fadeOut 0.5s',
			popupAnimationName: 'fadeOut',
			overlayAnimationName: 'fadeOut',
		}),
			iframe = document.createElement('iframe');
			iframe.setAttribute('width', '100%');
			iframe.setAttribute('height', '100%');
			iframe.setAttribute('frameborder', '0');
			iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
			iframe.setAttribute('allowfullscreen', 'allowfullscreen');
	
		videoPopup.addEventListener('beforeopen', function() {
			this.insertAdjacentElement('beforeend', iframe)
			iframe.src = 'https://www.youtube.com/embed/W1Yavc80Ap4';
		});
	
		videoPopup.addEventListener('close', function() {
			this.removeChild(iframe)
		});
	
		let popupProductImg = tryingPopup.querySelector('.catalog-card__img'),
			popupProductTitle = tryingPopup.querySelector('.catalog-card__title'),
			popupProductDesc = tryingPopup.querySelector('.catalog-card__desc'),
			popupProductWeight = tryingPopup.querySelector('.catalog-card__weight'),
			popupProductMetal = tryingPopup.querySelector('.catalog-card__metal'),
			popupProductGemsBlock = tryingPopup.querySelector('.catalog-card__gems-block'),
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
			popupProductGemsBlock.innerHTML = '';
	
			let product = this.caller.closest('.catalog-card'),
				jewerly = product.jewerly,
				productImg = product.querySelector('.catalog-card__img'),
				productImgSrc = productImg.src,
				productImgAlt = productImg.alt,
				productName = product.querySelector('.catalog-card__title').textContent,
				productDesc = product.querySelector('.catalog-card__desc').textContent;
	
			product.classList.add('active');
	
			popupProductImg.src = productImgSrc;
			popupProductImg.alt = productImgAlt;
			popupProductTitle.textContent = productName;
			popupProductDesc.textContent = productDesc;
			popupProductWeight.textContent = jewerly.weight;
			popupProductMetal.textContent = jewerly.metal;
			
			articleInput.value = product.id;
	
			
			for (let i in jewerly.gems) {
				let gem = jewerly.gems[i],
					{title, number, weight, purity} = gem,
					block =
					`<div class="gem">
						<div class="gem__info">
							<span class="gem__name">${title}</span>
							<span class="gem__ct">${weight}</span>
							<span class="gem__purity">${purity}</span>
						</div>
						<div class="gem__quantity">${number.replace(/(\d+)/, '$1<br>')}</div>
					</div>`;
				popupProductGemsBlock.insertAdjacentHTML('beforeend', block);
			}
			
	
		});
	
		tryingPopup.addEventListener('click', function() {
			let target = event.target;
			if (target.classList.contains('catalog-card__info-btn')) {
				target.classList.toggle('active');
			}
		});
	
		tryingPopup.addEventListener('beforeclose', function() {
			document.body.classList.remove('blur');
			this.querySelector('.catalog-card__info-btn').classList.remove('active');
		});
	
		tryingPopup.addEventListener('close', function() {
			for (let i = 0; i < catalogCards.length; i++) {
				catalogCards[i].classList.remove('active');
			}
		});
	})();
	// ;(function() {
	// 	let hdrClone = hdr.cloneNode(true),
	// 		hdrParent = hdr.parentElement,
	// 		fixThreshold = hdr.getBoundingClientRect().bottom + pageYOffset;
			
	// 	hdrClone.style.opacity = 0;
	// 	hdrClone.style.pointerEvents = 'none';
	
	// 	window.addEventListener('scroll', fixHdr);
	// 	fixHdr();
		
	// 	function fixHdr() {
	// 		if (pageYOffset > fixThreshold) {
	// 			if (menu.style && menu.classList.contains('active')) {
	// 				return;
	// 			}
	// 			hdrParent.appendChild(hdrParent.replaceChild(hdrClone, hdr));
	// 			hdr.classList.add('fixed');
	// 			window.removeEventListener('scroll', fixHdr);
	// 			window.addEventListener('scroll', unfixHdr);
	// 		}
	// 	}
	
	// 	function unfixHdr() {
	// 		if (pageYOffset <= fixThreshold) {
	// 			hdrParent.replaceChild(hdr, hdrClone);
	// 			hdr.classList.remove('fixed');
	// 			window.removeEventListener('scroll', unfixHdr);
	// 			window.addEventListener('scroll', fixHdr);
	// 		}
	// 	}
	// })();
	;(function() {
		let	guarantees = document.querySelectorAll('.delivery-card__guarantee'),
			clickHandler = function() {
				if (!this.classList.contains('active')) {				
					for (let k = 0; k < guarantees.length; k++) {
						guarantees[k].classList.remove('active');
					}
				}			
				this.classList.toggle('active');
			};
	
		for (let i = 0; i < guarantees.length; i++) {
			guarantees[i].addEventListener('click', clickHandler);
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
  ;(function() {
    let descBlock = document.querySelector('.about-sect__desc-block'),
      moreBtn = document.querySelector('.desc-block__more-btn');
  
    moreBtn.addEventListener('click', function() {
      descBlock.classList.remove('elipsis')
    });
  })();
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
      let images = gallerySlider.querySelectorAll('img'),
        figures = gallerySlider.querySelectorAll('figure'),
        loaders = gallerySlider.querySelectorAll('.loader-bg');
  
      for (let i = 0; i < images.length; i++) {
        images[i].onload = function() {
          figures[i].classList.add('loaded');
          loaders[i].classList.add('hide');
          images[i].onload = null;
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
  ;(function() {
  
    let dir = document.querySelector('#dir').dataset.dir,
      xhr = new XMLHttpRequest(),
      stepsLength,
      currentStep = 0,
      data = {},
      labels,
      stepsInsides = [],
      response,
      quizTitle,
      popup = document.querySelector('.quiz-popup'),
      popupTitle = popup.querySelector('.quiz-popup__title'),
      popupDesc = popup.querySelector('.quiz-popup__desc'),
      popupBtn = popup.querySelector('.quiz-form__btn'),
      quizForm = popup.querySelector('.quiz-form'),
      ldr = popup.querySelector('.loader-bg'),
      progressWrap = popup.querySelector('.progress'),
      finalForm = popup.querySelector('.quiz-popup__form'),
      thanks = popup.querySelector('.quiz-popup__thanks-wrap'),
      resultInp = popup.querySelector('#quiz-result-inp'),
      progressBar = progressWrap.querySelector('.progress__bar'),
      progressPercent = progressWrap.querySelector('.progress__percent'),
      buildInsides = function(elem) {
        let str = '<b class="quiz-form__title">' + elem.question + '</b>' +
          (function() {
            let string = '';
            for (let value in elem.answers) {
              string += `<label class="quiz-form__lbl"><div class="quiz-form__pseudo-inp"></div><span class="quiz-form__lbl-text">${elem.answers[value]}</span></label>`
            }
            return string;
          })();
        return str;
      },
      insertInsides = function() {
        quizForm.insertAdjacentHTML('beforeend', stepsInsides[currentStep]);
        quizForm.dataset.step = response[currentStep].name;
        labels = quizForm.querySelectorAll('.quiz-form__lbl');
        quizTitle = quizForm.querySelector('.quiz-form__title');
        popupBtn.classList.add('disabled');
      };
  
    quizPopup.addEventListener('close', function() {
      currentStep = 0;
      progressBar.style.width =  '0%';
      progressPercent.textContent = '0%';
  
  
      quizForm.classList.remove('hide');
      popupTitle.classList.remove('hide');
      popupDesc.classList.remove('hide');
      popupBtn.classList.remove('hide');
      progressWrap.classList.remove('hide');
  
      finalForm.classList.add('hide');
      thanks.classList.add('hide');
  
      if (quizForm.children.length > 0) {
        for (let i = 0; i < labels.length; i++) {
          if (labels[i].classList.contains('active')) {
            for (let key in response) {
              let elem = response[key];
              if (elem['name'] === quizForm.dataset.step) {
                data[elem['question']] = labels[i].textContent;
              }
            }
            // data[quizForm.dataset.step] = labels[i].textContent;
          }
          quizForm.removeChild(labels[i]);
        }
        quizForm.removeChild(quizTitle);
      }
      
  
        insertInsides();
    });
  
    xhr.open('GET', dir + '/quiz.json');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
  
    ldr.classList.add('active');
    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        response = JSON.parse(xhr.response).steps;
        stepsLength = response.length;
        ldr.classList.remove('active');
  
        for (let key in response) {
          let elem = response[key],
            str = buildInsides(elem);
  
          stepsInsides.push(str);
          data[elem['question']] = '';
        }
  
        insertInsides();
      }
    });
  
    popupBtn.addEventListener('click', function() {
      if (!this.classList.contains('disabled')) {
        // insert in data
        for (let i = 0; i < labels.length; i++) {
          if (labels[i].classList.contains('active')) {
            for (let key in response) {
              let elem = response[key];
              if (elem['name'] === quizForm.dataset.step) {
                data[elem['question']] = labels[i].textContent;
              }
            }
          }
          quizForm.removeChild(labels[i]);
        }
        quizForm.removeChild(quizTitle);
  
        if (stepsLength - currentStep > 1) {
          currentStep++;
          // print percents
          let percent = currentStep / stepsLength * 100,
            currentPercent = +progressPercent.textContent.slice(0, -1),
            number = currentPercent,
            timer = setInterval(function() {
  
              progressPercent.textContent = ++number + '%';
              if (number >= percent) {
                clearInterval(timer);
              }
            }, 10);
  
          progressBar.style.width =  percent + '%';
  
          insertInsides();
        } else {
          // final step
          currentStep = 0;
          quizForm.classList.add('hide');
          finalForm.classList.remove('hide');
          popupTitle.classList.add('hide');
          popupDesc.classList.add('hide');
          popupBtn.classList.add('hide');
          progressWrap.classList.add('hide');
          progressBar.style.width =  '0%';
          progressPercent.textContent = '0%';
  
          let resultString = '',
            i = 0;
          for (let key in data) {
            resultString += (i === 0 ? key : ' ' + key) + ' ' + data[key] + ';';
            i++;
          }
          resultInp.value = resultString;
  
        }
      }
    });
  
    quizForm.addEventListener('click', function() {
      let target = event.target;
      if (target.classList.contains('quiz-form__lbl') & !target.classList.contains('active')) {
        for (let i = 0; i < labels.length; i++) {
          labels[i].classList.remove('active');
        }
        popupBtn.classList.remove('disabled');
        target.classList.add('active');
      }  
    });
  })();
  
});