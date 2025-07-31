export const formatAmountToString = (amount: number) => {
  const absoluteValue = Math.abs(amount)
  const sign = amount > 0 ? '+' : '-'
  const formattedNumber = absoluteValue.toFixed(2)

  return {
    amount: `${sign}$${formattedNumber}`,
    colorStyle: sign === '+' ? 'text-green' : 'text-grey-900'
  }
}
