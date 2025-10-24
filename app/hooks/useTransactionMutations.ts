import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useAuth } from '~/hooks/useAuth'
import { transactionService } from '~/services/transactionService'
import type { TransactionUpdate } from '~/types'

export function useTransactionMutations() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  const createTransaction = useMutation({
    mutationFn: transactionService.create,
    networkMode: 'offlineFirst',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({
        queryKey: ['user-balance-function', user?.id],
      })
    },
  })

  const updateTransaction = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: TransactionUpdate }) =>
      transactionService.update(id, updates),
    networkMode: 'offlineFirst',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({
        queryKey: ['user-balance-function', user?.id],
      })
    },
  })

  const deleteTransaction = useMutation({
    mutationFn: (id: number) => transactionService.delete(id),
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
