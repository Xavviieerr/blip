import { defineStore } from 'pinia'

import type { ConnectionStatus } from '../types/connection.types'

interface ConnectionState {
  status: ConnectionStatus

  reconnectAttempts: number

  lastConnectedAt: number | null

  error: string | null
}

export const useConnectionStore = defineStore('connection', {
  state: (): ConnectionState => ({
    status: 'idle',

    reconnectAttempts: 0,

    lastConnectedAt: null,

    error: null,
  }),

  actions: {
    setStatus(status: ConnectionStatus) {
      this.status = status
    },

    setError(message: string) {
      this.error = message
    },

    clearError() {
      this.error = null
    },

    incrementReconnect() {
      this.reconnectAttempts++
    },

    resetReconnects() {
      this.reconnectAttempts = 0
    },

    setConnectedNow() {
      this.lastConnectedAt = Date.now()
    },
  },
})
