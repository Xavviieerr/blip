<template>
  <div class="chart-card">
    <h3>CPU Threat Activity</h3>

    <v-chart class="chart" :option="option" :theme="themeStore.theme" autoresize />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import VChart from 'vue-echarts'

import { CanvasRenderer } from 'echarts/renderers'

import { LineChart } from 'echarts/charts'

import { GridComponent, TooltipComponent } from 'echarts/components'

import { use } from 'echarts/core'

import { useChartData } from '../hooks/useChartData'

import { useThemeStore } from '../../../stores/theme.store'

use([CanvasRenderer, LineChart, GridComponent, TooltipComponent])

const themeStore = useThemeStore()

const { cpuSeries } = useChartData()

const option = computed(() => ({
  tooltip: {
    trigger: 'axis',
  },

  xAxis: {
    type: 'category',

    data: cpuSeries.value.labels,
  },

  yAxis: {
    type: 'value',
  },

  series: [
    {
      data: cpuSeries.value.values,

      type: 'line',

      smooth: true,
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
