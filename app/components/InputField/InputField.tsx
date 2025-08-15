import cn from 'classnames'
import type { ChangeEvent } from 'react'

import { iconComponents, type InputFieldIcons } from '~/types/IconType'

type Props = {
  name: string
  showLabel: boolean
  label?: string
  placeholder: string
  showMainIcon: boolean
  iconName: InputFieldIcons
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  styles?: string
}

export const InputField = ({
  name,
  showLabel,
  label,
  placeholder,
  showMainIcon,
  iconName,
  value,
  onChange,
  styles,
}: Props) => {
  const SearchIcon = iconComponents[iconName]

  return (
    <div className={cn('flex items-center gap-1 cursor-custom', styles)}>
      {showLabel && (
        <label
          htmlFor={`${name}-field`}
          className="text-preset-4 text-grey-500 flex text-nowrap"
        >
          {label}
        </label>
      )}

      <div
        className={cn(
          'flex gap-4 items-center rounded-lg py-3 px-5 border border-beige-500 hover:border-grey-500 active:border-grey-900',
          styles
        )}
      >
        <input
          type="text"
          id={`${name}-field`}
          className="bg-white flex text-preset-4 w-full rounded-lg outline-hidden cursor-custom"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        {showMainIcon && <SearchIcon className="w-4 h-4" />}
      </div>
    </div>
  )
}
