import cn from 'classnames'
import { motion } from 'motion/react'
import { forwardRef } from 'react'
import { NavLink, useMatch } from 'react-router'

import { iconComponents, type NavItems } from '~/types/IconType'
import type { NavLink as Props } from '~/types/Navigation'

const COLORS = {
  active: {
    icon: '#277C78',
    text: '#201F24',
  },
  inactive: {
    icon: '#B3B3B3',
    text: '#B3B3B3',
  },
} as const

const LINK_TEXT_MAP: Record<NavItems, string> = {
  home: 'Overview',
  transactions: 'Transactions',
  budgets: 'Budgets',
  navPots: 'Pots',
  widgetRecurring: 'Recurring Bills',
}

type NavItemProps = Props & {
  animationDuration: number
}

export const NavItem = forwardRef<HTMLAnchorElement, NavItemProps>(
  ({ href, iconName, animationDuration }, ref) => {
    const match = useMatch(href)
    const isActive = !!match

    const Icon = iconComponents[iconName]
    const displayText = LINK_TEXT_MAP[iconName]

    return (
      <NavLink
        ref={ref}
        to={href}
        className={cn(
          'relative grow cursor-custom flex flex-col lg:flex-row items-center justify-center lg:justify-start  lg:gap-4 rounded-t-lg lg:rounded-r-lg lg:rounded-t-none z-10',
          'py-2 lg:py-4 lg:pl-7 lg:pr-8 gap-050'
        )}
      >
        <motion.div
          className="flex items-center md:flex-col md:gap-1 lg:flex-row lg:gap-4"
          animate={{
            color: isActive ? COLORS.active.text : COLORS.inactive.text,
          }}
          transition={{
            duration: animationDuration,
            ease: 'linear',
          }}
        >
          <motion.div
            animate={{
              color: isActive ? COLORS.active.icon : COLORS.inactive.icon,
            }}
            transition={{
              duration: animationDuration,
              ease: 'linear',
            }}
          >
            <Icon className="h-6 w-6" />
          </motion.div>

          <span className="hidden md:block text-preset-5-bold">
            {displayText}
          </span>
        </motion.div>
      </NavLink>
    )
  }
)

NavItem.displayName = 'NavItem'
