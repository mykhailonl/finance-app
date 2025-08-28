import React from 'react'

import { Divider } from '~/components/Divider'
import { SectionTitleBlock } from '~/components/SectionTitleBlock'
import { SectionWrapper } from '~/components/SectionWrapper'
import { WidgetTransaction } from '~/components/WidgetTransaction'
import { useTransactions } from '~/hooks/useTransactions'

// todo rewrite link navigation in section block, back click needs to be pressed twice after redirection, why
export const WidgetTransactions = () => {
  const { data } = useTransactions()
  const slicedTransactions = data.slice(0, 5)

  return (
    <SectionWrapper styles="gap-8">
      <SectionTitleBlock
        title="Transactions"
        linkText="View All"
        link="/transactions"
      />

      <div className="flex flex-col gap-5">
        {slicedTransactions.map((el, index) => {
          const showDivider = index < slicedTransactions.length - 1

          return (
            <React.Fragment key={el.id}>
              <WidgetTransaction transaction={el} />

              {showDivider && <Divider />}
            </React.Fragment>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
