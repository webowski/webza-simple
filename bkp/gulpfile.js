https://github.com/pepelsbey/playground/tree/master/25

import gulp from 'gulp'

// common
// import config from './build/config.js'
import buffer from 'vinyl-buffer'
import source from 'vinyl-source-stream'
import streamify from 'gulp-streamify'
	// import transform from 'vinyl-transform'
	// import str from 'string-to-stream'
	// import es from 'event-stream'
// import merge from 'merge2'
// import through from 'through2'
// import fs from 'fs-extra'
// import path from 'path'
// import rename from 'gulp-rename'

// server
import browserSync from 'browser-sync' //('browser-sync').create()

// graphic
import svgSprite from 'gulp-svg-sprite'
import svgmin from 'gulp-svgmin'

// styles
import sass from 'gulp-sass'
import csso from 'gulp-csso'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import concatCss from 'gulp-concat-css'
import pcss from 'gulp-postcss'
import pcssCustomProps from 'postcss-custom-properties'

// scripts
// import rollup from 'rollup'
// import babel from '@rollup/plugin-babel' //).default
// import resolve from '@rollup/plugin-node-resolve' //).default
// import commonjs from '@rollup/plugin-commonjs'
// import browserify from 'browserify'
// import babelify from 'babelify'
// import uglify from 'gulp-terser'
// import concat from 'gulp-concat'

// markup
// import htmlmin from 'gulp-htmlmin'
// import mustache from 'gulp-mustache'

// console output
// import prompt from 'enquirer'
// import chalk from 'chalk'

export const styles = (done) => {
	// sourcemaps !!!
	console.log( browserSync )
	done()
}

export default gulp.series(
	styles
)
