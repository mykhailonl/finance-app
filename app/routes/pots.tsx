import { Button } from '~/components/Button'
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
        <div className="flex flex-col gap-6 justify-center items-center grow">
          <p className="text-preset-4 text-grey-500 self-center">
            Create your first pot to start saving!
          </p>

          <Button
            variant="primary"
            onClick={() => openModal({ type: 'pot-add' })}
            styles="max-w-[150px] p-4"
          >
            Add Pot
          </Button>
        </div>
      ) : (
        <PotsList pots={pots} />
      )}
    </PageWrapper>
  )
}
