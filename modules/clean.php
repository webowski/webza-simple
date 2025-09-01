<?php

// Убирает <meta name="generator" content="WordPress 6.x.x">
remove_action('wp_head', 'wp_generator');

/**
 * Emoji polyfill
 */
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');

remove_action('admin_print_scripts', 'print_emoji_detection_script');
remove_action('admin_print_styles', 'print_emoji_styles');

remove_filter('the_content_feed', 'wp_staticize_emoji');
remove_filter('comment_text_rss', 'wp_staticize_emoji');
remove_filter('wp_mail', 'wp_staticize_emoji_for_email');


// Убрать oEmbed discovery-ссылки из <head> на фронте
if (!is_admin()) {
    remove_action('wp_head', 'wp_oembed_add_discovery_links');
    remove_action('wp_head', 'wp_oembed_add_host_js');
    remove_action('wp_enqueue_scripts', 'wp_oembed_add_host_js');
}

// RSD
remove_action('wp_head', 'rsd_link');

// Shortlink. Короткая ссылка на пост, типа ?p=123.
remove_action('wp_head', 'wp_shortlink_wp_head');

// Ссылки на предыдущий/следующий пост (SEO-пользы почти нет)
remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10);

// REST API
remove_action('wp_head', 'rest_output_link_wp_head', 10);
remove_action('wp_head', 'rest_output_link_header', 10);

// preview
add_filter('wp_robots', function( $robots ) {
    $robots['max-image-preview'] = 'standard';
    return $robots;
});


/**
 * Всё что затрагивает или может затронуть редактирование сайта
 */
if (!is_admin()) {
	// Guttenberg
	remove_action('wp_enqueue_scripts', 'wp_enqueue_global_styles');
	remove_action('enqueue_block_assets', 'wp_enqueue_global_styles');

	// Guttenberg
	function remove_block_library_css() {
    wp_dequeue_style('wp-block-library');
    wp_deregister_style('wp-block-library');
	}
	add_action('wp_enqueue_scripts', 'remove_block_library_css', 100);

	// Gutenberg JS HOOKS
	function dequeue_wp_hooks_script() {
    // wp_dequeue_script('wp-hooks');
    // wp_deregister_script('wp-hooks');
	}
	add_action('wp_enqueue_scripts', 'dequeue_wp_hooks_script', 100);

	// oEmbed REST endpoint только для внешнего сайта
	add_filter('rest_endpoints', function ($endpoints) {
		unset($endpoints['/oembed/1.0/embed']);
		unset($endpoints['/oembed/1.0/proxy']);
		return $endpoints;
	});

	add_action('wp_enqueue_scripts', function () {
			wp_dequeue_style('classic-theme-styles');
	});

	// wp block webowski-live-search
	function disable_live_search_block_style_frontend() {
		wp_dequeue_style('create-block-webowski-live-search-style');
		wp_deregister_style('create-block-webowski-live-search-style');
	}
	add_action('wp_enqueue_scripts', 'disable_live_search_block_style_frontend', 20);
}


/**
 * FUNCTIONS DISABLING
 */
function disable_feed_redirect() {
	if (is_feed()) {
		wp_redirect(home_url());
		exit;
	}
}
add_action('template_redirect', 'disable_feed_redirect');
