const path                  = require('path')
const MiniCssExtractPlugin  = require('mini-css-extract-plugin')

// const isDev = process.env.NODE_ENV === 'development'
// const makeFilename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

module.exports = {
	mode: 'development',
	entry: './src/scripts/index.js',
	// devtool: 'eval-source-map',
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	devServer: {
		historyApiFallback: true,
		contentBase: path.resolve(__dirname, 'dist'),
		open: true,
		compress: true,
		hot: true,
		port: 3000,
	},
	module: {
		rules: [

			// // Styles
			// {
			// 	test: /\.css$/i,
			// 	use: [
			// 		MiniCssExtractPlugin.loader,
			// 		'css-loader'
			// 	]
			// },

			// Styles
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					// {
					// 	loader: 'file-loader',
					// 	options: {
					// 		name: 'css/[name].[contenthash].css'
					// 	}
					// },
					// 'extract-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					// MediaQueryPlugin.loader,
					// 'postcss-loader',
					{
						loader: 'sass-loader',
						options: {
							implementation: require('sass'),
						}
					},
				],
			},

			// Scripts
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env', { 'targets': 'defaults' }]
						]
					}
				}
			}

		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: `./css/bundle.css`
		})
	]
}




// // const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
// const path = require('path')

// const isDev = process.env.NODE_ENV === 'dev'
// const isProd = !isDev

// const filename = (ext) => isDev ? `[name].${ext}`: `[name].[contenthash].${ext}`;

// module.exports = {
// 	context: path.resolve(__dirname, 'src'),
// 	mode: 'dev',
// 	entry: './scripts/index.js',
// 	output: {
// 		filename: `./js/${filename('js')}`
// 		path: path.resolve(__dirname, 'app')
// 	}
//     // ...
//     // plugins: [
//     //     new SVGSpritemapPlugin('images/icons/*.svg')
//     // ]
// }



// const path = require('path');

// module.exports = {
// 	entry: './src/index.tsx',
// 	// devtool: 'source-map',
// 	module: {
// 		rules: [
// 			{
// 				test: /\.tsx?$/,
// 				use: 'ts-loader',
// 				include: [path.resolve(__dirname, 'src')],
// 				exclude: /node_modules/,
// 			},
// 			// {
// 			// 	enforce: 'pre',
// 			// 	test: /\.js$/,
// 			// 	loader: 'source-map-loader'
// 			// }
// 		],
// 	},
// 	resolve: {
// 		extensions: [ '.tsx', '.ts', '.js', '.json' ],
// 	},
// 	output: {
// 		filename: 'bundle.js',
// 		path: path.resolve(__dirname, 'assets/js'),
// 		library: 'SD',
// 	},
// 	externals: {
// 		'react': 'React',
// 		'react-dom': 'ReactDOM'
// 	},
// 	target: ['web', 'browserslist']
// };
