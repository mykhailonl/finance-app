import cn from 'classnames'

import { Divider } from '~/components/Divider'
import { THEME_TO_TW_CLASS } from '~/constants/theme'
import type { Budget } from '~/types'
import { formatAmount } from '~/utils/formatAmount'

type Props = {
  budget: Budget
  spent: number
}

export const BudgetInfo = ({ budget, spent }: Props) => {
  const colorStyle = THEME_TO_TW_CLASS[budget.theme]
  const formattedMax = formatAmount(budget.maximum)
  const formattedSpent = formatAmount(spent)

  return (
    <div className="flex justify-between">
      <div className="flex gap-4 items-center">
        <Divider styles={cn(colorStyle, 'h-full')} basic={false} />

        <p className="text-preset-4 text-grey-500">{budget.category}</p>
      </div>

      <div className="flex gap-2 items-center">
        <span className="text-preset-3 text-grey-900">{formattedSpent}</span>

        <span className="text-preset-5 text-grey-500">of {formattedMax}</span>
      </div>
    </div>
  )
}
