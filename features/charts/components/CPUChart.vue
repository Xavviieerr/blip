<template>
  <div>
    <h3>CPU Trend</h3>

    <pre
      >{{ cpuSeries }}
    </pre>
  </div>
</template>

<script setup lang="ts">
import { useChartData } from '../hooks/useChartData'

const { cpuSeries } = useChartData()
</script>
