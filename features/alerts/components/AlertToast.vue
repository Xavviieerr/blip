<template>
  <div class="toast" :class="event.alert.severity">
    <div>
      <p class="title">
        {{ event.alert.message }}
      </p>

      <p class="meta">
        {{ event.alert.threatType }}
      </p>
    </div>

    <button class="close" @click="$emit('close')">✕</button>
  </div>
</template>

<script setup lang="ts">
import type { AlertEvent } from '../../realtime/types/realtime.types'

defineProps<{
  event: AlertEvent
}>()

defineEmits(['close'])
</script>

<style scoped>
.toast {
  width: 320px;

  padding: 16px;

  border-radius: 12px;

  display: flex;

  justify-content: space-between;

  align-items: start;

  color: white;

  animation: slideIn 0.25s ease;
}

.low {
  background: #166534;
}

.medium {
  background: #a16207;
}

.high {
  background: #c2410c;
}

.critical {
  background: #b91c1c;
}

.title {
  margin: 0;

  font-weight: bold;
}

.meta {
  margin-top: 6px;

  font-size: 13px;

  opacity: 0.85;
}

.close {
  background: transparent;

  border: none;

  color: white;

  cursor: pointer;

  font-size: 16px;
}

@keyframes slideIn {
  from {
    opacity: 0;

    transform: translateX(30px);
  }

  to {
    opacity: 1;

    transform: translateX(0);
  }
}
</style>
