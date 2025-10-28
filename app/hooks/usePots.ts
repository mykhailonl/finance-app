import { useSuspenseQuery } from '@tanstack/react-query'

import { DEMO_USER_ID, INITIAL_DEMO_POTS } from '~/constants/demoData'
import { useAuth } from '~/hooks/useAuth'
import { potService } from '~/services/potService'
import type { Pot, ThemeColor } from '~/types'

interface UsePotsReturn {
  pots: Pot[]
  usedColors: ThemeColor[]
}

export default function usePots() {
  const { user, isDemoMode, demoOverrides } = useAuth()

  return useSuspenseQuery<UsePotsReturn>({
    queryKey: ['pots', user?.id],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      let pots: Pot[]

      if (isDemoMode) {
        if (demoOverrides.pots) {
          pots = structuredClone(demoOverrides.pots)
        } else {
          pots = INITIAL_DEMO_POTS.map((pot, idx) => ({
            ...pot,
            id: idx + 1,
            user_id: DEMO_USER_ID,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })) as Pot[]
        }
      } else {
        pots = await potService.getAll()
      }

      return {
        pots: pots,
        usedColors: pots.map((pot) => pot.theme),
      }
    },
  })
}
