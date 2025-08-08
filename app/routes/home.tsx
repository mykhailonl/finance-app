import { HomeContent } from '~/components/HomeContent'
import { PageTitle } from '~/components/PageTitle'
import { PageWrapper } from '~/components/PageWrapper'
import { Summary } from '~/components/Summary'

import type { Route } from './+types/home'

export async function clientLoader() {
  const baseUrl =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'http://localhost:5173'

  const res = await fetch(`${baseUrl}/data/data.json`)
  const data = await res.json()

  return {
    balance: data.balance,
    transactions: data.transactions,
    pots: data.pots,
    budgets: data.budgets,
  }
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const { balance, pots, budgets, transactions } = loaderData

  return (
    <PageWrapper>
      <PageTitle title="Overview" />

      <Summary balanceData={balance} />

      <HomeContent pots={pots} budgets={budgets} transactions={transactions} />
    </PageWrapper>
  )
}
