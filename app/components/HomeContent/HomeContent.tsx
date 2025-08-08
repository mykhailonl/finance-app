import React from 'react'

import { WidgetBudgets } from '~/components/WidgetBudgets'
import { Pots } from '~/components/Pots'
import { Recurring } from '~/components/Recurring'
import { WidgetTransactions } from '~/components/WidgetTransactions'
import type { BudgetType } from '~/types/BudgetType'
import type { PotType } from '~/types/PotType'
import type { TransactionType } from '~/types/TransactionType'

type HomeContentProps = {
  pots: PotType[]
  transactions: TransactionType[]
  budgets: BudgetType[]
}

export const HomeContent = ({
  pots,
  budgets,
  transactions,
}: HomeContentProps) => {
  return (
    <div className="flex flex-col gap-6 items-start lg:flex-row">
      <div className="flex flex-col gap-4 items-start self-stretch grow md:gap-6">
        <Pots pots={pots} />

        <WidgetTransactions transactions={transactions.slice(0, 5)} />
      </div>

      <div className="flex flex-col gap-4 items-start self-stretch md:gap-6">
        <WidgetBudgets budgets={budgets} />

        <Recurring transactions={transactions} />
      </div>
    </div>
  )
}
