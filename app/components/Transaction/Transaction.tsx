import cn from 'classnames'

import { Avatar } from '~/components/Avatar'
import type { TransactionType } from '~/types/TransactionType'
import { formatAmountToString } from '~/utils/formatAmountToString'
import { formatDate } from '~/utils/formatDate'

type Props = {
  transaction: TransactionType
}

export const Transaction = ({ transaction }: Props) => {
  const formattedAmount = formatAmountToString(transaction.amount)
  const formattedDate = formatDate(transaction.date)

  return (
    <div className="flex items-center gap-3 md:grid md:grid-cols-[1fr_80px_88px_88px] lg:grid-cols-[1fr_120px_120px_200px] md:gap-8 md:px-0 lg:px-4">
      <div className="flex items-center gap-3 md:gap-4 flex-1 md:flex-initial">
        <Avatar src={transaction.avatar} alt={transaction.name} />

        <div className="flex flex-col md:block">
          <p className="text-preset-4-bold text-grey-900">{transaction.name}</p>
          <p className="text-preset-5 text-grey-500 md:hidden">
            {transaction.category}
          </p>
        </div>
      </div>

      <div className="hidden md:block">
        <p className="text-preset-5 text-grey-500">{transaction.category}</p>
      </div>

      <div className="hidden md:block">
        <p className="text-preset-5 text-grey-500">{formattedDate}</p>
      </div>

      <div className="flex flex-col items-end gap-1 md:block">
        <p
          className={cn(
            'text-preset-4-bold text-right',
            formattedAmount.colorStyle
          )}
        >
          {formattedAmount.amount}
        </p>

        <p className="text-preset-5 text-grey-500 md:hidden">{formattedDate}</p>
      </div>
    </div>
  )
}
