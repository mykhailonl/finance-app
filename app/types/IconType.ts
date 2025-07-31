import { ReactComponent as CaretDown } from '@/assets/images/icon-caret-down.svg'
import { ReactComponent as IconBudgets } from '@/assets/images/icon-nav-budgets.svg'
import { ReactComponent as IconHome } from '@/assets/images/icon-nav-overview.svg'
import { ReactComponent as IconNavPots } from '@/assets/images/icon-nav-pots.svg'
import { ReactComponent as IconRecurring } from '@/assets/images/icon-nav-recurring-bills.svg'
import { ReactComponent as IconTransactions } from '@/assets/images/icon-nav-transactions.svg'
import { ReactComponent as IconPot } from '@/assets/images/icon-pot.svg'
import { ReactComponent as LogoLarge } from '@/assets/images/logo-large.svg'

export const iconComponents = {
  caretDown: CaretDown,
  pot: IconPot,
  home: IconHome,
  transactions: IconTransactions,
  budgets: IconBudgets,
  navPots: IconNavPots,
  recurring: IconRecurring,
  logoLarge: LogoLarge,
}

export type IconName = keyof typeof iconComponents

export type NavItems =  Extract<IconName, 'home' | 'transactions' | 'budgets' | 'navPots' | 'recurring'>
