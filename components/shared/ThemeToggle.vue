<template>
  <button @click="toggle">Toggle Theme</button>
</template>

<script setup lang="ts">
import { useThemeStore } from '../../stores/theme.store'

const theme = useThemeStore()

function toggle() {
  theme.toggleTheme()
}
</script>
