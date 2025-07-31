import React from "react"

import { Divider } from "~/components/Divider"
import { SectionTitleBlock } from "~/components/SectionTitleBlock"
import { SectionWrapper } from '~/components/SectionWrapper'
import { Transaction } from "~/components/Transaction"
import type { TransactionType } from "~/types/TransactionType"

type TransactionsProps = {
  transactions: TransactionType[]
}

export const Transactions = ({ transactions }: TransactionsProps) => {
  const transactionsToDisplay = transactions.slice(0, 5)

  return (
    <SectionWrapper styles='gap-8'>
      <SectionTitleBlock title='Transactions' linkText='View All' />

      <div className='flex flex-col gap-5'>
        {transactionsToDisplay.map((el, index) => {
          const showDivider = index < transactionsToDisplay.length - 1

          return (
            <React.Fragment key={el.date}>
              <Transaction transaction={el} />

              {showDivider && <Divider/>}
            </React.Fragment>
          )
        })}
      </div>
    </SectionWrapper>
  )
}