import { BudgetSection } from '~/components/BudgetSection'
import type { BudgetListProps } from '~/types/BudgetTypes'

export const BudgetList = ({
  budgets,
  latestTransactionsByCategory,
  spentByCategory,
}: BudgetListProps) => {
  return (
    <div className="flex flex-col gap-6 grow">
      {budgets.map((budget) => {
        const categoryTransactions =
          latestTransactionsByCategory[budget.category]
        const categorySpending = spentByCategory[budget.category]

        return (
          <BudgetSection
            budget={budget}
            key={budget.category}
            transactions={categoryTransactions}
            spentThisMonth={categorySpending}
          />
        )
      })}
    </div>
  )
}
