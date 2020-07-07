
module.exports = (gulp, tools) => {

	let prepareCss = (path) => {

		let file = {
			name:    tools.path.parse(path).name,
			ext:     tools.path.parse(path).ext,
			selfDir: tools.path.dirname(path).replace('./node_modules/', ''),
		}

		file.dest = './styles/min/' + file.selfDir + '/'

		let imports = [
			'./styles/base/_variables.scss',
			'./styles/base/_mixins.scss',
			'./styles/base/_mediaqueries.scss',
		]

		let scssContent = ''

		imports.forEach(function(line) {
			scssContent += '@import \'' + line + '\';\n'
		})

		tools.fs.mkdirsSync( './styles/min/' + file.selfDir )

		if (file.ext === '.scss') {
			gulp.src(path)
				.pipe(tools.inject.prepend( scssContent ))
				.pipe(tools.sass({
						outputStyle: 'compressed'
					})
					.on('error', console.log.bind(console, '\007'))
				)
				.pipe(tools.postcss([
					// postcssImport(),
					tools.postcssCustomProps(),
				]))
				.pipe(tools.autoprefixer())
				.pipe(tools.csso())
				.pipe(gulp.dest( file.dest ))
		}

		// gulp.src(path)
		// 	.pipe(tools.sass({
		// 		outputStyle: 'compressed'
		// 	})
		// 	.on('error', console.log.bind(console, '\007')))
		// 	.pipe(tools.postcss([
		// 		// postcssImport(),
		// 		tools.postcssCustomProps(),
		// 	]))
		// 	.pipe(tools.rename( fileName + '.min.css' ))
		// 	.pipe(tools.autoprefixer())
		// 	.pipe(tools.csso())
		// 	.pipe(gulp.dest('./styles/min/'))


		// EXAMPLE
		// var sassStream,
		// 	cssStream;

		// //compile sass
		// sassStream = gulp.src('app.scss')
		// 	.pipe(sass({
		// 		errLogToConsole: true
		// 	}));

		// //select additional css files
		// cssStream = gulp.src('animate.css');

		// //merge the two streams and concatenate their contents into a single file
		// return merge(sassStream, cssStream)
		// 	.pipe(concat('app.css'))
		// 	.pipe(gulp.dest(paths.public + 'css/'));
	}

	return function () {

		let styles = tools.config.styles

		styles.plugins.forEach( path => {
			prepareCss( path )
		})

		// styles.specific.forEach( path => {
		// 	toCss( path )
		// })

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
