import {
  ArchiveIcon,
  CarIcon,
  CarrotIcon,
  GiftIcon,
  HeartIcon,
  type Icon,
  InvoiceIcon,
  MoneyIcon,
  PercentIcon,
  PopcornIcon,
  ShoppingBagOpenIcon,
  SparkleIcon,
  StackIcon,
  StudentIcon,
  SwapIcon,
  TrendUpIcon,
  WineIcon,
} from '@phosphor-icons/react'

import type { ThemeColor, TransactionCategory, TransactionType } from '~/types'

export type SortOption =
  | 'latest'
  | 'oldest'
  | 'alphAsc'
  | 'alphDesc'
  | 'highest'
  | 'lowest'

export type FilterOption = 'all' | TransactionCategory
export type ColorOption = ThemeColor

// Custom type to extract Expense categories
export type ExpenseCategory = Extract<
  TransactionCategory,
  | 'Bills'
  | 'Groceries'
  | 'Dining Out'
  | 'Entertainment'
  | 'Transportation'
  | 'Personal Care'
  | 'Education'
  | 'Lifestyle'
  | 'Shopping'
  | 'General'
  | 'Other'
>

// Custom type to extract Income categories
export type IncomeCategory = Extract<
  TransactionCategory,
  'General' | 'Gift' | 'Interest' | 'Other' | 'Salary' | 'Sales'
>

export const EXPENSE_CATEGORY_OPTIONS: DropdownOptions<ExpenseCategory> = [
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
  { value: 'Other', label: 'Other' },
]

export const INCOME_CATEGORY_OPTIONS: DropdownOptions<IncomeCategory> = [
  { value: 'General', label: 'General' },
  { value: 'Gift', label: 'Gift' },
  { value: 'Interest', label: 'Interest' },
  { value: 'Other', label: 'Other' },
  { value: 'Salary', label: 'Salary' },
  { value: 'Sales', label: 'Sales' },
]

export type DropdownOptionType =
  | SortOption
  | FilterOption
  | ColorOption
  | TransactionType

export interface DropdownOption<T> {
  value: T
  label: string
}

export type IconOption<T> = {
  name: T
  options: {
    icon: Icon
    bg: string
  }
}

export type IconOptions<T> = IconOption<T>[]

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
  { value: 'Transfer', label: 'Transfer' },
  { value: 'Gift', label: 'Gift' },
  { value: 'Interest', label: 'Interest' },
  { value: 'Other', label: 'Other' },
  { value: 'Salary', label: 'Salary' },
  { value: 'Sales', label: 'Sales' },
]

export const TRANSACTION_TYPE_OPTIONS: DropdownOptions<TransactionType> = [
  { value: 'expense', label: 'Expense' },
  { value: 'income', label: 'Income' },
  { value: 'transfer', label: 'Transfer' },
]

export const SORT_OPTIONS: DropdownOptions<SortOption> = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'alphAsc', label: 'A to Z' },
  { value: 'alphDesc', label: 'Z to A' },
  { value: 'highest', label: 'Highest' },
  { value: 'lowest', label: 'Lowest' },
]

export const CATEGORY_ICON_OPTIONS: IconOptions<TransactionCategory> = [
  {
    name: 'Bills',
    options: { icon: InvoiceIcon, bg: '#FF6367' },
  },
  {
    name: 'Groceries',
    options: { icon: CarrotIcon, bg: '#FF6900' },
  },
  {
    name: 'Dining Out',
    options: { icon: WineIcon, bg: '#A683FF' },
  },
  {
    name: 'Entertainment',
    options: { icon: PopcornIcon, bg: '#CAB361' },
  },
  {
    name: 'Transportation',
    options: { icon: CarIcon, bg: '#00BCFF' },
  },
  {
    name: 'Personal Care',
    options: { icon: HeartIcon, bg: '#FB64B6' },
  },
  {
    name: 'Education',
    options: { icon: StudentIcon, bg: '#71717B' },
  },
  {
    name: 'Lifestyle',
    options: { icon: SparkleIcon, bg: '#BBF351' },
  },
  {
    name: 'Shopping',
    options: { icon: ShoppingBagOpenIcon, bg: '#8D51FF' },
  },
  {
    name: 'Other',
    options: { icon: ArchiveIcon, bg: '#9CA3AF' },
  },
  {
    name: 'General',
    options: { icon: StackIcon, bg: '#6B7280' },
  },
  {
    name: 'Gift',
    options: { icon: GiftIcon, bg: '#EF4444' },
  },
  {
    name: 'Interest',
    options: { icon: PercentIcon, bg: '#F2CDAC' },
  },
  {
    name: 'Salary',
    options: { icon: MoneyIcon, bg: '#7F9161' },
  },
  {
    name: 'Sales',
    options: { icon: TrendUpIcon, bg: '#597C7C' },
  },
  {
    name: 'Transfer',
    options: { icon: SwapIcon, bg: '#00BCFF' },
  },
]

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
  onBlur?: () => void
  error?: string | null
  options: DropdownOptions<T>
  showColorTag?: boolean
  showCaret?: boolean
  mobileView?: boolean
  usedValues?: T[]
  small?: boolean
  usedOptionFirst?: boolean
}
