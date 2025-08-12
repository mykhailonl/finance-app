import { useSuspenseQuery } from '@tanstack/react-query'

import type { FilterOption, SortOption } from '~/types/DropdownType'
import type { TransactionType } from '~/types/TransactionType'
import { filterByQuery } from '~/utils/filterByQuery'
import { getFilterCategory } from '~/utils/getFilterCategory'
import { sortTransactions } from '~/utils/sortTransactions'

type PaginationParams = {
  page: number
  sortBy: SortOption
  filterBy: FilterOption
  query: string
}

export default function usePaginatedTransactions({
  page,
  sortBy,
  filterBy,
  query,
}: PaginationParams) {
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

      const start = (page - 1) * 10
      const end = page * 10

      const sortedAndFiltered = sortTransactions(filteredTransactions, sortBy)
      const filtered = filterByQuery(sortedAndFiltered, query)

      return {
        transactions: filtered.slice(start, end),
        totalPages: Math.ceil(filtered.length / 10),
      }
    },
  })
}
