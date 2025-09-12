import { AmountDisplay } from '~/components/AmountDisplay'
import { Button } from '~/components/Button'
import { ProgressSection } from '~/components/ProgressSection'
import { SectionHeader } from '~/components/SectionHeader'
import { SectionWrapper } from '~/components/SectionWrapper'
import { useModal } from '~/hooks/useModal'
import type { Pot as PotType } from '~/types'
import { formatAmount } from '~/utils/formatAmount'

type Props = {
  pot: PotType
}

export const Pot = ({ pot }: Props) => {
  const { openModal } = useModal()

  const formattedSaved = formatAmount(pot.total)

  return (
    <SectionWrapper styles="gap-8">
      <SectionHeader item={pot} />

      <div className="flex flex-col gap-4 my-2">
        <AmountDisplay fieldName="Total Saved" fieldValue={formattedSaved} />

        <ProgressSection pot={pot} smallBar />
      </div>

      <div className="flex gap-4 mb-4 md:mb-0">
        <Button
          variant="secondary"
          onClick={() => openModal({ type: 'pot-add-money', pot })}
          styles="p-4 grow"
        >
          Add Money
        </Button>

        <Button
          variant="secondary"
          onClick={() => openModal({ type: 'pot-withdraw-money', pot })}
          styles="p-4 grow"
        >
          Withdraw
        </Button>
      </div>
    </SectionWrapper>
  )
}
