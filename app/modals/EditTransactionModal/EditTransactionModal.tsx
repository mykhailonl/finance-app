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
import { useModal } from '~/hooks/useModal'
import type { TransactionCategory } from '~/types'
import { TRANSACTION_TYPE_OPTIONS } from '~/types/DropdownType'
import type { EditTransactionModalProps } from '~/types/TransactionModalTypes'
import { formatAmountBySign } from '~/utils/formatAmountBySign'
import { formatTransactionDateTime } from '~/utils/formatTransactionDateTime'
import { getCategoryOptions } from '~/utils/getCategoryOptions'
import { parseTransactionDateTime } from '~/utils/parseTransactionDateTime'
import { transactionValidators } from '~/validators'

export const EditTransactionModal = ({
  onSubmit,
  initialValues,
}: EditTransactionModalProps) => {
  const { openModal, closeModal } = useModal()
  const { dateISO, timeISO } = parseTransactionDateTime(
    initialValues.transaction_date
  )

  const {
    values,
    setFieldValue,
    errors,
    validateField,
    validateAll,
    isTouched,
  } = useForm({
    initialValues: {
      amount: Math.abs(initialValues.amount),
      dateISO,
      timeISO,
      transaction_type: initialValues.transaction_type,
      transaction_category: initialValues.category,
      name: initialValues.name,
      recurring: initialValues.recurring,
      id: initialValues.id,
    },
    validators: {
      amount: (amount: string) =>
        transactionValidators.validateTransactionAmount(amount),
      name: (name: string) =>
        transactionValidators.validateTransactionName(name),
      transaction_category: (category: TransactionCategory): string | null =>
        transactionValidators.validateTransactionCategory(
          values.transaction_type,
          category
        ),
    },
  })

  const categoryOptions = getCategoryOptions(values.transaction_type)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const allFieldsValid = validateAll()

    const combinedDateTime = formatTransactionDateTime(
      values.dateISO,
      values.timeISO
    )
    const formattedAmount = formatAmountBySign(
      values.transaction_type,
      Number(values.amount)
    )

    if (allFieldsValid && isTouched) {
      onSubmit({
        name: values.name.trim(),
        amount: formattedAmount,
        transaction_type: values.transaction_type,
        category: values.transaction_category,
        transaction_date: combinedDateTime,
        recurring: values.recurring,
      })
    } else {
      closeModal()
    }
  }

  const normalizeStringLength =
    values.name.length <= MAX_LENGTH ? values.name.length : MAX_LENGTH
  const symbolsLeft = MAX_LENGTH - normalizeStringLength

  return (
    <SectionWrapper styles="min-w-[335px] md:w-[560px]">
      <ModalTitle title="Edit Transaction" />

      <ModalDescription text="Update or change any information about current transaction." />

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
          }}
          value={values.transaction_type}
          onChange={(value) => {
            setFieldValue('transaction_type', value)

            const newCategoryOptions = getCategoryOptions(value)
            setFieldValue('transaction_category', newCategoryOptions[0].value)
          }}
          options={TRANSACTION_TYPE_OPTIONS}
          styles="flex-col items-start"
          showCaret
        />

        <Dropdown
          label={{
            showLabel: true,
            labelText: 'Category',
          }}
          value={values.transaction_category}
          onChange={(value) => setFieldValue('transaction_category', value)}
          onBlur={() => validateField('transaction_category')}
          error={errors.transaction_category}
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

        <Switch
          label="Recurring"
          value={values.recurring}
          onClick={() => setFieldValue('recurring', !values.recurring)}
        />

        <div className="flex flex-col md:flex-row gap-5">
          <Button type="submit" variant="primary" styles="p-4 grow">
            Save Changes
          </Button>

          <Button
            variant="danger"
            styles="p-4 grow"
            onClick={() =>
              openModal({
                type: 'transaction-delete',
                transaction: { id: initialValues.id, name: initialValues.name },
              })
            }
          >
            Delete Transaction
          </Button>
        </div>
      </form>
    </SectionWrapper>
  )
}
