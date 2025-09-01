const svg = '/wp-content/themes/webza/images/icons.min.svg?v=10'

// var xhReq = new XMLHttpRequest();
// xhReq.open("HEAD", "My_File.xlsx", false);
// xhReq.send(null);
// var lastModified = xhReq.getResponseHeader("Last-Modified");
// document.write(lastModified);

fetch(svg)
	.then(response => {
		// console.dir(response.headers.get("Last-Modified"))
		return response.text()
	})
	.then(text => {
		let container = document.createElement('div')
		container.classList.add('visually-hidden')
		container.innerHTML = text;
		document.body.appendChild(container)
	})
	.catch((err) => {
		console.log( 'svg icons file not found:', svg)
	})
