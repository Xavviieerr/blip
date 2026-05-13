import type { RealtimeEvent } from '../types/realtime.types'

class EventBufferService {
  private buffer: RealtimeEvent[] = []

  add(event: RealtimeEvent) {
    this.buffer.push(event)

    // prevent infinite growth
    if (this.buffer.length > 500) {
      this.buffer.shift()
    }
  }

  flush() {
    const events = [...this.buffer]

    this.buffer = []

    return events
  }

  size() {
    return this.buffer.length
  }
}

export const eventBufferService = new EventBufferService()
