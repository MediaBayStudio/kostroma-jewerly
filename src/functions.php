<?php 

add_filter('manage_posts_columns', 'add_views_column', 4);
add_filter( 'wpcf7_load_css', '__return_false' );
remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
remove_action( 'wp_head', 'wp_oembed_add_host_js' );
if( 'disable_gutenberg' ){
	add_filter( 'use_block_editor_for_post_type', '__return_false', 100 );

	remove_action( 'wp_enqueue_scripts', 'wp_common_block_scripts_and_styles' );

	add_action( 'admin_init', function(){
		remove_action( 'admin_notices', [ 'WP_Privacy_Policy_Content', 'notice' ] );
		add_action( 'edit_form_after_title', [ 'WP_Privacy_Policy_Content', 'notice' ] );
	} );
}

function add_views_column($columns){
	$num = 2; // после какой по счету колонки вставлять новые

	$new_columns = array(
		'img'		=> 'Миниатюра',
		'name'	=> 'Название',
		'descr' => 'Описание',
		'metal' => 'Металл',
		'gems'	=> 'Состав',
		'price'	=> 'Цена'
	);

	return array_slice($columns, 0, $num) + $new_columns + array_slice($columns, $num);
}

add_action('manage_posts_custom_column', 'fill_views_column', 5, 2);

function fill_views_column($colname, $post_id) {
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
		$terms = get_terms();

		$paragraph = '';

		foreach ($terms as $term) {
      $gem_slug = $term->slug;
      $gem_fields = get_field($gem_slug . '_opt');


            if ($gem_fields['number']) {
        $gem_name= $term->name;
        $paragraph .= $gem_name . '<br>';
      }
    }
    echo "<p $style>$paragraph</p>";
	} else if ($colname === 'price') {
		echo "<p $style>$fields[price]</p>";
	} else if ($colname === 'name') {
		echo "<p $style>$fields[title]</p>";
	}
}

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

function mihdan_add_defer_attribute($tag, $handle) {
  $handles = array(
    'slick-script',
    'lazyload-script',
		'validate-script',
		'MobileMenu-script',
		'simplePopup-script',
		'jquery-settings-script',
		// 'ymaps-script',
		// 'gmaps-script',
		'main-script'
  );

  // $async_scripts = ['ymaps-script', 'gmaps-script'];

       foreach($handles as $defer_script) {
      if ($defer_script === $handle) {
         return str_replace(' src', ' defer src', $tag);
      }
   }

  //  foreach($async_scripts as $script) {
		// if ($script === $handle) {
  //     return str_replace(' src', ' async src', $tag);
  //   }
  //  }

    return $tag;
}

add_filter('script_loader_tag', 'mihdan_add_defer_attribute', 10, 2);


add_action('init', 'register_posts_and_tax');

function register_posts_and_tax() {
	$posts = ['bracelet','brooch', 'earrings', 'necklace', 'pendant', 'pusets', 'rings'];
	$gems_names = ['Бриллиант', 'Изумруд', "Кварц", "Сапфир", "Корунд", "Топаз"];
	$gems = ['brilliant', 'izumrud', "kvarc", "sapfir", "korund", "topaz"];
	$metal_names = ["Золото"];
	$metal = ["zoloto"];

	$all_tax = array_merge($gems, $metal);

	$post_types = [
		'bracelet' 	=> ['Браслеты', 'Браслет'],
		'brooch' 		=> ['Броши', 'Брошь'],
		'earrings' 	=> ['Серьги', 'Серьги'],
		'necklace' 	=> ['Колье', 'Колье'],
		'pendant' 	=> ['Подвески', 'Подвеска'],
		'pusets' 		=> ['Пусеты', 'Пусеты'],
		'rings' 		=> ['Кольца', 'Кольцо']
	];


	foreach ($post_types as $type => $name) {
		register_post_type($type, [
			'labels'             => [
				'name'               => $name[0], // Основное название типа записи
				'singular_name'      => $name[1], // отдельное название записи типа Book
				'add_new'            => 'Добавить новый товар',
				'add_new_item'       => 'Добавление нового товара',
				'edit_item'          => 'Редактировать товар',
				'new_item'           => 'Новый товар',
				'view_item'          => 'Посмотреть товар',
				'search_items'       => 'Найти товар',
				'not_found'          => 'Ничего не найдено',
				'not_found_in_trash' => 'В корзине ничего не найдено',
				'parent_item_colon'  => '',
				'menu_name'          => $name[0]
			  ],
			'description'        => 'Рубрики для раздела вопросов', // описание таксономии
			'public'             => true,
			'publicly_queryable' => true,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'query_var'          => true,
			'rewrite'            => true,
			'capability_type'    => 'post',
			'has_archive'        => true,
			'hierarchical'       => false,
			'menu_position'      => 10,
			'supports'           => ['title', 'thumbnail'],
			'taxonomies'		 => $all_tax
		]);
	}

	register_taxonomy( 'gems', $posts, [ 
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
// add_action( 'init', 'create_taxonomy' );



// function create_taxonomy(){
	

// }

// add_filter( 'wpcf7_load_js', '__return_false' );
// add_filter( 'wpcf7_load_css', '__return_false' );
add_filter('wpcf7_autop_or_not', '__return_false');
add_filter('wpcf7_form_elements', function($content) {
    $content = preg_replace('/<(span).*?class="\s*(?:.*\s)?wpcf7-form-control-wrap(?:\s[^"]+)?\s*"[^\>]*>(.*)<\/\1>/i', '\2', $content);

    return $content;
});



add_action('admin_menu', 'remove_admin_menu');
function remove_admin_menu() {
	remove_menu_page('themes.php');
	remove_menu_page('edit.php');
	remove_menu_page('edit-comments.php');
}

function remove_admin_bar_links() {
	global $wp_admin_bar;
	$wp_admin_bar->remove_menu('new-content');
	$wp_admin_bar->remove_menu('new-link');
	$wp_admin_bar->remove_menu('comments');
	$wp_admin_bar->remove_menu('archive');
}
add_action( 'wp_before_admin_bar_render', 'remove_admin_bar_links' );
