import type { DropdownOptions, DropdownOptionType } from '~/types/DropdownType'

export const getDisplayValue = (
  value: DropdownOptionType,
  options: DropdownOptions<DropdownOptionType>
): string => {
  const option = options.find((opt) => opt.value === value)

  return option?.label || String(value)
}
