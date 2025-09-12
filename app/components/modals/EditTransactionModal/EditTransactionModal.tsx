import { id } from '@rolldown/pluginutils'
import type { FormEvent } from 'react'

import { Button } from '~/components/Button'
import { DateTimeInput } from '~/components/DateTimeInput'
import { Dropdown } from '~/components/Dropdown'
import { Input } from '~/components/Input'
import { ModalDescription } from '~/components/ModalDescription'
import { ModalTitle } from '~/components/ModalTitle'
import { SectionWrapper } from '~/components/SectionWrapper'
import { Switch } from '~/components/Switch'
import { useForm } from '~/hooks/useForm'
import { useModal } from '~/hooks/useModal'
import { TRANSACTION_TYPE_OPTIONS } from '~/types/DropdownType'
import type { EditTransactionModalProps } from '~/types/TransactionModalTypes'
import { formatAmountBySign } from '~/utils/formatAmountBySign'
import { formatTransactionDateTime } from '~/utils/formatTransactionDateTime'
import { getCategoryOptions } from '~/utils/getCategoryOptions'
import { parseTransactionDateTime } from '~/utils/parseTransactionDateTime'
import { validateTransactionAmount } from '~/validators/validateTransactionAmount'
import { validateTransactionCategory } from '~/validators/validateTransactionCategory'
import { validateTransactionName } from '~/validators/validateTransactionName'

export const EditTransactionModal = ({
  onSubmit,
  initialValues,
}: EditTransactionModalProps) => {
  const { openModal, modalState } = useModal()
  const { dateISO, timeISO } = parseTransactionDateTime(
    initialValues.transaction_date
  )

  /*
   * todo
   *  implement delete modal, maybe secondary button inside EditModal, which will lead to deleteModal,asking if you really wanna delete transaction and
   *  that action is irreversible
   * */
  const { values, setFieldValue, errors, validateField, validateAll } = useForm(
    {
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
        amount: (value) => validateTransactionAmount(value),

        name: (value) => validateTransactionName(value),
      },
    }
  )

  const categoryOptions = getCategoryOptions(values.transaction_type)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const allFieldsValid = validateAll()

    const categoryError = validateTransactionCategory(
      values.transaction_type,
      values.transaction_category
    )

    if (categoryError) {
      return 'Invalid category value for selected transaction type.'
    }

    if (!allFieldsValid) {
      return
    }

    const combinedDateTime = formatTransactionDateTime(
      values.dateISO,
      values.timeISO
    )
    const formattedAmount = formatAmountBySign(
      values.transaction_type,
      values.amount
    )

    if (allFieldsValid) {
      onSubmit({
        name: values.name.trim(),
        amount: formattedAmount,
        transaction_type: values.transaction_type,
        category: values.transaction_category,
        transaction_date: combinedDateTime,
        recurring: values.recurring,
      })
    }
  }

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
            showHelper: false,
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
            labelStyles: 'text-preset-5-bold',
          }}
          value={values.transaction_category}
          onChange={(value) => setFieldValue('transaction_category', value)}
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
        />

        <Switch
          label="Recurring"
          value={values.recurring}
          onClick={() => setFieldValue('recurring', !values.recurring)}
        />

        <Button type="submit" variant="primary" styles="p-4">
          Save Changes
        </Button>

        <Button
          variant="secondary"
          styles="p-4"
          onClick={() =>
            openModal({
              type: 'transaction-delete',
              transaction: { id: initialValues.id, name: initialValues.name },
            })
          }
        >
          Delete Transaction
        </Button>
      </form>
    </SectionWrapper>
  )
}
