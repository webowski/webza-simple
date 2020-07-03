module.exports = (gulp, plugins) => {
	return function () {

		plugins.browserSync.init({
			ui: false,
			notify: false,
			logLevel: 'debug',
			open: false,
			proxy: 'http://test7.9111.ru',
			host: 'test7.9111.ru',
		})

	}
}
