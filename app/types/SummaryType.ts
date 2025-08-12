export type SummaryLabel = 'Paid Bills' | 'Total Upcoming' | 'Due soon'

export interface SummaryItemType {
  label: SummaryLabel
  value: string
  amountOfTransactions: number
}
