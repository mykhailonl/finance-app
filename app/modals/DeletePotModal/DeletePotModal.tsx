import { Button } from '~/components/Button'
import { ModalDescription } from '~/components/ModalDescription'
import { ModalTitle } from '~/components/ModalTitle'
import { SectionWrapper } from '~/components/SectionWrapper'
import type { DeletePotModalProps } from '~/types/PotModalTypes'

export const DeletePotModal = ({
  potName,
  onDelete,
  onClose,
}: DeletePotModalProps) => {
  return (
    <SectionWrapper styles="min-w-[335px] md:w-[560px]">
      <ModalTitle title={`Delete '${potName}'?`} />

      <ModalDescription text="Are you sure you want to delete this pot? The remaining funds will be returned to your main balance." />

      <div className="flex flex-col md:flex-row gap-3">
        <Button variant="danger" onClick={onDelete} styles="p-4 grow">
          Yes, Confirm Deletion
        </Button>

        <Button variant="secondary" onClick={onClose} styles="p-4 grow">
          No, Go Back
        </Button>
      </div>
    </SectionWrapper>
  )
}
