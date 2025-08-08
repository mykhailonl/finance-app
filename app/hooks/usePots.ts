import { useSuspenseQuery } from '@tanstack/react-query'

export default function usePots() {
  return useSuspenseQuery({
    queryKey: ['pots'],
    queryFn: async () => {
      const baseUrl =
        typeof window !== 'undefined'
          ? window.location.origin
          : 'http://localhost:5173'

      const res = await fetch(`${baseUrl}/data/data.json`)
      const data = await res.json()

      return {
        pots: data.pots,
      }
    },
  })
}
