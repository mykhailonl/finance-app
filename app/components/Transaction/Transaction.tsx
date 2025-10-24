import cn from 'classnames'

import { TransactionAvatar } from '~/components/TransactionAvatar'
import { useModal } from '~/hooks/useModal'
import type { Transaction as TransactionType } from '~/types'
import { formatAmountToString } from '~/utils/formatAmountToString'
import { formatDate } from '~/utils/formatDate'

export const Transaction = ({
  transaction,
}: {
  transaction: TransactionType
}) => {
  const { openModal } = useModal()

  const handleTransactionClick = () => {
    if (transaction.transaction_type === 'transfer') {
      openModal({ type: 'transaction-restriction' })
    } else {
      openModal({ type: 'transaction-edit', transaction })
    }
  }

  const formattedAmount = formatAmountToString({ amount: transaction.amount })
  const formattedDate = formatDate(transaction.transaction_date)

  return (
    <div
      className="flex items-center gap-3 md:grid md:grid-cols-[1fr_80px_88px_88px] lg:grid-cols-[1fr_120px_120px_200px] md:gap-8 md:px-0 lg:px-4"
      onClick={handleTransactionClick}
    >
      <div className="flex items-center gap-3 md:gap-4 flex-1 md:flex-initial">
        <TransactionAvatar transaction={transaction} styles="inline-flex" />

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
        <p className="text-preset-5 text-grey-500 text-nowrap">
          {formattedDate}
        </p>
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
