import { validateTransactionAmount } from './validateTransactionAmount'
import { validateTransactionCategory } from './validateTransactionCategory'
import { validateTransactionName } from './validateTransactionName'

export const transactionValidators = {
  validateTransactionName,
  validateTransactionCategory,
  validateTransactionAmount,
}
