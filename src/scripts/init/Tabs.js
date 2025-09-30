import Tabs from '../components/Tabs'

const $tabsSet = document.querySelectorAll('.Tabs')

$tabsSet.forEach(($tabs) => {
	new Tabs($tabs)
})
