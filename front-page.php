<?php
add_filter('body_class', function($classes) {
	// $classes[] = 'g-headerHidden';
	return $classes;
});
get_header(); ?>

<main id="main-content">
	<?php get_template_part( 'template-parts/hero' ) ?>
	<?php get_template_part( 'template-parts/section', 'services' ) ?>
	<?php get_template_part( 'template-parts/section', 'examples' ) ?>
	<?php get_template_part( 'template-parts/section', 'features' ) ?>
	<?php get_template_part( 'template-parts/section', 'how-it-works' ) ?>
	<?php get_template_part( 'template-parts/section', 'contacts' ) ?>
</main>

<?php
get_footer();
