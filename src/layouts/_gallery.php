<section class="gallery-sect container">
  <h2 style="width:0;height:0;overflow:hidden;pointer-events:none;position:absolute;color:rgba(0,0,0,0)">Галерея</h2>
  <div class="gallery-slider">
    <?php 
      for ($i=1; $i < 9; $i++) {
        $src = get_template_directory_uri() . '/img/' . $title_en . '/img-' . $i . '.jpg';
        $big = get_template_directory_uri() . '/img/' . $title_en . '/img-' . $i . '.big.jpg';
        $alt = $title_ru . ' - фото ' . $i;
    ?>
        <button type="button" class="gallery-slider__img-wrap">
          <img src="#" data-src="<?php echo $src; ?>" alt="<?php echo $alt; ?>" title="<?php echo $alt; ?>" class="lazyload gallery-slider__img" data-big="<?php echo $big; ?>">
        </button>
    <?php
      } //end for
     ?>
  </div>
</section>