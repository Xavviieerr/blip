import { onMounted, onUnmounted } from 'vue'

import { streamService } from '../services/stream.service'

import { useRealtimeStore } from '../store/realtime.store'

export function useRealtimeSync() {
  const realtime = useRealtimeStore()

  onMounted(() => {
    const unsubscribe = streamService.subscribe((event) => {
      console.log('📦 EVENT RECEIVED VIA SYNC:', event)

      realtime.addEvent(event)
    })

    onUnmounted(() => {
      unsubscribe()
    })
  })
}
