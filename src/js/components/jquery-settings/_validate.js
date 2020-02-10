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