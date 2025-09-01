<!doctype html>
<html <?php language_attributes(); ?> data-theme="<?php echo isset($_COOKIE['theme']) ? esc_attr($_COOKIE['theme']) : 'light'; ?>">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<?php if ( $themeColor = get_theme_mod('theme-color') ): ?>
		<meta name="theme-color" content="<?= esc_html( $themeColor ) ?>">
	<?php endif; ?>

	<?php wp_head(); ?>

	<script>
	// setting dark theme before DOM content is loading to avoid flicker
	if (window.localStorage.theme === 'dark' || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
		// prioritise local storage over system preference
		if (window.localStorage.theme !== 'light') {
			localStorage.setItem('theme', 'dark');
		}
	}
	</script>

	<?php if ( $headScripts = get_option('webowski-head-inline-scripts') ):
		echo $headScripts;
	endif; ?>

</head>
<body <?php body_class('g-disableTransitions'); ?>>
	<?php wp_body_open(); ?>

	<a class="skip-to-content" href="#main-content"><?= __("Skip to content", "webza") ?></a>

	<?php get_template_part( 'template-parts/site-preloader' ); ?>

	<div class="Wrap">

		<?php if ( is_front_page() ) :
			get_template_part( 'template-parts/header' );
		else:
			get_template_part( 'template-parts/header', "page" );
		endif ?>
