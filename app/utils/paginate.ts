export interface PaginationResult<T> {
  items: T[]
  totalPages: number
  totalCount: number
  currentPage: number
  hasNext: boolean
  hasPrev: boolean
}

export const paginate = <T>(
  items: T[],
  page: number,
  perPage: number = 10
): PaginationResult<T> => {
  const totalCount = items.length
  const totalPages = Math.ceil(totalCount / perPage)
  const currentPage = Math.max(1, Math.min(page, totalPages))

  const start = (currentPage - 1) * perPage
  const end = start + perPage

  return {
    items: items.slice(start, end),
    totalPages,
    totalCount,
    currentPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
  }
}
