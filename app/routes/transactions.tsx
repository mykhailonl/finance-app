import { PageWrapper } from '~/components/PageWrapper'
import { TransactionsContent } from '~/components/TransactionsContent'
import { TransactionsHeader } from '~/components/TransactionsHeader'

// todo do i need to remove add button in transactionHeader in case of empty page?
export default function Transactions() {
  return (
    <PageWrapper>
      <TransactionsHeader />

      <TransactionsContent />
    </PageWrapper>
  )
}
