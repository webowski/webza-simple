class Tabs {
	constructor($element) {

	}

	init(callback) {
		let isSwitched = false

		$tabsNavs.forEach($tabsNav => {
			let $navItems = $tabsNav.querySelectorAll('.TabsNav__item')
			let $currentItem

			$navItems.forEach($navItem => {
				let $link = $navItem.querySelector('a')

				$link.addEventListener('click', event => {
					event.preventDefault()

					$currentItem = $navItem
					deselectTheRest($navItems)
					switchTab($navItem)

					if (!isSwitched) {
						setTimeout(() => {
							isSwitched = callback()
						}, 15)
					}
				})
			})

		})

	}

	switch($navItem) {
		$navItem.classList.add('is-current')
		getTabBody($navItem).classList.add('is-current')
		callback()
		return $navItem
	}

	deselectRest($navItems) {
		$navItems.forEach($navItem => {
			if ($navItem !== $currentItem) {
				$navItem.classList.remove('is-current')
				getTabBody($navItem).classList.remove('is-current')
			}
		})
	}

	getTab($navItem) {
		let $link = $navItem.querySelector('a')
		let targetId = $link.getAttribute('href')
		let $tabBody = document.querySelector(targetId)
		return $tabBody
	}
}

export default initTabs

const $tabsNavs = document.querySelector('.TabsNav')
const tabs = new Tabs($tabsNavs)
