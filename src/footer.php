
	<footer class="ftr container">
		<div class="ftr__links-block"> <?php 
			$pages = ['Главная', 'Браслеты', 'Броши', 'Колье', 'Кольца', 'Подвески', 'Пусеты', 'Серьги'];
			$pages_en = ['', 'bracelet', 'brooch', 'necklace', 'rings', 'pendant', 'pusets', 'earrings'];
			$page_url = home_url();
			for ($i = 0; $i < count($pages); $i++) {
				if ($title_ru === $pages[$i] || $title_ru === 'Украшения' && $i === 0) {
					$ftr_link_class =  " active";
				} else {
					$ftr_link_class =  "";
				}
				$href = $page_url . '/' . $pages_en[$i];
				echo "<a href=\"{$href}\" class=\"ftr__page-link$ftr_link_class\">$pages[$i]</a>";
			} ?>
		</div>
		<div class="logo ftr__logo">
			<span class="logo__text">Бриллианты Костромы</span>
		</div>
		<div class="ftr__copy-wrap">
			<span class="ftr__copy">&copy; <?php echo date('Y'); ?> <q>Бриллианты Костромы</q></span>
			<button type="button" class="ftr__privacy-policy-btn">Политика конфиденциальности</button>
		</div>
		<div class="ftr__links-wrap">
			<a href="https://best-brilliant.ru/" rel="noopener noreferrer nofollow" target="_blank" class="ftr__site-link site-link">Основной сайт</a>
			<a href="https://media-bay.ru/" rel="noopener noreferrer nofollow" target="_blank" class="ftr__dev-link"><span>Разработка - </span></a>
		</div>
	</footer>

	<div class="trying-popup">
		<button type="button" class="trying-popup__close">
			<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M15 1L1 15M1 1L15 15" stroke="#987A6E"/>
			</svg>
		</button>
		<b class="trying-popup__title">Оформление примерки</b>
		<p class="trying-popup__desc">Заполните форму, и мы свяжемся с вами для подтверждения примерки и уточнения деталей.</p>
		<div class="trying-popup__product catalog-card">
			<img src="#" alt="#" class="catalog-card__img">
			<div class="catalog-card__title-block">
				<strong class="catalog-card__title">-</strong>
				<button type="button" class="catalog-card__info-btn">
	        <i class="info-icon">i</i>
	        <span class="info-dropdown">ct - означает карат камня<br>0/0 - означает чистоту камня</span>
	      </button>
			</div>
			<b class="catalog-card__desc">-</b>
			<div class="catalog-card__weight-block">
				<span class="catalog-card__weight-title">Вес</span>
				<div class="catalog-card__dots"></div>
				<span class="catalog-card__weight">-</span>
			</div>
			<div class="catalog-card__metal-block">
				<span class="catalog-card__metal-title">Металл</span>
				<div class="catalog-card__dots"></div>
				<span class="catalog-card__metal">-</span>
			</div>
			<div class="catalog-card__gems-block">
			</div>
		</div>
		<div class="trying-popup__form-wrap">
			<?php echo do_shortcode( '[contact-form-7 id="366" title="Оформление примерки" html_class="form trying-popup__form"]' ); ?>
		</div>
	</div>

	<div class="thanks-popup">
		<button type="button" class="thanks-popup__close">
			<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M15 1L1 15M1 1L15 15" stroke="#987A6E"/>
			</svg>
		</button>
		<b class="thanks-popup__title">Спасибо за обращение</b>
		<p class="thanks-popup__desc">Скоро мы свяжемся с Вами и все обсудим</p>
	</div>

	<div class="gallery-popup">
		<button type="button" class="gallery-popup__close">
			<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M15 1L1 15M1 1L15 15" stroke="#fff"/>
			</svg>
		</button>
		<div class="gallery-popup-slider">
			<div class="gallery-popup-slider__arrows"></div>
		</div>		
	</div>

	<div class="quiz-popup duplicate-title" data-title="Тест">
		<button type="button" class="quiz-popup__close close">
			<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M15 1L1 15M1 1L15 15" stroke="#987A6E"/>
			</svg>
		</button>
		<div class="loader-bg">
			<div class="loader"></div>
		</div>
		<p class="quiz-popup__title">Какой драгоценный камень вам подходит</p>
		<p class="quiz-popup__desc">Пройдите небольшой тест, чтобы определить какой камень вам лучше всего подходит.</p>
		<div class="quiz-form"></div>
		<div class="quiz-popup__thanks-wrap hide">
			<b class="quiz-popup__thanks-title">Спасибо</b>
			<p class="quiz-popup__thanks-desc">Ваш тест будет обрабатывать не бездушная машина, а живой человек.</p>
			<p class="quiz-popup__thanks-desc">Запаситесь терпением, ответ придёт в течение 24 часов. Наш специалист подберет для вас лучшие украшения и проконсультирует по всем вопросам!</p>
		</div>
		<div class="quiz-popup__form-wrap">
			<?php echo do_shortcode( '[contact-form-7 id="361" title="Тест-опрос" html_class="form quiz-popup__form hide"]' ); ?>
		</div>
		<button type="button" class="quiz-form__btn">
			<span>Дальше</span>
			<svg viewBox="0 0 14 5" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M0 4H12L8 1"/>
			</svg>
		</button>
		<div class="progress">
			<span class="progress__text">
					Готово: 
					<b class="progress__percent">0%</b>
				</span>
			<div class="progress__block">				
				<div class="progress__bar"></div>
			</div>
		</div>
	</div>

	<div class="video-popup">
		<div class="loader-bg">
				<div class="loader"></div>
			</div>
		<button type="button" class="video-popup__close">
			<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M15 1L1 15M1 1L15 15" stroke="#987A6E"/>
			</svg>
		</button>
	</div>
	
	<div class="overlay"></div>
	<div id="dir" data-dir="<?php echo get_template_directory_uri(); ?>"></div>
	<script>
		window.addEventListener('load',function(){setTimeout(function(){let scriptsSrc=["//maps.googleapis.com/maps/api/js?key=AIzaSyBy9wC4w-xoCIJiXVNKr6RawJSDnJV7nIA&callback=initMap","//api-maps.yandex.ru/2.1/?apikey=82596a7c-b060-47f9-9fb6-829f012a9f04&lang=ru_RU&load=SuggestView&onload=onLoad"];for(let a,b=0;b<scriptsSrc.length;b++)a=document.createElement("script"),a.setAttribute("async","async"),a.setAttribute("src",scriptsSrc[b]),document.body.appendChild(a)}, 1000)});function onLoad(ymaps){let suggestView=new ymaps.SuggestView('popup-user-city');let suggestView2=new ymaps.SuggestView('help-user-city')}function initMap(){let a={lat:57.757997,lng:40.986052},svg = '<svg width="32" height="44" viewBox="0 0 32 44" xmlns="http://www.w3.org/2000/svg" fill="none"><path d="M31.233 17.088c0 13.683-15.342 26.356-15.342 26.356s-15.342-12.673-15.342-26.356c0-9.438 6.869-17.088 15.342-17.088s15.342 7.651 15.342 17.088z" fill="<?php echo $page_color; ?>"/><path d="M13.382 14.198l.871 1.242-.029.037-1.066-.988-.352 4.107-.05.004-.337-3.963-.645.524-.047-.041.563-.918-4.597-.413-.001-.063 4.405-.401-.76-1.104.028-.043 1.052.816.337-3.735.05-.002.372 3.843 1.321-1.218.024.03-.972 1.442 9.896.225v.028l-10.063.591zM23.887 13.928c-2.094 2.361-4.151 4.683-6.208 7.004l.053.063 4.97-5.418.618 1.264-7.396 6.16-.036-.041 1.348-1.767c1.77-2.306 3.545-4.609 5.31-6.921.174-.228.359-.355.622-.345l.72.002zM15.338 22.964l-7.371-6.077.604-1.187 3.512 3.766-4.682-5.496c.307.017.605.023.901.055.075.008.157.084.212.154 2.271 2.885 4.54 5.774 6.807 8.661l.048.083-.03.041zM21.078 13.259l-2.575-.001c-.206 0-.159-.181-.158-.314l.033-3.17c.005-.664.001-1.329.001-1.993l.099-.07.131.244c.507.674 1.025 1.339 1.523 2.022.132.181.241.404.303.628.215.784.405 1.577.603 2.368l.039.285zM16.279 22.046l-.487.816-.026-.011.6-2.286c.556-2.083 1.118-4.164 1.664-6.251.062-.237.151-.326.359-.322.503.009 1.006.003 1.546.003l-.79 1.711c-.873 1.874-1.748 3.747-2.619 5.622l-.108.342-.139.377zM7.26 13.57l3.693-5.398.051.02-.414 2.657c-.114.733-.22 1.468-.346 2.197-.019.112-.12.285-.194.292-.9.089-1.803.154-2.79.231zM20.199 8.083l3.9 5.291-.789-.001-1.836-.031c-.141-.001-.23-.035-.267-.221-.325-1.598-.659-3.195-.989-4.792l-.018-.246zM14.055 13.053l1.281-2.062-.04-.054-.936.482-.022-.042 1.248-1.153 2.545 2.83-4.077-.001zM15.618 21.62l-1.912-6.164.051-.027 1.852 3.509 2.026-4.433.046.019-1.999 7.085-.063.011zM16.279 22.047l.139-.376c.3-.531.608-1.056.899-1.592 1.068-1.962 2.132-3.927 3.193-5.895.101-.187.207-.291.414-.278.348.021.697.006 1.062.006l-.095.172c-1.82 2.605-3.641 5.208-5.463 7.811l-.148.152zM17.444 11.855l-1.807-2.197-1.643 1.777-.063-.051 1.794-4.385 1.816 4.755-.097.101zM12.258 12.149l-1.194-.943-.336.444c-.091-.405.084-1.403.291-1.696l1.745-2.456.22-.282v1.603l-.037.011-.13-.927-.06-.004-.499 4.251zM15.355 22.437c-.628-1.649-1.213-3.322-1.9-4.939-.342-.807-.358-1.585-.242-2.415l.054-.15 2.137 7.492-.049.012zM8.887 14.127c.308 0 .561-.015.811.008.09.009.207.087.254.174.701 1.293 1.393 2.593 2.053 3.924l-3.118-4.106z" fill="#fff"/></svg>',b=new google.maps.Map(document.querySelector(".contacts-sect__map-block"),{center:a,zoom:14}),c=new google.maps.Marker({position:a,map:b,icon:{url:'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(svg)}});b.setOptions({styles:[{featureType:"administrative",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"landscape.man_made",elementType:"geometry",stylers:[{color:"#efebe2"}]},{featureType:"poi",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"poi.attraction",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"poi.business",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"poi.business",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"road.local",elementType:"geometry.fill",stylers:[{color:"#fbfbfb"}]}]})}</script>
	<?php wp_footer(); ?>
</body>
</html>