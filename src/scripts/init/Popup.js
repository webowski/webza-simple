import Popup from '../components/Popup_'

const $popups = document.querySelectorAll('.Popup')

$popups.forEach(($popup) => {
	new Popup($popup)
})
