export default class Icons {
	static async init(src) {
		try {
			const response = await fetch(src)
			const svg = await response.text()
			const container = document.createElement('div')
			container.classList.add('visuallyHidden')
			container.innerHTML = svg
			document.body.appendChild(container)
		} catch (error) {
			console.error(error)
		}
	}
}
