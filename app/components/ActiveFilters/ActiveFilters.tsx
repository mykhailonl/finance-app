import { FilterTag } from '~/components/FilterTag'
import { useActiveFilters } from '~/hooks/useActiveFilters'
import { useSearchParamValue } from '~/hooks/useSearchParamValue'

export const ActiveFilters = () => {
  const { sortBy, filterBy, query } = useActiveFilters()

  const [, setSortBy] = useSearchParamValue('sortBy')
  const [, setFilterBy] = useSearchParamValue('filterBy')
  const [, setQuery] = useSearchParamValue('query')

  return (
    <div className="flex flex-wrap items-center gap-2 lg:px-4">
      <span className="text-gray-500 text-preset-4">Active filters:</span>

      {sortBy && (
        <FilterTag
          label="Sort"
          value={sortBy}
          onClick={() => {
            setSortBy('latest')
          }}
        />
      )}

      {filterBy && (
        <FilterTag
          label="Category"
          value={filterBy}
          onClick={() => {
            setFilterBy('all')
          }}
        />
      )}

      {query && (
        <FilterTag
          label="Query"
          value={query}
          onClick={() => {
            setQuery('')
          }}
        />
      )}
    </div>
  )
}
