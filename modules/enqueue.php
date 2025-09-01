<?php
/**
 * Enqueue scripts and styles.
 */
function webowski_scripts() {
	$templateDirectory = get_template_directory_uri();

	webowski_register_nouislider_assets();

	$styleVersion = filemtime( get_stylesheet_directory() . '/style.css' );
	wp_enqueue_style( 'webowski-style', get_stylesheet_uri(), array(), $styleVersion );
	wp_style_add_data( 'webowski-style', 'rtl', 'replace' );

	$scriptVersion = filemtime( get_stylesheet_directory() . '/scripts/bundle.min.js' );
	wp_enqueue_script( 'webowski-bundle', $templateDirectory . '/scripts/bundle.min.js', array(), $scriptVersion, true );

	if (!is_admin()) {
		// jQuery
		wp_deregister_script('jquery');
		wp_deregister_script('jquery-core-js');
		// wp_register_script('jquery', get_theme_file_uri('/node_modules/jquery/dist/jquery.min.js'), [], '3.2.1', true);
		// wp_enqueue_script('jquery');

		// jQuery Migrate
		// wp_deregister_script('jquery-migrate');
		// wp_enqueue_script('jquery-migrate', get_theme_file_uri('/node_modules/jquery-migrate/dist/jquery-migrate.min.js'), [], '3.0.1', false);
	}
}
add_action( 'wp_enqueue_scripts', 'webowski_scripts' );


function webowski_register_nouislider_assets() {
		$templateDirectory = get_template_directory_uri();

    wp_register_script(
        'nouislider',
        $templateDirectory . '/dependencies/nouislider/dist/nouislider.min.js',
        array(), null, true
    );
    wp_register_style(
        'nouislider',
        $templateDirectory . '/dependencies/nouislider/dist/nouislider.min.css'
    );
}
