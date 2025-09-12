import { useMutation, useQueryClient } from '@tanstack/react-query'

import { transactionService } from '~/services/transactionService'
import type { TransactionUpdate } from '~/types'

export function useTransactionMutations() {
  const queryClient = useQueryClient()

  const createTransaction = useMutation({
    mutationFn: transactionService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      // toast.success('Transaction created!')
    },
    onError: (error) => {
      console.error('Failed to create transaction:', error)
      // toast.error('Failed to create transaction')
    },
  })

  const updateTransaction = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: TransactionUpdate }) =>
      transactionService.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      // TODO: toast.success('Transaction updated!')
    },
    onError: (error) => {
      console.error('Failed to update transaction:', error)
      // TODO: toast.error('Failed to update transaction')
    },
  })

  const deleteTransaction = useMutation({
    mutationFn: (id: number) => transactionService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      // TODO: toast.success('Transaction deleted!')
    },
    onError: (error) => {
      console.error('Failed to delete transaction:', error)
      // TODO: toast.error('Failed to delete transaction')
    },
  })

  return {
    createTransaction,
    updateTransaction,
    deleteTransaction,
  }
}
