import { Fragment } from 'react'

import { Divider } from '~/components/Divider'
import { SectionTitleBlock } from '~/components/SectionTitleBlock'
import { SectionWrapper } from '~/components/SectionWrapper'
import { WidgetTransaction } from '~/components/WidgetTransaction'
import { useTransactions } from '~/hooks/useTransactions'

export const WidgetTransactions = () => {
  const { data: transactions } = useTransactions()
  const slicedTransactions = transactions.slice(0, 5)

  const noTransactionsYet = !transactions.length

  return (
    <SectionWrapper styles="gap-8">
      <SectionTitleBlock
        title="Transactions"
        linkText="View All"
        link="/transactions"
      />

      {noTransactionsYet ? (
        <div className="flex items-center justify-center">
          <p className="text-preset-4 text-grey-500">
            You haven&#39;t added any transactions.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {slicedTransactions.map((el, index) => {
            const showDivider = index < slicedTransactions.length - 1

            return (
              <Fragment key={el.id}>
                <WidgetTransaction transaction={el} />

                {showDivider && <Divider />}
              </Fragment>
            )
          })}
        </div>
      )}
    </SectionWrapper>
  )
}
