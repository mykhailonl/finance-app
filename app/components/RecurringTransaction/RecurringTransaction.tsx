import cn from 'classnames'

import { TransactionAvatar } from '~/components/TransactionAvatar'
import type { Transaction } from '~/types'
import { iconComponents } from '~/types/IconType'
import type { TransactionStatus } from '~/types/TransactionTypes'
import { extractTransactionDay } from '~/utils/extractTransactionDay'
import { formatAmount } from '~/utils/formatAmount'
import { getDaySuffix } from '~/utils/getDaySuffix'

export const RecurringTransaction = ({
  transaction,
  status,
}: {
  transaction: Transaction
  status: TransactionStatus
}) => {
  const Icon = status !== 'upcoming' && iconComponents[status]
  const formattedAmount = formatAmount(transaction.amount, true)
  const transactionDay = extractTransactionDay(transaction)
  const suffix = getDaySuffix(transactionDay)

  return (
    <div className="flex flex-col gap-2 md:grid grid-cols-[1fr_120px_100px] md:items-center md:gap-8 lg:px-4">
      <div className="flex gap-4 items-center">
        <TransactionAvatar transaction={transaction} styles="inline-flex" />

        <h4 className="text-preset-4-bold text-grey-900">{transaction.name}</h4>
      </div>

      <div className="flex justify-between items-center md:hidden">
        <div className="flex gap-2 items-center">
          <p className="text-preset-5 text-green">
            Monthly - {transactionDay}
            {suffix}
          </p>

          {Icon && <Icon />}
        </div>

        <p
          className={cn(
            'text-preset-4-bold text-end',
            status === 'due' ? 'text-red' : 'text-grey-900'
          )}
        >
          {formattedAmount}
        </p>
      </div>

      <div className="hidden md:flex gap-2 items-center">
        <p className="text-preset-5 text-green">
          Monthly - {transactionDay}
          {suffix}
        </p>

        {Icon && <Icon />}
      </div>

      <p
        className={cn(
          'hidden md:block text-preset-4-bold text-end',
          status === 'due' ? 'text-red' : 'text-grey-900'
        )}
      >
        {formattedAmount}
      </p>
    </div>
  )
}
