import type { ThemeColor } from '~/constants/theme'

export type SortOption =
  | 'latest'
  | 'oldest'
  | 'alphAsc'
  | 'alphDesc'
  | 'highest'
  | 'lowest'

export type FilterOption =
  | 'all'
  | 'bills'
  | 'groceries'
  | 'dining'
  | 'entertainment'
  | 'transportation'
  | 'selfcare'
  | 'education'
  | 'lifestyle'
  | 'shopping'
  | 'general'

export type DropdownOptionType = SortOption | FilterOption | ColorOption

export type DropdownType = 'sort' | 'filter'

export interface DropdownOption<T> {
  value: T
  label: string
}

export type DropdownOptions<T> = DropdownOption<T>[]

export const SORT_OPTIONS: DropdownOptions<SortOption> = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'alphAsc', label: 'A to Z' },
  { value: 'alphDesc', label: 'Z to A' },
  { value: 'highest', label: 'Highest' },
  { value: 'lowest', label: 'Lowest' },
]

export const FILTER_OPTIONS: DropdownOptions<FilterOption> = [
  { value: 'all', label: 'All transactions' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'bills', label: 'Bills' },
  { value: 'groceries', label: 'Groceries' },
  { value: 'dining', label: 'Dining Out' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'selfcare', label: 'Personal Care' },
  { value: 'education', label: 'Education' },
  { value: 'lifestyle', label: 'Lifestyle' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'general', label: 'General' },
]

export type ColorOption = ThemeColor

export const FILTER_VALUE_TO_CATEGORY: Record<FilterOption, string> = {
  all: 'all',
  bills: 'Bills',
  groceries: 'Groceries',
  dining: 'Dining Out',
  entertainment: 'Entertainment',
  transportation: 'Transportation',
  selfcare: 'Personal Care',
  education: 'Education',
  lifestyle: 'Lifestyle',
  shopping: 'Shopping',
  general: 'General',
}

export type BudgetCategoryOption = Exclude<FilterOption, 'all'>

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
