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