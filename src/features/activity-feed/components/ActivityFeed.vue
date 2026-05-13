<template>
  <div class="feed-container">
    <div class="feed-header">
      <div class="title-section">
        <h3>Intelligence Feed</h3>
        <div class="badge">{{ filteredAlerts.length }}</div>
      </div>
      <div class="search-wrapper">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input v-model="searchQuery" placeholder="Quick filter..." />
      </div>
    </div>

    <div class="feed-list custom-scrollbar">
      <TransitionGroup name="list">
        <ActivityRow v-for="event in filteredAlerts" :key="event.id" :event="event" />
      </TransitionGroup>
      
      <div v-if="filteredAlerts.length === 0" class="empty-state">
        <p>No matches</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ActivityRow from './ActivityRow.vue'
import { useRealtimeStore } from '../../realtime/store/realtime.store'

const store = useRealtimeStore()
const searchQuery = ref('')

const filteredAlerts = computed(() => {
  const query = searchQuery.value.toLowerCase()
  const baseAlerts = store.alerts.slice(0, 50)

  if (!query) return baseAlerts

  return baseAlerts.filter(
    (a) =>
      a.alert.message.toLowerCase().includes(query) ||
      a.alert.threatType.toLowerCase().includes(query) ||
      a.alert.source.toLowerCase().includes(query),
  )
})
</script>

<style scoped>
.feed-container {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
}

.feed-header {
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-secondary);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.title-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-section h3 {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.badge {
  font-size: 9px;
  font-weight: 800;
  color: var(--primary);
  background: var(--primary-glow);
  padding: 2px 8px;
  border-radius: 99px;
}

.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  color: var(--text-muted);
}

.search-wrapper svg {
  position: absolute;
  left: 10px;
}

.search-wrapper input {
  width: 100%;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 6px 10px 6px 30px;
  color: var(--text-primary);
  font-size: 11px;
  outline: none;
}

.feed-list {
  flex: 1;
  overflow-y: auto;
  max-height: 700px;
}

.custom-scrollbar::-webkit-scrollbar { width: 3px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: var(--border-color); }

.empty-state {
  padding: 30px 10px;
  text-align: center;
  color: var(--text-muted);
  font-size: 11px;
}

.list-enter-active, .list-leave-active { transition: all 0.3s ease; }
.list-enter-from { opacity: 0; transform: translateX(20px); }
.list-leave-to { opacity: 0; transform: translateX(-20px); }
</style>
