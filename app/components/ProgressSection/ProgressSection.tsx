import cn from 'classnames'

import { ProgressBar } from '~/components/ProgressBar'
import type { PotType } from '~/types/PotType'
import { formatAmount } from '~/utils/formatAmount'

interface ProgressSectionProps {
  pot: PotType
  extraMoney?: number
  smallBar?: boolean
}

export const ProgressSection = ({
  pot,
  smallBar,
  extraMoney = 0,
}: ProgressSectionProps) => {
  const formattedTarget = formatAmount(pot.target)
  const savedPercent = (pot.total / pot.target) * 100
  const extraPercent = extraMoney && (extraMoney / pot.target) * 100

  const totalPercent = savedPercent + extraPercent

  return (
    <div className="flex flex-col gap-4">
      <ProgressBar
        color={pot.theme}
        percent={Math.round(savedPercent)}
        small={smallBar}
        extraMoney={extraPercent}
      />

      <div className="flex gap-1">
        <p
          className={cn(
            'grow text-preset-5-bold',
            extraMoney ? 'text-green' : 'text-grey-500'
          )}
        >
          {totalPercent.toFixed(1)}%
        </p>

        <p className="grow text-preset-5 text-right text-grey-500">
          Target of {formattedTarget}
        </p>
      </div>
    </div>
  )
}
