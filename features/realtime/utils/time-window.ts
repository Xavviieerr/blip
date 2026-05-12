import type { MetricEvent, AlertEvent, ActivityEvent } from '../types/realtime.types'

import type { TimeRange } from '../../filters/types/time-range.types'

function getCutoffTime(range: TimeRange) {
  const now = Date.now()

  const map = {
    '1m': 60 * 1000,
    '5m': 5 * 60 * 1000,
    '15m': 15 * 60 * 1000,
    '1h': 60 * 60 * 1000,
  }

  return now - map[range]
}

export function filterByTimeRange<T extends { timestamp: number }>(
  data: T[],
  range: TimeRange,
): T[] {
  const cutoff = getCutoffTime(range)

  return data.filter((item) => item.timestamp >= cutoff)
}
