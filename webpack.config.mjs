import fs                from 'fs-extra'
import path, { resolve } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const __dirname = resolve()
const mode = process.env.NODE_ENV || 'development'
const target = mode === 'development' ? 'web' : 'browserslist'

const templates = fs
	.readdirSync(resolve(__dirname, 'src/templates/'))
	.filter(filename => {
		return filename.match(/\.hbs/)
	})
const templatesPlugins = []

templates.forEach(templateName => {
	templatesPlugins.push(
		new HtmlWebpackPlugin({
			template: 'templates/' + templateName,
			filename: templateName.replace('.hbs', '.html'),
			minify: false,
			inject: false,
			templateParameters: JSON.parse(
				fs.readFileSync(resolve('src/templates/base/data.json'))
			),
			cache: false
		})
	)
})

export default {
	mode: mode,
	context: __dirname + '/src',
	entry: {
    bundle: {
			import: resolve('./src/scripts/index.js'),
			filename: './scripts/[name].min.js'
		},
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
							resolve('src/templates/partials'),
							resolve('src/templates/components'),
						],
						// debug: true,
					}
				}]
			}

		]
	},

	plugins: [
		...templatesPlugins
	],

	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			handlebars: 'handlebars/dist/handlebars.js',
		}
	},
	target: target,
	// stats: {
	// 	children: true
	// },

	devtool: mode === 'development' ? 'source-map' : false,
	performance: {
		// hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000
	},

	watchOptions: {
		ignored: '**/node_modules',
	},

	devServer: {
		open: true,
    liveReload: true,
		hot: false,
    watchFiles: [
			resolve('src/templates/*.hbs')
		],
		port: 3000,
		static: {
			directory: resolve(__dirname, '/dist/'),
			staticOptions: {},
			publicPath: '/dist/',
			serveIndex: true,
			watch: false,
		}
	}
}
