import { useRef } from 'react'

export const useRateLimiter = (maxRequestsPerMinute = 60) => {
  const requestTimestamps = useRef<number[]>([])

  const checkRateLimit = (): boolean => {
    const now = Date.now()
    const oneMinuteAgo = now - 60000

    // Deleting old requests
    requestTimestamps.current = requestTimestamps.current.filter(
      (t) => t > oneMinuteAgo
    )

    // Checking the limit
    if (requestTimestamps.current.length >= maxRequestsPerMinute) {
      return false
    }

    requestTimestamps.current.push(now)
    return true
  }

  return { checkRateLimit }
}
