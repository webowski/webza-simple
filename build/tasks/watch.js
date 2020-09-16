module.exports = (gulp, tools) => {
	return function () {

		// Styles
		gulp.watch(
			[
				'styles/**/*.scss',
				'styles/**/*.css',
				'!styles/min/**/*',
			],
			{cwd: './'},
			gulp.series('styles')
		)

		// Scripts
		gulp.watch(
			[
				'scripts/**/*.js',
				'!scripts/min/**/*',
				'!scripts/app.min.js',
				'!scripts/head-scripts.min.js',
				'!scripts/footer-scripts.min.js',
			],
			{cwd: './'},
			gulp.series('scripts')
		)

		// Markup etc.
		gulp.watch(
			[
				'templates/**/*.twig',
				'templates-new/**/*',
				'test/**/*.html',
				'content/**/*.php',
			],
			{cwd: './'},
		).on('change', tools.browserSync.reload)

		// Templates
		gulp.watch(
			[
				'templates/**/*.mustache',
			],
			{cwd: './'},
			gulp.series('templates')
		)

		// php
		// gulp.watch(
		// 	['**/*.php', '!vendor', '!test'],
		// 	// ['**/*.php'],
		// 	{cwd: './'},
		// 	gulp.series('browser-reload')
		// )

		// vector sprite
		gulp.watch(
			['images/vector-icons/*.svg'],
			{cwd: './'},
			gulp.series('icons')
		)

		// images
		// gulp.watch(
		// 	'./images/**/*').on('change', tools.browserSync.reload
		// )

	}
}
