import { Dropdown } from '~/components/Dropdown'
import { Input } from '~/components/Input'
import { useDevice } from '~/hooks/useDevice'
import { useSearchParamValue } from '~/hooks/useSearchParamValue'
import { FILTER_OPTIONS, SORT_OPTIONS } from '~/types/DropdownType'

export const TransactionFilters = () => {
  const { isTablet } = useDevice()

  //#region values
  const [sortBy, setSortBy] = useSearchParamValue('sortBy')
  const [filterBy, setFilterBy] = useSearchParamValue('filterBy')
  const [query, setQuery] = useSearchParamValue('query')

  const inputPlaceholder = isTablet ? 'Search' : 'Search transaction'
  //#endregion

  return (
    <div className="flex gap-6 items-center justify-between">
      <Input
        label={{ showLabel: false }}
        input={{
          value: query,
          onChange: setQuery,
          placeholder: inputPlaceholder,
        }}
        helperText={{
          showHelper: false,
        }}
        showSearchIcon
        styles="max-w-[320px] grow"
      />

      <div className="flex gap-6">
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

        <Dropdown
          label={{ showLabel: true, labelText: 'Category', bold: false }}
          value={filterBy}
          onChange={setFilterBy}
          options={FILTER_OPTIONS}
          showCaret
          styles="gap-2"
          mobileView
        />
      </div>
    </div>
  )
}
