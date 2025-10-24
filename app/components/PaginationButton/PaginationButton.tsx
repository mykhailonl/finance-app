import cn from 'classnames'

import type { PaginationButtonProps } from '~/types/ButtonTypes'
import { iconComponents } from '~/types/IconType'

export const PaginationButton = ({
  role,
  disabled,
  showText = false,
  onClick,
}: PaginationButtonProps) => {
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
      {isNextButton && showText && (
        <p className="hidden text-preset-4 md:flex ">Next</p>
      )}

      <div
        className={cn(
          'text-grey-500',
          !disabled && 'group-hover:text-white',
          isNextButton ? '-rotate-90' : 'rotate-90'
        )}
      >
        <Icon className="w-4 h-4" />
      </div>

      {!isNextButton && showText && (
        <p className="hidden text-preset-4 md:flex">Prev</p>
      )}
    </button>
  )
}
