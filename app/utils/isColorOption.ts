import { THEME_TO_TW_TEXT } from '~/constants/theme'
import type { ColorOption, DropdownOptionType } from '~/types/DropdownType'

export const isColorOption = (value: DropdownOptionType): value is ColorOption => {
  return Object.keys(THEME_TO_TW_TEXT).includes(value as string)
}
