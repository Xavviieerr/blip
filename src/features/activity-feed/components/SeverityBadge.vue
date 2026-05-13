<template>
  <span class="badge" :class="severity">
    <span class="dot" />
    <span class="text">{{ severity.toUpperCase() }}</span>
  </span>
</template>

<script setup lang="ts">
type Severity = 'low' | 'medium' | 'high' | 'critical'

defineProps<{
  severity: Severity
}>()
</script>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.badge.low {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.badge.low .dot {
  background: #10b981;
}

.badge.medium {
  background: rgba(245, 158, 11, 0.15);
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.badge.medium .dot {
  background: #f59e0b;
}

.badge.high {
  background: rgba(249, 115, 22, 0.15);
  color: #f97316;
  border: 1px solid rgba(249, 115, 22, 0.3);
}

.badge.high .dot {
  background: #f97316;
  animation: pulse 2s infinite;
}

.badge.critical {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.badge.critical .dot {
  background: #ef4444;
  animation: pulseCritical 1s infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
}

@keyframes pulseCritical {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.25);
    opacity: 0.6;
  }
}

@media (max-width: 768px) {
  .badge {
    padding: 5px 8px;
    font-size: 10px;
  }

  .dot {
    width: 5px;
    height: 5px;
  }
}

@media (max-width: 480px) {
  .badge {
    padding: 4px 6px;
    font-size: 9px;
    gap: 4px;
  }

  .text {
    display: none;
  }

  .dot {
    width: 4px;
    height: 4px;
  }
}
</style>
