import type { Pot, PotInsert, PotUpdate } from '~/types'
import supabase from '~/utils/supabase'

export const potService = {
  async getAll(): Promise<Pot[]> {
    const { data, error } = await supabase.from('pots').select('*')

    const sorted = data
      ? data.sort((a, b) => {
          const percentA = a.target / a.total
          const percentB = b.target / b.total

          return percentA - percentB
        })
      : []

    if (error) {
      throw error
    }

    return sorted
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
