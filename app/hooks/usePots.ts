import { useSuspenseQuery } from '@tanstack/react-query'

import { potService } from '~/services/potService'
import type { Pot, ThemeColor } from '~/types'

interface UsePotsReturn {
  pots: Pot[]
  usedColors: ThemeColor[]
}

export default function usePots() {
  return useSuspenseQuery<UsePotsReturn>({
    queryKey: ['pots'],
    queryFn: async () => {
      const pots = await potService.getAll()

      return {
        pots: pots,
        usedColors: pots.map((pot) => pot.theme),
      }
    },
  })
}
