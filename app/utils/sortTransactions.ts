import type { SortOption } from '~/types/DropdownType'
import type { TransactionListType } from '~/types/TransactionType'

export const sortTransactions = (
  transactions: TransactionListType,
  sortBy: SortOption,
  ignoreMonth?: boolean
) => {
  switch (sortBy) {
    case 'alphAsc':
      return [...transactions].sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      )

    case 'alphDesc':
      return [...transactions].sort((a, b) =>
        b.name.toLowerCase().localeCompare(a.name.toLowerCase())
      )

    case 'latest':
      if (ignoreMonth) {
        return [...transactions].sort((a, b) => {
          return (
            new Date(b.transaction_date).getDate() -
            new Date(a.transaction_date).getDate()
          )
        })
      }

      return [...transactions].sort((a, b) => {
        return (
          new Date(b.transaction_date).getTime() -
          new Date(a.transaction_date).getTime()
        )
      })

    case 'oldest':
      if (ignoreMonth) {
        return [...transactions].sort((a, b) => {
          return (
            new Date(a.transaction_date).getDate() -
            new Date(b.transaction_date).getDate()
          )
        })
      }

      return [...transactions].sort((a, b) => {
        return (
          new Date(a.transaction_date).getTime() -
          new Date(b.transaction_date).getTime()
        )
      })

    case 'highest':
      return [...transactions].sort((a, b) => {
        const diff = Math.abs(b.amount) - Math.abs(a.amount)
        return diff !== 0 ? diff : b.amount - a.amount
      })

    case 'lowest':
      return [...transactions].sort((a, b) => {
        const diff = Math.abs(a.amount) - Math.abs(b.amount)
        return diff !== 0 ? diff : b.amount - a.amount
      })

    default:
      return transactions
  }
}
