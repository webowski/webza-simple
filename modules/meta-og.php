<?php
function webowski_add_og_meta_tags() {
	if (is_admin()) return;

	/*global $post;

	$title = is_singular() ? get_the_title($post) : get_bloginfo('name');
	$description = is_singular() && has_excerpt($post) ? get_the_excerpt($post) : get_bloginfo('description');
	$url = is_singular() ? get_permalink($post) : home_url('/');
	$image = is_singular() && has_post_thumbnail($post)
			? get_the_post_thumbnail_url($post, 'large')
			: get_template_directory_uri() . '/images/og-default.jpg';

	?>
	<meta property="og:title" content="<?= esc_attr($title) ?>">
	<meta property="og:description" content="<?= esc_attr($description) ?>">
	<meta property="og:site_name" content="Webowski.ru">
	<meta property="og:type" content="website">
	<meta property="og:url" content="<?= esc_url($url) ?>">
	<meta property="og:locale" content="ru_RU">
	<meta property="og:image" content="<?= esc_url($image) ?>">
	<meta property="og:image:alt" content="<?= esc_attr($title) ?>">
	<meta property="og:image:type" content="image/jpeg">
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:title" content="<?= esc_attr($title) ?>">
	<meta name="twitter:description" content="<?= esc_attr($description) ?>">
	<meta name="twitter:image" content="<?= esc_url($image) ?>"> */ ?>

	<meta property="og:title" content="Большой Вебовски — разработка сайтов">
	<meta property="og:description" content="Разработка сайтов, лендингов и интернет-магазинов.">
	<meta property="og:site_name" content="Webowski.ru">
	<meta property="og:type" content="website">
	<meta property="og:url" content="https://webowski.ru">
	<meta property="og:locale" content="ru_RU">
	<meta property="og:image" content="https://webowski.ru/wp-content/uploads/2025/06/webowski.jpg">
	<meta property="og:image:width" content="1024">
	<meta property="og:image:height" content="510">
	<meta property="og:image:type" content="image/jpeg">
	<meta property="og:image:alt" content="Большой Вебовски — логотип и экран сайта">

	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:title" content="Большой Вебовски — разработка сайтов">
	<meta name="twitter:description" content="Разработка сайтов, лендингов и интернет-магазинов.">
	<meta name="twitter:image" content="https://webowski.ru/wp-content/uploads/2025/06/webowski.jpg">
  <?php
}
add_action('wp_head', 'webowski_add_og_meta_tags', 5); // можно указать приоритет
