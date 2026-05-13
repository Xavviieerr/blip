<template>
  <div class="row" :class="{ critical: isCritical }">
    <div class="row-content">
      <div class="row-left">
        <SeverityBadge :severity="event.alert.severity" />

        <div class="row-info">
          <p class="message">{{ event.alert.message }}</p>
          <div class="meta-info">
            <span class="meta-item">{{ event.alert.threatType }}</span>
            <span class="separator">•</span>
            <span class="meta-item">{{ event.alert.source }}</span>
          </div>
        </div>
      </div>

      <div class="row-right">
        <span class="time" :title="fullTime">{{ relativeTime }}</span>
      </div>
    </div>

    <div v-if="isCritical" class="critical-indicator">
      <span class="pulse" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SeverityBadge from './SeverityBadge.vue'

interface AlertEvent {
  id: string
  timestamp: string | number
  alert: {
    message: string
    threatType: string
    source: string
    severity: 'low' | 'medium' | 'high' | 'critical'
  }
}

const props = defineProps<{ event: AlertEvent }>()

const isCritical = computed(() => props.event.alert.severity === 'critical')
const fullTime = computed(() => new Date(props.event.timestamp).toLocaleString())
const relativeTime = computed(() => {
  const diff = Date.now() - new Date(props.event.timestamp).getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  if (seconds < 60) return 'now'
  if (minutes < 60) return `${minutes}m`
  return `${Math.floor(minutes / 60)}h`
})
</script>

<style scoped>
.row {
  padding: 10px 14px;
  border-bottom: 1px solid var(--border-color);
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.row:hover { background: var(--bg-secondary); }

.row.critical { background: rgba(239, 68, 68, 0.05); }

.row-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.row-left {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  flex: 1;
  min-width: 0;
}

.row-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
}

.message {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.meta-info {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  color: var(--text-secondary);
}

.meta-item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.separator { opacity: 0.5; }

.row-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.time {
  font-size: 10px;
  color: var(--text-secondary);
  white-space: nowrap;
}

.critical-indicator {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #ef4444;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pulse {
  width: 4px;
  height: 4px;
  background: #fca5a5;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
</style>
