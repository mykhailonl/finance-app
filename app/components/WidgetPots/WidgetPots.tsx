import { InfoCard } from '~/components/InfoCard'
import { SectionTitleBlock } from '~/components/SectionTitleBlock'
import { SectionWrapper } from '~/components/SectionWrapper'
import { SummaryCard } from '~/components/SummaryCard'
import usePots from '~/hooks/usePots'

export const WidgetPots = () => {
  const {
    data: { pots },
  } = usePots()

  const noPotsYet = !pots.length
  const totalSaved = pots.reduce((acc, curr) => acc + curr.total, 0)

  return (
    <SectionWrapper styles="min-h-[141px]">
      <SectionTitleBlock title="Pots" linkText="See Details" link="/pots" />

      {noPotsYet ? (
        <div className="flex items-center justify-center">
          <p className="text-preset-4 text-grey-500">
            Create your first pot to start saving!
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <SummaryCard
              cardTitle="Total Saved"
              cardValue={totalSaved}
              iconName="pot"
            />

            <div className="grid grid-cols-2 gap-4 grow">
              {pots.slice(0, 4).map((pot) => (
                <InfoCard
                  key={pot.id}
                  name={pot.name}
                  amount={pot.total}
                  color={pot.theme}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </SectionWrapper>
  )
}
