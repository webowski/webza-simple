import Popup from '../components/Popup'

const $popups = document.querySelectorAll('.Popup')

$popups.forEach(($popup) => {
	new Popup($popup)
})
