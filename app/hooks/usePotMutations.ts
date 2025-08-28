import { useMutation, useQueryClient } from '@tanstack/react-query'

import { potService } from '~/services/potService'
import type { PotUpdate } from '~/types'

// todo optimistic updates? invalidate user balance?

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
    mutationFn: ({
      id,
      amount,
      currentTotal,
    }: {
      id: number
      amount: number
      currentTotal: number
    }) => potService.update(id, { total: currentTotal + amount }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pots'] })
      // TODO: Возможно нужно инвалидировать баланс пользователя
      // queryClient.invalidateQueries({ queryKey: ['user-balance-function'] })
      // TODO: toast.success('Money added to pot!')
    },
    onError: (error) => {
      console.error('Failed to add money to pot:', error)
      // TODO: toast.error('Failed to add money to pot')
    },
  })

  const withdrawMoneyFromPot = useMutation({
    mutationFn: ({
      id,
      amount,
      currentTotal,
    }: {
      id: number
      amount: number
      currentTotal: number
    }) => potService.update(id, { total: currentTotal - amount }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pots'] })
      // TODO: Возможно нужно инвалидировать баланс пользователя
      // queryClient.invalidateQueries({ queryKey: ['user-balance-function'] })
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
