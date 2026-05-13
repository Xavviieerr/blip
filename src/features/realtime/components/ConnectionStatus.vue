<template>
  <div
    class="flex flex-col gap-3 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4 backdrop-blur-xl"
  >
    <h3 class="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
      Connection
    </h3>

    <div class="flex items-center justify-between">
      <span class="text-[11px] font-medium text-[var(--text-secondary)]"> Status </span>

      <span
        class="rounded-xl px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]"
        :class="
          connection.status === 'connected'
            ? 'bg-[rgba(16,185,129,0.12)] text-[var(--success)] border border-[rgba(16,185,129,0.25)]'
            : connection.status === 'connecting'
              ? 'bg-[rgba(59,130,246,0.12)] text-[var(--info)] border border-[rgba(59,130,246,0.25)]'
              : 'bg-[rgba(239,68,68,0.12)] text-[var(--danger)] border border-[rgba(239,68,68,0.25)]'
        "
      >
        {{ connection.status }}
      </span>
    </div>

    <div class="flex items-center justify-between">
      <span class="text-[11px] font-medium text-[var(--text-secondary)]"> Reconnect </span>

      <span class="text-[11px] font-semibold text-[var(--text-primary)]">
        {{ connection.reconnectAttempts }}
      </span>
    </div>

    <div
      v-if="connection.error"
      class="rounded-2xl border border-[rgba(239,68,68,0.25)] bg-[rgba(239,68,68,0.08)] px-3 py-2 text-[11px] font-medium text-[var(--danger)]"
    >
      {{ connection.error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConnectionStore } from '../store/connection.store'

const connection = useConnectionStore()
</script>
