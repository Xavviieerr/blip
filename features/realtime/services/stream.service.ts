import { generateMetricEvent } from '../generators/metrics.generator'
import { generateAlertEvent } from '../generators/alerts.generator'
import { generateActivityEvent } from '../generators/activity.generator'
import type { RealtimeEvent } from '../types/realtime.types'
import { useRealtimeStore } from '../store/realtime.store'
import { useConnectionStore } from '../store/connection.store'
import { eventBufferService } from './event-buffer.service'
import { throttle } from '../../../hooks/useThrottle'

type Subscriber = (event: RealtimeEvent) => void

class StreamService {
  private subscribers = new Set<Subscriber>()

  private intervals: number[] = []

  private _store: ReturnType<typeof useRealtimeStore> | null = null

  private _connectionStore: ReturnType<typeof useConnectionStore> | null = null

  private get connectionStore() {
    if (!this._connectionStore) {
      this._connectionStore = useConnectionStore()
    }
    return this._connectionStore
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

    console.log('✅ SUBSCRIBER ADDED')

    return () => {
      this.subscribers.delete(callback)

      console.log('❌ SUBSCRIBER REMOVED')
    }
  }

  // private emit(event: RealtimeEvent) {
  //   try {
  //     for (const subscriber of this.subscribers) {
  //       subscriber(event)
  //     }

  //     this.store.addEvent(event)

  //     console.log('📡 EVENT ROUTED TO STORE')
  //   } catch (error) {
  //     console.error('❌ EMIT ERROR', error)
  //   }
  // }
  private emit(event: RealtimeEvent) {
    eventBufferService.add(event)

    this.throttledEmit(event)
  }

  private reconnect() {
    this.connectionStore.setStatus('reconnecting')

    this.connectionStore.incrementReconnect()

    const delay = Math.min(1000 * this.connectionStore.reconnectAttempts, 5000)

    console.log(`🔄 RECONNECTING IN ${delay}ms`)

    setTimeout(() => {
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

      // save intervals for cleanup
      this.intervals.push(metricsInterval, alertsInterval, activityInterval)

      // random simulated failure
      window.setInterval(() => {
        const randomFailure = Math.random() < 0.1

        if (randomFailure) {
          this.simulateFailure()
        }
      }, 10000)
    } catch (error) {
      console.error('❌ STREAM START ERROR', error)

      this.connectionStore.setStatus('error')
    }
  }

  stop() {
    console.log('🛑 STOPPING STREAM')

    this.connectionStore.setStatus('disconnected')

    this.intervals.forEach((interval) => {
      clearInterval(interval)
    })

    this.intervals = []
  }
}

export const streamService = new StreamService()
