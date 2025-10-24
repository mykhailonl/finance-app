import cn from 'classnames'
import { Fragment } from 'react'

import { Divider } from '~/components/Divider'
import { NoContentFound } from '~/components/NoContentFound'
import { SectionTitleBlock } from '~/components/SectionTitleBlock'
import { WidgetTransaction } from '~/components/WidgetTransaction'
import type { TransactionListSectionProps } from '~/types/TransactionTypes'

export const TransactionListSection = ({
  transactions,
  title,
  link,
  linkText,
  emptyTextState,
  styles,
}: TransactionListSectionProps) => {
  const noTransactionsYet = !transactions.length

  return (
    <div
      className={cn(
        'flex flex-col p-4 bg-beige-100 rounded-xl gap-5 md:p-5 ',
        styles?.containerStyles
      )}
    >
      {noTransactionsYet ? (
        <NoContentFound
          text={emptyTextState}
          styles={{ containerStyles: 'py-4' }}
        />
      ) : (
        <>
          <SectionTitleBlock
            title={title}
            linkText={linkText}
            link={link}
            small
          />

          <div className={cn('flex flex-col gap-3', styles?.listStyles)}>
            {transactions.map((transaction, index) => (
              <Fragment key={transaction.transaction_date}>
                <WidgetTransaction
                  transaction={transaction}
                  hideAvatarOnMobile
                  small
                  styles={styles?.transactionStyles}
                />

                {index < transactions.length - 1 && (
                  <Divider styles="bg-grey-500 opacity-15" />
                )}
              </Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
