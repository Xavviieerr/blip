<template>
  <div class="dashboard">
    <aside class="sidebar">
      <h2>SentinelX</h2>

      <p>Cybersecurity Monitoring</p>
    </aside>

    <main class="content">
      <DashboardHeader />

      <RealtimeControls />

      <ConnectionStatus />

      <FiltersPanel />

      <MetricsGrid />

      <ChartsGrid />

      <ToastContainer />

      <ActivityFeed />
    </main>
  </div>
</template>

<script setup lang="ts">
import DashboardHeader from '../components/DashboardHeader.vue'

import ToastContainer from '../../alerts/components/ToastContainer.vue'

import ConnectionStatus from '../../realtime/components/ConnectionStatus.vue'

import FiltersPanel from '../../filters/components/FiltersPanel.vue'

import MetricsGrid from '../../analytics/components/MetricsGrid.vue'

import ChartsGrid from '../../charts/components/ChartsGrid.vue'

import ActivityFeed from '../../activity-feed/components/ActivityFeed.vue'
import RealtimeControls from '../../realtime/components/RealtimeControls.vue'
import { useRealtimeSync } from '../../realtime/hooks/useRealtimeSync'

useRealtimeSync()
</script>

<style scoped>
.dashboard {
  display: grid;

  grid-template-columns: 260px 1fr;

  min-height: 100vh;
}

.sidebar {
  border-right: 1px solid var(--border-color);

  padding: 24px;

  background: var(--bg-secondary);
}

.content {
  padding: 24px;

  display: flex;

  flex-direction: column;

  gap: 24px;

  max-width: 1400px;

  margin: 0 auto;
}
@media (max-width: 768px) {
  .dashboard {
    grid-template-columns: 1fr;
  }

  .sidebar {
    display: none;
  }
}
</style>
