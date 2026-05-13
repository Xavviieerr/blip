import { onMounted, onUnmounted } from 'vue'

import { streamService } from '../services/stream.service'

import { useRealtimeStore } from '../store/realtime.store'

import { useToastStore } from '../../alerts/store/toast.store'

export function useRealtimeSync() {
  const realtime = useRealtimeStore()

  const toastStore = useToastStore()

  onMounted(() => {
    const unsubscribe = streamService.subscribe((event) => {
      realtime.addEvent(event)

      if (
        event.type === 'alert' &&
        (event.alert.severity === 'high' || event.alert.severity === 'critical')
      ) {
        toastStore.addToast(event)
      }
    })

    onUnmounted(() => {
      unsubscribe()
    })
  })
}
