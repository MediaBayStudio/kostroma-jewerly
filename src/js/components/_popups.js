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