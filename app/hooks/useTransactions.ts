import { useSuspenseQuery } from '@tanstack/react-query'

import { DEMO_USER_ID, INITIAL_DEMO_TRANSACTIONS } from '~/constants/demoData'
import { useAuth } from '~/hooks/useAuth'
import { transactionService } from '~/services/transactionService'
import type { Transaction } from '~/types'

export const useTransactions = () => {
  const { user, isDemoMode, demoOverrides } = useAuth()

  return useSuspenseQuery<Transaction[]>({
    queryKey: ['transactions', user?.id],
    queryFn: async () => {
      let transactions: Transaction[]

      if (isDemoMode) {
        if (demoOverrides.transactions) {
          transactions = structuredClone(demoOverrides.transactions)
        } else {
          transactions = INITIAL_DEMO_TRANSACTIONS.map((transaction, idx) => ({
            ...transaction,
            id: idx + 1,
            user_id: DEMO_USER_ID,
            created_at: new Date().toISOString(),
          })) as Transaction[]
        }
      } else {
        transactions = await transactionService.getAll()
      }

      return transactions
        .slice()
        .sort(
          (a, b) =>
            new Date(b.transaction_date).getTime() -
            new Date(a.transaction_date).getTime()
        )
    },
    networkMode: 'offlineFirst',
    staleTime: isDemoMode ? 0 : 5 * 60 * 1000,
  })
}
