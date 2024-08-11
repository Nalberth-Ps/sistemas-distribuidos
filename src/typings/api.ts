export interface ServiceResponse<T> {
  status: 'success' | 'error'
  message: string
  data: T
}

export interface Notification {
  phoneNumber: string
  targetValue: number
}
