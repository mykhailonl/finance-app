import cn from 'classnames'

import { CATEGORY_ICON_OPTIONS } from '~/types/DropdownType'
import type { CategoryIconProps } from '~/types/IconType'

export const CategoryIcon = ({
  category,
  size = 40,
  color = '#FFF',
  styles,
}: CategoryIconProps) => {
  const iconSetup = CATEGORY_ICON_OPTIONS.find(
    (icon) => icon.name === category
  )!
  const IconComponent = iconSetup.options.icon

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-full shrink-0',
        styles
      )}
      style={{
        width: size,
        height: size,
        backgroundColor: iconSetup.options.bg,
      }}
    >
      <IconComponent size={size * 0.6} color={color} weight="regular" />
    </div>
  )
}
