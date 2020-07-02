const gulp                = require('gulp');
const pump                = require('pump');
const rename              = require('gulp-rename');
const browserSync         = require('browser-sync').create();
const source              = require('vinyl-source-stream');
const streamify           = require('gulp-streamify');
// const buffer              = require('vinyl-buffer');

// packages for scripts
const uglify              = require('gulp-terser');
const concat              = require('gulp-concat');
const browserify          = require('browserify');
const babelify            = require('babelify');

// packages for styles
const sass                = require('gulp-sass');
const csso                = require('gulp-csso');
const autoprefixer        = require('gulp-autoprefixer');
const concatCss           = require('gulp-concat-css');
const cleanCSS            = require('gulp-clean-css');
const postcss             = require('gulp-postcss');
const postcssCustomProps  = require('postcss-custom-properties');

// packages for images
const svgSprite           = require('gulp-svg-sprite');
const svgmin              = require('gulp-svgmin')


// Browsersync
gulp.task('browsersync', function() {
	browserSync.init({
		ui: false,
		notify: false,
		logLevel: 'debug',
		open: false,
		proxy: 'http://test7.9111.ru',
		host: 'test7.9111.ru',
	});
});


// Styles
gulp.task('styles', gulp.series(
	() => {
		return gulp
			.src('./styles/main.scss')
			.pipe(sass({
				outputStyle: 'compressed'
			})
			.on('error', console.log.bind(console, '\007')))
			.pipe(postcss([
				// postcssImport(),
				postcssCustomProps(),
			]))
			.pipe(rename('main.min.css'))
			.pipe(gulp.dest('./styles/'))
			.pipe(browserSync.stream());
	},
	() => {
		return gulp
			.src([
				// './styles/to-redo.css',
				'./styles/main.min.css',
			])
			.pipe(concatCss('main.min.css'))
			.pipe(autoprefixer())
			.pipe(csso())
			.pipe(gulp.dest('./styles/'));
	},
));

// Styles old pure css
gulp.task('styles:pure', () => {
	return gulp
		.src(['./css/**/*.css', '!./css/admin/**/*'])
		.pipe(browserSync.stream());
});


// Scripts
gulp.task('scripts', () => {
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

	return browserify([
			'./scripts/app.js',
		])
		.transform(babelify.configure({
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
		.pipe(source('app.min.js'))
		.pipe(streamify(uglify({
			output: {
				comments: false,
			}
		})))
		.pipe(gulp.dest('./scripts/'))
		.pipe(browserSync.stream())
		// .pipe(buffer())     // to continue using the stream
})


// Scripts
gulp.task('scripts:concat', () => {

	// Head scripts
	gulp.src([
			'./js/js.js',
			'./js/regions.js',
			'./js/urist/urists.js',
		])
		.pipe(concat('head-scripts.min.js'))
		.pipe(uglify({
			output: {
				comments: false,
			}
		}))
		.on('error', console.log.bind(console, '\007'))
		.pipe(gulp.dest('./scripts/'))

	// Head scripts 2
	gulp.src([
			'./js/forum/forum.js',
			'./js/voting.js',
		])
		.pipe(concat('head-scripts-2.min.js'))
		.pipe(uglify({
			output: {
				comments: false,
			}
		}))
		.on('error', console.log.bind(console, '\007'))
		.pipe(gulp.dest('./scripts/'))

	// Footer scripts, before </body>
	return gulp.src([
			'./js/utils/uploader.js',
			'./node_modules/glider-js/glider.min.js',
			'./scripts/lib/autocomplete1.0.4/auto-complete.min.js',
			'./scripts/lib/fancybox-3.2.5/jquery.fancybox.min.js',
			'./scripts/lib/mustache/mustache2.3.0.min.js',
			'./js/chat/chat_modal.js',
			'./js/forum/editor.js',
			'./js/header/header.js',
			'./js/common.js',
		])
		.pipe(concat('footer-scripts.min.js'))
		.pipe(uglify({
			output: {
				comments: false,
			}
		}))
		.on('error', console.log.bind(console, '\007'))
		.pipe(gulp.dest('./scripts/'))
		.pipe(browserSync.stream())
})


// Vector icons sprite
gulp.task('icons', () => {
	return gulp.src('./images/vector-icons/*.svg')
		// minify svg
		.pipe(svgmin({ js2svg: { pretty: true } }))
		// replace spaces with hyphens, get rid of the "-icon" postfix
		.pipe(rename(function (path) {
			path.basename = path.basename
				.replace(/\s/g, '-')
				.replace(/-icon/, '');
		}))
		.pipe(svgSprite({
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
		.pipe(browserSync.reload({stream: true}));
});


// Vector icons sprite
gulp.task('icons:new', () => {
	return gulp.src('./images-new/vector-icons/*.svg')
		// minify svg
		.pipe(svgmin({ js2svg: { pretty: true } }))
		// replace spaces with hyphens, get rid of the "-icon" postfix
		.pipe(rename(function (path) {
			path.basename = path.basename
				.replace(/\s/g, '-')
				.replace(/-icon/, '');
		}))
		.pipe(svgSprite({
			mode: {
				symbol: {
					dest: '',
					example: true,
					sprite: 'vector-icons.min.svg'
				},
				inline: false
			}
		}))
		.pipe(gulp.dest('./images-new/'))
		.pipe(browserSync.reload({stream: true}));
});


gulp.task('minifycss', () => {
  return gulp.src(['./css/**/*'])
  .pipe(cleanCSS({debug: true}, (details) => {
    //console.log(`${details.name}: ${details.stats.originalSize}`);
    //console.log(`${details.name}: ${details.stats.minifiedSize}`);
  }))
  .pipe(gulp.dest('/home/www/9111_data/min/css'));
});


gulp.task('minifyjs', function (cb) {
  pump([
    gulp.src(['./js/**/*.js']),
    uglify(),
    gulp.dest('/home/www/9111_data/min/js')
   ],
   cb
   );
});


// Browser reload
gulp.task('browser-reload', () => {
	return browserSync.reload();
});


// Watch
gulp.task('watch', function(){

	// styles
	gulp.watch(
		[
			'styles/**/*.scss',
			'styles/**/*.css',
			'!styles/main.min.css',
		],
		{cwd: './'},
		gulp.series('styles')
	);

	// styles
	// gulp.watch(
	// 	[
	// 		'styles-new/**/*.css',
	// 		'!styles-new/main.min.css',
	// 	],
	// 	{cwd: './'},
	// 	gulp.series('styles:new')
	// );

	// old pure css
	gulp.watch(
		['css/**/*.css', '!css/admin/**/*'],
		{cwd: './'},
		gulp.series('styles:pure')
	);

	// scripts
	gulp.watch(
		[
			'js/**/*.js',
		],
		{cwd: './'},
		gulp.series('scripts:concat')
	)

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
	).on('change', browserSync.reload);

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

	// vector sprite new
	gulp.watch(
		['images-new/vector-icons/*.svg'],
		{cwd: './'},
		gulp.series('icons:new')
	);

	// images
	// gulp.watch(
	// 	'./images/**/*').on('change', browserSync.reload
	// );
});


gulp.task('default', gulp.parallel(
	'minifycss',
	'minifyjs',
	'icons',
	'scripts:concat',
	'icons:new',
	'scripts',
	'styles',
));


gulp.task('dev', gulp.parallel(
	'browsersync',
	'watch',
	'styles',
	'scripts:concat',
	'scripts',
	'icons',
	'icons:new',
));
