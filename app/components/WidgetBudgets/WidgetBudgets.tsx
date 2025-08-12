import React from 'react'

import { BudgetChart } from '~/components/BudgetChart'
import { InfoCard } from '~/components/InfoCard'
import { SectionTitleBlock } from '~/components/SectionTitleBlock'
import { SectionWrapper } from '~/components/SectionWrapper'
import type { ThemeColor } from '~/constants/theme'
import useBudgets from '~/hooks/useBudgets'
import { useTransactions } from '~/hooks/useTransactions'
import type { BudgetType } from '~/types/BudgetType'
import type { TransactionType } from '~/types/TransactionType'

export const WidgetBudgets = () => {
  const { data } = useBudgets()
  const {
    data: { filteredByCategories },
  } = useTransactions({ categories: data.budgetCategories })

  const spentWithinBudgets: number = filteredByCategories
    .filter((tr: TransactionType) => tr.date.startsWith('2025-08'))
    .reduce((sum: number, tr: TransactionType) => sum + Math.abs(tr.amount), 0)

  return (
    <SectionWrapper styles="grow gap-8">
      <SectionTitleBlock
        title="Budgets"
        linkText="See Details"
        link="/budgets"
      />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:py-2 lg:w-fit">
        <div className="flex items-center justify-center relative w-full h-[300px] md:h-[250px] md:w-[250px] lg:w-[250px] grow">
          <BudgetChart
            budgets={data.budgets}
            spent={spentWithinBudgets}
            limit={data.totalLimit}
          />
        </div>

        <div className="flex md:flex-col gap-4 flex-wrap">
          {data.budgets.slice(0, 4).map((budget: BudgetType, index: number) => (
            <InfoCard
              key={index}
              name={budget.category}
              amount={budget.maximum}
              color={budget.theme as ThemeColor}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
