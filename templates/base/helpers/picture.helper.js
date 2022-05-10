const Handlebars = require('handlebars')

const picture = (options) => {

	let src = options.hash.src
	delete options.hash.src

	let altText = ''
	if (options.hash.hasOwnProperty('alt')) {
		altText = options.hash.alt
		delete options.hash.alt
	}

	let attributes = []

	Object.keys(options.hash).forEach(key => {
		let escapedKey = Handlebars.escapeExpression(key)
		let escapedValue = Handlebars.escapeExpression(options.hash[key])
		attributes.unshift(escapedKey + '="' + escapedValue + '"')
	})

	attributes = attributes.join(' ')

	let path = src.replace('@2x', '')
	let pathWebp = path.replace(/\.jpg|\.png/, '.webp')

	let srcsetWebp = `${pathWebp}`
	let srcset = `${path}`

	let is2x = src.match(/@2x/)

	if (is2x) {
		let pathWebp2x = src.replace(/\.jpg|\.png/, '.webp 2x')
		let path2x = src + ' 2x'
		srcsetWebp = `${pathWebp}, ${pathWebp2x}`
		srcset = `${path}, ${path2x}`
	}

	let output = `<picture ${attributes}>
		<source srcset="${srcsetWebp}" type="image/webp">
		<img src="${path}" srcset="${srcset}" alt="${altText}">
	</picture>`

  return new Handlebars.SafeString(output)
}

module.exports = picture
