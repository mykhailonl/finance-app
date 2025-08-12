import { Dropdown } from '~/components/Dropdown'
import { InputField } from '~/components/InputField'
import { useDevice } from '~/hooks/useDevice'
import { useSearchParamValue } from '~/hooks/useSearchParamValue'
import { FILTER_OPTIONS, SORT_OPTIONS } from '~/types/DropdownType'
import { iconComponents } from '~/types/IconType'
import { getDropdownLabel } from '~/utils/getDropdownLabel'

export const TransactionFilters = () => {
  const { isMobile, isTablet } = useDevice()

  const [sortBy, setSortBy] = useSearchParamValue('sortBy')
  const [filterBy, setFilterBy] = useSearchParamValue('filterBy')
  const [query, setQuery] = useSearchParamValue('query')

  const SortIcon = iconComponents['sort']
  const FilterIcon = iconComponents['filter']

  const inputPlaceholder = isTablet ? 'Search' : 'Search transaction'

  return (
    <div className="flex gap-6 items-center justify-between">
      <InputField
        name="Search"
        showLabel={false}
        placeholder={inputPlaceholder}
        showMainIcon
        iconName="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
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
              value={sortBy}
              currentLabel={getDropdownLabel({
                value: sortBy,
                options: SORT_OPTIONS,
                type: 'sort',
              })}
              onChange={(value) => setSortBy(value)}
              options={SORT_OPTIONS}
            />

            <Dropdown
              type="filter"
              value={filterBy}
              currentLabel={getDropdownLabel({
                value: filterBy,
                options: FILTER_OPTIONS,
                type: 'filter',
              })}
              onChange={(value) => setFilterBy(value)}
              options={FILTER_OPTIONS}
            />
          </>
        )}
      </div>
    </div>
  )
}
