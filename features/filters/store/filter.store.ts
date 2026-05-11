import { defineStore } from 'pinia'

export type TimeRange = '1m' | '5m' | '1h'

interface FilterState {
  timeRange: TimeRange
  showAlerts: boolean
  showMetrics: boolean
  showActivity: boolean
}

export const useFilterStore = defineStore('filters', {
  state: (): FilterState => ({
    timeRange: '5m',
    showAlerts: true,
    showMetrics: true,
    showActivity: true,
  }),

  actions: {
    setTimeRange(range: TimeRange) {
      this.timeRange = range
      console.log('⏱ TIME RANGE SET:', range)
    },

    toggleAlerts() {
      this.showAlerts = !this.showAlerts
    },

    toggleMetrics() {
      this.showMetrics = !this.showMetrics
    },

    toggleActivity() {
      this.showActivity = !this.showActivity
    },
  },
})
