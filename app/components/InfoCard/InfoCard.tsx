import cn from 'classnames'

import { Divider } from '~/components/Divider'
import { THEME_TO_TW_CLASS, type ThemeColor } from '~/constants/theme'
import { formatAmount } from '~/utils/formatAmount'

type InfoCardProps = {
  name: string
  amount: number
  color?: ThemeColor
}

//todo rewrite props to use BudgetType?

export const InfoCard = ({ name, amount, color }: InfoCardProps) => {
  const formattedAmount = formatAmount(amount)

  const colorStyle = THEME_TO_TW_CLASS[color as ThemeColor] || 'bg-beige-100'
  return (
    <div className="flex gap-2 shrink-0 basis-[calc(50%-0.5rem)] md:basis-auto grow">
      <Divider basic={false} styles={cn(colorStyle)} />

      <div className="flex flex-col gap-050 text-nowrap shrink-0">
        <p className="text-preset-5 text-grey-500">{name}</p>

        <p className="text-preset-4-bold text-grey-900">{formattedAmount}</p>
      </div>
    </div>
  )
}
