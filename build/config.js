module.exports = () => {

	return {

		styles: {
			plugins: [
				'./node_modules/@glidejs/glide/src/assets/sass/glide.core.scss',
				'./node_modules/basiclightbox/src/styles/main.scss',
			],
			specific: [
				'./styles/specific/settings.scss',
			],
			common: [
				'./node_modules/@glidejs/glide/src/assets/sass/glide.core.scss',
				'./styles/common.scss',
			]
		},

		scripts: {
			plugins: [
				'plugins'
			],
			specific: [
				'./scripts/components/editor.js',
				'./scripts/pages/settings.js',
			],
			common: [
				'./scripts/common.js',
			]
		}
	}

}
