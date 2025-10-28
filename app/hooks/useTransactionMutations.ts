import { useMutation, useQueryClient } from '@tanstack/react-query'

import { DEMO_USER_ID, INITIAL_DEMO_TRANSACTIONS } from '~/constants/demoData'
import { useAuth } from '~/hooks/useAuth'
import { useRateLimiter } from '~/hooks/useRateLimiter'
import { transactionService } from '~/services/transactionService'
import type { Transaction, TransactionInsert, TransactionUpdate } from '~/types'

export function useTransactionMutations() {
  const { checkRateLimit } = useRateLimiter(100)

  const queryClient = useQueryClient()
  const { user, isDemoMode, demoOverrides, updateDemoData } = useAuth()

  const createTransaction = useMutation({
    mutationFn: async (data: TransactionInsert) => {
      if (!checkRateLimit()) {
        throw new Error('Too many requests. Please wait a moment.')
      }

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
      if (isDemoMode) {
        queryClient.invalidateQueries({
          queryKey: ['transactions', DEMO_USER_ID],
        })
      } else {
        queryClient.invalidateQueries({ queryKey: ['transactions'] })
      }
      queryClient.invalidateQueries({
        queryKey: ['user-balance-function', user?.id],
      })
    },
    onError: (error) => {
      console.error('Failed to create transaction:', error.message)
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
      if (!checkRateLimit()) {
        throw new Error('Too many requests. Please wait a moment.')
      }

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
      if (isDemoMode) {
        queryClient.invalidateQueries({
          queryKey: ['transactions', DEMO_USER_ID],
        })
      } else {
        queryClient.invalidateQueries({ queryKey: ['transactions'] })
      }
      queryClient.invalidateQueries({
        queryKey: ['user-balance-function', user?.id],
      })
    },
    onError: (error) => {
      console.error('Failed to update transaction:', error.message)
    },
  })

  const deleteTransaction = useMutation({
    mutationFn: async (id: number) => {
      if (!checkRateLimit()) {
        throw new Error('Too many requests. Please wait a moment.')
      }

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
      if (isDemoMode) {
        queryClient.invalidateQueries({
          queryKey: ['transactions', DEMO_USER_ID],
        })
      } else {
        queryClient.invalidateQueries({ queryKey: ['transactions'] })
      }
      queryClient.invalidateQueries({
        queryKey: ['user-balance-function', user?.id],
      })
    },
    onError: (error) => {
      console.error('Failed to delete transaction:', error.message)
    },
  })

  return {
    createTransaction,
    updateTransaction,
    deleteTransaction,
  }
}
