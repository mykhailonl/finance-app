import { useSuspenseQuery } from '@tanstack/react-query'

import { userBalanceService } from '~/services/userBalanceService'
import type { StrictUserBalance } from '~/types'

export const useBalance = () => {
  return useSuspenseQuery<StrictUserBalance>({
    queryKey: ['user-balance-function'],
    staleTime: 5 * 60 * 1000,
    queryFn: userBalanceService.getDetails,
  })
}
