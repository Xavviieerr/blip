import type { AlertEvent, Severity } from '../types/realtime.types'
import { THREAT_TYPES } from '../constants/threat-types'

const severities: Severity[] = ['low', 'medium', 'high', 'critical']

const messages = [
  'Suspicious login attempt',
  'CPU spike detected',
  'DDOS traffic surge',
  'Firewall anomaly',
  'Unusual API activity',
]

const sources = ['Auth Service', 'Gateway', 'Firewall', 'Analytics Engine']

function randomItem<T>(array: T[]): T {
  if (array.length === 0) {
    throw new Error('Array is empty')
  }
  return array[Math.floor(Math.random() * array.length)]!
}

export function generateAlertEvent(): AlertEvent {
  const event: AlertEvent = {
    id: crypto.randomUUID(),

    timestamp: Date.now(),

    type: 'alert',

    alert: {
      severity: randomItem(severities) || 'low',

      message: randomItem(messages),

      source: randomItem(sources),

      threatType: THREAT_TYPES[Math.floor(Math.random() * THREAT_TYPES.length)]!,
    },
  }

  console.log('🚨 ALERT EVENT GENERATED')

  console.log(event)

  return event
}
