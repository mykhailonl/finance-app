import type { DropdownOptions, DropdownOptionType } from '~/types/DropdownType'

export const sortUsedOptions = <T extends DropdownOptionType>(
  options: DropdownOptions<T>,
  usedValues: T[]
) => {
  return [...options].sort((a, b) => {
    const aUsed = usedValues && usedValues.includes(a.value)
    const bUsed = usedValues && usedValues.includes(b.value)

    if (aUsed && !bUsed) {
      return 1
    }

    if (!aUsed && bUsed) {
      return -1
    }

    return a.label.localeCompare(b.label)
  })
}
