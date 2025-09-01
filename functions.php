<?php

if ( ! function_exists( 'webowski_setup' ) ) :
	function webowski_setup() {

		load_theme_textdomain( 'webza', get_template_directory() . '/languages' );

		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );

		// Default core markup
		add_theme_support( 'html5', [
			'style',
			'script',
			'search-form',
			'gallery',
			'caption',
			'comment-form',
			'comment-list',
		]);

		register_nav_menus([
			'menu-front-page' => esc_html__( 'Front page', 'webza' ),
			'menu-inner-page' => esc_html__( 'Inner page', 'webza' ),
		]);
	}
endif;
// after_setup_theme hook runs before the init hook. The init hook is too late for some features, such as indicating support for post thumbnails
add_action( 'after_setup_theme', 'webowski_setup' );

add_action( 'admin_init', function() {
	load_theme_textdomain( 'webza', get_template_directory() . '/languages' );
});

/**
 * Manage urls
 */
require get_template_directory() . '/modules/manage-urls.php';

/**
 * Fonts.
 */
require get_template_directory() . '/modules/fonts.php';

/**
 * Favicon. Generated html
 */
require get_template_directory() . '/images/favicon/favicon.php';

/**
 * Enqueue scripts and styles.
 */
require get_template_directory() . '/modules/enqueue.php';

/**
 * Post types
 */
require get_template_directory() . '/modules/post-types.php';

/**
 * Hooking into WordPress
 */
require get_template_directory() . '/modules/template-functions.php';

/**
 * Cleans WP from unnecessary code: scripts, tags, CSS-classes etc.
 */
require get_template_directory() . '/modules/clean.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/modules/customizer.php';

/**
 * Mofify Wordpress
 */
require get_template_directory() . '/modules/modify-wp.php';

/**
 * Admin panel
 */
require get_template_directory() . '/modules/adminpanel.php';
require get_template_directory() . '/modules/theme-options.php';

/**
 * Meta Open Graph
 */
require get_template_directory() . '/modules/meta-og.php';

/**
 * Breadcrumb List for SEO
*/
require get_template_directory() . '/modules/structured-data-breadcrumb-list.php';
