import '../helpers/Event'

class Navigation {
	constructor() {
		this.navMobile = document.querySelector('.NavMobile')
		if (!this.navMobile) return

		this.navMobileOpeners = document.querySelectorAll('.NavOpener')

		this.handleOpen = this.handleOpen.bind(this)
		this.handleClose = this.handleClose.bind(this)
		this.handleOpenerClick = this.handleOpenerClick.bind(this)
		this.handleBodyClick = this.handleBodyClick.bind(this)
		this.handleTouchStart = this.handleTouchStart.bind(this)
		this.handleTouchMove = this.handleTouchMove.bind(this)
		this.handleTouchEnd = this.handleTouchEnd.bind(this)

		this.touchStartY = null
		this.touchStartX = null

		this.init()
	}

	init() {
		this.navMobile.addEventListener('open', this.handleOpen)
		this.navMobile.addEventListener('close', this.handleClose)

		this.navMobileOpeners.forEach((opener) => {
			opener.addEventListener('click', this.handleOpenerClick)
		})

		document.body.addEventListener('click', this.handleBodyClick)

		this.navMobile.addEventListener('touchstart', this.handleTouchStart)
		this.navMobile.addEventListener('touchmove', this.handleTouchMove)
		this.navMobile.addEventListener('touchend', this.handleTouchEnd)
	}

	handleOpen(e) {
		this.navMobileOpeners.forEach((opener) => {
			opener.classList.add('is-open')
		})
		this.navMobile.classList.add('is-open')
		document.body.classList.add('G-noScroll')
		// document.body.classList.add('G-navOverlay')
	}

	handleClose(e) {
		this.navMobileOpeners.forEach((opener) => {
			opener.classList.remove('is-open')
		})
		this.navMobile.classList.remove('is-open')
		document.body.classList.remove('G-noScroll')
		// document.body.classList.remove('G-navOverlay')
	}

	handleOpenerClick(e) {
		e.stopPropagation()
		if (this.navMobile.classList.contains('is-open')) {
			this.navMobile.trigger('close')
		} else {
			this.navMobile.trigger('open')
		}
	}

	handleBodyClick(e) {
		let isNavMobileOpen = this.navMobile.classList.contains('is-open')
		if (!isNavMobileOpen) return

		let isNavMobileMenuItem = e.target.closest('.NavMobile .menu-item')
		if (isNavMobileMenuItem) return this.navMobile.trigger('close')

		let isInsideNavMobile = e.target.closest('.NavMobile')
		if (!isInsideNavMobile) return this.navMobile.trigger('close')

		let isDontClose = e.target.closest('.NavMobile .do-notCloseNav')
		if (isInsideNavMobile && !isDontClose) return this.navMobile.trigger('close')
	}

	handleTouchStart(e) {
		if (!this.navMobile.classList.contains('is-open')) return
		if (e.touches.length === 1) {
			this.touchStartX = e.touches[0].clientX
			this.touchStartY = e.touches[0].clientY
		}
	}

	handleTouchMove(e) {
		if (this.touchStartX === null || this.touchStartY === null) return
		let touchCurrentX = e.touches[0].clientX
		let touchCurrentY = e.touches[0].clientY
		let diffX = touchCurrentX - this.touchStartX
		let diffY = Math.abs(touchCurrentY - this.touchStartY)
		// Свайп вправо, горизонтальный жест, не слишком вертикальный.
		if (diffX > 50 && diffY < 40) {
			this.navMobile.trigger('close')
			this.touchStartX = null
			this.touchStartY = null
		}
	}

	handleTouchEnd(e) {
		this.touchStartX = null
		this.touchStartY = null
	}
}

// Инициализация класса
new Navigation()
