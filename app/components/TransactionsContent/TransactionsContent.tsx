import { Pagination } from '~/components/Pagination'
import { SectionWrapper } from '~/components/SectionWrapper'
import { TransactionFilters } from '~/components/TransactionFilters'
import { TransactionList } from '~/components/TransactionList'
import { useSearchParamValue } from '~/hooks/useSearchParamValue'
import { useTransactionFilters } from '~/hooks/useTransactionFilters'

export const TransactionsContent = () => {
  const { transactions, totalPages } = useTransactionFilters({
    page: useSearchParamValue('page')[0],
    sortBy: useSearchParamValue('sortBy')[0],
    filterBy: useSearchParamValue('filterBy')[0],
    query: useSearchParamValue('query')[0],
  })

  return (
    <SectionWrapper largerGap>
      <TransactionFilters />

      <TransactionList transactions={transactions} />

      <Pagination totalPages={totalPages} />
    </SectionWrapper>
  )
}
