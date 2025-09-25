import cn from 'classnames'
import type { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  text: string
  styles?: {
    containerStyles?: string
    textStyles?: string
  }
}

export const NoContentFound = ({ children, text, styles }: Props) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-6 items-center justify-center grow',
        styles?.containerStyles
      )}
    >
      <p className={cn('text-preset-4 text-grey-500', styles?.textStyles)}>
        {text}
      </p>

      {children}
    </div>
  )
}
