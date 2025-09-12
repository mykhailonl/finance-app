import { Fragment } from 'react'

import { Divider } from '~/components/Divider'
import { InfoCard } from '~/components/InfoCard'
import { ProgressBar } from '~/components/ProgressBar'
import { SectionHeader } from '~/components/SectionHeader'
import { SectionTitleBlock } from '~/components/SectionTitleBlock'
import { SectionWrapper } from '~/components/SectionWrapper'
import { WidgetTransaction } from '~/components/WidgetTransaction'
import type { Budget, Transaction } from '~/types'
import { formatAmount } from '~/utils/formatAmount'

type Props = {
  budget: Budget
  transactions: Transaction[]
  spentThisMonth: number
}

export const BudgetSection = ({
  budget,
  transactions,
  spentThisMonth,
}: Props) => {
  const formattedMax = formatAmount(budget.maximum)

  const availableBudgetLeft =
    budget.maximum - spentThisMonth > 0 ? budget.maximum - spentThisMonth : 0
  const spentPercent = Math.round((spentThisMonth / budget.maximum) * 100)
  const noTransactionsYet = !transactions.length

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

      <div className="flex flex-col p-4 bg-beige-100 rounded-xl gap-5 md:p-5">
        <SectionTitleBlock
          title="Latest Spending"
          linkText="See All"
          link={`/transactions?page=1&filterBy=${budget.category}`}
          small
          disabled={noTransactionsYet}
        />

        {noTransactionsYet ? (
          <p className="text-preset-4 text-grey-500 self-center">
            No transactions for this budget yet
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {transactions.map((transaction, index) => (
              <Fragment key={transaction.transaction_date}>
                <WidgetTransaction
                  transaction={transaction}
                  hideAvatarOnMobile
                  small
                />

                {index < transactions.length - 1 && (
                  <Divider styles="bg-grey-500 opacity-15" />
                )}
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </SectionWrapper>
  )
}
