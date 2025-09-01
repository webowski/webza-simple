import {gsap} from 'gsap'

// <!-- <div class="cursor"></div> -->
const cursor = document.querySelector('.cursor')

window.addEventListener('mousemove', (e) => {
	const { clientX, clientY } = e

	gsap.to(cursor, {
    // '--x': `${x}%`,
    // '--y': `${y}%`,
    duration: 0,
    // ease: 'sine.out',
    x: clientX,
    y: clientY
  })
})
