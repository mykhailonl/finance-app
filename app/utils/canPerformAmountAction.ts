export const canPerformAmountAction = (balance: number, amount: number) => {
  return amount <= balance
}
