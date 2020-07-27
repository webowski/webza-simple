module.exports = (gulp, tools) => {

	return done => {

		const questions = [{
				type: 'input',
				name: 'host',
				message: 'Файл `config-special.js` будет перезаписан.\n  Введите свой тестовый адрес (например test.dev):'
			}, {
				type: 'input',
				name: 'setting',
				message: 'Setting'
			}]

		console.log('')

		const { prompt } = tools.prompt;

		prompt(questions)
			.then(res => {

				console.log(
					'\n',
					'Host `' + res.host + '` записан в `build/config-special.js`',
					'\n',
					'Setting is `' + res.setting + '`',
					'\n'
				)

				done()
			})
	}

}
