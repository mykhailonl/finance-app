import { SummaryCard } from '~/components/SummaryCard'

type SummaryProps = {
  current: number
  income: number
  expenses: number
}

export const Summary = ({ balanceData }: { balanceData: SummaryProps }) => {
  const { current, income, expenses } = balanceData

  return (
    <div className="flex flex-col gap-3 md:flex-row md:gap-6">
      <SummaryCard cardTitle="Current Balance" cardValue={current} mainCard />

      <SummaryCard cardTitle="Income" cardValue={income} />

      <SummaryCard cardTitle="Expenses" cardValue={expenses} />
    </div>
  )
}
