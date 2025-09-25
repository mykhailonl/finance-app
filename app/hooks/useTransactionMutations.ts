import { useMutation, useQueryClient } from '@tanstack/react-query'

import { transactionService } from '~/services/transactionService'
import type { TransactionUpdate } from '~/types'

export function useTransactionMutations() {
  const queryClient = useQueryClient()

  const createTransaction = useMutation({
    mutationFn: transactionService.create,
    networkMode: 'offlineFirst',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })

  const updateTransaction = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: TransactionUpdate }) =>
      transactionService.update(id, updates),
    networkMode: 'offlineFirst',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })

  const deleteTransaction = useMutation({
    mutationFn: (id: number) => transactionService.delete(id),
    networkMode: 'offlineFirst',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })

  return {
    createTransaction,
    updateTransaction,
    deleteTransaction,
  }
}
