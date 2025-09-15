import type { Transaction, TransactionInsert, TransactionUpdate } from '~/types'
import supabase from '~/utils/supabase'

export const transactionService = {
  async getAll(): Promise<Transaction[]> {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('transaction_date', { ascending: false })

    if (error) {
      throw error
    }

    return data || []
  },

  async create(transaction: TransactionInsert): Promise<Transaction> {
    const { data, error } = await supabase
      .from('transactions')
      .insert(transaction)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  },

  async update(id: number, updates: TransactionUpdate): Promise<Transaction> {
    const { data, error } = await supabase
      .from('transactions')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  },

  async delete(id: number): Promise<void> {
    const { error } = await supabase.from('transactions').delete().eq('id', id)

    if (error) {
      throw error
    }
  },
}
