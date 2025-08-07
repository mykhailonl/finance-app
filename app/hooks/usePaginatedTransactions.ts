import { useSuspenseQuery } from '@tanstack/react-query'

import type { FilterOption, SortOption } from '~/types/DropdownType'
import type { TransactionType } from '~/types/TransactionType'
import { getFilterCategory } from '~/utils/getFilterCategory'

export default function usePaginatedTransactions(
  page: number,
  sortBy: SortOption,
  filterBy: FilterOption,
  query: string
) {
  return useSuspenseQuery({
    queryKey: ['transactions', page, sortBy, filterBy, query],
    queryFn: async () => {
      const baseUrl =
        typeof window !== 'undefined'
          ? window.location.origin
          : 'http://localhost:5173'

      const res = await fetch(`${baseUrl}/data/data.json`)
      const data = await res.json()

      const filteredTransactions: TransactionType[] =
        filterBy === 'all'
          ? data.transactions
          : data.transactions.filter(
              (tr: TransactionType) =>
                tr.category === getFilterCategory(filterBy)
            )

      const sortedTransactions = (
        transactions: TransactionType[],
        sortBy: SortOption
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
            return [...transactions].sort((a, b) => {
              return new Date(b.date).getTime() - new Date(a.date).getTime()
            })

          case 'oldest':
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

      const start = (page - 1) * 10
      const end = page * 10

      const sortedAndFiltered = sortedTransactions(filteredTransactions, sortBy)
      const filteredByQuery = sortedAndFiltered.filter((tr) =>
        tr.name.toLowerCase().includes(query.toLowerCase())
      )

      return {
        transactions: filteredByQuery.slice(start, end),
        totalPages: Math.ceil(filteredByQuery.length / 10),
      }
    },
  })
}
