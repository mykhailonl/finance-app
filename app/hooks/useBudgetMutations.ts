import { useMutation, useQueryClient } from '@tanstack/react-query'

import { budgetService } from '~/services/budgetService'
import type { BudgetUpdate } from '~/types'

export function useBudgetMutations() {
  const queryClient = useQueryClient()

  const createBudget = useMutation({
    mutationFn: budgetService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] })
      // toast.success('Budget created!')
    },
    onError: (error) => {
      console.error('Failed to create budget:', error)
      // toast.error('Failed to create budget')
    },
  })

  const updateBudget = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: BudgetUpdate }) =>
      budgetService.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] })
      // toast.success('Budget updated!')
    },
    onError: (error) => {
      console.error('Failed to update budget:', error)
      // toast.error('Failed to update budget')
    },
  })

  const deleteBudget = useMutation({
    mutationFn: budgetService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] })
      // toast.success('Budget deleted!')
    },
    onError: (error) => {
      console.error('Failed to delete budget:', error)
      // toast.error('Failed to delete budget')
    },
  })

  return {
    createBudget,
    updateBudget,
    deleteBudget,
  }
}
