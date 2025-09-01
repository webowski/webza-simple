<?php
add_action('wp_head', 'add_breadcrumb_jsonld');

function add_breadcrumb_jsonld() {
	if (is_front_page()) return;

	$breadcrumbs = [];
	$position = 1;

	// Главная страница
	$breadcrumbs[] = [
		"@type" => "ListItem",
		"position" => $position++,
		"name" => "Главная",
		"item" => home_url()
	];

	if (is_singular()) {
		$post = get_queried_object();
		$ancestors = get_post_ancestors($post);
		$ancestors = array_reverse($ancestors);

		foreach ($ancestors as $ancestor_id) {
			$breadcrumbs[] = [
				"@type" => "ListItem",
				"position" => $position++,
				"name" => get_the_title($ancestor_id),
				"item" => get_permalink($ancestor_id)
			];
		}

		$breadcrumbs[] = [
			"@type" => "ListItem",
			"position" => $position++,
			"name" => get_the_title($post),
			"item" => get_permalink($post)
		];
	}

	$output = [
		"@context" => "https://schema.org",
		"@type" => "BreadcrumbList",
		"itemListElement" => $breadcrumbs
	];

	echo '<script type="application/ld+json">' . wp_json_encode($output, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>';
}
