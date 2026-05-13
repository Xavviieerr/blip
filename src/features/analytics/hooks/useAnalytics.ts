import { computed } from 'vue'

import { useRealtimeStore } from '../../realtime/store/realtime.store'

import { computeSystemSummary } from '../utils/analytics.engine'

import { useFilteredRealtime } from '../../realtime/hooks/useFilteredRealtime'

export function useAnalytics() {
  const store = useRealtimeStore()

  const summary = computed(() => {
    return computeSystemSummary(store.metrics, store.alerts)
  })

  const isHealthy = computed(() => {
    return !summary.value.spikeDetected
  })

  const alertLevel = computed(() => {
    if (summary.value.spikeDetected) return 'danger'

    if (summary.value.avgCpu > 70) return 'warning'

    return 'safe'
  })

  return {
    summary,
    isHealthy,
    alertLevel,
  }
}
