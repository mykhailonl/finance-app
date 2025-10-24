import { useSuspenseQuery } from '@tanstack/react-query'

import { useAuth } from '~/hooks/useAuth'
import { useTransactions } from '~/hooks/useTransactions'
import { userBalanceService } from '~/services/userBalanceService'
import type { StrictUserBalance } from '~/types'

export const useBalance = () => {
  const { user, isDemoMode } = useAuth()
  const { data: transactions } = useTransactions()

  return useSuspenseQuery<StrictUserBalance>({
    queryKey: ['user-balance-function', user?.id],
    staleTime: isDemoMode ? 0 : 5 * 60 * 1000,
    queryFn: async () => {
      if (isDemoMode) {
        // Calculating balance from transactions in demo mode
        const income = transactions
          .filter((tr) => tr.amount > 0)
          .reduce((sum, tr) => sum + tr.amount, 0)

        const expenses = transactions
          .filter((tr) => tr.amount < 0)
          .reduce((sum, tr) => sum + Math.abs(tr.amount), 0)

        const current = income - expenses

        return {
          user_id: user!.id,
          current,
          income,
          expenses,
        }
      }

      // Real user mode
      return userBalanceService.getDetails()
    },
  })
}
