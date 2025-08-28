import { useSuspenseQuery } from '@tanstack/react-query'

import { userBalanceService } from '~/services/userBalanceService'
import type { StrictUserBalance } from '~/types'

export const useBalance = () => {
  return useSuspenseQuery<StrictUserBalance>({
    queryKey: ['user-balance-function'],
    queryFn: async () => {
      return await userBalanceService.getDetails()
    },
  })
}
