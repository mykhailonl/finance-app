import cn from 'classnames'

import { iconComponents } from '~/types/IconType'

type Props = {
  role: 'prev' | 'next'
  disabled: boolean
  onClick: () => void
}
export const PaginationButton = ({ role, disabled, onClick }: Props) => {
  const Icon = iconComponents['caretDown']

  const isNextButton = role === 'next'

  return (
    <button
      className={cn(
        'flex gap-4 py-3 px-4 rounded-lg border border-beige-500 text-grey-900 group',
        !disabled && 'cursor-custom hover:bg-beige-500 hover:text-white'
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {isNextButton && <p className="hidden text-preset-4 md:flex ">Next</p>}

      <div
        className={cn(
          'text-grey-500',
          !disabled && 'group-hover:text-white',
          isNextButton ? '-rotate-90' : 'rotate-90'
        )}
      >
        <Icon className="w-4 h-4" />
      </div>

      {!isNextButton && <p className="hidden text-preset-4 md:flex">Prev</p>}
    </button>
  )
}
