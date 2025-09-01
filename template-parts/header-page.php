<header class="Header -static">

	<a href="<?= esc_url( pll_home_url() ); ?>" class="SiteLogo justify-self-start">
		<svg width="64" height="64" viewBox="0 0 64 64">
			<rect x="0" y="0" width="64" height="64" rx="64" ry="64" fill="var(--brand)"/>
		</svg>
	</a>

	<nav id="site-navigation" class="NavMain do-spy" aria-label="<?= __('Main menu', 'webza') ?>">
		<?php
		wp_nav_menu([
			'theme_location' => 'menu-inner-page',
			'menu_id' => 'primary-menu',
			'container' => 'ul',
			'container_class' => false,
			'menu_class' => false,
		]);
		?>
	</nav>

	<div class="flex items-center gap-8	">
		<a href="&#104;&#116;&#116;ps:&#47;&#47;t.&#109;e&#47;<?= get_option('contact-telegram') ?>" target="_blank" title="Telegram" class="IconLink text-(--major) hover:text-primary">
			<svg class="Icon rect-7/7">
				<use href="#icon-telegram">
			</svg>
		</a>

		<ul class="LangSwitch max-md:hidden">
			<?php pll_the_languages(['hide_if_empty' => 0]); ?>
		</ul>

		<label class="ThemeSwitch max-md:hidden">
			<input type="checkbox" name="themeDark">
			<span></span>
		</label>
	</div>

	<button class="NavOpener">
		<span></span>
		<span></span>
		<span></span>
		<span></span>
	</button>

</header>

<nav class="NavMobile" aria-label="<?= __('Mobile navigation', 'webza') ?>">

	<div class="flex gap-8 items-center grow-1">
		<a class="IconLink text-(--major) hover:text-primary do-notCloseNav" href="&#104;&#116;&#116;ps:&#47;&#47;t.&#109;e&#47;" target="_blank" title="Telegram">
			<svg class="Icon rect-7/7">
				<use href="#icon-telegram">
			</svg>
		</a>
	</div>

	<div class="NavMain -mobile">
		<?php wp_nav_menu([
			'theme_location' => 'menu-inner-page',
			'menu_id' => 'primary-menu-mobile',
			'container' => 'ul',
			'container_class' => false,
			'menu_class' => false,
		]); ?>
	</div>

	<div class="flex gap-8 items-center">
		<ul class="LangSwitch do-notCloseNav">
			<?php pll_the_languages(['hide_if_empty' => 0]); ?>
		</ul>
		<label class="ThemeSwitch is-switched">
			<input type="checkbox" checked name="themeDark">
			<span></span>
		</label>
	</div>

</nav>
