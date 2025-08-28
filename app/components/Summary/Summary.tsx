import { SummaryCard } from '~/components/SummaryCard'
import { useBalance } from '~/hooks/useBalance'

export const Summary = () => {
  const {
    data: { current, income, expenses },
  } = useBalance()

  return (
    <div className="flex flex-col gap-3 md:flex-row md:gap-6">
      <SummaryCard cardTitle="Current Balance" cardValue={current} mainCard />

      <SummaryCard cardTitle="Income" cardValue={income} />

      <SummaryCard cardTitle="Expenses" cardValue={expenses} />
    </div>
  )
}
