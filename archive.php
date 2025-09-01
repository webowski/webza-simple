<?php get_header(); ?>

<main class="Section" id="main-content">
	<div class="container">

		<?php if ( have_posts() ) : ?>

			<header class="page-header">
				<h1><?php the_archive_title() ?></h1>
				<div><?php the_archive_description() ?></div>
			</header>

			<?php
			while ( have_posts() ) :
				the_post();
				get_template_part( 'template-parts/content', get_post_type() );
			endwhile;

			the_posts_navigation();

		else :

			?><p>Nothing found</p><?php

		endif;
		?>

	</div>
</main>

<?php
get_footer();
