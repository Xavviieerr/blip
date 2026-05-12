<template>
  <div class="chart-card">
    <h3>Threat Heatmap</h3>

    <v-chart class="chart" :option="option" autoresize />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import VChart from 'vue-echarts'

import { useChartData } from '../hooks/useChartData'

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

    max: 20,

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
