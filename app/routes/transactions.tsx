import { PageTitle } from '~/components/PageTitle'
import { PageWrapper } from '~/components/PageWrapper'
import { TransactionsContent } from '~/components/TransactionsContent'

export default function Transactions() {
  return (
    <PageWrapper>
      <PageTitle title="Transactions" styles={{ containerStyles: 'py-2' }} />

      <TransactionsContent />
    </PageWrapper>
  )
}
