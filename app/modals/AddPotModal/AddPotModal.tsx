import type { FormEvent } from 'react'

import { Button } from '~/components/Button'
import { Dropdown } from '~/components/Dropdown'
import { Input } from '~/components/Input'
import { ModalDescription } from '~/components/ModalDescription'
import { ModalTitle } from '~/components/ModalTitle'
import { SectionWrapper } from '~/components/SectionWrapper'
import { MAX_LENGTH } from '~/constants'
import { COLOR_OPTIONS } from '~/constants/theme'
import { useForm } from '~/hooks/useForm'
import usePots from '~/hooks/usePots'
import type { AddPotModalProps } from '~/types/PotModalTypes'
import { sortUsedOptions } from '~/utils/sortUsedOptions'
import { potValidators } from '~/validators'

export const AddPotModal = ({ onSubmit }: AddPotModalProps) => {
  const {
    data: { usedColors },
  } = usePots()

  const sortedColors = sortUsedOptions(COLOR_OPTIONS, usedColors)

  const { values, setFieldValue, errors, validateField, validateAll } = useForm(
    {
      initialValues: {
        potName: '',
        target: '',
        theme: sortedColors[0].value,
      },
      validators: {
        potName: (potName: string) => potValidators.validatePotName(potName),
        target: (amount: string) => potValidators.validatePotTarget(amount),
      },
    }
  )

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const allFieldsValid = validateAll()

    if (allFieldsValid) {
      onSubmit({
        name: values.potName.trim(),
        target: Number(values.target),
        theme: values.theme,
      })
    }
  }

  const normalizeStringLength =
    values.potName.length <= MAX_LENGTH ? values.potName.length : MAX_LENGTH
  const symbolsLeft = MAX_LENGTH - normalizeStringLength

  return (
    <SectionWrapper styles="min-w-[335px] md:w-[560px]">
      <ModalTitle title="Add New Pot" />
      <ModalDescription text="Create a pot to set savings targets. These can help keep you on track as you save for special purchases." />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label={{
            showLabel: true,
            labelText: 'Pot Name',
          }}
          input={{
            value: values.potName,
            onChange: (value) => setFieldValue('potName', value),
            placeholder: 'e.g. Holiday Fund',
            onBlur: () => validateField('potName'),
            maxLength: MAX_LENGTH,
          }}
          helperText={{
            showHelper: true,
            helperText: `${symbolsLeft} characters left`,
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
            placeholder: 'e.g. 2000',
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
          usedValues={usedColors}
        />

        <div className="flex flex-col gap-5">
          <Button type="submit" variant="primary" styles="p-4">
            Add Pot
          </Button>
        </div>
      </form>
    </SectionWrapper>
  )
}
