import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts"

import {THEME_TO_HEX, type ThemeColor} from "~/constants/theme"
import type {BudgetType} from "~/types/BudgetType"

interface BudgetChartProps {
  budgets: BudgetType[],
}

export const BudgetChart = ({budgets}: BudgetChartProps) => {
  const totalLimit = budgets.reduce((sum, budget) => sum + budget.maximum, 0)

  return (
    <>
      <ResponsiveContainer width='100%' height='100%'>

        <PieChart>
          <Pie
            data={budgets}
            dataKey='maximum'
            label={false}
            innerRadius={90}
            outerRadius={120}
            stroke='none'
          >
            {budgets.map((budget, index) => (
              <Cell key={`cell-${index}`} fill={THEME_TO_HEX[budget.theme as ThemeColor]}/>
            ))}
          </Pie>

          <Pie
            data={budgets}
            dataKey='maximum'
            label={false}
            innerRadius={75}
            outerRadius={90}
            stroke='none'
          >
            {budgets.map((budget, index) => {
              const baseColor = THEME_TO_HEX[budget.theme as ThemeColor];
              const transparentColor = `${baseColor}75`

              return (
                <Cell key={`inner-${index}`} fill={transparentColor}/>
              );
            })}
          </Pie>
          <Tooltip/>
        </PieChart>


      </ResponsiveContainer>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-preset-1 text-grey-900">$338</p>
        <p className="text-preset-5 text-grey-500">of ${totalLimit} limit</p>
      </div>
    </>
  )
}