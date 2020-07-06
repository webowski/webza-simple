module.exports = (gulp, tools) => {
	return function () {

		return gulp.src([
				'./node_modules/@glidejs/glide/dist/glide.min.js',
				'./node_modules/basiclightbox/dist/basicLightbox.min.js',
				'./scripts/app.js',
			])
			.pipe(tools.concat('app.min.js'))
			.pipe(tools.uglify({
				output: {
					comments: false,
				}
			}))
			.on('error', console.log.bind(console, '\007'))
			.pipe(gulp.dest('./scripts/'))

		// return tools.browserify([
		// 		'./scripts/app.js',
		// 	])
		// 	.transform(tools.babelify.configure({
		// 		presets: [
		// 			[
		// 				'@babel/preset-env',
		// 				{
		// 					"targets": {
		// 						"ie": "11",
		// 						// "esmodules": true,
		// 					},
		// 					"corejs": "^3.6.4",
		// 					"useBuiltIns": "usage",
		// 					// "modules": "commonjs",
		// 				}
		// 			],
		// 		],
		// 		// tools: ['transform-runtime']
		// 		// babel/preset-flow
		// 	}))
		// 	.bundle()
		// 	.pipe(tools.source('app.min.js'))
		// 	.pipe(tools.streamify(tools.uglify({
		// 		output: {
		// 			comments: false,
		// 		}
		// 	})))
		// 	.pipe(gulp.dest('./scripts/'))
		// 	.pipe(tools.browserSync.stream())
		// 	// .pipe(buffer())     // to continue using the stream

	}
}
