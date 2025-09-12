import type { FormEvent } from 'react'

import { Button } from '~/components/Button'
import { Dropdown } from '~/components/Dropdown'
import { Input } from '~/components/Input'
import { ModalDescription } from '~/components/ModalDescription'
import { ModalTitle } from '~/components/ModalTitle'
import { SectionWrapper } from '~/components/SectionWrapper'
import { COLOR_OPTIONS } from '~/constants/theme'
import { useForm } from '~/hooks/useForm'
import usePots from '~/hooks/usePots'
import type { ThemeColor } from '~/types'
import type { AddPotModalProps } from '~/types/PotModalTypes'

export const AddPotModal = ({ onSubmit }: AddPotModalProps) => {
  const {
    data: { usedColors },
  } = usePots()

  const { values, setFieldValue, errors, validateField, validateAll } = useForm(
    {
      initialValues: {
        potName: '',
        target: 0,
        theme: 'green' as ThemeColor,
      },
      validators: {
        potName: (value) => {
          const trimmed = value.trim()

          if (!trimmed) {
            return 'Pot name is required'
          }

          return null
        },
        target: (value) => (value <= 0 ? 'Target must be positive' : null),
      },
    }
  )

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const allFieldsValid = validateAll()

    if (!allFieldsValid) {
      return
    }

    if (allFieldsValid) {
      onSubmit({
        name: values.potName.trim(),
        target: values.target,
        theme: values.theme,
      })
    }
  }

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
            placeholder: 'e.g. 2000',
          }}
          helperText={{
            showHelper: false,
          }}
          styles="flex-col"
          error={errors.target}
        />

        <Dropdown
          label={{ showLabel: true, labelText: 'Theme' }}
          value={values.theme}
          onChange={(value) => setFieldValue('theme', value)}
          options={COLOR_OPTIONS}
          styles="flex-col items-start"
          showColorTag
          showCaret
          usedColors={usedColors}
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
