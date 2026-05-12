<template>
  <div>
    <h3>Filters</h3>

    <button @click="filters.setTimeRange('1m')">1m</button>

    <button @click="filters.setTimeRange('5m')">5m</button>

    <button @click="filters.setTimeRange('15m')">15m</button>

    <button @click="filters.setTimeRange('1h')">1h</button>
  </div>
</template>

<script setup lang="ts">
import { useFilterStore } from '../store/filter.store'

const filters = useFilterStore()
</script>
