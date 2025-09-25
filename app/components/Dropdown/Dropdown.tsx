import cn from 'classnames'
import { Fragment, useEffect, useRef, useState } from 'react'

import { Divider } from '~/components/Divider'
import { THEME_TO_TW_TEXT } from '~/constants/theme'
import type { ThemeColor } from '~/types'
import type { DropdownOptionType, DropdownProps } from '~/types/DropdownType'
import { iconComponents } from '~/types/IconType'

export const Dropdown = <T extends DropdownOptionType>({
  label,
  value,
  onChange,
  onBlur,
  error,
  options,
  styles,
  showColorTag,
  showCaret,
  mobileView,
  usedValues,
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

  const selectedLabel = options.find((opt) => opt.value === value)

  const currentColorClass =
    showColorTag && THEME_TO_TW_TEXT[value as ThemeColor]

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
          className={cn(
            'md:hidden cursor-custom',
            mobileView ? 'flex' : 'hidden'
          )}
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
          onBlur={onBlur}
        >
          {showColorTag && (
            <TagIcon className={cn('w-4 h-4', currentColorClass)} />
          )}

          <p className="text-preset-4 text-grey-900 grow">
            {selectedLabel?.label}
          </p>

          {showCaret && <CaretIcon className="w-2 h-2" />}
        </div>

        {/*#region options */}
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
                showColorTag && THEME_TO_TW_TEXT[option.value as ThemeColor]
              const valueAlreadyUsed =
                usedValues && usedValues.includes(option.value as T)

              return (
                <Fragment key={option.value}>
                  <div
                    className={cn(
                      'flex gap-3 items-center',
                      valueAlreadyUsed
                        ? 'cursor-not-allowed'
                        : 'cursor-custom hover:text-grey-900',
                      isSelected
                        ? 'text-preset-4-bold text-grey-900'
                        : 'text-preset-4 text-beige-500'
                    )}
                    onClick={(e) => {
                      if (valueAlreadyUsed) {
                        return
                      }

                      e.stopPropagation()
                      onChange(option.value)
                      onBlur?.()
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

                    {valueAlreadyUsed && !isSelected && (
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
        {/*#endregion*/}

        {error && <p className="text-preset-5 text-red text-end">{error}</p>}
      </div>
    </div>
  )
}
