<template>
  <div class="chart-card">
    <div class="chart-header">
      <div class="title-group">
        <h3>Requests Volume</h3>
        <p class="subtitle">API transaction rate</p>
      </div>
      <div class="stat">
        <span class="value">{{ currentVal }}/s</span>
      </div>
    </div>

    <v-chart class="chart" :option="option" :theme="themeStore.theme" autoresize />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { use } from 'echarts/core'
import { useChartData } from '../hooks/useChartData'
import { useThemeStore } from '../../../stores/theme.store'

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent])

const themeStore = useThemeStore()
const { requestSeries } = useChartData()

const currentVal = computed(() => {
  if (!requestSeries.value.values.length) return 0
  return requestSeries.value.values[requestSeries.value.values.length - 1]
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
      padding: [6, 10]
    },
    xAxis: {
      type: 'category',
      data: requestSeries.value.labels,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: textColor, fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: borderColor, type: 'dashed' } },
      axisLabel: { color: textColor, fontSize: 10 }
    },
    series: [
      {
        name: 'Requests',
        type: 'bar',
        barWidth: '60%',
        itemStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#10b981' },
              { offset: 1, color: '#059669' }
            ]
          },
          borderRadius: [2, 2, 0, 0]
        },
        data: requestSeries.value.values
      }
    ],
    grid: { left: '2%', right: '4%', top: '10%', bottom: '5%', containLabel: true }
  }
})
</script>

<style scoped>
.chart-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 16px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.title-group h3 {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.subtitle {
  font-size: 11px;
  color: var(--text-muted);
  margin: 0;
}

.stat .value {
  font-size: 15px;
  font-weight: 800;
  color: #10b981;
}

.chart {
  height: 240px;
}
</style>
