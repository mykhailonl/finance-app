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
import type { AddBudgetModalProps } from '~/types/BudgetModalTypes'
import {
  EXPENSE_CATEGORY_OPTIONS,
  type ExpenseCategory,
} from '~/types/DropdownType'
import { sortUsedOptions } from '~/utils/sortUsedOptions'
import { budgetValidators } from '~/validators'

export const AddBudgetModal = ({ onSubmit }: AddBudgetModalProps) => {
  const {
    data: { usedColors, usedCategories },
  } = useBudgets()

  const categoryOptions = sortUsedOptions(
    EXPENSE_CATEGORY_OPTIONS,
    usedCategories
  )

  const colorOptions = sortUsedOptions(COLOR_OPTIONS, usedColors)

  const { values, setFieldValue, errors, validateField, validateAll } = useForm(
    {
      initialValues: {
        category: categoryOptions[0].value,
        maximum: '',
        theme: colorOptions[0].value,
      },
      validators: {
        category: (category: ExpenseCategory) =>
          budgetValidators.validateCategory(category),
        maximum: (amount: string) =>
          budgetValidators.validateBudgetMaximum(amount),
      },
    }
  )

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const allFieldsValid = validateAll()

    if (allFieldsValid) {
      onSubmit({
        category: values.category,
        maximum: Number(values.maximum),
        theme: values.theme,
      })
    }
  }

  return (
    <SectionWrapper styles="min-w-[335px] md:w-[560px]">
      <ModalTitle title="Add New Budget" />
      <ModalDescription text="Choose a category to set a spending budget. These categories can help you monitor spending." />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Dropdown
          label={{
            showLabel: true,
            labelText: 'Budget Category',
          }}
          value={values.category as ExpenseCategory}
          onChange={(value) => setFieldValue('category', value)}
          onBlur={() => validateField('category')}
          error={errors.category}
          options={categoryOptions}
          usedValues={usedCategories}
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
          usedValues={usedColors}
        />

        <div className="flex flex-col gap-5">
          <Button type="submit" variant="primary" styles="p-4">
            Add Budget
          </Button>
        </div>
      </form>
    </SectionWrapper>
  )
}
