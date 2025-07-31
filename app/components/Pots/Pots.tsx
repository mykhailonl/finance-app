import { InfoCard } from "~/components/InfoCard"
import { SectionTitleBlock } from "~/components/SectionTitleBlock"
import { SectionWrapper } from '~/components/SectionWrapper'
import type { ThemeColor } from "~/constants/theme"
import { iconComponents } from "~/types/IconType"
import type { PotType } from "~/types/PotType"

type PotsProps = {
  pots: PotType[],
}

export const Pots = ({ pots }: PotsProps) => {
  const IconPot = iconComponents['pot']
  const totalSaved = pots.reduce((acc, curr) => acc + curr.total, 0)

  return (
    <SectionWrapper styles=''>
      <SectionTitleBlock title='Pots' linkText='See Details' />

      <div className='flex flex-col gap-5 md:flex-row md:items-center'>
        <div className='flex flex-col gap-5 md:min-w-[247px]'>
          <div className='flex gap-4 p-4 rounded-xl bg-beige-100 items-center'>
            <IconPot className='w-10 h-10'/>

            <div className='flex flex-col gap-3 py-1'>
              <p className='text-grey-500 text-preset-4'>Total Saved</p>

              <p className='text-preset-1 text-grey-900'>{`$${totalSaved}`}</p>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4 grow'>
          {pots.slice(0,4).map((pot, index) => (
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