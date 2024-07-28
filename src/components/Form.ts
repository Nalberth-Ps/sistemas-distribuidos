import { ContactFormData } from '../typings/form'

export function extractFormData(form: HTMLFormElement): ContactFormData {
  const formData = new FormData(form)

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const lookingFor = formData.get('looking-for') as string
  const agree = formData.get('agree') as string

  return {
    name,
    email,
    phone,
    lookingFor,
    agree: agree === 'on',
  }
}

export function handleFormSubmission(event: Event) {
  event.preventDefault()

  const form = event.target as HTMLFormElement
  const formData = extractFormData(form)

  if (
    !isFormDataValid(formData) ||
    !isEmailValid(formData.email) ||
    !isPhoneValid(formData.phone)
  )
    return

  console.log({ ...formData })

  form.reset()
  updateSubmitButtonState(form)
}

export function isEmailValid(email: string) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(email)
}

export function isPhoneValid(phone: string) {
  const phonePattern = /^\d{10,11}$/
  return phonePattern.test(phone)
}

export function updateSubmitButtonState(form: HTMLFormElement) {
  const submitButton = form.querySelector<HTMLButtonElement>(
    'button[type="submit"]',
  )
  if (!submitButton) return

  const formData = extractFormData(form)
  const isFormValid = isFormDataValid(formData)

  submitButton.disabled = !isFormValid
}

export function isFormDataValid(formData: ContactFormData): boolean {
  return (
    !!formData.name &&
    isEmailValid(formData.email) &&
    isPhoneValid(formData.phone) &&
    !!formData.lookingFor &&
    formData.agree
  )
}

export function initializeForm() {
  const form = document.getElementById('contact-form') as HTMLFormElement
  if (!form) return console.warn('Form not found')

  const submitButton = form.querySelector<HTMLButtonElement>(
    'button[type="submit"]',
  )
  if (!submitButton) return console.warn('Submit button not found')

  form.addEventListener('submit', handleFormSubmission)
  form.addEventListener('input', () => updateSubmitButtonState(form))
  form.addEventListener('change', () => updateSubmitButtonState(form))

  updateSubmitButtonState(form)
}
