import { computed } from 'vue'

import { useRealtimeStore } from '../../realtime/store/realtime.store'
import { useFilterStore } from '../../filters/store/filter.store'
import { filterByTimeRange } from '../../realtime/utils/time-window'
import { buildHeatmapData } from '../utils/heatmap-transformer'

import { buildCPUTrend, buildMemoryTrend, buildNetworkTrend } from '../utils/chart-transformers'

export function useChartData() {
  const store = useRealtimeStore()

  const requestSeries = computed(() => {
    return {
      labels: filteredMetrics.value.map((_, index) => index),

      values: filteredMetrics.value.map((item) => item.metric.requests),
    }
  })

  const cpuSeries = computed(() => {
    return buildCPUTrend(filteredMetrics.value)
  })

  const memorySeries = computed(() => {
    return buildMemoryTrend(filteredMetrics.value)
  })

  const heatmapSeries = computed(() => {
    return buildHeatmapData(store.alerts)
  })

  const networkSeries = computed(() => {
    return buildNetworkTrend(filteredMetrics.value)
  })

  const filters = useFilterStore()

  const filteredMetrics = computed(() => {
    return filterByTimeRange(store.metrics, filters.timeRange)
  })

  return {
    cpuSeries,
    memorySeries,
    networkSeries,
    heatmapSeries,
    requestSeries,
  }
}
