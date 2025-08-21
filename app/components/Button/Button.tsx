import cn from 'classnames'
import React from 'react'

import { iconComponents } from '~/types/IconType'

type ButtonProps = {
  variant: 'primary' | 'secondary' | 'tertiary' | 'danger'
  disabled?: boolean
  children: React.ReactNode
  onClick: () => void
  styles?: string
  showCaret?: boolean
}

// todo hover for danger state?

export const Button = ({
  variant,
  disabled = false,
  children,
  onClick,
  styles,
  showCaret,
}: ButtonProps) => {
  const CaretDown = iconComponents['caretDown']
  const baseStyles = 'flex items-center cursor-custom border border-transparent'

  const variantStyles = {
    primary: 'rounded-lg bg-grey-900 hover:bg-grey-500 justify-center',
    secondary:
      'rounded-lg bg-beige-100 hover:bg-white hover:border hover:border-beige-500 justify-center',
    tertiary: 'gap-3',
    danger:
      'rounded-lg bg-red hover:bg-[linear-gradient(0deg,rgba(255,255,255,0.20)_0%,rgba(255,255,255,0.20)_100%),#C94736] justify-center',
  }

  const buttonTextStyles = {
    primary: 'text-white text-preset-4-bold',
    secondary: 'text-grey-900 text-preset-4-bold',
    tertiary: 'text-grey-500 text-preset-4 hover:text-grey-900',
    danger: 'text-white text-preset-4-bold',
  }

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], styles)}
      onClick={onClick}
      disabled={disabled}
    >
      <p
        className={cn(
          buttonTextStyles[variant],
          'items-center flex gap-3 justify-between'
        )}
      >
        {children}

        {showCaret && <CaretDown className="w-3 h-3 -rotate-90" />}
      </p>
    </button>
  )
}
