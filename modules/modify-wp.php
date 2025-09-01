<?php

/**
 * Check if necessary plugins installed
 */
add_action( 'wp_loaded', function () {
	if ( is_admin() ) return;

	$pluginsArray = [];

	if ( ! function_exists( 'pll__' ) )
		array_push( $pluginsArray, 'Polylang');

	if ( count($pluginsArray) ) {
		echo '<h1>Install and activate the following WordPress plugins</h1>';
		echo '<ul><li>' . implode('</li><li>', $pluginsArray) . '</li></ul>';
		exit();
	}
});


/**
 * Menu
 */
add_filter( 'nav_menu_css_class', function( $classes, $item, $args, $depth ) {
	$allowed = [
		'menu-item',
		// 'menu-item-type-post_type',
		// 'menu-item-object-page',
		'current-menu-item',
		// 'page_item',
		// 'page-item-2',
		// 'current_page_item',
		// 'menu-item-37',
	];

	return array_intersect( $classes, $allowed );
}, 10, 4 );

add_filter( 'nav_menu_item_id', '__return_empty_string' );
add_filter( 'nav_menu_id', '__return_empty_string' );


// define ('WPCF7_AUTOP', false );
add_filter( 'wpcf7_autop_or_not', '__return_false' );


// Разрешаем SVG только администраторам
add_filter('upload_mimes', function ($mimes) {
	if (current_user_can('administrator')) {
		$mimes['svg'] = 'image/svg+xml';
	}
	return $mimes;
});

// Отключаем проверку типа файла (иначе WordPress может не пропускать SVG)
add_filter('wp_check_filetype_and_ext', function ($data, $file, $filename, $mimes) {
	$ext = pathinfo($filename, PATHINFO_EXTENSION);
	if ($ext === 'svg') {
		$data['ext']  = 'svg';
		$data['type'] = 'image/svg+xml';
	}
	return $data;
}, 10, 4);

// превью SVG в медиабиблиотеке
add_action('admin_head', function () {
?>
	<style>
	/* Поддержка превью SVG в медиабиблиотеке */
	.attachment .thumbnail img[src$=".svg"],
	.attachment .thumbnail svg {
			width: 100% !important;
			height: auto !important;
	}
	</style>
<?php
});

// Очищаем SVG перед загрузкой (простейший безопасный фильтр)
add_filter('wp_handle_upload_prefilter', function ($file) {
	if ($file['type'] === 'image/svg+xml') {
		$svg = file_get_contents($file['tmp_name']);
		if (preg_match('/<script|onload=|onerror=|javascript:/i', $svg)) {
			$file['error'] = 'SVG содержит потенциально вредный код.';
		}
	}
	return $file;
});

/**
 * Получает SVG-код из медиабиблиотеки по слагу и добавляет к нему HTML-атрибуты.
 *
 * @param string $slug      Слаг (post_name) вложения.
 * @param array  $attrs     Ассоциативный массив атрибутов (например, ['class' => 'my-class', 'id' => 'my-id']).
 * @return string           Возвращает SVG-код с добавленными атрибутами или сообщение об ошибке.
 */
function get_svg_by_slug($slug, $attrs = []) {
	// Получаем "чистый" SVG-код с помощью кэширования
	$svg_content = get_cached_svg_content_by_slug($slug);

	if (strpos($svg_content, '<svg') === false) {
		// Если вернулась ошибка или пустая строка, просто возвращаем её
		return $svg_content;
	}

	// Магия добавления атрибутов
	if (!empty($attrs)) {
		$attr_string = '';
		foreach ($attrs as $key => $value) {
			// Очищаем атрибуты для безопасности
			$key = esc_attr($key);
			$value = esc_attr($value);
			$attr_string .= " $key=\"$value\""; // Собираем строку вида: class="my-class" id="my-id"
		}

		// Вставляем строку с атрибутами в тег <svg>
		// Ищем первое вхождение '<svg' и вставляем атрибуты после него
		$svg_content = preg_replace(
			'/<svg/',
			'<svg' . $attr_string,
			$svg_content,
			1 // Заменить только первое вхождение
		);
	}

	return $svg_content;
}

/**
 * Вспомогательная функция, которая отвечает только за получение SVG из файла с кэшированием.
 * Это помогает избежать дублирования кода.
 *
 * @param string $slug Слаг вложения.
 * @return string SVG-код или сообщение об ошибке.
 */
function get_cached_svg_content_by_slug($slug) {
	if (empty($slug)) {
		return '';
	}
	$slug = sanitize_title($slug);

	$transient_key = 'svg_slug_cache_' . $slug;

	$cached_svg = get_transient($transient_key);
	if ($cached_svg !== false) {
		return $cached_svg;
	}

	$args = [
		'post_type' => 'attachment', 'name' => $slug,
		'posts_per_page' => 1, 'post_status' => 'inherit',
	];
	$attachments = get_posts($args);

	if (empty($attachments)) {
		return '<!-- SVG со слагом "' . esc_attr($slug) . '" не найден. -->';
	}

	$file_path = get_attached_file($attachments[0]->ID);

	if (!$file_path || !file_exists($file_path) || strtolower(pathinfo($file_path, PATHINFO_EXTENSION)) !== 'svg') {
		return '<!-- Файл для слага "' . esc_attr($slug) . '" не является SVG. -->';
	}

	$svg_content = file_get_contents($file_path);

	// Remove unnecessary attributes
	$svg_content = preg_replace('/(width|height)="[^"]*"/i', '', $svg_content);

	set_transient($transient_key, $svg_content, HOUR_IN_SECONDS);

	return $svg_content;
}

/**
 * Удобная функция-обертка для вывода SVG по слагу с атрибутами
 */
function the_svg_by_slug($slug, $attrs = []) {
	echo get_svg_by_slug($slug, $attrs);
}


/**
 * Удаление классов из <body>
 * также нужно удалить всё что генерит get_post_class https://core.trac.wordpress.org/browser/tags/3.2.1/wp-includes/post-template.php
 */
add_filter('body_class', 'webowski_body_classes', 10, 2);

function webowski_body_classes( $wp_classes, $extra_classes ) {

	if ( !get_option('webowski_remove_id_classes')) return $wp_classes;

	$blacklist = [
		"home",
		"wp-singular",
		"blog",
		"page",
		"page-template-default",
		"archive",
		"single",
		"category",
		"tag",
		"error404",
		"logged-in",
		"admin-bar",
		"no-js",
	];
	$wp_classes = array_diff( $wp_classes, $blacklist );

	$post_types = [
		'post',
		'page',
		'product'
	];
	$wp_classes = array_filter($wp_classes, function($class) use ($post_types) {
		foreach ($post_types as $type) {
			if (preg_match('/^' . preg_quote($type, '/') . '-id-\\d+$/', $class)) {
				return false; // delete
			}
			if (strpos($class, 'wp-theme-') == 0) {
				return false;
			}
		}
		return true;
	});

	return array_merge( $wp_classes, (array) $extra_classes );
};
