<template>
  <header class="header">
    <div>
      <h1>Threat Intelligence Center</h1>

      <p>Real-time network threat monitoring</p>
    </div>
    <ThemeToggle />

    <div class="status">
      <span class="dot" />

      LIVE
    </div>
  </header>
</template>

<script setup lang="ts">
import ThemeToggle from '@/components/shared/ThemeToggle.vue'
</script>

<style scoped>
.header {
  display: flex;

  justify-content: space-between;

  align-items: center;
}

.status {
  display: flex;

  align-items: center;

  gap: 8px;

  color: var(--success);
}

.dot {
  width: 10px;

  height: 10px;

  border-radius: 999px;

  background: var(--success);
}
</style>
