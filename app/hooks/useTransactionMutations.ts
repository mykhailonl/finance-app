import { useMutation, useQueryClient } from '@tanstack/react-query'

import { DEMO_USER_ID, INITIAL_DEMO_TRANSACTIONS } from '~/constants/demoData'
import { useAuth } from '~/hooks/useAuth'
import { transactionService } from '~/services/transactionService'
import type { Transaction, TransactionInsert, TransactionUpdate } from '~/types'

export function useTransactionMutations() {
  const queryClient = useQueryClient()
  const { user, isDemoMode, demoOverrides, updateDemoData } = useAuth()

  const createTransaction = useMutation({
    mutationFn: async (data: TransactionInsert) => {
      if (isDemoMode) {
        const currentTransactions =
          demoOverrides.transactions ||
          (INITIAL_DEMO_TRANSACTIONS.map((tr, idx) => ({
            ...tr,
            id: idx + 1,
            user_id: DEMO_USER_ID,
            created_at: new Date().toISOString(),
          })) as Transaction[])

        const newTransaction = {
          ...data,
          id: Date.now(),
          user_id: DEMO_USER_ID,
          created_at: new Date().toISOString(),
        } as Transaction

        updateDemoData('transactions', [newTransaction, ...currentTransactions])

        return newTransaction
      }

      return transactionService.create(data)
    },
    networkMode: 'offlineFirst',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({
        queryKey: ['user-balance-function', user?.id],
      })
    },
  })

  const updateTransaction = useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: number
      updates: TransactionUpdate
    }) => {
      if (isDemoMode) {
        const currentTransactions =
          demoOverrides.transactions ||
          (INITIAL_DEMO_TRANSACTIONS.map((tr, idx) => ({
            ...tr,
            id: idx + 1,
            user_id: DEMO_USER_ID,
            created_at: new Date().toISOString(),
          })) as Transaction[])

        const updated = currentTransactions.map((tr) =>
          tr.id === id
            ? ({
                ...tr,
                ...updates,
              } as Transaction)
            : tr
        )

        updateDemoData('transactions', updated)
        return updated.find((tr) => tr.id === id)!
      }

      return transactionService.update(id, updates)
    },
    networkMode: 'offlineFirst',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({
        queryKey: ['user-balance-function', user?.id],
      })
    },
  })

  const deleteTransaction = useMutation({
    mutationFn: async (id: number) => {
      if (isDemoMode) {
        const currentTransactions =
          demoOverrides.transactions ||
          (INITIAL_DEMO_TRANSACTIONS.map((tr, idx) => ({
            ...tr,
            id: idx + 1,
            user_id: DEMO_USER_ID,
            created_at: new Date().toISOString(),
          })) as Transaction[])

        updateDemoData(
          'transactions',
          currentTransactions.filter((tr) => tr.id !== id)
        )
        return
      }

      return transactionService.delete(id)
    },
    networkMode: 'offlineFirst',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({
        queryKey: ['user-balance-function', user?.id],
      })
    },
  })

  return {
    createTransaction,
    updateTransaction,
    deleteTransaction,
  }
}
