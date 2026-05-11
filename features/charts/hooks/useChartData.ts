import { computed } from 'vue'

import { useRealtimeStore } from '../../realtime/store/realtime.store'

import {
  buildCPUTrend,
  buildMemoryTrend,
  buildNetworkTrend,
  buildHeatmapData,
} from '../utils/chart-transformers'

export function useChartData() {
  const store = useRealtimeStore()

  const cpuSeries = computed(() => {
    return buildCPUTrend(store.metrics)
  })

  const memorySeries = computed(() => {
    return buildMemoryTrend(store.metrics)
  })

  const networkSeries = computed(() => {
    return buildNetworkTrend(store.metrics)
  })

  const heatmapSeries = computed(() => {
    return buildHeatmapData(store.metrics)
  })

  return {
    cpuSeries,
    memorySeries,
    networkSeries,
    heatmapSeries,
  }
}
