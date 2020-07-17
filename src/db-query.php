<?php 

require_once($_SERVER['DOCUMENT_ROOT'] . $folder . '/wp-config.php');
require_once($_SERVER['DOCUMENT_ROOT'] . $folder . '/wp-load.php');

$posts = get_posts(['post_type' => 'goods', 'numberposts' => -1]);
$products = [];
foreach($posts as $post) {
	$product = [
		'img' => get_field('goods_img')['url'],
		'article' => get_field('goods_article'),
		'title' => get_field('goods_title'),
		'gems' => get_field('goods_structure'),
		'price' => get_field('goods_price')
	];
	array_push($products, $product);	
};

print_r(json_encode($products));