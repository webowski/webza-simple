<?php
get_header();
?>

<main class="Section" id="main-content">
	<div class="container">
		<?php
		if ( have_posts() ) : ?>

			<h1 class="page-title"><?php
				printf(
					pll__( 'Search Results for: %s', 'webza' ),
					get_search_query()
				);
			?></h1>

			<?php
			while ( have_posts() ) :
				the_post();
				get_template_part( 'template-parts/content', 'search' );
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
