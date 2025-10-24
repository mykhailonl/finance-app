import { InfoCard } from '~/components/InfoCard'
import { ProgressBar } from '~/components/ProgressBar'
import { SectionHeader } from '~/components/SectionHeader'
import { SectionWrapper } from '~/components/SectionWrapper'
import { TransactionListSection } from '~/components/TransactionListSection'
import type { BudgetSectionProps } from '~/types/BudgetTypes'
import { formatAmount } from '~/utils/formatAmount'

export const BudgetSection = ({
  budget,
  transactions,
  spentThisMonth,
}: BudgetSectionProps) => {
  const formattedMax = formatAmount(budget.maximum)

  const availableBudgetLeft =
    budget.maximum - spentThisMonth > 0 ? budget.maximum - spentThisMonth : 0
  const spentPercent = Math.round((spentThisMonth / budget.maximum) * 100)

  return (
    <SectionWrapper>
      <SectionHeader item={budget} />

      <div className="flex flex-col gap-4">
        <p className="text-preset-4 text-grey-500">Maximum of {formattedMax}</p>

        <ProgressBar color={budget.theme} percent={spentPercent} />

        <div className="flex gap-4">
          <InfoCard name="Spent" amount={spentThisMonth} color={budget.theme} />

          <InfoCard name="Remaining" amount={availableBudgetLeft} />
        </div>
      </div>

      <TransactionListSection
        transactions={transactions}
        title="Latest Spending"
        link={`/transactions?page=1&filterBy=${budget.category}`}
        linkText="See All"
        emptyTextState="No transactions for this budget yet"
      />
    </SectionWrapper>
  )
}
