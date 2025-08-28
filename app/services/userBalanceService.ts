import type { StrictUserBalance } from '~/types'
import supabase from '~/utils/supabase'

export const userBalanceService = {
  async getDetails(): Promise<StrictUserBalance> {
    const { data: balance, error } = await supabase
      .rpc('get_user_balance')
      .single()

    if (error) {
      throw error
    }

    if (!balance) {
      throw new Error('User balance not found')
    }

    return {
      user_id: balance.user_id,
      current: balance.current,
      income: balance.income,
      expenses: balance.expenses,
    }
  },
}
