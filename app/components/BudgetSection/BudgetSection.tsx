import cn from 'classnames'
import React from 'react'

import { Divider } from '~/components/Divider'
import { InfoCard } from '~/components/InfoCard'
import { SectionTitleBlock } from '~/components/SectionTitleBlock'
import { SectionWrapper } from '~/components/SectionWrapper'
import { WidgetTransaction } from '~/components/WidgetTransaction'
import { THEME_TO_TW_CLASS, THEME_TO_TW_TEXT } from '~/constants/theme'
import type { BudgetType } from '~/types/BudgetType'
import { iconComponents } from '~/types/IconType'
import type { TransactionType } from '~/types/TransactionType'
import { formatAmount } from '~/utils/formatAmount'

type Props = {
  budget: BudgetType
  transactions: TransactionType[]
  spentThisMonth: number
}

// todo fix ui in case overspending within a category

export const BudgetSection = ({
  budget,
  transactions,
  spentThisMonth,
}: Props) => {
  const IconEllipse = iconComponents['ellipse']
  const IconDots = iconComponents['dots']
  const budgetColor = THEME_TO_TW_TEXT[budget.theme]
  const barColor = THEME_TO_TW_CLASS[budget.theme]
  const formattedMax = formatAmount(budget.maximum)

  const availableBudgetLeft =
    budget.maximum - spentThisMonth > 0 ? budget.maximum - spentThisMonth : 0
  const spentPercent = Math.round((spentThisMonth / budget.maximum) * 100)

  return (
    <SectionWrapper>
      <div className={cn(budgetColor, 'flex gap-4 items-center')}>
        <IconEllipse className="h-4 w-4" />

        <div className="text-grey-300 flex grow items-center">
          <h2 className="text-preset-2 text-grey-900 grow">
            {budget.category}
          </h2>

          <IconDots className="h-4 w-4" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-preset-4 text-grey-500">Maximum of {formattedMax}</p>

        <div className="flex items-start bg-beige-100 rounded-sm p-1 h-8">
          <div
            className={cn(barColor, `h-full rounded-sm`)}
            style={{ width: `${spentPercent}%` }}
          />
        </div>

        <div className="flex gap-4">
          <InfoCard name="Spent" amount={spentThisMonth} color={budget.theme} />

          <InfoCard name="Remaining" amount={availableBudgetLeft} />
        </div>
      </div>

      <div className="flex flex-col p-4 bg-beige-100 rounded-xl gap-5 md:p-5">
        <SectionTitleBlock
          title="Latest Spending"
          linkText="See All"
          link={'/'}
          small
        />

        <div className="flex flex-col gap-3">
          {transactions.map((transaction, index) => (
            <React.Fragment key={transaction.date}>
              <WidgetTransaction
                transaction={transaction}
                hideAvatarOnMobile
                small
              />

              {index < transactions.length - 1 && (
                <Divider styles="bg-grey-500 opacity-15" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
