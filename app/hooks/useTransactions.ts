import { useSuspenseQuery } from '@tanstack/react-query'

import { useAuth } from '~/hooks/useAuth'
import { transactionService } from '~/services/transactionService'

export const useTransactions = () => {
  const { user } = useAuth()

  return useSuspenseQuery({
    queryKey: ['transactions', user?.id],
    queryFn: transactionService.getAll,
    networkMode: 'offlineFirst',
    staleTime: 5 * 60 * 1000,
  })
}
