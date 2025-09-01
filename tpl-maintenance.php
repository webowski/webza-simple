<?php
/* Template Name: Under construction */
get_header();
?>

<main id="main-content">
	<article class="Section -beforeFooter">
		<div class="container max-w-200">

			<h1 class="text-center"><?php the_title(); ?></h1>
			<div class="text-center grid gap-4 items-center justify-center mt-5">

				<?php //echo do_blocks('<!-- wp:webowski/calculator {"attr1":"value1"} /-->'); ?>
				<?php the_content(); ?>

				<svg aria-hidden="true" class="rect-20/20	fill-brand mx-auto">
					<use href="#icon-maintenance"></use>
				</svg>
			</div>

		</div>
	</article>
</main>

<?php
get_footer();
