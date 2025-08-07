import React from 'react'

import { Divider } from '~/components/Divider'
import { SectionTitleBlock } from '~/components/SectionTitleBlock'
import { SectionWrapper } from '~/components/SectionWrapper'
import { WidgetTransaction } from '~/components/WidgetTransaction'
import type { TransactionType } from '~/types/TransactionType'

type Props = {
  transactions: TransactionType[]
}

// todo rewrite link navigation in section block, back click needs to be pressed twice after redirection, why
export const WidgetTransactions = ({ transactions }: Props) => {
  //todo fix this slicing, its doubled, do i even need it rn
  const transactionsToDisplay = transactions.slice(0, 5)

  return (
    <SectionWrapper styles="gap-8">
      <SectionTitleBlock
        title="Transactions"
        linkText="View All"
        link="/transactions"
      />

      <div className="flex flex-col gap-5">
        {transactionsToDisplay.map((el, index) => {
          const showDivider = index < transactionsToDisplay.length - 1

          return (
            <React.Fragment key={el.date}>
              <WidgetTransaction transaction={el} />

              {showDivider && <Divider />}
            </React.Fragment>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
