import type { Transaction } from '~/types'
import type { TransactionStatus } from '~/types/TransactionTypes'
import { extractTransactionDay } from '~/utils/extractTransactionDay'

export const getTransactionStatus = (
  transaction: Transaction,
  currentDay: number
): TransactionStatus => {
  const dayToBePaid = extractTransactionDay(transaction)

  if (dayToBePaid <= currentDay) {
    return 'paid'
  }

  if (dayToBePaid > currentDay && dayToBePaid <= currentDay + 5) {
    return 'due'
  }

  return 'upcoming'
}
