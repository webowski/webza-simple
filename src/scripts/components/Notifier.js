export default class Notifier {
	constructor() {
		this.$notifications = document.querySelectorAll('.Notification')
		this.init()
	}

	init() {
		this.$notifications.forEach(($notificaton) => {
			const $closer = $notificaton.querySelector('.Notification__closer')
			$closer.addEventListener('click', () => {
				$notificaton.classList.remove('is-shown')
			})
		})
	}

	static show(id) {
		this.prototype.manipulate('show', id)
	}

	static hide(id) {
		this.prototype.manipulate('hide', id)
	}

	static toggle(id) {
		this.prototype.manipulate('toggle', id)
	}

	manipulate(action, id) {
		const $notification = document.querySelector(id)
		if ($notification) $notification.classList[action]('is-shown')
	}
}
