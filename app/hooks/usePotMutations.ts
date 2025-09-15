import { useMutation, useQueryClient } from '@tanstack/react-query'

import { potService } from '~/services/potService'
import { transactionService } from '~/services/transactionService'
import type { PotUpdate } from '~/types'

// todo optimistic updates?

export function usePotMutations() {
  const queryClient = useQueryClient()

  const createPot = useMutation({
    mutationFn: potService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pots'] })
      // TODO: toast.success('Pot created!')
    },
    onError: (error) => {
      console.error('Failed to create pot:', error)
      // TODO: toast.error('Failed to create pot')
    },
  })

  const updatePot = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: PotUpdate }) =>
      potService.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pots'] })
      // TODO: toast.success('Pot updated!')
    },
    onError: (error) => {
      console.error('Failed to update pot:', error)
      // TODO: toast.error('Failed to update pot')
    },
  })

  const deletePot = useMutation({
    mutationFn: potService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pots'] })
      // TODO: toast.success('Pot deleted!')
    },
    onError: (error) => {
      console.error('Failed to delete pot:', error)
      // TODO: toast.error('Failed to delete pot')
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
        name: `Transfer to ${potName}`,
        amount: -amount,
        category: 'Transfer',
        transaction_type: 'transfer',
        transaction_date: new Date().toISOString(),
        pot_id: id,
      })

      await potService.update(id, { total: currentTotal + amount })
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['pots'] }),
        queryClient.invalidateQueries({
          queryKey: ['user-balance-function'],
        }),
        queryClient.invalidateQueries({ queryKey: ['transactions'] }),
      ])
      // TODO: toast.success('Money added to pot!')
    },
    onError: (error) => {
      console.error('Failed to add money to pot:', error)
      // TODO: toast.error('Failed to add money to pot')
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
        name: `Withdraw from ${potName}`,
        amount: amount,
        category: 'Transfer',
        transaction_type: 'transfer',
        transaction_date: new Date().toISOString(),
        pot_id: id,
      })

      await potService.update(id, { total: currentTotal - amount })
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['pots'] }),
        queryClient.invalidateQueries({
          queryKey: ['user-balance-function'],
        }),
        queryClient.invalidateQueries({ queryKey: ['transactions'] }),
      ])
      // TODO: toast.success('Money withdrawn from pot!')
    },
    onError: (error) => {
      console.error('Failed to withdraw money from pot:', error)
      // TODO: toast.error('Failed to withdraw money from pot')
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
