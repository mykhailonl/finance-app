import cn from 'classnames'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  styles?: string
}

export const AuthPageWrapper = ({ children, styles }: Props) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center grow',
        'px-4 md:px-10 pb-6 md:pb-8 pt-24 md:pt-26 lg:pt-8',
        'h-screen',
        styles
      )}
    >
      {children}
    </div>
  )
}
