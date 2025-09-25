import { useSuspenseQuery } from '@tanstack/react-query'

import { CURRENT_MONTH } from '~/constants/dates'
import { useTransactions } from '~/hooks/useTransactions'
import type { Transaction } from '~/types'
import type { SortOption } from '~/types/DropdownType'
import type { TransactionListType } from '~/types/TransactionTypes'
import { extractTransactionDay } from '~/utils/extractTransactionDay'
import { filterByQuery } from '~/utils/filterByQuery'
import { paginate } from '~/utils/paginate'
import { sortTransactions } from '~/utils/sortTransactions'

interface UseRecurringTransactionsReturn {
  transactions: {
    transactions: TransactionListType
    amount: number
    totalFilteredCount: number
  }
  currentDay: number
  currentPage: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
  paidRecurring: {
    transactions: TransactionListType
    amount: number
    numberOfTransactions: number
  }
  upcomingRecurring: {
    transactions: TransactionListType
    amount: number
    numberOfTransactions: number
  }
  dueSoon: {
    transactions: TransactionListType
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
  const { data: transactions } = useTransactions()

  return useSuspenseQuery<UseRecurringTransactionsReturn>({
    queryKey: ['recurring', sortBy, page, query],
    queryFn: async () => {
      const recurringTransactions = transactions.filter(
        (transaction: Transaction) => transaction.recurring
      )

      const uniqueRecurring: TransactionListType = recurringTransactions.reduce(
        (acc: TransactionListType, tr: Transaction) => {
          if (!acc.find((item: Transaction) => item.name === tr.name)) {
            acc.push(tr)
          }
          return acc
        },
        []
      )

      const lastTransaction: Transaction = transactions.sort(
        (a: Transaction, b: Transaction) =>
          new Date(b?.transaction_date).getTime() -
          new Date(a?.transaction_date).getTime()
      )[0]

      const currentDay = new Date(lastTransaction?.transaction_date).getDate()

      const alreadyPaidThisMonth = {
        transactions: uniqueRecurring.filter((transaction: Transaction) => {
          return transactions.some(
            (tr: Transaction) =>
              tr.name === transaction.name &&
              tr.recurring &&
              tr.transaction_date.startsWith(CURRENT_MONTH)
          )
        }),
      }

      const upcomingRecurring = {
        transactions: uniqueRecurring.filter((transaction: Transaction) => {
          const isPaid = alreadyPaidThisMonth.transactions.find(
            (tr) => transaction.name === tr.name
          )

          return !isPaid
        }),
      }

      const dueSoon = {
        transactions: upcomingRecurring.transactions.filter(
          (transaction: Transaction) => {
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
      const paginationResult = paginate(filtered, page, 10)

      return {
        transactions: {
          transactions: paginationResult.items,
          amount: uniqueRecurring.reduce(
            (acc, tr) => acc + Math.abs(tr.amount),
            0
          ),
          totalFilteredCount: paginationResult.items.length,
        },
        currentDay,
        currentPage: paginationResult.currentPage,
        totalPages: paginationResult.totalPages,
        hasNext: paginationResult.hasNext,
        hasPrev: paginationResult.hasPrev,
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
