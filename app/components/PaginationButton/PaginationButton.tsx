import cn from 'classnames'

import { useDevice } from '~/hooks/useDevice'
import { iconComponents } from '~/types/IconType'

type Props = {
  role: 'prev' | 'next'
  disabled: boolean
  onClick: () => void
}
export const PaginationButton = ({ role, disabled, onClick }: Props) => {
  const { isMobile } = useDevice()
  const Icon = iconComponents['caretDown']

  const isNextButton = role === 'next'

  return (
    <button
      className="flex gap-4 py-3 px-4 rounded-lg border border-beige-500"
      disabled={disabled}
      onClick={onClick}
    >
      {!isMobile && isNextButton && (
        <p className="text-preset-4 text-grey-900 flex">Next</p>
      )}

      <div
        className={cn(
          'text-grey-500',
          isNextButton ? '-rotate-90' : 'rotate-90'
        )}
      >
        <Icon className="w-4 h-4" />
      </div>

      {!isMobile && !isNextButton && (
        <p className="text-preset-4 text-grey-900 flex">Prev</p>
      )}
    </button>
  )
}
