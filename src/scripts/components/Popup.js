export default class Popup {
	constructor(arg) {

		this.$popupOrigin = document.createElement('div')
    this.$popupOrigin.className = 'PopupOrigin'
		document.body.append(this.$popupOrigin)

		if (arg.html) {
			const wrapper = document.createElement('div')
			wrapper.innerHTML = arg.html.trim()
			this.$popup = wrapper.firstElementChild
			this.$popupOrigin.appendChild(this.$popup)
		} else {
			throw new Error('Popup: аргумент должен быть HTMLElement или { html }')
		}

		this.id = this.$popup.id
		this.$closers = this.$popup.querySelectorAll('.do-popupCloser, .Popup__closer')
		if (this.id) {
			this.$openers = document.querySelectorAll(`.do-popupOpener[data-target-popup="#${this.id}"]`)
		} else {
			this.$openers = []
		}

		this.init()
	}

	init() {
		this.#manageClosers()
		this.#manageOpeners()
		this.#manageOuterClick()
	}

	#manageOpeners() {
		this.$openers.forEach(($opener) => {
			$opener.addEventListener('click', () => this.open())
		})
	}

	#manageClosers() {
		this.$closers.forEach(($closer) => {
			$closer.addEventListener('click', () => this.close())
		})
	}

	#manageOuterClick() {
		this.outerClickHandler = this.#handleOuterClick.bind(this)
	}

	#handleOuterClick(event) {
		if (
			this.$popup.classList.contains('is-open') &&
			!event.target.closest('.Popup') &&
			!event.target.classList.contains('do-popupOpener')
		) {
			this.close()
		}
	}

	open() {
		this.$popupOrigin.classList.add('is-open')
		this.$popup.classList.add('is-open')
		document.addEventListener('mousedown', this.outerClickHandler)
	}

	close() {
		this.$popupOrigin.classList.remove('is-open')
		this.$popup.classList.remove('is-open')
		document.removeEventListener('mousedown', this.outerClickHandler)
	}

	setContent(html) {
		const content = this.$popup.querySelector('.Popup__content')
		if (content) {
			content.innerHTML = html
		}
	}

	on(event, selector, handler) {
		this.$popup.addEventListener(event, function (e) {
			if (e.target.matches(selector)) {
				handler.call(e.target, e)
			}
		})
	}

}
