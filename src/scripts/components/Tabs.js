class Tabs {
	constructor($element) {
		this.$element = $element
		this.$navItems = $element.querySelectorAll('.Tabs__navItem')
		this.$accordionHandlers = $element.querySelectorAll('.Tabs__itemHeader')
		this.$tabs = $element.querySelectorAll('.Tabs__item')
		this.currentIndex = 0
		this.init()
	}

	init() {
		this.$navItems.forEach(($navItem) => {
			$navItem.addEventListener('click', (event) => {
				this.currentIndex = this.getIndex($navItem, this.$navItems)
				this.openTab()
				this.closeTheRest()
			})
		})

		this.$accordionHandlers.forEach(($handler) => {
			$handler.addEventListener('click', (event) => {
				this.currentIndex = this.getIndex($handler, this.$accordionHandlers)
				let isOpen = this.$tabs[this.currentIndex].classList.contains('is-open')

				if (isOpen) {
					this.closeTab()
				} else {
					this.openTab()
				}
			})
		})

		window.onresize = this.controlOpenTabs.bind(this)
	}

	openTab() {
		this.$navItems[this.currentIndex].classList.add('is-open')
		this.$tabs[this.currentIndex].classList.add('is-open')
	}

	closeTab() {
		this.$navItems[this.currentIndex].classList.remove('is-open')
		this.$tabs[this.currentIndex].classList.remove('is-open')
	}

	closeTheRest() {
		this.$navItems.forEach(($navItem) => {
			if ($navItem !== this.$navItems[this.currentIndex]) {
				let index = this.getIndex($navItem, this.$navItems)
				$navItem.classList.remove('is-open')
				this.$tabs[index].classList.remove('is-open')
			}
		})
	}

	getIndex($element, $ofElements) {
		let index = [].indexOf.call($ofElements, $element)
		return index
	}

	controlOpenTabs() {
		if (window.innerWidth > 767) {
			const openTabsCount = this.countOpenTabs()

			if (openTabsCount === 0 || openTabsCount > 1) {
				this.currentIndex = 0
				this.closeTheRest()
				this.openTab()
			}
		}
	}

	countOpenTabs() {
		return [...this.$tabs].filter(($tab) => $tab.classList.contains('is-open'))
			.length
	}
}

export default Tabs
