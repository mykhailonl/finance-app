import { PaginationButton } from '~/components/PaginationButton'
import { getMonthName } from '~/utils/getMonthName'

type MonthSelectorProps = {
  month: string
  year: string
  handleNextMonth: () => void
  handlePrevMonth: () => void
}

export const MonthSelector = ({
  month,
  year,
  handleNextMonth,
  handlePrevMonth,
}: MonthSelectorProps) => {
  const monthName = getMonthName(+month)

  return (
    <div className="flex self-stretch items-center justify-between">
      <p className="text-preset-4-bold text-grey-900">
        {monthName}, {year}
      </p>

      <div className="flex items-center gap-2">
        <PaginationButton
          role="prev"
          disabled={false}
          onClick={handlePrevMonth}
        />

        <PaginationButton
          role="next"
          disabled={false}
          onClick={handleNextMonth}
        />
      </div>
    </div>
  )
}
