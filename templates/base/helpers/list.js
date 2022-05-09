// Handlebars.registerHelper('list', (context, options) => {
// 	let data = {
// 		nav: [
// 			{ url: "http://www.yehudakatz.com", title: "Katz Got Your Tongue" },
// 			{ url: "http://www.sproutcore.com/block", title: "SproutCore Blog" }
// 		]
// 	}

//   let output = '<ul>'

//   for (let i = 0, j = data.nav.length; i < j; i++) {
//     output = output + '<li>' + options.fn(data.nav[i]) + '</li>';
//   }

//   output += '</ul>'

//   return output
// });



// const Handlebars = require('handlebars')

// Handlebars.registerHelper('list', (context, options) => {

// 	let data = {
// 		nav: [
// 			{ url: "http://www.yehudakatz.com", title: "Katz Got Your Tongue" },
// 			{ url: "http://www.sproutcore.com/block", title: "SproutCore Blog" }
// 		]
// 	}

// 	context = data.nav

//   let output = '<ul>'

//   for (let i = 0, j = context.length; i < j; i++) {
//     output = output + '<li>' + options.fn(context[i]) + '</li>';
//   }

//   output += '</ul>'

//   return output
// });


const prettify = require('html-prettify')

const list = (context, options) => {
	// let data = {
	// 	nav: [
	// 		{ url: "http://www.yehudakatz.com", title: "Katz Got Your Tongue" },
	// 		{ url: "http://www.sproutcore.com/block", title: "SproutCore Blog" }
	// 	]
	// }

	// context = data.nav

  let output = '<ul>\n'

  for (let i = 0, j = context.length; i < j; i++) {
    output = output + '\t<li>' + options.fn(context[i]) + '</li>\n';
  }

  output += '</ul>'

	output = prettify(output, {
		char: 'tab',
		count: 1
	})

  return output
}

module.exports = list
