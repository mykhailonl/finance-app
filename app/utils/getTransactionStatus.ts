import type { TransactionType } from '~/types/TransactionType'
import { extractTransactionDay } from '~/utils/extractTransactionDay'

export const getTransactionStatus = (
  transaction: TransactionType,
  currentDay: number
) => {
  let status = 'upcoming'
  const dayToBePaid = extractTransactionDay(transaction)

  if (dayToBePaid <= currentDay) {
    status = 'paid'
  }

  if (dayToBePaid > currentDay && dayToBePaid <= currentDay + 5) {
    status = 'due'
  }

  return status
}
