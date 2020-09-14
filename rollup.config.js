import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'

const dist = 'scripts/min'

export default {
	input: 'scripts/common.js',
	output: [
		{
			name: 'slider',
			file: `${dist}/bundle.umd.js`,
			format: 'umd'
		}
	],
	external: [
		'swiper'
	],
	plugins: [
		resolve(),
		babel({
			exclude: 'node_modules/..',
			runtimeHelpers: false
		})
	]
}
