module.exports = (gulp, plugins) => {
	return function () {

		// gulp.src([
		// 		'./node_modules/@glidejs/glide/dist/glide.min.js',
		// 		'./node_modules/basiclightbox/dist/basicLightbox.min.js',
		// 		'./scripts/app.js',
		// 	])
		// 	.pipe(concat('app.min.js'))
		// 	.pipe(uglify({
		// 		output: {
		// 			comments: false,
		// 		}
		// 	}))
		// 	.on('error', console.log.bind(console, '\007'))
		// 	.pipe(gulp.dest('./scripts/'))

		return plugins.browserify([
				'./scripts/app.js',
			])
			.transform(plugins.babelify.configure({
				presets: [
					[
						'@babel/preset-env',
						{
							"targets": {
								"ie": "11",
								// "esmodules": true,
							},
							"corejs": "^3.6.4",
							"useBuiltIns": "usage",
							// "modules": "commonjs",
						}
					],
				],
				// plugins: ['transform-runtime']
				// babel/preset-flow
			}))
			.bundle()
			.pipe(plugins.source('app.min.js'))
			.pipe(plugins.streamify(plugins.uglify({
				output: {
					comments: false,
				}
			})))
			.pipe(gulp.dest('./scripts/'))
			.pipe(plugins.browserSync.stream())
			// .pipe(buffer())     // to continue using the stream

	}
}
