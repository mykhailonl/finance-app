import { Divider } from '@mui/material'
import { Fragment } from 'react'

import { NoContentFound } from '~/components/NoContentFound'
import { SectionTitleBlock } from '~/components/SectionTitleBlock'
import { SectionWrapper } from '~/components/SectionWrapper'
import { WidgetTransaction } from '~/components/WidgetTransaction'
import { useTransactions } from '~/hooks/useTransactions'
import { sortTransactions } from '~/utils/sortTransactions'

export const WidgetTransactions = ({
  showCategory = false,
}: {
  showCategory?: boolean
}) => {
  const { data: transactions } = useTransactions()
  const sorted = sortTransactions(transactions, 'latest')
  const slicedTransactions = sorted.slice(0, 5)

  const noTransactionsYet = !transactions.length

  return (
    <SectionWrapper styles="gap-8">
      <SectionTitleBlock
        title="Transactions"
        linkText="View All"
        link="/transactions"
      />

      {noTransactionsYet ? (
        <NoContentFound text="You haven&#39;t added any transactions." />
      ) : (
        <div className="flex flex-col gap-5">
          {slicedTransactions.map((el, index) => {
            return (
              <Fragment key={el.id}>
                <WidgetTransaction
                  transaction={el}
                  showCategory={showCategory}
                />

                {index < slicedTransactions.length - 1 && <Divider />}
              </Fragment>
            )
          })}
        </div>
      )}
    </SectionWrapper>
  )
}
