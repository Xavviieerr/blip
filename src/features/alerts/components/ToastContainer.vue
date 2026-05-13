<template>
  <div class="toast-container">
    <TransitionGroup name="toast">
      <AlertToast
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        :event="toast"
        @close="remove(toast.id)"
      />
    </TransitionGroup>
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
.toast-container {
  position: fixed;
  bottom: 24px;
  left: 80px; /* Offset to clear the thin sidebar */
  z-index: 10000;
  display: flex;
  flex-direction: column-reverse; /* Newest on top */
  gap: 12px;
  pointer-events: none; /* Allow clicking through container gap */
}

/* Ensure toasts within container can be clicked */
.toast-container > * {
  pointer-events: auto;
}

/* Transition Group Animations */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}
</style>
