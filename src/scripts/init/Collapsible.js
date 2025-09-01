import Collapsible from '../components/Collapsible'

const $collapsibles = document.querySelectorAll('.collapsible')

$collapsibles.forEach(($collapsible) => {
	new Collapsible($collapsible)
})
