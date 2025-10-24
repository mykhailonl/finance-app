import { XIcon } from '@phosphor-icons/react'
import cn from 'classnames'

type FilterTagProps = {
  label: 'Sort' | 'Category' | 'Query'
  value: string
  onClick: () => void
}

export const FilterTag = ({ label, value, onClick }: FilterTagProps) => {
  return (
    <div
      className={cn(
        'flex items-center',
        'px-2 py-1 gap-1',
        'bg-grey-100 text-gray-700 hover:text-gray-900',
        'rounded-full',
        'text-preset-5',
        'cursor-custom'
      )}
      onClick={onClick}
    >
      <p>{label}:</p>

      <p>{value}</p>

      <XIcon color="oklch(21% 0.034 264.665)" weight="bold" size={10} />
    </div>
  )
}
