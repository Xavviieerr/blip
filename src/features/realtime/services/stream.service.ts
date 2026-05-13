import { generateMetricEvent } from '../generators/metrics.generator'
import { generateAlertEvent } from '../generators/alerts.generator'
import { generateActivityEvent } from '../generators/activity.generator'
import type { RealtimeEvent } from '../types/realtime.types'
import { useRealtimeStore } from '../store/realtime.store'
import { useConnectionStore } from '../store/connection.store'
import { eventBufferService } from './event-buffer.service'
import { throttle } from '../../../hooks/useThrottle'
import { MetricEventSchema, AlertEventSchema, ActivityEventSchema } from '../../../lib/validators'

type Subscriber = (event: RealtimeEvent) => void

class StreamService {
  private subscribers = new Set<Subscriber>()

  private intervals: number[] = []

  private reconnectTimeout: number | null = null

  private isRunning = false

  private _store: ReturnType<typeof useRealtimeStore> | null = null

  private _connectionStore: ReturnType<typeof useConnectionStore> | null = null

  private get connectionStore() {
    if (!this._connectionStore) {
      this._connectionStore = useConnectionStore()
    }
    return this._connectionStore
  }

  private validateEvent(event: RealtimeEvent) {
    switch (event.type) {
      case 'metric':
        return MetricEventSchema.safeParse(event)

      case 'alert':
        return AlertEventSchema.safeParse(event)

      case 'activity':
        return ActivityEventSchema.safeParse(event)
    }
  }

  private handleThrottledEmit() {
    try {
      const events = eventBufferService.flush()

      for (const event of events) {
        for (const subscriber of this.subscribers) {
          subscriber(event)
        }
      }
    } catch (error) {
      // Silently handle emission errors to prevent cascade failures
    }
  }

  private throttledEmit = throttle(this.handleThrottledEmit.bind(this), 100)

  private get store() {
    if (!this._store) {
      this._store = useRealtimeStore()
    }
    return this._store
  }

  subscribe(callback: Subscriber) {
    this.subscribers.add(callback)

    return () => {
      this.subscribers.delete(callback)
    }
  }

  private emit(event: RealtimeEvent) {
    const validation = this.validateEvent(event)

    if (!validation?.success) {
      // Silently drop invalid events
      return
    }

    eventBufferService.add(event)

    this.throttledEmit()
  }

  private reconnect() {
    this.connectionStore.setStatus('reconnecting')
    this.connectionStore.incrementReconnect()

    const delay = Math.min(1000 * this.connectionStore.reconnectAttempts, 5000)

    this.reconnectTimeout = window.setTimeout(() => {
      this.reconnectTimeout = null
      this.start()
    }, delay)
  }

  private simulateFailure() {
    this.connectionStore.setStatus('error')
    this.connectionStore.setError('Connection lost. Reconnecting...')
    this.stop()
    this.reconnect()
  }

  start() {
    if (this.isRunning) return

    this.isRunning = true
    this.store.setRunning(true)

    try {
      this.connectionStore.setStatus('connecting')

      setTimeout(() => {
        this.connectionStore.setStatus('connected')
        this.connectionStore.setConnectedNow()
      }, 1000)

      const metricsInterval = window.setInterval(() => {
        this.emit(generateMetricEvent())
      }, 1000)

      const alertsInterval = window.setInterval(() => {
        this.emit(generateAlertEvent())
      }, 3000)

      const activityInterval = window.setInterval(() => {
        this.emit(generateActivityEvent())
      }, 2000)

      const failureInterval = window.setInterval(() => {
        if (Math.random() < 0.1) {
          this.simulateFailure()
        }
      }, 10000)

      this.intervals.push(metricsInterval, alertsInterval, activityInterval, failureInterval)
    } catch (error) {
      this.connectionStore.setStatus('error')
    }
  }

  stop() {
    this.connectionStore.setStatus('disconnected')

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout)
      this.reconnectTimeout = null
    }

    this.intervals.forEach((interval) => {
      clearInterval(interval)
    })
    this.isRunning = false
    this.store.setRunning(false)
    this.intervals = []
  }
}

export const streamService = new StreamService()
