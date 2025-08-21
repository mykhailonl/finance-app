import type { BudgetType } from '~/types/BudgetType'

export const getBudgetValues = (budget?: BudgetType) => {
  if (!budget) {
    return undefined
  }

  return {
    category: budget.category,
    maximum: budget.maximum,
    theme: budget.theme,
  }
}
