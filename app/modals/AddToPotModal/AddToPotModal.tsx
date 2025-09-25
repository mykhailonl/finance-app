import { type FormEvent, useMemo } from 'react'

import { AmountDisplay } from '~/components/AmountDisplay'
import { Button } from '~/components/Button'
import { Input } from '~/components/Input'
import { ModalDescription } from '~/components/ModalDescription'
import { ModalTitle } from '~/components/ModalTitle'
import { ProgressSection } from '~/components/ProgressSection'
import { SectionWrapper } from '~/components/SectionWrapper'
import { useBalance } from '~/hooks/useBalance'
import { useForm } from '~/hooks/useForm'
import type { AddToPotModalProps } from '~/types/PotModalTypes'
import { formatAmount } from '~/utils/formatAmount'
import { potValidators } from '~/validators'

export const AddToPotModal = ({ pot, onAddMoney }: AddToPotModalProps) => {
  const {
    data: { current: availableFunds },
  } = useBalance()

  const { values, setFieldValue, errors, validateField, validateAll } = useForm(
    {
      initialValues: {
        amountToAdd: '',
      },
      validators: {
        amountToAdd: (amount: string) =>
          potValidators.validateAmountToAdd(amount, availableFunds),
      },
    }
  )

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const allFieldsValid = validateAll()

    const normalizedAmount = Number(values.amountToAdd)

    if (allFieldsValid) {
      onAddMoney(normalizedAmount)
    }
  }

  const parsedAmount = useMemo(() => {
    const num = Number(values.amountToAdd)

    return isNaN(num) || num < 0 ? 0 : num
  }, [values.amountToAdd])

  const totalAmount = pot.total + parsedAmount

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

          <ProgressSection pot={pot} smallBar extraMoney={parsedAmount} />
        </div>

        <Input
          label={{
            showLabel: true,
            labelText: 'Amount to Add',
          }}
          input={{
            placeholder: 'e.g. 200',
            value: values.amountToAdd,
            onChange: (amount) => setFieldValue('amountToAdd', amount),
            onBlur: () => validateField('amountToAdd'),
          }}
          helperText={{
            showHelper: false,
          }}
          styles="flex-col"
          error={errors.amountToAdd}
          isNumberInput
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
