import cn from 'classnames'
import { type ReactNode } from 'react'

import { iconComponents } from '~/types/IconType'

type ButtonProps = {
  variant: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'logout'
  disabled?: boolean
  children: ReactNode
  onClick?: () => void
  styles?: string
  showCaret?: boolean
  type?: 'button' | 'submit' | 'reset'
  form?: string
}

export const Button = ({
  variant,
  disabled = false,
  children,
  onClick,
  styles,
  showCaret,
  type = 'button',
  form,
}: ButtonProps) => {
  const CaretDown = iconComponents['caretDown']
  const LogoutIcon = iconComponents['logout']
  const baseStyles = `flex items-center ${!disabled && 'cursor-custom'} border border-transparent`

  const variantStyles = {
    primary: 'rounded-lg bg-grey-900 hover:bg-grey-500 justify-center',
    secondary:
      'rounded-lg bg-beige-100 hover:bg-white hover:border hover:border-beige-500 justify-center',
    tertiary: 'gap-3',
    danger:
      'rounded-lg bg-red hover:bg-[linear-gradient(0deg,rgba(255,255,255,0.20)_0%,rgba(255,255,255,0.20)_100%),#C94736] justify-center',
    logout:
      'gap-4 rounded-lg border-l-4 cursor-custom group text-grey-300 lg:py-4 lg:pl-7 lg:pr-8 hover:text-grey-100',
  }

  const buttonTextStyles = {
    primary: 'text-white text-preset-4-bold',
    secondary: 'text-grey-900 text-preset-4-bold',
    tertiary: `text-grey-500 text-preset-4 ${!disabled && 'hover:text-grey-900'}`,
    danger: 'text-white text-preset-4-bold',
    logout: 'text-grey-300 group-hover:text-grey-100 text-preset-5-bold',
  }

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], styles)}
      onClick={onClick}
      disabled={disabled}
      type={type}
      form={form}
    >
      {variant === 'logout' && <LogoutIcon className="h-6 w-6" />}

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
