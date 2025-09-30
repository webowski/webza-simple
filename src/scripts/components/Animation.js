function init() {

  let $triggers = document.querySelectorAll('.do-animation')

  $triggers.forEach($trigger => {

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: $trigger,
        start: 'top top',
        end: 'bottom 100',
        scrub: true
      }
    })

    gsap.utils.toArray('.parallax').forEach(layer => {
      let depth = layer.dataset.depth
      let movement = (layer.offsetHeight * depth)

      timeline.to(layer, {
        y: movement,
        opacity: 0,
        ease: 'none',
        scale: 1.4,
      }, 0)

    })

  })
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})
