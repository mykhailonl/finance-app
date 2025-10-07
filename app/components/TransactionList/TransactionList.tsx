import cn from 'classnames'
import { Fragment } from 'react'

import { Button } from '~/components/Button'
import { Divider } from '~/components/Divider'
import { NoContentFound } from '~/components/NoContentFound'
import { Transaction } from '~/components/Transaction'
import { useModal } from '~/hooks/useModal'
import type { TransactionListType } from '~/types/TransactionTypes'

export const TransactionList = ({
  transactions,
  total,
  totalFiltered,
}: {
  transactions: TransactionListType
  total: number
  totalFiltered: number
}) => {
  const { openModal } = useModal()

  return (
    <div className="flex flex-col gap-4 h-full">
      {!total ? (
        <NoContentFound text="You haven&#39;t added any transactions.">
          <Button
            variant="primary"
            onClick={() =>
              openModal({
                type: 'transaction-add',
                options: { recurring: false },
              })
            }
            styles="max-w-[150px] p-4"
          >
            Add Transaction
          </Button>
        </NoContentFound>
      ) : (
        <>
          {!totalFiltered ? (
            <NoContentFound text="No transactions found." />
          ) : (
            <>
              <div
                className={cn(
                  'hidden md:grid grid-cols-[1fr_80px_88px_88px] lg:grid-cols-[1fr_120px_120px_200px] items-center',
                  'gap-8 px-0 py-3 lg:px-4 ',
                  'text-grey-500 text-preset-5',
                  'border-b border-grey-100'
                )}
              >
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
        </>
      )}
    </div>
  )
}
