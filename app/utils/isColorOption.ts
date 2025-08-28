import type { ThemeColor } from '~/types'
import type { ColorOption, DropdownOptionType } from '~/types/DropdownType'

const THEME_COLORS: ThemeColor[] = [
  'green',
  'yellow',
  'cyan',
  'navy',
  'red',
  'purple',
  'light-purple',
  'turquoise',
  'brown',
  'magenta',
  'blue',
  'navy-grey',
  'army-green',
  'gold',
  'orange',
]

export const isColorOption = (
  value: DropdownOptionType
): value is ColorOption => {
  return THEME_COLORS.includes(value as ThemeColor)
}
