document.addEventListener("DOMContentLoaded", () => {
	const $typing = document.querySelector(".do-typing")
	if (!$typing) return
	$typing.classList.add('Typing')
	const $cursor = document.createElement("span")
	$cursor.classList.add('TypingCursor')
	$typing.after($cursor)

	const typingData = JSON.parse($typing.dataset.typing)
	let wordIndex = 0
	let charIndex = 0
	let isDeleting = false
	const typingSpeed = 110
	const deletingSpeed = 60
	const pauseAfterTyping = 2000
	const pauseAfterDeleting = 500

	function type() {
		$cursor.classList.remove('is-animating')
		const currentWord = typingData[wordIndex]
		if (isDeleting) {
			charIndex--
			$typing.textContent = currentWord.substring(0, charIndex)
			if (charIndex === 0) {
				isDeleting = false
				wordIndex = (wordIndex + 1) % typingData.length
				$cursor.classList.add('is-animating')
				setTimeout(() => {
					type()
				}, pauseAfterDeleting)
			} else {
				setTimeout(() => {
					type()
				}, deletingSpeed)
			}
		} else {
			charIndex++
			$typing.textContent = currentWord.substring(0, charIndex)
			if (charIndex === currentWord.length) {
				isDeleting = true
				$cursor.classList.add('is-animating')
				setTimeout(() => {
					type()
				}, pauseAfterTyping)
			} else {
				setTimeout(() => {
					type()
				}, typingSpeed)
			}
		}
	}

	type()
})
