export const validateTransactionAmount = (amount: number) => {
  if (!amount) {
    return 'Transaction amount is required'
  }

  return null
}
