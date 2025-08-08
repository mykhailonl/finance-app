import { useSuspenseQuery } from '@tanstack/react-query'

import type { TransactionType } from '~/types/TransactionType'

type Props = {
  categories?: string[]
}

export const useTransactions = ({ categories }: Props = {}) => {
  return useSuspenseQuery({
    queryKey: ['transactions', categories ?? 'all'],
    queryFn: async () => {
      const baseUrl =
        typeof window !== 'undefined'
          ? window.location.origin
          : 'http://localhost:5173'

      const res = await fetch(`${baseUrl}/data/data.json`)
      const data = await res.json()

      const filteredByCategories = categories
        ? data.transactions.filter(
            (tr: TransactionType) =>
              categories.includes(tr.category) && tr.date.startsWith('2024-08')
          )
        : data.transactions.filter((tr: TransactionType) =>
            tr.date.startsWith('2024-08')
          )

      return {
        transactions: data.transactions,
        filteredByCategories,
      }
    },
  })
}
