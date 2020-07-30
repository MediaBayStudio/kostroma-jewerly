<?php
  $hero_img = 'url(' . get_field('hero_img', $post)['url'] . '), ';
  if ( is_front_page() ) {
    $hero_img = 'url(' . get_template_directory_uri() . "/img/hero.jpg), ";
  }
  $total_hero_img = $hero_img . 'url(' . $placeholder . ')' ?>
<section class="hero-sect container duplicate-title <?php echo $title_en; ?>" data-title="<?php echo $title_en; ?>">
  <h1 class="hero-sect__title"><?php echo $title_ru; ?></h1>
  <span class="hero-sect__subtitle">С  бриллиантами и драгоценными камнями</span>
  <button type="button" class="hero-sect__btn btn"><span class="hero-sect__btn-text">Подобрать</span></button>
  <div class="hero-sect__img lazyload" style="background-image: url(<?php echo $placeholder; ?>)" data-src="<?php echo $total_hero_img; ?>"></div>
</section>