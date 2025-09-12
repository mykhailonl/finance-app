import type { Transaction } from '~/types/index'

export type TransactionAvatarProps = {
  transaction: Transaction
  size?: number
  styles?: string
}

export type TransactionListType = Transaction[]

export type TransactionStatus = 'paid' | 'due' | 'upcoming'
