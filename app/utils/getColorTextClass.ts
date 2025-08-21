import { THEME_TO_TW_TEXT } from '~/constants/theme'
import type { ColorOption } from '~/types/DropdownType'
import { isColorOption } from '~/utils/isColorOption'

export const getColorTextClass = (color: ColorOption): string => {
  if (isColorOption(color)) {
    return THEME_TO_TW_TEXT[color]
  }
  return 'text-grey-500'
}
