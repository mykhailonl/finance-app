import type { FormEvent } from 'react'

import { Button } from '~/components/Button'
import { Dropdown } from '~/components/Dropdown'
import { Input } from '~/components/Input'
import { ModalDescription } from '~/components/ModalDescription'
import { ModalTitle } from '~/components/ModalTitle'
import { SectionWrapper } from '~/components/SectionWrapper'
import { COLOR_OPTIONS } from '~/constants/theme'
import { useForm } from '~/hooks/useForm'
import { useModal } from '~/hooks/useModal'
import usePots from '~/hooks/usePots'
import type { EditPotModalProps } from '~/types/PotModalTypes'
import { sortUsedOptions } from '~/utils/sortUsedOptions'
import { potValidators } from '~/validators'

export const EditPotModal = ({
  initialValues,
  onSubmit,
}: EditPotModalProps) => {
  const { closeModal } = useModal()
  const {
    data: { usedColors },
  } = usePots()

  const sortedColors = sortUsedOptions(COLOR_OPTIONS, usedColors)

  const {
    values,
    setFieldValue,
    errors,
    validateField,
    validateAll,
    isTouched,
  } = useForm({
    initialValues: {
      potName: initialValues.name,
      target: initialValues.target,
      theme: initialValues.theme,
    },
    validators: {
      potName: (potName: string) => potValidators.validatePotName(potName),
      target: (amount: string) => potValidators.validatePotTarget(amount),
    },
  })

  const availableColors = usedColors.filter(
    (color) => color !== initialValues.theme
  )

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const allFieldsValid = validateAll()
    const trimmedName = values.potName.trim()

    if (allFieldsValid && isTouched) {
      onSubmit({
        name: trimmedName,
        target: Number(values.target),
        theme: values.theme,
      })
    } else {
      closeModal()
    }
  }

  return (
    <SectionWrapper styles="min-w-[335px] md:w-[560px]">
      <ModalTitle title="Edit Pot" />

      <ModalDescription text="If your saving targets change, feel free to update your pots." />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label={{
            showLabel: true,
            labelText: 'Pot Name',
          }}
          input={{
            value: values.potName,
            onChange: (value) => setFieldValue('potName', value),
            placeholder: '',
            onBlur: () => validateField('potName'),
          }}
          helperText={{
            showHelper: true,
            helperText: `${30 - values.potName.length} characters left`,
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
            value: values.target,
            onChange: (value) => setFieldValue('target', value),
            onBlur: () => validateField('target'),
            placeholder: '',
          }}
          helperText={{
            showHelper: false,
          }}
          styles="flex-col"
          error={errors.target}
          isNumberInput
        />

        <Dropdown
          label={{ showLabel: true, labelText: 'Theme' }}
          value={values.theme}
          onChange={(value) => setFieldValue('theme', value)}
          options={sortedColors}
          styles="flex-col items-start"
          showColorTag
          showCaret
          usedValues={availableColors}
        />

        <div className="flex flex-col gap-5">
          <Button type="submit" variant="primary" styles="p-4">
            Save Changes
          </Button>
        </div>
      </form>
    </SectionWrapper>
  )
}
