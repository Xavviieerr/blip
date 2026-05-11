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
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

import { useRealtimeStore } from '../store/realtime.store'
import { streamService } from '../services/stream.service'
import { useRealtimeSelectors } from '../hooks/useRealtimeSelectors'
const { cpuTrend, recentActivity, criticalAlerts, latestMetrics } = useRealtimeSelectors()

watchEffect(() => {
  console.log('======================')

  console.log('📊 latestMetrics', JSON.parse(JSON.stringify(latestMetrics.value)))

  console.log('🚨 criticalAlerts', JSON.parse(JSON.stringify(criticalAlerts.value)))

  console.log('🧾 recentActivity', JSON.parse(JSON.stringify(recentActivity.value)))

  console.log('📈 cpuTrend', JSON.parse(JSON.stringify(cpuTrend.value)))
})

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
