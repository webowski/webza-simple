export default class Popup {
	constructor($element) {
		this.$popup = $element
		this.id = this.$popup.id
		this.$closers = this.$popup.querySelectorAll('.do-popupCloser')
		this.$openers = document.querySelectorAll(
			`.do-popupOpener[data-target-popup="#${this.id}"`
		)
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
		this.$popup.classList.add('is-open')
		document.addEventListener('mousedown', this.outerClickHandler)
	}

	close() {
		this.$popup.classList.remove('is-open')
		document.removeEventListener('mousedown', this.outerClickHandler)
	}
}
