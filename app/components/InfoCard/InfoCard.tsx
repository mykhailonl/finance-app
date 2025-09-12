import cn from 'classnames'

import { Divider } from '~/components/Divider'
import { THEME_TO_TW_CLASS } from '~/constants/theme'
import type { ThemeColor } from '~/types'
import { formatAmount } from '~/utils/formatAmount'

type InfoCardProps = {
  name: string
  amount: number
  color?: ThemeColor
  styles?: string
}

export const InfoCard = ({ name, amount, color, styles }: InfoCardProps) => {
  const formattedAmount = formatAmount(amount)

  const colorStyle = THEME_TO_TW_CLASS[color as ThemeColor] || 'bg-beige-100'

  return (
    <div
      className={cn(
        'flex gap-4 shrink-0 basis-[calc(50%-0.5rem)] md:basis-auto grow',
        styles
      )}
    >
      <Divider basic={false} styles={cn(colorStyle, 'shrink-0 h-content')} />

      <div className="flex flex-col gap-050 text-nowrap shrink-0">
        <p className="text-preset-5 text-grey-500">{name}</p>

        <p className="text-preset-4-bold text-grey-900">{formattedAmount}</p>
      </div>
    </div>
  )
}
