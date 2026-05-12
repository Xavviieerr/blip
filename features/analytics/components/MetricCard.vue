<template>
  <div>
    <h4>{{ title }}</h4>

    <p>{{ value }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  value: number
}>()
</script>
