import { useMutation, useQueryClient } from '@tanstack/react-query'

import { potService } from '~/services/potService'
import { transactionService } from '~/services/transactionService'
import type { PotUpdate } from '~/types'

// todo optimistic updates?

export function usePotMutations() {
  const queryClient = useQueryClient()

  const createPot = useMutation({
    mutationFn: potService.create,
    networkMode: 'offlineFirst',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pots'] })
    },
  })

  const updatePot = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: PotUpdate }) =>
      potService.update(id, updates),
    networkMode: 'offlineFirst',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pots'] })
    },
  })

  const deletePot = useMutation({
    mutationFn: potService.delete,
    networkMode: 'offlineFirst',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pots'] })
    },
  })

  const addMoneyToPot = useMutation({
    mutationFn: async ({
      id,
      amount,
      currentTotal,
      potName,
    }: {
      id: number
      amount: number
      currentTotal: number
      potName: string
    }) => {
      await transactionService.create({
        name: `Main → ${potName}`,
        amount: -amount,
        category: 'Transfer',
        transaction_type: 'transfer',
        transaction_date: new Date().toISOString(),
        pot_id: id,
      })

      await potService.update(id, { total: currentTotal + amount })
    },
    networkMode: 'offlineFirst',
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['pots'] }),
        queryClient.invalidateQueries({
          queryKey: ['user-balance-function'],
        }),
        queryClient.invalidateQueries({ queryKey: ['transactions'] }),
      ])
    },
  })

  const withdrawMoneyFromPot = useMutation({
    mutationFn: async ({
      id,
      amount,
      currentTotal,
      potName,
    }: {
      id: number
      amount: number
      currentTotal: number
      potName: string
    }) => {
      await transactionService.create({
        name: `${potName} → Main`,
        amount: amount,
        category: 'Transfer',
        transaction_type: 'transfer',
        transaction_date: new Date().toISOString(),
        pot_id: id,
      })

      await potService.update(id, { total: currentTotal - amount })
    },
    networkMode: 'offlineFirst',
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['pots'] }),
        queryClient.invalidateQueries({
          queryKey: ['user-balance-function'],
        }),
        queryClient.invalidateQueries({ queryKey: ['transactions'] }),
      ])
    },
  })

  return {
    createPot,
    updatePot,
    deletePot,
    addMoneyToPot,
    withdrawMoneyFromPot,
  }
}
