import { BudgetChart } from '~/components/BudgetChart'
import { BudgetHero } from '~/components/BudgetHero'
import { BudgetList } from '~/components/BudgetList'
import { BudgetsHeader } from '~/components/BudgetsHeader'
import { Button } from '~/components/Button'
import { MonthSelector } from '~/components/MonthSelector'
import { NoContentFound } from '~/components/NoContentFound'
import { PageWrapper } from '~/components/PageWrapper'
import { SectionWrapper } from '~/components/SectionWrapper'
import useBudgets from '~/hooks/useBudgets'
import { useModal } from '~/hooks/useModal'
import { useSearchParamValue } from '~/hooks/useSearchParamValue'
import { useSetMultipleSearchParams } from '~/hooks/useSetMultipleSearchParams'
import { normalizePeriod } from '~/utils/normalizePeriod'

export default function Budgets() {
  const [month, setMonth] = useSearchParamValue('month')
  const [year] = useSearchParamValue('year')

  const period = normalizePeriod(month, year)

  const {
    data: {
      budgets,
      totalLimit,
      spentWithinBudgets,
      spentByCategory,
      latestTransactionsByCategory,
    },
  } = useBudgets(period)

  const { openModal } = useModal()
  const setMultipleParams = useSetMultipleSearchParams()

  const handlePrevMonth = () => {
    const normalizedMonth = Number(month)
    const normalizedYear = Number(year)

    if (normalizedMonth > 1) {
      setMonth(String(normalizedMonth - 1))
    } else {
      setMultipleParams({ year: String(normalizedYear - 1), month: '12' })
    }
  }

  const handleNextMonth = () => {
    const normalizedMonth = Number(month)
    const normalizedYear = Number(year)

    if (normalizedMonth <= 11) {
      setMonth(String(normalizedMonth + 1))
    } else {
      setMultipleParams({ year: String(normalizedYear + 1), month: '1' })
    }
  }

  const noBudgetsYet = !budgets.length

  return (
    <PageWrapper>
      <BudgetsHeader />

      {noBudgetsYet ? (
        <NoContentFound text="Set spending limits and monitor your progress with budgets.">
          <Button
            variant="primary"
            onClick={() => openModal({ type: 'budget-add' })}
            styles="max-w-[150px] p-4"
          >
            Add Budget
          </Button>
        </NoContentFound>
      ) : (
        <div className="flex flex-col gap-6 lg:flex-row">
          <SectionWrapper styles="gap-8 lg:w-[428px] lg:max-h-fit">
            <MonthSelector
              month={month}
              year={year}
              handleNextMonth={handleNextMonth}
              handlePrevMonth={handlePrevMonth}
            />

            <div className="flex flex-col md:flex-row lg:flex-col md:items-center gap-8">
              <div className="flex items-center justify-center relative w-full h-[300px] md:h-[250px] md:w-[250px] lg:w-[250px]">
                <BudgetChart
                  budgets={budgets}
                  limit={totalLimit}
                  spent={spentWithinBudgets}
                />
              </div>

              <BudgetHero budgets={budgets} categorySpent={spentByCategory} />
            </div>
          </SectionWrapper>

          <BudgetList
            budgets={budgets}
            latestTransactionsByCategory={latestTransactionsByCategory}
            spentByCategory={spentByCategory}
          />
        </div>
      )}
    </PageWrapper>
  )
}
