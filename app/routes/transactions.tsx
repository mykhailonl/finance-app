import { PageWrapper } from '~/components/PageWrapper'
import { TransactionsContent } from '~/components/TransactionsContent'
import { TransactionsHeader } from '~/components/TransactionsHeader'

export default function Transactions() {
  return (
    <PageWrapper>
      <TransactionsHeader />

      <TransactionsContent />
    </PageWrapper>
  )
}
