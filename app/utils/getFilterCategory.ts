import {
  FILTER_VALUE_TO_CATEGORY,
  type FilterOption,
} from '~/types/DropdownType'

export const getFilterCategory = (filterValue: FilterOption): string => {
  return FILTER_VALUE_TO_CATEGORY[filterValue]
}
