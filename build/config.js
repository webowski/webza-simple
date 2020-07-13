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
				'styles/specific/test.css',
				'styles/common.scss',
			],
			beginningsToRemove: [
				'node_modules/',
				'styles/',
			],
			// prepend @imports for overriding scss variables of plugins or specific
			prependImports: [
				'styles/base/_variables.scss',
				'styles/base/_mixins.scss',
				'styles/base/_mediaqueries.scss',
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
