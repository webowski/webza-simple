import Swiper from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'
import merge from 'lodash/merge'

Swiper.use([Navigation, Pagination]);

let $$sliders = document.querySelectorAll('.Slider')
let slidersInstances = []

function initSlider($slider, i) {
	let $container = $slider.querySelector('.swiper-container')
	let $pagination = $slider.querySelector('.Slider__pagination')
	let options = {}
	let optionsString = $slider.dataset.options

	if (optionsString && optionsString.length) {
		options = JSON.parse(optionsString)
	}

	let initialOptions = {
		speed: 300,
		loop: false,
		pagination: {
			el: $pagination,
			clickable: true,
			renderBullet: (index, className) => `<div class="${className}"></div>`,
		},
		navigation: {
			prevEl: $slider.querySelector('.Slider__prev'),
			nextEl: $slider.querySelector('.Slider__next'),
		},
		slidesPerView: 1,
		spaceBetween: 0,
		on: {
			init: function () {
				$slider.classList.add('-initialized')
			},
			destroy: function () {
				$slider.classList.remove('-initialized')
			},
		},
	}

	const mergedOptions = merge({}, initialOptions, options)

	slidersInstances[i] = new Swiper($container, mergedOptions)
	$slider._swiperInitialized = true
}

function destroySlider($slider, i) {
	if (slidersInstances[i]) {
		slidersInstances[i].destroy(true, true)
		slidersInstances[i] = null
		$slider._swiperInitialized = false
	}
}

function handleResize() {
	$$sliders.forEach(($slider, i) => {
		const destroyBreakpoint = parseInt($slider.dataset.destroyBreakpoint, 10)
		if (destroyBreakpoint && window.innerWidth >= destroyBreakpoint) {
			// Destroy only if initialized
			if ($slider._swiperInitialized) {
				destroySlider($slider, i)
			}
		} else {
			// Init only if not initialized
			if (!$slider._swiperInitialized) {
				initSlider($slider, i)
			}
		}
	})
}

window.addEventListener('resize', handleResize)
window.addEventListener('load', handleResize)
// handleResize()

window.sliders = slidersInstances
