import { Fragment } from 'react'

import { Button } from '~/components/Button'
import { Divider } from '~/components/Divider'
import { Transaction } from '~/components/Transaction'
import { useModal } from '~/hooks/useModal'
import type { TransactionListType } from '~/types/TransactionTypes'

export const TransactionList = ({
  transactions,
}: {
  transactions: TransactionListType
}) => {
  const { openModal } = useModal()
  const noTransactionsYet = !transactions.length

  return (
    <div className="flex flex-col gap-4 justify-center h-full">
      {noTransactionsYet ? (
        <div className="flex flex-col gap-6 items-center">
          <p className="text-preset-4 text-grey-500 self-center">
            You haven&#39;t added any transactions.
          </p>

          <Button
            variant="primary"
            onClick={() => openModal({ type: 'transaction-add' })}
            styles="max-w-[150px] p-4"
          >
            Add Transaction
          </Button>
        </div>
      ) : (
        <>
          <div className="hidden md:grid grid-cols-[1fr_80px_88px_88px] lg:grid-cols-[1fr_120px_120px_200px] gap-8 text-grey-500 text-preset-5 py-3 border-b border-grey-100 items-center px-0 lg:px-4">
            <p>Recipient / Sender</p>

            <p>Category</p>

            <p>Transaction Date</p>

            <p className="text-end">Amount</p>
          </div>

          {transactions.map((el, index) => (
            <Fragment key={el.transaction_date}>
              <Transaction transaction={el} />

              {index < transactions.length - 1 && <Divider />}
            </Fragment>
          ))}
        </>
      )}
    </div>
  )
}
