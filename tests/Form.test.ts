/**
 * @jest-environment jsdom
 */

import {
  extractFormData,
  handleFormSubmission,
  initializeForm,
  updateSubmitButtonState,
} from '../src/components/Form'

describe('Form Component', () => {
  let form: HTMLFormElement | null

  const getInputElement = (name: string): HTMLInputElement => {
    const input = form?.querySelector<HTMLInputElement>(`input[name="${name}"]`)
    if (!input) throw new Error(`${name} input not found`)
    return input
  }

  const setInputValue = (name: string, value: string | boolean) => {
    const input = getInputElement(name)
    if (typeof value === 'boolean') {
      ;(input as HTMLInputElement).checked = value
    } else {
      ;(input as HTMLInputElement).value = value
    }
  }

  beforeEach(() => {
    form = document.getElementById('contact-form') as HTMLFormElement
    if (form) {
      form.reset = jest.fn() // Mock the reset function
    }
    initializeForm() // Initialize form after setting up the DOM
  })

  test('extractFormData should return correct data', () => {
    if (!form) throw new Error('Form not found')

    setInputValue('name', 'John Doe')
    setInputValue('email', 'john@example.com')
    setInputValue('phone', '1234567890')
    setInputValue('looking-for', 'Job')
    setInputValue('agree', true)

    const data = extractFormData(form)
    expect(data).toEqual({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      lookingFor: 'Job',
      agree: true,
    })
  })

  test('handleFormSubmission should prevent default and reset form', () => {
    if (!form) throw new Error('Form not found')

    const mockEvent = {
      preventDefault: jest.fn(),
      target: form,
    } as unknown as Event

    setInputValue('name', 'John Doe')
    setInputValue('email', 'john@example.com')
    setInputValue('phone', '1234567890')
    setInputValue('looking-for', 'Job')
    setInputValue('agree', true)

    handleFormSubmission(mockEvent)

    expect(mockEvent.preventDefault).toHaveBeenCalled()
    expect(form.reset).toHaveBeenCalled()
  })

  test('initializeForm should add event listener to form', () => {
    if (!form) throw new Error('Form not found')

    const addEventListenerSpy = jest.spyOn(form, 'addEventListener')

    initializeForm()

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'submit',
      expect.any(Function),
    )
  })

  test('form submission with missing required fields should not reset form', () => {
    if (!form) throw new Error('Form not found')

    const mockEvent = {
      preventDefault: jest.fn(),
      target: form,
    } as unknown as Event

    setInputValue('name', '')
    setInputValue('email', '')

    handleFormSubmission(mockEvent)

    expect(mockEvent.preventDefault).toHaveBeenCalled()
    expect(form.reset).not.toHaveBeenCalled()
  })

  test('form submission with invalid email should not reset form', () => {
    if (!form) throw new Error('Form not found')

    const mockEvent = {
      preventDefault: jest.fn(),
      target: form,
    } as unknown as Event

    setInputValue('name', 'John Doe')
    setInputValue('email', 'invalid-email')

    handleFormSubmission(mockEvent)

    expect(mockEvent.preventDefault).toHaveBeenCalled()
    expect(form.reset).not.toHaveBeenCalled()
  })

  test('submit button should be disabled until form is valid', () => {
    if (!form) throw new Error('Form not found')

    const submitButton = form.querySelector<HTMLButtonElement>(
      'button[type="submit"]',
    )
    if (!submitButton) throw new Error('Submit button not found')

    setInputValue('name', '')
    setInputValue('email', '')
    setInputValue('phone', '')
    setInputValue('looking-for', '')
    setInputValue('agree', false)

    // Check initial state
    updateSubmitButtonState(form)
    expect(submitButton.disabled).toBe(true)

    // Simulate filling out the form
    setInputValue('name', 'John Doe')
    setInputValue('email', 'john@example.com')
    setInputValue('phone', '1234567890')
    setInputValue('looking-for', 'Job')
    setInputValue('agree', true)

    // Dispatch input events to trigger the validation
    getInputElement('name').dispatchEvent(new Event('input'))
    getInputElement('email').dispatchEvent(new Event('input'))
    getInputElement('phone').dispatchEvent(new Event('input'))
    getInputElement('looking-for').dispatchEvent(new Event('input'))
    getInputElement('agree').dispatchEvent(new Event('change'))

    // Now, the submit button should be enabled
    updateSubmitButtonState(form)
    expect(submitButton.disabled).toBe(false)
  })

  test('initializeForm should warn if form is not found', () => {
    document.body.innerHTML = ''
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

    initializeForm()

    expect(warnSpy).toHaveBeenCalledWith('Form not found')

    warnSpy.mockRestore()
  })
})
