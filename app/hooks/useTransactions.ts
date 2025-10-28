import { useSuspenseQuery } from '@tanstack/react-query'

import { DEMO_USER_ID, INITIAL_DEMO_TRANSACTIONS } from '~/constants/demoData'
import { useAuth } from '~/hooks/useAuth'
import { transactionService } from '~/services/transactionService'
import type { Transaction } from '~/types'
import supabase from '~/utils/supabase'

export const useTransactions = () => {
  const { user, isDemoMode, demoOverrides } = useAuth()

  return useSuspenseQuery<Transaction[]>({
    queryKey: ['transactions', user?.id],
    queryFn: async () => {
      let transactions: Transaction[]

      if (isDemoMode) {
        // Using data from localStorage if available
        if (demoOverrides.transactions) {
          transactions = demoOverrides.transactions
        }

        // Trying to read DB if first time in demo
        try {
          const { data, error } = await supabase
            .from('transactions')
            .select('*')
            .eq('user_id', DEMO_USER_ID)
            .order('transaction_date', { ascending: false })

          if (error) {
            throw error
          }

          if (data && data.length > 0) {
            return data
          }

          // Fallback if empty
          return INITIAL_DEMO_TRANSACTIONS.map((transaction, idx) => ({
            ...transaction,
            id: idx + 1,
            user_id: DEMO_USER_ID,
            created_at: new Date().toISOString(),
          })) as Transaction[]
        } catch (error) {
          console.warn(
            'Failed to fetch demo transactions from DB, using fallback',
            error
          )
          return INITIAL_DEMO_TRANSACTIONS.map((transaction, idx) => ({
            ...transaction,
            id: idx + 1,
            user_id: DEMO_USER_ID,
            created_at: new Date().toISOString(),
          })) as Transaction[]
        }
      } else {
        transactions = await transactionService.getAll()
      }

      return [...transactions].sort(
        (a, b) =>
          new Date(b.transaction_date).getTime() -
          new Date(a.transaction_date).getTime()
      )
    },
    networkMode: 'offlineFirst',
    staleTime: isDemoMode ? 0 : 5 * 60 * 1000,
  })
}
