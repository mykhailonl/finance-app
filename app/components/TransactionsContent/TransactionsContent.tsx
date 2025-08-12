import { Pagination } from '~/components/Pagination'
import { SectionWrapper } from '~/components/SectionWrapper'
import { TransactionFilters } from '~/components/TransactionFilters'
import { TransactionList } from '~/components/TransactionList'
import usePaginatedTransactions from '~/hooks/usePaginatedTransactions'
import { useSearchParamValue } from '~/hooks/useSearchParamValue'

export const TransactionsContent = () => {
  const { data } = usePaginatedTransactions({
    page: useSearchParamValue('page')[0],
    sortBy: useSearchParamValue('sortBy')[0],
    filterBy: useSearchParamValue('filterBy')[0],
    query: useSearchParamValue('query')[0],
  })

  return (
    <SectionWrapper largerGap>
      <TransactionFilters />

      <TransactionList transactions={data.transactions} />

      <Pagination totalPages={data.totalPages} />
    </SectionWrapper>
  )
}
