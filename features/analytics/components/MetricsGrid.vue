<template>
  <div>
    <h2>System Metrics</h2>

    <div>
      <MetricCard title="Avg CPU" :value="summary.avgCpu" />

      <MetricCard title="Max CPU" :value="summary.maxCpu" />

      <MetricCard title="Requests" :value="summary.totalRequests" />

      <MetricCard title="Alerts" :value="summary.totalAlerts" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAnalytics } from '../hooks/useAnalytics'

import MetricCard from './MetricCard.vue'

const { summary, isHealthy, alertLevel } = useAnalytics()
</script>
