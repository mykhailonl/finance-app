import cn from 'classnames'
import React from 'react'

import { THEME_TO_TW_TEXT, type ThemeColor } from '~/constants/theme'
import { iconComponents } from '~/types/IconType'

type Props = {
  color: ThemeColor
  name: string
}

export const SectionHeader = ({ color, name }: Props) => {
  const IconEllipse = iconComponents['ellipse']
  const IconDots = iconComponents['dots']

  const sectionColor = THEME_TO_TW_TEXT[color]

  return (
    <div className={cn(sectionColor, 'flex gap-4 items-center')}>
      <IconEllipse className="h-4 w-4" />

      <div className="text-grey-300 flex grow items-center">
        <h2 className="text-preset-2 text-grey-900 grow">{name}</h2>

        <IconDots className="h-4 w-4" />
      </div>
    </div>
  )
}
