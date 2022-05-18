import fs                from 'fs-extra'
import path, { resolve } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const __dirname = resolve()
const mode = process.env.NODE_ENV || 'development'
const target = mode === 'development' ? 'web' : 'browserslist'

export default {
	mode: mode,
	context: __dirname + '/src',
	entry: {
    // bundle: {
		// 	import: resolve('./src/scripts/index.js'),
		// 	filename: './[name].js'
		// },
    // template: {
		// 	import: resolve('./src/templates/index.hbs'),
		// 	filename: './templates/[name].js'
		// },
	},
	// output: {
	// 	path: path.resolve('dist/scripts'),
	// },
	module: {
		rules: [

			// Templates
			{
				test: /\.hbs$/,
				use: [{
					loader: 'handlebars-loader',
					options: {
						helperDirs: [
							resolve('src/templates/base/helpers'),
						],
						partialDirs: [
							resolve('src/templates/layouts'),
							// resolve('src/templates/partials'),
							// resolve('src/templates/components'),
						],
						// debug: true,
					}
				}]
			}

		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'templates/index.hbs',
			// filename: (entryName) => './dist/' + entryName + '.html',
			filename: 'index.html',

			// template: 'templates/about.hbs',
			// filename: 'about.html',

			// template: 'templates/manual.hbs',
			// filename: 'manual.html',

			minify: false,
			inject: false,
			templateParameters: JSON.parse(
				fs.readFileSync(resolve('src/templates/base/data.json'))
			)
		})
	],
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			handlebars: 'handlebars/dist/handlebars.js',
			// 'express-handlebars': 'handlebars/dist/handlebars.min.js'
		}
	},
	target: target,
	stats: {
		// children: true
	},
	watchOptions: {
		ignored: '**/node_modules',
	},
	devtool: mode === 'development' ? 'source-map' : false,
	performance: {
		// hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000
	},

	devServer: {
		static: {
			directory: __dirname + '/dist/',
			staticOptions: {},
			publicPath: '/',
			serveIndex: true,
			watch: true,
		}
	}
}
