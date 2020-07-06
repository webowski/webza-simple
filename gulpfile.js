const gulp =             require('gulp')

let tools = {
	fs:                  require('fs-extra'),
	path:                require('path'),
	rename:              require('gulp-rename'),

	browserSync:         require('browser-sync').create(),

	svgSprite:           require('gulp-svg-sprite'),
	svgmin:              require('gulp-svgmin'),

	sass:                require('gulp-sass'),
	csso:                require('gulp-csso'),
	autoprefixer:        require('gulp-autoprefixer'),
	cleanCSS:            require('gulp-clean-css'),
	concatCss:           require('gulp-concat-css'),
	postcss:             require('gulp-postcss'),
	postcssCustomProps:  require('postcss-custom-properties'),

	browserify:          require('browserify'),
	buffer:              require('vinyl-buffer'),
	babelify:            require('babelify'),
	source:              require('vinyl-source-stream'),
	streamify:           require('gulp-streamify'),
	uglify:              require('gulp-terser'),
	concat:              require('gulp-concat'),
}

tools.config = require('./build/config.js')();


const getTask = (task) => {
	return require('./build/' + task)(gulp, tools);
}

// Browsersync
gulp.task('browsersync',  getTask('browsersync'));

// Styles
gulp.task('styles',       getTask('styles'));

// Scripts
gulp.task('scripts',      getTask('scripts'))

// Vector icons sprite
gulp.task('icons',        getTask('icons'));

// Watch
gulp.task('watch',        getTask('watch'));

// Browser reload
gulp.task('browser-reload', () => { return tools.browserSync.reload() });

// Default
gulp.task('default', gulp.parallel(
	'icons',
	'scripts',
	'styles',
));

// Development
gulp.task('dev', gulp.parallel(
	'browsersync',
	'watch',
	'styles',
	'scripts',
	'icons',
));
