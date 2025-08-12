import cn from 'classnames'

type BillType = 'paid' | 'upcoming' | 'soon'

type Props = {
  type: BillType
  value: string
}

export const RecurringBillItem = ({ type, value }: Props) => {
  const tagValue: Record<BillType, string> = {
    paid: 'Paid Bills',
    upcoming: 'Total Upcoming',
    soon: 'Due Soon',
  }

  const borderColor: Record<BillType, string> = {
    paid: 'border-l-green',
    upcoming: 'border-l-yellow',
    soon: 'border-l-cyan',
  }

  const borderStyle = borderColor[type]

  return (
    <div
      className={cn(
        borderStyle,
        'flex px-4 py-5 rounded-lg self-stretch justify-between bg-beige-100 border-l-4'
      )}
    >
      <p className="text-preset-4 text-grey-500">{tagValue[type]}</p>

      <p className="text-preset-4-bold text-grey-900">{value}</p>
    </div>
  )
}
