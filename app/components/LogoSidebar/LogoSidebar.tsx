import cn from 'classnames'
import { NavLink } from 'react-router'

import { iconComponents } from '~/types/IconType'

export const LogoSidebar = () => {
  const Logo = iconComponents['logoLarge']

  return (
    <NavLink
      to="/"
      className={cn(
        'absolute inset-x-0 ',
        'bg-grey-900',
        'px-10 py-6',
        'flex items-center justify-center lg:hidden',
        'rounded-b-lg'
      )}
    >
      <Logo />
    </NavLink>
  )
}
