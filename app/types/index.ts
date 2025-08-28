import type { Database } from '~/types/database'

export type ThemeColor = Database['public']['Enums']['theme_color']
export type TransactionCategory =
  Database['public']['Enums']['transaction_category']

export type StrictUserBalance = {
  user_id: string
  current: number
  income: number
  expenses: number
}

export type Pot = Database['public']['Tables']['pots']['Row']
export type PotInsert = Database['public']['Tables']['pots']['Insert']
export type PotUpdate = Database['public']['Tables']['pots']['Update']

export type Budget = Database['public']['Tables']['budgets']['Row']
export type BudgetInsert = Database['public']['Tables']['budgets']['Insert']
export type BudgetUpdate = Database['public']['Tables']['budgets']['Update']

export type Transaction = Database['public']['Tables']['transactions']['Row']
export type TransactionInsert =
  Database['public']['Tables']['transactions']['Insert']
export type TransactionUpdate =
  Database['public']['Tables']['transactions']['Update']
