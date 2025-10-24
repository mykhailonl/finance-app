import type { Budget, TransactionCategory } from '~/types/index'
import type {
  TransactionListType,
  TransactionsByBudget,
} from '~/types/TransactionTypes'

export type BudgetSpending = Record<TransactionCategory, number>

export type BudgetSectionProps = {
  budget: Budget
  transactions: TransactionListType
  spentThisMonth: number
}

export type BudgetHeroProps = {
  budgets: Budget[]
  categorySpent: BudgetSpending
}

export type BudgetListProps = {
  budgets: Budget[]
  latestTransactionsByCategory: TransactionsByBudget
  spentByCategory: BudgetSpending
}

export type BudgetInfoProps = {
  budget: Budget
  spent: number
}
