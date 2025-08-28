import cn from 'classnames'
import { useEffect, useRef, useState } from 'react'

import { Divider } from '~/components/Divider'
import { useModal } from '~/hooks/useModal'
import type { Budget, Pot } from '~/types'
import { iconComponents } from '~/types/IconType'

interface Props {
  item: Budget | Pot
}

export const Burger = ({ item }: Props) => {
  const { openModal } = useModal()
  //#region states
  const [isOpen, setIsOpen] = useState(false)
  const burgerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        burgerRef.current &&
        !burgerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  //#endregion

  const IconDots = iconComponents['dots']

  const isBudget = 'category' in item
  const isPot = 'name' in item

  const handleEdit = () => {
    if (isBudget) {
      openModal('budget-edit', { budget: item })
    }

    if (isPot) {
      openModal('pot-edit', { pot: item })
    }
  }

  const handleDelete = () => {
    if (isBudget) {
      openModal('budget-delete', { budget: item })
    }

    if (isPot) {
      openModal('pot-delete', { pot: item })
    }
  }

  return (
    <div
      className="relative cursor-custom"
      ref={burgerRef}
      onClick={() => setIsOpen(!isOpen)}
    >
      <IconDots className="h-4 w-4 hover:text-grey-500" />

      {isOpen && (
        <div
          className={cn(
            'absolute top-7 right-0',
            'bg-white shadow-[0_4px_24px_0_rgba(0,0,0,0.25)] rounded-lg',
            'flex flex-col gap-3 px-5 py-3',
            'text-nowrap text-preset-4'
          )}
        >
          <p className="text-grey-900" onClick={handleEdit}>
            Edit {isBudget ? 'Budget' : 'Pot'}
          </p>

          <Divider />

          <p className="text-red" onClick={handleDelete}>
            Delete {isBudget ? 'Budget' : 'Pot'}
          </p>
        </div>
      )}
    </div>
  )
}
