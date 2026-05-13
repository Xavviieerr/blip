<template>
  <div class="toast-wrapper" :class="event.alert.severity">
    <div class="severity-stripe"></div>
    
    <div class="toast-content">
      <div class="toast-icon">
        <svg v-if="event.alert.severity === 'low'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>
        </svg>
        <svg v-else-if="event.alert.severity === 'critical'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12" y2="17"/>
        </svg>
        <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12" y2="17"/>
        </svg>
      </div>

      <div class="text-group">
        <p class="message">{{ event.alert.message }}</p>
        <p class="type">{{ event.alert.threatType }} • {{ event.alert.source }}</p>
      </div>

      <button class="close-btn" @click="$emit('close')">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
    
    <div class="progress-track">
      <div class="progress-bar"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import type { AlertEvent } from '../../realtime/types/realtime.types'

const props = defineProps<{
  event: AlertEvent
}>()

const emit = defineEmits(['close'])

onMounted(() => {
  setTimeout(() => emit('close'), 5000)
})
</script>

<style scoped>
.toast-wrapper {
  width: 340px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
  position: relative;
  backdrop-filter: blur(10px);
  animation: toastIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes toastIn {
  from { opacity: 0; transform: translateX(50px) scale(0.9); }
  to { opacity: 1; transform: translateX(0) scale(1); }
}

.severity-stripe {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
}

.low .severity-stripe { background: var(--success); }
.medium .severity-stripe { background: var(--warning); }
.high .severity-stripe { background: #f97316; }
.critical .severity-stripe { background: var(--danger); }

.toast-content {
  padding: 14px 14px 14px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.toast-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.low .toast-icon { background: rgba(16, 185, 129, 0.1); color: var(--success); }
.medium .toast-icon { background: rgba(245, 158, 11, 0.1); color: var(--warning); }
.high .toast-icon { background: rgba(249, 115, 22, 0.1); color: #f97316; }
.critical .toast-icon { background: rgba(239, 68, 68, 0.1); color: var(--danger); }

.text-group {
  flex: 1;
  min-width: 0;
}

.message {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.type {
  margin: 2px 0 0 0;
  font-size: 11px;
  font-weight: 500;
  color: var(--text-muted);
}

.close-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;
}

.close-btn:hover {
  background: var(--bg-primary);
  color: var(--text-primary);
}

.progress-track {
  height: 2px;
  background: rgba(255, 255, 255, 0.05);
  width: 100%;
}

.progress-bar {
  height: 100%;
  width: 100%;
  animation: progress 5s linear forwards;
}

.low .progress-bar { background: var(--success); }
.medium .progress-bar { background: var(--warning); }
.high .progress-bar { background: #f97316; }
.critical .progress-bar { background: var(--danger); }

@keyframes progress {
  from { width: 100%; }
  to { width: 0%; }
}
</style>
