import { useMutation, useQueryClient } from '@tanstack/react-query'

import { budgetService } from '~/services/budgetService'
import type { BudgetUpdate } from '~/types'

export function useBudgetMutations() {
  const queryClient = useQueryClient()

  const createBudget = useMutation({
    mutationFn: budgetService.create,
    networkMode: 'offlineFirst',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] })
    },
  })

  const updateBudget = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: BudgetUpdate }) =>
      budgetService.update(id, updates),
    networkMode: 'offlineFirst',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] })
    },
  })

  const deleteBudget = useMutation({
    mutationFn: budgetService.delete,
    networkMode: 'offlineFirst',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] })
    },
  })

  return {
    createBudget,
    updateBudget,
    deleteBudget,
  }
}
