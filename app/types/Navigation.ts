import type { NavItems } from '~/types/IconType'

export type MainPageType =
  | '/'
  | '/transactions'
  | '/budgets'
  | '/pots'
  | '/recurring'

export interface NavLink {
  href: MainPageType
  iconName: NavItems
}

export const NAV_ITEMS: NavLink[] = [
  { href: '/', iconName: 'home' },
  { href: '/transactions', iconName: 'transactions' },
  { href: '/budgets', iconName: 'budgets' },
  { href: '/pots', iconName: 'navPots' },
  { href: '/recurring', iconName: 'widgetRecurring' },
] as const
