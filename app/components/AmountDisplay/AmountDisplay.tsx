interface AmountDisplayProps {
  fieldName: string
  fieldValue: string
}

export const AmountDisplay = ({
  fieldName,
  fieldValue,
}: AmountDisplayProps) => {
  return (
    <div className="flex justify-between items-center">
      <p className="text-preset-4 text-grey-500">{fieldName}</p>

      <h1 className="text-preset-1 text-grey-900">{fieldValue}</h1>
    </div>
  )
}
