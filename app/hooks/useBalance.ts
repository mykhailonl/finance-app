import { useSuspenseQuery } from '@tanstack/react-query'

import { useAuth } from '~/hooks/useAuth'
import { userBalanceService } from '~/services/userBalanceService'
import type { StrictUserBalance } from '~/types'

export const useBalance = () => {
  const { user } = useAuth()

  return useSuspenseQuery<StrictUserBalance>({
    queryKey: ['user-balance-function', user?.id],
    staleTime: 5 * 60 * 1000,
    queryFn: userBalanceService.getDetails,
  })
}
