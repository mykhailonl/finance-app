import cn from 'classnames'

import { ActiveFilters } from '~/components/ActiveFilters'
import { Pagination } from '~/components/Pagination'
import { SectionWrapper } from '~/components/SectionWrapper'
import { TransactionFilters } from '~/components/TransactionFilters'
import { TransactionList } from '~/components/TransactionList'
import { useActiveFilters } from '~/hooks/useActiveFilters'
import { useSearchParamValue } from '~/hooks/useSearchParamValue'
import { useTransactionFilters } from '~/hooks/useTransactionFilters'

export const TransactionsContent = () => {
  const { hasActiveFilters } = useActiveFilters()

  const {
    transactions,
    totalPages,
    hasNext,
    hasPrev,
    totalCount,
    totalFilteredCount,
  } = useTransactionFilters({
    page: useSearchParamValue('page')[0],
    sortBy: useSearchParamValue('sortBy')[0],
    filterBy: useSearchParamValue('filterBy')[0],
    query: useSearchParamValue('query')[0],
    potId: useSearchParamValue('potId')[0],
  })

  const sectionStyles = totalCount === 0 ? 'h-full' : ''

  return (
    <SectionWrapper largerGap styles={cn(sectionStyles, 'grow')}>
      <TransactionFilters />

      {hasActiveFilters && <ActiveFilters />}

      <TransactionList
        transactions={transactions}
        total={totalCount}
        totalFiltered={totalFilteredCount}
      />

      <Pagination totalPages={totalPages} hasNext={hasNext} hasPrev={hasPrev} />
    </SectionWrapper>
  )
}
