import { XIcon } from '@phosphor-icons/react'
import { useSearchParams } from 'react-router'

import { useActiveFilters } from '~/hooks/useActiveFilters'

export const ResetButton = () => {
  const { hasActiveFilters } = useActiveFilters()
  const [, setSearchParams] = useSearchParams()

  return (
    hasActiveFilters && (
      <button
        className="flex items-center justify-center p-3 md:px-4 cursor-custom hover:bg-grey-100 rounded-lg"
        onClick={() => setSearchParams()}
      >
        <XIcon color="#696868" weight="bold" />
      </button>
    )
  )
}
