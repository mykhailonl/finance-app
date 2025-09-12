import { BudgetChart } from '~/components/BudgetChart'
import { InfoCard } from '~/components/InfoCard'
import { SectionTitleBlock } from '~/components/SectionTitleBlock'
import { SectionWrapper } from '~/components/SectionWrapper'
import useBudgets from '~/hooks/useBudgets'

export const WidgetBudgets = () => {
  const {
    data: { budgets, totalLimit, spentWithinBudgets },
  } = useBudgets()

  const noBudgetsYet = !budgets.length

  return (
    <SectionWrapper styles="grow gap-8">
      <SectionTitleBlock
        title="Budgets"
        linkText="See Details"
        link="/budgets"
      />

      {noBudgetsYet ? (
        <div className="flex items-center justify-center">
          <p className="text-preset-4 text-grey-500">
            You haven&#39;t added any budgets.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:py-2 lg:w-fit">
          <div className="flex items-center justify-center relative w-full h-[300px] md:h-[250px] md:w-[250px] lg:w-[250px] grow">
            <BudgetChart
              budgets={budgets}
              spent={spentWithinBudgets}
              limit={totalLimit}
            />
          </div>

          <div className="flex md:flex-col gap-4 flex-wrap">
            {budgets.slice(0, 4).map((budget, index) => (
              <InfoCard
                key={index}
                name={budget.category}
                amount={budget.maximum}
                color={budget.theme}
              />
            ))}
          </div>
        </div>
      )}
    </SectionWrapper>
  )
}
