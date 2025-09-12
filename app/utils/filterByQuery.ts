import type { TransactionListType } from '~/types/TransactionTypes'

export const filterByQuery = (
  transactions: TransactionListType,
  query: string
) => {
  return transactions.filter((tr) =>
    tr.name.toLowerCase().includes(query.toLowerCase())
  )
}
