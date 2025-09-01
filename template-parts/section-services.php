<section class="Section pb-10 overflow-x-hidden" id="services">

	<div class="container max-w-230 mb-8">
		<h2 class="sm:text-center"><?= __('Services', 'webza') ?></h2>
	</div>

	<div class="Slider -hideOnStart container"
		data-options='{
			"speed": 200,
			"rewind": false,
			"spaceBetween": 32,
			"slidesPerView": 1,
			"breakpoints": {
				"768": {
					"spaceBetween": 24,
					"slidesPerView": 2
				},
				"1200": {
					"spaceBetween": 24,
					"slidesPerView": 3
				}
			}
		}'>
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<?php
				$loop = new WP_Query([
					'post_type'      => 'service',
					'posts_per_page' => -1,
				]);

				while ( $loop->have_posts() ) :
					$loop->the_post();
					?>
					<div class="swiper-slide flex items-stretch">

						<article class="ServiceCard<?php echo get_field('emphasize_block') ? ' -emphasis' : '' ?>">
							<div class="ServiceCard__bg"></div>
							<div class="ServiceCard__body">
								<h4 class="mb-3"><?= get_the_title() ?></h4>
								<div><?= get_field('field_text') ?></div>
							</div>
							<footer class="ServiceCard__footer">
								<div class="ServiceCard__term">
									<svg class="rect-5/5 fill-current" aria-hidden="true">
										<use href="#icon-time">
									</svg>
									<span>
										<?php printf(
											pll__('from %s working days'),
											get_field("field_term")
										); ?>
									</span>
								</div>
								<div class="ServiceCard__price">
									<?php if(pll_current_language() == 'en'): ?>
										<span class="text-[.625em]">from</span> $<?php the_field('field_price') ?>
									<?php else: ?>
										<span class="text-[.75em]">от</span> <?php the_field('field_price') ?><span class="text-[.75em]"> тыс. </span> <span class="text-[.875em]">&#8381;</span>
									<?php endif ?>
								</div>
							</footer>
							<div class="ServiceCard__decor">
								<?php the_post_thumbnail('full', [
									'loading' => 'lazy',
								]) ?>
							</div>
						</article>

					</div>
					<?php
				endwhile;
				wp_reset_postdata();
				?>
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

		<div class="Slider__pagination mt-8"></div>
	</div>

	<div class="container gap-5 mt-10 flex justify-center items-center max-sm:flex-col">
		<a href="" class="Button"><?= __('Order', 'webza') ?></a>
	</div>

</section>
