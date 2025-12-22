import { useState, useCallback, useRef, useEffect } from 'react'
import type { MetricData } from '../types'

interface UseStreamSimulationOptions {
  interval?: number
  autoStart?: boolean
}

export function useStreamSimulation(options: UseStreamSimulationOptions = {}) {
  const { interval = 1000, autoStart = false } = options

  const [metrics, setMetrics] = useState<MetricData[]>([])
  const [isStreaming, setIsStreaming] = useState(autoStart)
  const intervalRef = useRef<NodeJS.Timeout>()
  const baselineRef = useRef({
    cpu: 30 + Math.random() * 20,
    memory: 40 + Math.random() * 30,
    requests: 100 + Math.random() * 50,
    latency: 50 + Math.random() * 30
  })

  const generateMetric = useCallback((): MetricData => {
    const baseline = baselineRef.current

    // Add some variance to create realistic fluctuations
    const variance = (base: number, range: number) => {
      const change = (Math.random() - 0.5) * range
      return Math.max(0, Math.min(100, base + change))
    }

    const metric: MetricData = {
      cpu: variance(baseline.cpu, 10),
      memory: variance(baseline.memory, 8),
      requests: Math.max(0, baseline.requests + (Math.random() - 0.5) * 30),
      latency: Math.max(0, baseline.latency + (Math.random() - 0.5) * 20),
      timestamp: Date.now()
    }

    // Gradually drift the baseline
    baseline.cpu = variance(baseline.cpu, 2)
    baseline.memory = variance(baseline.memory, 1.5)
    baseline.requests = Math.max(0, baseline.requests + (Math.random() - 0.5) * 5)
    baseline.latency = Math.max(0, baseline.latency + (Math.random() - 0.5) * 3)

    return metric
  }, [])

  const start = useCallback(() => {
    if (intervalRef.current) return

    setIsStreaming(true)
    intervalRef.current = setInterval(() => {
      const metric = generateMetric()
      setMetrics(prev => {
        const newMetrics = [...prev, metric]
        // Keep only last 50 metrics
        return newMetrics.slice(-50)
      })
    }, interval)
  }, [interval, generateMetric])

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = undefined
    }
    setIsStreaming(false)
  }, [])

  const reset = useCallback(() => {
    stop()
    setMetrics([])
    baselineRef.current = {
      cpu: 30 + Math.random() * 20,
      memory: 40 + Math.random() * 30,
      requests: 100 + Math.random() * 50,
      latency: 50 + Math.random() * 30
    }
  }, [stop])

  const addMetric = useCallback((metric?: Partial<MetricData>) => {
    const newMetric: MetricData = {
      cpu: metric?.cpu ?? generateMetric().cpu,
      memory: metric?.memory ?? generateMetric().memory,
      requests: metric?.requests ?? generateMetric().requests,
      latency: metric?.latency ?? generateMetric().latency,
      timestamp: metric?.timestamp ?? Date.now()
    }

    setMetrics(prev => [...prev, newMetric].slice(-50))
  }, [generateMetric])

  useEffect(() => {
    if (autoStart) {
      start()
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [autoStart, start])

  return {
    metrics,
    isStreaming,
    start,
    stop,
    reset,
    addMetric,
    currentMetric: metrics[metrics.length - 1]
  }
}
