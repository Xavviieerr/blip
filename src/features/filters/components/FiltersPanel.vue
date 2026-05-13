<template>
  <div
    class="flex items-center gap-2 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] px-3 py-2 backdrop-blur-xl"
  >
    <h3 class="mr-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
      Filters
    </h3>

    <button
      @click="filters.setTimeRange('1m')"
      class="rounded-xl px-3 py-1.5 text-[11px] font-medium tracking-wide text-[var(--text-secondary)] transition-all duration-200 ease-in-out hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
    >
      1m
    </button>

    <button
      @click="filters.setTimeRange('5m')"
      class="rounded-xl bg-[var(--primary)] px-3 py-1.5 text-[11px] font-semibold tracking-wide text-white shadow-[0_6px_18px_var(--primary-glow)] transition-all duration-200 ease-in-out hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
    >
      5m
    </button>

    <button
      @click="filters.setTimeRange('15m')"
      class="rounded-xl px-3 py-1.5 text-[11px] font-medium tracking-wide text-[var(--text-secondary)] transition-all duration-200 ease-in-out hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
    >
      15m
    </button>

    <button
      @click="filters.setTimeRange('1h')"
      class="rounded-xl px-3 py-1.5 text-[11px] font-medium tracking-wide text-[var(--text-secondary)] transition-all duration-200 ease-in-out hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
    >
      1h
    </button>
  </div>
</template>

<script setup lang="ts">
import { useFilterStore } from '../store/filter.store'

const filters = useFilterStore()
</script>
