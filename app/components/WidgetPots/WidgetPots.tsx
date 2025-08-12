import { InfoCard } from '~/components/InfoCard'
import { SectionTitleBlock } from '~/components/SectionTitleBlock'
import { SectionWrapper } from '~/components/SectionWrapper'
import { SummaryCard } from '~/components/SummaryCard'
import type { ThemeColor } from '~/constants/theme'
import type { PotType } from '~/types/PotType'

type PotsProps = {
  pots: PotType[]
}

export const WidgetPots = ({ pots }: PotsProps) => {
  const totalSaved = pots.reduce((acc, curr) => acc + curr.total, 0)

  return (
    <SectionWrapper>
      <SectionTitleBlock title="Pots" linkText="See Details" link="/pots" />

      <div className="flex flex-col gap-5 md:flex-row md:items-center">
        <SummaryCard
          cardTitle="Total Saved"
          cardValue={totalSaved}
          iconName="pot"
        />

        <div className="grid grid-cols-2 gap-4 grow">
          {pots.slice(0, 4).map((pot, index) => (
            <InfoCard
              key={index}
              name={pot.name}
              amount={pot.total}
              color={pot.theme as ThemeColor}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
