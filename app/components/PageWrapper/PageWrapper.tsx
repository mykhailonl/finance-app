import cn from 'classnames'
import React from 'react'

type Props = {
  children: React.ReactNode
  styles?: string
}

export const PageWrapper = ({ children, styles }: Props) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-8 px-4 py-6 grow h-screen overflow-y-auto md:px-10 md:py-8',
        styles
      )}
    >
      {children}
    </div>
  )
}
