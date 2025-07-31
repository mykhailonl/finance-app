import cn from 'classnames'
import React from 'react'

type Props = {
  children: React.ReactNode,
  styles?: string,
}

export const SectionWrapper = ({ children, styles }: Props) => {
  return (
    <div className={cn(
      'flex flex-col gap-5  self-stretch rounded-xl bg-white px-5 py-6 md:p-8',
      styles,
    )}>
      {children}
    </div>
  )
}
