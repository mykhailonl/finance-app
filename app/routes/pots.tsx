import { Button } from '~/components/Button'
import { NoContentFound } from '~/components/NoContentFound'
import { PageWrapper } from '~/components/PageWrapper'
import { PotsHeader } from '~/components/PotsHeader'
import { PotsList } from '~/components/PotsList'
import { useModal } from '~/hooks/useModal'
import usePots from '~/hooks/usePots'

export default function Pots() {
  const {
    data: { pots },
  } = usePots()
  const { openModal } = useModal()

  const noPotsYet = !pots.length

  return (
    <PageWrapper>
      <PotsHeader />

      {noPotsYet ? (
        <NoContentFound text="Create your first pot to start saving">
          <Button
            variant="primary"
            onClick={() => openModal({ type: 'pot-add' })}
            styles="max-w-[150px] p-4"
          >
            Add Pot
          </Button>
        </NoContentFound>
      ) : (
        <PotsList pots={pots} />
      )}
    </PageWrapper>
  )
}
