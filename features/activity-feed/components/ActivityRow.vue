<template>
  <div class="row">
    <div class="left">
      <SeverityBadge :severity="event.alert.severity" />

      <div>
        <p class="message">
          {{ event.alert.message }}
        </p>

        <p class="meta">
          {{ event.alert.threatType }}
          •
          {{ event.alert.source }}
        </p>
      </div>
    </div>

    <span class="time">
      {{ formattedTime }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import SeverityBadge from './SeverityBadge.vue'

import type { AlertEvent } from '../../realtime/types/realtime.types'

const props = defineProps<{
  event: AlertEvent
}>()

const formattedTime = computed(() => {
  return new Date(props.event.timestamp).toLocaleTimeString()
})
</script>

<style scoped>
.row {
  display: flex;

  justify-content: space-between;

  align-items: center;

  padding: 14px 0;

  border-bottom: 1px solid var(--border-color);
}

.left {
  display: flex;

  gap: 12px;

  align-items: center;
}

.message {
  margin: 0;

  font-weight: 600;
}

.meta {
  margin: 4px 0 0;

  color: var(--text-secondary);

  font-size: 13px;
}

.time {
  color: var(--text-secondary);

  font-size: 13px;
}
</style>
