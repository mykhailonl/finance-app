import { BudgetSection } from '~/components/BudgetSection'
import { useTransactions } from '~/hooks/useTransactions'
import type { BudgetType } from '~/types/BudgetType'
import { filterByCategory } from '~/utils/filterByCategory'

type Props = {
  budgets: BudgetType[]
}

export const BudgetList = ({ budgets }: Props) => {
  const { data } = useTransactions()

  return (
    <div className="flex flex-col gap-6 grow">
      {budgets.map((budget) => {
        const { transactions: latestTransactions, spent } = filterByCategory({
          transactions: data.transactions,
          category: budget.category,
          latest: true,
        })

        return (
          <BudgetSection
            budget={budget}
            key={budget.category}
            transactions={latestTransactions}
            spentThisMonth={spent}
          />
        )
      })}
    </div>
  )
}
