import { RecurringBillItem } from '~/components/RecurringBillItem'
import { SectionTitleBlock } from '~/components/SectionTitleBlock'
import { SectionWrapper } from '~/components/SectionWrapper'
import { useRecurringTransactions } from '~/hooks/useRecurringTransactions'
import { formatAmount } from '~/utils/formatAmount'

export const WidgetRecurring = () => {
  const {
    data: { paidRecurring, upcomingRecurring, dueSoon },
  } = useRecurringTransactions({
    sortBy: 'latest',
    page: 1,
    query: '',
  })

  return (
    <SectionWrapper styles="gap-8 grow">
      <SectionTitleBlock
        title="Recurring Bills"
        linkText="See Details"
        link="/recurring"
      />

      <div className="flex flex-col gap-3">
        <RecurringBillItem
          type="paid"
          value={formatAmount(paidRecurring.amount)}
        />

        <RecurringBillItem
          type="upcoming"
          value={formatAmount(upcomingRecurring.amount)}
        />

        <RecurringBillItem type="soon" value={formatAmount(dueSoon.amount)} />
      </div>
    </SectionWrapper>
  )
}
