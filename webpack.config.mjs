import HtmlWebpackPlugin from 'html-webpack-plugin'
import path, { resolve } from 'path'

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
    template: {
			import: resolve('./src/templates/index.hbs'),
			filename: '../templates/index.html'
		},
	},
	output: {
		path: path.resolve('dist/scripts'),
	},
	module: {
		rules: [
			// Templates
			{
				test: /\.hbs$/,
				loader: "handlebars-loader"
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'templates/index.hbs'
		})
	],
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	target: target,
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
