export interface ChartPoint {
  label: string
  value: number
}

export interface HeatmapPoint {
  x: number
  y: number
  value: number
}

export interface RealtimeSeries {
  labels: string[]
  values: number[]
}
