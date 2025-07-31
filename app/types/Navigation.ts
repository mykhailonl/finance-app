import type { NavItems } from '~/types/IconType'

// TODO type hrefs too
export interface NavLink {
  href: string
  iconName: NavItems
}

export const NAV_ITEMS: NavLink[] = [
  { href: '/', iconName: 'home' },
  { href: '/transactions', iconName: 'transactions' },
  { href: '/budgets', iconName: 'budgets' },
  { href: '/pots', iconName: 'navPots' },
  { href: '/recurring', iconName: 'recurring' },
] as const
