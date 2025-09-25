import { validateAmount } from '~/validators'

export const validateAmountToWithdraw = (amount: string, total: number) => {
  const formatError = validateAmount(amount)

  if (formatError) {
    return formatError
  }

  const numValue = Number(amount)

  if (numValue <= 0) {
    return 'Amount must be a positive integer'
  }

  if (numValue > total) {
    return 'Cannot withdraw more than pot contains'
  }

  return null
}
