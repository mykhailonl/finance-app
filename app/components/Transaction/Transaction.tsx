import cn from 'classnames'

import { Avatar } from "~/components/Avatar"
import type { TransactionType } from "~/types/TransactionType"
import { formatAmountToString } from "~/utils/formatAmountToString"
import { formatDate } from "~/utils/formatDate"

type Props = {
  transaction: TransactionType,
}

export const Transaction = ({ transaction }: Props) => {
  const formattedAmount = formatAmountToString(transaction.amount)
  const formattedDate = formatDate(transaction.date)

  return (
    <div className='flex items-center'>
      <div className='flex self-stretch gap-4 items-center grow'>
        <Avatar src={transaction.avatar} alt={transaction.name} />

        <p className='text-preset-4-bold text-grey-900'>{transaction.name}</p>
      </div>

      <div className='flex flex-col gap-2 items-end'>
        <p className={cn('text-preset-4-bold', formattedAmount.colorStyle)}>{formattedAmount.amount}</p>

        <p className='text-preset-5 text-grey-500'>{formattedDate}</p>
      </div>
    </div>
  )
}