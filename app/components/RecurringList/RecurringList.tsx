import { Fragment } from 'react'

import { Divider } from '~/components/Divider'
import { RecurringTransaction } from '~/components/RecurringTransaction'
import type { Transaction } from '~/types'
import { getTransactionStatus } from '~/utils/getTransactionStatus'

export const RecurringList = ({
  transactions,
  currentDay,
}: {
  transactions: Transaction[]
  currentDay: number
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="hidden md:grid grid-cols-[1fr_120px_100px] gap-8 items-center py-3 lg:px-4 text-preset-5 text-grey-500 border-b border-grey-100">
        <p>Bill Title</p>

        <p>Due date</p>

        <p className="text-end">Amount</p>
      </div>

      <div className="flex flex-col gap-5">
        {transactions.map((tr, index) => {
          const transactionStatus = getTransactionStatus(tr, currentDay)

          return (
            <Fragment key={tr.transaction_date}>
              <RecurringTransaction
                transaction={tr}
                status={transactionStatus}
              />

              {index < transactions.length - 1 && <Divider />}
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
