const path = require('path');

module.exports = {
	entry: './src/index.tsx',
	// devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				include: [path.resolve(__dirname, 'src')],
				exclude: /node_modules/,
			},
			// {
			// 	enforce: 'pre',
			// 	test: /\.js$/,
			// 	loader: 'source-map-loader'
			// }
		],
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.js', '.json' ],
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'assets/js'),
		library: 'SD',
	},
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM'
	},
	target: ['web', 'browserslist']
};
