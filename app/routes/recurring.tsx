import { Button } from '~/components/Button'
import { PageTitle } from '~/components/PageTitle'
import { PageWrapper } from '~/components/PageWrapper'
import { Pagination } from '~/components/Pagination'
import { RecurringFilters } from '~/components/RecurringFilters'
import { RecurringList } from '~/components/RecurringList'
import { SectionWrapper } from '~/components/SectionWrapper'
import { SummaryCard } from '~/components/SummaryCard'
import { SummaryItemList } from '~/components/SummaryItemList'
import { useModal } from '~/hooks/useModal'
import { useRecurringTransactions } from '~/hooks/useRecurringTransactions'
import { useSearchParamValue } from '~/hooks/useSearchParamValue'
import type { SummaryItemType } from '~/types/SummaryType'
import { formatAmount } from '~/utils/formatAmount'

export default function Recurring() {
  const [sortBy] = useSearchParamValue('sortBy')
  const [page] = useSearchParamValue('page')
  const [query] = useSearchParamValue('query')

  const { openModal } = useModal()
  const {
    data: {
      paidRecurring,
      transactions,
      upcomingRecurring,
      dueSoon,
      totalPages,
      currentDay,
      hasNext,
      hasPrev,
    },
  } = useRecurringTransactions({ sortBy, page, query })

  const summaryInfo: SummaryItemType[] = [
    {
      label: 'Paid Bills',
      value: formatAmount(paidRecurring.amount),
      amountOfTransactions: paidRecurring.numberOfTransactions,
    },
    {
      label: 'Total Upcoming',
      value: formatAmount(upcomingRecurring.amount),
      amountOfTransactions: upcomingRecurring.numberOfTransactions,
    },
    {
      label: 'Due soon',
      value: formatAmount(dueSoon.amount),
      amountOfTransactions: dueSoon.numberOfTransactions,
    },
  ]

  const noRecurringYet = !transactions.amount

  return (
    <PageWrapper>
      <PageTitle title="Recurring Bills" styles={{ containerStyles: 'py-2' }} />

      {noRecurringYet ? (
        <div className="flex flex-col gap-6 justify-center items-center grow">
          <p className="text-preset-4 text-grey-500 self-center">
            Create your first recurring transaction to keep track of your
            subscriptions
          </p>

          <Button
            variant="primary"
            onClick={() => openModal({ type: 'transaction-add' })}
            styles="max-w-[150px] p-4"
          >
            Add Transaction
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex flex-col gap-3 md:flex-row md:gap-6 lg:flex-col lg:min-w-[337px] lg:max-h-fit">
            <SummaryCard
              iconName="recurring"
              cardTitle="Total Bills"
              mainCard
              cardValue={transactions.amount}
              styles="md:gap-8 md:flex-col md:items-start md:justify-end"
            />

            <SectionWrapper smallPadding styles="md:grow">
              <h3 className="text-preset-3 text-grey-900">Summary</h3>

              <SummaryItemList list={summaryInfo} />
            </SectionWrapper>
          </div>

          <SectionWrapper largerGap styles="lg:grow">
            <RecurringFilters />

            <RecurringList
              transactions={transactions.transactions}
              currentDay={currentDay}
            />

            <Pagination
              totalPages={totalPages}
              hasNext={hasNext}
              hasPrev={hasPrev}
            />
          </SectionWrapper>
        </div>
      )}
    </PageWrapper>
  )
}
