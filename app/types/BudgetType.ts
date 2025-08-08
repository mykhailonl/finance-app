import type { ThemeColor } from '~/constants/theme'

export interface BudgetType {
  category: string
  maximum: number
  theme: ThemeColor
}
