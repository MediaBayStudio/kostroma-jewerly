<?php
/*
	Template Name: Главная
*/

$current_url = site_url() . $_SERVER['REQUEST_URI'];

		$pages = get_posts( [
			'post_type' => 'page',
			'numberposts' => -1
		] );

		foreach ( $pages as $page ) {
			$page_link = get_the_permalink( $page );
			if ( $page_link === $current_url ) {
				$page_id = $page->ID;
				break;
			}
		}

	require 'header.php';

	require 'layouts/_hero.php';

	if ($title_en === 'jewelry') {
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