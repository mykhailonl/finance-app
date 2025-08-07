import cn from 'classnames'
import { NavLink } from 'react-router'

import { useDevice } from '~/hooks/useDevice'
import { iconComponents, type NavItems } from '~/types/IconType'
import type { NavLink as Props } from '~/types/Navigation'

export const NavItem = ({ href, iconName }: Props) => {
  const { isMobile, isDesktop } = useDevice()

  const renderLink = (isActive: boolean) => {
    const Icon = iconComponents[iconName]

    const linkTextMap: Record<NavItems, string> = {
      home: 'Overview',
      transactions: 'Transactions',
      budgets: 'Budgets',
      navPots: 'Pots',
      recurring: 'Recurring Bills',
    }

    const displayText = linkTextMap[iconName]

    return (
      <div
        className={cn(
          'flex items-center',
          isActive ? 'text-green' : 'text-grey-300',
          isDesktop && 'flex-col gap-1',
          isDesktop && 'flex-row gap-4'
        )}
      >
        <Icon className="h-6 w-6" />

        {!isMobile && (
          <span
            className={cn(
              'text-preset-5-bold',
              isActive ? 'text-grey-900' : 'text-grey-300'
            )}
          >
            {displayText}
          </span>
        )}
      </div>
    )
  }

  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        cn(
          'grow flex items-center flex-col gap-050',
          isActive
            ? 'bg-beige-100 border-b-green border-l-green'
            : 'bg-grey-900 border-b-grey-900 border-l-grey-900',
          !isDesktop && 'border-b-4  rounded-t-lg justify-center py-2 ',
          isDesktop && 'flex-row border-l-4 rounded-r-lg py-4 pl-7 pr-8'
        )
      }
    >
      {({ isActive }) => renderLink(isActive)}
    </NavLink>
  )
}
