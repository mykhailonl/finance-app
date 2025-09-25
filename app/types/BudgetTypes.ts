import type { Budget, Transaction } from '~/types/index'

export type BudgetSectionProps = {
  budget: Budget
  transactions: Transaction[]
  spentThisMonth: number
}