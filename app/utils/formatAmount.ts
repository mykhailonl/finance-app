export const formatAmount = (amount: number, abs?: boolean) => {
  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return USDollar.format(abs ? Math.abs(amount) : amount)
}
