import { PageWrapper } from '~/components/PageWrapper'
import { TransactionsContent } from '~/components/TransactionsContent'
import { TransactionsHeader } from '~/components/TransactionsHeader'
import { useTransactionFilters } from '~/hooks/useTransactionFilters'

export default function Transactions() {
  const { totalCount } = useTransactionFilters({})

  return (
    <PageWrapper>
      <TransactionsHeader showButton={!!totalCount} />

      <TransactionsContent />
    </PageWrapper>
  )
}
