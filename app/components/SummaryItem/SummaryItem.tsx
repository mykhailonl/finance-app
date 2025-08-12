import cn from 'classnames'

import type { SummaryItemType } from '~/types/SummaryType'

export const SummaryItem = ({
  label,
  value,
  amountOfTransactions,
}: SummaryItemType) => {
  const dueSoon = label === 'Due soon'

  return (
    <div className="flex justify-between items-center">
      <p
        className={cn('text-preset-5', dueSoon ? 'text-red' : 'text-grey-500')}
      >
        {label}
      </p>

      <p
        className={cn(
          'text-preset-5-bold',
          dueSoon ? 'text-red' : 'text-grey-900'
        )}
      >
        {amountOfTransactions} ({value})
      </p>
    </div>
  )
}
