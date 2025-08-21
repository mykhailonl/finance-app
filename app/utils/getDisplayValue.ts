import { COLOR_VALUE_TO_LABEL } from '~/constants/theme'
import type { DropdownOptions, DropdownOptionType } from '~/types/DropdownType'
import { isColorOption } from '~/utils/isColorOption'

export const getDisplayValue = (
  value: DropdownOptionType,
  options: DropdownOptions<DropdownOptionType>
): string => {
  if (isColorOption(value)) {
    return COLOR_VALUE_TO_LABEL[value] || value
  }

  const option = options.find((opt) => opt.value === value)
  return option?.label || String(value)
}
