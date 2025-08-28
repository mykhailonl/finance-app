import type { Transaction } from '~/types/index'

export type TransactionListType = Transaction[]

export type TransactionStatus = 'paid' | 'due' | 'upcoming'
