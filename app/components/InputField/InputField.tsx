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
}: Props) => {
  const SearchIcon = iconComponents[iconName]

  return (
    <div className="flex items-center gap-1">
      {showLabel && (
        <label
          htmlFor={`${name}-field`}
          className="text-preset-4 text-grey-500 flex text-nowrap"
        >
          {label}
        </label>
      )}

      <div className="flex gap-4 items-center rounded-lg border-beige-500 py-3 px-5 border cursor-pointer">
        <input
          type="text"
          id={`${name}-field`}
          className="bg-white flex text-preset-4 w-full rounded-lg outline-hidden"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        {showMainIcon && <SearchIcon className="w-4 h-4" />}
      </div>
    </div>
  )
}
