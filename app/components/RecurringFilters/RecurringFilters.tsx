import { Dropdown } from '~/components/Dropdown'
import { InputField } from '~/components/InputField'
import { useDevice } from '~/hooks/useDevice'
import { useSearchParamValue } from '~/hooks/useSearchParamValue'
import { SORT_OPTIONS } from '~/types/DropdownType'
import { iconComponents } from '~/types/IconType'
import { getDropdownLabel } from '~/utils/getDropdownLabel'

export const RecurringFilters = () => {
  const { isMobile } = useDevice()

  const [query, setQuery] = useSearchParamValue('query')
  const [sortBy, setSortBy] = useSearchParamValue('sortBy')

  const SortIcon = iconComponents['sort']

  return (
    <div className="flex gap-6 items-center justify-between">
      <InputField
        name="SearchBills"
        showLabel={false}
        placeholder="Search bills"
        showMainIcon
        iconName="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        styles="grow max-w-[320px]"
      />

      {isMobile ? (
        <SortIcon />
      ) : (
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
      )}
    </div>
  )
}
