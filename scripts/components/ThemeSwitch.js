function setCookie(name, value, days) {
	let expires = "";
	if (days) {
		const date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
	const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
	return match ? match[2] : null;
}

document.addEventListener('DOMContentLoaded', function () {

	let themeSwitchers = document.querySelectorAll('.ThemeSwitch')

	function turnSwitch(theme) {
		themeSwitchers.forEach(themeSwitch => {
			let checkbox = themeSwitch.querySelector('input')
			if (theme === 'dark') {
				themeSwitch.classList.add('is-switched')
				checkbox.checked = true
			} else {
				themeSwitch.classList.remove('is-switched')
				checkbox.checked = false
			}
		})
	}

	themeSwitchers.forEach(themeSwitch => {
		const currentTheme = getCookie('theme') || 'light'
		let checkbox = themeSwitch.querySelector('input')

		// применяем тему из куки
		document.documentElement.setAttribute('data-theme', currentTheme)
		turnSwitch(currentTheme)

		themeSwitch.addEventListener('click', e => {
			e.stopPropagation()
			if (themeSwitch.classList.contains('is-switched')) {
				document.documentElement.setAttribute('data-theme', 'light')
				setCookie('theme', 'light', 365)
				turnSwitch('light')
			} else {
				document.documentElement.setAttribute('data-theme', 'dark')
				setCookie('theme', 'dark', 365)
				turnSwitch('dark')
			}
		}, false)
	})

})
