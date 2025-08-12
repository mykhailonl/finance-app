import { useSuspenseQuery } from '@tanstack/react-query'

import type { SortOption } from '~/types/DropdownType'
import type { TransactionType } from '~/types/TransactionType'
import { extractTransactionDay } from '~/utils/extractTransactionDay'
import { filterByQuery } from '~/utils/filterByQuery'
import { sortTransactions } from '~/utils/sortTransactions'

interface UseRecurringTransactionsReturn {
  transactions: {
    transactions: TransactionType[]
    amount: number
  }
  currentDay: number
  totalPages: number
  paidRecurring: {
    transactions: TransactionType[]
    amount: number
    numberOfTransactions: number
  }
  upcomingRecurring: {
    transactions: TransactionType[]
    amount: number
    numberOfTransactions: number
  }
  dueSoon: {
    transactions: TransactionType[]
    amount: number
    numberOfTransactions: number
  }
}

type Params = {
  sortBy: SortOption
  page: number
  query: string
}

export const useRecurringTransactions = ({ sortBy, page, query }: Params) => {
  return useSuspenseQuery<UseRecurringTransactionsReturn>({
    queryKey: ['recurring', sortBy, page, query],
    queryFn: async () => {
      const baseUrl =
        typeof window !== 'undefined'
          ? window.location.origin
          : 'http://localhost:5173'

      const res = await fetch(`${baseUrl}/data/data.json`)
      const data = await res.json()

      const uniqueRecurring: TransactionType[] = data.transactions
        .filter((transaction: TransactionType) => transaction.recurring)
        .reduce((acc: TransactionType[], tr: TransactionType) => {
          if (!acc.find((item: TransactionType) => item.name === tr.name)) {
            acc.push(tr)
          }

          return acc
        }, [])

      const lastTransaction: TransactionType = data.transactions.sort(
        (a: TransactionType, b: TransactionType) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0]

      const currentMonth = '2025-08'
      const currentDay = new Date(lastTransaction.date).getDate()

      const alreadyPaidThisMonth = {
        transactions: uniqueRecurring.filter((transaction: TransactionType) => {
          return data.transactions.some(
            (tr: TransactionType) =>
              tr.name === transaction.name &&
              tr.recurring &&
              tr.date.startsWith(currentMonth)
          )
        }),
      }

      const upcomingRecurring = {
        transactions: uniqueRecurring.filter((transaction: TransactionType) => {
          const isPaid = alreadyPaidThisMonth.transactions.find(
            (tr) => transaction.name === tr.name
          )

          return !isPaid
        }),
      }

      const dueSoon = {
        transactions: upcomingRecurring.transactions.filter(
          (transaction: TransactionType) => {
            const transactionDayOfTheMonth = extractTransactionDay(transaction)

            return (
              transactionDayOfTheMonth > currentDay &&
              transactionDayOfTheMonth <= currentDay + 5
            )
          }
        ),
      }

      const sortedTransactions = sortTransactions(uniqueRecurring, sortBy, true)
      const filtered = filterByQuery(sortedTransactions, query)

      const start = (page - 1) * 10
      const end = page * 10

      return {
        transactions: {
          transactions: filtered.slice(start, end),
          amount: uniqueRecurring.reduce(
            (acc, tr) => acc + Math.abs(tr.amount),
            0
          ),
        },
        currentDay,
        totalPages: Math.ceil(sortedTransactions.length / 10),
        paidRecurring: {
          transactions: alreadyPaidThisMonth.transactions,
          amount: alreadyPaidThisMonth.transactions.reduce(
            (acc, tr) => acc + Math.abs(tr.amount),
            0
          ),
          numberOfTransactions: alreadyPaidThisMonth.transactions.length,
        },
        upcomingRecurring: {
          transactions: upcomingRecurring.transactions,
          amount: upcomingRecurring.transactions.reduce(
            (acc, tr) => acc + Math.abs(tr.amount),
            0
          ),
          numberOfTransactions: upcomingRecurring.transactions.length,
        },
        dueSoon: {
          transactions: dueSoon.transactions,
          amount: dueSoon.transactions.reduce(
            (acc, tr) => acc + Math.abs(tr.amount),
            0
          ),
          numberOfTransactions: dueSoon.transactions.length,
        },
      }
    },
  })
}
