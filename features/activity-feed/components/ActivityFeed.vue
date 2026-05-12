<template>
  <div class="feed">
    <div class="header">
      <h3>Threat Activity Feed</h3>

      <p>
        {{ alerts.length }}
        events
      </p>
    </div>

    <div class="list">
      <ActivityRow v-for="event in alerts" :key="event.id" :event="event" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import ActivityRow from './ActivityRow.vue'

import { useRealtimeStore } from '../../realtime/store/realtime.store'

const store = useRealtimeStore()

const alerts = computed(() => {
  return [...store.alerts].reverse().slice(0, 20)
})
</script>

<style scoped>
.feed {
  background: var(--card-bg);

  border: 1px solid var(--border-color);

  border-radius: 16px;

  padding: 20px;
}

.header {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 20px;
}

.list {
  display: flex;

  flex-direction: column;

  max-height: 500px;

  overflow-y: auto;
}
</style>
