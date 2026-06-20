/**
 * @jest-environment jsdom
 */

const {
  addElementToDOM,
  removeElementFromDOM,
  simulateClick,
  handleFormSubmit,
  initializeDOMInteractions
} = require('./index.js')

describe('DOM Testing Lab', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <h1>DOM Testing and User Behavior Simulation</h1>
      <button id="simulate-click">Simulate Click</button>
      <form id="user-form">
        <input type="text" id="user-input" placeholder="Enter text">
        <button type="submit">Submit</button>
      </form>
      <div id="dynamic-content"></div>
      <div id="error-message" class="hidden"></div>
    `

    initializeDOMInteractions()
  })

  test('addElementToDOM adds content to the correct DOM element', () => {
    const container = document.getElementById('dynamic-content')

    expect(container).not.toBeNull()
    expect(container.innerHTML).toBe('')

    addElementToDOM('dynamic-content', '<p>Hello DOM</p>')

    expect(container.innerHTML).toBe('<p>Hello DOM</p>')
    expect(container.textContent).toBe('Hello DOM')
  })

  test('removeElementFromDOM removes an existing element from the DOM', () => {
    const errorMessage = document.getElementById('error-message')

    expect(errorMessage).not.toBeNull()
    expect(document.getElementById('error-message')).toBeTruthy()

    removeElementFromDOM('error-message')

    expect(document.getElementById('error-message')).toBeNull()
  })

  test('simulateClick updates the DOM with the expected content', () => {
    const container = document.getElementById('dynamic-content')

    expect(container.textContent).toBe('')

    simulateClick('dynamic-content', 'Button Clicked!')

    expect(container.innerHTML).toBe('Button Clicked!')
    expect(container.textContent).toBe('Button Clicked!')
  })

  test('handleFormSubmit updates the page when the form input contains valid text', () => {
    const input = document.getElementById('user-input')
    const container = document.getElementById('dynamic-content')
    const errorMessage = document.getElementById('error-message')

    input.value = 'Test submission'

    handleFormSubmit('user-form', 'dynamic-content')

    expect(container.textContent).toBe('Test submission')
    expect(container.innerHTML).toBe('Test submission')
    expect(errorMessage.textContent).toBe('')
    expect(errorMessage.classList.contains('hidden')).toBe(true)
  })

  test('handleFormSubmit displays an error message when the input is empty', () => {
    const input = document.getElementById('user-input')
    const container = document.getElementById('dynamic-content')
    const errorMessage = document.getElementById('error-message')

    input.value = '   '

    handleFormSubmit('user-form', 'dynamic-content')

    expect(errorMessage.textContent).toBe('Input cannot be empty')
    expect(errorMessage.classList.contains('hidden')).toBe(false)
    expect(container.textContent).toBe('')
    expect(container.innerHTML).toBe('')
  })

  test('clicking the simulate button triggers the expected DOM update', () => {
    const simulateButton = document.getElementById('simulate-click')
    const container = document.getElementById('dynamic-content')

    simulateButton.click()

    expect(container.textContent).toBe('Button Clicked!')
    expect(container.innerHTML).toBe('Button Clicked!')
  })

  test('submitting the form through the submit event updates the DOM for valid input', () => {
    const form = document.getElementById('user-form')
    const input = document.getElementById('user-input')
    const container = document.getElementById('dynamic-content')
    const errorMessage = document.getElementById('error-message')

    input.value = 'Submitted with event'
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))

    expect(container.textContent).toBe('Submitted with event')
    expect(errorMessage.textContent).toBe('')
    expect(errorMessage.classList.contains('hidden')).toBe(true)
  })

  test('submitting the form through the submit event shows the error for empty input', () => {
    const form = document.getElementById('user-form')
    const input = document.getElementById('user-input')
    const errorMessage = document.getElementById('error-message')
    const container = document.getElementById('dynamic-content')

    input.value = ''
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))

    expect(errorMessage.textContent).toBe('Input cannot be empty')
    expect(errorMessage.classList.contains('hidden')).toBe(false)
    expect(container.textContent).toBe('')
  })
})