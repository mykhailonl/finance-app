import type { SortOption } from '~/types/DropdownType'
import type { TransactionType } from '~/types/TransactionType'

export const sortTransactions = (
  transactions: TransactionType[],
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
          return new Date(b.date).getDate() - new Date(a.date).getDate()
        })
      }

      return [...transactions].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })

    case 'oldest':
      if (ignoreMonth) {
        return [...transactions].sort((a, b) => {
          return new Date(a.date).getDate() - new Date(b.date).getDate()
        })
      }

      return [...transactions].sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
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
