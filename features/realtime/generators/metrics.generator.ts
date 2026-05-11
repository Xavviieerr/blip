import type { MetricEvent } from '../types/realtime.types'

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function generateMetricEvent(): MetricEvent {
  const event: MetricEvent = {
    id: crypto.randomUUID(),

    timestamp: Date.now(),

    type: 'metric',

    metric: {
      cpu: random(20, 95),
      memory: random(30, 90),
      network: random(100, 1000),
      requests: random(1000, 10000),
    },
  }

  console.log('📊 METRIC EVENT GENERATED')
  console.log(event)

  return event
}
