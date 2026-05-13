import { defineStore } from 'pinia'

import { ref } from 'vue'

import type { AlertEvent } from '../../realtime/types/realtime.types'

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<AlertEvent[]>([])

  function addToast(event: AlertEvent) {
    toasts.value.unshift(event)

    setTimeout(() => {
      removeToast(event.id)
    }, 5000)
  }

  function removeToast(id: string) {
    toasts.value = toasts.value.filter((toast) => toast.id !== id)
  }

  return {
    toasts,

    addToast,

    removeToast,
  }
})
