module.exports = (gulp, plugins) => {
	return function () {

		// styles
		gulp.watch(
			[
				'styles/**/*.scss',
				'styles/**/*.css',
				'!styles/app.min.css',
			],
			{cwd: './'},
			gulp.series('styles')
		);

		// // scripts
		// gulp.watch(
		// 	[
		// 		'js/**/*.js',
		// 	],
		// 	{cwd: './'},
		// 	gulp.series('scripts:concat')
		// )

		// scripts new
		gulp.watch(
			[
				'scripts/**/*.js',
				'!scripts/app.min.js',
				'!scripts/head-scripts.min.js',
				'!scripts/footer-scripts.min.js',
			],
			{cwd: './'},
			gulp.series('scripts')
		);

		// markup etc.
		gulp.watch(
			[
				'templates/**/*.twig',
				'templates-new/**/*',
				'test/**/*.html',
				'content/**/*.php',
			],
			{cwd: './'},
		).on('change', plugins.browserSync.reload);

		// php
		// gulp.watch(
		// 	['**/*.php', '!vendor', '!test'],
		// 	// ['**/*.php'],
		// 	{cwd: './'},
		// 	gulp.series('browser-reload')
		// );

		// vector sprite
		gulp.watch(
			['images/vector-icons/*.svg'],
			{cwd: './'},
			gulp.series('icons')
		);

		// images
		// gulp.watch(
		// 	'./images/**/*').on('change', plugins.browserSync.reload
		// );

	}
}
