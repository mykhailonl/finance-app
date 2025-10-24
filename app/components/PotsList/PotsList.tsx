import { Pot } from '~/components/Pot'
import { useTransactions } from '~/hooks/useTransactions'
import type { Pot as PotType } from '~/types'

type Props = {
  pots: PotType[]
}

export const PotsList = ({ pots }: Props) => {
  const { data: transactions } = useTransactions()

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {pots.map((el) => {
        const potTransactions = transactions
          .filter(
            (tr) => tr.transaction_type === 'transfer' && tr.pot_id === el.id
          )
          .sort(
            (a, b) =>
              new Date(b.transaction_date).getTime() -
              new Date(a.transaction_date).getTime()
          )
          .slice(0, 1)

        return <Pot key={el.name} pot={el} transactions={potTransactions} />
      })}
    </div>
  )
}
