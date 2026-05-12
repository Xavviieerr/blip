<template>
  <div class="controls">
    <button @click="start">START STREAM</button>

    <button @click="stop">STOP STREAM</button>

    <p>
      Metrics:
      {{ realtime.metrics.length }}
    </p>

    <p>
      Alerts:
      {{ realtime.alerts.length }}
    </p>

    <p>
      Activity:
      {{ realtime.activity.length }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useRealtimeStore } from '../store/realtime.store'

import { streamService } from '../services/stream.service'

const realtime = useRealtimeStore()

function start() {
  console.log('🟢 START BUTTON CLICKED')

  streamService.start()
}

function stop() {
  console.log('🔴 STOP BUTTON CLICKED')

  streamService.stop()
}
</script>

<style scoped>
.controls {
  background: var(--card-bg);

  border: 1px solid var(--border-color);

  padding: 20px;

  border-radius: 16px;

  display: flex;

  gap: 16px;

  align-items: center;

  flex-wrap: wrap;
}

button {
  padding: 10px 16px;

  border: none;

  border-radius: 8px;

  cursor: pointer;
}
</style>
