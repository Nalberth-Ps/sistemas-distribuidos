import { createNotification } from '../services/notify'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

interface DollarMonitoringFormData {
  phoneNumber: string
  targetValue: number
  agree: boolean
}

export function extractFormData(
  form: HTMLFormElement,
): DollarMonitoringFormData {
  const formData = new FormData(form)

  const phoneNumber = formData.get('phoneNumber') as string
  const targetValue = parseFloat(formData.get('target-value') as string)
  const agree = formData.get('agree') as string

  return {
    phoneNumber,
    targetValue,
    agree: agree === 'on',
  }
}

export async function handleFormSubmission(event: Event) {
  event.preventDefault()

  const form = event.target as HTMLFormElement
  const formData = extractFormData(form)

  if (!isFormDataValid(formData) || !isPhoneValid(formData.phoneNumber)) return

  console.log({ ...formData })

  const notification = await createNotification(
    formData.phoneNumber,
    formData.targetValue,
  )

  if (notification.status === 'error') {
    toastr.error(notification.message)
  } else {
    toastr.success(notification.message)
  }

  updateSubmitButtonState(form)
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

export function isFormDataValid(formData: DollarMonitoringFormData): boolean {
  return (
    isPhoneValid(formData.phoneNumber) &&
    formData.targetValue > 0 &&
    formData.agree
  )
}

export function initializeForm() {
  const form = document.getElementById(
    'dollar-monitoring-form',
  ) as HTMLFormElement
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
