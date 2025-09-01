import Lenis from 'lenis'

window.lenis = new Lenis({
  autoRaf: false,
})

// lenis.on('scroll', (e) => {
//   console.log(e)
// })

function raf(time) {
  window.lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)


// document.querySelectorAll('.do-scrollTop, .NavMain a[href^="#"]').forEach(link => {
//   link.addEventListener('click', e => {
//     e.preventDefault()

//     if (link.classList.contains('do-scrollTop')) {
//       window.lenis.scrollTo(0, {
//         duration: 1,
//         easing: easeOutQuart
//       })
//       return
//     }

//     const targetId = link.getAttribute('href')
//     // если просто # или пусто — ничего не делаем
//     if (!targetId || targetId === '#') return

//     const targetElement = document.querySelector(targetId)

//     if (targetElement) {
//       const headerOffset = getVarPx('--header-height')

//       window.lenis.scrollTo(targetElement, {
//         offset: headerOffset * -1,
//         duration: 1, // в секундах
//         easing: easeOutQuart
//       })
//     }
//   })
// })

// function easeOutQuart(x) {
//   return 1 - Math.pow(1 - x, 4);
// }

// function getVarPx(variableName) {
//   const temp = document.createElement('div')
//   temp.style.height = `var(${variableName})`
//   temp.style.position = 'absolute'
//   temp.style.visibility = 'hidden'
//   document.body.appendChild(temp)
//   const px = temp.offsetHeight
//   temp.remove()
//   return px
// }
