import type { TransactionType } from '~/types/TransactionType'

export const extractTransactionDay = (transaction: TransactionType) => {
  return new Date(transaction.date).getDate()
}
