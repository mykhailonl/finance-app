import { Budgets } from "~/components/Budgets"
import { Pots } from "~/components/Pots"
import { Recurring } from '~/components/Recurring'
import { Transactions } from "~/components/Transactions"
import type { BudgetType } from "~/types/BudgetType"
import type { PotType } from "~/types/PotType"
import type { TransactionType } from "~/types/TransactionType"

type HomeContentProps = {
  pots: PotType[],
  transactions: TransactionType[],
  budgets: BudgetType[],
}

export const HomeContent = ({ pots, budgets, transactions }: HomeContentProps) => {
  return (
    <div className='flex flex-col gap-6 items-start lg:flex-row'>
      <div className='flex flex-col gap-4 items-start self-stretch grow md:gap-6'>
        <Pots pots={pots} />

        <Transactions transactions={transactions} />
      </div>

      <div className='flex flex-col gap-4 items-start self-stretch md:gap-6'>
        <Budgets budgets={budgets} />

        <Recurring transactions={transactions} />
      </div>
    </div>
  )
}