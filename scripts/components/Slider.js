import Swiper, { Navigation, Pagination } from 'swiper'
// import swiper from 'swiper/bundle'

console.log( `
hello
my
friend
` )

Swiper.use([Navigation, Pagination]);

let sliders = document.querySelectorAll('.slider')
let slidersInstances = ['new']

sliders.forEach((slider, i) => {
	let container = slider.querySelector('.swiper-container')

	let options = {
		speed: slider.dataset.speed || 300,
		loop: slider.dataset.loop || true,
	}

	slidersInstances[i] = new Swiper(container, options)
})

export default slidersInstances
