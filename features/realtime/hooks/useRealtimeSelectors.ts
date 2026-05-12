import { computed } from 'vue'
import { useRealtimeStore } from '../store/realtime.store'

export function useRealtimeSelectors() {
  const store = useRealtimeStore()

  // 📊 latest metrics only (chart-ready)
  const latestMetrics = computed(() => {
    return store.metrics.slice(0, 20)
  })

  // 🚨 critical alerts only
  const criticalAlerts = computed(() => {
    return store.alerts.filter((a) => a.alert.severity === 'critical')
  })

  // 🧾 recent activity (UI feed ready)
  const recentActivity = computed(() => {
    return store.activity.slice(0, 50)
  })

  // 📈 CPU trend extraction (example for charts)
  const cpuTrend = computed(() => {
    return store.metrics.slice(0, 20).map((m) => ({
      time: m.timestamp,
      value: m.metric.cpu,
    }))
  })

  return {
    latestMetrics,
    criticalAlerts,
    recentActivity,
    cpuTrend,
  }
}
