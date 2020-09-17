<?php
/*
	Template Name: Украшения
*/

	if ( is_category() ) {
		$post = get_category( get_query_var( 'cat' ), false );
		$page_id = $post->term_id;
		$title_ru = $post->name;
		$title_en = $post->slug;
	} else if ( is_front_page() ) {
		$post = get_post();
		$page_id = $post->ID;
		$title_ru = $post->post_title;
		$title_en = 'jewelry';
	}

	require 'header.php';

	require 'layouts/_hero.php';

	if ( is_front_page() ) {
		require 'layouts/_pages.php';
	} else {
		require 'layouts/_catalog.php';
	}
	
	require 'layouts/_delivery.php';
	require 'layouts/_help.php';
	require 'layouts/_about.php';
	require 'layouts/_production.php';
	require 'layouts/_gallery.php';
	require 'layouts/_contacts.php';
	
	require 'footer.php';