import cn from 'classnames'
import { type ReactNode } from 'react'

type Props = {
  children: ReactNode
  styles?: string
  smallPadding?: boolean
  largerGap?: boolean
}

export const SectionWrapper = ({
  children,
  styles,
  smallPadding,
  largerGap,
}: Props) => {
  return (
    <div
      className={cn(
        'flex flex-col self-stretch rounded-xl bg-white',
        smallPadding ? 'p-5' : 'px-5 py-6 md:p-8',
        largerGap ? 'gap-6' : 'gap-5',
        styles
      )}
    >
      {children}
    </div>
  )
}
