module.exports = (gulp, tools) => {
	return function () {

		let syncConfig = {
			ui: false,
			notify: false,
			logLevel: 'debug',
			open: false,
			proxy: 'http://localhost',
			host: 'localhost',
		}

		if (tools.config.server && tools.config.server.host) {
			let host = tools.config.server.host

			syncConfig.proxy = 'http://' + host
			syncConfig.host = host
		}

		tools.browserSync.init( syncConfig );

	}
}
