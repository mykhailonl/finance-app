import type {
  Budget,
  BudgetUpdate,
  ThemeColor,
  TransactionCategory,
} from '~/types/index'

export type BudgetModalTypes =
  | { type: 'budget-add' }
  | { type: 'budget-edit'; budget: Budget }
  | { type: 'budget-delete'; budget: Budget }

export type AddBudgetModalProps = {
  onSubmit: (data: {
    category: TransactionCategory
    maximum: number
    theme: ThemeColor
  }) => void
}

export interface EditBudgetModalProps {
  initialValues: Pick<Budget, 'id' | 'category' | 'maximum' | 'theme'>
  onSubmit: (data: BudgetUpdate) => void
}

export type DeleteBudgetModalProps = {
  budgetCategory: string
  onDelete: () => void
  onClose: () => void
}
