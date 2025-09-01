export const initFormFields = formFields => {

	formFields.forEach( formField => {
		let input = formField.querySelector('.FormInput')
		let label = formField.querySelector('.FormLabel')

		// input.addEventListener('focusin', () => {
		input.addEventListener('focus', () => {
			formField.classList.add('has-focus')
		})

		// input.addEventListener('focusout', () => {
		input.addEventListener('blur', () => {
			formField.classList.remove('has-focus')

			if (input.value) {
				formField.classList.add('has-value')
			} else {
				formField.classList.remove('has-value')
			}
		})

	})
}

const formFields = document.querySelectorAll('.FormField')

initFormFields(formFields)
