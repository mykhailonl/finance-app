import cn from 'classnames'

import { ProgressBar } from '~/components/ProgressBar'
import type { Pot } from '~/types'
import { formatAmount } from '~/utils/formatAmount'

interface ProgressSectionProps {
  pot: Pick<Pot, 'target' | 'total' | 'theme'>
  extraMoney?: number
  smallBar?: boolean
  withDrawView?: boolean
}

export const ProgressSection = ({
  pot,
  smallBar,
  extraMoney = 0,
  withDrawView,
}: ProgressSectionProps) => {
  const formattedTarget = formatAmount(pot.target)
  const savedPercent = (pot.total / pot.target) * 100
  const extraPercent = extraMoney && (extraMoney / pot.target) * 100

  const totalPercent = savedPercent + extraPercent
  const percentToShow = totalPercent <= 0 ? 0 : totalPercent.toFixed(1)

  return (
    <div className="flex flex-col gap-4">
      <ProgressBar
        color={pot.theme}
        percent={Math.round(savedPercent)}
        small={smallBar}
        extraMoney={extraPercent}
        withDrawView={withDrawView}
      />

      <div className="flex gap-1">
        <p
          className={cn(
            'grow text-preset-5-bold',
            !extraMoney && 'text-grey-500',
            extraMoney && withDrawView ? 'text-red' : 'text-green'
          )}
        >
          {percentToShow}%
        </p>

        <p className="grow text-preset-5 text-right text-grey-500">
          Target of {formattedTarget}
        </p>
      </div>
    </div>
  )
}
