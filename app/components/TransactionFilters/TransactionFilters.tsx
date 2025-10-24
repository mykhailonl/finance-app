import { Dropdown } from '~/components/Dropdown'
import { Input } from '~/components/Input'
import { ResetButton } from '~/components/ResetButton'
import { useDevice } from '~/hooks/useDevice'
import { useSearchParamValue } from '~/hooks/useSearchParamValue'
import { FILTER_OPTIONS, SORT_OPTIONS } from '~/types/DropdownType'

export const TransactionFilters = () => {
  const { isDesktop } = useDevice()

  //#region values
  const [sortBy, setSortBy] = useSearchParamValue('sortBy')
  const [filterBy, setFilterBy] = useSearchParamValue('filterBy')
  const [query, setQuery] = useSearchParamValue('query')

  const inputPlaceholder = isDesktop ? 'Search transaction' : 'Search'
  //#endregion

  return (
    <div className="flex gap-5 items-center justify-between">
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
        styles="min-w-[121px] max-w-[320px] grow"
      />

      <div className="flex gap-2 md:gap-3">
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
          usedOptionFirst
        />

        <Dropdown
          label={{ showLabel: true, labelText: 'Category', bold: false }}
          value={filterBy}
          onChange={setFilterBy}
          options={FILTER_OPTIONS}
          showCaret
          styles="gap-2"
          mobileView
          usedOptionFirst
        />

        <ResetButton />
      </div>
    </div>
  )
}
