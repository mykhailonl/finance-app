import React from 'react'

import { AmountDisplay } from '~/components/AmountDisplay'
import { Button } from '~/components/Button'
import { Input } from '~/components/Input'
import { ModalDescription } from '~/components/ModalDescription'
import { ModalTitle } from '~/components/ModalTitle'
import { ProgressSection } from '~/components/ProgressSection'
import { SectionWrapper } from '~/components/SectionWrapper'
import { useForm } from '~/hooks/useForm'
import type { WithdrawFromPotModalProps } from '~/types/ModalTypes'
import { formatAmount } from '~/utils/formatAmount'

export const WithdrawFromPotModal = ({
  pot,
  onWithdrawMoney,
}: WithdrawFromPotModalProps) => {
  const { values, setFieldValue, errors, validateField } = useForm({
    initialValues: {
      amountToWithdraw: 0,
    },
    validators: {
      amountToWithdraw: (value) => {
        if (value <= 0) {
          return 'Amount must be positive'
        }
        if (value > pot.total) {
          return 'Cannot withdraw more than pot contains'
        }
        return null
      },
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const amountError = validateField('amountToWithdraw')

    if (!amountError && values.amountToWithdraw > 0) {
      onWithdrawMoney(values.amountToWithdraw)
    }
  }

  const totalAmount = pot.total - values.amountToWithdraw

  return (
    <SectionWrapper styles="min-w-[335px] md:w-[560px]">
      <ModalTitle title={`Withdraw from '${pot.name}'`} />
      <ModalDescription text="Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot." />

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <AmountDisplay
            fieldName="New Amount"
            fieldValue={formatAmount(totalAmount)}
          />

          <ProgressSection
            pot={pot}
            smallBar
            extraMoney={-values.amountToWithdraw}
          />
        </div>

        <Input
          label={{
            showLabel: true,
            labelText: 'Amount to Withdraw',
          }}
          input={{
            placeholder: 'e.g. 200',
            value: values.amountToWithdraw,
            onChange: (value) => setFieldValue('amountToWithdraw', value),
            onBlur: () => validateField('amountToWithdraw'),
          }}
          helperText={{
            showHelper: false,
          }}
          styles="flex-col"
          error={errors.amountToWithdraw}
        />

        <div className="flex flex-col gap-5">
          <Button type="submit" variant="primary" styles="p-4">
            Confirm Withdrawal
          </Button>
        </div>
      </form>
    </SectionWrapper>
  )
}
