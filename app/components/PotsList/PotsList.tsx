import { Pot } from '~/components/Pot'
import type { Pot as PotType } from '~/types'

type Props = {
  pots: PotType[]
}

export const PotsList = ({ pots }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {pots.map((el) => (
        <Pot key={el.name} pot={el} />
      ))}
    </div>
  )
}
