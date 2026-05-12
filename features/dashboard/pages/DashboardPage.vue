<template>
  <div>
    <h1>Realtime Analytics Dashboard</h1>

    <ConnectionStatus />

    <FiltersPanel />

    <MetricsGrid />

    <ChartsGrid />

    <ActivityFeed />
  </div>
</template>

<script setup lang="ts">
import ConnectionStatus from '../../realtime/components/ConnectionStatus.vue'

import FiltersPanel from '../../filters/components/FiltersPanel.vue'

import MetricsGrid from '../../analytics/components/MetricsGrid.vue'

import ChartsGrid from '../../charts/components/ChartsGrid.vue'

import ActivityFeed from '../../activity-feed/components/ActivityFeed.vue'
</script>
