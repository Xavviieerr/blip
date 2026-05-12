<template>
  <div class="container">
    <AlertToast
      v-for="toast in toastStore.toasts"
      :key="toast.id"
      :event="toast"
      @close="remove(toast.id)"
    />
  </div>
</template>

<script setup lang="ts">
import AlertToast from './AlertToast.vue'

import { useToastStore } from '../store/toast.store'

const toastStore = useToastStore()

function remove(id: string) {
  toastStore.removeToast(id)
}
</script>

<style scoped>
.container {
  position: fixed;

  top: 20px;

  right: 20px;

  z-index: 9999;

  display: flex;

  flex-direction: column;

  gap: 12px;
}
</style>
