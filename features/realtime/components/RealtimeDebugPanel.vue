<template>
  <div>
    <h2>Realtime Debug Panel</h2>

    <hr />

    <!-- STATUS -->
    <p><strong>Status:</strong> {{ status }}</p

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

    <h3>CPU SERIES</h3>

    <pre
      >{{ cpuSeries }}
</pre
    >

    <hr />

    <h3>HEATMAP DATA</h3>

    <pre
      >{{ heatmapSeries }}
</pre
    >
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

const filters = useFilterStore()

const connection = useConnectionStore()
const { cpuSeries, heatmapSeries } = useChartData()
const { cpuTrend, recentActivity, criticalAlerts, latestMetrics } = useRealtimeSelectors()

// watchEffect(() => {
//   console.log('======================')

//   console.log('📊 latestMetrics', JSON.parse(JSON.stringify(latestMetrics.value)))

//   console.log('🚨 criticalAlerts', JSON.parse(JSON.stringify(criticalAlerts.value)))

//   console.log('🧾 recentActivity', JSON.parse(JSON.stringify(recentActivity.value)))

//   console.log('📈 cpuTrend', JSON.parse(JSON.stringify(cpuTrend.value)))
// })

const store = useRealtimeStore()

const status = ref<'running' | 'stopped'>('stopped')

function startStream() {
  streamService.start()
  status.value = 'running'

  console.log('▶ STREAM STARTED FROM UI')
}

function stopStream() {
  streamService.stop()
  status.value = 'stopped'

  console.log('⏹ STREAM STOPPED FROM UI')
}

function togglePause() {
  store.togglePause()
}
</script>
