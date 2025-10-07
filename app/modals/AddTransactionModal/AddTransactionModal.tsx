import { type FormEvent } from 'react'

import { Button } from '~/components/Button'
import { DrawerTabs } from '~/components/DrawerTabs'
import { ModalDescription } from '~/components/ModalDescription'
import { ModalTitle } from '~/components/ModalTitle'
import { SectionWrapper } from '~/components/SectionWrapper'
import { TransactionAdvancedFields } from '~/components/TransactionAdvancedFields'
import { TransactionBasicFields } from '~/components/TransactionBasicFields'
import { useForm } from '~/hooks/useForm'
import type { TransactionCategory, TransactionType } from '~/types'
import type {
  AddTransactionModalProps,
  DrawerTabType,
} from '~/types/TransactionModalTypes'
import { formatAmountBySign } from '~/utils/formatAmountBySign'
import { formatTransactionDateTime } from '~/utils/formatTransactionDateTime'
import { parseTransactionDateTime } from '~/utils/parseTransactionDateTime'
import { transactionValidators } from '~/validators'

export const AddTransactionModal = ({
  onSubmit,
  options = { recurring: false },
}: AddTransactionModalProps) => {
  const timestamp = new Date().toISOString()
  const { dateISO, timeISO } = parseTransactionDateTime(timestamp)

  const { values, setFieldValue, errors, validateField, validateAll } = useForm(
    {
      initialValues: {
        amount: '',
        type: 'expense' as TransactionType,
        category: 'General' as TransactionCategory,
        avatar: null,
        name: '',
        recurring: options.recurring,
        dateISO,
        timeISO,
        tab: 'basic' as DrawerTabType,
      },
      validators: {
        amount: (amount: string) =>
          transactionValidators.validateTransactionAmount(amount),
        name: (name: string) =>
          transactionValidators.validateTransactionName(name),
      },
    }
  )

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const allFieldsValid = validateAll()

    if (!allFieldsValid) {
      setFieldValue('tab', 'basic')

      return
    }

    const combinedDateTime = formatTransactionDateTime(
      values.dateISO,
      values.timeISO
    )

    const normalizedAmount = Number(values.amount)
    const formattedAmount = formatAmountBySign(values.type, normalizedAmount)
    const avatarValue = values.avatar || null

    if (allFieldsValid) {
      onSubmit({
        name: values.name.trim(),
        amount: formattedAmount,
        transaction_type: values.type,
        category: values.category,
        transaction_date: combinedDateTime,
        avatar_person: avatarValue,
        recurring: values.recurring,
      })
    }
  }

  const isBasicTab = values.tab === 'basic'

  return (
    <SectionWrapper styles="min-w-[335px] md:w-[560px] min-h-[700px] md:h-full">
      <ModalTitle title="Add New Transaction" />

      <ModalDescription text="Record your income or expense to keep track of your spending and maintain accurate financial records." />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 grow"
        id="add-transaction-form"
      >
        <DrawerTabs
          isBasic={isBasicTab}
          setBasicTab={() => setFieldValue('tab', 'basic')}
          setAdvancedTab={() => setFieldValue('tab', 'advanced')}
        />

        <div className="flex flex-col gap-4 grow">
          {isBasicTab ? (
            <TransactionBasicFields
              date={{
                value: values.dateISO,
                onChange: (value) => setFieldValue('dateISO', value),
              }}
              time={{
                value: values.timeISO,
                onChange: (value) => setFieldValue('timeISO', value),
              }}
              name={{
                value: values.name,
                onChange: (value) => setFieldValue('name', value),
                onBlur: () => validateField('name'),
                error: errors.name,
              }}
              transactionCategory={{
                value: values.category,
                onChange: (value) => setFieldValue('category', value),
              }}
              transactionType={{
                value: values.type,
                onChange: (value) => setFieldValue('type', value),
              }}
              amount={{
                value: values.amount,
                onChange: (value) => setFieldValue('amount', value),
                onBlur: () => validateField('amount'),
                error: errors.amount,
              }}
            />
          ) : (
            <TransactionAdvancedFields
              recurring={{
                value: values.recurring,
                onChange: (value) => setFieldValue('recurring', value),
              }}
              selectedAvatar={{
                value: values.avatar,
                onChange: (value) => setFieldValue('avatar', value),
              }}
            />
          )}
        </div>
      </form>

      <Button
        type="submit"
        variant="primary"
        styles="p-4"
        form="add-transaction-form"
      >
        Add Transaction
      </Button>
    </SectionWrapper>
  )
}
