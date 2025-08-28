import React from 'react'

import { Button } from '~/components/Button'
import { Dropdown } from '~/components/Dropdown'
import { Input } from '~/components/Input'
import { ModalDescription } from '~/components/ModalDescription'
import { ModalTitle } from '~/components/ModalTitle'
import { SectionWrapper } from '~/components/SectionWrapper'
import { COLOR_OPTIONS } from '~/constants/theme'
import { useForm } from '~/hooks/useForm'
import usePots from '~/hooks/usePots'
import type { EditPotModalProps } from '~/types/ModalTypes'

export const EditPotModal = ({
  initialValues,
  onSubmit,
}: EditPotModalProps) => {
  const {
    data: { usedColors },
  } = usePots()

  const { values, setFieldValue, errors, validateField } = useForm({
    initialValues: {
      potName: initialValues.name,
      target: initialValues.target,
      theme: initialValues.theme,
    },
    validators: {
      potName: (value) => (!value.trim() ? 'Name is required' : null),
      target: (value) => (value <= 0 ? 'Target must be positive' : null),
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const nameError = validateField('potName')
    const targetError = validateField('target')

    if (!nameError && !targetError) {
      onSubmit({
        name: values.potName.trim(),
        target: values.target,
        theme: values.theme,
      })
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
            Save Changes
          </Button>
        </div>
      </form>
    </SectionWrapper>
  )
}
