import React from 'react'

import { BudgetInfo } from '~/components/BudgetInfo'
import { Divider } from '~/components/Divider'
import type { BudgetType } from '~/types/BudgetType'
import type { TransactionType } from '~/types/TransactionType'

type Props = {
  budgets: BudgetType[]
  transactions: TransactionType[]
}

export const BudgetHero = ({ budgets, transactions }: Props) => {
  return (
    <div className="flex flex-col gap-6 grow lg:self-stretch">
      <h2 className="text-preset-2 text-grey-900">Spending Summary</h2>

      <div className="flex flex-col gap-4">
        {budgets.map((el, index) => {
          const spentWithinCategory = transactions
            .filter((tr) => tr.category === el.category)
            .reduce((sum, tr) => sum + Math.abs(tr.amount), 0)

          return (
            <React.Fragment key={el.category}>
              <BudgetInfo budget={el} spent={spentWithinCategory} />

              {index < budgets.length - 1 && <Divider />}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
