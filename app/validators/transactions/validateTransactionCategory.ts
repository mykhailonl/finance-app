import type { TransactionCategory, TransactionType } from '~/types'
import {
  EXPENSE_CATEGORY_OPTIONS,
  INCOME_CATEGORY_OPTIONS,
} from '~/types/DropdownType'

export const validateTransactionCategory = (
  type: TransactionType,
  category: TransactionCategory
) => {
  switch (type) {
    case 'income': {
      const isValidIncomeCategory = INCOME_CATEGORY_OPTIONS.some(
        (option) => option.value === category
      )

      if (!isValidIncomeCategory) {
        return 'Selected category is not valid for income transactions'
      }

      return null
    }

    case 'expense': {
      const isValidExpenseCategory = EXPENSE_CATEGORY_OPTIONS.some(
        (option) => option.value === category
      )

      if (!isValidExpenseCategory) {
        return 'Selected category is not valid for expense transactions'
      }

      return null
    }

    default:
      return null
  }
}
