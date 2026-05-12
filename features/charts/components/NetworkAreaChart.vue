<template>
  <div class="chart-card">
    <h3>Network Traffic</h3>

    <v-chart class="chart" :option="option" autoresize />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import VChart from 'vue-echarts'

import { useChartData } from '../hooks/useChartData'

const { networkSeries } = useChartData()

const option = computed(() => ({
  tooltip: {
    trigger: 'axis',
  },

  xAxis: {
    type: 'category',

    data: networkSeries.value.labels,
  },

  yAxis: {
    type: 'value',
  },

  series: [
    {
      type: 'line',

      smooth: true,

      areaStyle: {},

      data: networkSeries.value.values,
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
  height: 350px;
}
</style>
