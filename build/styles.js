
module.exports = (gulp, tools) => {

	// add overriding scss variables to plugin scss
	const prependScss = vinyl => {

		let imports = [
			'./styles/base/_variables.scss',
			'./styles/base/_mixins.scss',
			'./styles/base/_mediaqueries.scss',
		]

		let scssPrepend = ''

		imports.forEach(function(line) {
			scssPrepend += '@import \'' + line + '\';\n'
		})

		let newContents = Buffer.concat([
			new Buffer( scssPrepend ),
			vinyl.contents
		])

		vinyl.contents = newContents

		return vinyl
	}

	// make a css destination folder
	const makeCssDest = vinyl => {

		vinyl.path = tools.path.relative(vinyl.cwd, vinyl.path)

		let file = {
			name:    tools.path.parse(vinyl.path).name,
			ext:     tools.path.parse(vinyl.path).ext,
			dir:     tools.path.dirname(vinyl.path)
		}

		let beginningsToRemove = tools.config.styles.beginningsToRemove

		beginningsToRemove.forEach(function(part) {
			let regexp = new RegExp('^' + part)
			file.dir = file.dir.replace(regexp, '')
		})

		file.dest = './styles/min/' + file.dir + '/'

		tools.fs.mkdirsSync( file.dest )

		return file.dest
	}

	// filter files array by extension
	const filterByExt = (files, ext) => {

		let filtered = []

		files.forEach( item => {
			if (tools.path.extname(item) === ext) {
				filtered.push(item)
			}
		})

		return filtered
	}

	return function () {

		// separate styles

		let styles = tools.config.styles
		let stylesScss = filterByExt( styles.plugins.concat(styles.specific), '.scss' )
		let stylesCss = filterByExt( styles.plugins.concat(styles.specific), '.css' )

		let streamSeparate = gulp.src(stylesScss, {
				cwd: './',
				nosort: true,
			})
			.pipe(tools.through.obj(function (vinyl, encoding, callback) {

				vinyl = prependScss(vinyl);

				callback(null, vinyl);
			}))
			.pipe(tools.sass({
					outputStyle: 'compressed'
				})
				.on('error', console.log.bind(console, '\007'))
			)
			.pipe(tools.postcss([
				// postcssImport(),
				tools.postcssCustomProps(),
			]))
			// add css files
			.pipe(gulp.src(stylesCss, {
				cwd: './',
				nosort: true,
			}))
			.pipe(tools.autoprefixer())
			.pipe(tools.csso())
			.pipe(tools.through.obj(function (vinyl, encoding, callback) {

				let cssDest = makeCssDest(vinyl)
				let cssPath = cssDest + vinyl.relative
				let cssContent = vinyl.contents.toString(encoding)

				tools.fs.outputFileSync( cssPath, cssContent, function(err) {
					console.log( err );
				})

				callback(null, vinyl);
			}))
			.pipe(tools.browserSync.stream())


		// common styles

		// собрать дополнения *.css из *.scss
		let stylesCommonAdds = styles.common.filter(item => {
			return ! item.match(/^styles\/common\.scss/)
		})

		let stylesAdditionalScss = filterByExt( stylesCommonAdds, '.scss' )
		// let streamAddsScss = gulp.src()

		// // склеить дополнения plugin.css и собранные *.css
		// let streamAddsCss = gulp.src()

		// // собрать common.css из common.scss
		// let streamCommonScss = gulp.src()

		// // склеить plugins.css + common.css
		// let streamCommonCss = gulp.src()


		let streamCommon = gulp.src( styles.common.concat( ['!**/*.css'] ), {
				cwd: './',
				nosort: true,
			})
			.pipe(tools.sass({
					outputStyle: 'compressed'
				})
				.on('error', console.log.bind(console, '\007'))
			)
			.pipe(tools.postcss([
				// postcssImport(),
				tools.postcssCustomProps(),
			]))
			// // add css files
			// .pipe(gulp.src(stylesCss, {
			// 	cwd: './',
			// 	nosort: true,
			// }))
			.pipe(tools.concatCss('common.css'))
			.pipe(tools.autoprefixer())
			.pipe(tools.csso())
			// .pipe(tools.through.obj(function (vinyl, encoding, callback) {

			// 	let cssDest = makeCssDest(vinyl)
			// 	let cssPath = cssDest + vinyl.relative
			// 	let cssContent = vinyl.contents.toString(encoding)

			// 	tools.fs.outputFileSync( cssPath, cssContent, function(err) {
			// 		console.log( err );
			// 	})

			// 	callback(null, vinyl);
			// }))
			.pipe(gulp.dest('./styles/min/'))
			.pipe(tools.browserSync.stream())

		// gulp.series(
		// 	() => {
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


		return tools.merge( streamSeparate, streamCommon )
    }
}
