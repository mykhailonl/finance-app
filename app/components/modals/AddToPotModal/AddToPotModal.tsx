import React from 'react'

import { AmountDisplay } from '~/components/AmountDisplay'
import { Button } from '~/components/Button'
import { Input } from '~/components/Input'
import { ModalDescription } from '~/components/ModalDescription'
import { ModalTitle } from '~/components/ModalTitle'
import { ProgressSection } from '~/components/ProgressSection'
import { SectionWrapper } from '~/components/SectionWrapper'
import { useBalance } from '~/hooks/useBalance'
import { useForm } from '~/hooks/useForm'
import type { AddToPotModalProps } from '~/types/ModalTypes'
import { canPerformAmountAction } from '~/utils/canPerformAmountAction'
import { formatAmount } from '~/utils/formatAmount'

export const AddToPotModal = ({ pot, onAddMoney }: AddToPotModalProps) => {
  const {
    data: { current: availableFunds },
  } = useBalance()

  const { values, setFieldValue, errors, validateField } = useForm({
    initialValues: {
      amountToAdd: 0,
    },
    validators: {
      amountToAdd: (value) => {
        if (value <= 0) {
          return 'Amount must be positive'
        }
        if (!canPerformAmountAction(availableFunds, value)) {
          return 'Insufficient funds'
        }
        return null
      },
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const amountError = validateField('amountToAdd')

    if (!amountError && values.amountToAdd > 0) {
      onAddMoney(values.amountToAdd)
    }
  }

  const totalAmount = pot.total + values.amountToAdd

  return (
    <SectionWrapper styles="min-w-[335px] md:w-[560px]">
      <ModalTitle title={`Add to '${pot.name}'`} />
      <ModalDescription text="Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance." />

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <AmountDisplay
            fieldName="New Amount"
            fieldValue={formatAmount(totalAmount)}
          />

          <ProgressSection pot={pot} smallBar extraMoney={values.amountToAdd} />
        </div>

        <Input
          label={{
            showLabel: true,
            labelText: 'Amount to Add',
          }}
          input={{
            placeholder: 'e.g. 200',
            value: values.amountToAdd,
            onChange: (value) => setFieldValue('amountToAdd', value),
            onBlur: () => validateField('amountToAdd'),
          }}
          helperText={{
            showHelper: false,
          }}
          styles="flex-col"
          error={errors.amountToAdd}
        />

        <div className="flex flex-col gap-5">
          <Button type="submit" variant="primary" styles="p-4">
            Confirm Addition
          </Button>
        </div>
      </form>
    </SectionWrapper>
  )
}
