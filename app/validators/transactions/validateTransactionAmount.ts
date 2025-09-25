import { validateAmount } from '~/validators'

export const validateTransactionAmount = (amount: string) => {
  const formatError = validateAmount(amount)

  if (formatError) {
    return formatError
  }

  const normalizedAmount = Number(amount)

  if (!normalizedAmount) {
    return 'Transaction amount cannot be 0.'
  }

  return null
}
