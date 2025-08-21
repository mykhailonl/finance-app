import React, { useState } from 'react'

import { Button } from '~/components/Button'
import { Dropdown } from '~/components/Dropdown'
import { Input } from '~/components/Input'
import { ModalDescription } from '~/components/ModalDescription'
import { ModalTitle } from '~/components/ModalTitle'
import { SectionWrapper } from '~/components/SectionWrapper'
import { COLOR_OPTIONS } from '~/constants/theme'
import useBudgets from '~/hooks/useBudgets'
import { useModal } from '~/hooks/useModal'
import {
  BUDGET_CATEGORY_OPTIONS,
  type BudgetCategoryOption,
  type ColorOption,
} from '~/types/DropdownType'
import type { BudgetModalProps } from '~/types/ModalType'

export const BudgetModal = ({
  type,
  title,
  description,
  initialValues,
  buttons,
}: BudgetModalProps) => {
  const {
    data: { usedColors },
  } = useBudgets()
  const { closeModal } = useModal()

  //#region values
  const categoryValue = initialValues?.category || 'entertainment'
  const maxSpendValue = initialValues?.maximum
  const themeValue = initialValues?.theme || 'green'

  const [category, setCategory] = useState(categoryValue)
  const [maxSpend, setMaxSpend] = useState(
    maxSpendValue ? maxSpendValue.toString() : ''
  )
  const [theme, setTheme] = useState<ColorOption>(themeValue)
  //#endregion

  const isDeleteModal = type === 'delete'

  const mainButtonType = isDeleteModal ? 'danger' : 'primary'

  return (
    <SectionWrapper styles="min-w-[335px] md:w-[560px]">
      <ModalTitle title={title} />
      <ModalDescription text={description} />

      {!isDeleteModal && (
        <form className="flex flex-col gap-4 items-start">
          <Dropdown
            label={{
              showLabel: true,
              labelText: 'Budget Category',
            }}
            value={category as BudgetCategoryOption}
            onChange={setCategory}
            options={BUDGET_CATEGORY_OPTIONS}
            showCaret
            styles="flex-col items-start"
          />

          <Input
            label={{
              showLabel: true,
              labelText: 'Maximum spending',
            }}
            input={{
              value: maxSpend,
              onChange: setMaxSpend,
              placeholder: 'e.g. 2000',
            }}
            helperText={{
              showHelper: false,
            }}
            styles="flex-col"
          />

          <Dropdown
            label={{ showLabel: true, labelText: 'Theme' }}
            value={theme}
            onChange={setTheme}
            options={COLOR_OPTIONS}
            styles="flex-col items-start"
            showColorTag
            showCaret
            usedColors={usedColors}
          />
        </form>
      )}

      <div className="flex flex-col gap-5">
        <Button
          variant={mainButtonType}
          onClick={buttons.mainButtonFn}
          styles="p-4"
        >
          {buttons.mainButtonText}
        </Button>

        {isDeleteModal && (
          <Button variant="tertiary" onClick={closeModal} styles="self-center">
            No, Go Back
          </Button>
        )}
      </div>
    </SectionWrapper>
  )
}
