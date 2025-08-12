import cn from 'classnames'

import { iconComponents, type SummaryCardIcon } from '~/types/IconType'
import { formatAmount } from '~/utils/formatAmount'

type Props = {
  iconName?: SummaryCardIcon
  mainCard?: boolean
  cardTitle: string
  cardValue: number
  styles?: string
}

export const SummaryCard = ({
  iconName,
  mainCard,
  cardTitle,
  cardValue,
  styles,
}: Props) => {
  const Icon = iconName ? iconComponents[iconName] : null
  const formattedAmount = formatAmount(cardValue)

  //region conditional styles
  const hasIcon = Boolean(iconName)
  const isMainCard = Boolean(mainCard)
  const isSecondaryWithIcon = hasIcon && !isMainCard
  const hasWhiteText = isMainCard
  const needsVerticalMargin = isSecondaryWithIcon

  const backgroundStyle = isMainCard
    ? 'bg-grey-900'
    : hasIcon
      ? 'bg-beige-100'
      : 'bg-white'

  const mobilePadding = hasIcon ? (isMainCard ? 'py-6 px-5' : 'p-4') : 'p-5'

  const tabletPadding = hasIcon ? (isMainCard ? 'md:p-6' : 'md:p-4') : 'md:p-6'
  //#endregion

  return (
    <div
      className={cn(
        'rounded-xl flex gap-5 items-center grow',
        backgroundStyle,
        mobilePadding,
        tabletPadding,
        styles
      )}
    >
      {Icon && (
        <div className={cn(hasWhiteText ? 'text-white' : 'text-grey-900')}>
          <Icon className="w-10 h-10" />
        </div>
      )}

      <div className={cn('flex flex-col gap-3', needsVerticalMargin && 'my-1')}>
        <p
          className={cn(
            'text-preset-4',
            hasWhiteText ? 'text-white' : 'text-grey-500'
          )}
        >
          {cardTitle}
        </p>

        <h1
          className={cn(
            'text-preset-1',
            hasWhiteText ? 'text-white' : 'text-grey-900'
          )}
        >
          {formattedAmount}
        </h1>
      </div>
    </div>
  )
}
