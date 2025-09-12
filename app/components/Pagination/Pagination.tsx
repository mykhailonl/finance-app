import cn from 'classnames'

import { PaginationButton } from '~/components/PaginationButton'
import { PaginationDots } from '~/components/PaginationDots'
import { PaginationLink } from '~/components/PaginationLink'
import { useSearchParamValue } from '~/hooks/useSearchParamValue'
import { useVisiblePages } from '~/hooks/useVisiblePages'

type Props = {
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export const Pagination = ({ totalPages, hasNext, hasPrev }: Props) => {
  const [page, setPage] = useSearchParamValue('page')
  const visiblePages = useVisiblePages(page, totalPages)

  const showPagination = totalPages > 1

  return (
    <div
      className={cn(
        'justify-between items-center pt-6',
        showPagination ? 'flex' : 'hidden'
      )}
    >
      <PaginationButton
        role="prev"
        disabled={!hasPrev}
        onClick={() => setPage(page - 1)}
      />

      <div className="flex gap-2">
        {visiblePages.map((currPage, index) =>
          currPage === '...' ? (
            <PaginationDots key={`dots-${index}`} />
          ) : (
            <PaginationLink
              key={currPage}
              page={currPage}
              isActive={currPage === page}
            />
          )
        )}
      </div>

      <PaginationButton
        role="next"
        disabled={!hasNext}
        onClick={() => setPage(page + 1)}
      />
    </div>
  )
}
