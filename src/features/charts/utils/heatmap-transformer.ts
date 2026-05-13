import type { AlertEvent } from '../../realtime/types/realtime.types'

import { THREAT_TYPES } from '../../realtime/constants/threat-types'

export function buildHeatmapData(alerts: AlertEvent[]) {
  const timeSlots = 10

  const result: number[][] = []

  THREAT_TYPES.forEach((type, rowIndex) => {
    for (let col = 0; col < timeSlots; col++) {
      const value = alerts.filter((alert) => alert.alert.threatType === type).length

      result.push([col, rowIndex, value])
    }
  })

  return {
    data: result,

    xLabels: Array.from({ length: timeSlots }, (_, i) => `${i}`),

    yLabels: THREAT_TYPES,
  }
}
