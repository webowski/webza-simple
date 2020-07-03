module.exports = (gulp, plugins) => {
	return function () {

		// gulp.series(
		// 	() => {
			return gulp
					.src('./styles/app.scss')
					.pipe(plugins.sass({
						outputStyle: 'compressed'
					})
					.on('error', console.log.bind(console, '\007')))
					.pipe(plugins.postcss([
						// postcssImport(),
						plugins.postcssCustomProps(),
					]))
					.pipe(plugins.rename('app.min.css'))
					.pipe(gulp.dest('./styles/'))
					.pipe(plugins.browserSync.stream());
		// 	},
		// 	() => {
		// 		return gulp
		// 			.src([
		// 				// './styles/to-redo.css',
		// 				'./styles/app.min.css',
		// 			])
		// 			.pipe(concatCss('app.min.css'))
		// 			.pipe(autoprefixer())
		// 			.pipe(csso())
		// 			.pipe(gulp.dest('./styles/'));
		// 	},
		// );

    };
}
