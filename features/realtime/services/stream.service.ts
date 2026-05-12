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

  private handleThrottledEmit(event: RealtimeEvent) {
    try {
      for (const subscriber of this.subscribers) {
        subscriber(event)
      }

      this.store.addEvent(event)

      console.log('📡 EVENT EMITTED')
    } catch (error) {
      console.error('❌ THROTTLED EMIT ERROR', error)
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

    console.log('👂 SUBSCRIBER ADDED')

    return () => {
      this.subscribers.delete(callback)

      console.log('🧹 SUBSCRIBER REMOVED')
    }
  }

  private emit(event: RealtimeEvent) {
    const validation = this.validateEvent(event)

    if (!validation?.success) {
      console.error('❌ INVALID EVENT BLOCKED', validation.error)

      return
    }

    eventBufferService.add(event)

    this.throttledEmit(event)
  }

  private reconnect() {
    this.connectionStore.setStatus('reconnecting')

    this.connectionStore.incrementReconnect()

    const delay = Math.min(1000 * this.connectionStore.reconnectAttempts, 5000)

    console.log(`🔄 RECONNECTING IN ${delay}ms`)

    this.reconnectTimeout = window.setTimeout(() => {
      this.reconnectTimeout = null
      this.start()
    }, delay)
  }

  private simulateFailure() {
    console.warn('⚠ SIMULATED CONNECTION FAILURE')

    this.connectionStore.setStatus('error')

    this.connectionStore.setError('Random connection drop detected')

    this.stop()

    this.reconnect()
  }

  start() {
    if (this.isRunning) {
      console.warn('⚠ STREAM ALREADY RUNNING')

      return
    }

    this.isRunning = true

    try {
      console.log('🚀 STARTING STREAM...')

      this.connectionStore.setStatus('connecting')

      // simulate connection delay
      setTimeout(() => {
        this.connectionStore.setStatus('connected')

        this.connectionStore.setConnectedNow()

        console.log('✅ STREAM CONNECTED')
      }, 1000)

      // 📊 metrics stream
      const metricsInterval = window.setInterval(() => {
        const event = generateMetricEvent()

        this.emit(event)
      }, 1000)

      // 🚨 alerts stream
      const alertsInterval = window.setInterval(() => {
        const event = generateAlertEvent()

        this.emit(event)
      }, 3000)

      // 🧾 activity stream
      const activityInterval = window.setInterval(() => {
        const event = generateActivityEvent()

        this.emit(event)
      }, 2000)

      // random simulated failure
      const failureInterval = window.setInterval(() => {
        const randomFailure = Math.random() < 0.1

        if (randomFailure) {
          this.simulateFailure()
        }
      }, 10000)

      // save intervals for cleanup
      this.intervals.push(metricsInterval, alertsInterval, activityInterval, failureInterval)
    } catch (error) {
      console.error('❌ STREAM START ERROR', error)

      this.connectionStore.setStatus('error')
    }
  }

  stop() {
    console.log('🛑 STOPPING STREAM')

    this.connectionStore.setStatus('disconnected')

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout)
      this.reconnectTimeout = null
    }

    this.intervals.forEach((interval) => {
      clearInterval(interval)
    })
    this.isRunning = false
    this.intervals = []
  }
}

export const streamService = new StreamService()
