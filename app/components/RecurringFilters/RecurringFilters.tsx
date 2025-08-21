import { Dropdown } from '~/components/Dropdown'
import { Input } from '~/components/Input'
import { useSearchParamValue } from '~/hooks/useSearchParamValue'
import { SORT_OPTIONS } from '~/types/DropdownType'

export const RecurringFilters = () => {
  const [query, setQuery] = useSearchParamValue('query')
  const [sortBy, setSortBy] = useSearchParamValue('sortBy')

  return (
    <div className="flex gap-6 items-center justify-between">
      <Input
        label={{ showLabel: false }}
        input={{
          value: query,
          onChange: setQuery,
          placeholder: 'Search bills',
        }}
        helperText={{ showHelper: false }}
        showSearchIcon
        styles="grow max-w-[320px]"
      />

      <Dropdown
        label={{
          showLabel: true,
          labelText: 'Sort By',
          bold: false,
        }}
        value={sortBy}
        onChange={setSortBy}
        options={SORT_OPTIONS}
        showCaret
        styles="gap-2"
        mobileView
      />
    </div>
  )
}
