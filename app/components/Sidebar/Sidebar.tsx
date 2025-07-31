import cn from 'classnames'

import { NavItem } from '~/components/NavItem'
import { useDevice } from '~/hooks/useDevice'
import { iconComponents } from '~/types/IconType'
import { NAV_ITEMS } from '~/types/Navigation'

export const Sidebar = () => {
  const { isMobile, isTablet, isDesktop } = useDevice()
  const LogoLarge = iconComponents['logoLarge']

  return (
    <div className={cn(
      "bg-grey-900",
      isMobile && 'rounded-t-lg',
      isTablet && 'rounded-t-lg',
      isDesktop && 'rounded-r-2xl flex flex-col gap-6 w-[300px] h-screen',
    )}>
      {isDesktop &&
        <div className='px-8 py-10'>
          <LogoLarge />
        </div>
      }

      <nav className={cn(
        'flex',
        isMobile && 'px-4 pt-2',
        isTablet && 'px-10 pt-2',
        isDesktop && 'pr-6 flex flex-col gap-1',
      )}>
        {NAV_ITEMS.map((link, index) => (
          <NavItem href={link.href} iconName={link.iconName} key={index} />
        ))}
      </nav>
    </div>
  )
}
