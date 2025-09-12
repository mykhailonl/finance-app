import { Fragment } from 'react'

import { BudgetInfo } from '~/components/BudgetInfo'
import { Divider } from '~/components/Divider'
import useBudgets from '~/hooks/useBudgets'
import type { Budget } from '~/types'

export const BudgetHero = ({ budgets }: { budgets: Budget[] }) => {
  const {
    data: { spentByCategory },
  } = useBudgets()

  return (
    <div className="flex flex-col gap-4">
      {budgets.map((budget, index) => (
        <Fragment key={budget.category}>
          <BudgetInfo
            budget={budget}
            spent={spentByCategory[budget.category]}
          />

          {index < budgets.length - 1 && <Divider />}
        </Fragment>
      ))}
    </div>
  )
}
