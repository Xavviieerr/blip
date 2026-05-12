<template>
  <div>
    <h2>Activity Feed</h2>

    <div v-for="item in activity" :key="item.id">
      <p>
        {{ item.timestamp }}
      </p>

      <pre
        >{{ item }}
      </pre>

      <hr />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useRealtimeStore } from '../../realtime/store/realtime.store'

const store = useRealtimeStore()

const activity = computed(() => store.activity.slice(0, 20))
</script>
