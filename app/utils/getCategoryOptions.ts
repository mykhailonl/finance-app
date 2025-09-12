import type { TransactionType } from '~/types'
import {
  EXPENSE_CATEGORY_OPTIONS,
  INCOME_CATEGORY_OPTIONS,
} from '~/types/DropdownType'

export const getCategoryOptions = (type: TransactionType) => {
  return type === 'expense' ? EXPENSE_CATEGORY_OPTIONS : INCOME_CATEGORY_OPTIONS
}
