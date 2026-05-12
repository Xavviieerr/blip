<template>
  <div class="card">
    <p class="title">
      {{ title }}
    </p>

    <h2 class="value">
      {{ Math.round(value) }}
    </h2>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  value: number
}>()
</script>

<style scoped>
.card {
  background: var(--card-bg);

  border: 1px solid var(--border-color);

  border-radius: 16px;

  padding: 20px;
}

.title {
  color: var(--text-secondary);

  margin-bottom: 12px;
}

.value {
  font-size: 32px;

  margin: 0;
}
</style>
