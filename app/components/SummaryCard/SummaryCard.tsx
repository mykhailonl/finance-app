import cn from 'classnames'

import { formatAmount } from '~/utils/formatAmount'

type SummaryCardProps = {
  mainCard?: boolean
  cardTitle: string
  cardValue: number
}

export const SummaryCard = ({
  cardTitle,
  cardValue,
  mainCard,
}: SummaryCardProps) => {
  const formattedAmount = formatAmount(cardValue)

  return (
    <div
      className={cn(
        'flex flex-col gap-3 p-5 items-start rounded-xl grow md:p-6',
        mainCard ? 'bg-grey-900' : 'bg-white'
      )}
    >
      <p
        className={cn(
          'text-preset-4',
          mainCard ? 'text-white' : 'text-grey-500'
        )}
      >
        {cardTitle}
      </p>

      <p
        className={cn(
          'text-preset-1',
          mainCard ? 'text-white' : 'text-grey-900'
        )}
      >
        {formattedAmount}
      </p>
    </div>
  )
}
