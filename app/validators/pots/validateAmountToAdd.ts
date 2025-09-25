import { canPerformAmountAction } from '~/utils/canPerformAmountAction'
import { validateAmount } from '~/validators'

export const validateAmountToAdd = (amount: string, availableFunds: number) => {
  const validationError = validateAmount(amount)

  if (validationError) {
    return validationError
  }

  const numValue = Number(amount)

  if (numValue <= 0) {
    return 'Amount must be positive integer'
  }

  if (!canPerformAmountAction(availableFunds, numValue)) {
    return 'Insufficient funds'
  }

  return null
}
