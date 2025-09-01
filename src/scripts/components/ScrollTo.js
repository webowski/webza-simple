// take shifting into account. wait for swipers to initialize
setTimeout(() => {
	initScrollTo()
}, 200)

window.addEventListener('resize', initScrollTo)

export function initScrollTo() {
	let links = document.querySelectorAll(
		'.do-scrollTo, .do-scrollTop, .NavMain a[href^="#"]'
	)
	links.forEach((link) => {
		let targetSelector = link.getAttribute('href')
		link.addEventListener('click', (e) => {
			e.preventDefault()
			doScrolling(targetSelector, 600)
		})
	})
}

function getElementY(element) {
	return window.pageYOffset + element.getBoundingClientRect().top
}

function getOffset() {
	let headerHeight = getComputedStyle(
		document.documentElement
	).getPropertyValue('--header-height')

	let headerThreshold = getComputedStyle(document.documentElement).getPropertyValue('--header-threshold')

	let offset = parseInt(headerHeight) / 2 + parseInt(headerThreshold)
	return offset
}

function getDistanceToTop(element) {
	return Math.floor(element.getBoundingClientRect().top)
}

function doScrolling(selector, duration) {
	let startingY = window.pageYOffset
	let target
	let elementY = 0

	// if href exists
	if (selector.substring(0, 1) === '#') {
		elementY = selector ? getElementY(document.querySelector(selector)) : 0
		target = document.querySelector(selector)
	}

	let offset = getOffset()
	// If element is close to page's bottom then window will scroll only to some position above the element.
	// var targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY
	let targetY = elementY

	var diff = targetY - offset - startingY
	// Easing function: easeInOutCubic
	// From: https://gist.github.com/gre/1650294
	var easing = function (t) {
		return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
	}
	var start

	if (!diff) return

	// Bootstrap our animation - it will get called right before next frame shall be rendered.
	window.requestAnimationFrame(function step(timestamp) {
		if (!start) start = timestamp
		// Elapsed miliseconds since start of scrolling.
		var time = timestamp - start
		// Get percent of completion in range [0, 1].
		var percent = Math.min(time / duration, 1)
		// Apply the easing.
		// It can cause bad-looking slow frames in browser performance tool, so be careful.
		percent = easing(percent)

		window.scrollTo(0, startingY + diff * percent)

		// Proceed with animation as long as we wanted it to.
		if (time < duration) {
			window.requestAnimationFrame(step)
		}
	})

	if (target) {
		let checkIfDone = setInterval(() => {
			let atBottom =
				window.innerHeight + window.pageYOffset >=
				document.body.offsetHeight - 2
			if (getDistanceToTop(target) === getOffset() || atBottom) {
				window.history.pushState('', '', selector)
				clearInterval(checkIfDone)
			}
		}, 100)
	}
}

// Scroll top
const scrollTopElements = document.querySelectorAll('.do-scrollTop')

scrollTopElements.forEach((scrollTopEl) => {
	scrollTopEl.addEventListener('click', (e) => {
		e.preventDefault()
	})
})

function scrollAnchors(e, respond = null) {
	e.preventDefault()
	let distanceToTop = (el) => {
		return Math.floor(el.getBoundingClientRect().top)
	}
	let targetID = respond
		? respond.getAttribute('href')
		: this.getAttribute('href')

	let targetAnchor = document.querySelector(targetID)
	if (!targetAnchor) return

	let originalTop = -getOffset() + distanceToTop(targetAnchor)

	smoothScroll(originalTop)

	let checkIfDone = setInterval(() => {
		let atBottom =
			window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2
		if (distanceToTop(targetAnchor) === getOffset() || atBottom) {
			window.history.pushState('', '', targetID)
			clearInterval(checkIfDone)
		}
	}, 100)
}
