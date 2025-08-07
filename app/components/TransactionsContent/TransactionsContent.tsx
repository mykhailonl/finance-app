import { useSearchParams } from 'react-router'

import { Pagination } from '~/components/Pagination'
import { TransactionFilters } from '~/components/TransactionFilters'
import { TransactionList } from '~/components/TransactionList'
import usePaginatedTransactions from '~/hooks/usePaginatedTransactions'
import type { FilterOption, SortOption } from '~/types/DropdownType'

export const TransactionsContent = () => {
  const [searchParams] = useSearchParams()

  const currentPage = searchParams.get('page') || 1
  const sortValue = searchParams.get('sort') || 'latest'
  const filterByValue = searchParams.get('filterBy') || 'all'
  const queryValue = searchParams.get('query') || ''

  const { data } = usePaginatedTransactions(
    +currentPage,
    sortValue as SortOption,
    filterByValue as FilterOption,
    queryValue
  )

  return (
    <div className="bg-white rounded-xl py-6 px-5 flex flex-col gap-6">
      <TransactionFilters />

      <TransactionList transactions={data.transactions} />

      <Pagination totalPages={data.totalPages} />
    </div>
  )
}
