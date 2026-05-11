import { defineStore } from 'pinia'
import type { RealtimeEvent, MetricEvent, AlertEvent, ActivityEvent } from '../types/realtime.types'

interface RealtimeState {
  metrics: MetricEvent[]
  alerts: AlertEvent[]
  activity: ActivityEvent[]
  isPaused: boolean
}

export const useRealtimeStore = defineStore('realtime', {
  state: (): RealtimeState => ({
    metrics: [],
    alerts: [],
    activity: [],
    isPaused: false,
  }),

  actions: {
    togglePause() {
      this.isPaused = !this.isPaused

      console.log(this.isPaused ? '⏸ STREAM PAUSED' : '▶ STREAM RESUMED')
    },

    clearAll() {
      this.metrics = []
      this.alerts = []
      this.activity = []

      console.log('🧹 STORE CLEARED')
    },

    addEvent(event: RealtimeEvent) {
      if (this.isPaused) return

      try {
        switch (event.type) {
          case 'metric':
            this.metrics.unshift(event)

            // keep last 100
            this.metrics = this.metrics.slice(0, 100)

            console.log('📊 STORED METRIC')
            break

          case 'alert':
            this.alerts.unshift(event)

            this.alerts = this.alerts.slice(0, 100)

            console.log('🚨 STORED ALERT')
            break

          case 'activity':
            this.activity.unshift(event)

            this.activity = this.activity.slice(0, 100)

            console.log('🧾 STORED ACTIVITY')
            break
        }
      } catch (error) {
        console.error('❌ STORE ERROR', error)
      }
    },
  },
})
