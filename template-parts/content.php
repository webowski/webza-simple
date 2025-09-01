<article>
	<header>
		<?php if ( is_singular() ) : ?>
			<h1><?php the_title() ?></h1>
		<?php else : ?>
			<h2><a href="' . esc_url( get_permalink() ) . '" rel="bookmark"><?php the_title() ?></a></h2>
		<?php endif; ?>
	</header>

	<div class="mt-8">
		<?php the_content(); ?>
	</div>
</article>
