import { RecurringBillItem } from '~/components/RecurringBillItem'
import { SectionTitleBlock } from '~/components/SectionTitleBlock'
import { SectionWrapper } from '~/components/SectionWrapper'
import type { TransactionType } from '~/types/TransactionType'

type RecurringProps = {
  transactions: TransactionType[]
}

export const Recurring = ({ transactions }: RecurringProps) => {
  // TODO double-check
  const paidRecurring = transactions
    .filter(
      (transaction) =>
        transaction.recurring && transaction.date.startsWith('2024-08')
    )
    .reduce((sum, tr) => sum + Math.abs(tr.amount), 0)

  return (
    <SectionWrapper styles='gap-8 grow'>
      <SectionTitleBlock title="Recurring Bills" linkText="See Details" />

      <div className="flex flex-col gap-3">
        <RecurringBillItem type="paid" value={paidRecurring} />

        <RecurringBillItem type="upcoming" value={1} />

        <RecurringBillItem type="soon" value={1} />
      </div>
    </SectionWrapper>
  )
}
