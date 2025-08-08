import cn from 'classnames'

import { Avatar } from '~/components/Avatar'
import type { TransactionType } from '~/types/TransactionType'
import { formatAmountToString } from '~/utils/formatAmountToString'
import { formatDate } from '~/utils/formatDate'

type Props = {
  transaction: TransactionType
  hideAvatarOnMobile?: boolean
  small?: boolean
}

export const WidgetTransaction = ({
  transaction,
  hideAvatarOnMobile = false,
  small = false,
}: Props) => {
  const formattedAmount = formatAmountToString(transaction.amount)
  const formattedDate = formatDate(transaction.date)

  return (
    <div className="flex items-center">
      <div className="flex self-stretch gap-4 items-center grow">
        <Avatar
          src={transaction.avatar}
          alt={transaction.name}
          styles={hideAvatarOnMobile ? 'hidden md:flex' : ''}
        />

        <p
          className={cn(
            'text-grey-900',
            small ? 'text-preset-5-bold' : 'text-preset-4-bold'
          )}
        >
          {transaction.name}
        </p>
      </div>

      <div className={cn('flex flex-col items-end', small ? 'gap-1' : 'gap-2')}>
        <p
          className={cn(
            small ? 'text-preset-5-bold' : 'text-preset-4-bold',
            formattedAmount.colorStyle
          )}
        >
          {formattedAmount.amount}
        </p>

        <p className="text-preset-5 text-grey-500">{formattedDate}</p>
      </div>
    </div>
  )
}
