import { use } from 'echarts/core'

import { CanvasRenderer } from 'echarts/renderers'

import { LineChart, HeatmapChart, BarChart } from 'echarts/charts'

import {
  GridComponent,
  TooltipComponent,
  VisualMapComponent,
  LegendComponent,
} from 'echarts/components'

use([
  CanvasRenderer,

  LineChart,
  HeatmapChart,
  BarChart,

  GridComponent,
  TooltipComponent,
  VisualMapComponent,
  LegendComponent,
])
