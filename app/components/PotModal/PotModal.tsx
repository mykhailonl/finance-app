import React, { useState } from 'react'

import { AmountDisplay } from '~/components/AmountDisplay'
import { Button } from '~/components/Button'
import { Dropdown } from '~/components/Dropdown'
import { Input } from '~/components/Input'
import { ModalDescription } from '~/components/ModalDescription'
import { ModalTitle } from '~/components/ModalTitle'
import { ProgressSection } from '~/components/ProgressSection'
import { SectionWrapper } from '~/components/SectionWrapper'
import { COLOR_OPTIONS } from '~/constants/theme'
import { useModal } from '~/hooks/useModal'
import usePots from '~/hooks/usePots'
import type { ColorOption } from '~/types/DropdownType'
import type { InputErrorType } from '~/types/InputType'
import type { PotModalProps } from '~/types/ModalType'
import { canPerformAmountAction } from '~/utils/canPerformAmountAction'
import { formatAmount } from '~/utils/formatAmount'

// todo refactor states, maybe create one reusable hook with data and errors, maybe some reusable solution for handlers too
export const PotModal = ({
  type,
  title,
  description,
  initialValues = { name: '', target: 0, total: 0, theme: 'green' },
  buttons,
}: PotModalProps) => {
  const {
    data: { usedColors },
  } = usePots()
  const { closeModal } = useModal()

  //#region modal types
  const isDeleteModal = type === 'delete'
  const isMainModal = type === 'add' || type === 'edit'
  const isSecondaryModal = type === 'add-money' || type === 'withdraw-money'
  const mainButtonType = isDeleteModal ? 'danger' : 'primary'
  //#endregion

  //#region values
  const [potName, setPotName] = useState(initialValues.name)
  const [target, setTarget] = useState(initialValues.target)
  const [theme, setTheme] = useState<ColorOption>(initialValues.theme)
  const [total, setTotal] = useState(initialValues.total)

  const [amountToAdd, setAmountToAdd] = useState(0)
  const totalAmount = total + amountToAdd

  const [errors, setErrors] = useState<Record<string, InputErrorType | null>>({
    potName: null,
    target: null,
    theme: null,
    total: null,
    amountToAdd: null,
  })
  //#endregion

  const handleAmountToAddBlur = () => {
    if (!canPerformAmountAction(1000, amountToAdd)) {
      setErrors({ ...errors, amountToAdd: 'Insufficient funds' })
    } else {
      setErrors({ ...errors, amountToAdd: null })
    }
  }

  return (
    <SectionWrapper styles="min-w-[335px] md:w-[560px]">
      <ModalTitle title={title} />
      <ModalDescription text={description} />

      {/*#region main*/}
      {isMainModal && (
        <form className="flex flex-col gap-4 items-start">
          <Input
            label={{
              showLabel: true,
              labelText: 'Pot Name',
            }}
            input={{
              value: potName,
              onChange: (value) => {
                setPotName(value)
                setErrors({ ...errors, potName: null })
              },
              placeholder: '',
            }}
            helperText={{
              showHelper: true,
              helperText: 'characters left',
              helperStyles: 'self-end',
            }}
            styles="flex-col"
            error={errors.potName}
          />

          <Input
            label={{
              showLabel: true,
              labelText: 'Target',
            }}
            input={{
              value: target,
              onChange: setTarget,
              placeholder: '',
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
      {/*#endregion*/}

      {isSecondaryModal && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <AmountDisplay
              fieldName="New Amount"
              fieldValue={formatAmount(totalAmount)}
            />

            <ProgressSection
              pot={initialValues}
              smallBar
              extraMoney={amountToAdd}
            />
          </div>

          <Input
            label={{
              showLabel: true,
              labelText: 'Amount to Add',
            }}
            input={{
              placeholder: 'e.g. 200',
              value: amountToAdd,
              onChange: (value) => {
                setAmountToAdd(value)
                setErrors({ ...errors, amountToAdd: null })
              },
              onBlur: handleAmountToAddBlur,
            }}
            helperText={{
              showHelper: false,
            }}
            styles="flex-col"
            error={errors.amountToAdd}
          />
        </div>
      )}

      {/*#region buttons*/}
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
      {/*#endregion*/}
    </SectionWrapper>
  )
}
