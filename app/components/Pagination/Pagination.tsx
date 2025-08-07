import { useSearchParams } from 'react-router'

import { PaginationButton } from '~/components/PaginationButton'
import { PaginationDots } from '~/components/PaginationDots'
import { PaginationLink } from '~/components/PaginationLink'
import { useVisiblePages } from '~/hooks/useVisiblePages'

type Props = {
  totalPages: number
}

export const Pagination = ({ totalPages }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = searchParams.get('page') || 1
  const visiblePages = useVisiblePages(+currentPage, totalPages)

  const isFirstPage = +currentPage === 1
  const isLastPage = +currentPage === totalPages

  const handlePageChange = (page: number) => {
    setSearchParams({ page: `${page}` })
  }

  return (
    <div className="flex justify-between items-center pt-6">
      <PaginationButton
        role="prev"
        disabled={isFirstPage}
        onClick={() => handlePageChange(+currentPage - 1)}
      />

      <div className="flex gap-2">
        {visiblePages.map((page, index) =>
          page === '...' ? (
            <PaginationDots key={`dots-${index}`} />
          ) : (
            <PaginationLink
              key={page}
              page={page}
              isActive={page === +currentPage}
            />
          )
        )}
      </div>

      <PaginationButton
        role="next"
        disabled={isLastPage}
        onClick={() => handlePageChange(+currentPage + 1)}
      />
    </div>
  )
}
