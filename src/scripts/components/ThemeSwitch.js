class ThemeSwitch {
	currentTheme = 'light'

	constructor() {
		this.$switcher = document.querySelector('.ThemeSwitch')

		this.manageLocalStorage()
		this.manageSwitcher()
	}

	manageSwitcher() {
		if (this.$switcher) {
			this.$checkbox = this.$switcher.querySelector('input')

			if (this.currentTheme === 'dark') {
				this.$switcher.classList.add('is-switched')
				this.$checkbox.checked = true
			} else {
				this.$switcher.classList.remove('is-switched')
				this.$checkbox.checked = false
			}

			this.$switcher.addEventListener('click', (e) => {
				if (this.getCurrentTheme() === 'dark') {
					this.switchTheme('light')
				} else {
					this.switchTheme('dark')
				}
			})
		}
	}

	manageLocalStorage() {
		this.currentTheme = localStorage.getItem('theme')

		if (this.currentTheme) {
			document.documentElement.setAttribute('data-theme', this.currentTheme)
		}
	}

	switchTheme(theme) {
		document.documentElement.setAttribute('data-theme', theme)
		localStorage.setItem('theme', theme)

		if (theme === 'light') {
			this.$switcher.classList.remove('is-switched')
			this.$checkbox.checked = false
		} else {
			this.$switcher.classList.add('is-switched')
			this.$checkbox.checked = true
		}
	}

	getCurrentTheme() {
		if (this.$switcher.classList.contains('is-switched')) {
			return 'dark'
		} else {
			return 'light'
		}
	}
}

export default ThemeSwitch
