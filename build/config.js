module.exports = () => {

	return {

		styles: {
			plugins: [
				'node_modules/@glidejs/glide/src/assets/sass/glide.core.scss',
				'node_modules/basiclightbox/src/styles/main.scss',
			],
			specific: [
				'styles/specific/settings.scss',
				'styles/specific/test.css',
			],
			// common will processed with concatenating
			common: [
				'node_modules/@glidejs/glide/src/assets/sass/glide.core.scss',
				'styles/common.scss',
			],
			beginningsToRemove: [
				'node_modules/',
				'styles/',
			],
		},

		scripts: {
			plugins: [
				'plugins'
			],
			specific: [
				'scripts/components/editor.js',
				'scripts/pages/settings.js',
			],
			// common will processed with concatenating
			common: [
				'scripts/common.js',
			],
			beginningsToRemove: [
				'node_modules/',
				'scripts/',
			],
		}
	}

}
