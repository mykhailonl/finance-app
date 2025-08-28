import { BudgetSection } from '~/components/BudgetSection'
import useBudgets from '~/hooks/useBudgets'
import type { Budget } from '~/types'

export const BudgetList = () => {
  const {
    data: { budgets, latestTransactionsByCategory, spentByCategory },
  } = useBudgets()

  return (
    <div className="flex flex-col gap-6 grow">
      {budgets.map((budget: Budget) => (
        <BudgetSection
          budget={budget}
          key={budget.category}
          transactions={latestTransactionsByCategory[budget.category] || []}
          spentThisMonth={spentByCategory[budget.category] || 0}
        />
      ))}
    </div>
  )
}
