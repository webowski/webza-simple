import path, { resolve }        from 'path'
import fs                       from 'fs-extra'
import chalk                    from 'chalk'
import chokidar                 from 'chokidar'
import BeforeBuildPlugin        from 'before-build-webpack'
import MiniCssExtractPlugin     from 'mini-css-extract-plugin'
import HandlebarsPlugin         from 'handlebars-webpack-plugin'
import pretty                   from 'pretty'
import SVGSpritemapPlugin       from 'svg-spritemap-webpack-plugin'
import { VueLoaderPlugin }      from 'vue-loader'

const __dirname = resolve()
const mode = process.env.NODE_ENV || 'development'
const target = mode === 'development' ? 'web' : 'browserslist'

export default {
	mode: mode,

	context: __dirname,

	entry: {
		'styles/styles': './styles/index.scss',
		'scripts/bundle': './scripts/index.js',
	},

	output: {
		path: __dirname,
		filename: '[name].min.js',
		assetModuleFilename: 'images/[hash][ext][query]',
		chunkFilename: '[id].[chunkhash].js',
	},

	module: {
		rules: [

			// Styles
			{
				test: /\.(scss|css)$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: __dirname,
						}
					},
					{
						loader: 'css-loader',
						options: {
							url: false,
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									['postcss-preset-env'],
									// ['flex-gap-polyfill', ],
								]
							}
						}
					},
					'sass-loader',
				]
			},

			// Images
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				type: 'asset/resource',
			},

			// Scripts
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
						],
						cacheDirectory: true,
					}
				}
			},

			// Vue
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},

		]
	},

	plugins: [

		new BeforeBuildPlugin(function(stats, callback) {
			console.log( '\n' + chalk.blue.bold('Run webpack build') + ' on ' + chalk.green.bold(__dirname) )
			// cleanTwigCache(callback)
			callback()
		}),

		new MiniCssExtractPlugin({
			filename: '[name].min.css',
		}),

		new SVGSpritemapPlugin('./images/icons/*.svg', {
			output: {
				filename: 'images/icons.min.svg',
				svgo: false,
			},
			sprite: {
				prefix: false,
				generate: {
					title: false,
				}
			}
		}),

		new VueLoaderPlugin(),

		new HandlebarsPlugin({
			// path to hbs entry file(s). Also supports nested directories if write path.join(process.cwd(), "app", "src", "**", "*.hbs"),
			// entry: path.join(process.cwd(), "templates", "*.hbs"),
			entry: "./templates/*.hbs",
			// output path and filename(s). This should lie within the webpacks output-folder
			// if ommited, the input filepath stripped of its extension will be used
			output: path.join(process.cwd(), "dest", "[name].html"),
			// output: "./html/[name].html",
			// you can also add a [path] variable, which will emit the files with their relative path, like
			// output: path.join(process.cwd(), "build", [path], "[name].html"),

			// data passed to main hbs template: `main-template(data)`
			// data: require("./templates/base/data.json"),
			// or add it as filepath to rebuild data on change using webpack-dev-server
			data: path.join(__dirname, "templates/base/data.json"),
			// data: "./templates/base/data.json",

			// globbed path to partials, where folder/filename is unique
			partials: [
				path.join(process.cwd(), "templates", "{partials,components}", "*.hbs")
			],

			// register custom helpers. May be either a function or a glob-pattern
			helpers: {
				// nameOfHbsHelper: Function.prototype,
				// projectHelpers: path.join(process.cwd(), "app", "helpers", "*.helper.js")
				projectHelpers: path.join(process.cwd(), "templates", "base", "helpers", "*.helper.js")
			},

			// hooks
			// getTargetFilepath: function (filepath, outputTemplate) {},
			// getPartialId: function (filePath) {}
			onBeforeSetup: function (Handlebars) {},
			onBeforeAddPartials: function (Handlebars, partialsMap) {
				// register layout
				let tplPath = path.join(process.cwd(), "templates/partials/layout.hbs")
				let tplLayout = fs.readFileSync(tplPath, 'utf8')
				Handlebars.registerPartial('layout', tplLayout)
			},
			onBeforeCompile: function (Handlebars, templateContent) {},
			onBeforeRender: function (Handlebars, data, filename) {},
			onBeforeSave: function (Handlebars, resultHtml, filename) {
				resultHtml = pretty(resultHtml, {
					ocd: false
				})
				return resultHtml
			},
			onDone: function (Handlebars, filename) {}
		})
	],

	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			// 'vue': mode === 'development' ? 'vue/dist/vue.esm-browser' : 'vue/dist/vue.esm-browser.prod',
			'vue': 'vue/dist/vue.esm-browser',
		},
	},

	watchOptions: {
		ignored: '**/node_modules',
	},

	target: target,
	devtool: mode === 'development' ? 'source-map' : false,
	performance: {
		// hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000
	},

	// Host
	// devServer: {
	// 	before(app, server) {
	// 		console.log('before')
	// 		chokidar.watch([
	// 			'./**/*.php',
	// 			'./**/*.twig',
	// 			'./**/*.html',
	// 		], {
	// 			ignored: /(node_modules|cache)/,
	// 		}).on('all', function() {
	// 			// fs.rmdir('./cache/twig', { recursive: true })
	// 			server.sockWrite(server.sockets, 'content-changed');
	// 		})
	// 	},
	// 	host: 'site.loc',
	// 	port: 3000,
	// 	// proxy: {
	// 	// 	'/': {
	// 	// 		target: 'http://site.ru:3000',
	// 	// 	},
	// 	// },
	// 	// proxy: {
	// 	// 	'/api': 'http://localhost:3000',
	// 	// 	pathRewrite: { '^/api' : '' }
	// 	// },
	// 	// publicPath: '/',
	// 	// hot: true,
	// 	contentBase: __dirname,
	// 	watchContentBase: true,
	// },

	// Static
	devServer: {
		static: {
			directory: __dirname,
			staticOptions: {},
			publicPath: "/",
			serveIndex: true,
			watch: true,
		},
		setupMiddlewares: function(middlewares, devServer) {

			// middlewares.unshift({
			// 	name: 'before',
			// 	middleware: (req, res) => {
			// 		chokidar.watch([
			// 			'./**/*.php',
			// 			'./**/*.twig',
			// 			'./**/*.html',
			// 		], {
			// 			ignored: /(node_modules|cache)/,
			// 		}).on('all', function() {
			// 			// fs.rmdir('./cache/twig', { recursive: true })
			// 			console.log('chokidar')
			// 			devServer.sendMessage(devServer.sockets, 'content-changed');
			// 		})
			// 		res.send('Foo!')
			// 	}
			// })

			return middlewares
		},
	},

}

function cleanTwigCache(callback) {
	fs.emptyDir('./cache/twig')
		.then(() => {
			console.log(
				chalk.green( 'Twig cache is cleaned' )
			)
			callback()
		})
		.catch(err => {
			console.log(
				chalk.red( 'Twig cache is not cleaned' )
			)
			// console.error(err)
			callback()
		})
}
