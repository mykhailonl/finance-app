import { useSuspenseQuery } from '@tanstack/react-query'

import { DEMO_USER_ID, INITIAL_DEMO_POTS } from '~/constants/demoData'
import { useAuth } from '~/hooks/useAuth'
import { potService } from '~/services/potService'
import type { Pot, ThemeColor } from '~/types'
import supabase from '~/utils/supabase'

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
        // Using data from localStorage if available
        if (demoOverrides.pots) {
          pots = demoOverrides.pots
        } else {
          // Trying to read DB if first time in demo mode
          try {
            const { data, error } = await supabase
              .from('pots')
              .select('*')
              .eq('user_id', DEMO_USER_ID)
              .order('created_at', { ascending: true })

            if (error) {
              throw error
            }

            if (data && data.length > 0) {
              pots = data
            } else {
              // Fallback if empty
              pots = INITIAL_DEMO_POTS.map((pot, idx) => ({
                ...pot,
                id: idx + 1,
                user_id: DEMO_USER_ID,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              })) as Pot[]
            }
          } catch (error) {
            console.warn(
              'Failed to fetch demo pots from DB, using fallback',
              error
            )
            pots = INITIAL_DEMO_POTS.map((pot, idx) => ({
              ...pot,
              id: idx + 1,
              user_id: DEMO_USER_ID,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })) as Pot[]
          }
        }
      } else {
        // Real user mode
        pots = await potService.getAll()
      }

      return {
        pots: pots,
        usedColors: pots.map((pot) => pot.theme),
      }
    },
  })
}
