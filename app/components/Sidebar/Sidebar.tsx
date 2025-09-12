import { NavLink } from 'react-router'

import { Button } from '~/components/Button'
import { NavItem } from '~/components/NavItem'
import { useModal } from '~/hooks/useModal'
import { iconComponents } from '~/types/IconType'
import { NAV_ITEMS } from '~/types/Navigation'

export const Sidebar = () => {
  const { openModal } = useModal()
  const LogoLarge = iconComponents['logoLarge']

  return (
    <div className="bg-grey-900 rounded-t-lg lg:rounded-t-none lg:rounded-r-2xl lg:flex lg:flex-col lg:gap-6 lg:w-[300px] lg:h-screen absolute inset-x-0 bottom-0 lg:static">
      <div className="hidden px-8 py-10 lg:block cursor-custom">
        <NavLink to="/">
          <LogoLarge />
        </NavLink>
      </div>

      <nav className="flex pt-2 lg:pt-0 px-4 md:px-10 lg:px-0 lg:pr-6 lg:flex-col lg:gap-1">
        {NAV_ITEMS.map((link, index) => (
          <NavItem href={link.href} iconName={link.iconName} key={index} />
        ))}
      </nav>

      <Button
        variant="logout"
        onClick={() => openModal({ type: 'logout' })}
        styles="hidden lg:flex"
      >
        Logout
      </Button>
    </div>
  )
}
