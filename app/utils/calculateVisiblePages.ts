export const calculateVisiblePages = (
  currentPage: number,
  totalPages: number,
  maxVisible: number
): (number | '...')[] => {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i)

  if (maxVisible === 4) {
    if (currentPage <= 2) {
      return [1, 2, '...', totalPages]
    }
    if (currentPage >= totalPages - 1) {
      return [1, '...', totalPages - 1, totalPages]
    }
    return [1, '...', currentPage, totalPages]
  }

  if (maxVisible === 7) {
    if (currentPage <= 3) {
      return [1, 2, 3, 4, '...', totalPages]
    }
    if (currentPage >= totalPages - 2) {
      return [1, '...', ...range(totalPages - 3, totalPages)]
    }
    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ]
  }

  if (maxVisible === 9) {
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, 6, '...', totalPages]
    }
    if (currentPage >= totalPages - 3) {
      return [1, '...', ...range(totalPages - 5, totalPages)]
    }
    return [
      1,
      '...',
      ...range(currentPage - 2, currentPage + 2),
      '...',
      totalPages,
    ]
  }

  return [1, '...', currentPage, '...', totalPages]
}
