<template>
  <div class="chart-card">
    <h3>Requests Per Interval</h3>

    <v-chart class="chart" :option="option" autoresize />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import VChart from 'vue-echarts'

import { useChartData } from '../hooks/useChartData'

const { requestSeries } = useChartData()

const option = computed(() => ({
  tooltip: {
    trigger: 'axis',
  },

  xAxis: {
    type: 'category',

    data: requestSeries.value.labels,
  },

  yAxis: {
    type: 'value',
  },

  series: [
    {
      type: 'bar',

      data: requestSeries.value.values,
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
