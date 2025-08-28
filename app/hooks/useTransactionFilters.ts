import { useMemo } from 'react'

import { useTransactions } from '~/hooks/useTransactions'
import type { FilterOption, SortOption } from '~/types/DropdownType'
import { filterByQuery } from '~/utils/filterByQuery'
import { sortTransactions } from '~/utils/sortTransactions'

type PaginationParams = {
  page: number
  sortBy: SortOption
  filterBy: FilterOption
  query: string
}

// todo finish Dropdown transformation, new Budget modals
export const useTransactionFilters = ({
  page,
  sortBy,
  filterBy,
  query,
}: PaginationParams) => {
  const { data: allTransactions } = useTransactions()

  return useMemo(() => {
    let filtered = allTransactions

    if (filterBy !== 'all') {
      filtered = filtered.filter((tr) => tr.category === filterBy)
    }

    if (query) {
      filtered = filterByQuery(filtered, query)
    }

    const sorted = sortTransactions(filtered, sortBy)

    const startIndex = (page - 1) * 10
    const endIndex = page * 10

    return {
      transactions: sorted.slice(startIndex, endIndex),
      totalPages: Math.ceil(sorted.length / 10),
      totalCount: sorted.length,
      allFiltered: sorted,
    }
  }, [allTransactions, page, sortBy, filterBy, query])
}
