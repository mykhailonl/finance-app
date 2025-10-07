import { useMemo } from 'react'

import { useTransactions } from '~/hooks/useTransactions'
import type { FilterOption, SortOption } from '~/types/DropdownType'
import { filterByQuery } from '~/utils/filterByQuery'
import { paginate } from '~/utils/paginate'
import { sortTransactions } from '~/utils/sortTransactions'

type PaginationParams = {
  page?: number
  sortBy?: SortOption
  filterBy?: FilterOption
  query?: string
}

export const useTransactionFilters = ({
  page = 1,
  sortBy = 'latest',
  filterBy = 'all',
  query = '',
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
    const paginationResult = paginate(sorted, page, 10)

    return {
      transactions: paginationResult.items,
      totalPages: paginationResult.totalPages,
      totalCount: allTransactions.length,
      totalFilteredCount: paginationResult.totalFilteredCount,
      currentPage: paginationResult.currentPage,
      hasNext: paginationResult.hasNext,
      hasPrev: paginationResult.hasPrev,
      allFiltered: sorted,
    }
  }, [allTransactions, page, sortBy, filterBy, query])
}
