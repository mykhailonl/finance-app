import cn from 'classnames'
import React, { useEffect, useRef, useState } from 'react'

import { Divider } from '~/components/Divider'
import type { DropdownOptionType, DropdownProps } from '~/types/DropdownType'
import { iconComponents } from '~/types/IconType'

export const Dropdown = <T extends DropdownOptionType>({
  type,
  value,
  currentLabel,
  options,
  onChange,
  styles,
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const CaretIcon = iconComponents['caretDown']
  const SortIcon = iconComponents['sort']
  const FilterIcon = iconComponents['filter']

  const isSortDropdown = type === 'sort'
  const IconComponent = isSortDropdown ? SortIcon : FilterIcon

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={cn('flex gap-2 items-center text-nowrap', styles)}>
      <div className="text-preset-4 text-grey-500 hidden md:block">
        {isSortDropdown ? 'Sort by' : 'Category'}
      </div>

      <div className="relative" ref={dropdownRef}>
        <div
          className={cn(
            'flex items-center justify-center rounded-lg bg-white cursor-custom md:hidden'
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <IconComponent className="w-5 h-5 text-grey-900" />
        </div>

        <div
          className={cn(
            'hidden md:flex items-center px-5 py-3 gap-4 rounded-lg bg-white cursor-custom border border-beige-500 hover:border-grey-500 active:border-grey-900',
            isSortDropdown ? 'min-w-[114px]' : 'min-w-[177px]'
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className="text-preset-4 text-grey-900 grow">{currentLabel}</p>

          <CaretIcon className="w-2 h-2" />
        </div>

        {isOpen && (
          <div
            className={cn(
              'rounded-lg px-5 py-3 bg-white flex gap-3 flex-col absolute top-13 shadow-lg max-h-[300px] overflow-y-auto',
              'right-0 md:w-full md:inset-x-0',
              isSortDropdown ? 'min-w-[114px]' : 'min-w-[177px]'
            )}
          >
            {options.map((option, index) => (
              <React.Fragment key={option.value}>
                <div
                  className={cn(
                    'hover:text-grey-900 cursor-custom',
                    value === option.value
                      ? 'text-preset-4-bold text-grey-900'
                      : 'text-preset-4 text-beige-500'
                  )}
                  onClick={(e) => {
                    e.stopPropagation()
                    onChange(option.value)
                    setIsOpen(false)
                  }}
                >
                  {option.label}
                </div>

                {index < options.length - 1 && <Divider styles="shrink-0" />}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
