import type { ActivityEvent } from '../types/realtime.types'

const actions = [
  'User login',
  'Database queried',
  'Token refreshed',
  'File uploaded',
  'Permission updated',
]

const users = ['alice', 'john', 'mary', 'admin']

function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]!
}

function generateIP() {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(
    Math.random() * 255,
  )}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
}

export function generateActivityEvent(): ActivityEvent {
  const event: ActivityEvent = {
    id: crypto.randomUUID(),

    timestamp: Date.now(),

    type: 'activity',

    activity: {
      action: randomItem(actions),

      user: randomItem(users),

      ip: generateIP(),
    },
  }

  console.log('🧾 ACTIVITY EVENT GENERATED')
  console.log(event)

  return event
}
