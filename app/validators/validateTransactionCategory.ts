import type { TransactionCategory, TransactionType } from '~/types'
import {
  EXPENSE_CATEGORY_OPTIONS,
  INCOME_CATEGORY_OPTIONS,
} from '~/types/DropdownType'

export const validateTransactionCategory = (
  type: TransactionType,
  category: TransactionCategory
): string | null => {
  if (type === 'expense') {
    const isValidExpenseCategory = EXPENSE_CATEGORY_OPTIONS.some(
      (option) => option.value === category
    )

    if (!isValidExpenseCategory) {
      return 'Selected category is not valid for expense transactions'
    }

    return null
  }

  if (type === 'income') {
    const isValidIncomeCategory = INCOME_CATEGORY_OPTIONS.some(
      (option) => option.value === category
    )
    if (!isValidIncomeCategory) {
      return 'Selected category is not valid for income transactions'
    }

    return null
  }

  return null
}
