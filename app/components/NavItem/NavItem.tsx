import cn from 'classnames'
import { NavLink } from 'react-router'

import { iconComponents, type NavItems } from '~/types/IconType'
import type { NavLink as Props } from '~/types/Navigation'

export const NavItem = ({ href, iconName }: Props) => {
  const renderLink = (isActive: boolean) => {
    const Icon = iconComponents[iconName]

    const linkTextMap: Record<NavItems, string> = {
      home: 'Overview',
      transactions: 'Transactions',
      budgets: 'Budgets',
      navPots: 'Pots',
      widgetRecurring: 'Recurring Bills',
    }

    const displayText = linkTextMap[iconName]

    return (
      <div
        className={cn(
          'flex items-center md:flex-col md:gap-1 lg:flex-row lg:gap-4',
          isActive ? 'text-green' : 'text-grey-300 group-hover:text-grey-100'
        )}
      >
        <Icon className="h-6 w-6" />

        <span
          className={cn(
            'hidden md:block text-preset-5-bold',
            isActive
              ? 'text-grey-900'
              : 'text-grey-300 group-hover:text-grey-100'
          )}
        >
          {displayText}
        </span>
      </div>
    )
  }

  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        cn(
          'grow flex items-center flex-col py-2 lg:py-4 lg:pl-7 lg:pr-8 justify-center gap-050 cursor-custom group rounded-t-lg lg:rounded-r-lg lg:rounded-t-none border-b-4 lg:border-b-0 lg:justify-start lg:border-l-4 lg:flex-row',
          isActive
            ? 'bg-beige-100 border-b-green border-l-green'
            : 'bg-grey-900 border-b-grey-900 border-l-grey-900'
        )
      }
    >
      {({ isActive }) => renderLink(isActive)}
    </NavLink>
  )
}
