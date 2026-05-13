import { z } from 'zod'

export const MetricEventSchema = z.object({
  id: z.string(),

  type: z.literal('metric'),

  timestamp: z.number(),

  metric: z.object({
    cpu: z.number(),
    memory: z.number(),
    network: z.number(),
    requests: z.number(),
  }),
})

export const AlertEventSchema = z.object({
  id: z.string(),

  type: z.literal('alert'),

  timestamp: z.number(),

  alert: z.object({
    severity: z.enum(['low', 'medium', 'high', 'critical']),

    message: z.string(),

    threatType: z.string(),

    source: z.string(),
  }),
})

export const ActivityEventSchema = z.object({
  id: z.string(),

  type: z.literal('activity'),

  timestamp: z.number(),

  activity: z.object({
    user: z.string(),
    action: z.string(),
    ip: z.string(),
  }),
})
