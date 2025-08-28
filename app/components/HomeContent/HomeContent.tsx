import React from 'react'

import { WidgetBudgets } from '~/components/WidgetBudgets'
import { WidgetPots } from '~/components/WidgetPots'
import { WidgetRecurring } from '~/components/WidgetRecurring'
import { WidgetTransactions } from '~/components/WidgetTransactions'

export const HomeContent = () => {
  return (
    <div className="flex flex-col gap-6 items-start lg:flex-row">
      <div className="flex flex-col gap-4 items-start self-stretch grow md:gap-6">
        <WidgetPots />

        <WidgetTransactions />
      </div>

      <div className="flex flex-col gap-4 items-start self-stretch md:gap-6">
        <WidgetBudgets />

        <WidgetRecurring />
      </div>
    </div>
  )
}
