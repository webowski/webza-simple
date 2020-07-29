module.exports = (gulp, tools) => {
	return function () {

		let syncConfig = {
			ui: false,
			notify: false,
			logLevel: 'debug',
			open: false,

			// Host
			// proxy: 'http://localhost',
			// host: 'localhost',

			// Static
			server: {
				baseDir: "./"
			}
		}

		console.dir( syncConfig )

		if (tools.config.server && tools.config.server.host) {
			let host = tools.config.server.host

			syncConfig.proxy = 'http://' + host
			syncConfig.host = host
			delete syncConfig.server

			console.dir( syncConfig )
		}

		tools.browserSync.init( syncConfig );

	}
}
