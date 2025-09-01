<div class="Hero">

	<!-- <div class="Hero__bg">
		<?php the_post_thumbnail('full') ?>
	</div> -->

	<div class="Hero__container grid grid-rows-[1fr]">
		<div class="py-8 lg:pt-20 lg:pb-8 grid grid-cols-[1fr] lg:grid-cols-[1.15fr_.85fr] xl:grid-cols-[1.05fr_.95fr] items-end place-content-center gap-4 max-md:self-end">

			<div class="flex gap-3 lg:gap-4 flex-col">

				<?php
				$typingArray = [
					__('text1', 'webza'),
					__('text2', 'webza'),
					__('text3', 'webza'),
				];
				$heroTypingJSON = '["' . implode('","', $typingArray) . '"]';?>

				<h1 class="my-0"><?= __('Here the', 'webza') ?> <span class="text-accent do-typing" data-typing='<?= $heroTypingJSON ?>'>text1</span></h1>
				<p class="my-0 leading-lg"><?= __('Subheader', 'webza') ?></p>

			</div>
			<div class="flex gap-4 lg:gap-4 flex-col items-end pt-17 sm:pt-15 md:pt-10">
				<div class="w-full flex gap-4 lg:gap-5 max-sm:flex-wrap justify-end">

					<a href="<?= esc_url( pll_home_url() ); ?>brief/" class="Button max-w-50 w-full">
						<?= __('Request a quote', 'webza') ?>
					</a>

				</div>
			</div>

		</div>

	</div>
</div>
