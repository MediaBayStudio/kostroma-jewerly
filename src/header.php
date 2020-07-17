<!DOCTYPE html>
<html prefix="og: http://ogp.me/ns#" lang="ru-RU">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">

	<meta name="description" content="">
	<meta name="keywords" content="">

	<link rel="icon" type="image/png" sizes="32x32" href="<?php echo get_template_directory_uri() . '/favicon-32x32.png'?>">
	<link rel="icon" type="image/png" sizes="16x16" href="<?php echo get_template_directory_uri() . '/favicon-16x16.png' ?>">
	<link rel="manifest" href="<?php echo get_template_directory_uri() . '/site.webmanifest' ?>">
	<link rel="mask-icon" href="<?php echo get_template_directory_uri() . '/safari-pinned-tab.svg' ?>" color="#5bbad5">
	<meta name="msapplication-TileColor" content="#fcf9f7">
	<meta name="theme-color" content="#ffffff">

		<?php
		wp_head();

		$title_ru =  preg_replace( '/\s.*/', '', wp_get_document_title() );
		$title_en = preg_replace( '/.*\/(?!$)|\/(?=$)/', '', $current_url );
		$page_color = get_field( 'color', $page_id );
		$help_img = get_field( 'help_img', $page_id )['url'];

		if ($title_ru === "Бриллианты") {
			$title_ru = get_bloginfo('description');
			$title_en = 'jewelry';
			$page_color ='#D37979';
			$help_img = get_template_directory_uri() . '/img/help.jpg';
		}

		$placeholder = get_template_directory_uri() . "/img/img-placeholder.svg";
	?>

	<style>.btn{background-color:<?php echo $page_color; ?>}.btn::after,.btn::before{border: 1px solid <?php echo $page_color; ?>}.btn-ol{border:1px solid <?php echo $page_color; ?>}.quiz-form__btn{background-color:<?php echo $page_color; ?>}.progress__bar{background-color:<?php echo $page_color; ?>}.help-sect{background-image:url(<?php echo $placeholder; ?>)}.production-slider__slide-img,.delivery-card__img{color: <?php echo $page_color; ?>}.production-slider__slide-square{background-color:<?php echo $page_color; ?>}@media(min-width:575.98px){.help-sect{background-image:none;}}@media(min-width:991.98px){.help-sect{background-image:linear-gradient(to left,#FDFBFA,#FDFBFA),url(<?php echo $placeholder; ?>)}}@media(hover),(min-width:1024.98px){.btn-ol:hover{background-color:<?php echo $page_color; ?>}.quiz-form__btn:not(.disabled):hover{border-color:<?php echo $page_color; ?>}.catalog-block__catalog-card:hover .catalog-card__btn{background-color:<?php echo $page_color; ?>}}
	</style>
</head>
<body>
	<noscript>
Для полноценного использования сайта включите JavaScript в настройках вашего браузера.
  </noscript>
	<header class="hdr container flex">
		<a href="/" class="logo hdr__logo" title="На главную">
			<span class="logo__text">Бриллианты Костромы</span>
		</a>
		<nav class="hdr__nav">
			<a href="/" class="hdr__nav-link">Главная</a>
			<a href="#catalog" class="hdr__nav-link">Каталог</a>
			<a href="#delivery" class="hdr__nav-link">Примерка и доставка</a>
			<a href="#about" class="hdr__nav-link">О нас</a>
			<a href="#production" class="hdr__nav-link">Производство</a>
			<a href="#contacts" class="hdr__nav-link">Контакты</a>
		</nav>
		<button type="button" class="burger-btn">
			<svg viewBox="0 0 26 16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect width="1" height="1" class="burger-btn-line top"/>
				<rect width="1" height="1" class="burger-btn-line middle" x="4" y="7"/>
				<rect width="1" height="1" class="burger-btn-line bottom" y="14"/>
			</svg>
		</button>
		<aside class="mobile-menu hdr__mobile-menu duplicate-title menu-<?php echo $title_en; ?>" data-title="<?php echo $title_en; ?>">
			<a href="/" class="logo mobile-menu__logo">
				<span class="logo__text">Бриллианты Костромы</span>
			</a>
			<nav class="mobile-menu__nav">
				<a href="/" class="mobile-menu__link">Главная</a>
				<a href="#catalog" class="mobile-menu__link">Каталог</a>
				<a href="#delivery" class="mobile-menu__link">Примерка и доставка</a>
				<a href="#about" class="mobile-menu__link">О нас</a>
				<a href="#production" class="mobile-menu__link">Производство</a>
				<a href="#contacts" class="mobile-menu__link">Контакты</a>
			</nav>
			<div class="mobile-menu__contacts-block">
				<a href="tel:+74942422023" class="mobile-menu__tel">+7 (4942) 42-20-23</a>
				<a href="https://best-brilliant.ru/" class="mobile-menu__site-link"><span>Основной сайт</span></a>
			</div>			
		</aside>
	</header>