module.exports = (gulp, plugins) => {
	return function () {

		return gulp.src('./images/vector-icons/*.svg')
			// minify svg
			.pipe(plugins.svgmin({ js2svg: { pretty: true } }))
			// replace spaces with hyphens, get rid of the "-icon" postfix
			.pipe(plugins.rename(function (path) {
				path.basename = path.basename
					.replace(/\s/g, '-')
					.replace(/-icon/, '');
			}))
			.pipe(plugins.svgSprite({
				mode: {
					symbol: {
						dest: '',
						example: true,
						sprite: 'vector-icons.min.svg'
					},
					inline: false
				}
			}))
			.pipe(gulp.dest('./images/'))
			.pipe(plugins.browserSync.reload({stream: true}));

	}
}
