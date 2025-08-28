import React from 'react'

import { Button } from '~/components/Button'
import { Dropdown } from '~/components/Dropdown'
import { Input } from '~/components/Input'
import { ModalDescription } from '~/components/ModalDescription'
import { ModalTitle } from '~/components/ModalTitle'
import { SectionWrapper } from '~/components/SectionWrapper'
import { COLOR_OPTIONS } from '~/constants/theme'
import useBudgets from '~/hooks/useBudgets'
import { useForm } from '~/hooks/useForm'
import type { ThemeColor, TransactionCategory } from '~/types'
import {
  BUDGET_CATEGORY_OPTIONS,
  type BudgetCategoryOption,
} from '~/types/DropdownType'

interface AddBudgetModalProps {
  onSubmit: (data: {
    category: TransactionCategory
    maximum: number
    theme: ThemeColor
  }) => void
}

// todo handle case with used categories, colors

export const AddBudgetModal = ({ onSubmit }: AddBudgetModalProps) => {
  const {
    data: { usedColors },
  } = useBudgets()

  const { values, setFieldValue, errors, validateField } = useForm({
    initialValues: {
      category: 'Entertainment' as TransactionCategory,
      maximum: 0,
      theme: 'green' as ThemeColor,
    },
    validators: {
      category: (value) => (!value ? 'Category is required' : null),
      maximum: (value) => (value <= 0 ? 'Maximum must be positive' : null),
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const categoryError = validateField('category')
    const maximumError = validateField('maximum')

    if (!categoryError && !maximumError) {
      onSubmit({
        category: values.category,
        maximum: values.maximum,
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
          value={values.category as BudgetCategoryOption}
          onChange={(value) => setFieldValue('category', value)}
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
            Add Budget
          </Button>
        </div>
      </form>
    </SectionWrapper>
  )
}
