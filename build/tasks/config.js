module.exports = (gulp, tools) => {
	return done => {

		const { prompt } = tools.prompt;
		const questions = [{
				type: 'input',
				name: 'host',
				message: 'Файл `build/config-special.js` будет перезаписан.\n  Введите свой тестовый адрес (например test.dev):'
			}]

		console.log('')

		prompt(questions)
			.then(res => {

				const file = './build/config-special.js'

				let content = `module.exports = () => {
	return {
		server: {
			host: '${res.host}',
		}
	}
}`;

				tools.fs.outputFileSync(file, content)

				console.log(
					'\n',
					'Host ' +
						tools.chalk.blue.bold( res.host ) +
						' записан в ' +
						tools.chalk.blue.bold( 'build/config-special.js' ),
					'\n'
				)
				done()
			})
			.catch(() => {
				return false
			})
	}
}
