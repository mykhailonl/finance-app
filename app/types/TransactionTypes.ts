import type { Transaction, TransactionCategory } from '~/types/index'

export type TransactionListType = Transaction[]

export type TransactionsByBudget = Record<
  TransactionCategory,
  TransactionListType
>

export type TransactionAvatarProps = {
  transaction: Transaction
  size?: number
  styles?: string
}

export type TransactionListSectionProps = {
  transactions: TransactionListType
  title: string
  link: string
  linkText: string
  emptyTextState: string
  styles?: {
    containerStyles?: string
    listStyles?: string
    transactionStyles?: string
  }
}

export type TransactionStatus = 'paid' | 'due' | 'upcoming'
