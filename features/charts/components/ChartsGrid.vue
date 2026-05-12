<template>
  <div class="grid">
    <CPUChart />

    <NetworkAreaChart />

    <RequestsBarChart />

    <HeatmapChart />
  </div>
</template>

<script setup lang="ts">
import CPUChart from './CPUChart.vue'

import NetworkAreaChart from './NetworkAreaChart.vue'

import RequestsBarChart from './RequestsBarChart.vue'

import HeatmapChart from './HeatmapChart.vue'
</script>

<style scoped>
.grid {
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));

  gap: 20px;
}
</style>
