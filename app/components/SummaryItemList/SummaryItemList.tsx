import React from 'react'

import { Divider } from '~/components/Divider'
import { SummaryItem } from '~/components/SummaryItem'
import type { SummaryItemType } from '~/types/SummaryType'

export const SummaryItemList = ({ list }: { list: SummaryItemType[] }) => {
  return (
    <div className="flex flex-col gap-4">
      {list.map((summary: SummaryItemType, index: number) => (
        <React.Fragment key={summary.label}>
          <SummaryItem
            label={summary.label}
            value={summary.value}
            amountOfTransactions={summary.amountOfTransactions}
          />

          {index < list.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </div>
  )
}
