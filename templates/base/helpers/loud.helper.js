// mixin picture(path, x2)
// 	- pathWebp = path.replace(/\.jpg|\.png/, ".webp")
// 	- alt = attributes.alt
// 	- delete attributes.alt

// 	if !x2
// 		picture&attributes(attributes)
// 			source(
// 				srcset="images/" + pathWebp
// 				type="image/webp"
// 			)
// 			img(
// 				src="images/" + path
// 				alt=alt
// 			)
// 	else
// 		- pathWebp2x = path.replace(/\.jpg|\.png/, "@2x.webp 2x")
// 		- path2x = path.replace(/(\.jpg|\.png)/, "@2x$1 2x")

// 		picture&attributes(attributes)
// 			source(
// 				srcset="images/" + pathWebp + ", images/" + pathWebp2x
// 				type="image/webp"
// 			)
// 			img(
// 				src="images/" + path
// 				srcset="images/" + path + ", images/" + path2x
// 				alt=alt
// 			)

// Handlebars.registerHelper('list', (context, options) => {
//   let output = '<ul>'

//   for (let i = 0, j = context.length; i < j; i++) {
//     output = output + '<li>' + options.fn(context[i]) + '</li>';
//   }

//   output += '</ul>'

//   return output
// });


// Handlebars.registerHelper('loud', function (aString) {
//   return aString.toUpperCase()
// })


// export default function loud(aString) {
//   return aString.toUpperCase()
// }

const loud = (aString) => {
  return aString.toUpperCase()
}

module.exports = loud
