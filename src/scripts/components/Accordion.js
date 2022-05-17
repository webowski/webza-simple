function initAccordions() {
  let $accordions = document.querySelectorAll('.Accordion')
  let accordionsInstances = []

  $accordions.forEach(($accordion, i) => {
    accordionsInstances[i] = initAccordion($accordion)
  })
}

function initAccordion($accordion) {
  let $items = $accordion.querySelectorAll(':scope .AccordionItem')

  $items.forEach($item => {
    let $opener = $item.querySelector(':scope .AccordionItem__opener')

    let $slider = $item.querySelector('.slider')

    if ($slider) {

      $opener.addEventListener('mousedown', (event) => {
        event.preventDefault()

        let isOpen = $item.classList.contains('is--open')

        if (isOpen) {
          close($item, () => {
          })
        } else {
          closeRest($items, $item)
          open($item, () => {
          })
        }

      })
    }

  })

  function open($element, callback) {
    let $body = $element.querySelector('.AccordionItem__body')
    $element.classList.add('is-open')
    slideDown($body, 300, () => {
      if (typeof callback === "function") callback()
    })
  }

  function close($element, callback) {
    let $body = $element.querySelector('.AccordionItem__body')
    slideUp($body, 300, () => {
      $element.classList.remove('is-open')
      if (typeof callback === "function") callback()
    })
  }

  function closeRest($elements, $exception) {
    $elements.forEach($element => {
      if ($element !== $exception) {
        close($element)
      }
    })
  }

  return $accordion
}

export init
