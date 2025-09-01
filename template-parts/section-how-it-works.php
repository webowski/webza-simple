<section class="Section -screen h-screen_ h-before-footer flex flex-col items-center justify-center w-[100%]" id="sequence">

	<div class="container max-w-180 mb-8">
		<h2 class="sm:text-center"><?= __('How it works', 'webza') ?></h2>
	</div>

	<div class="Slider px-(--padding-x) max-w-200"
		data-options='{
			"speed": 200,
			"loop": false,
			"slidesPerView": 1
		}'>
		<div class="swiper-container overflow-hidden">
			<div class="swiper-wrapper">
				<?php
				$loop = new WP_Query([
					'post_type'      => 'step',
					'posts_per_page' => -1,
					'order'          => 'ASC',
				]);
				$i = 1;

				while ( $loop->have_posts() ) : $loop->the_post(); ?>
					<div class="swiper-slide Step">
						<div class="Step__inner">

							<h3 class="mb-[.875em] text-shadow font-extrabold border-s-4 pl-3 border-accent text-trim">
								<span class="font-normal text-md block text-major"><?= __('Step', 'webza') ?> <?= $i ?>.</span>
								<span class=""><?php echo strip_tags(get_the_title()) ?></span>
							</h3>
							<?php the_content() ?>

						</div>
					</div>
					<?php
					$i++;
				endwhile;
				wp_reset_postdata(); ?>
			</div>
		</div>

		<div class="Slider__prev">
			<svg aria-hidden="true">
				<use href="#icon-chevron"></use>
			</svg>
		</div>

		<div class="Slider__next">
			<svg aria-hidden="true">
				<use href="#icon-chevron"></use>
			</svg>
		</div>

		<div class="Slider__pagination mt-4"></div>
	</div>
</section>

<div class="Section pt-0">
	<div class="container w-[stretch] flex gap-5 sm:gap-2 max-sm:flex-wrap justify-center items-center">

		<a href="" class="Button max-w-50 w-full"><?= __('Order', 'webza') ?></a>

	</div>
</div>
