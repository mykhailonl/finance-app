import { useMutation, useQueryClient } from '@tanstack/react-query'

import { DEMO_USER_ID, INITIAL_DEMO_BUDGETS } from '~/constants/demoData'
import { useAuth } from '~/hooks/useAuth'
import { budgetService } from '~/services/budgetService'
import type { Budget, BudgetInsert, BudgetUpdate } from '~/types'

export function useBudgetMutations() {
  const queryClient = useQueryClient()
  const { isDemoMode, demoOverrides, updateDemoData } = useAuth()

  const createBudget = useMutation({
    mutationFn: async (data: BudgetInsert) => {
      if (isDemoMode) {
        const currentBudgets =
          demoOverrides.budgets ||
          (INITIAL_DEMO_BUDGETS.map((b, idx) => ({
            ...b,
            id: idx + 1,
            user_id: DEMO_USER_ID,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })) as Budget[])

        const newBudget: Budget = {
          ...data,
          id: Date.now(),
          user_id: DEMO_USER_ID,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }

        updateDemoData('budgets', [...currentBudgets, newBudget])
        return newBudget
      }

      return budgetService.create(data)
    },
    networkMode: 'offlineFirst',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] })
    },
  })

  const updateBudget = useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: number
      updates: BudgetUpdate
    }) => {
      if (isDemoMode) {
        const currentBudgets = demoOverrides.budgets || INITIAL_DEMO_BUDGETS

        const updated = currentBudgets.map((b) =>
          b.id === id
            ? ({
                ...b,
                ...updates,
                updated_at: new Date().toISOString(),
              } as Budget)
            : b
        )

        updateDemoData('budgets', updated)
        return updated.find((b) => b.id === id)!
      }

      return budgetService.update(id, updates)
    },
    networkMode: 'offlineFirst',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] })
    },
  })

  const deleteBudget = useMutation({
    mutationFn: async (id: number) => {
      if (isDemoMode) {
        const currentBudgets = demoOverrides.budgets || INITIAL_DEMO_BUDGETS
        updateDemoData(
          'budgets',
          currentBudgets.filter((b) => b.id !== id)
        )

        return Promise.resolve()
      }

      return budgetService.delete(id)
    },
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
