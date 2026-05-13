<template>
  <div class="chart-card">
    <div class="chart-header">
      <div class="title-group">
        <h3>Memory Usage</h3>
        <p class="subtitle">System RAM allocation</p>
      </div>
      <div class="stat">
        <span class="value">{{ avgMemory }}%</span>
      </div>
    </div>

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
const { memorySeries } = useChartData()

const avgMemory = computed(() => {
  if (!memorySeries.value.values.length) return 0
  const sum = memorySeries.value.values.reduce((a, b) => a + b, 0)
  return Math.round(sum / memorySeries.value.values.length)
})

const option = computed(() => {
  const isDark = themeStore.theme === 'dark'
  const textColor = isDark ? '#94a3b8' : '#64748b'
  const borderColor = isDark ? '#334155' : '#e2e8f0'

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: isDark ? '#1e293b' : '#ffffff',
      borderColor: borderColor,
      textStyle: { color: isDark ? '#f8fafc' : '#0f172a', fontSize: 10 },
      padding: [6, 10],
    },
    xAxis: {
      type: 'category',
      data: memorySeries.value.labels,
      boundaryGap: false,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: textColor, fontSize: 10 },
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      splitLine: { lineStyle: { color: borderColor, type: 'dashed' } },
      axisLabel: { color: textColor, fontSize: 10 },
    },
    series: [
      {
        data: memorySeries.value.values,
        type: 'line',
        smooth: 0.4,
        showSymbol: false,
        lineStyle: { width: 2, color: '#3b82f6' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(59, 130, 246, 0.2)' },
              { offset: 1, color: 'rgba(59, 130, 246, 0)' },
            ],
          },
        },
      },
    ],
  }
})
</script>

<style scoped>
.chart-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  overflow: hidden;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.title-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.title-group h3 {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.3px;
}

.subtitle {
  margin: 0;
  font-size: 11px;
  color: var(--text-muted);
  font-weight: 500;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.value {
  font-size: 16px;
  font-weight: 900;
  color: var(--text-primary);
  letter-spacing: -0.5px;
}

.chart {
  flex: 1;
  min-height: 200px;
  width: 100%;
}
</style>
