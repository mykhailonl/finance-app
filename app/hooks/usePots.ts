import { useSuspenseQuery } from '@tanstack/react-query'

import { useAuth } from '~/hooks/useAuth'
import { potService } from '~/services/potService'
import type { Pot, ThemeColor } from '~/types'

interface UsePotsReturn {
  pots: Pot[]
  usedColors: ThemeColor[]
}

export default function usePots() {
  const { user } = useAuth()

  return useSuspenseQuery<UsePotsReturn>({
    queryKey: ['pots', user?.id],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const pots = await potService.getAll()

      return {
        pots: pots,
        usedColors: pots.map((pot) => pot.theme),
      }
    },
  })
}
