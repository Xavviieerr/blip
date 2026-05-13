<template>
  <div
    class="group relative flex flex-col gap-2 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4 transition-all duration-200 hover:border-[var(--primary)] hover:bg-[var(--card-hover)]"
  >
    <div class="flex justify-between items-start">
      <p class="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
        {{ title }}
      </p>
      <div class="w-1.5 h-1.5 rounded-full" :class="statusColor"></div>
    </div>

    <div class="flex items-baseline gap-1">
      <h2
        class="text-xl font-black tracking-tight text-[var(--text-primary)] group-hover:text-[var(--primary)]"
      >
        {{ Math.round(displayValue) }}
      </h2>
      <span v-if="unit" class="text-[10px] font-bold text-[var(--text-muted)]">{{ unit }}</span>
    </div>
    
    <div class="mt-1 h-1 bg-[var(--border-color)] rounded-full overflow-hidden">
      <div 
        class="h-full bg-[var(--primary)] transition-all duration-500"
        :style="{ width: `${Math.min(displayValue, 100)}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'

const props = defineProps<{
  title: string
  value: number
  unit?: string
}>()

const displayValue = ref(props.value)

const statusColor = computed(() => {
  if (props.value > 80) return 'bg-[var(--danger)]'
  if (props.value > 60) return 'bg-[var(--warning)]'
  return 'bg-[var(--success)]'
})

watch(() => props.value, (nv) => { displayValue.value = nv })

onMounted(() => { displayValue.value = props.value })
</script>
