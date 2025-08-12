import { BudgetChart } from '~/components/BudgetChart'
import { BudgetHero } from '~/components/BudgetHero'
import { BudgetList } from '~/components/BudgetList'
import { BudgetsHeader } from '~/components/BudgetsHeader'
import { PageWrapper } from '~/components/PageWrapper'
import { SectionWrapper } from '~/components/SectionWrapper'
import useBudgets from '~/hooks/useBudgets'
import { useTransactions } from '~/hooks/useTransactions'
import type { TransactionType } from '~/types/TransactionType'

export default function Budgets() {
  const { data } = useBudgets()
  const {
    data: { filteredByCategories },
  } = useTransactions({ categories: data.budgetCategories })

  const spentWithinBudgets: number = filteredByCategories
    .filter((tr: TransactionType) => tr.date.startsWith('2025-08'))
    .reduce((sum: number, tr: TransactionType) => sum + Math.abs(tr.amount), 0)

  return (
    <PageWrapper>
      <BudgetsHeader />

      <div className="flex flex-col gap-6 lg:flex-row">
        <SectionWrapper styles="gap-8 md:flex-row lg:flex-col lg:w-[428px] lg:items-center lg:max-h-fit">
          <div className="flex items-center justify-center relative w-full h-[300px] md:h-[250px] md:w-[250px] lg:w-[250px]">
            <BudgetChart
              budgets={data.budgets}
              limit={data.totalLimit}
              spent={spentWithinBudgets}
            />
          </div>

          <BudgetHero
            budgets={data.budgets}
            transactions={filteredByCategories}
          />
        </SectionWrapper>

        <BudgetList budgets={data.budgets} />
      </div>
    </PageWrapper>
  )
}
