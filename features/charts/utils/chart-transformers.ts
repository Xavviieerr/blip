import type { MetricEvent } from '../../realtime/types/realtime.types'

import type { RealtimeSeries, HeatmapPoint } from '../types/chart.types'

export function buildCPUTrend(metrics: MetricEvent[]): RealtimeSeries {
  return {
    labels: metrics.map((m) => new Date(m.timestamp).toLocaleTimeString()),

    values: metrics.map((m) => m.metric.cpu),
  }
}

export function buildMemoryTrend(metrics: MetricEvent[]): RealtimeSeries {
  return {
    labels: metrics.map((m) => new Date(m.timestamp).toLocaleTimeString()),

    values: metrics.map((m) => m.metric.memory),
  }
}

export function buildNetworkTrend(metrics: MetricEvent[]): RealtimeSeries {
  return {
    labels: metrics.map((m) => new Date(m.timestamp).toLocaleTimeString()),

    values: metrics.map((m) => m.metric.network),
  }
}

// export function buildHeatmapData(metrics: MetricEvent[]): HeatmapPoint[] {
//   return metrics.map((metric, index) => ({
//     x: index % 10,

//     y: Math.floor(index / 10),

//     value: metric.metric.cpu,
//   }))
// }
