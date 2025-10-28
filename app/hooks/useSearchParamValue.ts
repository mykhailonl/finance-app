import { useSearchParams } from 'react-router'

import {
  FILTER_OPTIONS,
  type FilterOption,
  SORT_OPTIONS,
  type SortOption,
} from '~/types/DropdownType'

export type ParamType =
  | 'sortBy'
  | 'filterBy'
  | 'page'
  | 'query'
  | 'month'
  | 'year'
  | 'potId'

export type ParamValueMap = {
  sortBy: SortOption
  filterBy: FilterOption
  page: number
  query: string
  month: string
  year: string
  potId?: number
}

//#region validators
const sortValues = SORT_OPTIONS.map((opt) => opt.value)
const filterValues = FILTER_OPTIONS.map((opt) => opt.value)

const isValidSortOption = (value: string): value is SortOption => {
  return sortValues.includes(value as SortOption)
}

const isValidFilterOption = (value: string): value is FilterOption => {
  return filterValues.includes(value as FilterOption)
}

const isValidPageNumber = (value: string): value is string => {
  const num = parseInt(value, 10)

  return !isNaN(num) && num > 0
}

const isValidMonth = (month: string) => {
  const normalizedMonth = Number(month)

  return (
    Number.isInteger(normalizedMonth) &&
    normalizedMonth >= 1 &&
    normalizedMonth <= 12
  )
}

const isValidYear = (year: string) => {
  const normalizedYear = Number(year)

  return (
    Number.isInteger(normalizedYear) &&
    normalizedYear >= 2022 &&
    normalizedYear <= 2030
  )
}

const isValidPotId = (value: string): value is string => {
  const num = parseInt(value, 10)

  return !isNaN(num) && num > 0
}
//#endregion

/**
 * Type-safe hook for working with URL search parameters
 *
 * @template T - Parameter type from ParamType
 * @param paramName - Parameter name ('sortBy' | 'filterBy' | 'page' | 'query' | 'month' | 'year' | 'potId')
 *
 * @returns Tuple [value, setValue] where:
 * - value: current parameter value (automatically typed)
 * - setValue: function to update the parameter
 *
 * @example
 * ```typescript
 * // Automatic typing: [SortOption, (value: SortOption) => void]
 * const [sortBy, setSortBy] = useSearchParamValue('sortBy')
 * setSortBy('latest') // ✅ Type-safe
 *
 * // Automatic typing: [number, (value: number) => void]
 * const [page, setPage] = useSearchParamValue('page')
 * setPage(2) // ✅ Type-safe
 *
 * // Automatic typing: [string, (value: string) => void]
 * const [query, setQuery] = useSearchParamValue('query')
 * setQuery('search term') // ✅ Any string is valid
 *
 */
export const useSearchParamValue = <T extends ParamType>(paramName: T) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const defaultValue: ParamValueMap = {
    sortBy: 'latest',
    filterBy: 'all',
    page: 1,
    query: '',
    month: '10',
    year: '2025',
  }

  const validators = {
    sortBy: isValidSortOption,
    filterBy: isValidFilterOption,
    page: isValidPageNumber,
    query: null,
    month: isValidMonth,
    year: isValidYear,
    potId: isValidPotId,
  } as const

  const paramValue = searchParams.get(paramName)

  const parseValue = (rawValue: string | null): ParamValueMap[T] => {
    if (!rawValue) {
      if (paramName === 'potId') {
        return undefined as ParamValueMap[T]
      }

      return defaultValue[paramName]
    }

    if (paramName === 'query') {
      return rawValue as ParamValueMap[T]
    }

    if (paramName === 'potId') {
      return parseInt(rawValue, 10) as ParamValueMap[T]
    }

    const validator = validators[paramName]

    if (!validator) {
      return defaultValue[paramName]
    }

    const isValid = validator(rawValue)

    if (!isValid) {
      return defaultValue[paramName]
    }

    if (paramName === 'page') {
      return parseInt(rawValue, 10) as ParamValueMap[T]
    }

    return rawValue as ParamValueMap[T]
  }

  const value = parseValue(paramValue)

  const setValue = (newValue: ParamValueMap[T]) => {
    const newSearchParams = new URLSearchParams(searchParams)

    if (paramName !== 'page') {
      newSearchParams.set('page', '1')
    }

    const defaultVal = defaultValue[paramName]

    if (newValue === defaultVal) {
      newSearchParams.delete(paramName)
    } else {
      const stringValue =
        paramName === 'page'
          ? (newValue as number).toString()
          : (newValue as string)
      newSearchParams.set(paramName, stringValue)
    }

    setSearchParams(newSearchParams)
  }

  return [value, setValue] as const
}
