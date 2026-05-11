import { generateMetricEvent } from '../generators/metrics.generator'

import { generateAlertEvent } from '../generators/alerts.generator'

import { generateActivityEvent } from '../generators/activity.generator'

import type { RealtimeEvent } from '../types/realtime.types'

import { useRealtimeStore } from '../store/realtime.store'

type Subscriber = (event: RealtimeEvent) => void

class StreamService {
  private subscribers = new Set<Subscriber>()

  private intervals: number[] = []

  private store = useRealtimeStore()

  subscribe(callback: Subscriber) {
    this.subscribers.add(callback)

    console.log('✅ SUBSCRIBER ADDED')

    return () => {
      this.subscribers.delete(callback)

      console.log('❌ SUBSCRIBER REMOVED')
    }
  }

  private emit(event: RealtimeEvent) {
    try {
      for (const subscriber of this.subscribers) {
        subscriber(event)
      }

      this.store.addEvent(event)

      console.log('📡 EVENT ROUTED TO STORE')
    } catch (error) {
      console.error('❌ EMIT ERROR', error)
    }
  }

  start() {
    console.log('🚀 STREAM STARTED')

    const metricsInterval = window.setInterval(() => {
      const event = generateMetricEvent()

      this.emit(event)
    }, 1000)

    const alertsInterval = window.setInterval(() => {
      const event = generateAlertEvent()

      this.emit(event)
    }, 3000)

    const activityInterval = window.setInterval(() => {
      const event = generateActivityEvent()

      this.emit(event)
    }, 2000)

    this.intervals.push(metricsInterval, alertsInterval, activityInterval)
  }

  stop() {
    console.log('🛑 STREAM STOPPED')

    this.intervals.forEach(clearInterval)

    this.intervals = []
  }
}

export const streamService = new StreamService()
