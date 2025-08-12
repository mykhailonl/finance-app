import cn from 'classnames'

import { useSearchParamValue } from '~/hooks/useSearchParamValue'

type Props = {
  page: number
  isActive: boolean
}

export const PaginationLink = ({ page, isActive }: Props) => {
  const [, setPage] = useSearchParamValue('page')

  return (
    <button
      className={cn(
        'flex rounded-lg border w-10 h-10 items-center justify-center',
        isActive ? 'bg-grey-900 border-grey-900' : 'bg-white border-beige-500'
      )}
      onClick={() => setPage(page)}
    >
      <p
        className={cn(
          'text-preset-4',
          isActive ? 'text-white' : 'text-grey-900'
        )}
      >
        {page}
      </p>
    </button>
  )
}
