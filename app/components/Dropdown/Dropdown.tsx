import cn from 'classnames'
import React, { useState } from 'react'

import { Divider } from '~/components/Divider'
import type { DropdownOptionType, DropdownProps } from '~/types/DropdownType'
import { iconComponents } from '~/types/IconType'

// todo close dropdown if another is open or page reloads
export const Dropdown = <T extends DropdownOptionType>({
  type,
  value,
  currentLabel,
  options,
  onChange,
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false)
  const CaretIcon = iconComponents['caretDown']

  const isSortDropdown = type === 'sort'

  return (
    <div className="flex gap-2 items-center text-nowrap">
      <label
        htmlFor={isSortDropdown ? 'sortDropdown' : 'filterDropdown'}
        className="text-preset-4 text-grey-500"
      >
        {isSortDropdown ? 'Sort by' : 'Category'}
      </label>

      <div
        id={isSortDropdown ? 'sortDropdown' : 'filterDropdown'}
        className={cn(
          'flex items-center px-5 py-3 gap-4 rounded-lg bg-white border border-beige-500 relative cursor-pointer',
          isSortDropdown ? 'min-w-[114px]' : 'min-w-[177px]'
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-preset-4 text-grey-900 grow">{currentLabel}</p>

        <CaretIcon className="w-2 h-2" />

        {isOpen && (
          <div className="rounded-lg px-5 py-3 bg-white border border-beige-500 flex gap-3 flex-col absolute top-13 w-full inset-x-0 shadow-xl max-h-[300px] overflow-y-auto">
            {options.map((option, index) => (
              <React.Fragment key={option.value}>
                <div
                  className={cn(
                    'text-grey-900',
                    value === option.value
                      ? 'text-preset-4-bold'
                      : 'text-preset-4'
                  )}
                  onClick={() => {
                    onChange(option.value)
                    setIsOpen(false)
                  }}
                >
                  {option.label}
                </div>

                {index < options.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
