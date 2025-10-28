import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  DEMO_USER_ID,
  INITIAL_DEMO_POTS,
  INITIAL_DEMO_TRANSACTIONS,
} from '~/constants/demoData'
import { useAuth } from '~/hooks/useAuth'
import { useRateLimiter } from '~/hooks/useRateLimiter'
import { potService } from '~/services/potService'
import { transactionService } from '~/services/transactionService'
import type { Pot, PotInsert, PotUpdate, Transaction } from '~/types'

export function usePotMutations() {
  const { checkRateLimit } = useRateLimiter(40)

  const queryClient = useQueryClient()
  const { isDemoMode, demoOverrides, updateDemoData } = useAuth()

  const createPot = useMutation({
    mutationFn: async (data: PotInsert) => {
      if (!checkRateLimit()) {
        throw new Error('Too many requests. Please wait a moment.')
      }

      if (isDemoMode) {
        const currentPots =
          demoOverrides.pots ||
          (INITIAL_DEMO_POTS.map((pot, idx) => ({
            ...pot,
            id: idx + 1,
            user_id: DEMO_USER_ID,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })) as Pot[])

        const newPot = {
          ...data,
          id: Date.now(),
          user_id: DEMO_USER_ID,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as Pot

        updateDemoData('pots', [...currentPots, newPot])
        return newPot
      }

      return potService.create(data)
    },
    networkMode: 'offlineFirst',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pots'] })
    },
    onError: (error) => {
      console.error('Failed to create pot:', error.message)
    },
  })

  const updatePot = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: PotUpdate }) => {
      if (!checkRateLimit()) {
        throw new Error('Too many requests. Please wait a moment.')
      }

      if (isDemoMode) {
        const currentPots =
          demoOverrides.pots ||
          (INITIAL_DEMO_POTS.map((pot, idx) => ({
            ...pot,
            id: idx + 1,
            user_id: DEMO_USER_ID,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })) as Pot[])

        const updated = currentPots.map((pot) =>
          pot.id === id
            ? ({
                ...pot,
                ...updates,
                updated_at: new Date().toISOString(),
              } as Pot)
            : pot
        )

        updateDemoData('pots', updated)
        return updated.find((pot) => pot.id === id)!
      }

      return potService.update(id, updates)
    },
    networkMode: 'offlineFirst',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pots'] })
    },
    onError: (error) => {
      console.error('Failed to update pot:', error.message)
    },
  })

  const deletePot = useMutation({
    mutationFn: async (id: number) => {
      if (!checkRateLimit()) {
        throw new Error('Too many requests. Please wait a moment.')
      }

      if (isDemoMode) {
        const currentPots =
          demoOverrides.pots ||
          (INITIAL_DEMO_POTS.map((pot, idx) => ({
            ...pot,
            id: idx + 1,
            user_id: DEMO_USER_ID,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })) as Pot[])

        updateDemoData(
          'pots',
          currentPots.filter((pot) => pot.id !== id)
        )
        return
      }

      return potService.delete(id)
    },
    networkMode: 'offlineFirst',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pots'] })
    },
    onError: (error) => {
      console.error('Failed to delete pot:', error.message)
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
      if (!checkRateLimit()) {
        throw new Error('Too many requests. Please wait a moment.')
      }

      if (isDemoMode) {
        const transactionData = {
          name: `Main → ${potName}`,
          amount: -amount,
          category: 'Transfer' as const,
          transaction_type: 'transfer' as const,
          transaction_date: new Date().toISOString(),
          pot_id: id,
        }

        const newTransaction = {
          ...transactionData,
          id: Date.now(),
          user_id: DEMO_USER_ID,
          created_at: new Date().toISOString(),
          avatar_person: null,
          recurring: false,
        } as Transaction

        const currentTransactions =
          demoOverrides.transactions ||
          (INITIAL_DEMO_TRANSACTIONS.map((tr, idx) => ({
            ...tr,
            id: idx + 1,
            user_id: DEMO_USER_ID,
            created_at: new Date().toISOString(),
          })) as Transaction[])

        updateDemoData('transactions', [newTransaction, ...currentTransactions])

        const currentPots =
          demoOverrides.pots ||
          (INITIAL_DEMO_POTS.map((pot, idx) => ({
            ...pot,
            id: idx + 1,
            user_id: DEMO_USER_ID,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })) as Pot[])

        const updatedPots = currentPots.map((pot) =>
          pot.id === id
            ? ({
                ...pot,
                total: currentTotal + amount,
                updated_at: new Date().toISOString(),
              } as Pot)
            : pot
        )

        updateDemoData('pots', updatedPots)
      } else {
        await transactionService.create({
          name: `Main → ${potName}`,
          amount: -amount,
          category: 'Transfer',
          transaction_type: 'transfer',
          transaction_date: new Date().toISOString(),
          pot_id: id,
        })

        await potService.update(id, { total: currentTotal + amount })
      }
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
    onError: (error) => {
      console.error('Failed to add money to pot:', error.message)
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
      if (!checkRateLimit()) {
        throw new Error('Too many requests. Please wait a moment.')
      }

      if (isDemoMode) {
        const transactionData = {
          name: `${potName} → Main`,
          amount: amount,
          category: 'Transfer' as const,
          transaction_type: 'transfer' as const,
          transaction_date: new Date().toISOString(),
          pot_id: id,
        }

        const newTransaction = {
          ...transactionData,
          id: Date.now(),
          user_id: DEMO_USER_ID,
          created_at: new Date().toISOString(),
          avatar_person: null,
          recurring: false,
        } as Transaction

        const currentTransactions =
          demoOverrides.transactions ||
          (INITIAL_DEMO_TRANSACTIONS.map((tr, idx) => ({
            ...tr,
            id: idx + 1,
            user_id: DEMO_USER_ID,
            created_at: new Date().toISOString(),
          })) as Transaction[])

        updateDemoData('transactions', [newTransaction, ...currentTransactions])

        const currentPots =
          demoOverrides.pots ||
          (INITIAL_DEMO_POTS.map((pot, idx) => ({
            ...pot,
            id: idx + 1,
            user_id: DEMO_USER_ID,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })) as Pot[])

        const updatedPots = currentPots.map((pot) =>
          pot.id === id
            ? ({
                ...pot,
                total: currentTotal - amount,
                updated_at: new Date().toISOString(),
              } as Pot)
            : pot
        )

        updateDemoData('pots', updatedPots)
      } else {
        await transactionService.create({
          name: `${potName} → Main`,
          amount: amount,
          category: 'Transfer',
          transaction_type: 'transfer',
          transaction_date: new Date().toISOString(),
          pot_id: id,
        })

        await potService.update(id, { total: currentTotal - amount })
      }
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
    onError: (error) => {
      console.error('Failed to withdraw money from pot:', error.message)
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
