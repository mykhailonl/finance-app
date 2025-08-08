import cn from 'classnames'
import React from 'react'

import { THEME_TO_TW_CLASS, type ThemeColor } from '~/constants/theme'

type Props = {
  color: ThemeColor
  percent: number
  small?: boolean
}

export const ProgressBar = ({ color, percent, small }: Props) => {
  const barColor = THEME_TO_TW_CLASS[color]

  return (
    <div
      className={cn(
        'flex items-start bg-beige-100 rounded-sm',
        small ? 'h-2' : 'h-8 p-1'
      )}
    >
      <div
        className={cn(barColor, `h-full rounded-sm`)}
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
