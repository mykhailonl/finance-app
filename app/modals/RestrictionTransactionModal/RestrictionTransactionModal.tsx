import { useNavigate } from 'react-router'

import { Button } from '~/components/Button'
import { ModalDescription } from '~/components/ModalDescription'
import { ModalTitle } from '~/components/ModalTitle'
import { SectionWrapper } from '~/components/SectionWrapper'
import type { RestrictionTransactionModalProps } from '~/types/TransactionModalTypes'

export const RestrictionTransactionModal = ({
  onClose,
}: RestrictionTransactionModalProps) => {
  const navigate = useNavigate()

  return (
    <SectionWrapper styles="min-w-[335px] md:w-[560px]">
      <ModalTitle title="Transaction Protection" />

      <ModalDescription
        text="
          Transfer transactions maintain the integrity between your main account and savings pots. Direct editing could cause
          balance inconsistencies.
        "
      />

      <ModalDescription text="Please use pot management tools for any adjustments." />

      <div className="flex gap-5">
        <Button
          variant="primary"
          onClick={() => {
            navigate('/pots')
            onClose()
          }}
          styles="p-4 grow"
        >
          Manage Pots
        </Button>

        <Button variant="secondary" onClick={onClose} styles="p-4 grow">
          No, Go Back
        </Button>
      </div>
    </SectionWrapper>
  )
}
