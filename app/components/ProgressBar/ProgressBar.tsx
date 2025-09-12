import cn from 'classnames'

import { THEME_TO_TW_CLASS } from '~/constants/theme'
import type { ThemeColor } from '~/types'

type Props = {
  color: ThemeColor
  percent: number
  small?: boolean
  extraMoney?: number
  withDrawView?: boolean
}

export const ProgressBar = ({
  color,
  percent,
  small,
  extraMoney,
  withDrawView,
}: Props) => {
  const barColor = THEME_TO_TW_CLASS[color]

  // Withdraw money case
  if (withDrawView && extraMoney) {
    const remainingPercent = percent + extraMoney
    const withdrawPercent = Math.abs(extraMoney)

    return (
      <div
        className={cn(
          'flex items-start bg-beige-100 rounded-sm',
          small ? 'h-2' : 'h-8 p-1'
        )}
      >
        <div
          className={cn('h-full rounded-l-sm', barColor)}
          style={{ width: `${Math.max(0, remainingPercent)}%` }}
        />

        <div className="h-full w-[2px] bg-grey-100" />

        <div
          style={{ width: `${withdrawPercent}%` }}
          className={cn(
            'h-full bg-red',
            remainingPercent < 0.1 ? 'rounded-sm' : 'rounded-r-sm'
          )}
        />
      </div>
    )
  }

  // Add money case
  return (
    <div
      className={cn(
        'flex items-start bg-beige-100 rounded-sm',
        small ? 'h-2' : 'h-8 p-1'
      )}
    >
      <div
        className={cn(
          'h-full',
          extraMoney ? 'rounded-l-sm' : 'rounded-sm',
          extraMoney ? 'bg-grey-900' : barColor
        )}
        style={{ width: `${percent}%` }}
      />

      {!!extraMoney && (
        <>
          <div className="h-full w-[2px] bg-grey-100" />
          <div
            style={{ width: `${extraMoney}%` }}
            className={cn('h-full rounded-r-sm', barColor)}
          />
        </>
      )}
    </div>
  )
}
