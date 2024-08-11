import { Notification, ServiceResponse } from '../typings/api'

export const createNotification = async (
  phoneNumber: string,
  targetValue: number,
) => {
  try {
    const response = await fetch('http://localhost:3000/notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber, targetValue }),
    })

    if (!response.ok) throw new Error('Failed to create notification')

    return response.json() as Promise<ServiceResponse<Notification>>
  } catch (error) {
    console.error(error)

    const response: ServiceResponse<Notification> = {
      status: 'error',
      message: 'Desculpe, não foi possível criar a notificação',
      data: { phoneNumber, targetValue },
    }

    return response
  }
}
