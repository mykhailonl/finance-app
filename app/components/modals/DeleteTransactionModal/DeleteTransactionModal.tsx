import { Button } from '~/components/Button'
import { ModalDescription } from '~/components/ModalDescription'
import { ModalTitle } from '~/components/ModalTitle'
import { SectionWrapper } from '~/components/SectionWrapper'
import type { DeleteTransactionModalProps } from '~/types/TransactionModalTypes'

export const DeleteTransactionModal = ({
  transactionName,
  onDelete,
  onClose,
}: DeleteTransactionModalProps) => {
  return (
    <SectionWrapper styles="min-w-[335px] md:w-[560px]">
      <ModalTitle title={`Delete '${transactionName}'?`} />

      <ModalDescription text="Are you sure you want to delete this transaction? This action cannot be reversed, and all the data inside it will be removed forever." />

      <div className="flex flex-col gap-5">
        <Button variant="danger" onClick={onDelete} styles="p-4">
          Yes, Confirm Deletion
        </Button>

        <Button variant="tertiary" onClick={onClose} styles="self-center">
          No, Go Back
        </Button>
      </div>
    </SectionWrapper>
  )
}
