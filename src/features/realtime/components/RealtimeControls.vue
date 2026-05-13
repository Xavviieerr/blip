<template>
  <div
    class="flex flex-col gap-3 rounded-2xl border border-(--border-color) bg-(--bg-secondary) p-4 backdrop-blur-md flex-1"
  >
    <div class="flex justify-between items-center">
      <h2 class="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
        Control Engine
      </h2>
      <div
        v-if="realtime.isPaused"
        class="text-[8px] font-black text-[var(--warning)] uppercase px-2 py-0.5 bg-[rgba(245,158,11,0.1)] rounded-full"
      >
        Paused
      </div>
    </div>

    <!-- ACTION ROW -->
    <div class="flex flex-wrap items-center gap-2">
      <button
        @click="start"
        :disabled="realtime.isRunning"
        class="flex-1 min-w-[90px] rounded-xl bg-[var(--primary)] px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-white transition-all hover:shadow-md disabled:opacity-50"
      >
        Start
      </button>

      <button
        @click="stop"
        :disabled="!realtime.isRunning"
        class="flex-1 min-w-[90px] rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)] transition-all hover:text-[var(--danger)] hover:border-[var(--danger)] disabled:opacity-50"
      >
        Stop
      </button>

      <button
        @click="realtime.togglePause"
        :disabled="!realtime.isRunning"
        class="flex-1 min-w-[110px] flex items-center justify-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text-primary)] transition-all hover:border-[var(--primary)] disabled:opacity-50"
      >
        <span
          class="h-1.5 w-1.5 rounded-full"
          :class="realtime.isPaused ? 'bg-[var(--warning)]' : 'bg-[var(--success)]'"
        ></span>
        {{ realtime.isPaused ? 'Resume' : 'Pause' }}
      </button>
    </div>

    <!-- DATA STATUS -->
    <div class="flex flex-wrap items-center gap-3">
      <div
        class="flex items-center gap-2 bg-[var(--card-bg)] px-2 py-1 rounded-lg border border-[var(--border-color)] text-[10px] font-bold"
      >
        <span class="text-[var(--primary)]">{{ realtime.metrics.length }}</span>
        <span class="text-[var(--text-muted)]">Metrics</span>
      </div>
      <div
        class="flex items-center gap-2 bg-[var(--card-bg)] px-2 py-1 rounded-lg border border-[var(--border-color)] text-[10px] font-bold"
      >
        <span class="text-[var(--danger)]">{{ realtime.alerts.length }}</span>
        <span class="text-[var(--text-muted)]">Alerts</span>
      </div>
      <div
        class="flex items-center gap-2 bg-[var(--card-bg)] px-2 py-1 rounded-lg border border-[var(--border-color)] text-[10px] font-bold"
      >
        <span class="text-[var(--info)]">{{ realtime.activity.length }}</span>
        <span class="text-[var(--text-muted)]">Activity</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRealtimeStore } from '../store/realtime.store'
import { streamService } from '../services/stream.service'

const realtime = useRealtimeStore()

function start() {
  streamService.start()
}
function stop() {
  streamService.stop()
}
</script>
