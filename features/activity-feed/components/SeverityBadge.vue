<template>
  <span class="badge" :class="severity">
    {{ severity.toUpperCase() }}
  </span>
</template>

<script setup lang="ts">
import type { Severity } from '../../realtime/types/realtime.types'

defineProps<{
  severity: Severity
}>()
</script>

<style scoped>
.badge {
  padding: 4px 10px;

  border-radius: 999px;

  font-size: 12px;

  font-weight: bold;
}

.low {
  background: #1e3a2f;
  color: #4ade80;
}

.medium {
  background: #3b2f1d;
  color: #facc15;
}

.high {
  background: #3f2817;
  color: #fb923c;
}

.critical {
  background: #3f1d1d;
  color: #f87171;
}
</style>
