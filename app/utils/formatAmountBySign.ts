import type { TransactionType } from '~/types'

export const formatAmountBySign = (type: TransactionType, amount: number) => {
  return type === 'expense' ? -amount : amount
}
