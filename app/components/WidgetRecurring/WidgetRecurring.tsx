import { RecurringBillItem } from '~/components/RecurringBillItem'
import { SectionTitleBlock } from '~/components/SectionTitleBlock'
import { SectionWrapper } from '~/components/SectionWrapper'
import { useRecurringTransactions } from '~/hooks/useRecurringTransactions'
import { formatAmount } from '~/utils/formatAmount'

export const WidgetRecurring = () => {
  const {
    data: { paidRecurring, upcomingRecurring, dueSoon, transactions },
  } = useRecurringTransactions({
    sortBy: 'latest',
    page: 1,
    query: '',
  })

  const noTransactionsYet = !transactions.amount

  return (
    <SectionWrapper styles="gap-8 grow lg:min-w-[430px]">
      <SectionTitleBlock
        title="Recurring Bills"
        linkText="See Details"
        link="/recurring"
      />

      {noTransactionsYet ? (
        <div className="flex items-center justify-center">
          <p className="text-preset-4 text-grey-500">
            You haven&#39;t added any recurring transactions.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            <RecurringBillItem
              type="paid"
              value={formatAmount(paidRecurring.amount)}
            />

            <RecurringBillItem
              type="upcoming"
              value={formatAmount(upcomingRecurring.amount)}
            />

            <RecurringBillItem
              type="soon"
              value={formatAmount(dueSoon.amount)}
            />
          </div>
        </>
      )}
    </SectionWrapper>
  )
}
