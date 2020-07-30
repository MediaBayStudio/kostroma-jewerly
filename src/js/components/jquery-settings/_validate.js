;(function() {
		let timer,
			thanksPopup = document.querySelector('.thanks-popup'),
			overlay = document.querySelector('.overlay'),
			tryingPopup = document.querySelector('.trying-popup');

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
						minlength: 2
					},
					'user-tel': {
						required: true,
						userPhone: true
					},
					'user-email': {
						email: true
					},
					'user-msg': {
						required: true,
						minlength: 5
					},
					'privacy-policy': {
						required: true,
						minlength: 1
					}
				},
				messages: {
					'user-name': {
						required: 'Укажите имя',
						minlength: jQuery.validator.format("Имя не может быть таким коротким"),
						userName: 'Допустимы только буквы'
					},
					'user-tel': {
						required: 'Укажите телефон',
						userPhone: 'Укажите верный номер телефона'
					},
					'user-email': {
						required: 'Укажите E-mail',
						email: 'Укажите верный E-mail'
					},
					'user-msg': {
						required: 'Введите сообщение',
						minlength: jQuery.validator.format("Сообщение не может быть таким коротким"),
					},
					'privacy-policy': {
						required: 'Согласитель с политикой обработки персональных данных'
					}
				},
				errorClass: 'invalid',
				submitHandler: function(form, event) {
					event.preventDefault();
					form = $(this)[0].errorContext;
					form.find('input').val('').removeClass('focus');
					if (form.hasClass('quiz-popup__form')) {
						form.addClass('hide');

						$('.quiz-popup__thanks-wrap').removeClass('hide');

						timer = setTimeout(function() {
							document.querySelector('.quiz-popup').close();
						}, 5000);
					} else {
						$('.thanks-popup').addClass('active');
						if (!overlay.classList.contains('active')) {
							overlay.classList.add('active');
						}
						timer = setTimeout(function() {
							closeThanksPopup();
						}, 5000);
					}
				}
			});
		});

		$('form .btn').on('click', function() {
	    if (!$(event.target).parents('form').valid()) {
	      event.preventDefault();
	    }
	  });

		// $('.questions-sect__form').on('submit', function() {
	 //    if (!$(this).valid()) return;
	 //    ym(65100022,'reachGoal','button_click_question');
	 //    return true;
	 //  });

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

	$.validator.methods.userPhone = function(value, element) {
	  return /\+7\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}/.test(value);
	}

	$.validator.methods.userName = function(value, element) {
	  return /^[а-яёА-ЯЁa-zA-Z\s]+$/.test(value);
	}