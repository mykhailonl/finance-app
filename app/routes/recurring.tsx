import { Button } from '~/components/Button'
import { NoContentFound } from '~/components/NoContentFound'
import { PageTitle } from '~/components/PageTitle'
import { PageWrapper } from '~/components/PageWrapper'
import { RecurringContent } from '~/components/RecurringContent'
import { useModal } from '~/hooks/useModal'
import { useRecurringTransactions } from '~/hooks/useRecurringTransactions'
import { useSearchParamValue } from '~/hooks/useSearchParamValue'

export default function Recurring() {
  const [sortBy] = useSearchParamValue('sortBy')
  const [page] = useSearchParamValue('page')
  const [query] = useSearchParamValue('query')

  const { openModal } = useModal()
  const {
    data: { transactions },
  } = useRecurringTransactions({ sortBy, page, query })

  const noRecurringYet = !transactions.amount

  return (
    <PageWrapper>
      <PageTitle title="Recurring Bills" styles={{ containerStyles: 'py-2' }} />

      {noRecurringYet ? (
        <NoContentFound
          text="Create your first recurring transaction to keep track of your
            subscriptions"
        >
          <Button
            variant="primary"
            onClick={() => openModal({ type: 'transaction-add' })}
            styles="max-w-[150px] p-4"
          >
            Add Transaction
          </Button>
        </NoContentFound>
      ) : (
        <RecurringContent sortBy={sortBy} page={page} query={query} />
      )}
    </PageWrapper>
  )
}
