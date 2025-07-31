import { BudgetChart } from "~/components/BudgetChart"
import { InfoCard } from "~/components/InfoCard"
import { SectionTitleBlock } from "~/components/SectionTitleBlock"
import { SectionWrapper } from '~/components/SectionWrapper'
import type { ThemeColor } from "~/constants/theme"
import type { BudgetType } from "~/types/BudgetType"

type BudgetsProps = {
  budgets: BudgetType[]
}

export const Budgets = ({ budgets }: BudgetsProps) => {
  return (
    <SectionWrapper styles='grow gap-8'>
      <SectionTitleBlock title="Budgets" linkText="See Details" />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:py-2 lg:w-fit">
        <div className="flex items-center justify-center relative w-full h-[300px] md:h-[250px] md:w-[250px] lg:w-[250px] grow">
          <BudgetChart budgets={budgets} />
        </div>

        <div className="flex md:flex-col gap-4 flex-wrap">
          {budgets.slice(0, 4).map((budget, index) => (
            <InfoCard
              key={index}
              name={budget.category}
              amount={budget.maximum}
              color={budget.theme as ThemeColor}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}