<template>
  <div class="chart-card">
    <h3>Threat Heatmap</h3>

    <v-chart class="chart" :option="option" :theme="themeStore.theme" autoresize />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import VChart from 'vue-echarts'

import { CanvasRenderer } from 'echarts/renderers'

import { HeatmapChart } from 'echarts/charts'

import { GridComponent, TooltipComponent, VisualMapComponent } from 'echarts/components'

import { use } from 'echarts/core'

import { useChartData } from '../hooks/useChartData'

import { useThemeStore } from '../../../stores/theme.store'

use([CanvasRenderer, HeatmapChart, GridComponent, TooltipComponent, VisualMapComponent])

const themeStore = useThemeStore()

const { heatmapSeries } = useChartData()

const option = computed(() => ({
  tooltip: {},

  xAxis: {
    type: 'category',

    data: heatmapSeries.value.xLabels,
  },

  yAxis: {
    type: 'category',

    data: heatmapSeries.value.yLabels,
  },

  visualMap: {
    min: 0,

    max: 100,

    calculable: true,

    orient: 'horizontal',

    left: 'center',

    bottom: 0,
  },

  series: [
    {
      type: 'heatmap',

      data: heatmapSeries.value.data,

      emphasis: {
        itemStyle: {
          shadowBlur: 10,
        },
      },
    },
  ],
}))
</script>

<style scoped>
.chart-card {
  background: var(--card-bg);

  border: 1px solid var(--border-color);

  border-radius: 16px;

  padding: 20px;
}

.chart {
  height: 400px;
}
</style>
