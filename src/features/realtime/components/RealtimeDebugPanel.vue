<template>
  <div>
    <h2>Realtime Debug Panel</h2>

    <hr />

    <!-- STATUS -->
    <p><strong>Status:</strong> {{ status }}</p>

    <!-- CONTROLS -->
    <button @click="startStream">Start Stream</button>
    <button @click="stopStream">Stop Stream</button>
    <button @click="togglePause">
      {{ store.isPaused ? 'Resume Store' : 'Pause Store' }}
    </button>

    <hr />

    <h3>Time Range</h3>

    <button @click="filters.setTimeRange('1m')">1m</button>
    <button @click="filters.setTimeRange('5m')">5m</button>
    <button @click="filters.setTimeRange('15m')">15m</button>
    <button @click="filters.setTimeRange('1h')">1h</button>

    <hr />

    <!-- STORE SUMMARY -->
    <h3>Store Summary</h3>
    <p>Metrics: {{ store.metrics.length }}</p>
    <p>Alerts: {{ store.alerts.length }}</p>
    <p>Activity: {{ store.activity.length }}</p>

    <hr />
    <!-- <hr />
    <h3>System Analytics</h3>
    <p>Avg CPU: {{ summary.avgCpu }}</p>
    <p>Max CPU: {{ summary.maxCpu }}</p>
    <p>Total Requests: {{ summary.totalRequests }}</p>
    <p>Total Alerts: {{ summary.totalAlerts }}</p>
    <p>Spike Detected: {{ summary.spikeDetected }}</p> -->

    <p>
      Health Status:
      {{ alertLevel }}
    </p>

    <!-- LIVE SAMPLE DATA -->
    <h3>Latest Metric</h3>
    <pre v-if="store.metrics[0]"
      >{{ store.metrics[0] }}
    </pre>

    <h3>Latest Alert</h3>
    <pre v-if="store.alerts[0]"
      >{{ store.alerts[0] }}
    </pre>

    <h3>Latest Activity</h3>
    <pre v-if="store.activity[0]"
      >{{ store.activity[0] }}
    </pre>
    <hr />

    <h3>Connection</h3>

    <p>Status: {{ connection.status }}</p>

    <p>
      Reconnect Attempts:
      {{ connection.reconnectAttempts }}
    </p>

    <p>
      Last Connected:
      {{ connection.lastConnectedAt }}
    </p>

    <p>Error: {{ connection.error }}</p>

    <hr />

    <!-- SYSTEM ANALYTICS -->
    <h3>System Analytics</h3>
    <div
      :style="{
        color: alertLevel === 'danger' ? 'red' : alertLevel === 'warning' ? 'orange' : 'inherit',
      }"
    >
      <p>
        <strong>Health:</strong>
        {{ isHealthy ? 'Healthy ✅' : 'Spike Detected 🚨' }}
      </p>
      <p><strong>Avg CPU:</strong> {{ summary.avgCpu.toFixed(2) }}%</p>
      <p><strong>Max CPU:</strong> {{ summary.maxCpu.toFixed(2) }}%</p>
      <p><strong>Total Requests:</strong> {{ summary.totalRequests }}</p>
      <p><strong>Alert Level:</strong> {{ alertLevel.toUpperCase() }}</p>
    </div>

    <hr />

    <h3>CPU SERIES</h3>

    <pre>{{ cpuSeries }}</pre>

    <hr />

    <h3>HEATMAP DATA</h3>

    <pre>{{ heatmapSeries }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

import { useRealtimeStore } from '../store/realtime.store'
import { streamService } from '../services/stream.service'
import { useRealtimeSelectors } from '../hooks/useRealtimeSelectors'
import { useChartData } from '../../charts/hooks/useChartData'
import { useConnectionStore } from '../store/connection.store'
import { useFilterStore } from '../../filters/store/filter.store'
import { useAnalytics } from '../../analytics/hooks/useAnalytics'

const filters = useFilterStore()
const { summary, isHealthy, alertLevel } = useAnalytics()
const connection = useConnectionStore()
const { cpuSeries, heatmapSeries } = useChartData()
const { cpuTrend, recentActivity, criticalAlerts, latestMetrics } = useRealtimeSelectors()

const store = useRealtimeStore()

const status = ref<'running' | 'stopped'>('stopped')

function startStream() {
  streamService.start()
  status.value = 'running'
}

function stopStream() {
  streamService.stop()
  status.value = 'stopped'
}

function togglePause() {
  store.togglePause()
}
</script>
