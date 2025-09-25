import { validateAmount } from '~/validators'

export const validateBudgetMaximum = (amount: string) => {
  const validationError = validateAmount(amount)

  if (validationError) {
    return validationError
  }

  const numValue = Number(amount)

  if (numValue <= 0) {
    return 'Maximum must be positive'
  }

  return null
}
