<section class="Section -beforeFooter bg-alter flex items-center" id="contacts">

	<div class="PageDecorOrigin">
		<img class="Section__decor w-110 -left-50" src="<?php the_template_uri() ?>/images/paporotnik.svg" alt="">
	</div>

	<div class="container">

		<h2 class="text-center mb-10"><?= __('Contacts', 'webza') ?></h2>

		<p class="sm:text-center mb-8">Write to me on Telegram <a href="https://t.me/<?= get_option('contact-telegram') ?>">@<?= get_option('contact-telegram') ?></a> or by email <a href="mailto:email@email.com">email@email.com</a></p>

		<div class="flex items-center justify-center gap-10">
			<a href="&#104;&#116;&#116;ps:&#47;&#47;t.&#109;e&#47;<?= get_option('contact-telegram') ?>" target="_blank" title="Telegram" class="IconLink text-(--major)">
				<svg class="Icon rect-8/8">
					<use href="#icon-telegram">
				</svg>
			</a>
		</div>

	</div>
</section>
