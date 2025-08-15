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
        'flex rounded-lg border w-10 h-10 items-center justify-center cursor-custom',
        isActive
          ? 'bg-grey-900 border-grey-900 text-white'
          : 'bg-white border-beige-500 hover:bg-beige-500 text-grey-900 hover:text-white'
      )}
      onClick={() => setPage(page)}
    >
      <p className="text-preset-4">{page}</p>
    </button>
  )
}
