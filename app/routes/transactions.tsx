import { PageTitle } from '~/components/PageTitle'
import { TransactionsContent } from '~/components/TransactionsContent'

export default function Transactions() {
  return (
    <div className="flex flex-col gap-8 grow h-screen overflow-y-auto px-4 py-6 md:px-10 md:py-8">
      <PageTitle title="Transactions" styles={{ containerStyles: 'py-2' }} />

      <TransactionsContent />
    </div>
  )
}
