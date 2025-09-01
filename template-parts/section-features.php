<section class="Section pb-10" id="features">

	<picture class="PageDecor inset-0 h-full opacity-40" aria-hidden="true">
		<source srcset="<?php the_template_uri() ?>/images/bg-gradient.svg" media="(max-width: 800px)">
		<img class="max-md:object-cover object-top" src="<?php the_template_uri() ?>/images/bg-gradient.svg" alt="">
	</picture>

	<div class="container">

		<h2 class="mb-12"><?= __('Features', 'webza') ?></h2>

		<div class="grid md:grid-cols-2 grid-colum items-start gap-14">
			<div class="grid gap-12">

				<div class="gap-4 flex">
					<?php the_svg_by_slug("bulb", ["class" => "rect-6/6 *:fill-accent shrink-0", "aria-hidden" => "true"]) ?>
					<div>
						<h4>Feature 1</h4>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis eius nulla asperiores nesciunt laboriosam commodi explicabo nostrum.</p>
					</div>
				</div>

				<div class="gap-4 flex">
					<?php the_svg_by_slug("bulb", ["class" => "rect-6/6 *:fill-accent shrink-0", "aria-hidden" => "true"]) ?>
					<div>
						<h4>Feature 2</h4>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis eius nulla asperiores nesciunt laboriosam commodi explicabo nostrum.</p>
					</div>
				</div>

			</div>
			<div class="grid gap-12">

				<div class="gap-4 flex">
					<?php the_svg_by_slug("bulb", ["class" => "rect-6/6 *:fill-accent shrink-0", "aria-hidden" => "true"]) ?>
					<div>
						<h4>Feature 3</h4>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis eius nulla asperiores nesciunt laboriosam commodi explicabo nostrum.</p>
					</div>
				</div>

				<div class="gap-4 flex">
					<?php the_svg_by_slug("bulb", ["class" => "rect-6/6 *:fill-accent shrink-0", "aria-hidden" => "true"]) ?>
					<div>
						<h4>Feature 4</h4>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis eius nulla asperiores nesciunt laboriosam commodi explicabo nostrum.</p>
					</div>
				</div>

			</div>
		</div>

	</div>
</section>
