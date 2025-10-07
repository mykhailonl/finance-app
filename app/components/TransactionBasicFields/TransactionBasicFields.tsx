import { DateTimeInput } from '~/components/DateTimeInput'
import { Dropdown } from '~/components/Dropdown'
import { Input } from '~/components/Input'
import { MAX_LENGTH } from '~/constants'
import type { TransactionType } from '~/types'
import { TRANSACTION_TYPE_OPTIONS } from '~/types/DropdownType'
import type { TransactionBasicFieldProps } from '~/types/FormTypes'
import { getCategoryOptions } from '~/utils/getCategoryOptions'

export const TransactionBasicFields = ({
  date,
  time,
  name,
  transactionType,
  transactionCategory,
  amount,
}: TransactionBasicFieldProps) => {
  const categoryOptions = getCategoryOptions(transactionType.value)

  const handleTransactionTypeChange = (value: TransactionType) => {
    /*
     * covering the case when we will change transactionType, but field already holds a category from
     * different transactionType
     */
    transactionType.onChange(value)

    const newCategoryOptions = getCategoryOptions(value)

    transactionCategory.onChange(newCategoryOptions[0].value)
  }

  const normalizeStringLength =
    name.value.length <= MAX_LENGTH ? name.value.length : MAX_LENGTH
  const symbolsLeft = MAX_LENGTH - normalizeStringLength

  return (
    <>
      <div className="flex gap-4">
        <DateTimeInput
          label={{ showLabel: true, labelText: 'Date' }}
          input={{
            value: date.value,
            onChange: (value) => date.onChange(value),
          }}
          type="date"
          styles="grow flex-col"
        />

        <DateTimeInput
          label={{ showLabel: true, labelText: 'Time' }}
          input={{
            value: time.value,
            onChange: (value) => time.onChange(value),
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
          value: name.value,
          onChange: (value) => name.onChange(value),
          placeholder: 'e.g., Coffee shop, Salary, Grocery store',
          onBlur: name.onBlur,
          maxLength: MAX_LENGTH,
        }}
        helperText={{
          showHelper: true,
          helperText: `${symbolsLeft} characters left`,
          helperStyles: 'self-end',
        }}
        styles="flex-col"
        error={name.error}
      />

      <div className="flex gap-4">
        <Dropdown
          label={{
            showLabel: true,
            labelText: 'Transaction type',
            labelStyles: 'text-preset-5-bold',
          }}
          value={transactionType.value}
          onChange={handleTransactionTypeChange}
          options={TRANSACTION_TYPE_OPTIONS}
          styles="flex-col items-start"
          showCaret
          small
        />

        <Dropdown
          label={{
            showLabel: true,
            labelText: 'Category',
            labelStyles: 'text-preset-5-bold',
          }}
          value={transactionCategory.value}
          onChange={(value) => transactionCategory.onChange(value)}
          options={categoryOptions}
          styles="flex-col items-start grow"
          showCaret
        />
      </div>

      <Input
        label={{ showLabel: true, labelText: 'Amount' }}
        input={{
          value: amount.value,
          onChange: (value) => amount.onChange(value),
          onBlur: amount.onBlur,
          placeholder: 'e.g. 20.75',
        }}
        helperText={{
          showHelper: false,
        }}
        styles="flex-col"
        error={amount.error}
        isNumberInput
      />
    </>
  )
}
