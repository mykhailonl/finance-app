import type { Transaction } from '~/types'

export const extractTransactionDay = (transaction: Transaction) => {
  return new Date(transaction.transaction_date).getDate()
}
