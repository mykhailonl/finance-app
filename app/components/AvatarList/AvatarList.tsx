import { CategoryIcon } from '~/components/CategoryIcon'
import type { TransactionCategory } from '~/types'
import type { IconOptions } from '~/types/DropdownType'

type Props = {
  label: string
  options: IconOptions<TransactionCategory>
}

export const AvatarList = ({ label, options }: Props) => {
  return (
    <div className="flex flex-col gap-5">
      <label className="text-preset-4 text-grey-500">{label}</label>

      <div className="flex flex-wrap gap-3">
        {options.map((opt) => (
          <CategoryIcon category={opt.name} key={opt.name} />
        ))}
      </div>
    </div>
  )
}
