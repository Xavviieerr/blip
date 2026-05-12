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

export function buildRequestTrend(metrics: MetricEvent[]): RealtimeSeries {
  return {
    labels: metrics.map((m) => new Date(m.timestamp).toLocaleTimeString()),

    values: metrics.map((m) => m.metric.requests),
  }
}

export function buildHeatmapData(metrics: MetricEvent[]) {
  const xLabels = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09']
  const yLabels = ['R1', 'R2', 'R3', 'R4', 'R5']

  const data = metrics.slice(0, 50).map((metric, index) => {
    return [index % 10, Math.floor(index / 10), metric.metric.cpu]
  })

  return {
    xLabels,
    yLabels,
    data,
  }
}
