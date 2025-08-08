import { useSuspenseQuery } from '@tanstack/react-query'

import type { BudgetType } from '~/types/BudgetType'

export default function useBudgets() {
  return useSuspenseQuery({
    queryKey: ['budgets'],
    queryFn: async () => {
      const baseUrl =
        typeof window !== 'undefined'
          ? window.location.origin
          : 'http://localhost:5173'

      const res = await fetch(`${baseUrl}/data/data.json`)
      const data = await res.json()

      return {
        budgets: data.budgets,
        budgetCategories: data.budgets.map(
          (budget: BudgetType) => budget.category
        ),
        totalLimit: data.budgets.reduce(
          (sum: number, budget: BudgetType) => sum + budget.maximum,
          0
        ),
      }
    },
  })
}
