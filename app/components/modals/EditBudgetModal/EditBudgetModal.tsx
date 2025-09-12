import type { FormEvent } from 'react'

import { Button } from '~/components/Button'
import { Dropdown } from '~/components/Dropdown'
import { Input } from '~/components/Input'
import { ModalDescription } from '~/components/ModalDescription'
import { ModalTitle } from '~/components/ModalTitle'
import { SectionWrapper } from '~/components/SectionWrapper'
import { COLOR_OPTIONS } from '~/constants/theme'
import useBudgets from '~/hooks/useBudgets'
import { useForm } from '~/hooks/useForm'
import type { EditBudgetModalProps } from '~/types/BudgetModalTypes'
import {
  EXPENSE_CATEGORY_OPTIONS,
  type ExpenseCategory,
} from '~/types/DropdownType'

// todo handle case when fields didnt change, so I will not send an extra request, same with Pots

export const EditBudgetModal = ({
  initialValues,
  onSubmit,
}: EditBudgetModalProps) => {
  const {
    data: { usedColors },
  } = useBudgets()

  const { values, setFieldValue, errors, validateField, validateAll } = useForm(
    {
      initialValues: {
        category: initialValues.category,
        maximum: initialValues.maximum,
        theme: initialValues.theme,
      },
      validators: {
        category: (value) => (!value ? 'Category is required' : null),
        maximum: (value) => (value <= 0 ? 'Maximum must be positive' : null),
      },
    }
  )

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const allFieldValid = validateAll()

    if (!allFieldValid) {
      return
    }

    if (allFieldValid) {
      onSubmit({
        category: values.category,
        maximum: values.maximum,
        theme: values.theme,
      })
    }
  }

  return (
    <SectionWrapper styles="min-w-[335px] md:w-[560px]">
      <ModalTitle title="Edit Budget" />
      <ModalDescription text="As your budgets change, feel free to update your spending limits." />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Dropdown
          label={{
            showLabel: true,
            labelText: 'Budget Category',
          }}
          value={values.category as ExpenseCategory}
          onChange={(value) => setFieldValue('category', value)}
          options={EXPENSE_CATEGORY_OPTIONS}
          showCaret
          styles="flex-col items-start"
        />

        <Input
          label={{
            showLabel: true,
            labelText: 'Maximum spending',
          }}
          input={{
            value: values.maximum,
            onChange: (value) => setFieldValue('maximum', value),
            placeholder: 'e.g. 2000',
            onBlur: () => validateField('maximum'),
          }}
          helperText={{
            showHelper: false,
          }}
          styles="flex-col"
          error={errors.maximum}
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
