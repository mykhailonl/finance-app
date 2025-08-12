import type { TransactionType } from '~/types/TransactionType'

export const filterByQuery = (
  transactions: TransactionType[],
  query: string
) => {
  return transactions.filter((tr) =>
    tr.name.toLowerCase().includes(query.toLowerCase())
  )
}
