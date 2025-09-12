import { Outlet } from 'react-router'

import { IllustrationBlock } from '~/components/IllustrationBlock'
import { LogoSidebar } from '~/components/LogoSidebar'

export default function AuthLayout() {
  return (
    <main className="h-full self-stretch bg-beige-100 relative lg:flex">
      <LogoSidebar />

      <IllustrationBlock />

      <Outlet />
    </main>
  )
}
