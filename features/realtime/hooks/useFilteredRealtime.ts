import { computed } from 'vue'
import { useRealtimeStore } from '../store/realtime.store'
import { useFilterStore } from '../../filters/store/filter.store'

export function useFilteredRealtime() {
  const store = useRealtimeStore()
  const filters = useFilterStore()

  const filteredMetrics = computed(() => {
    if (!filters.showMetrics) return []

    return store.metrics.slice(0, 50)
  })

  const filteredAlerts = computed(() => {
    if (!filters.showAlerts) return []

    return store.alerts.slice(0, 50)
  })

  const filteredActivity = computed(() => {
    if (!filters.showActivity) return []

    return store.activity.slice(0, 50)
  })

  return {
    filteredMetrics,
    filteredAlerts,
    filteredActivity,
  }
}
