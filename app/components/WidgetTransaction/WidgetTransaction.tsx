import cn from 'classnames'

import { TransactionAvatar } from '~/components/TransactionAvatar'
import type { Transaction } from '~/types'
import { formatAmountToString } from '~/utils/formatAmountToString'
import { formatDate } from '~/utils/formatDate'

type Props = {
  transaction: Transaction
  hideAvatarOnMobile?: boolean
  small?: boolean
  showCategory?: boolean
}

export const WidgetTransaction = ({
  transaction,
  hideAvatarOnMobile = false,
  small = false,
  showCategory = false,
}: Props) => {
  const formattedAmount = formatAmountToString(transaction.amount)
  const formattedDate = formatDate(transaction.transaction_date)

  return (
    <div className="flex items-center gap-3">
      <div className="flex self-stretch gap-3 items-center grow">
        <TransactionAvatar
          transaction={transaction}
          styles={hideAvatarOnMobile ? 'hidden md:flex' : 'inline-flex'}
        />

        <div className="flex flex-col">
          <p
            className={cn(
              'text-grey-900 flex w-full',
              small ? 'text-preset-5-bold' : 'text-preset-4-bold'
            )}
          >
            {transaction.name}
          </p>

          {showCategory && (
            <p className="text-preset-5 text-grey-500">
              {transaction.category}
            </p>
          )}
        </div>
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

        <p className="text-preset-5 text-grey-500 text-nowrap">
          {formattedDate}
        </p>
      </div>
    </div>
  )
}
