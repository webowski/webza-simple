<?php function webza_favicon_connect() { 
?>
	<link rel="icon" href="<?= get_template_directory_uri() ?>/images/favicon/favicon.svg?v=1756559343778" sizes="any" type="image/svg+xml">
	<link rel="icon" type="image/x-icon" href="<?= get_template_directory_uri() ?>/images/favicon/favicon.ico?v=1756559343778">
	<link rel="icon" type="image/png" sizes="16x16" href="<?= get_template_directory_uri() ?>/images/favicon/favicon-16x16.png?v=1756559343778">
	<link rel="icon" type="image/png" sizes="32x32" href="<?= get_template_directory_uri() ?>/images/favicon/favicon-32x32.png?v=1756559343778">
	<link rel="icon" type="image/png" sizes="48x48" href="<?= get_template_directory_uri() ?>/images/favicon/favicon-48x48.png?v=1756559343778">
	<link rel="manifest" href="<?= get_template_directory_uri() ?>/images/favicon/manifest.webmanifest?v=1756559343778">
	<meta name="mobile-web-app-capable" content="yes">
	<link rel="apple-touch-icon" sizes="180x180" href="<?= get_template_directory_uri() ?>/images/favicon/apple-touch-icon-180x180.png?v=1756559343778">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
	<meta name="apple-mobile-web-app-title" content="App">
	<link rel="yandex-tableau-widget" href="<?= get_template_directory_uri() ?>/images/favicon/yandex-browser-manifest.json?v=1756559343778">
<?php
}
add_action('wp_head', 'webza_favicon_connect');