import type { Budget, BudgetInsert, BudgetUpdate } from '~/types'
import supabase from '~/utils/supabase'

export const budgetService = {
  async getAll(): Promise<Budget[]> {
    const { data, error } = await supabase
      .from('budgets')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      throw error
    }

    return data || []
  },

  async create(budget: BudgetInsert): Promise<Budget> {
    const { data, error } = await supabase
      .from('budgets')
      .insert(budget)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  },

  async update(id: number, updates: BudgetUpdate): Promise<Budget> {
    const { data, error } = await supabase
      .from('budgets')
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
    const { error } = await supabase.from('budgets').delete().eq('id', id)

    if (error) {
      throw error
    }
  },
}
