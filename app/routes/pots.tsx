import { PageWrapper } from '~/components/PageWrapper'
import { PotsHeader } from '~/components/PotsHeader'
import { PotsList } from '~/components/PotsList'
import usePots from '~/hooks/usePots'

export default function Pots() {
  const {
    data: { pots },
  } = usePots()

  return (
    <PageWrapper>
      <PotsHeader />

      <PotsList pots={pots} />
    </PageWrapper>
  )
}
