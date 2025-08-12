import type { TransactionType } from '~/types/TransactionType'

type Props = {
  transactions: TransactionType[]
  category: string
  latest?: boolean
}

// todo change year in DB to 2025 on all transactions

export const filterByCategory = ({
  transactions,
  category,
  latest = false,
}: Props) => {
  const filtered = transactions.filter(
    (transaction) =>
      transaction.category === category &&
      transaction.date.startsWith('2025-08')
  )

  const spentWithinCategory = filtered.reduce(
    (acc, tr) => acc + Math.abs(tr.amount),
    0
  )

  const latestTransactions = [...filtered].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return {
    transactions: latest ? latestTransactions.slice(0, 3) : filtered,
    spent: spentWithinCategory,
  }
}
