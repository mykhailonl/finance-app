import React from 'react'

import { Divider } from '~/components/Divider'
import { Transaction } from '~/components/Transaction'
import { useDevice } from '~/hooks/useDevice'
import type { TransactionType } from '~/types/TransactionType'

type Props = {
  transactions: TransactionType[]
}

export const TransactionList = ({ transactions }: Props) => {
  const { isMobile } = useDevice()

  return (
    <div className="flex flex-col gap-4">
      {!isMobile && (
        <div className="grid grid-cols-[1fr_80px_88px_88px] lg:grid-cols-[1fr_120px_120px_200px] gap-8 text-grey-500 text-preset-5 py-3 border-b border-grey-100 items-center px-0 lg:px-4">
          <p>Recipient / Sender</p>

          <p>Category</p>

          <p>Transaction Date</p>

          <p className="text-end">Amount</p>
        </div>
      )}

      {transactions.map((el, index) => (
        <React.Fragment key={el.date}>
          <Transaction transaction={el} />

          {index < transactions.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </div>
  )
}
