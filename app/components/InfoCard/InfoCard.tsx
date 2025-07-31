import cn from 'classnames'

import { THEME_TO_TW_CLASS, type ThemeColor } from "~/constants/theme"

type InfoCardProps = {
  name: string,
  amount: number,
  color: ThemeColor,
}

export const InfoCard = (info: InfoCardProps) => {
  const { name, amount, color } = info

  const colorStyle = THEME_TO_TW_CLASS[color]
  return (
    <div className='flex gap-2 shrink-0 basis-[calc(50%-0.5rem)] md:basis-auto'>
      <div className={cn(colorStyle, 'w-1 rounded-lg flex shrink-0')}/>

      <div className='flex flex-col gap-050 text-nowrap shrink-0'>
        <p className='text-preset-5 text-grey-500'>{name}</p>

        <p className='text-preset-4-bold text-grey-900'>${amount}</p>
      </div>
    </div>
  )
}