<template>
  <div
    class="flex flex-col gap-3 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4 backdrop-blur-md"
  >
    <div class="flex justify-between items-center">
      <h2 class="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
        System Overview
      </h2>
      <div class="flex items-center gap-1.5">
        <span class="w-1.5 h-1.5 rounded-full" :class="isHealthy ? 'bg-[var(--success)]' : 'bg-[var(--danger)]'"></span>
        <span class="text-[8px] font-bold text-[var(--text-secondary)] uppercase">{{ isHealthy ? 'Healthy' : 'Critical' }}</span>
      </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
      <MetricCard title="Avg Load" :value="summary.avgCpu" unit="%" />
      <MetricCard title="Peak" :value="summary.maxCpu" unit="%" />
      <MetricCard title="Traffic" :value="summary.totalRequests" />
      <MetricCard title="Threats" :value="summary.totalAlerts" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAnalytics } from '../hooks/useAnalytics'
import MetricCard from './MetricCard.vue'

const { summary, isHealthy } = useAnalytics()
</script>
