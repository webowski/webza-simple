// Vector icons sprite
// =======================

fetch('/images-new/vector-icons.min.svg')
	.then(response => response.text())
	.then(text => {
		let container = document.createElement('div')
		container.classList.add('visuallyHidden')
		container.innerHTML = text;
		document.body.appendChild(container)
	})
	.catch(console.error.bind(console))
