<section class="Section pb-10 overflow-x-hidden" id="examples">
	<div class="container mb-6">
		<h2 class="sm:text-center"><?= __('Examples', 'webza') ?></h2>
	</div>

	<div class="Slider"
		data-destroy-breakpoint="1024"
		data-options='{
			"speed": 200,
			"loop": false,
			"slidesPerView": 1,
			"spaceBetween": 0,
			"breakpoints": {
				"640": {"slidesPerView": 2},
				"1024": {"slidesPerView": 3}
			}
		}'>
		<div class="swiper-container">
			<div class="swiper-wrapper ExampleSet container px-0">

				<?php
				$loop = new WP_Query([
					'post_type'      => 'project',
					'posts_per_page' => -1,
				]);

				while ( $loop->have_posts() ) : $loop->the_post();
					?>
					<article class="ExampleCard swiper-slide">

						<?php
						the_post_thumbnail('large', [
							'height' => '',
							'class' => 'ExampleCard__image',
							'alt'   => trim(strip_tags( get_the_title() )),
							'loading' => 'lazy',
						]);
						?>

						<a href="<?= get_post_meta( $post->ID, '_project_url', true ); ?>" target="_blank" rel="noopener noreferrer">
							<ul class="ExampleCard__tags">
								<li><?= get_post_meta( $post->ID, '_project_type', true ); ?></li>
							</ul>

							<h4><?= get_the_title() ?></h4>

							<svg class="ExampleCard__icon" aria-hidden="true">
								<use href="#icon-external-link"></use>
							</svg>
						</a>

					</article>
					<?php
				endwhile;
				wp_reset_postdata();
				?>
			</div>
		</div>
		<div class="Slider__prev text-minor">
			<svg aria-hidden="true">
				<use href="#icon-chevron"></use>
			</svg>
		</div>
		<div class="Slider__next text-minor">
			<svg aria-hidden="true">
				<use href="#icon-chevron"></use>
			</svg>
		</div>
		<div class="Slider__pagination mt-8"></div>
	</div>

</section>
