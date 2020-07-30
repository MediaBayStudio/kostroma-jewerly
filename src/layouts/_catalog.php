<section id="catalog" class="catalog-sect container">
  <h2 class="catalog-sect__title sect-title">Специально для вас</h2>
  <p class="catalog-sect__subtitle sect-subtitle">Мы собрали для вас лучшее из нашей коллекции</p>
  <div class="catalog-block">
    <div class="loader-bg">
      <div class="loader"></div>
    </div> <?php
      $posts = get_posts( [
        'post_type'     => 'post',
        'numberposts'   => -1,
        'category'      => $page_id
      ] );
      if ( count( $posts ) === 0 ) {
        echo "<p>Товаров не найдено</p>";
      }
      foreach ( $posts as $post ) {

        $post_options = get_field( 'jewerly_opt', $post );

        if ( !$post_options['visibility'] ) {
          continue;
        }

        $jewerly_article = $post->post_title;
        $jewerly_title = $post_options['title'];
        $jewerly_descr = $post_options['descr'];
        $jewerly_price = $post_options['price'];
        $jewerly_img = $post_options['img']['url'];
        $jewerly_alt = $post_options['img']['alt'];
        $jewerly_weight = $post_options['weight'];
        $jewerly_metal = $post_options['metal'];
        $jewerly_properties = [
          'metal'   => $jewerly_metal,
          'weight'  => $jewerly_weight,
          'gems'    => []
        ];

        $gems_repeater = $post_options['gems_repeater'];

        if ( $gems_repeater ) {
          foreach ( $gems_repeater as $gem_fields ) {
            if ( $gem_fields['number'] ) {
              $gem_properties = [
                'title'   => $gem_fields['title'],
                'number'  => $gem_fields['number'],
                'weight'  => $gem_fields['weight'],
                'purity'  => $gem_fields['purity']
              ];

              array_push( $jewerly_properties['gems'], $gem_properties );
              $output = json_encode( $jewerly_properties );
            }
          }
        } else {
          $terms = get_terms();

          foreach ( $terms as $term ) {
            $gem_slug = $term->slug;
            $gem_fields = get_field( $gem_slug . '_opt' );

            if ( $gem_fields['number'] ) {
              $gem_properties = [
                'title'   => $term->name,
                'number'  => $gem_fields['number'],
                'weight'  => $gem_fields['weight'],
                'purity'  => $gem_fields['purity']
              ];

              array_push( $jewerly_properties['gems'], $gem_properties );
              $output = json_encode( $jewerly_properties );
            }
          } 
        } ?>
          <div class="catalog-card catalog-block__catalog-card hide" id="<?php echo $jewerly_article; ?>">
            <span class="hide"><?php echo $output; ?></span>
            <img src="#" alt="<?php echo $jewerly_alt; ?>" data-src="<?php echo $jewerly_img; ?>" class="catalog-card__img lazyload">
            <strong class="catalog-card__title"><?php echo $jewerly_title; ?></strong>
            <b class="catalog-card__desc"><?php echo $jewerly_descr; ?></b>
            <div class="catalog-card__bottom flex">
              <b class="catalog-card__price"><?php echo $jewerly_price; ?>.-</b>
              <button type="button" class="catalog-card__btn btn-ol">
                <span class="catalog-card__btn-text">Примерить</span>
              </button>
            </div>
          </div> <?php
        } ?>
      
    <div class="catalog-block__dots dots"></div>
  </div>
  <button type="button" class="catalog-block__more-btn hide"><span>Еще</span></button>
</section>