type Props = {
  amount: number
  isPot?: boolean
}

export const formatAmountToString = ({ amount, isPot = false }: Props) => {
  const adjustedAmount = isPot ? -amount : amount
  const absoluteValue = Math.abs(adjustedAmount)
  const sign = adjustedAmount > 0 ? '+' : '-'
  const formattedNumber = absoluteValue.toFixed(2)

  return {
    amount: `${sign}$${formattedNumber}`,
    colorStyle: sign === '+' ? 'text-green' : 'text-grey-900',
  }
}
