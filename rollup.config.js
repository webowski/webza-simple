import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'

const dist = 'scripts/min'

export default {
	input: 'scripts/common.js',
	output: [
		{
			name: 'slider',
			file: `${dist}/bundle.umd.js`,
			format: 'iife',
			globals: {
				'swiper': 'Swiper'
			}
		}
	],
	plugins: [
		commonjs(),
		resolve(),
		babel({
			exclude: 'node_modules/..',
			babelHelpers: 'bundled'
		})
	]
}
