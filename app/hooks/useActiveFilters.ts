import { useSearchParams } from 'react-router'

import { useSearchParamValue } from '~/hooks/useSearchParamValue'

export const useActiveFilters = () => {
  const [searchParams] = useSearchParams()
  const [sortBy] = useSearchParamValue('sortBy')
  const [filterBy] = useSearchParamValue('filterBy')
  const [query] = useSearchParamValue('query')

  const hasActiveFilters =
    searchParams.has('sortBy') ||
    searchParams.has('filterBy') ||
    searchParams.has('query')

  return {
    sortBy: searchParams.has('sortBy') ? sortBy : null,
    filterBy: searchParams.has('filterBy') ? filterBy : null,
    query: searchParams.has('query') ? query : null,
    hasActiveFilters,
  }
}
