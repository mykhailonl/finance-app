import { validateAmount } from '~/validators'

export const validatePotTarget = (amount: string) => {
  const validationError = validateAmount(amount)

  if (validationError) {
    return validationError
  }

  const numValue = Number(amount)

  if (numValue <= 0) {
    return 'Target must be positive'
  }

  return null
}
