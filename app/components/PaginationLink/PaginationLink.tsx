import cn from 'classnames'
import { NavLink, useLocation } from 'react-router'

import { getSearchWith } from '~/utils/getSearchWith'

type Props = {
  page: number
  isActive: boolean
}

export const PaginationLink = ({ page, isActive }: Props) => {
  const { search } = useLocation()
  const updatedSearch = getSearchWith({ page: `${page}` }, search)
  return (
    <NavLink
      className={cn(
        'flex rounded-lg border  w-10 h-10 items-center justify-center',
        isActive ? 'bg-grey-900 border-grey-900' : 'bg-white border-beige-500'
      )}
      to={`/transactions?${updatedSearch}`}
    >
      <p
        className={cn(
          'text-preset-4',
          isActive ? 'text-white' : 'text-grey-900'
        )}
      >
        {page}
      </p>
    </NavLink>
  )
}
