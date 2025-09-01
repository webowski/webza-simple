<?php get_header(); ?>

<main id="main-content">

	<div class="Section -beforeFooter">
		<div class="container">

			<h1 class="text-center"><?= __( '404. Page Not Found', 'webza' ) ?></h1>
			<div class="flex justify-center">
				<a href="<?= esc_url( pll_home_url() ); ?>" class="Button -alt"><?= __( 'Back to the homepage', 'webza' ) ?></a>
			</div>

		</div>
	</div>

</main>

<?php
get_footer();
