import { defineStore } from 'pinia'
import type { RealtimeEvent, MetricEvent, AlertEvent, ActivityEvent } from '../types/realtime.types'

interface RealtimeState {
  metrics: MetricEvent[]
  alerts: AlertEvent[]
  activity: ActivityEvent[]
  isPaused: boolean
  isRunning: boolean
}

export const useRealtimeStore = defineStore('realtime', {
  state: (): RealtimeState => ({
    metrics: [],
    alerts: [],
    activity: [],
    isPaused: false,
    isRunning: false,
  }),

  actions: {
    togglePause() {
      this.isPaused = !this.isPaused
    },

    setRunning(status: boolean) {
      this.isRunning = status
    },

    clearAll() {
      this.metrics = []
      this.alerts = []
      this.activity = []
    },

    addEvent(event: RealtimeEvent) {
      if (this.isPaused) return
      try {
        switch (event.type) {
          case 'metric':
            this.metrics.unshift(event)
            this.metrics = this.metrics.slice(0, 100)
            break

          case 'alert':
            this.alerts.unshift(event)
            this.alerts = this.alerts.slice(0, 100)
            break

          case 'activity':
            this.activity.unshift(event)
            this.activity = this.activity.slice(0, 100)
            break
        }
      } catch (error) {
        // Silently handle store errors to prevent UI crashes
      }
    },
  },
})
