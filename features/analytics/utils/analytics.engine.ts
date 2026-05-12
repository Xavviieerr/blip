import type { MetricEvent, AlertEvent } from '../../realtime/types/realtime.types'

import type { SystemMetricsSummary } from '../types/analytics.types'

export function computeSystemSummary(
  metrics: MetricEvent[],
  alerts: AlertEvent[],
): SystemMetricsSummary {
  if (!metrics.length) {
    return {
      avgCpu: 0,
      avgMemory: 0,
      maxCpu: 0,
      minCpu: 0,
      totalRequests: 0,
      totalAlerts: alerts.length,
      spikeDetected: false,
    }
  }

  const cpuValues = metrics.map((m) => m.metric.cpu)

  const memoryValues = metrics.map((m) => m.metric.memory)

  const avgCpu = cpuValues.reduce((a, b) => a + b, 0) / cpuValues.length

  const avgMemory = memoryValues.reduce((a, b) => a + b, 0) / memoryValues.length

  const maxCpu = Math.max(...cpuValues)
  const minCpu = Math.min(...cpuValues)

  // simple spike detection
  const spikeDetected = maxCpu - avgCpu > 30

  const totalRequests = metrics.reduce((sum, m) => sum + m.metric.requests, 0)

  return {
    avgCpu,
    avgMemory,
    maxCpu,
    minCpu,
    totalRequests,
    totalAlerts: alerts.length,
    spikeDetected,
  }
}
