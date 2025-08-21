import { Button } from '~/components/Button'
import { PageTitle } from '~/components/PageTitle'
import { useModal } from '~/hooks/useModal'

export const PotsHeader = () => {
  const { openModal } = useModal()

  return (
    <div className="flex justify-between items-center">
      <PageTitle title="Pots" />

      <Button
        variant="primary"
        onClick={() => openModal('pot-add')}
        styles="p-4"
      >
        Add New Pot
      </Button>
    </div>
  )
}
