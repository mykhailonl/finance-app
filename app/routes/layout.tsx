import { Outlet } from 'react-router'

import { Sidebar } from '~/components/Sidebar'

export default function Layout() {
  return (
    <main className="h-full bg-beige-100 relative lg:flex lg:flex-row-reverse">
      <Outlet />

      <Sidebar />
    </main>
  )
}
