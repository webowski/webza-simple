import * as basicLightbox from 'basiclightbox'

const popups = []
const $popupsContainers = document.querySelectorAll('.popup-container')

$popupsContainers.forEach(($popupContainer) => {
	const options = {}
	const instance = basicLightbox.create($popupContainer, options)

	instance.id = $popupContainer.id
	instance.type = $popupContainer.dataset.popupType

	popups.push(instance)
})

const $popupOpeners = document.querySelectorAll('.do-popup-opener')

$popupOpeners.forEach(($popupOpener) => {
	const targetId = $popupOpener.dataset.targetPopup.replace(/^#/, '')
	const targetInstance = popups.find((popup) => popup.id === targetId)

	if (!targetInstance) return

	$popupOpener.addEventListener('click', (event) => {
		event.preventDefault()
		targetInstance.show()
	})
})
