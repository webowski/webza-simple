const CSS_CLASS_COLLAPSING = 'is-collapsing'
const CSS_CLASS_OPEN = 'is-open'

export default class Collapsible {
	constructor($element) {
    this.isCollapsing = false
		this.$collapsible = $element
		this.$header = this.$collapsible.querySelector('.collapsible__header')
		this.$body = this.$collapsible.querySelector('.collapsible__body')
		this.duration = this.#getDuration()
		this.init()
	}

	init() {
		this.#manageHeader()
	}

	isOpen() {
    return this.$collapsible.classList.contains(CSS_CLASS_OPEN)
  }

	#manageHeader() {
		this.$header.addEventListener('click', () => this.toggle())
	}

	toggle() {
		if (this.isOpen()) {
			this.#close()
		} else {
			this.#open()
		}
	}

	#open() {
    if (this.isCollapsing || this.isOpen()) {
      return
    }

    this.$collapsible.classList.add(CSS_CLASS_COLLAPSING)
    this.$body.style.height = 0
    this.isCollapsing = true
		this.$collapsible.classList.add(CSS_CLASS_OPEN)

    const complete = () => {
			setTimeout(() => {
				this.isCollapsing = false
				this.$collapsible.classList.remove(CSS_CLASS_COLLAPSING)
				this.$body.style['height'] = ''
			}, this.duration)
    }

    this.$body.style.height = `${this.$body['scrollHeight']}px`
    complete()
  }

  #close() {
    if (this.isCollapsing || !this.isOpen()) {
      return
    }

    this.$body.style.height = `${this.$body.getBoundingClientRect().height}px`

    this.$body.offsetHeight // reflow

    this.isCollapsing = true
    this.$collapsible.classList.add(CSS_CLASS_COLLAPSING)
		this.$collapsible.classList.remove(CSS_CLASS_OPEN)
    this.$body.style.height = 0

    const complete = () => {
			setTimeout(() => {
				this.isCollapsing = false
				this.$collapsible.classList.remove(CSS_CLASS_COLLAPSING)
				this.$body.style.height = ''
			}, this.duration)
    }

		complete()
  }

	#getDuration() {
		return (parseFloat(this.$collapsible.style.getPropertyValue('--duration')) * 1000 + 5) || 205
	}
}
