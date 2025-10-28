import { useSuspenseQuery } from '@tanstack/react-query'

import { DEMO_USER_ID, INITIAL_DEMO_BUDGETS } from '~/constants/demoData'
import { useAuth } from '~/hooks/useAuth'
import { useTransactions } from '~/hooks/useTransactions'
import { budgetService } from '~/services/budgetService'
import type { Budget, ThemeColor, TransactionCategory } from '~/types'
import type { BudgetSpending } from '~/types/BudgetTypes'
import type { TransactionsByBudget } from '~/types/TransactionTypes'

interface UseBudgetsReturn {
  budgets: Budget[]
  usedCategories: TransactionCategory[]
  spentWithinBudgets: number
  spentByCategory: BudgetSpending
  totalLimit: number
  usedColors: ThemeColor[]
  transactionsByCategory: TransactionsByBudget
  latestTransactionsByCategory: TransactionsByBudget
}

export default function useBudgets(period: string = '2025-10') {
  const { user, isDemoMode, demoOverrides } = useAuth()
  const { data: allTransactions } = useTransactions()

  return useSuspenseQuery<UseBudgetsReturn>({
    queryKey: ['budgets', period, user?.id],
    queryFn: async () => {
      let budgets: Budget[]

      if (isDemoMode) {
        if (demoOverrides.budgets) {
          budgets = structuredClone(demoOverrides.budgets)
        } else {
          budgets = INITIAL_DEMO_BUDGETS.map((budget, idx) => ({
            ...budget,
            id: idx + 1,
            user_id: DEMO_USER_ID,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })) as Budget[]
        }
      } else {
        budgets = await budgetService.getAll()
      }

      const totalLimit = budgets.reduce(
        (sum, budget) => sum + budget.maximum,
        0
      )

      const usedColors = budgets.map((budget) => budget.theme)

      const budgetCategories = budgets.map((b) => b.category)

      const relevantTransactions = allTransactions.filter(
        (tr) =>
          budgetCategories.includes(tr.category) &&
          tr.transaction_date.startsWith(period)
      )

      const spentWithinBudgets = relevantTransactions.reduce(
        (sum, tr) => sum + Math.abs(tr.amount),
        0
      )

      const spentByCategory = budgetCategories.reduce((acc, category) => {
        acc[category] = relevantTransactions
          .filter((tr) => tr.category === category)
          .reduce((sum, tr) => sum + Math.abs(tr.amount), 0)
        return acc
      }, {} as BudgetSpending)

      const transactionsByCategory = budgetCategories.reduce(
        (acc, category) => {
          acc[category] = [...relevantTransactions]
            .filter((tr) => tr.category === category)
            .sort(
              (a, b) =>
                new Date(b.transaction_date).getTime() -
                new Date(a.transaction_date).getTime()
            )
          return acc
        },
        {} as TransactionsByBudget
      )

      const latestTransactionsByCategory = budgetCategories.reduce(
        (acc, category) => {
          acc[category] = transactionsByCategory[category].slice(0, 2)
          return acc
        },
        {} as TransactionsByBudget
      )

      const sortedBudgets = budgets.slice().sort((a, b) => {
        const firstBudgetSpending = spentByCategory[a.category]
        const secondBudgetSpending = spentByCategory[b.category]

        return secondBudgetSpending - firstBudgetSpending
      })

      return {
        budgets: sortedBudgets,
        usedCategories: budgetCategories,
        spentWithinBudgets,
        spentByCategory,
        totalLimit,
        usedColors,
        transactionsByCategory,
        latestTransactionsByCategory,
      }
    },
  })
}
