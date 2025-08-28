import { BudgetChart } from '~/components/BudgetChart'
import { BudgetHero } from '~/components/BudgetHero'
import { BudgetList } from '~/components/BudgetList'
import { BudgetsHeader } from '~/components/BudgetsHeader'
import { PageWrapper } from '~/components/PageWrapper'
import { SectionWrapper } from '~/components/SectionWrapper'
import useBudgets from '~/hooks/useBudgets'

// todo move h2 spending summary to component

export default function Budgets() {
  const {
    data: { budgets, totalLimit, spentWithinBudgets },
  } = useBudgets()

  return (
    <PageWrapper>
      <BudgetsHeader />

      <div className="flex flex-col gap-6 lg:flex-row">
        <SectionWrapper styles="gap-8 md:flex-row lg:flex-col lg:w-[428px] md:items-center lg:max-h-fit">
          <div className="flex items-center justify-center relative w-full h-[300px] md:h-[250px] md:w-[250px] lg:w-[250px]">
            <BudgetChart
              budgets={budgets}
              limit={totalLimit}
              spent={spentWithinBudgets}
            />
          </div>

          <div className="flex flex-col gap-6 grow lg:self-stretch">
            <h2 className="text-preset-2 text-grey-900">Spending Summary</h2>

            <BudgetHero budgets={budgets} />
          </div>
        </SectionWrapper>

        <BudgetList />
      </div>
    </PageWrapper>
  )
}
