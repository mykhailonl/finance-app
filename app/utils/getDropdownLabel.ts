import {
  type DropdownOptions,
  type DropdownOptionType,
  type DropdownType,
} from '~/types/DropdownType'

interface Props {
  value: DropdownOptionType
  options: DropdownOptions<DropdownOptionType>
  type: DropdownType
}

export const getDropdownLabel = ({ value, options, type }: Props) => {
  const option = options.find((opt) => opt.value === value)
  const defaultValue = type === 'sort' ? 'Latest' : 'All transactions'

  return option?.label || defaultValue
}
