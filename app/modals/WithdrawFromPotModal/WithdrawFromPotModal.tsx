import { type FormEvent, useMemo } from 'react'

import { AmountDisplay } from '~/components/AmountDisplay'
import { Button } from '~/components/Button'
import { Input } from '~/components/Input'
import { ModalDescription } from '~/components/ModalDescription'
import { ModalTitle } from '~/components/ModalTitle'
import { ProgressSection } from '~/components/ProgressSection'
import { SectionWrapper } from '~/components/SectionWrapper'
import { useForm } from '~/hooks/useForm'
import type { WithdrawFromPotModalProps } from '~/types/PotModalTypes'
import { formatAmount } from '~/utils/formatAmount'
import { potValidators } from '~/validators'

export const WithdrawFromPotModal = ({
  pot,
  onWithdrawMoney,
}: WithdrawFromPotModalProps) => {
  const { values, setFieldValue, errors, validateField, validateAll } = useForm(
    {
      initialValues: {
        amountToWithdraw: '',
      },
      validators: {
        amountToWithdraw: (amount: string) =>
          potValidators.validateAmountToWithdraw(amount, pot.total),
      },
    }
  )

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const allFieldsValid = validateAll()

    const normalizedAmount = Number(values.amountToWithdraw)

    if (allFieldsValid) {
      onWithdrawMoney(normalizedAmount)
    }
  }

  const parsedAmount = useMemo(() => {
    const num = Number(values.amountToWithdraw)
    return isNaN(num) || num < 0 ? 0 : num
  }, [values.amountToWithdraw])

  const totalAmount = pot.total - parsedAmount
  const amountToShow = totalAmount <= 0 ? 0 : totalAmount

  return (
    <SectionWrapper styles="min-w-[335px] md:w-[560px]">
      <ModalTitle title={`Withdraw from '${pot.name}'`} />
      <ModalDescription text="Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot." />

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <AmountDisplay
            fieldName="New Amount"
            fieldValue={formatAmount(amountToShow)}
          />

          <ProgressSection
            pot={pot}
            smallBar
            extraMoney={-parsedAmount}
            withDrawView
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
          isNumberInput
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
