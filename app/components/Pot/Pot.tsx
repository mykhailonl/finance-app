import { Button } from '~/components/Button'
import { ProgressBar } from '~/components/ProgressBar'
import { SectionHeader } from '~/components/SectionHeader'
import { SectionWrapper } from '~/components/SectionWrapper'
import type { PotType } from '~/types/PotType'
import { formatAmount } from '~/utils/formatAmount'

type Props = {
  pot: PotType
}

export const Pot = ({ pot }: Props) => {
  const formattedSaved = formatAmount(pot.total)
  const formattedTarget = formatAmount(pot.target)
  const savedPercent = (pot.total / pot.target) * 100

  return (
    <SectionWrapper styles="gap-8">
      <SectionHeader color={pot.theme} name={pot.name} />

      <div className="flex flex-col gap-4 my-2">
        <div className="flex justify-between items-center">
          <p className="text-preset-4 text-grey-500">Total Saved</p>

          <h1 className="text-preset-1 text-grey-900">{formattedSaved}</h1>
        </div>

        <div className="flex flex-col gap-4">
          <ProgressBar
            color={pot.theme}
            percent={Math.round(savedPercent)}
            small
          />

          <div className="flex gap-1 text-grey-500">
            <p className="grow text-preset-5-bold">
              {savedPercent.toFixed(1)}%
            </p>

            <p className="grow text-preset-5 text-right">
              Target of {formattedTarget}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-4 md:mb-0">
        <Button
          variant="secondary"
          onClick={() => console.log('clicked add money in the pot')}
          styles="p-4 grow"
        >
          Add Money
        </Button>

        <Button
          variant="secondary"
          onClick={() => console.log('clicked withdraw money in the pot')}
          styles="p-4 grow"
        >
          Withdraw
        </Button>
      </div>
    </SectionWrapper>
  )
}
