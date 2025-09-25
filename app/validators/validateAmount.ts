export const validateAmount = (amount: string) => {
  const formatRegex = /^-?\d*\.?\d{0,2}$/

  if (!formatRegex.test(amount)) {
    return 'Invalid symbols used, please use numbers and .'
  }

  return null
}
