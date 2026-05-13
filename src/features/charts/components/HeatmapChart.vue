<template>
  <div class="chart-card">
    <div class="chart-header">
      <div class="title-group">
        <h3>Threat Heatmap</h3>
        <p class="subtitle">Spatial distribution</p>
      </div>
      <div class="legend-mini">
        <div class="grad"></div>
      </div>
    </div>

    <v-chart class="chart" :option="option" :theme="themeStore.theme" autoresize />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { CanvasRenderer } from 'echarts/renderers'
import { HeatmapChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, VisualMapComponent } from 'echarts/components'
import { use } from 'echarts/core'
import { useChartData } from '../hooks/useChartData'
import { useThemeStore } from '../../../stores/theme.store'

use([CanvasRenderer, HeatmapChart, GridComponent, TooltipComponent, VisualMapComponent])

const themeStore = useThemeStore()
const { heatmapSeries } = useChartData()

const option = computed(() => {
  const isDark = themeStore.theme === 'dark'
  const textColor = isDark ? '#94a3b8' : '#64748b'
  const borderColor = isDark ? '#334155' : '#e2e8f0'

  return {
    backgroundColor: 'transparent',
    tooltip: {
      position: 'top',
      backgroundColor: isDark ? '#1e293b' : '#ffffff',
      borderColor: borderColor,
      textStyle: { color: isDark ? '#f8fafc' : '#0f172a', fontSize: 10 },
      padding: [6, 10]
    },
    xAxis: {
      type: 'category',
      data: heatmapSeries.value.xLabels,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: textColor, fontSize: 10 }
    },
    yAxis: {
      type: 'category',
      data: heatmapSeries.value.yLabels,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: textColor, fontSize: 10 }
    },
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '1%',
      itemWidth: 10,
      itemHeight: 80,
      inRange: {
        color: isDark 
          ? ['#0f172a', '#1e293b', '#3b82f6', '#ef4444']
          : ['#f8fafc', '#e2e8f0', '#93c5fd', '#f87171']
      },
      textStyle: { color: textColor, fontSize: 8 }
    },
    series: [{
      name: 'Level',
      type: 'heatmap',
      data: heatmapSeries.value.data,
      itemStyle: {
        borderColor: isDark ? '#1e293b' : '#ffffff',
        borderWidth: 1,
        borderRadius: 2
      }
    }],
    grid: { top: '5%', bottom: '15%', left: '5%', right: '2%', containLabel: true }
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

.legend-mini .grad {
  width: 40px;
  height: 3px;
  background: linear-gradient(to right, #3b82f6, #ef4444);
  border-radius: 2px;
}

.chart {
  height: 280px;
}
</style>
