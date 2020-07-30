<?php 



add_filter( 'wpcf7_load_css', '__return_false' );
remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
remove_action( 'wp_head', 'wp_oembed_add_host_js' );
if ( 'disable_gutenberg' ) {
	add_filter( 'use_block_editor_for_post_type', '__return_false', 100 );

	remove_action( 'wp_enqueue_scripts', 'wp_common_block_scripts_and_styles' );

	add_action( 'admin_init', function() {
		remove_action( 'admin_notices', [ 'WP_Privacy_Policy_Content', 'notice' ] );
		add_action( 'edit_form_after_title', [ 'WP_Privacy_Policy_Content', 'notice' ] );
	} );
}

add_filter('manage_posts_columns', 'add_views_column', 4);
function add_views_column( $columns ){
  $num = 1; // после какой по счету колонки вставлять новые

  $new_columns = [
    'title'       => 'Артикул',
    'img'         => 'Миниатюра',
    'name'        => 'Название',
    'descr'       => 'Описание',
    'metal'       => 'Металл',
    'gems'        => 'Состав',
    'price'       => 'Цена',
    'categories'  => 'Категория',
    'modified'    => 'Дата изменения',
    'date'        => 'Дата публикации'
  ];

  // return array_slice($columns, 0, $num) + $new_columns + array_slice($columns, $num);
  return array_slice($columns, 0, $num) + $new_columns;
}

add_action('manage_posts_custom_column', function( $colname, $post_id ) {
  $fields = get_field('jewerly_opt', $id);

  $style = $fields['visibility'] ? "" : "style='opacity: 0.25;'";

  if ($colname === 'img') {

    $src = $fields['img']['url'];
    echo "<img src='$src' width='75px' height='75px'>";

  } else if ($colname === 'descr') {
    echo "<p $style>$fields[descr]</p>";
  } else if ($colname === 'metal') {
    echo "<p $style>$fields[metal]</p>";
  } else if ($colname === 'gems') {
    $gems_repeater = $fields['gems_repeater'];

    if ( $gems_repeater ) {
      foreach ( $gems_repeater as $gem_fields ) {
        if ( $gem_fields['number'] ) {
          $paragraph .= $gem_fields['title'] . '<br>';
        }
      }
    } else {
      $terms = get_terms();

      $paragraph = '';

      foreach ( $terms as $term ) {
        $gem_slug = $term->slug;
        $gem_fields = get_field( $gem_slug . '_opt' );

        if ( $gem_fields['number'] ) {
          $gem_name= $term->name;
          $paragraph .= $gem_name . '<br>';
        }
      }
    }

    echo "<p $style>$paragraph</p>";
  } else if ($colname === 'price') {
    echo "<p $style>$fields[price]</p>";
  } else if ($colname === 'name') {
    echo "<p $style>$fields[title]</p>";
  } else if ($colname === 'modified') {
    echo "<p>" . get_the_modified_date( 'd.m.Y, G:i' ) . "</p>";
  } else if ($colname === 'tags') {
    return;
  }
}, 5, 2);

// добавляем возможность сортировать колонку
add_filter( 'manage_'.'edit-post'.'_sortable_columns', function( $sortable_columns ){
  $sortable_columns['modified'] = ['modified_modified', false];
  return $sortable_columns;
} );


add_action('wp_enqueue_scripts', 'styles');
add_action('wp_enqueue_scripts', 'scripts');
add_theme_support('title-tag');

function styles () {
	wp_enqueue_style('style', get_stylesheet_uri());

	wp_enqueue_style('main-style', get_template_directory_uri() . '/css/style.css', [], 'v1.0');

	wp_enqueue_style('420px-style', get_template_directory_uri() . '/css/style.420.css', [], 'v1.0', '(min-width: 419.98px)');
	wp_enqueue_style('576px-style', get_template_directory_uri() . '/css/style.576.css', [], 'v1.0', '(min-width: 575.98px)');
	wp_enqueue_style('767px-style', get_template_directory_uri() . '/css/style.768.css', [], 'v1.0', '(min-width: 767.98px)');
	wp_enqueue_style('992px-style', get_template_directory_uri() . '/css/style.992.css', [], 'v1.0', '(min-width: 991.98px)');
	wp_enqueue_style('1200px-style', get_template_directory_uri() . '/css/style.1200.css', [], 'v1.0', '(min-width: 1229.98px)');

	wp_enqueue_style('hover-style', get_template_directory_uri() . '/css/hover.css', [], 'v1.0', '(hover), (min-width: 1024.98px)');
}

function scripts () {	
	wp_enqueue_script('slick-script', get_template_directory_uri() . '/js/slick.min.js');
	wp_enqueue_script('lazyload-script', get_template_directory_uri() . '/js/lazy.min.js');
	wp_enqueue_script('validate-script', get_template_directory_uri() . '/js/jquery.validate.min.js');
	wp_enqueue_script('MobileMenu-script', get_template_directory_uri() . '/js/MobileMenu.min.js');
	wp_enqueue_script('simplePopup-script', get_template_directory_uri() . '/js/SimplePopup.min.js');
	wp_enqueue_script('jquery-settings-script', get_template_directory_uri() . '/js/jquery-settings/jquery-settings.js');
  // wp_enqueue_script('ymaps-script', '//api-maps.yandex.ru/2.1/?apikey=82596a7c-b060-47f9-9fb6-829f012a9f04&lang=ru_RU&load=SuggestView&onload=onLoad', [], '', true);
	// wp_enqueue_script('gmaps-script', '//maps.googleapis.com/maps/api/js?key=AIzaSyBy9wC4w-xoCIJiXVNKr6RawJSDnJV7nIA&callback=initMap', [], '', true);
	wp_enqueue_script('main-script', get_template_directory_uri() . '/js/main.js');

	wp_deregister_script('jquery-core');
	wp_deregister_script('jquery');

	wp_register_script('jquery-core', 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js', false, null, true);
	wp_register_script('jquery', false, ['jquery-core'], null, true);

	wp_enqueue_script('jquery');
}

add_filter( 'script_loader_tag', function( $tag, $handle ) {
  $handles = [
	  'slick-script',
	  'lazyload-script',
		'validate-script',
		'MobileMenu-script',
		'simplePopup-script',
		'jquery-settings-script',
		'main-script'
	];

   foreach( $handles as $defer_script ) {
    if ( $defer_script === $handle ) {
    	return str_replace(' src', ' defer src', $tag);
    };
  };
   
	return $tag;
}, 10, 2 );

// удаление ненужных миниатюр
add_filter( 'intermediate_image_sizes', function ( $sizes ) {
  // размеры которые нужно удалить
  return array_diff( $sizes, [
    'medium',
    'medium_large',
    'large',
    '1536x1536',
    '2048x2048',
  ] );
} );

add_action( 'init', function() {
	remove_post_type_support( 'post', 'editor' );
	remove_post_type_support( 'post', 'comments' );
  remove_post_type_support( 'page', 'editor' );
  add_post_type_support( 'post', 'thumbnail' );
} );


add_action('init', 'register_posts_and_tax');

function register_posts_and_tax() {
	$posts = ['bracelet','brooch', 'earrings', 'necklace', 'pendant', 'pusets', 'rings'];
	$gems_names = ['Бриллиант', 'Изумруд', "Кварц", "Сапфир", "Корунд", "Топаз"];
	$gems = ['brilliant', 'izumrud', "kvarc", "sapfir", "korund", "topaz"];
	$metal_names = ["Золото"];
	$metal = ["zoloto"];

	$all_tax = array_merge($gems, $metal);

	register_taxonomy( 'gems', ['post'], [ 
			'labels'                => [
				'name'              => 'Драгоценные камни',
				'singular_name'     => 'Драгоценный камень',
				'search_items'      => 'Найти',
				'all_items'         => 'Все',
				'view_item '        => 'Показать',
				'parent_item'       => 'Родитель',
				'parent_item_colon' => 'Родитель:',
				'edit_item'         => 'Изменить',
				'update_item'       => 'Обновить',
				'add_new_item'      => 'Добавить новый',
				'new_item_name'     => 'Добавить новый',
				'menu_name'         => 'Драгоценные камни',
			],
			'description'           => '', // описание таксономии
			'public'                => true,
			'hierarchical'          => false,

			'rewrite'               => true,
			'capabilities'          => array(),
			'meta_box_cb'           => null, // html метабокса. callback: `post_categories_meta_box` или `post_tags_meta_box`. false — метабокс отключен.
			'show_admin_column'     => false, // авто-создание колонки таксы в таблице ассоциированного типа записи. (с версии 3.5)
			'show_in_rest'          => null, // добавить в REST API
			'rest_base'             => null, // $taxonomy
		] );


	};

add_filter( 'taxonomy_labels_'.'category', 'change_labels_category' );
function change_labels_category( $labels ) {

  // Запишем лейблы для изменения в виде массива для удобства
  $my_labels = [
    'name'                  => 'Категории',
    'singular_name'         => 'Категория',
    'search_items'          => 'Поиск категорий',
    'all_items'             => 'Все категории',
    'parent_item'           => 'Родительская категория',
    'parent_item_colon'     => 'Родительская категория:',
    'edit_item'             => 'Изменить категорию',
    'view_item'             => 'Просмотреть категорию',
    'update_item'           => 'Обновить категорию',
    'add_new_item'          => 'Добавить новую категорию',
    'new_item_name'         => 'Название новой категории',
    'not_found'             => 'Категории не найдены',
    'no_terms'              => 'Категорий нет',
    'items_list_navigation' => 'Навигация по списку категорий',
    'items_list'            => 'Список категорий',
    'back_to_items'         => '← Назад к категориям',
    'menu_name'             => 'Категории',
  ];

  return $my_labels;
}

// Переименовываем записи
add_filter( 'post_type_labels_post', 'rename_posts_labels' );
function rename_posts_labels( $labels ){

  $new = [
    'name'                  => 'Товары',
    'singular_name'         => 'Товары',
    'add_new'               => 'Добавить товар',
    'add_new_item'          => 'Добавить товар',
    'edit_item'             => 'Редактировать товар',
    'new_item'              => 'Новый товар',
    'view_item'             => 'Просмотреть товар',
    'search_items'          => 'Поиск товаров',
    'not_found'             => 'Товаров не найдено.',
    'not_found_in_trash'    => 'Товаров в корзине не найдено.',
    'parent_item_colon'     => '',
    'all_items'             => 'Все товары',
    'archives'              => 'Архивы товаров',
    'insert_into_item'      => 'Вставить в товар',
    'uploaded_to_this_item' => 'Загруженные для этого товара',
    'featured_image'        => 'Миниатюра товара',
    'filter_items_list'     => 'Фильтровать список товаров',
    'items_list_navigation' => 'Навигация по списку товаров',
    'items_list'            => 'Список товаров',
    'menu_name'             => 'Товары',
    'name_admin_bar'        => 'Товар', // пункте "добавить"
  ];

  return (object) array_merge( (array) $labels, $new );
}

add_filter('wpcf7_autop_or_not', '__return_false');
add_filter('wpcf7_form_elements', function($content) {
    $content = preg_replace('/<(span).*?class="\s*(?:.*\s)?wpcf7-form-control-wrap(?:\s[^"]+)?\s*"[^\>]*>(.*)<\/\1>/i', '\2', $content);

    return $content;
});