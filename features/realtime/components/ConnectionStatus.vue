<template>
  <div>
    <h3>Connection</h3>

    <p>Status: {{ connection.status }}</p>

    <p>
      Reconnect Attempts:
      {{ connection.reconnectAttempts }}
    </p>

    <p v-if="connection.error">
      Error:
      {{ connection.error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useConnectionStore } from '../store/connection.store'

const connection = useConnectionStore()
</script>
