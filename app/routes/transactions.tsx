import { PageTitle } from '~/components/PageTitle'
import { TransactionsContent } from '~/components/TransactionsContent'
import { PageWrapper } from '~/components/PageWrapper'

export default function Transactions() {
  return (
    <PageWrapper>
      <PageTitle title="Transactions" styles={{ containerStyles: 'py-2' }} />

      <TransactionsContent />
    </PageWrapper>
  )
}
