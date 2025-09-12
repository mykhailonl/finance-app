import cn from 'classnames'
import { type ReactNode } from 'react'

type Props = {
  children: ReactNode
  styles?: string
}

export const PageWrapper = ({ children, styles }: Props) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-8 px-4 pt-6 pb-19 grow h-screen overflow-y-auto md:px-10 md:pt-8 md:pb-27 lg:py-8',
        styles
      )}
    >
      {children}
    </div>
  )
}
