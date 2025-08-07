import { type ChangeEvent, useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router'

import { Dropdown } from '~/components/Dropdown'
import { InputField } from '~/components/InputField'
import { useDevice } from '~/hooks/useDevice'
import { FILTER_OPTIONS, SORT_OPTIONS } from '~/types/DropdownType'
import { iconComponents } from '~/types/IconType'
import { getSearchWith } from '~/utils/getSearchWith'

export const TransactionFilters = () => {
  const { isMobile, isTablet } = useDevice()
  const [searchParams, setSearchParams] = useSearchParams()

  const { search } = useLocation()

  const sortValue = searchParams.get('sort') || 'latest'
  const filterByValue = searchParams.get('filterBy') || 'all'

  const queryValue = searchParams.get('query') || ''
  const [query, setQuery] = useState(queryValue)

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim()) {
        setSearchParams(getSearchWith({ query }, search))
      } else {
        setSearchParams(getSearchWith({ query: null }, search))
      }
    }, 500)

    return () => clearTimeout(delay)
  }, [query, search, setSearchParams])

  const SortIcon = iconComponents['sort']
  const FilterIcon = iconComponents['filter']

  //#region getters setters
  const getCurrentLabel = (currentValue: string) => {
    const option = SORT_OPTIONS.find((opt) => opt.value === currentValue)

    return option?.label || 'Latest'
  }

  const getFilterLabel = (currentFilter: string) => {
    const option = FILTER_OPTIONS.find((opt) => opt.value === currentFilter)

    return option?.label || 'All transactions'
  }

  const setSortValue = (value: string) => {
    const updatedUrl = getSearchWith({ sort: value, page: '1' }, search)

    // todo rewrite to reusable logic, include filter too, not overwrite
    setSearchParams(updatedUrl)
  }

  const setFilterByValue = (value: string) => {
    const updatedUrl = getSearchWith({ filterBy: value, page: '1' }, search)

    setSearchParams(updatedUrl)
  }
  //#endregion

  const inputPlaceholder = isTablet ? 'Search' : 'Search transaction'

  return (
    <div className="flex gap-6 items-center justify-between">
      <InputField
        name="Search"
        showLabel={false}
        placeholder={inputPlaceholder}
        showMainIcon={true}
        iconName="search"
        value={query}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
      />

      <div className="flex gap-6">
        {isMobile ? (
          <>
            <SortIcon className="w-5 h-5" />

            <FilterIcon className="w-5 h-5" />
          </>
        ) : (
          <>
            <Dropdown
              type="sort"
              value={sortValue}
              currentLabel={getCurrentLabel(sortValue)}
              onChange={setSortValue}
              options={SORT_OPTIONS}
            />

            <Dropdown
              type="filter"
              value={filterByValue}
              currentLabel={getFilterLabel(filterByValue)}
              onChange={setFilterByValue}
              options={FILTER_OPTIONS}
            />
          </>
        )}
      </div>
    </div>
  )
}
