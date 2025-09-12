import { BudgetChart } from '~/components/BudgetChart'
import { BudgetHero } from '~/components/BudgetHero'
import { BudgetList } from '~/components/BudgetList'
import { BudgetsHeader } from '~/components/BudgetsHeader'
import { Button } from '~/components/Button'
import { PageWrapper } from '~/components/PageWrapper'
import { SectionWrapper } from '~/components/SectionWrapper'
import useBudgets from '~/hooks/useBudgets'
import { useModal } from '~/hooks/useModal'

export default function Budgets() {
  const {
    data: { budgets, totalLimit, spentWithinBudgets },
  } = useBudgets()
  const { openModal } = useModal()

  const noBudgetsYet = !budgets.length

  return (
    <PageWrapper>
      <BudgetsHeader />

      {noBudgetsYet ? (
        <div className="flex flex-col gap-6 justify-center items-center grow">
          <p className="text-preset-4 text-grey-500 self-center">
            Set spending limits and monitor your progress with budgets
          </p>

          <Button
            variant="primary"
            onClick={() => openModal({ type: 'budget-add' })}
            styles="max-w-[150px] p-4"
          >
            Add Budget
          </Button>
        </div>
      ) : (
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
      )}
    </PageWrapper>
  )
}
