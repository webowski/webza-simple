import Swiper from 'swiper'
import { Notyf } from 'notyf'
import Popup from './Popup.js'

class QuizSwiperCF7 {
  constructor($quiz) {
    this.$quiz = $quiz

    // корневой <div> Contact Form 7
    this.$wpcf7 = $quiz.closest('div.wpcf7')
    this.$form = this.$wpcf7.querySelector('form.wpcf7-form')

    // Уведомления
    this.notyf = new Notyf({
      position: {x: 'center', y: 'bottom'},
      ripple: false,
      duration: 3000,
      types: [
        {
          type: 'warning',
          background: 'orange',
          icon: {
            className: 'material-icons',
            tagName: 'i',
            text: 'warning'
          }
        },
        { type: 'error' }
      ]
    })

    // Слайдер
    this.swiper = new Swiper('.Quiz__slider', {
      allowTouchMove: false,
      effect: 'slide',
      spaceBetween: 28,
      a11y: { enabled: false, scrollOnFocus: false },
    })

    // Прогрессбар
    this.$progressBar = document.createElement('div')
    this.$progressBar.className = 'Quiz__progress'
    this.$quiz.prepend(this.$progressBar)

    // Кнопки
    this.$buttonNext = this.$quiz.querySelector('.do-nextSlide')
    this.$buttonPrev = this.$quiz.querySelector('.do-prevSlide')
    this.$buttonSubmit = this.$quiz.querySelector('.Button[type="submit"]')

    // Поля
    this.$$quizInputs = $quiz.querySelectorAll('input, textarea, select')

    // Popup подтверждения отправки брифа
    this.popupConfirm = new Popup({
      html: (`<div class="Popup">
        <div class="Popup__inner">
          <div class="text-balance">Отправляя заполненную анкету вы подтверждаете согласие на обработку данных в соответствии с законодательством РФ</div>
          <div class="Popup__actions">
            <button type="button" class="Button do-confirmSend">Подтверждаю</button>
            <button type="button" class="Button -alt do-popupCloser">Отмена</button>
          </div>
        </div>
        <button class="Popup__closer">
          <svg aria-hidden="true">
            <use href="#icon-x"></use>
          </svg>
        </button>
      </div>`)
    })

    this.bindMethods()
    this.init()
  }

  bindMethods() {
    this.handleButtonShiftTab = this.handleButtonShiftTab.bind(this)
    this.focusLastFieldOfCurrentSlide = this.focusLastFieldOfCurrentSlide.bind(this)
  }

  getCurrentSlide() {
    return this.$quiz.querySelectorAll('.swiper-slide')[this.swiper.activeIndex]
  }

  getValue($field) {
    if (!$field) return undefined
    if ($field.type === 'checkbox') {
      // Группа чекбоксов
      if ($field.name && $field.closest('.wpcf7-checkbox')) {
        const group = this.$quiz.querySelectorAll(`input[type="checkbox"][name='${$field.name}']`)
        return Array.from(group).filter(cb => cb.checked).map(cb => cb.value)
      }
      return $field.checked
    }
    if ($field.type === 'radio') {
      const group = this.$quiz.querySelectorAll(`input[type="radio"][name='${$field.name}']`)
      const checked = Array.from(group).find(r => r.checked)
      return checked ? checked.value : ''
    }
    return $field.value
  }

  getInputObject($control) {
    if ($control.classList.contains('wpcf7-textarea'))
      return { input: $control, type: 'textarea' }

    if ($control.classList.contains('wpcf7-text'))
      return { input: $control, type: 'text' }

    if ($control.classList.contains('wpcf7-select'))
      return { input: $control, type: 'select' }

    if ($control.classList.contains('wpcf7-radio'))
      return { input: $control.querySelectorAll('input[type="radio"]'), type: 'radio-set' }

    if ($control.classList.contains('wpcf7-checkbox'))
      return { input: $control.querySelectorAll('input[type="checkbox"]'), type: 'checkbox-set' }
  }

  validateSlide() {
    const $currentSlide = this.getCurrentSlide()
    let isSlideValid = true

    let $$controlsRequired = $currentSlide.querySelectorAll('.wpcf7-form-control.wpcf7-validates-as-required, .wpcf7-form-control.wpcf7-radio')
    // let $$wraps = $currentSlide.querySelectorAll('.wpcf7-form-control-wrap')

    // Сброс классов invalid
    $$controlsRequired.forEach($control => $control.classList.remove('invalid'))

    $$controlsRequired.forEach($control => {
      const inputObj = this.getInputObject($control)
      if (!inputObj) return
      const { input, type } = inputObj
      let allInputsValid = true

      if (type === 'text' || type === 'textarea' || type === 'select') {
        if (!input.value) allInputsValid = false
      } else if (type === 'radio-set') {
        allInputsValid = Array.from(input).some(r => r.checked)
      } else if (type === 'checkbox-set') {
        allInputsValid = Array.from(input).some(cb => cb.checked)
      }

      if (!allInputsValid) {
        isSlideValid = false
        $control.classList.add('invalid')
        if (type === 'radio-set' || type === 'checkbox-set') {
          input.forEach(el => el.classList.add('invalid'))
        } else {
          input.classList.add('invalid')
        }
      }
    })

    return isSlideValid
  }

  updateProgress() {
    const percent = ((this.swiper.activeIndex + 1) / this.swiper.slides.length) * 100
    this.$progressBar.style.setProperty('--value', percent + '%')
  }

  updateButtonsVisibility() {
    const idx = this.swiper.activeIndex
    // Кнопка Next: на всех кроме последнего и предпоследнего
    if (idx < this.swiper.slides.length - 2) {
      this.$buttonNext.classList.remove('hidden')
    } else {
      this.$buttonNext.classList.add('hidden')
    }
    // Кнопка Prev: на всех кроме первого и последнего
    if (idx > 0 && idx < this.swiper.slides.length - 1) {
      this.$buttonPrev.classList.remove('hidden')
    } else {
      this.$buttonPrev.classList.add('hidden')
    }
    // Кнопка Submit: только на предпоследнем
    if (idx === this.swiper.slides.length - 2) {
      this.$buttonSubmit.classList.remove('hidden')
    } else {
      this.$buttonSubmit.classList.add('hidden')
    }
  }

  restoreFieldsValues() {
    this.$$quizInputs.forEach($input => {
      if ($input.type === 'radio') {
        const saved = localStorage.getItem('quiz_' + $input.name)
        $input.checked = $input.value === saved
      } else if ($input.type === 'checkbox') {
        const saved = localStorage.getItem('quiz_' + $input.name + '_' + $input.value)
        $input.checked = saved === 'true'
      } else {
        const saved = localStorage.getItem('quiz_' + $input.name)
        if (saved) $input.value = saved
      }
    })
  }

  autosaveFieldsValues() {
    this.$$quizInputs.forEach($input => {
      $input.addEventListener('input', () => {
        if ($input.type === 'radio') {
          if ($input.checked) {
            localStorage.setItem('quiz_' + $input.name, $input.value)
          }
        } else if ($input.type === 'checkbox') {
          localStorage.setItem('quiz_' + $input.name + '_' + $input.value, $input.checked)
        } else {
          localStorage.setItem('quiz_' + $input.name, $input.value)
        }
      })
    })
  }

  // --- TAB UX HELPERS ---
  getTargetBtn(slideIdx) {
    if (slideIdx < this.swiper.slides.length - 2) return this.$buttonNext
    if (slideIdx === this.swiper.slides.length - 2) return this.$buttonSubmit
    return null
  }

  handleTabOnLast(e, slideIdx) {
    const $targetBtn = this.getTargetBtn(slideIdx)
    if ($targetBtn && !$targetBtn.classList.contains('hidden')) {
      e.preventDefault()
      $targetBtn.focus()
    } else {
      e.preventDefault()
    }
  }

  handleShiftTabOnFirst(e) {
    e.preventDefault()
  }

  focusLastFieldOfCurrentSlide() {
    const $currentSlide = this.swiper.slides[this.swiper.activeIndex]
    const $$fields = $currentSlide.querySelectorAll('input, textarea, select')
    if ($$fields.length) {
      getLast($$fields).focus()
    }
  }

  handleButtonShiftTab(e) {
    if ( isPressedShiftTab(e) ) {
      e.preventDefault()
      this.focusLastFieldOfCurrentSlide()
    }
  }

  bindEvents() {

    // Кнопка вперед
    this.$buttonNext.addEventListener('click', e => {
      e.preventDefault()
      if (this.validateSlide()) {
        this.swiper.slideNext()
      } else {
        this.notyf.error('Пожалуйста, заполните все поля.')
      }
    })

    // Кнопка назад
    this.$buttonPrev.addEventListener('click', e => {
      e.preventDefault()
      this.swiper.slidePrev()
    })

    this.$buttonSubmit.addEventListener('click', e => {
      e.preventDefault()

      if (!this.validateSlide()) {
        this.notyf.error('Пожалуйста, заполните все поля.')
        return
      }

      this.popupConfirm.open()
      // Подтверждение
    })

    this.popupConfirm.on('click', '.do-confirmSend', () => {
      this.popupConfirm.close()

      // Отправляем форму через requestSubmit (ajax CF7)
      if (this.$form.requestSubmit) {
        this.$form.requestSubmit()
      } else {
        this.$form.submit()
      }
    })

    this.swiper.on('slideChange', () => {
      this.updateProgress()
      this.updateButtonsVisibility()
    })

    this.swiper.on('slideChangeTransitionEnd', () => {
      // Фокус на первый input/textarea/select текущего слайда
      const $currentSlide = this.swiper.slides[this.swiper.activeIndex]
      const $$fields = $currentSlide.querySelectorAll('input, textarea, select')
      if ($$fields.length) {
        $$fields[0].focus()
      }
    })

    // События CF7
    this.$wpcf7.addEventListener('wpcf7mailfailed', e => {
      const message = e.detail.apiResponse.message
      this.notyf.error(message)
    })

    this.$wpcf7.addEventListener('wpcf7mailsent', e => {
      this.$$quizInputs.forEach(field => {
        localStorage.removeItem('quiz_' + field.name)
      })
      const message = e.detail.apiResponse.message
      this.notyf.success(message)
      this.swiper.slideTo(this.swiper.slides.length - 1)
    })

    // --- TAB UX MAIN ---
    this.swiper.slides.forEach(($slide, slideIdx) => {
      const $$slideInputs = $slide.querySelectorAll('input, textarea, select')
      if (!$$slideInputs.length) return

      const $firstInput = $$slideInputs[0]
      const $lastInput = getLast($$slideInputs)

      // SHIFT+TAB на первом radio из группы, если он первый на слайде
      if (isRadio($firstInput)) {
        const $$radioGroup = getRadioGroup($slide, $firstInput)
        if ($$radioGroup.length && $$radioGroup[0] === $firstInput) {
          $$radioGroup.forEach($radio => {
            $radio.addEventListener('keydown', e => {
              if (isPressedShiftTab(e) && isFocused($radio)) {
                this.handleShiftTabOnFirst(e)
              }
            })
          })
        }
      } else {
        $firstInput.addEventListener('keydown', e => {
          if (isPressedShiftTab(e)) {
            this.handleShiftTabOnFirst(e)
          }
        })
      }

      // TAB на любой radio из группы, если группа — последние поля на слайде
      if (isRadio($lastInput)) {
        const $$radioGroup = getRadioGroup($slide, $lastInput)
        // Проверяем, что вся группа подряд и она последние поля на слайде
        if (
          $$radioGroup.length &&
          $$slideInputs.length >= $$radioGroup.length &&
          Array.from($$slideInputs).slice(-$$radioGroup.length).every((el, i) => el === $$radioGroup[i])
        ) {
          $$radioGroup.forEach($radio => {
            $radio.addEventListener('keydown', e => {
              if (isPressedTab(e) && isFocused($radio)) {
                this.handleTabOnLast(e, slideIdx)
              }
            })
          })
        } else {
          // если это не группа в конце, обычное поведение для последнего поля
          $lastInput.addEventListener('keydown', e => {
            if (isPressedTab(e)) {
              this.handleTabOnLast(e, slideIdx)
            }
          })
        }
      } else {
        $lastInput.addEventListener('keydown', e => {
          if (isPressedTab(e)) {
            this.handleTabOnLast(e, slideIdx)
          }
        })
      }
    })

    // Shift+Tab на кнопке Далее/Отправить
    this.$buttonNext.addEventListener('keydown', this.handleButtonShiftTab)
    this.$buttonSubmit.addEventListener('keydown', this.handleButtonShiftTab)
  }

  init() {
    // Фокус на первое поле
    this.$$quizInputs[0].focus()

    this.updateProgress()
    this.updateButtonsVisibility()
    this.restoreFieldsValues()
    this.autosaveFieldsValues()
    this.bindEvents()
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const $quiz = document.querySelector('.Quiz')
  if ($quiz) {
    new QuizSwiperCF7($quiz)
  }
})

function isFocused($element) {
  return document.activeElement === $element
}

function isRadio($el) {
  return $el && $el.type === 'radio'
}

function isPressedTab(e) {
  return e.key === 'Tab' && !e.shiftKey
}

function isPressedShiftTab(e) {
  return e.key === 'Tab' && e.shiftKey
}

function getLast($$group) {
  return $$group[$$group.length - 1]
}

function getRadioGroup($slide, $el) {
  return isRadio($el) ? Array.from($slide.querySelectorAll(`input[type="radio"][name='${$el.name}']`)) : []
}
