import { useSuspenseQuery } from '@tanstack/react-query'

import { DEMO_USER_ID, INITIAL_DEMO_BUDGETS } from '~/constants/demoData'
import { useAuth } from '~/hooks/useAuth'
import { useTransactions } from '~/hooks/useTransactions'
import { budgetService } from '~/services/budgetService'
import type { Budget, ThemeColor, TransactionCategory } from '~/types'
import type { BudgetSpending } from '~/types/BudgetTypes'
import type { TransactionsByBudget } from '~/types/TransactionTypes'
import supabase from '~/utils/supabase'

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

export default function useBudgets(period: string = '2025-08') {
  const { user, isDemoMode, demoOverrides } = useAuth()
  const { data: allTransactions } = useTransactions()

  return useSuspenseQuery<UseBudgetsReturn>({
    queryKey: ['budgets', period, user?.id],
    queryFn: async () => {
      let budgets: Budget[]

      if (isDemoMode) {
        // Using data from localStorage if available
        if (demoOverrides.budgets) {
          budgets = demoOverrides.budgets
        } else {
          // First time in demo mode - trying to read DB
          try {
            const { data, error } = await supabase
              .from('budgets')
              .select('*')
              .eq('user_id', DEMO_USER_ID)
              .order('created_at', { ascending: true })

            if (error) {
              throw error
            }

            if (data && data.length > 0) {
              budgets = data
            } else {
              // Fallback if empty
              budgets = INITIAL_DEMO_BUDGETS.map((budget, idx) => ({
                ...budget,
                id: idx + 1,
                user_id: DEMO_USER_ID,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              })) as Budget[]
            }
          } catch (error) {
            console.warn(
              'Failed to fetch demo budgets from DB, using fallback',
              error
            )
            budgets = INITIAL_DEMO_BUDGETS.map((budget, idx) => ({
              ...budget,
              id: idx + 1,
              user_id: DEMO_USER_ID,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })) as Budget[]
          }
        }
      } else {
        // Real  user mode
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
          acc[category] = relevantTransactions
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

      const sortedBudgets = budgets.sort((a, b) => {
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
