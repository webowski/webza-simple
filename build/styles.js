
module.exports = (gulp, tools) => {

	const prepareCss = (path, pathPartToRemove) => {

		let file = {
			name:    tools.path.parse(path).name,
			ext:     tools.path.parse(path).ext,
			selfDir: tools.path.dirname(path).replace('./', '')
		}

		if (pathPartToRemove) {
			file.selfDir = file.selfDir.replace(pathPartToRemove, '')
		}

		file.dest = './styles/min/' + file.selfDir + '/'

		let imports = [
			'./styles/base/_variables.scss',
			'./styles/base/_mixins.scss',
			'./styles/base/_mediaqueries.scss',
		]

		let scssPrepend = ''

		imports.forEach(function(line) {
			scssPrepend += '@import \'' + line + '\';\n'
		})

		tools.fs.mkdirsSync( './styles/min/' + file.selfDir )

		if (file.ext === '.scss') {

			// let fileData = fs.readFileSync(path)
			// let fileItself = fs.openSync(path, 'w+')
			// let filePrepend = new Buffer( scssPrepend )

			// fs.writeSync(fileItself, filePrepend, 0, filePrepend.length, 0)
			// fs.writeSync(fileItself, fileData, 0, fileData.length, filePrepend.length)

			// fs.close(fileItself, (err) => {
			// 	if (err) throw err;
			// });

			return gulp.src(path)
				.pipe(tools.inject.prepend( scssPrepend ))
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

		// // Plugins
		// styles.plugins.forEach( path => {
		// 	prepareCss( path, 'node_modules' )
		// })

		// // Specific
		// styles.specific.forEach( (path) => {
		// 	prepareCss( path, 'styles' )
		// })

		// // Common
		// prepareCss( './styles/common.scss', 'styles' )

		// done()

		let files = styles.plugins.concat(styles.specific)

		// gulp.series(
		// 	() => {
				return gulp.src(files)
					// .pipe(tools.inject.prepend( scssContent ))
					.pipe(
						tools.through.obj(function (vinylFile, encoding, callback) {
							var transformedFile = vinylFile.clone();

							// * contents can only be a Buffer, Stream, or null
							// * This allows us to modify the vinyl file in memory and prevents the need to write back to the file system.
							transformedFile.contents = new Buffer("whatever");

							// console.log( vinylFile.path.replace( vinylFile.cwd, '' ) );

							console.log( tools.path.relative(vinylFile.cwd, vinylFile.path) );

							// prepareCss(transformedFile.contents);

							// 3. pass along transformed file for use in next `pipe()`
							// callback(null, transformedFile);
							callback(null, vinylFile);
						})
					)
					.pipe(tools.sass({
							outputStyle: 'compressed'
						})
						.on('error', console.log.bind(console, '\007'))
					)
					// .pipe(gulp.src())
					.pipe(tools.postcss([
						// postcssImport(),
						tools.postcssCustomProps(),
					]))
					.pipe(tools.autoprefixer())
					.pipe(tools.csso())
					.pipe(gulp.dest( './styles/min' ))
					.pipe(tools.browserSync.stream())
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
