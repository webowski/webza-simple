import Notifier from '../components/Notifier'

window.notifier = new Notifier()

const $notifyOpeners = document.querySelectorAll('.do-notify')

$notifyOpeners.forEach(($opener) => {
	const targetSelector = $opener.dataset.target
	$opener.addEventListener('click', () => {
		Notifier.toggle(targetSelector)
	})
})
