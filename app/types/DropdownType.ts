import type { ThemeColor, TransactionCategory } from '~/types'

export type SortOption =
  | 'latest'
  | 'oldest'
  | 'alphAsc'
  | 'alphDesc'
  | 'highest'
  | 'lowest'

export type FilterOption = 'all' | TransactionCategory
export type BudgetCategoryOption = TransactionCategory
export type ColorOption = ThemeColor

export type DropdownOptionType = SortOption | FilterOption | ColorOption
export type DropdownType = 'sort' | 'filter'

export interface DropdownOption<T> {
  value: T
  label: string
}

export type DropdownOptions<T> = DropdownOption<T>[]

export const FILTER_OPTIONS: DropdownOptions<FilterOption> = [
  { value: 'all', label: 'All transactions' },
  { value: 'Bills', label: 'Bills' },
  { value: 'Groceries', label: 'Groceries' },
  { value: 'Dining Out', label: 'Dining Out' },
  { value: 'Entertainment', label: 'Entertainment' },
  { value: 'Transportation', label: 'Transportation' },
  { value: 'Personal Care', label: 'Personal Care' },
  { value: 'Education', label: 'Education' },
  { value: 'Lifestyle', label: 'Lifestyle' },
  { value: 'Shopping', label: 'Shopping' },
  { value: 'General', label: 'General' },
]

export const SORT_OPTIONS: DropdownOptions<SortOption> = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'alphAsc', label: 'A to Z' },
  { value: 'alphDesc', label: 'Z to A' },
  { value: 'highest', label: 'Highest' },
  { value: 'lowest', label: 'Lowest' },
]

export const BUDGET_CATEGORY_OPTIONS = FILTER_OPTIONS.filter(
  (option) => option.value !== 'all'
) as DropdownOptions<BudgetCategoryOption>

export type DropdownProps<T extends DropdownOptionType> = {
  styles?: string
  label: {
    showLabel?: boolean
    labelText?: string
    labelStyles?: string
    bold?: boolean
  }
  value: T
  onChange: (value: T) => void
  options: DropdownOptions<T>
  showColorTag?: boolean
  showCaret?: boolean
  mobileView?: boolean
  usedColors?: ThemeColor[]
}
