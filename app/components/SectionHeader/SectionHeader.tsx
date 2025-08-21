import cn from 'classnames'

import { Burger } from '~/components/Burger'
import { THEME_TO_TW_TEXT } from '~/constants/theme'
import type { BudgetType } from '~/types/BudgetType'
import { iconComponents } from '~/types/IconType'
import type { PotType } from '~/types/PotType'

interface SectionHeaderProps {
  item: BudgetType | PotType
}

export const SectionHeader = ({ item }: SectionHeaderProps) => {
  const { theme } = item
  const sectionName = 'name' in item ? item.name : item.category
  const IconEllipse = iconComponents['ellipse']

  const sectionColor = THEME_TO_TW_TEXT[theme]

  return (
    <div className={cn(sectionColor, 'flex gap-4 items-center')}>
      <IconEllipse className="h-4 w-4" />

      <div className="text-grey-300 flex grow items-center">
        <h2 className="text-preset-2 text-grey-900 grow">{sectionName}</h2>

        <Burger item={item} />
      </div>
    </div>
  )
}
