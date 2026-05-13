<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="chart-container">
      <CPUChart />
    </div>
    <div class="chart-container">
      <MemoryChart />
    </div>
    <div class="chart-container">
      <NetworkAreaChart />
    </div>
    <div class="chart-container">
      <RequestsBarChart />
    </div>
    <div class="chart-container md:col-span-2">
      <HeatmapChart />
    </div>
  </div>
</template>

<script setup lang="ts">
import CPUChart from './CPUChart.vue'
import MemoryChart from './MemoryChart.vue'
import NetworkAreaChart from './NetworkAreaChart.vue'
import RequestsBarChart from './RequestsBarChart.vue'
import HeatmapChart from './HeatmapChart.vue'
</script>

<style scoped>
.chart-container {
  min-width: 0;
  width: 100%;
}
</style>
