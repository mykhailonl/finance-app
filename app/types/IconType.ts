import { ReactComponent as IconDue } from '@/assets/images/icon-bill-due.svg'
import { ReactComponent as IconPaid } from '@/assets/images/icon-bill-paid.svg'
import { ReactComponent as CaretDown } from '@/assets/images/icon-caret-down.svg'
import { ReactComponent as IconCloseModal } from '@/assets/images/icon-close-modal.svg'
import { ReactComponent as IconDots } from '@/assets/images/icon-dots.svg'
import { ReactComponent as IconEllipse } from '@/assets/images/icon-ellipse.svg'
import { ReactComponent as FilterIcon } from '@/assets/images/icon-filter-mobile.svg'
import { ReactComponent as IconHidePassword } from '@/assets/images/icon-hide-password.svg'
import { ReactComponent as IconBudgets } from '@/assets/images/icon-nav-budgets.svg'
import { ReactComponent as IconHome } from '@/assets/images/icon-nav-overview.svg'
import { ReactComponent as IconNavPots } from '@/assets/images/icon-nav-pots.svg'
import { ReactComponent as IconWidgetRecurring } from '@/assets/images/icon-nav-recurring-bills.svg'
import { ReactComponent as IconTransactions } from '@/assets/images/icon-nav-transactions.svg'
import { ReactComponent as IconPot } from '@/assets/images/icon-pot.svg'
import { ReactComponent as IconRecurring } from '@/assets/images/icon-recurring-bills.svg'
import { ReactComponent as SearchIcon } from '@/assets/images/icon-search.svg'
import { ReactComponent as IconSelected } from '@/assets/images/icon-selected.svg'
import { ReactComponent as IconShowPassword } from '@/assets/images/icon-show-password.svg'
import { ReactComponent as SortIcon } from '@/assets/images/icon-sort-mobile.svg'
import { ReactComponent as LogoLarge } from '@/assets/images/logo-large.svg'
import { ReactComponent as LogoutIcon } from '@/assets/images/logout-icon.svg'
import type { TransactionCategory } from '~/types/index'

export const iconComponents = {
  caretDown: CaretDown,
  pot: IconPot,
  home: IconHome,
  transactions: IconTransactions,
  budgets: IconBudgets,
  navPots: IconNavPots,
  widgetRecurring: IconWidgetRecurring,
  logoLarge: LogoLarge,
  search: SearchIcon,
  sort: SortIcon,
  filter: FilterIcon,
  ellipse: IconEllipse,
  dots: IconDots,
  recurring: IconRecurring,
  due: IconDue,
  paid: IconPaid,
  closeModal: IconCloseModal,
  selected: IconSelected,
  showPassword: IconShowPassword,
  hidePassword: IconHidePassword,
  logout: LogoutIcon,
}

export type IconName = keyof typeof iconComponents

export type NavItems = Extract<
  IconName,
  'home' | 'transactions' | 'budgets' | 'navPots' | 'widgetRecurring'
>

export type SummaryCardIcon = Extract<IconName, 'pot' | 'recurring'>

export type CategoryIconProps = {
  category: TransactionCategory
  size?: number
  color?: string
  styles?: string
}
