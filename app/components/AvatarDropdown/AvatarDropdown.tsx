import cn from 'classnames'
import { useEffect, useRef, useState } from 'react'

import { AvatarList } from '~/components/AvatarList'
import { Button } from '~/components/Button'
import { CategoryIcon } from '~/components/CategoryIcon'
import type { TransactionCategory } from '~/types'
import { CATEGORY_ICON_OPTIONS } from '~/types/DropdownType'

type Props = {
  value: TransactionCategory //| PersonName
  onChange: (value: TransactionCategory) => void
}

export const AvatarDropdown = ({ value, onChange }: Props) => {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

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
    <div className={cn('flex flex-col gap-2 self-stretch')}>
      <label className="text-grey-500 text-nowrap">Avatar</label>

      <div className="relative w-full" ref={dropdownRef}>
        {/* preview block*/}
        <div className="flex justify-between items-center">
          <CategoryIcon category={value} />

          <Button
            variant="secondary"
            styles="p-4"
            onClick={() => setIsOpen(!isOpen)}
          >
            Change
          </Button>
        </div>

        {isOpen && (
          <div
            className={cn(
              'absolute overflow-y-auto',
              'bg-white shadow-[0_4px_24px_0_rgba(0,0,0,0.25)] rounded-lg',
              'px-5 py-3'
            )}
          >
            <AvatarList label="Categories" options={CATEGORY_ICON_OPTIONS} />
          </div>
        )}
      </div>
    </div>
  )
}
