<?php

/**
 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
 */
function webowski_pingback_header() {
	if ( is_singular() && pings_open() ) {
		printf( '<link rel="pingback" href="%s">', esc_url( get_bloginfo( 'pingback_url' ) ) );
	}
}
add_action( 'wp_head', 'webowski_pingback_header' );

/**
 * Template uri
 */
function the_template_uri() {
	echo get_template_directory_uri();
}

function get_template_uri() {
	return get_template_directory_uri();
}
