<?php get_header(); ?>

<main id="main-content" class="Section">
	<div class="container">

		<?php
		while ( have_posts() ) :
			the_post();

			get_template_part( 'template-parts/content', get_post_type() );

		endwhile;
		?>

	</div>
</main>

<?php
get_footer();
