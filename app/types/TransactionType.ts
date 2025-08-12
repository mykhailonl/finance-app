export interface TransactionType {
  avatar: string
  name: string
  category: string
  date: string
  amount: number
  recurring: boolean
}

export type TransactionStatus = 'paid' | 'due' | 'upcoming'
