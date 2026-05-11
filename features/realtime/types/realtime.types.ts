export type Severity = 'low' | 'medium' | 'high' | 'critical'

export type EventType = 'metric' | 'alert' | 'activity'

export interface BaseRealtimeEvent {
  id: string
  timestamp: number
  type: EventType
}

export interface MetricEvent extends BaseRealtimeEvent {
  type: 'metric'

  metric: {
    cpu: number
    memory: number
    network: number
    requests: number
  }
}

export interface AlertEvent extends BaseRealtimeEvent {
  type: 'alert'

  alert: {
    severity: Severity
    message: string
    source: string
  }
}

export interface ActivityEvent extends BaseRealtimeEvent {
  type: 'activity'

  activity: {
    action: string
    user: string
    ip: string
  }
}

export type RealtimeEvent = MetricEvent | AlertEvent | ActivityEvent
