import type { Pot, PotInsert, PotUpdate } from '~/types'
import supabase from '~/utils/supabase'

export const potService = {
  async getAll(): Promise<Pot[]> {
    const { data, error } = await supabase.from('pots').select('*')

    if (error) {
      throw error
    }

    return data || []
  },

  async getById(id: number): Promise<Pot> {
    const { data, error } = await supabase
      .from('pots')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      throw error
    }

    if (!data) {
      throw new Error(`Pot with id ${id} not found`)
    }

    return data
  },

  async create(pot: PotInsert): Promise<Pot> {
    const { data, error } = await supabase
      .from('pots')
      .insert(pot)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  },

  async update(id: number, updates: PotUpdate): Promise<Pot> {
    const { data, error } = await supabase
      .from('pots')
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
    const { error } = await supabase.from('pots').delete().eq('id', id)

    if (error) {
      throw error
    }
  },
}
