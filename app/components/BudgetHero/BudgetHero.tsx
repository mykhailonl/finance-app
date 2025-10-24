import { Fragment } from 'react'

import { BudgetInfo } from '~/components/BudgetInfo'
import { Divider } from '~/components/Divider'
import type { BudgetHeroProps } from '~/types/BudgetTypes'

export const BudgetHero = ({ budgets, categorySpent }: BudgetHeroProps) => {
  return (
    <div className="flex flex-col gap-6 grow lg:self-stretch">
      <h2 className="text-preset-2 text-grey-900">Spending Summary</h2>

      <div className="flex flex-col gap-4">
        {budgets
          .sort((a, b) => {
            const firstCategorySpending = categorySpent[a.category]
            const secondCategorySpending = categorySpent[b.category]

            return secondCategorySpending - firstCategorySpending
          })
          .map((budget, index) => {
            const spent = categorySpent[budget.category]

            return (
              <Fragment key={budget.category}>
                <BudgetInfo budget={budget} spent={spent} />

                {index < budgets.length - 1 && <Divider />}
              </Fragment>
            )
          })}
      </div>
    </div>
  )
}
