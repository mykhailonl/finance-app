import type { FormEvent } from 'react'

import { Button } from '~/components/Button'
import { DrawerTabs } from '~/components/DrawerTabs'
import { ModalDescription } from '~/components/ModalDescription'
import { ModalTitle } from '~/components/ModalTitle'
import { SectionWrapper } from '~/components/SectionWrapper'
import { TransactionAdvancedFields } from '~/components/TransactionAdvancedFields'
import { TransactionBasicFields } from '~/components/TransactionBasicFields'
import { useForm } from '~/hooks/useForm'
import { useModal } from '~/hooks/useModal'
import type {
  DrawerTabType,
  EditTransactionModalProps,
} from '~/types/TransactionModalTypes'
import { formatAmountBySign } from '~/utils/formatAmountBySign'
import { formatTransactionDateTime } from '~/utils/formatTransactionDateTime'
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
      transaction_avatar: initialValues.avatar_person,
      name: initialValues.name,
      recurring: initialValues.recurring,
      id: initialValues.id,
      tab: 'basic' as DrawerTabType,
    },
    validators: {
      amount: (amount: string) =>
        transactionValidators.validateTransactionAmount(amount),
      name: (name: string) =>
        transactionValidators.validateTransactionName(name),
    },
  })

  //#region handlers
  const handleTransactionDelete = () => {
    openModal({
      type: 'transaction-delete',
      transaction: { id: initialValues.id, name: initialValues.name },
    })
  }
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
    const formattedAmount = formatAmountBySign(
      values.transaction_type,
      Number(values.amount)
    )

    if (allFieldsValid && isTouched) {
      onSubmit({
        name: values.name.trim(),
        amount: formattedAmount,
        transaction_type: values.transaction_type,
        avatar_person: values.transaction_avatar,
        category: values.transaction_category,
        transaction_date: combinedDateTime,
        recurring: values.recurring,
      })
    } else {
      closeModal()
    }
  }
  //#endregion

  const isBasicTab = values.tab === 'basic'

  return (
    <SectionWrapper styles="min-w-[335px] md:w-[560px] min-h-[740px] md:h-full">
      <ModalTitle title="Edit Transaction" />

      <ModalDescription text="Update or change any information about current transaction." />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 grow"
        id="edit-transaction-form"
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
                value: values.transaction_category,
                onChange: (value) =>
                  setFieldValue('transaction_category', value),
              }}
              transactionType={{
                value: values.transaction_type,
                onChange: (value) => setFieldValue('transaction_type', value),
              }}
              amount={{
                value: String(values.amount),
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
                value: values.transaction_avatar,
                onChange: (value) => setFieldValue('transaction_avatar', value),
              }}
            />
          )}
        </div>
      </form>

      <div className="flex flex-col gap-4">
        <Button
          type="submit"
          variant="primary"
          styles="p-4 grow"
          form="edit-transaction-form"
        >
          Save Changes
        </Button>

        <Button
          variant="danger"
          styles="p-4 grow"
          onClick={handleTransactionDelete}
        >
          Delete Transaction
        </Button>
      </div>
    </SectionWrapper>
  )
}
