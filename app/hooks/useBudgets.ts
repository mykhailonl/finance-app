import { useSuspenseQuery } from '@tanstack/react-query'

import { CURRENT_MONTH } from '~/constants/dates'
import { useTransactions } from '~/hooks/useTransactions'
import { budgetService } from '~/services/budgetService'
import type {
  Budget,
  ThemeColor,
  Transaction,
  TransactionCategory,
} from '~/types'

interface UseBudgetsReturn {
  budgets: Budget[]
  usedCategories: TransactionCategory[]
  spentWithinBudgets: number
  spentByCategory: Record<string, number>
  totalLimit: number
  usedColors: ThemeColor[]
  transactionsByCategory: Record<string, Transaction[]>
  latestTransactionsByCategory: Record<string, Transaction[]>
}

export default function useBudgets() {
  const { data: allTransactions } = useTransactions()

  return useSuspenseQuery<UseBudgetsReturn>({
    queryKey: ['budgets', allTransactions?.length],
    queryFn: async () => {
      const budgets = await budgetService.getAll()

      const budgetCategories = budgets.map((b) => b.category)

      const relevantTransactions = allTransactions.filter(
        (tr) =>
          budgetCategories.includes(tr.category) &&
          tr.transaction_date.startsWith(CURRENT_MONTH)
      )

      const spentWithinBudgets = relevantTransactions.reduce(
        (sum, tr) => sum + Math.abs(tr.amount),
        0
      )

      const spentByCategory = budgetCategories.reduce(
        (acc, category) => {
          acc[category] = relevantTransactions
            .filter((tr) => tr.category === category)
            .reduce((sum, tr) => sum + Math.abs(tr.amount), 0)
          return acc
        },
        {} as Record<string, number>
      )

      const transactionsByCategory = budgetCategories.reduce(
        (acc, category) => {
          acc[category] = relevantTransactions
            .filter((tr) => tr.category === category)
            .sort(
              (a, b) =>
                new Date(b.transaction_date).getTime() -
                new Date(a.transaction_date).getTime()
            )
          return acc
        },
        {} as Record<string, Transaction[]>
      )

      const latestTransactionsByCategory = budgetCategories.reduce(
        (acc, category) => {
          acc[category] = transactionsByCategory[category].slice(0, 3)
          return acc
        },
        {} as Record<string, Transaction[]>
      )

      return {
        budgets,
        usedCategories: budgetCategories,
        spentWithinBudgets,
        spentByCategory,
        totalLimit: budgets.reduce((sum, budget) => sum + budget.maximum, 0),
        usedColors: budgets.map((budget) => budget.theme),
        transactionsByCategory,
        latestTransactionsByCategory,
      }
    },
  })
}
