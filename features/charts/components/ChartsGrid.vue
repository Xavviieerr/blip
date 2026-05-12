<template>
  <div class="grid">
    <CPUChart />
  </div>
</template>

<script setup lang="ts">
import CPUChart from './CPUChart.vue'
</script>

<style scoped>
.grid {
  display: grid;

  grid-template-columns: 1fr;

  gap: 20px;
}
</style>
