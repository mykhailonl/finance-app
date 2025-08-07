import { useMemo } from 'react'

import { useDevice } from '~/hooks/useDevice'
import { calculateVisiblePages } from '~/utils/calculateVisiblePages'

export const useVisiblePages = (currentPage: number, totalPages: number) => {
  const { isMobile, isTablet } = useDevice()

  const maxVisible = isMobile ? 4 : isTablet ? 7 : 9

  return useMemo(
    () => calculateVisiblePages(currentPage, totalPages, maxVisible),
    [currentPage, totalPages, maxVisible]
  )
}
