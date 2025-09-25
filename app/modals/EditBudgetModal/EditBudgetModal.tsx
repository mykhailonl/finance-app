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
import { useModal } from '~/hooks/useModal'
import type { EditBudgetModalProps } from '~/types/BudgetModalTypes'
import {
  EXPENSE_CATEGORY_OPTIONS,
  type ExpenseCategory,
} from '~/types/DropdownType'
import { sortUsedOptions } from '~/utils/sortUsedOptions'
import { budgetValidators } from '~/validators'

export const EditBudgetModal = ({
  initialValues,
  onSubmit,
}: EditBudgetModalProps) => {
  const { closeModal } = useModal()
  const {
    data: { usedColors, usedCategories },
  } = useBudgets()

  const categoryOptions = sortUsedOptions(
    EXPENSE_CATEGORY_OPTIONS,
    usedCategories
  )

  const colorOptions = sortUsedOptions(COLOR_OPTIONS, usedColors)

  const {
    values,
    setFieldValue,
    errors,
    validateField,
    validateAll,
    isTouched,
  } = useForm({
    initialValues: {
      category: initialValues.category,
      maximum: initialValues.maximum,
      theme: initialValues.theme,
    },
    validators: {
      category: (category) => budgetValidators.validateCategory(category),
      maximum: (amount: string) =>
        budgetValidators.validateBudgetMaximum(amount),
    },
  })

  const availableCategories = usedCategories.filter(
    (category) => category !== initialValues.category
  )

  const availableColors = usedColors.filter(
    (color) => color !== initialValues.theme
  )

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const allFieldValid = validateAll()

    if (allFieldValid && isTouched) {
      onSubmit({
        category: values.category,
        maximum: Number(values.maximum),
        theme: values.theme,
      })
    } else {
      closeModal()
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
          options={categoryOptions}
          showCaret
          styles="flex-col items-start"
          usedValues={availableCategories}
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
          isNumberInput
        />

        <Dropdown
          label={{ showLabel: true, labelText: 'Theme' }}
          value={values.theme}
          onChange={(value) => setFieldValue('theme', value)}
          options={colorOptions}
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
