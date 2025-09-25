import type { ExpenseCategory } from '~/types/DropdownType'

export const validateCategory = (category: ExpenseCategory) => {
  if (!category) {
    return 'Category is required'
  }

  return null
}
