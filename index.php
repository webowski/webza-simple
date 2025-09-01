<?php
get_header();
?>

<main class="Section" id="main-content">
	<div class="container">

		<?php
		if ( have_posts() ) :

			if ( is_home() && ! is_front_page() ) :
				?>
				<h1><?php single_post_title(); ?></h1>
				<?php
			endif;

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
