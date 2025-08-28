import cn from 'classnames'
import React, { Fragment, useEffect, useRef, useState } from 'react'

import { Divider } from '~/components/Divider'
import type { ThemeColor } from '~/types'
import type { DropdownOptionType, DropdownProps } from '~/types/DropdownType'
import { iconComponents } from '~/types/IconType'
import { getColorTextClass } from '~/utils/getColorTextClass'
import { getDisplayValue } from '~/utils/getDisplayValue'
import { isColorOption } from '~/utils/isColorOption'

export const Dropdown = <T extends DropdownOptionType>({
  label,
  value,
  onChange,
  options,
  styles,
  showColorTag,
  showCaret,
  mobileView,
  usedColors,
}: DropdownProps<T>) => {
  //#region states
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

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
  //#endregion

  //#region Icons
  const CaretIcon = iconComponents['caretDown']
  const TagIcon = iconComponents['ellipse']
  const SortIcon = iconComponents['sort']
  const FilterIcon = iconComponents['filter']
  const SelectedIcon = iconComponents['selected']
  //#endregion

  const isSortDropdown = label.labelText === 'Sort By'
  const isFilterDropdown = label.labelText === 'Category'

  const currentColorClass =
    showColorTag && isColorOption(value) ? getColorTextClass(value) : 'text-red'

  return (
    <div className={cn('flex gap-1 items-center self-stretch', styles)}>
      {label.showLabel && (
        <label
          className={cn(
            'text-grey-500 text-nowrap',
            !label.bold ? 'text-preset-4' : 'text-preset-5-bold',
            !mobileView ? 'block' : 'hidden md:block',
            label.labelStyles
          )}
        >
          {label.labelText}
        </label>
      )}

      <div className="relative w-full" ref={dropdownRef}>
        {/* icon only */}
        <div
          className={cn('md:hidden cursor-custom', mobileView && 'flex')}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isSortDropdown && <SortIcon />}

          {isFilterDropdown && <FilterIcon />}
        </div>

        {/* full view */}
        <div
          className={cn(
            'text-nowrap md:flex items-center px-5 py-3 gap-4 rounded-lg bg-white cursor-custom border border-beige-500 hover:border-grey-500 active:border-grey-900',
            !mobileView ? 'flex' : 'hidden',
            isSortDropdown ? 'min-w-[114px]' : 'min-w-[177px]'
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {showColorTag && (
            <TagIcon className={cn('w-4 h-4', currentColorClass)} />
          )}

          <p className="text-preset-4 text-grey-900 grow">
            {getDisplayValue(value, options)}
          </p>

          {showCaret && <CaretIcon className="w-2 h-2" />}
        </div>

        {/* options */}
        {isOpen && (
          <div
            className={cn(
              'rounded-lg px-5 py-3 bg-white flex gap-3 flex-col absolute shadow-[0_4px_24px_0_rgba(0,0,0,0.25)] max-h-[300px] overflow-y-auto z-10',
              'right-0 md:w-full md:inset-x-0',
              mobileView ? 'top-13 md:top-16' : 'w-full top-16'
            )}
          >
            {options.map((option, index) => {
              const isSelected = value === option.value

              const optionColorClass =
                showColorTag && isColorOption(option.value)
                  ? getColorTextClass(option.value)
                  : 'text-red'
              const colorAlreadyUsed =
                usedColors && usedColors.includes(option.value as ThemeColor)

              return (
                <Fragment key={option.value}>
                  <div
                    className={cn(
                      'flex gap-3 items-center',
                      colorAlreadyUsed
                        ? 'cursor-not-allowed'
                        : 'cursor-custom hover:text-grey-900',
                      isSelected
                        ? 'text-preset-4-bold text-grey-900'
                        : 'text-preset-4 text-beige-500'
                    )}
                    onClick={(e) => {
                      if (colorAlreadyUsed) {
                        return
                      }

                      e.stopPropagation()
                      onChange(option.value)
                      setIsOpen(false)
                    }}
                  >
                    {showColorTag && (
                      <TagIcon className={cn('w-4 h-4', optionColorClass)} />
                    )}

                    <p className="grow text-nowrap">{option.label}</p>

                    {isSelected && showColorTag && (
                      <SelectedIcon className="w-4 h-4" />
                    )}

                    {colorAlreadyUsed && !isSelected && (
                      <p className="text-preset-5 text-grey-500">
                        Already used
                      </p>
                    )}
                  </div>
                  {index < options.length - 1 && <Divider styles="shrink-0" />}
                </Fragment>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
