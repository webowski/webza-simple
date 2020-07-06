
module.exports = (gulp, tools) => {

	let toCss = (style) => {

		let fileName = tools.path.parse(style).name

		console.log( fileName + '.css' )

		gulp.src(style)
			.pipe(tools.sass({
				outputStyle: 'compressed'
			})
			.on('error', console.log.bind(console, '\007')))
			.pipe(tools.postcss([
				// postcssImport(),
				tools.postcssCustomProps(),
			]))
			.pipe(tools.rename( fileName + '.min.css' ))
			.pipe(tools.autoprefixer())
			.pipe(tools.csso())
			.pipe(gulp.dest('./styles/min/'))
	}

	return function () {

		let styles = tools.config.styles

		styles.common.forEach( style => {
			toCss( style );
		})

		// gulp.series(
		// 	() => {
				return gulp
					.src('./styles/common.scss')
					.pipe(tools.sass({
						outputStyle: 'compressed'
					})
					.on('error', console.log.bind(console, '\007')))
					.pipe(tools.postcss([
						// postcssImport(),
						tools.postcssCustomProps(),
					]))
					.pipe(tools.rename('common.min.css'))
					.pipe(tools.autoprefixer())
					.pipe(tools.csso())
					.pipe(gulp.dest('./styles/'))
					.pipe(tools.browserSync.stream());
		// 	},
		// 	() => {
		// 		return gulp
		// 			.src([
		// 				// './styles/to-redo.css',
		// 				'./styles/common.min.css',
		// 			])
		// 			.pipe(concatCss('appp.min.css'))
		// 			.pipe(autoprefixer())
		// 			.pipe(csso())
		// 			.pipe(gulp.dest('./styles/'));
		// 	},
		// );

    };
}
