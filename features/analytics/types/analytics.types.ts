export interface SystemMetricsSummary {
  avgCpu: number
  avgMemory: number
  maxCpu: number
  minCpu: number

  totalRequests: number
  totalAlerts: number

  spikeDetected: boolean
}
