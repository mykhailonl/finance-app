import type { FormEvent } from 'react'

import { Button } from '~/components/Button'
import { DateTimeInput } from '~/components/DateTimeInput'
import { Dropdown } from '~/components/Dropdown'
import { Input } from '~/components/Input'
import { ModalDescription } from '~/components/ModalDescription'
import { ModalTitle } from '~/components/ModalTitle'
import { SectionWrapper } from '~/components/SectionWrapper'
import { Switch } from '~/components/Switch'
import { MAX_LENGTH } from '~/constants'
import { useForm } from '~/hooks/useForm'
import type { TransactionCategory, TransactionType } from '~/types'
import { TRANSACTION_TYPE_OPTIONS } from '~/types/DropdownType'
import type { AddTransactionModalProps } from '~/types/TransactionModalTypes'
import { formatAmountBySign } from '~/utils/formatAmountBySign'
import { formatTransactionDateTime } from '~/utils/formatTransactionDateTime'
import { getCategoryOptions } from '~/utils/getCategoryOptions'
import { parseTransactionDateTime } from '~/utils/parseTransactionDateTime'
import { transactionValidators } from '~/validators'

export const AddTransactionModal = ({ onSubmit }: AddTransactionModalProps) => {
  const timestamp = new Date().toISOString()
  const { dateISO, timeISO } = parseTransactionDateTime(timestamp)

  const { values, setFieldValue, errors, validateField, validateAll } = useForm(
    {
      initialValues: {
        amount: '',
        type: 'expense' as TransactionType,
        category: 'General' as TransactionCategory,
        // avatar: 'Gift' as TransactionCategory,
        name: '',
        recurring: false,
        dateISO,
        timeISO,
      },
      validators: {
        amount: (amount: string) =>
          transactionValidators.validateTransactionAmount(amount),
        name: (name: string) =>
          transactionValidators.validateTransactionName(name),
      },
    }
  )

  const categoryOptions = getCategoryOptions(values.type)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const allFieldsValid = validateAll()

    const combinedDateTime = formatTransactionDateTime(
      values.dateISO,
      values.timeISO
    )

    const normalizedAmount = Number(values.amount)
    const formattedAmount = formatAmountBySign(values.type, normalizedAmount)

    if (allFieldsValid) {
      onSubmit({
        name: values.name.trim(),
        amount: formattedAmount,
        transaction_type: values.type,
        category: values.category,
        transaction_date: combinedDateTime,
        // avatar_person: 'Emma',
        recurring: values.recurring,
      })
    }
  }

  const normalizeStringLength =
    values.name.length <= MAX_LENGTH ? values.name.length : MAX_LENGTH
  const symbolsLeft = MAX_LENGTH - normalizeStringLength

  return (
    <SectionWrapper styles="min-w-[335px] md:w-[560px]">
      <ModalTitle title="Add New Transaction" />

      <ModalDescription text="Record your income or expense to keep track of your spending and maintain accurate financial records." />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <DateTimeInput
            label={{ showLabel: true, labelText: 'Date' }}
            input={{
              value: values.dateISO,
              onChange: (value) => setFieldValue('dateISO', value),
            }}
            type="date"
            styles="grow flex-col"
          />

          <DateTimeInput
            label={{ showLabel: true, labelText: 'Time' }}
            input={{
              value: values.timeISO,
              onChange: (value) => setFieldValue('timeISO', value),
            }}
            type="time"
            styles="grow flex-col"
          />
        </div>

        <Input
          label={{
            showLabel: true,
            labelText: 'Transaction Name',
          }}
          input={{
            value: values.name,
            onChange: (value) => setFieldValue('name', value),
            placeholder: 'e.g., Coffee shop, Salary, Grocery store',
            onBlur: () => validateField('name'),
            maxLength: MAX_LENGTH,
          }}
          helperText={{
            showHelper: true,
            helperText: `${symbolsLeft} characters left`,
            helperStyles: 'self-end',
          }}
          styles="flex-col"
          error={errors.name}
        />

        <Dropdown
          label={{
            showLabel: true,
            labelText: 'Transaction type',
            labelStyles: 'text-preset-5-bold',
          }}
          value={values.type}
          onChange={(value) => setFieldValue('type', value)}
          options={TRANSACTION_TYPE_OPTIONS}
          styles="flex-col items-start"
          showCaret
        />

        <Dropdown
          label={{
            showLabel: true,
            labelText: 'Category',
            labelStyles: 'text-preset-5-bold',
          }}
          value={values.category}
          onChange={(value) => setFieldValue('category', value)}
          options={categoryOptions}
          styles="flex-col items-start"
          showCaret
        />

        <Input
          label={{ showLabel: true, labelText: 'Amount' }}
          input={{
            value: values.amount,
            onChange: (value) => setFieldValue('amount', value),
            onBlur: () => validateField('amount'),
            placeholder: 'e.g. 20.75',
          }}
          helperText={{
            showHelper: false,
          }}
          styles="flex-col"
          error={errors.amount}
          isNumberInput
        />

        {/*<AvatarDropdown*/}
        {/*  value={values.avatar}*/}
        {/*  onChange={(value) => setFieldValue('avatar', value)}*/}
        {/*/>*/}

        <Switch
          label="Recurring"
          value={values.recurring}
          onClick={() => setFieldValue('recurring', !values.recurring)}
        />

        <Button type="submit" variant="primary" styles="p-4">
          Add Transaction
        </Button>
      </form>
    </SectionWrapper>
  )
}
