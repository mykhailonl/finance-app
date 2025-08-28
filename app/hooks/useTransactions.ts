import { useSuspenseQuery } from '@tanstack/react-query'

import { transactionService } from '~/services/transactionService'

export const useTransactions = () => {
  return useSuspenseQuery({
    queryKey: ['transactions'],
    queryFn: transactionService.getAll,
    staleTime: 5 * 60 * 1000,
  })
}
